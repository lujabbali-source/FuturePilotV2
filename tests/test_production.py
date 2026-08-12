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


def test_config_check_is_quiet_when_things_are_fine(app_module, monkeypatch):
    monkeypatch.setattr(app_module, "IS_PRODUCTION", True)
    monkeypatch.setattr(app_module, "ADMIN_EMAIL", "admin@futurepilot.app")
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
