"""Preparacion para produccion (Fase 4): entorno, cache, sonda de vida y
lo que NO debe salir por los logs."""

import os

import pytest

from backend import mailer


def test_liveness_probe_is_public_and_says_nothing(client):
    """El balanceador necesita preguntar "¿vives?" sin credenciales. Y solo
    eso: el detalle de que chequeo falla vive en /api/v1/admin/health, que
    exige admin."""
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_hashed_assets_are_cached_forever_and_html_never(client):
    """Vite pone un hash del contenido en el nombre de cada asset, asi que
    cachearlos para siempre es seguro: si cambian, cambia la URL. El HTML es
    lo contrario - su URL es fija y es quien apunta al bundle de turno. Si
    se cachea, un despliegue nuevo no le llega nunca al usuario."""
    html = client.get("/assessment")
    assert html.headers["cache-control"] == "no-store"

    # El nombre del bundle se saca del propio HTML, no se adivina.
    import re

    match = re.search(r'src="(/app/assets/[^"]+\.js)"', html.text)
    assert match, "el HTML compilado no referencia ningun bundle"

    asset = client.get(match.group(1))
    assert asset.status_code == 200
    assert "immutable" in asset.headers["cache-control"]
    assert "max-age=31536000" in asset.headers["cache-control"]


def test_api_responses_are_never_cached(client):
    """Dependen del token de quien pregunta y de datos que cambian."""
    assert client.get("/api/v1/careers").headers["cache-control"] == "no-store"


def test_password_reset_link_is_not_logged_in_production(monkeypatch, capsys):
    """Sin SMTP, en desarrollo el correo se imprime en consola para poder
    probar el flujo. En produccion eso metería un token de recuperacion
    valido en los logs, y cualquiera con acceso a ellos podria entrar en la
    cuenta. Este test fija que el contenido no se registra."""
    monkeypatch.delenv("SMTP_HOST", raising=False)
    secreto = "https://futurepilot.app/reset-password?token=TOKEN-SUPER-SECRETO"

    monkeypatch.setenv("FUTUREPILOT_ENV", "development")
    assert mailer.send_email("alguien@example.com", "Recupera tu acceso", secreto) is False
    assert "TOKEN-SUPER-SECRETO" in capsys.readouterr().out

    monkeypatch.setenv("FUTUREPILOT_ENV", "production")
    assert mailer.send_email("alguien@example.com", "Recupera tu acceso", secreto) is False
    salida = capsys.readouterr().out
    assert "TOKEN-SUPER-SECRETO" not in salida, "el token acabo en los logs"
    assert "SMTP_HOST" in salida, "deberia decir como arreglarlo"


def test_forgot_password_still_answers_the_same_without_smtp(client):
    """Aunque el envio falle, la respuesta no puede delatar si la cuenta
    existe (enumeracion de cuentas)."""
    a = client.post("/api/v1/auth/forgot-password", json={"email": "noexiste@example.com"})
    b = client.post("/api/v1/auth/forgot-password", json={"email": "admin@test.local"})
    assert a.status_code == b.status_code == 200
    assert a.json() == b.json()


def test_config_check_flags_a_bad_production_setup(app_module, monkeypatch):
    """check_production_config existe para que un despliegue mal configurado
    lo diga al arrancar en vez de fallar en silencio."""
    monkeypatch.setattr(app_module, "IS_PRODUCTION", True)
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", "")
    monkeypatch.setattr(app_module, "CORS_ORIGINS", ["http://localhost:5173"])
    monkeypatch.delenv("SMTP_HOST", raising=False)

    problemas = " | ".join(app_module.check_production_config())
    assert "ADMIN_EMAIL" in problemas
    assert "SMTP" in problemas
    assert "localhost" in problemas


