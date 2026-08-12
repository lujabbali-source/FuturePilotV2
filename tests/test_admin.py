"""Autorizacion del panel de administrador y sus herramientas (Theme Lab,
feature flags, System Health, reparaciones, audit log)."""

import pytest

ADMIN_EMAIL = "admin@test.local"  # debe coincidir con conftest.py


@pytest.fixture()
def admin_headers(client):
    client.post("/api/v1/auth/register", json={"email": ADMIN_EMAIL, "password": "AdminPass123", "name": "Admin"})
    login = client.post("/api/v1/auth/login", json={"email": ADMIN_EMAIL, "password": "AdminPass123"})
    data = login.json()
    assert data["user"]["is_admin"] is True
    return {"Authorization": f"Bearer {data['token']}"}


def test_admin_routes_require_authentication(client):
    r = client.get("/api/v1/admin/dashboard")
    assert r.status_code == 401


def test_admin_routes_reject_non_admin(client, register_and_login):
    _, headers = register_and_login()
    r = client.get("/api/v1/admin/dashboard", headers=headers)
    assert r.status_code == 403


def test_admin_promotion_via_admin_email(client, admin_headers):
    r = client.get("/api/v1/admin/me", headers=admin_headers)
    assert r.status_code == 200
    assert r.json()["user"]["email"] == ADMIN_EMAIL


def test_admin_dashboard_metrics_are_real_counts(client, admin_headers, register_and_login):
    before = client.get("/api/v1/admin/dashboard", headers=admin_headers).json()["metrics"]["total_users"]
    register_and_login()
    after = client.get("/api/v1/admin/dashboard", headers=admin_headers).json()["metrics"]["total_users"]
    assert after == before + 1


def test_theme_save_read_reset_cycle(client, admin_headers):
    r = client.put("/api/v1/admin/theme", headers=admin_headers, json={"colors": {"primary": "#123456"}})
    assert r.status_code == 200

    public = client.get("/api/theme").json()
    assert public["colors"]["primary"] == "#123456"

    r = client.delete("/api/v1/admin/theme", headers=admin_headers)
    assert r.status_code == 200
    assert client.get("/api/theme").json()["colors"] == {}


def test_theme_rejects_unknown_color_keys(client, admin_headers):
    r = client.put("/api/v1/admin/theme", headers=admin_headers, json={"colors": {"not_a_real_key": "#fff"}})
    assert r.status_code == 422


def test_theme_write_requires_admin(client, register_and_login):
    _, headers = register_and_login()
    r = client.put("/api/v1/admin/theme", headers=headers, json={"colors": {"primary": "#000000"}})
    assert r.status_code == 403


def test_flag_toggle_round_trip(client, admin_headers):
    r = client.put("/api/v1/admin/flags/admin_logs", headers=admin_headers, json={"enabled": True})
    assert r.status_code == 200
    assert client.get("/api/flags").json()["flags"]["admin_logs"] is True

    client.put("/api/v1/admin/flags/admin_logs", headers=admin_headers, json={"enabled": False})
    assert client.get("/api/flags").json()["flags"]["admin_logs"] is False


def test_flag_toggle_rejects_unknown_key(client, admin_headers):
    r = client.put("/api/v1/admin/flags/not_a_real_flag", headers=admin_headers, json={"enabled": True})
    assert r.status_code == 404


def test_system_health_reports_real_status(client, admin_headers):
    r = client.get("/api/v1/admin/health", headers=admin_headers)
    assert r.status_code == 200
    body = r.json()
    assert body["overall"] in ("ok", "warning", "error")
    for key in ("backend", "frontend", "database", "ai", "globe", "login", "auth", "apis", "static_assets"):
        assert key in body["checks"]
        assert body["checks"][key]["status"] in ("ok", "warning", "error")


def test_system_health_checks_only_reference_existing_pages(client, admin_headers):
    """Regresion: _check_frontend_pages exigia roadmap.html, que se elimino
    cuando /roadmap paso a ser un redirect a /journey. El chequeo devolvia
    "error" siempre y, como el estado global es el minimo de todos, el panel
    mostraba el sistema entero en rojo de forma permanente - tapando
    cualquier fallo real. El test anterior no lo detectaba porque aceptaba
    "error" como valor valido. Este exige que los chequeos que dependen de
    archivos del repo esten sanos en un checkout completo."""
    body = client.get("/api/v1/admin/health", headers=admin_headers).json()

    for key in ("frontend", "login", "static_assets"):
        assert body["checks"][key]["status"] == "ok", (
            f"El chequeo '{key}' referencia un archivo que ya no existe: "
            f"{body['checks'][key]['detail']}"
        )


def test_repair_reload_data_works(client, admin_headers):
    r = client.post("/api/v1/admin/repair/reload-data", headers=admin_headers)
    assert r.status_code == 200
    assert r.json()["success"] is True


def test_repair_unknown_action_404s(client, admin_headers):
    r = client.post("/api/v1/admin/repair/not-a-real-action", headers=admin_headers)
    assert r.status_code == 404


def test_admin_actions_are_audited(client, admin_headers):
    client.put("/api/v1/admin/theme", headers=admin_headers, json={"colors": {"primary": "#ABCDEF"}})
    client.delete("/api/v1/admin/theme", headers=admin_headers)

    r = client.get("/api/v1/admin/audit-log", headers=admin_headers)
    assert r.status_code == 200
    actions = [entry["action"] for entry in r.json()["entries"]]
    assert "theme.save" in actions
    assert "theme.reset" in actions


def test_migrated_pages_get_a_csp_without_unsafe_inline(client):
    """El pago de migrar una pagina al build de web/ (Fase 3): sin scripts
    inline, deja de necesitar 'unsafe-inline' en script-src. Las que aun
    cargan su JS con document.write lo siguen necesitando. Cuando se migre
    la ultima, la politica permisiva desaparece."""
    for path in ("/assessment", "/globe", "/login", "/reset-password"):
        csp = client.get(path).headers["content-security-policy"]
        assert "script-src 'self';" in csp, f"{path} no recibe la CSP estricta"
        assert "'unsafe-inline'" not in csp.split("style-src")[0], path

    # Una pagina sin migrar: sigue con la politica permisiva, a proposito.
    csp = client.get("/careers").headers["content-security-policy"]
    assert "script-src 'self' 'unsafe-inline'" in csp


def test_migrated_pages_are_served_from_the_build(client):
    """Las paginas migradas ya no tienen copia en Frontend/: salen del build
    de web/. Si el HTML servido trae un document.write, es que se esta
    sirviendo la version vieja desde algun sitio."""
    for path in ("/assessment", "/login", "/reset-password"):
        html = client.get(path).text
        assert "document.write" not in html, path
        assert "/app/assets/" in html, f"{path} no parece el HTML compilado por Vite"
