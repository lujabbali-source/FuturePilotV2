# -*- coding: utf-8 -*-
"""El permiso del acudiente, de punta a punta.

La regla que gobierna todo esto y que no se puede romper nunca: LA CUENTA DEL
ESTUDIANTE NO SE BLOQUEA. Funciona entera desde el primer minuto, tenga el
expediente el estado que tenga. El permiso registra si un adulto autorizo y
cuando, y le pone fecha limite a la espera; no es una puerta.
"""
from datetime import timedelta

import pytest

from backend.users_store import UsersStore


_CONTADOR = {"n": 0}


def _registrar_menor(client, email=None, acudiente="madre@example.com"):
    """Correo distinto en cada llamada.

    Los tests de API comparten una sola base temporal (ver conftest), asi
    que repetir el correo devuelve 409 y el fallo aparece varios asserts mas
    abajo, disfrazado de KeyError.
    """
    _CONTADOR["n"] += 1
    return client.post("/api/v1/auth/register", json={
        "email": email or f"hijo{_CONTADOR['n']}@example.com",
        "password": "password123", "name": "Ana",
        "is_minor": True, "guardian_email": acudiente,
    })


# --- Lo que no se puede romper --------------------------------------------

def test_a_pending_permission_does_not_block_the_student(client, sample_answers):
    """La razon de ser del diseño. Si esto falla, se rompio el acuerdo: no
    limitar al estudiante porque sus padres no tengan tiempo de mirar el
    correo."""
    r = _registrar_menor(client)
    assert r.status_code == 201, r.text
    headers = {"Authorization": f"Bearer {r.json()['token']}"}

    # Todo lo que hace un estudiante, con el permiso todavia PENDIENTE.
    assert client.get("/api/v1/auth/me", headers=headers).status_code == 200
    assert client.get("/api/v1/me/dashboard", headers=headers).status_code == 200
    assert client.get("/api/v1/passport", headers=headers).status_code == 200
    evaluacion = client.post("/api/v1/assess", json={"answers": sample_answers})
    assert evaluacion.status_code == 200
    assert client.post("/api/v1/me/claim-result", headers=headers,
                       json={"result_id": evaluacion.json()["result_id"]}).status_code == 200


def test_the_file_is_opened_when_a_minor_registers(client, app_module):
    r = _registrar_menor(client)
    expediente = app_module.users_store.get_consent_for_user(r.json()["user"]["id"])
    assert expediente is not None, "no se abrio expediente para un menor"
    assert expediente["status"] == "PENDING"
    assert expediente["guardian_email"] == "madre@example.com"


def test_no_file_is_opened_for_an_adult(client, app_module):
    """Sin acudiente no hay expediente que abrir, y abrir uno vacio dejaria a
    un mayor de edad con un reloj de borrado encima."""
    r = client.post("/api/v1/auth/register", json={
        "email": "mayor-sin-expediente@example.com", "password": "password123", "name": "Luis"})
    assert app_module.users_store.get_consent_for_user(r.json()["user"]["id"]) is None


# --- El enlace del acudiente ----------------------------------------------

def test_the_guardian_can_read_and_authorize(client, app_module):
    usuario = _registrar_menor(client).json()["user"]
    token = app_module.users_store.create_consent_request(usuario["id"], "madre@example.com")

    lectura = client.get(f"/api/v1/consent/{token}")
    assert lectura.status_code == 200
    datos = lectura.json()["consent"]
    assert datos["status"] == "PENDING"
    assert datos["studentEmail"] == usuario["email"]

    respuesta = client.post(f"/api/v1/consent/{token}", json={"authorized": True})
    assert respuesta.status_code == 200
    assert respuesta.json()["consent"]["status"] == "AUTHORIZED"
    assert respuesta.json()["consent"]["resolvedAt"]


def test_an_invalid_link_says_nothing_useful(client):
    """No puede servir para averiguar si una cuenta existe."""
    assert client.get("/api/v1/consent/token-inventado").status_code == 404
    assert client.post("/api/v1/consent/token-inventado",
                       json={"authorized": True}).status_code == 404


