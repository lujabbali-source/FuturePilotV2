"""Autorizacion del panel de administrador y sus herramientas (System
Health, reparaciones, audit log), y lo que se retiro de el."""

import os

import pytest

ADMIN_EMAIL = "admin@test.local"  # debe coincidir con conftest.py

# El fixture `admin_headers` vive en conftest.py desde que tambien lo usa
# tests/test_report.py: duplicarlo dejaria dos formas de reclamar la cuenta
# de administrador que divergirian a la primera que alguien tocara.


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


def test_the_theme_lab_is_gone(client, admin_headers):
    """El Theme Lab se retiro: dejaba al admin repintar el sitio, pero eso
    no acercaba a ningun estudiante a elegir carrera, y a cambio metia un
    endpoint publico (/api/theme) en CADA carga de pagina y obligaba a la
    CSP a permitir iframes del mismo origen.

    Se comprueba que no quedan restos: una ruta huerfana que devuelva 500,
    o un endpoint de escritura olvidado, es peor que la funcionalidad."""
    assert client.get("/admin/theme-lab").status_code == 404
    assert client.get("/api/theme").status_code == 404
    # 404, no 405: la ruta no existe con ningun metodo.
    assert client.put("/api/v1/admin/theme", headers=admin_headers, json={"colors": {}}).status_code == 404
    assert client.delete("/api/v1/admin/theme", headers=admin_headers).status_code == 404


def test_no_page_can_be_framed(client):
    """frame-ancestors paso de 'self' a 'none' al irse el Theme Lab, que era
    lo unico que embebia una pagina propia en un iframe. Sin iframes, 'none'
    cierra el clickjacking del todo."""
    csp = client.get("/").headers["content-security-policy"]
    assert "frame-ancestors 'none'" in csp
    assert "frame-src 'none'" in csp


def test_the_feature_flags_are_gone(client, admin_headers):
    """Los feature flags se retiraron. Once banderas, un endpoint publico,
    otro de admin y un fichero de configuracion, y lo unico que conseguia
    activar una era cambiar la etiqueta de un <span> del sidebar de
    "Proximamente" a "Activo (beta)". No habia pagina detras de ninguna."""
    assert client.get("/api/flags").status_code == 404
    assert client.put(
        "/api/v1/admin/flags/admin_logs", headers=admin_headers, json={"enabled": True}
    ).status_code == 404


def test_the_admin_sidebar_only_lists_pages_that_exist(client):
    """Con los flags se fueron los once items "Proximamente": eran <span>
    sin enlace ni pagina detras. Un menu lleno de promesas envejece mal."""
    html = client.get("/admin").text
    assert "Próximamente" not in html
    assert "data-flag-item" not in html


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
    # Se auditaba con theme.save y flag.update; retirados el Theme Lab y los
    # feature flags, las unicas acciones que quedan son las reparaciones.
    client.post("/api/v1/admin/repair/resync-admin", headers=admin_headers)
    client.post("/api/v1/admin/repair/reload-data", headers=admin_headers)

    r = client.get("/api/v1/admin/audit-log", headers=admin_headers)
    assert r.status_code == 200
    actions = [entry["action"] for entry in r.json()["entries"]]
    assert "repair.resync-admin" in actions
    assert "repair.reload-data" in actions