def test_config_check_is_quiet_when_things_are_fine(app_module, client, monkeypatch):
    # La cuenta admin tiene que existir de verdad: uno de los chequeos avisa
    # justamente de cuando NO existe. Se registra aqui en vez de confiar en
    # que otro test la haya creado antes.
    correo = "admin-config-ok@example.com"
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": correo, "password": "password123"})

    monkeypatch.setattr(app_module, "IS_PRODUCTION", True)
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", correo)
    monkeypatch.setattr(app_module, "CORS_ORIGINS", [])
    monkeypatch.setattr(app_module, "USERS_DB_PATH", "/var/data/users.sqlite3")
    monkeypatch.setenv("SMTP_HOST", "smtp.example.com")

    assert app_module.check_production_config() == []


@pytest.mark.parametrize("path", ["/docs", "/redoc", "/openapi.json"])
def test_interactive_docs_are_available_in_development(client, path):
    """En desarrollo si se publican: son utiles. El interruptor de
    produccion se aplica al construir la app (docs_url=None), asi que no se
    puede comprobar aqui sin levantar una segunda instancia - queda fijado
    por el propio parametro en app.py."""
    assert client.get(path).status_code == 200


def test_environment_defaults_to_development(app_module):
    """Un despliegue real tiene que declararse. Heredar "production" por
    descuido seria peor que lo contrario."""
    assert os.environ.get("FUTUREPILOT_ENV") in (None, "", "development")
    assert app_module.IS_PRODUCTION is False


def test_admin_login_page_explains_setup_without_leaking_state(client):
    """En una instalacion nueva /admin/login era un callejon sin salida: no
    existe ningun "crear administrador" porque el acceso se concede por
    coincidencia con ADMIN_EMAIL, y la pagina no lo decia.

    La guia es texto fijo A PROPOSITO. Si consultara si la cuenta admin ya
    existe estaria anunciando que la plaza esta libre, y como el registro no
    verifica el correo, quien se registre con ese email se lleva el panel."""
    html = client.get("/admin/login").text

    assert "ADMIN_EMAIL" in html, "no explica de donde sale el acceso"
    assert "/login?mode=register" in html, "no dice donde registrarse"

    # Ni el email configurado ni si la cuenta existe pueden salir de aqui.
    assert "admin@test.local" not in html


def test_startup_check_flags_an_unclaimed_admin_account(app_module, client, monkeypatch):
    """Mientras la cuenta admin no exista, cualquiera que se registre con ese
    email obtiene el panel. El arranque tiene que decirlo: es una ventana
    real y los emails de admin suelen ser adivinables."""
    monkeypatch.setattr(app_module, "IS_PRODUCTION", True)
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", "nadie-registro-esto@example.com")
    monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
    monkeypatch.setattr(app_module, "USERS_DB_PATH", "/var/data/users.sqlite3")

    problemas = " | ".join(app_module.check_production_config())
    assert "todavia no existe" in problemas

    # Con la cuenta ya registrada, deja de avisar.
    correo = "admin-ya-registrado@example.com"
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": correo, "password": "password123"})
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", correo)
    assert "todavia no existe" not in " | ".join(app_module.check_production_config())


def _fresh_admin_env(app_module, monkeypatch, tmp_path, email):
    """Deja el sistema como una instalacion nueva: email admin configurado,
    sin cuenta que lo reclame y con el token en un fichero temporal."""
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", email)
    monkeypatch.setattr(app_module, "ADMIN_SETUP_PATH", tmp_path / "admin_setup.json")
    monkeypatch.delenv("ADMIN_SETUP_TOKEN", raising=False)


def test_admin_email_cannot_be_registered_without_the_setup_token(
    client, app_module, monkeypatch, tmp_path
):
    """El agujero que esto cierra: la promocion a admin es por coincidencia
    de email y el registro no verifica el correo, asi que quien registrara
    ese email primero se llevaba el panel. Los emails de admin suelen ser
    adivinables."""
    correo = "jefe@futurepilot.app"
    _fresh_admin_env(app_module, monkeypatch, tmp_path, correo)

    sin_token = client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": correo, "password": "password123"})
    assert sin_token.status_code == 403
    assert "token" in sin_token.json()["detail"].lower()

    malo = client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, 
        "email": correo, "password": "password123", "admin_setup_token": "no-es-el-token",
    })
    assert malo.status_code == 403

    # Y no dejo la cuenta a medio crear.
    assert app_module.users_store.find_user_id_by_email(correo) is None