def test_the_raw_token_is_never_stored(client, app_module):
    """Mismo criterio que las sesiones: quien tenga acceso al SQLite no puede
    autorizar en nombre de un padre."""
    usuario = _registrar_menor(client).json()["user"]
    token = app_module.users_store.create_consent_request(usuario["id"], "madre@example.com")
    with app_module.users_store.connect() as conexion:
        filas = conexion.execute("SELECT token_hash FROM guardian_consents").fetchall()
    guardados = [f[0] for f in filas]
    assert token not in guardados, "el token crudo esta en la base"
    assert all(len(h) == 64 for h in guardados), "no parecen hashes sha256"


def test_answering_twice_does_not_overwrite_the_first_answer(client, app_module):
    """La primera respuesta es la prueba de lo que el acudiente dijo. Que un
    segundo clic la cambie en silencio la borraria."""
    usuario = _registrar_menor(client).json()["user"]
    token = app_module.users_store.create_consent_request(usuario["id"], "madre@example.com")
    assert client.post(f"/api/v1/consent/{token}", json={"authorized": False}).status_code == 200

    segunda = client.post(f"/api/v1/consent/{token}", json={"authorized": True})
    assert segunda.status_code == 409
    assert segunda.json()["detail"]["consent"]["status"] == "DENIED"


def test_asking_again_retires_the_previous_link(client, app_module):
    """Dos enlaces vivos serian dos respuestas posibles y ninguna forma de
    saber cual manda."""
    usuario = _registrar_menor(client).json()["user"]
    viejo = app_module.users_store.create_consent_request(usuario["id"], "madre@example.com")
    nuevo = app_module.users_store.create_consent_request(usuario["id"], "madre@example.com")

    assert client.post(f"/api/v1/consent/{viejo}", json={"authorized": True}).status_code == 409
    assert client.post(f"/api/v1/consent/{nuevo}", json={"authorized": True}).status_code == 200


# --- El plazo -------------------------------------------------------------

@pytest.fixture()
def store(tmp_path, monkeypatch):
    monkeypatch.setenv("PBKDF2_ITERATIONS_TEST_ONLY", "1000")
    return UsersStore(tmp_path / "users.sqlite3")


def test_an_expired_permission_stops_accepting_answers(store):
    """Se calcula al leer, no lo decide un proceso que quiza no corrio: un
    permiso vencido no puede aceptar respuesta solo porque nadie paso a
    marcarlo."""
    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    token = store.create_consent_request(usuario["id"], "madre@example.com",
                                         lifetime=timedelta(seconds=-1))
    assert store.get_consent_by_token(token)["status"] == "EXPIRED"
    assert store.resolve_consent(token, True) is None, "acepto respuesta tras vencer"


def test_the_deadline_deletes_the_account_and_everything_under_it(store):
    """Lo que le da sentido al plazo. Sin esto, borrar a los 30 dias es una
    frase en la politica de privacidad y nada mas."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(seconds=-1))

    assert len(consent_expiry.listar(store)) == 1
    borradas = consent_expiry.borrar(store)
    assert len(borradas) == 1
    assert store.find_user_id_by_email("hijo@example.com") is None, \
        "la cuenta sobrevivio al plazo"


def test_a_permission_still_in_time_is_left_alone(store):
    """Un plazo que borra antes de tiempo es peor que no tener plazo."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(days=30))
    assert consent_expiry.listar(store) == []
    assert consent_expiry.borrar(store) == []
    assert store.find_user_id_by_email("hijo@example.com") is not None


