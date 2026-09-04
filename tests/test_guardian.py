# -*- coding: utf-8 -*-
"""Menores de edad y el correo de su acudiente.

La aplicacion no sabia la edad de nadie: la tabla users tenia email, nombre,
contrasena y poco mas. Sin eso no se puede pedir permiso a un adulto, porque
no se sabe a quien hay que pedirselo.

Se guarda un booleano y no una fecha de nacimiento a proposito: basta para
decidir y es un dato menos sobre un menor.

Es autodeclarado, y eso no tiene arreglo tecnico - un adolescente puede
desmarcar la casilla. Lo que cambia es que ahora se pregunta y queda
constancia de la respuesta.
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


def _registrar(client, **extra):
    cuerpo = {"email": extra.pop("email", "menor@example.com"),
              "password": "password123", "name": "Ana",
              # El registro exige declarar la edad y aceptar los terminos.
              # Van como valores por defecto para que cada test solo escriba
              # lo que de verdad esta probando; `extra` los pisa si hace falta.
              "is_minor": False, "accepted_terms": True}
    cuerpo.update(extra)
    return client.post("/api/v1/auth/register", json=cuerpo)


def test_a_minor_must_give_a_guardian_email(client):
    """Marcar la casilla sin dejar correo dejaria una cuenta de menor sin
    nadie a quien avisar: lo peor de los dos mundos, porque consta que es
    menor y no hay forma de pedir el permiso."""
    r = _registrar(client, is_minor=True)
    assert r.status_code == 422, f"acepto un menor sin acudiente: {r.status_code}"


def test_the_guardian_email_has_to_be_someone_else(client):
    """El atajo obvio. No detecta a un menor decidido a mentir - puede poner
    cualquier otra direccion - pero si el que se toma sin pensarlo, y de paso
    el error de teclear dos veces el mismo correo."""
    r = _registrar(client, email="ana@example.com", is_minor=True,
                   guardian_email="ana@example.com")
    assert r.status_code == 422, "acepto que el menor fuera su propio acudiente"

    # Y con mayusculas distintas, que es la forma facil de saltarselo.
    r = _registrar(client, email="ana@example.com", is_minor=True,
                   guardian_email="ANA@Example.com")
    assert r.status_code == 422, "la comparacion distingue mayusculas"


def test_a_minor_registers_and_the_guardian_is_recorded(client):
    r = _registrar(client, email="hijo@example.com", is_minor=True,
                   guardian_email="madre@example.com")
    assert r.status_code == 201, r.text
    usuario = r.json()["user"]
    assert usuario["is_minor"] is True
    assert usuario["guardian_email"] == "madre@example.com"


def test_an_adult_leaves_nobody_elses_email_behind(client):
    """Pedir lo minimo va en las dos direcciones. Si dice ser mayor de edad,
    el correo de un tercero no se guarda aunque el cliente lo mande."""
    r = _registrar(client, email="mayor@example.com", is_minor=False,
                   guardian_email="alguien@example.com")
    assert r.status_code == 201, r.text
    usuario = r.json()["user"]
    assert usuario["is_minor"] is False
    assert usuario["guardian_email"] is None, \
        "se guardo el correo de un tercero para alguien que no lo necesita"


def test_registering_without_saying_anything_still_works(client):
    """Las cuentas viejas y cualquier cliente que no mande los campos nuevos
    siguen funcionando: por defecto, mayor de edad y sin acudiente."""
    r = _registrar(client, email="silencio@example.com")
    assert r.status_code == 201, r.text
    assert r.json()["user"]["is_minor"] is False


def test_the_guardian_email_is_lowercased_like_the_others(client):
    """Si no, escribir el mismo correo con otra caja crearia dos acudientes
    distintos para la misma persona."""
    r = _registrar(client, email="hija@example.com", is_minor=True,
                   guardian_email="  Padre@Example.COM  ")
    assert r.status_code == 201, r.text
    assert r.json()["user"]["guardian_email"] == "padre@example.com"


def test_registering_without_declaring_an_age_is_refused(client):
    """El servidor no supone mayoria de edad cuando nadie contesta.

    Es el mismo agujero que el `checked` del formulario, un piso mas abajo:
    si el campo pudiera omitirse y valer False, bastaria con no mandarlo
    para crear cuentas de menores sin expediente de acudiente."""
    r = client.post("/api/v1/auth/register", json={
        "email": "sin-edad@example.com", "password": "password123",
        "accepted_terms": True,
    })
    assert r.status_code == 422, r.text
    assert "18" in r.text, f"el 422 no es por la edad: {r.text}"


def test_registering_without_accepting_the_terms_is_refused(client):
    """Una casilla que solo vive en el navegador no es constancia de nada:
    se comprueba tambien en el servidor, que es quien guarda la fecha."""
    r = client.post("/api/v1/auth/register", json={
        "email": "sin-terminos@example.com", "password": "password123",
        "is_minor": False,
    })
    assert r.status_code == 422, r.text
    assert "terminos" in r.text.lower(), f"el 422 no es por los terminos: {r.text}"


def test_accepting_the_terms_is_recorded_with_a_date(client):
    """Sin fecha guardada, la casilla no prueba nada el dia que haga falta
    demostrar que alguien acepto."""
    r = _registrar(client, email="con-terminos@example.com")
    assert r.status_code == 201, r.text
    import app as fp_app
    cuenta = fp_app.users_store.get_user_by_id(r.json()["user"]["id"])
    assert cuenta["terms_accepted_at"], "no quedo constancia de la aceptacion"


# --- La pantalla ----------------------------------------------------------

def test_the_question_is_actually_on_the_form():
    """El backend puede estar perfecto y la pregunta no aparecer nunca."""
    html = (RAIZ / "web" / "login.html").read_text(encoding="utf-8")
    assert 'id="ageMinorRadio"' in html, "no hay opcion de menor de edad en el formulario"
    assert 'id="ageAdultRadio"' in html, "no hay opcion de mayor de edad en el formulario"
    assert 'name="guardianEmail"' in html, "no hay campo para el correo del acudiente"


def test_no_age_option_comes_preselected():
    """Lo que vigila este test es el caso del auditorio: alguien con prisa
    que no toca la pregunta.

    Mientras la edad fue una casilla suelta, no tocarla significaba "soy
    mayor de edad" y la cuenta se creaba sin acudiente al que pedirle
    permiso. Un `checked` de mas en el HTML devolveria ese agujero sin que
    nada mas se rompa, asi que se comprueba aqui."""
    html = (RAIZ / "web" / "login.html").read_text(encoding="utf-8")
    bloque = html.split('id="minorField"', 1)[1].split("</fieldset>", 1)[0]
    assert "checked" not in bloque, "una opcion de edad viene marcada por defecto"


def test_the_form_links_the_terms_and_the_privacy_policy():
    """Aceptar algo que no se puede abrir no es aceptar nada. Las dos
    paginas existen y se sirven en /terms y /privacy (ver app.py)."""
    html = (RAIZ / "web" / "login.html").read_text(encoding="utf-8")
    assert 'id="acceptTermsCheck"' in html, "no hay casilla de aceptacion de terminos"
    assert 'href="/terms"' in html, "la casilla no enlaza los terminos"
    assert 'href="/privacy"' in html, "la casilla no enlaza la politica de privacidad"


def test_both_languages_have_the_new_texts():
    """Un texto que falta sale como su clave cruda en pantalla."""
    claves_campos = ("isMinor", "isAdult", "ageLegend", "guardianEmail",
                     "guardianHint", "acceptPrefix", "termsLink", "acceptAnd",
                     "privacyLink")
    claves_errores = ("guardianEmail", "guardianSame", "age", "terms")
    for idioma in ("es", "en"):
        d = json.loads((RAIZ / "web" / "src" / "locales" / idioma / "login.json")
                       .read_text(encoding="utf-8"))
        for k in claves_campos:
            assert d["fields"].get(k), f"falta fields.{k} en {idioma}"
        for k in claves_errores:
            assert d["errors"].get(k), f"falta errors.{k} en {idioma}"


def test_the_store_itself_refuses_to_keep_it(tmp_path, monkeypatch):
    """Directo contra el almacen, sin pasar por la API.

    Hay dos capas que anulan el acudiente de quien dice ser mayor: el
    validador de la peticion y el propio register(). Quitar la del almacen no
    hacia fallar ningun test, porque la de arriba seguia tapando el hueco -
    y ese es justo el guard que hace falta el dia que algo llame a register()
    sin pasar por la API.
    """
    monkeypatch.setenv("PBKDF2_ITERATIONS_TEST_ONLY", "1000")
    from backend.users_store import UsersStore
    store = UsersStore(tmp_path / "users.sqlite3")

    usuario = store.register("adulto@example.com", "password123", "Adulto",
                             is_minor=False, guardian_email="tercero@example.com")
    assert usuario["guardian_email"] is None, \
        "el almacen guardo el correo de un tercero para alguien que no lo necesita"

    menor = store.register("menor@example.com", "password123", "Menor",
                           is_minor=True, guardian_email="  Madre@Example.COM ")
    assert menor["is_minor"] is True
    assert menor["guardian_email"] == "madre@example.com"
