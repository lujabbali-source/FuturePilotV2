"""El muro del informe.

Lo que se vende es el informe, no el analisis: el analisis ya esta prometido
gratis en la pantalla de resultados y en la propuesta al colegio. Estos tests
vigilan las dos cosas que pueden salir caras si se rompen en silencio: que el
muro apagado no cobre a nadie, y que encendido no deje pasar gratis.
"""

import pytest


PRODUCTO = "informe"


def _acceso(client, headers):
    r = client.get("/api/v1/me/dashboard", headers=headers)
    assert r.status_code == 200, r.text
    return r.json()["report_access"]


# --- El interruptor -------------------------------------------------------

def test_with_the_wall_off_everyone_gets_in_and_it_says_why(
        client, app_module, register_and_login, monkeypatch):
    """Apagado es el valor por defecto y tiene que ser inofensivo.

    Importa el motivo, no solo que abra: un informe abierto porque el muro
    estaba apagado no es lo mismo que uno pagado, y si los dos dijeran
    "purchased" seria imposible saber, el dia que se encienda, a quien
    habia que cobrarle.
    """
    monkeypatch.setattr(app_module, "PAYWALL_ENABLED", False)
    _, headers = register_and_login()
    acceso = _acceso(client, headers)
    assert acceso["unlocked"] is True
    assert acceso["reason"] == "launch_free"


def test_with_the_wall_on_a_new_account_is_locked_and_told_the_price(
        client, app_module, register_and_login, monkeypatch):
    monkeypatch.setattr(app_module, "PAYWALL_ENABLED", True)
    _, headers = register_and_login()
    acceso = _acceso(client, headers)
    assert acceso["unlocked"] is False
    assert acceso["reason"] == "locked"
    # El precio viaja con el candado: una pantalla que tiene que pedir dinero
    # sin saber cuanto no se puede pintar.
    assert acceso["price"]["amount_cents"] > 0
    assert acceso["price"]["currency"]


# --- La compra ------------------------------------------------------------

def test_a_recorded_purchase_opens_the_report(
        client, app_module, register_and_login, monkeypatch):
    monkeypatch.setattr(app_module, "PAYWALL_ENABLED", True)
    usuario, headers = register_and_login()
    app_module.users_store.record_purchase(
        usuario["id"], PRODUCTO, provider="prueba", provider_ref="ref-1")
    acceso = _acceso(client, headers)
    assert acceso["unlocked"] is True
    assert acceso["reason"] == "purchased"


def test_the_same_gateway_event_twice_is_one_purchase(app_module, register_and_login):
    """Las pasarelas reintentan el webhook cuando no se les contesta rapido,
    asi que el mismo pago llega dos veces con toda normalidad. Sin
    idempotencia la tabla diria que alguien pago dos veces lo que compro una,
    y cuadrarla contra la pasarela seria imposible."""
    usuario, _ = register_and_login()
    primera = app_module.users_store.record_purchase(
        usuario["id"], PRODUCTO, provider="prueba", provider_ref="evento-repetido")
    segunda = app_module.users_store.record_purchase(
        usuario["id"], PRODUCTO, provider="prueba", provider_ref="evento-repetido")
    assert primera["id"] == segunda["id"]
    assert len(app_module.users_store.list_purchases(usuario["id"])) == 1


def test_manual_unlocks_do_not_collide_with_each_other(app_module, register_and_login):
    """El indice unico es parcial a proposito: los desbloqueos a mano no
    traen referencia de pasarela, y dos NULL no pueden chocar entre si. Si el
    indice fuera total, el segundo desbloqueo manual de la historia fallaria."""
    uno, _ = register_and_login()
    otro, _ = register_and_login()
    app_module.users_store.record_purchase(uno["id"], PRODUCTO, provider="manual")
    app_module.users_store.record_purchase(otro["id"], PRODUCTO, provider="manual")
    assert app_module.users_store.has_purchase(uno["id"], PRODUCTO)
    assert app_module.users_store.has_purchase(otro["id"], PRODUCTO)


def test_an_unconfirmed_purchase_opens_nothing(app_module, register_and_login):
    """Una compra iniciada y no confirmada deja fila igual. Si bastara con
    que la fila exista, empezar el checkout y abandonarlo abriria el
    informe."""
    usuario, _ = register_and_login()
    app_module.users_store.record_purchase(
        usuario["id"], PRODUCTO, provider="prueba", provider_ref="a-medias")
    with app_module.users_store.connect() as conexion:
        conexion.execute("UPDATE purchases SET status = 'PENDING' WHERE provider_ref = ?",
                         ("a-medias",))
    assert app_module.users_store.has_purchase(usuario["id"], PRODUCTO) is False


# --- El desbloqueo a mano -------------------------------------------------

def test_an_admin_can_open_a_report_without_any_gateway(
        client, app_module, admin_headers, register_and_login, monkeypatch):
    """Es lo que permite cobrar antes de tener integracion -alguien
    transfiere por Nequi y se le abre a mano- y la salida cuando un pago real
    se queda a medias."""
    monkeypatch.setattr(app_module, "PAYWALL_ENABLED", True)
    usuario, headers = register_and_login()
    assert _acceso(client, headers)["unlocked"] is False

    r = client.post(f"/api/v1/admin/users/{usuario['id']}/unlock-report",
                    json={"note": "pago por Nequi"}, headers=admin_headers)
    assert r.status_code == 200, r.text
    assert r.json()["purchase"]["provider"] == "manual"
    assert r.json()["purchase"]["note"] == "pago por Nequi"
    assert _acceso(client, headers)["unlocked"] is True


def test_a_manual_unlock_leaves_a_trace(
        client, app_module, admin_headers, register_and_login):
    """Desbloquear algo que vale dinero tiene que quedar registrado, y con el
    nombre de quien lo hizo."""
    usuario, _ = register_and_login()
    client.post(f"/api/v1/admin/users/{usuario['id']}/unlock-report",
                json={}, headers=admin_headers)
    acciones = app_module.users_store.list_admin_audit_log(limit=50)
    assert any(a["action"] == "unlock_report" for a in acciones)


def test_a_student_cannot_unlock_their_own_report(client, register_and_login):
    usuario, headers = register_and_login()
    r = client.post(f"/api/v1/admin/users/{usuario['id']}/unlock-report",
                    json={}, headers=headers)
    assert r.status_code in (401, 403), r.text


def test_unlocking_a_nonexistent_account_is_a_404(client, admin_headers):
    r = client.post("/api/v1/admin/users/999999/unlock-report",
                    json={}, headers=admin_headers)
    assert r.status_code == 404, r.text