def test_the_setup_token_claims_the_seat_once(client, app_module, monkeypatch, tmp_path):
    correo = "jefa@futurepilot.app"
    _fresh_admin_env(app_module, monkeypatch, tmp_path, correo)

    token = app_module.admin_setup_token()
    assert token, "sin cuenta admin deberia haber token"

    creada = client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, 
        "email": correo, "password": "password123", "admin_setup_token": token,
    })
    assert creada.status_code == 201
    assert creada.json()["user"]["is_admin"] is True

    # Reclamado el asiento, el token se retira: ya no hay nada que reclamar.
    assert app_module.admin_seat_is_claimed()
    assert app_module.admin_setup_token() is None


def test_the_token_survives_a_restart(app_module, monkeypatch, tmp_path):
    """Se persiste a proposito. Si se generara uno nuevo en cada arranque,
    un reinicio a mitad del despliegue invalidaria el que el operador acaba
    de copiar de la consola."""
    _fresh_admin_env(app_module, monkeypatch, tmp_path, "otro@futurepilot.app")
    assert app_module.admin_setup_token() == app_module.admin_setup_token()


def test_the_token_can_come_from_the_environment(app_module, monkeypatch, tmp_path):
    """Para despliegues automatizados, donde nadie lee la consola."""
    _fresh_admin_env(app_module, monkeypatch, tmp_path, "cicd@futurepilot.app")
    monkeypatch.setenv("ADMIN_SETUP_TOKEN", "token-del-orquestador")
    assert app_module.admin_setup_token() == "token-del-orquestador"


def test_the_token_never_leaves_the_server(client, app_module, monkeypatch, tmp_path):
    """La consola es el canal fuera de banda. Si el token saliera por HTTP
    el mecanismo no protegeria de nada."""
    correo = "secreto@futurepilot.app"
    _fresh_admin_env(app_module, monkeypatch, tmp_path, correo)
    token = app_module.admin_setup_token()

    for path in ("/admin/login", "/login", "/api/v1/status", "/healthz"):
        assert token not in client.get(path).text, f"{path} filtra el token"


def test_other_accounts_register_normally(client, app_module, monkeypatch, tmp_path):
    """El candado es solo para el email de administrador; el registro normal
    de estudiantes no cambia."""
    _fresh_admin_env(app_module, monkeypatch, tmp_path, "jefe2@futurepilot.app")
    r = client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, 
        "email": "estudiante-normal@example.com", "password": "password123",
    })
    assert r.status_code == 201
    assert r.json()["user"]["is_admin"] is False


def test_changing_the_admin_email_invalidates_the_old_token(app_module, monkeypatch, tmp_path):
    """El token se emite PARA un email concreto. Si ADMIN_EMAIL cambia y se
    reutilizara, quien vio el token del email antiguo podria reclamar
    tambien la cuenta nueva."""
    _fresh_admin_env(app_module, monkeypatch, tmp_path, "primero@futurepilot.app")
    primero = app_module.admin_setup_token()

    monkeypatch.setattr(app_module, "ADMIN_EMAIL", "segundo@futurepilot.app")
    segundo = app_module.admin_setup_token()

    assert segundo and segundo != primero


