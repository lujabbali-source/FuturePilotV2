# -*- coding: utf-8 -*-
"""Verificacion del correo: emision, confirmacion, reenvio y limites.

Lo que NO se prueba aqui es que el correo salga: la suite corre sin SMTP a
proposito (ver conftest.py). Lo que si se prueba es todo lo que decide el
servidor, que es donde puede haber un fallo real.

El criterio de fondo, y el que fijan varios de estos tests: verificar el
correo NO BLOQUEA NADA. Es la misma decision que el expediente del
acudiente. Dejar a un estudiante fuera de su test vocacional porque el
filtro del colegio se comio un mensaje no protege a nadie.
"""


def _token_de(app_module, user_id: int) -> str:
    """Emite un token de verificacion saltandose el correo.

    Se emite por la via real (create_email_verification), no escribiendo en
    la tabla a mano: si esa funcion cambiara de formato, estos tests tienen
    que enterarse.
    """
    return app_module.users_store.create_email_verification(user_id)


def test_una_cuenta_nueva_nace_sin_verificar(client):
    """Nadie le comprobo el correo todavia, y decir lo contrario seria
    inventarse un hecho que no ocurrio."""
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-nueva@example.com", "password": "password123", "name": "Ana"},
    )
    assert r.status_code == 201
    assert r.json()["user"]["email_verified"] is False


def test_registrarse_no_queda_bloqueado_por_el_correo(client, sample_answers):
    """La cuenta funciona entera desde el primer minuto: sesion, test y
    pasaporte, con el correo sin confirmar."""
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-nobloquea@example.com", "password": "password123"},
    )
    headers = {"Authorization": f"Bearer {r.json()['token']}"}

    assert client.get("/api/v1/auth/me", headers=headers).status_code == 200
    assert client.get("/api/v1/passport", headers=headers).status_code == 200
    evaluacion = client.post(
        "/api/v1/assess", json={"answers": sample_answers}, headers=headers)
    assert evaluacion.status_code == 200


def test_el_enlace_confirma_el_correo(client, app_module):
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-ok@example.com", "password": "password123"},
    )
    user_id = r.json()["user"]["id"]
    headers = {"Authorization": f"Bearer {r.json()['token']}"}

    token = _token_de(app_module, user_id)
    confirmacion = client.post("/api/v1/auth/verify-email", json={"token": token})
    assert confirmacion.status_code == 200
    assert confirmacion.json()["estado"] == "verificado"

    assert client.get("/api/v1/auth/me", headers=headers).json()["user"]["email_verified"] is True


def test_pulsar_el_enlace_dos_veces_no_es_un_error(client, app_module):
    """El segundo clic es el caso NORMAL: el correo se queda en la bandeja y
    se abre otra vez desde otro dispositivo. Responder "invalido" a quien si
    esta verificado seria mentirle sobre el estado de su cuenta. Misma
    leccion que el claim del resultado del test."""
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-doble@example.com", "password": "password123"},
    )
    token = _token_de(app_module, r.json()["user"]["id"])

    primera = client.post("/api/v1/auth/verify-email", json={"token": token})
    segunda = client.post("/api/v1/auth/verify-email", json={"token": token})

    assert primera.status_code == 200 and primera.json()["estado"] == "verificado"
    assert segunda.status_code == 200, "el segundo clic devolvio error"
    assert segunda.json()["estado"] == "ya_estaba"


def test_un_token_inventado_se_rechaza(client):
    r = client.post("/api/v1/auth/verify-email", json={"token": "esto-no-existe"})
    assert r.status_code == 400


def test_un_enlace_caducado_se_distingue_de_uno_invalido(client, app_module):
    """410 y no 400. La diferencia no es cosmetica: al caducado se le puede
    ofrecer un reenvio, y al invalido no hay nada que ofrecerle."""
    from datetime import timedelta

    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-caducado@example.com", "password": "password123"},
    )
    user_id = r.json()["user"]["id"]
    token = _token_de(app_module, user_id)

    # Envejecer el token por la puerta de atras: esperar 7 dias no es opcion.
    from backend.users_store import hash_token, utc_now
    vencido = (utc_now() - timedelta(days=1)).isoformat()
    with app_module.users_store.connect() as conexion:
        conexion.execute(
            "UPDATE email_verifications SET expires_at = ? WHERE token_hash = ?",
            (vencido, hash_token(token)),
        )
        conexion.commit()

    caducado = client.post("/api/v1/auth/verify-email", json={"token": token})
    assert caducado.status_code == 410
    inventado = client.post("/api/v1/auth/verify-email", json={"token": "no-existe"})
    assert inventado.status_code == 400