ALL_PAGES = [
    "/", "/assessment", "/globe", "/login", "/reset-password", "/passport",
    "/journey", "/flightplan", "/careers", "/informe", "/terms", "/privacy",
    "/admin", "/admin/login", "/admin/system-health", "/admin/informe",
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


def test_hidden_attribute_is_never_overridden(client):
    """El atributo `hidden` solo vale `display: none` como estilo de agente de
    usuario, asi que cualquier regla de autor que fije `display` sobre la misma
    clase lo anula y el elemento sigue a la vista. Fallo silencioso: el JS cree
    que lo oculto y nada avisa. Paso con el indicador de carga del pasaporte y
    con sus controles de pagina, que seguian ocupando sitio con `hidden`
    puesto. Por eso cada hoja que sirva una pagina con `hidden` en el markup
    tiene que normalizarlo."""
    import re
    from pathlib import Path

    import app as fp_app

    normaliza = re.compile(r"\[hidden\][^{]*\{[^}]*display\s*:\s*none", re.I)
    hojas = re.compile(r'<link[^>]+href="(/Frontend/[^"]+\.css)"')

    for page in ("/", "/careers", "/assessment", "/passport", "/journey",
                 "/flightplan", "/login", "/admin", "/system-health"):
        html = client.get(page).text
        if not re.search(r"\shidden(?=[\s>])", html):
            continue
        for href in hojas.findall(html):
            css = (Path(fp_app.FRONTEND_DIR) / href[len("/Frontend/"):]).read_text(encoding="utf-8")
            assert normaliza.search(css), f"{page}: {href} no neutraliza [hidden]"


def test_no_bundle_calls_an_undefined_helper(client):
    """Una funcion usada sin importar mata el modulo entero en la primera
    linea, y no se nota desde el servidor: la pagina se sirve con 200 y lo
    que queda en pantalla es el markup de partida.

    Paso justo eso en /flightplan. Al traducir la pagina sustitui unas cadenas
    por llamadas a `t(...)` y no añadi el import; el bundle lanzaba
    "t is not defined" antes de hacer nada, y las cuatro tarjetas se quedaban
    diciendo "Loading..." para siempre. El test de manejadores inline no lo
    veia porque no es markup, es un error de ejecucion.

    Se comprueba estaticamente: si un bundle NOMBRA a `t(` o `currentLanguage(`
    sin traerlo de i18next, esta roto.
    """
    import re
    from pathlib import Path

    import app as fp_app

    # Los bundles compilados renombran los imports, asi que se revisa el
    # FUENTE, que es donde se escribe el fallo.
    fuente = Path(__file__).resolve().parent.parent / "web" / "src"

    ayudas = ("t", "currentLanguage", "onLanguageChange", "setLanguage", "applyTranslations")
    for modulo in fuente.rglob("*.js"):
        if "/database/" in modulo.as_posix() or "/locales/" in modulo.as_posix():
            continue
        codigo = modulo.read_text(encoding="utf-8", errors="ignore")
        # Comentarios fuera: hablan de estas funciones sin llamarlas.
        codigo = re.sub(r"^\s*//.*$", "", codigo, flags=re.M)
        codigo = re.sub(r"/\*[\s\S]*?\*/", "", codigo)

        importado = set()
        for m in re.finditer(r"import\s*\{([^}]*)\}\s*from", codigo):
            for pieza in m.group(1).split(","):
                nombre = pieza.split(" as ")[-1].strip()
                if nombre:
                    importado.add(nombre)
        # Tambien vale definirlas o derivarlas en el propio modulo.
        for m in re.finditer(r"(?:function|const|let|var)\s+(\w+)", codigo):
            importado.add(m.group(1))

        for ayuda in ayudas:
            if re.search(rf"(?<![\w.$]){re.escape(ayuda)}\s*\(", codigo) and ayuda not in importado:
                raise AssertionError(
                    f"{modulo.relative_to(fuente)} llama a {ayuda}() sin importarlo ni definirlo"
                )

    # Y las paginas se siguen sirviendo desde el build compilado.
    assert (Path(fp_app.WEB_DIST_DIR) / "assets").exists()


def test_no_helper_call_leaks_into_markup_as_literal_text(client):
    """Una llamada a t() escrita dentro de una plantilla sin `${}` no es codigo:
    es texto. Se sirve tal cual al navegador.

    Paso justo eso: al traducir el chat del mentor sustitui la cadena del
    placeholder por `placeholder=tm("mentor.placeholder")` sin interpolar, y el
    campo mostraba literalmente `tm("mentor.placeholder")`. No hay error ni en
    consola ni en el build; solo se ve en pantalla.
    """
    import re
    from pathlib import Path

    fuente = Path(__file__).resolve().parent.parent / "web" / "src"

    # Un atributo cuyo valor arranca directamente en una llamada a la funcion
    # de traduccion, sin comillas ni `${`.
    fuga = re.compile(r'\w+=\s*t[a-z]*\(')

    for modulo in fuente.rglob("*.js"):
        if "/database/" in modulo.as_posix():
            continue
        codigo = modulo.read_text(encoding="utf-8", errors="ignore")
        codigo = re.sub(r"^\s*//.*$", "", codigo, flags=re.M)
        encontrado = fuga.findall(codigo)
        assert not encontrado, (
            f"{modulo.relative_to(fuente)}: llamada a traduccion sin interpolar "
            f"dentro de markup: {encontrado[:3]}"
        )


def test_every_health_check_has_a_label_in_the_panel(client, admin_headers):
    """El panel solo pinta los checks que aparecen en su diccionario LABELS
    (web/src/admin/system-health.js): `Object.keys(LABELS).forEach`. Un check
    que el backend devuelve pero que no esta ahi no da error ni hueco - no
    existe, y nadie lo mira nunca.

    Se descubrio porque `backups` llevaba asi desde que se anadio: vigilaba
    que el respaldo diario no muriera en silencio, y era invisible.
    """
    import re
    from pathlib import Path

    panel = (Path(__file__).resolve().parent.parent
             / "web" / "src" / "admin" / "system-health.js").read_text(encoding="utf-8")
    bloque = re.search(r"const LABELS = \{(.*?)\};", panel, re.S)
    assert bloque, "no se encontro el diccionario LABELS en system-health.js"
    etiquetados = set(re.findall(r"^\s*(\w+):", bloque.group(1), re.M))

    devueltos = set(client.get("/api/v1/admin/health", headers=admin_headers).json()["checks"])
    invisibles = devueltos - etiquetados
    assert not invisibles, (
        f"checks que el panel nunca muestra: {sorted(invisibles)}. "
        "Anade su etiqueta en LABELS (web/src/admin/system-health.js)."
    )


# --------------------------------------------------------------------------
# ADMIN_PASSWORD: la cuenta de admin sin pasar por el token de consola.
# --------------------------------------------------------------------------
@pytest.fixture()
def seed_env(app_module, monkeypatch):
    """Fija ADMIN_EMAIL/ADMIN_PASSWORD como si vinieran del entorno.

    Se parchean sobre el modulo y no sobre os.environ porque app.py los
    resuelve una sola vez al importarse (ver conftest): a estas alturas
    tocar el entorno ya no cambiaria nada.
    """
    def _apply(email: str, password: str) -> None:
        monkeypatch.setattr(app_module, "ADMIN_EMAIL", email)
        monkeypatch.setattr(app_module, "ADMIN_PASSWORD", password)

    yield _apply

    # sync_admin_email deja is_admin en UNA sola cuenta, asi que sin esto el
    # email de admin de la suite se quedaria degradado para los tests que
    # corran despues.
    app_module.users_store.sync_admin_email(ADMIN_EMAIL)


def test_seed_does_nothing_without_a_password(app_module, seed_env):
    """Sin ADMIN_PASSWORD el comportamiento es el de siempre: solo token."""
    seed_env("nadie@test.local", "")
    assert app_module.seed_admin_account() == "sin-configurar"
    assert app_module.users_store.find_user_id_by_email("nadie@test.local") is None


def test_seed_rejects_a_password_weaker_than_a_students(app_module, seed_env):
    """8 caracteres es el minimo que RegisterRequest le exige a un
    estudiante. El admin no puede entrar por un liston mas bajo."""
    seed_env("corta@test.local", "1234567")
    assert app_module.seed_admin_account() == "invalida"
    assert app_module.users_store.find_user_id_by_email("corta@test.local") is None


def test_seed_creates_the_admin_account_ready_to_log_in(client, app_module, seed_env):
    email = f"seed-{os.urandom(4).hex()}@test.local"
    seed_env(email, "SeedPass123")

    assert app_module.seed_admin_account() == "creada"

    login = client.post("/api/v1/auth/login", json={"email": email, "password": "SeedPass123"})
    assert login.status_code == 200
    assert login.json()["user"]["is_admin"] is True


def test_seed_never_overwrites_an_existing_password(client, app_module, seed_env):
    """Si el sembrado pisara la contraseña, cambiarla desde la app duraria
    hasta el siguiente reinicio - y una variable olvidada en el panel del
    PaaS revertiria en silencio una contraseña que se cambio por filtrada."""
    email = f"seed-{os.urandom(4).hex()}@test.local"
    seed_env(email, "LaPrimera123")
    assert app_module.seed_admin_account() == "creada"

    seed_env(email, "OtraDistinta456")
    assert app_module.seed_admin_account() == "ya-existia"

    rechazada = client.post("/api/v1/auth/login", json={"email": email, "password": "OtraDistinta456"})
    assert rechazada.status_code == 401
    sigue_valiendo = client.post("/api/v1/auth/login", json={"email": email, "password": "LaPrimera123"})
    assert sigue_valiendo.status_code == 200


def test_a_short_admin_password_is_reported_as_a_config_problem(app_module, seed_env, monkeypatch):
    """El sembrado se calla cuando la cuenta ya existia, asi que una
    ADMIN_PASSWORD corta pasaria inadvertida hasta el dia que la base se
    pierda y toque crearla de verdad."""
    monkeypatch.setattr(app_module, "IS_PRODUCTION", True)
    seed_env(ADMIN_EMAIL, "corta")

    problemas = app_module.check_production_config()

    assert any("ADMIN_PASSWORD" in p for p in problemas), problemas


# --------------------------------------------------------------------------
# Copia de seguridad automatica en proceso.
# --------------------------------------------------------------------------
def test_backup_scheduler_is_off_unless_asked(app_module, monkeypatch):
    """Apagada por defecto: sin disco persistente una copia se borra con el
    mismo reinicio que se lleva la base que pretendia respaldar."""
    monkeypatch.setattr(app_module, "BACKUP_ENABLED", False)
    assert app_module.start_backup_scheduler() is False


def test_run_backup_creates_a_verified_copy(app_module, tmp_path, monkeypatch):
    monkeypatch.setenv("BACKUP_DIR", str(tmp_path))

    nombre = app_module.run_backup()

    assert nombre is not None
    copias = list(tmp_path.glob("users-*.sqlite3"))
    assert len(copias) == 1 and copias[0].name == nombre
    from backend import backup as backup_mod
    ok, detalle = backup_mod.verificar(copias[0])
    assert ok, detalle


def test_a_failed_backup_does_not_kill_the_thread(app_module, tmp_path, monkeypatch):
    """crear() aborta con SystemExit, que NO hereda de Exception. Sin
    capturarlo aparte, el hilo moriria y las copias dejarian de hacerse en
    silencio - el fallo exacto que este respaldo viene a evitar."""
    monkeypatch.setenv("USERS_DB_PATH", str(tmp_path / "no-existe.sqlite3"))
    monkeypatch.setenv("BACKUP_DIR", str(tmp_path))

    assert app_module.run_backup() is None
    assert list(tmp_path.glob("users-*.sqlite3")) == []
