"""Fixtures compartidas. Los env vars de aislamiento (USERS_DB_PATH,
FUTUREPILOT_MEMORY_DIR, ADMIN_EMAIL) se fijan a rutas temporales ANTES de
importar app.py - app.py crea users_store y ai_system a nivel de modulo,
una sola vez al importarse, asi que si se seteraran despues ya seria tarde.
Esto garantiza que correr la suite nunca toca backend/data/users.sqlite3
ni futurepilot-IA/data/users/ reales."""

import os
import sys
import tempfile
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent
FUTUREPILOT_IA_DIR = REPO_ROOT / "futurepilot-IA"

_tmp_dir = tempfile.TemporaryDirectory(prefix="futurepilot-tests-")
os.environ["USERS_DB_PATH"] = str(Path(_tmp_dir.name) / "test_users.sqlite3")
os.environ["FUTUREPILOT_MEMORY_DIR"] = str(Path(_tmp_dir.name) / "memory")
os.environ["ADMIN_EMAIL"] = "admin@test.local"
# PBKDF2 a 600k iteraciones (el valor real de produccion) tarda ~1.2s POR
# HASH en esta maquina - la suite hace decenas de registros/logins reales,
# lo que la vuelve de minutos a segundos. Solo aplica dentro de este
# proceso de test (ver users_store.PBKDF2_ITERATIONS) - la app real nunca
# fija esta variable, asi que produccion siempre usa las 600k completas.
os.environ["PBKDF2_ITERATIONS_TEST_ONLY"] = "1000"

# La suite NO manda correo. app.py hace load_dotenv(.env), asi que en cuanto
# hay un proveedor configurado de verdad los tests que registran un menor o
# piden recuperar la contraseña se ponen a hablar con el servidor de correo:
# gastan cuota, tardan, fallan sin red, y - lo peor - entregan a direcciones
# inventadas tipo @example.com. Cada una de esas rebota, y los rebotes son
# justo lo que hace que a un remitente le cierren la cuenta.
#
# Se ponen VACIAS en vez de borrarlas: load_dotenv() no pisa una variable que
# ya existe, pero si rellena una que falta, asi que borrarlas las devolveria
# el propio .env al importar app.py. Vacia gana a las dos cosas -
# mailer.is_configured() lee bool(SMTP_HOST) y "" es falso - y deja a la suite
# en el camino que ya esperaba: imprimir en consola en vez de enviar. Mismo
# criterio que USERS_DB_PATH: los tests no tocan los datos reales, y tampoco
# el correo real.
for _smtp in ("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"):
    os.environ[_smtp] = ""

for _path in (REPO_ROOT, FUTUREPILOT_IA_DIR):
    if str(_path) not in sys.path:
        sys.path.insert(0, str(_path))

import app as fp_app  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402


@pytest.fixture(scope="session")
def client():
    return TestClient(fp_app.app)


@pytest.fixture(autouse=True)
def _reset_rate_limiters():
    """Los limitadores son globales a nivel de modulo y todos los tests
    comparten la misma IP sintetica de TestClient - sin este reset, un
    test que dispara el limite (a proposito, para probarlo) dejaria
    "envenenados" con 429 a todos los tests que corran despues."""
    for limiter in (fp_app.login_rate_limiter, fp_app.register_rate_limiter,
                    fp_app.password_reset_rate_limiter, fp_app.consent_rate_limiter,
                    fp_app.verify_email_rate_limiter,
                    fp_app.resend_verification_rate_limiter):
        limiter._hits.clear()
    yield


@pytest.fixture()
def app_module():
    return fp_app

# Debe coincidir con el ADMIN_EMAIL que se fija arriba, antes de importar
# app.py. Vive aqui porque el fixture de abajo lo usan ya varios archivos
# de test: el panel de administracion y el informe general.
ADMIN_EMAIL = "admin@test.local"


@pytest.fixture()
def admin_headers(client, app_module):
    """Cabeceras de una sesion de administrador real.

    Reclamar la cuenta admin exige el token de primer arranque (ver
    admin_setup_token en app.py). Se pide igual que lo haria el operador
    leyendolo de la consola del servidor."""
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, 
        "email": ADMIN_EMAIL,
        "password": "AdminPass123",
        "name": "Admin",
        "admin_setup_token": app_module.admin_setup_token(),
    })
    login = client.post("/api/v1/auth/login",
                        json={"email": ADMIN_EMAIL, "password": "AdminPass123"})
    data = login.json()
    assert data["user"]["is_admin"] is True
    return {"Authorization": f"Bearer {data['token']}"}


@pytest.fixture()
def register_and_login(client):
    """Devuelve una funcion que registra + inicia sesion una cuenta nueva
    con email unico (evita colisiones entre tests que comparten la misma
    base temporal) y devuelve (user_dict, headers)."""
    counter = {"n": 0}

    def _make(email: str | None = None, password: str = "password123", name: str = "QA"):
        counter["n"] += 1
        email = email or f"qa-{counter['n']}-{os.urandom(4).hex()}@example.com"
        client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": email, "password": password, "name": name})
        login = client.post("/api/v1/auth/login", json={"email": email, "password": password})
        data = login.json()
        headers = {"Authorization": f"Bearer {data['token']}"}
        return data["user"], headers

    return _make


@pytest.fixture()
def sample_answers():
    return [{"question_index": i, "answer_index": i % 4} for i in range(50)]
