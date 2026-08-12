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


ALL_PAGES = [
    "/", "/assessment", "/globe", "/login", "/reset-password", "/passport",
    "/journey", "/flightplan", "/careers", "/terms", "/privacy",
    "/admin", "/admin/login", "/admin/theme-lab", "/admin/system-health",
]


def test_no_page_needs_unsafe_inline(client):
    """El entregable de seguridad del plan. Mientras las paginas cargaban su
    JS con document.write, script-src necesitaba 'unsafe-inline'; mientras
    pintaban anchos con style="width:N%" y se inyectaban <style> desde JS,
    lo necesitaba style-src. Ninguna de las dos cosas queda: la politica
    estricta aplica a TODAS las rutas, sin excepciones."""
    for path in ALL_PAGES:
        csp = client.get(path).headers["content-security-policy"]
        for directive in ("script-src", "style-src"):
            value = csp.split(directive)[1].split(";")[0]
            assert "'unsafe-inline'" not in value, f"{path}: {directive}{value}"
            assert "'unsafe-eval'" not in value, f"{path}: {directive}{value}"


def test_no_page_ships_inline_styles_or_scripts(client):
    """Lo que hace cumplible la politica de arriba. Un <style> en el HTML o
    un atributo style= reaparecerian como texto sin estilo en produccion,
    no como un fallo ruidoso - por eso se comprueba aqui y no a ojo."""
    import re

    for path in ALL_PAGES:
        html = client.get(path).text
        assert "<style" not in html, f"{path}: trae un bloque <style>"
        assert not re.search(r"<[^>]+\sstyle=", html), f"{path}: trae un atributo style="
        assert "document.write" not in html, path


def test_every_page_is_served_from_the_build(client):
    """Ninguna pagina tiene ya copia en Frontend/: todas salen del build de
    web/. Un document.write en la respuesta significa que se esta sirviendo
    una version vieja desde algun sitio."""
    for path in ALL_PAGES:
        html = client.get(path).text
        assert "document.write" not in html, path
        assert "/app/assets/" in html, f"{path} no parece el HTML compilado por Vite"


def test_frontend_dir_has_no_html_left(client):
    """Frontend/ se quedo solo con CSS e imagenes. Si reaparece un .html
    ahi, es una copia paralela de una pagina que ya vive en el build."""
    from pathlib import Path

    import app as fp_app

    stray = sorted(p.name for p in Path(fp_app.FRONTEND_DIR).rglob("*.html"))
    assert not stray, f"quedan paginas sin migrar en Frontend/: {stray}"


def test_no_page_ships_inline_handlers(client):
    """script-src 'self' bloquea los manejadores inline igual que los
    <script> inline. El boton de cada tarjeta de /careers llevaba
    onclick="openCareer(...)" generado desde JS: no daba error visible, el
    boton simplemente no hacia nada al pulsarlo. El HTML servido no basta
    para detectarlo (el markup lo genera el bundle), asi que se revisa
    tambien el JS compilado."""
    import re
    from pathlib import Path

    import app as fp_app

    handlers = re.compile(r'\son(?:click|change|submit|input|load|error)\s*=\s*["\']')

    for page in ("/", "/careers", "/assessment", "/passport", "/journey", "/flightplan"):
        assert not handlers.search(client.get(page).text), f"{page} sirve un manejador inline"

    for bundle in (Path(fp_app.WEB_DIST_DIR) / "assets").glob("*.js"):
        found = handlers.findall(bundle.read_text(encoding="utf-8", errors="ignore"))
        assert not found, f"{bundle.name} genera markup con manejador inline: {found[:3]}"