def test_every_font_a_stylesheet_asks_for_is_actually_declared():
    """Una tipografia que nadie declara no da error: el navegador cae al
    sistema y la pagina sigue viendose "bien", solo que con otra letra.

    Paso justo eso al dejar de pedirle las fuentes a Google. Auto-hospede
    Manrope y DM Mono en Frontend/fonts.css pero solo enlace esa hoja en
    cuatro de las nueve, asi que la portada, /careers, /journey y la politica
    de privacidad renderizaban con la letra del sistema. Nada fallaba. Habia
    ademas un `font-family: Inter` huerfano que no se hospedaba ni se pedia a
    ningun sitio, imponiendose sobre Manrope desde el selector `*`.

    La regla: si una hoja nombra una familia que no es generica, esa familia
    tiene que estar declarada por un @font-face que la hoja alcance."""
    import re
    from pathlib import Path

    frontend = Path(__file__).resolve().parent.parent / "Frontend"

    GENERICAS = {
        "sans-serif", "serif", "monospace", "cursive", "fantasy", "system-ui",
        "ui-monospace", "ui-sans-serif", "inherit", "initial", "unset",
        "arial", "helvetica", "georgia", "courier new", "times new roman",
    }

    declaradas = {
        m.group(1).strip("'\"").lower()
        for hoja in frontend.rglob("*.css")
        for bloque in re.findall(r"@font-face\s*\{[^}]*\}", hoja.read_text(encoding="utf-8"))
        for m in [re.search(r"font-family:\s*([^;]+)", bloque)]
        if m
    }
    assert declaradas, "ninguna @font-face: fonts.css desaparecio"

    huerfanas, sin_importar = [], []
    for hoja in sorted(frontend.rglob("*.css")):
        texto = hoja.read_text(encoding="utf-8")
        if "@font-face" in texto:
            continue
        pedidas = set()
        for valor in re.findall(r"font-family:\s*([^;}]+)", texto):
            for familia in valor.split(","):
                familia = familia.strip().strip("'\"").lower()
                if familia and familia not in GENERICAS and not familia.startswith("var("):
                    pedidas.add(familia)
        if not pedidas:
            continue
        for familia in sorted(pedidas):
            if familia not in declaradas:
                huerfanas.append(f"{hoja.name}: pide '{familia}', que nadie declara")
        # La hoja pide una webfont, asi que tiene que alcanzar las @font-face.
        if "fonts.css" not in texto:
            sin_importar.append(f"{hoja.name}: pide {sorted(pedidas)} sin importar fonts.css")

    assert not huerfanas, "familias sin @font-face:\n  " + "\n  ".join(huerfanas)
    assert not sin_importar, (
        "hojas que piden una webfont y no la cargan:\n  " + "\n  ".join(sin_importar)
    )


def test_the_health_probe_answers_a_head_request(client):
    """Un monitor de disponibilidad rara vez pide el cuerpo: le basta con la
    cabecera, asi que sondea con HEAD.

    `@app.get` en FastAPI registra GET a secas, de modo que HEAD devolvia 405 y
    el monitor daba el servicio por caido estando perfectamente vivo. Es el
    peor tipo de fallo de despliegue: no se ve en desarrollo, porque en el
    navegador uno siempre entra con GET, y aparece de madrugada como una
    alerta falsa."""
    assert client.get("/healthz").status_code == 200
    assert client.head("/healthz").status_code == 200


def test_the_landing_page_answers_a_head_request(client):
    """La otra URL que se monitoriza por defecto es la raiz del sitio."""
    assert client.get("/").status_code == 200
    assert client.head("/").status_code == 200


def test_email_links_do_not_trust_the_host_header(app_module, monkeypatch):
    """El enlace de recuperacion es el token mas sensible que sale de aqui, y
    se armaba con str(request.base_url): o sea, con la cabecera Host que manda
    quien llama.

    Eso permite el envenenamiento clasico del reset - pedir la recuperacion de
    la cuenta de otra persona con un Host falsificado, para que el correo que
    le llega a la victima apunte al servidor del atacante con un token valido
    dentro - y ademas detras de un proxy el esquema salia http, con lo que el
    token viajaba en claro en el primer salto.

    Con PUBLIC_BASE_URL puesta, el enlace deja de depender de la peticion.
    """
    class PeticionFalsa:
        base_url = "http://host-del-atacante.example/"

    monkeypatch.setattr(app_module, "PUBLIC_BASE_URL", "https://futurepilot.example")
    assert app_module.base_publica(PeticionFalsa()) == "https://futurepilot.example"

    # Sin la variable se cae a la peticion, que es lo que hace falta en
    # desarrollo: ahi el host cambia (localhost, 127.0.0.1, la IP de la red).
    monkeypatch.setattr(app_module, "PUBLIC_BASE_URL", "")
    assert app_module.base_publica(PeticionFalsa()) == "http://host-del-atacante.example"