def test_an_authorized_permission_is_never_swept_up(store):
    """El caso que mas duele si se rompe: borrar la cuenta de un chico cuyo
    padre SI autorizo."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(seconds=-1))
    # Se autoriza antes del barrido: el estado manda sobre la fecha.
    with store.connect() as conexion:
        conexion.execute("UPDATE guardian_consents SET status='AUTHORIZED' WHERE user_id=?",
                         (usuario["id"],))
        conexion.commit()

    assert consent_expiry.listar(store) == [], \
        "un permiso autorizado salio en la lista de vencidos"
    consent_expiry.borrar(store)
    assert store.get_user_by_id(usuario["id"]) is not None, \
        "se borro la cuenta de un menor CON autorizacion"


def test_a_guardian_who_says_no_gets_the_account_deleted(store):
    """El boton dice "No autorizo y quiero que borren sus datos" y la pagina
    responde "sus datos se borraran". Durante un tiempo eso fue falso: negar
    dejaba el expediente en DENIED y el barrido solo miraba los PENDING, asi
    que la cuenta vivia para siempre. Una negativa explicita es la senal mas
    fuerte que puede mandar un acudiente; si alguna vale, es esa."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    token = store.create_consent_request(usuario["id"], "madre@example.com")
    store.resolve_consent(token, authorized=False)

    assert len(consent_expiry.listar(store)) == 1, \
        "negarse no puso la cuenta en la lista de borrado"
    assert len(consent_expiry.borrar(store)) == 1
    assert store.find_user_id_by_email("hijo@example.com") is None, \
        "el acudiente dijo que no y la cuenta sigue viva"


def test_marking_expired_first_does_not_put_the_account_out_of_reach(store):
    """--expirar y --borrar son dos comandos a proposito, y el orden natural
    es mirar antes de borrar. Pero marcar movia el expediente a EXPIRED y la
    consulta solo buscaba PENDING: quien hacia lo prudente dejaba la cuenta
    fuera del alcance del borrado para siempre."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(seconds=-1))

    assert consent_expiry.expirar(store) == 1
    assert len(consent_expiry.listar(store)) == 1, \
        "marcar como EXPIRED escondio la cuenta del barrido"
    consent_expiry.borrar(store)
    assert store.find_user_id_by_email("hijo@example.com") is None


def test_asking_for_permission_again_does_not_delete_the_account(store):
    """El reverso, y el que mas dano haria. Pedir de nuevo la autorizacion
    marca el expediente anterior como EXPIRED (create_consent_request). Si el
    barrido mirara cualquier expediente en vez del ultimo, reenviarle el
    enlace a un padre que no contesta borraria justo la cuenta que se estaba
    intentando salvar."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(seconds=-1))
    # Se le vuelve a mandar el enlace, ahora con plazo por delante.
    store.create_consent_request(usuario["id"], "madre@example.com",
                                 lifetime=timedelta(days=30))

    assert consent_expiry.listar(store) == [], \
        "el expediente reemplazado marco la cuenta para borrado"
    consent_expiry.borrar(store)
    assert store.get_user_by_id(usuario["id"]) is not None, \
        "reenviar el enlace borro la cuenta del menor"


def test_the_automatic_sweep_is_off_unless_someone_turns_it_on(app_module):
    """Borrar es irreversible y se lleva la cuenta de una persona real. Que
    aparezca solo, porque el codigo se despliega, seria justo lo que la
    separacion entre --expirar y --borrar existia para evitar."""
    assert app_module.CONSENT_SWEEP_ENABLED is False, \
        "el barrido automatico viene encendido de fabrica"


def test_the_sweep_reports_what_it_deleted(app_module, store, capsys, monkeypatch):
    """Un borrado automatico silencioso es la peor version de esto: cuando
    alguien pregunte por que desaparecio una cuenta, el log tiene que poder
    responder."""
    from backend import consent_expiry

    usuario = store.register("hijo@example.com", "password123", "Ana",
                             is_minor=True, guardian_email="madre@example.com")
    token = store.create_consent_request(usuario["id"], "madre@example.com")
    store.resolve_consent(token, authorized=False)

    monkeypatch.setattr(consent_expiry, "_store", lambda ruta=None: store)
    assert app_module.run_consent_sweep() == 1

    salida = capsys.readouterr().out
    assert "hijo@example.com" in salida, "no dijo QUE cuenta borro"
    assert "madre@example.com" in salida, "no dijo por orden de quien"
    assert "DENIED" in salida, "no dijo por que motivo"
    assert store.find_user_id_by_email("hijo@example.com") is None