def test_un_token_nuevo_invalida_el_anterior(client, app_module):
    """Si no, cada reenvio dejaria otro enlace valido flotando por ahi."""
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-rotacion@example.com", "password": "password123"},
    )
    user_id = r.json()["user"]["id"]

    viejo = _token_de(app_module, user_id)
    nuevo = _token_de(app_module, user_id)

    assert client.post("/api/v1/auth/verify-email", json={"token": viejo}).status_code == 400
    assert client.post("/api/v1/auth/verify-email", json={"token": nuevo}).status_code == 200


def test_el_reenvio_exige_sesion(client):
    """Sin esto seria un endpoint publico para mandar correos con la marca
    de FuturePilot a cualquier direccion."""
    assert client.post("/api/v1/auth/resend-verification").status_code == 401


def test_el_reenvio_no_acepta_una_direccion_del_cliente(client, app_module):
    """Manda SIEMPRE al correo de la cuenta autenticada. Que el cuerpo traiga
    otra direccion no puede cambiar el destinatario."""
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-destino@example.com", "password": "password123"},
    )
    headers = {"Authorization": f"Bearer {r.json()['token']}"}

    enviados = []
    original = app_module.mailer.send_email

    def espia(to_email, subject, body):
        enviados.append(to_email)
        return True

    app_module.mailer.send_email = espia
    try:
        respuesta = client.post(
            "/api/v1/auth/resend-verification",
            json={"email": "atacante@example.com"},
            headers=headers,
        )
    finally:
        app_module.mailer.send_email = original

    assert respuesta.status_code == 200
    assert enviados == ["verif-destino@example.com"], enviados


def test_reenviar_cuando_ya_esta_verificado_no_gasta_un_correo(client, app_module):
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-yaesta@example.com", "password": "password123"},
    )
    headers = {"Authorization": f"Bearer {r.json()['token']}"}
    token = _token_de(app_module, r.json()["user"]["id"])
    client.post("/api/v1/auth/verify-email", json={"token": token})

    enviados = []
    original = app_module.mailer.send_email
    app_module.mailer.send_email = lambda to_email, subject, body: enviados.append(to_email)
    try:
        respuesta = client.post("/api/v1/auth/resend-verification", headers=headers)
    finally:
        app_module.mailer.send_email = original

    assert respuesta.status_code == 200
    assert respuesta.json()["enviado"] is False
    assert enviados == [], "se mando un correo por algo que ya estaba hecho"


def test_confirmar_aguanta_mas_intentos_que_reenviar(app_module):
    """No pueden compartir limitador, y el motivo es un colegio.

    El limitador cuenta POR IP y un colegio entero sale por una sola. Con el
    limite del reenvio (5 cada 5 minutos) aplicado tambien a confirmar, el
    sexto alumno que pulsara su enlace se encontraba "demasiados intentos"
    sin haber hecho nada raro - y un colegio es justo el cliente al que esto
    apunta.

    Confirmar no manda ningun correo y el token es de 32 bytes. Reenviar si
    manda uno, y ahi el limite protege un buzon ajeno y la reputacion del
    remitente.
    """
    confirmar = app_module.verify_email_rate_limiter
    reenviar = app_module.resend_verification_rate_limiter

    assert confirmar is not reenviar, "volvieron a compartir limitador"
    assert confirmar.max_requests > reenviar.max_requests, (
        f"confirmar ({confirmar.max_requests}) tiene que aguantar mas que "
        f"reenviar ({reenviar.max_requests})"
    )


def test_muchas_confirmaciones_seguidas_no_bloquean(client, app_module):
    """El caso del colegio, extremo a extremo: varias cuentas distintas
    confirmando desde la misma IP no se pisan entre ellas."""
    # Las cuentas se crean por la tienda y no por /auth/register: registrar
    # tiene su PROPIO limite (5 por IP), y dispararlo aqui probaria ese en
    # vez del que interesa.
    for i in range(8):
        usuario = app_module.users_store.register(
            f"verif-aula-{i}@example.com", "password123", f"Alumno {i}")
        token = _token_de(app_module, usuario["id"])
        respuesta = client.post("/api/v1/auth/verify-email", json={"token": token})
        assert respuesta.status_code == 200, (
            f"el alumno {i + 1} de la misma aula recibio {respuesta.status_code}"
        )


def test_borrar_la_cuenta_se_lleva_sus_tokens(client, app_module):
    """Un token que sobreviva a su cuenta es una fila con el user_id de
    alguien que pidio que se borrara todo."""
    from backend.users_store import hash_token

    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "verif-borrado@example.com", "password": "password123"},
    )
    user_id = r.json()["user"]["id"]
    token = _token_de(app_module, user_id)

    app_module.users_store.delete_account(user_id)

    with app_module.users_store.connect() as conexion:
        fila = conexion.execute(
            "SELECT 1 FROM email_verifications WHERE token_hash = ?", (hash_token(token),)
        ).fetchone()
    assert fila is None, "quedo un token de una cuenta borrada"
