"""
===============================================================================
FUTUREPILOT API SERVER (FASTAPI) - Backend unificado
===============================================================================
Punto de entrada único del backend de FuturePilot. Absorbe lo que antes
eran dos servidores FastAPI separados (backend/main.py y este archivo):

  - Sirve Frontend/ como sitio estático (HTML/CSS/JS vanilla).
  - Expone la API de evaluación vocacional respaldada por el motor de IA
    rule-based (ai_engine.py): preguntas, carreras, assess, mentor chat.
  - Expone autenticación real (backend/users_store.py): registro/login con
    contraseñas hasheadas (PBKDF2-SHA256, stdlib) y sesiones por token
    bearer (Authorization header, no cookies).

backend/ dejó de correr su propio servidor: main.py se retiró porque su
funcionalidad (estáticos, páginas HTML) quedó absorbida aquí. La carpeta
backend/ se conserva como librería de datos (users_store.py, data/).

Las universidades de America ya no vienen de un catalogo externo (WHED):
la fuente oficial es el documento de Word curado a mano, volcado a
futurepilot-globe/src/database/countries/**/*.js via
futurepilot-globe/scripts/parse_universities_docx.py +
import_americas_docx.py. El backend no expone rutas de universidades -
el globo lee esos archivos directamente.
===============================================================================
"""

import json
import os
import re
import secrets
import sys
from datetime import timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

# --------------------------------------------------------------------------
# Resolución de rutas e imports entre paquetes hermanos
# --------------------------------------------------------------------------
# "futurepilot-IA" tiene un guion en el nombre y no puede importarse como
# paquete Python normal (import futurepilot-IA fallaría). Por eso se agregan
# explícitamente al sys.path tanto la raíz del repo (para poder hacer
# `from backend.users_store import UsersStore`) como esta misma carpeta
# (para `import ai_engine`), sin importar desde qué cwd se lance uvicorn.
BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent
for _path in (REPO_ROOT, BASE_DIR):
    if str(_path) not in sys.path:
        sys.path.insert(0, str(_path))

from ai_engine import FuturePilotAIEcosystem  # noqa: E402
from backend.config_store import delete_json, read_json, write_json  # noqa: E402
from backend import mailer  # noqa: E402
from backend.rate_limiter import RateLimiter, client_ip  # noqa: E402
from backend.users_store import (  # noqa: E402
    DuplicateEmailError,
    InvalidCredentialsError,
    UsersStore,
    hash_password,
    utc_now,
)

load_dotenv(REPO_ROOT / ".env")

FRONTEND_DIR = REPO_ROOT / "Frontend"

# Unica fuente de verdad de quien es administrador: el email configurado en
# .env (nunca un valor de prueba escrito en el codigo). Vacio = nadie es
# admin. Ver .env.example para instrucciones.
ADMIN_EMAIL = (os.environ.get("ADMIN_EMAIL") or "").strip()

app = FastAPI(
    title="FuturePilot API",
    description="Backend unificado: evaluación vocacional (IA rule-based) + autenticación",
    version="2.0.0",
)

# Limitadores de fuerza bruta / spam en las rutas de autenticacion. Ver
# backend/rate_limiter.py para las limitaciones de este enfoque (un solo
# proceso) y como reemplazarlo por Redis si el deployment escala.
login_rate_limiter = RateLimiter(max_requests=10, window_seconds=60)
register_rate_limiter = RateLimiter(max_requests=5, window_seconds=300)
password_reset_rate_limiter = RateLimiter(max_requests=5, window_seconds=300)

# Origenes permitidos por CORS: configurables via env (coma-separada) para
# no tener que tocar codigo por cada entorno (dev/staging/produccion). Los
# puertos de Vite quedan como default solo para que `npm run dev` en
# futurepilot-globe/ siga funcionando sin configuracion extra - el sitio
# servido por este mismo backend (todo same-origin) no necesita CORS.
_default_cors_origins = "http://localhost:5173,http://127.0.0.1:5173"
CORS_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", _default_cors_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------
# Cabeceras de seguridad en cada respuesta. CSP permite 'unsafe-inline' en
# script-src porque el sitio usa un bootstrap inline (document.write) en
# cada pagina HTML para resolver rutas relativas/absolutas segun como se
# sirve - quitarlo requeriria reescribir ese patron en todas las paginas,
# no solo agregar la cabecera. frame-ancestors/frame-src usan 'self' (no
# DENY) porque el Theme Lab del admin embebe la propia landing page en un
# <iframe> para la vista previa en vivo.
# --------------------------------------------------------------------------
_CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline'; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data:; "
    "connect-src 'self'; "
    "frame-src 'self'; "
    "frame-ancestors 'self'; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'self'"
)


@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = _CSP
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response


# --------------------------------------------------------------------------
# Datos y motores
# --------------------------------------------------------------------------
def load_json_file(relative_path: str) -> List[Dict[str, Any]]:
    """Carga de manera segura un archivo JSON desde la ruta relativa dada."""
    file_path = BASE_DIR / relative_path
    if not file_path.exists():
        print(f"Advertencia: No se encontro el archivo en {file_path}")
        return []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error cargando {file_path}: {e}")
        return []


careers_db = load_json_file("data/careers.json")
questions_db = load_json_file("data/questions.json")

ai_system = FuturePilotAIEcosystem(careers_data=careers_db, questions_data=questions_db)

# Configurable via env var: para tests aislados (ver tests/conftest.py) y
# para deployments reales donde la base deberia vivir en un disco
# persistente separado, no junto al codigo de la app.
USERS_DB_PATH = os.environ.get("USERS_DB_PATH") or str(REPO_ROOT / "backend" / "data" / "users.sqlite3")
users_store = UsersStore(USERS_DB_PATH)
users_store.sync_admin_email(ADMIN_EMAIL or None)

# --------------------------------------------------------------------------
# Configuracion editable desde el panel de administrador (Theme Lab, feature
# flags) - JSON simple en backend/data/, leido del disco en cada peticion
# (ver backend/config_store.py). Ausencia de archivo = valores por defecto,
# nunca un error.
# --------------------------------------------------------------------------
THEME_CONFIG_PATH = REPO_ROOT / "backend" / "data" / "theme.json"
FLAGS_CONFIG_PATH = REPO_ROOT / "backend" / "data" / "feature_flags.json"

# Las 8 categorias de color que el Theme Lab puede sobreescribir, mapeadas
# 1:1 a las variables CSS de Frontend/style.css (ver :root ahi). Sirven
# tambien de validacion: PUT /api/v1/admin/theme rechaza cualquier clave
# que no este en esta lista.
THEME_COLOR_KEYS = [
    "bg", "primary", "primary-rgb", "secondary", "secondary-rgb",
    "accent", "button", "glow", "glow-rgb", "card-bg", "text", "text-muted",
]

# Secciones reservadas del sidebar del admin (ver admin-dashboard.html) que
# todavia no tienen una herramienta real detras - el admin puede activarlas
# para probarlas mientras se construyen, sin esperar a que "el sistema las
# considere terminadas". Activar un flag no crea funcionalidad que no
# existe: solo cambia como se presenta esa seccion en el dashboard.
DEFAULT_FEATURE_FLAGS = {
    "admin_users": False,
    "admin_stats": False,
    "admin_test_results": False,
    "admin_universities": False,
    "admin_countries": False,
    "admin_knowledge_base": False,
    "admin_ai_config": False,
    "admin_system_config": False,
    "admin_surveys": False,
    "admin_logs": False,
    "admin_settings": False,
}

# Bandera por pais para los sellos del Pasaporte - mismos ids que
# futurepilot-globe/src/database/countries/ (colombia + los 21 de
# americas/index.js). "🌍" es el fallback si algun dia se agrega un pais
# sin bandera todavia mapeada aqui.
PASSPORT_COUNTRY_FLAGS = {
    "colombia": "🇨🇴", "brasil": "🇧🇷", "ecuador": "🇪🇨", "argentina": "🇦🇷",
    "peru": "🇵🇪", "chile": "🇨🇱", "uruguay": "🇺🇾", "paraguay": "🇵🇾",
    "bolivia": "🇧🇴", "mexico": "🇲🇽", "estados-unidos": "🇺🇸", "canada": "🇨🇦",
    "costa-rica": "🇨🇷", "republica-dominicana": "🇩🇴", "panama": "🇵🇦",
    "cuba": "🇨🇺", "haiti": "🇭🇹", "guatemala": "🇬🇹", "honduras": "🇭🇳",
    "nicaragua": "🇳🇮", "puerto-rico": "🇵🇷", "el-salvador": "🇸🇻",
}

# Eventos que el propio frontend puede reportar directamente (exploracion
# de bajo riesgo). test_completed/roadmap_created/ai_conversation quedan
# deliberadamente afuera: solo se registran desde el backend, en el mismo
# momento en que de verdad ocurren (claim-result, mentor/chat) - si
# estuvieran aca, cualquiera podria fabricar un POST y "ganarse" esos
# sellos sin haber hecho nada.
PASSPORT_CLIENT_EVENT_TYPES = {"university_viewed", "country_explored", "city_explored"}


def _award_passport_stamps(
    user_id: int, event_type: str, subject_id: Optional[str], subject_label: Optional[str]
) -> List[Dict[str, str]]:
    """Reglas fijas evento -> sello. award_passport_stamp ya es idempotente
    (UNIQUE en la tabla), asi que esta funcion solo devuelve los sellos
    otorgados de verdad AHORA - lo que el frontend usa para decidir que
    sello animar "estampandose", sin repetir la animacion en visitas
    posteriores al mismo pais/accion."""
    newly_awarded: List[Dict[str, str]] = []

    def try_award(key: str, label: str) -> None:
        if users_store.award_passport_stamp(user_id, key, label):
            newly_awarded.append({"key": key, "label": label})

    if event_type == "test_completed":
        try_award("test_completed", "📚 Terminó el test")
    elif event_type == "roadmap_created":
        try_award("roadmap_created", "🗺️ Creó su roadmap")
    elif event_type == "ai_conversation":
        try_award("ai_chat", "🤖 Habló con la IA")
    elif event_type == "university_viewed":
        try_award("university_visited", "🎓 Visitó una universidad")
    elif event_type == "country_explored" and subject_id:
        flag = PASSPORT_COUNTRY_FLAGS.get(subject_id, "🌍")
        try_award(f"country_{subject_id}", f"{flag} Exploró {subject_label or subject_id.title()}")

    return newly_awarded


# --------------------------------------------------------------------------
# Tema visual y feature flags - lectura publica (afectan a todo visitante,
# no solo al admin), escritura protegida mas abajo bajo /api/v1/admin/*.
# --------------------------------------------------------------------------
@app.get("/api/theme", status_code=status.HTTP_200_OK)
def get_active_theme():
    return {"success": True, "colors": read_json(THEME_CONFIG_PATH, {})}


@app.get("/api/flags", status_code=status.HTTP_200_OK)
def get_active_flags():
    flags = {**DEFAULT_FEATURE_FLAGS, **read_json(FLAGS_CONFIG_PATH, {})}
    return {"success": True, "flags": flags}


# --------------------------------------------------------------------------
# Estáticos y páginas HTML (antes en backend/main.py)
# --------------------------------------------------------------------------
app.mount("/Frontend", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

# FuturePilot Globe (futurepilot-globe/) sigue siendo su propio modulo React
# + Vite, con su propio build - aqui solo se sirve el resultado de
# `npm run build`. Requiere que vite.config.js tenga base:"/globe/" (si no,
# los assets del index.html pedirian /assets/... a la raiz del dominio en
# vez de /globe/assets/..., y la pagina cargaria en blanco).
GLOBE_DIST_DIR = REPO_ROOT / "futurepilot-globe" / "dist"
if GLOBE_DIST_DIR.exists():
    app.mount("/globe", StaticFiles(directory=str(GLOBE_DIST_DIR), html=True), name="globe")
else:
    print(
        f"Advertencia: {GLOBE_DIST_DIR} no existe todavia - corre "
        "'npm run build' en futurepilot-globe/ para habilitar /globe."
    )


@app.get("/")
def home():
    return FileResponse(str(FRONTEND_DIR / "index.html"))


@app.get("/assessment")
def assessment_page():
    return FileResponse(str(FRONTEND_DIR / "assessment.html"))


@app.get("/login")
def login_page():
    return FileResponse(str(FRONTEND_DIR / "login.html"))


@app.get("/reset-password")
def reset_password_page():
    return FileResponse(str(FRONTEND_DIR / "reset-password.html"))


@app.get("/careers")
def careers_page():
    return FileResponse(str(FRONTEND_DIR / "careers.html"))


@app.get("/roadmap")
def roadmap_page():
    # roadmap.html era una pagina estatica pre-IA (sin una sola llamada a
    # la API, contenido generico hardcodeado) - /journey es su reemplazo
    # real, generado a partir del diagnostico de cada estudiante. Se
    # redirige en vez de borrar la ruta para no romper links/marcadores
    # viejos que apunten a /roadmap.
    return RedirectResponse(url="/journey", status_code=status.HTTP_307_TEMPORARY_REDIRECT)


@app.get("/journey")
def journey_page():
    return FileResponse(str(FRONTEND_DIR / "journey.html"))


@app.get("/flightplan")
def flightplan_page():
    return FileResponse(str(FRONTEND_DIR / "flightplan.html"))


@app.get("/passport")
def passport_page():
    return FileResponse(str(FRONTEND_DIR / "passport.html"))


@app.get("/terms")
def terms_page():
    return FileResponse(str(FRONTEND_DIR / "terms.html"))


@app.get("/privacy")
def privacy_page():
    return FileResponse(str(FRONTEND_DIR / "privacy.html"))


# El panel de administracion es una carpeta separada (Frontend/admin/),
# completamente desacoplada del sitio de estudiantes. Las paginas en si no
# traen ningun dato: son un shell vacio que la propia pagina bloquea hasta
# verificar contra /api/v1/admin/me (ver admin-dashboard.js) - los datos
# reales solo salen por la API, que si esta protegida en el servidor.
@app.get("/admin")
def admin_dashboard_page():
    return FileResponse(str(FRONTEND_DIR / "admin" / "admin-dashboard.html"))


@app.get("/admin/login")
def admin_login_page():
    return FileResponse(str(FRONTEND_DIR / "admin" / "admin-login.html"))


@app.get("/admin/theme-lab")
def admin_theme_lab_page():
    return FileResponse(str(FRONTEND_DIR / "admin" / "theme-lab.html"))


@app.get("/admin/system-health")
def admin_system_health_page():
    return FileResponse(str(FRONTEND_DIR / "admin" / "system-health.html"))


# --------------------------------------------------------------------------
# Autenticación
# --------------------------------------------------------------------------
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class RegisterRequest(BaseModel):
    email: str = Field(..., description="Email del estudiante")
    password: str = Field(..., min_length=8, description="Contrasena, minimo 8 caracteres")
    name: Optional[str] = Field(default=None, description="Nombre para mostrar (opcional)")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if not EMAIL_PATTERN.match(value.strip()):
            raise ValueError("Email invalido")
        return value


class LoginRequest(BaseModel):
    email: str = Field(..., description="Email del estudiante")
    password: str = Field(..., description="Contrasena")


class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., description="Email de la cuenta a recuperar")


class ResetPasswordRequest(BaseModel):
    token: str = Field(..., description="Token recibido por correo")
    new_password: str = Field(..., min_length=8, description="Nueva contrasena, minimo 8 caracteres")


def _user_from_authorization(authorization: Optional[str]) -> Optional[dict]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization[len("Bearer "):].strip()
    if not token:
        return None
    return users_store.get_user_by_token(token)


def get_current_user_optional(authorization: Optional[str] = Header(default=None)) -> Optional[dict]:
    """No lanza error: devuelve None si no hay token o es invalido/expirado.
    Se usa en rutas que deben seguir funcionando sin login (ej. /api/v1/assess)."""
    return _user_from_authorization(authorization)


def get_current_user_required(authorization: Optional[str] = Header(default=None)) -> dict:
    """Lanza 401 si no hay una sesion valida. Se usa en rutas que exigen login."""
    user = _user_from_authorization(authorization)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sesion invalida o expirada. Inicia sesion de nuevo.",
        )
    return user


def get_current_admin_required(authorization: Optional[str] = Header(default=None)) -> dict:
    """401 sin sesion valida, 403 si la sesion es valida pero no es admin.
    is_admin se recalcula contra ADMIN_EMAIL en cada login/registro (ver
    sync_admin_email), asi que este chequeo siempre refleja el .env actual."""
    user = get_current_user_required(authorization)
    if not user.get("is_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador.",
        )
    return user


@app.post("/api/v1/auth/register", status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, request: Request):
    register_rate_limiter.check(client_ip(request))
    try:
        user = users_store.register(payload.email, payload.password, payload.name)
    except DuplicateEmailError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe una cuenta registrada con ese email.",
        )
    # Si este email coincide con ADMIN_EMAIL, la cuenta queda marcada admin
    # de inmediato - sin esperar a un reinicio del servidor. Se relee el
    # usuario despues del sync para que la respuesta refleje is_admin al dia.
    users_store.sync_admin_email(ADMIN_EMAIL or None)
    user = users_store.get_user_by_id(user["id"])
    token = users_store.create_session(user["id"])
    return {"success": True, "token": token, "user": user}


@app.post("/api/v1/auth/login", status_code=status.HTTP_200_OK)
def login(payload: LoginRequest, request: Request):
    login_rate_limiter.check(client_ip(request))
    try:
        user = users_store.verify_login(payload.email, payload.password)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contrasena invalidos.",
        )
    users_store.sync_admin_email(ADMIN_EMAIL or None)
    user = users_store.get_user_by_id(user["id"])
    token = users_store.create_session(user["id"])
    return {"success": True, "token": token, "user": user}


@app.post("/api/v1/auth/forgot-password", status_code=status.HTTP_200_OK)
def forgot_password(payload: ForgotPasswordRequest, request: Request):
    password_reset_rate_limiter.check(client_ip(request))

    # Misma respuesta exista o no la cuenta - de lo contrario este
    # endpoint se convierte en un oraculo para confirmar que emails estan
    # registrados (enumeracion de cuentas).
    generic_response = {
        "success": True,
        "detail": "Si existe una cuenta con ese email, enviamos instrucciones para recuperar el acceso.",
    }

    user_id = users_store.find_user_id_by_email(payload.email)
    if user_id is None:
        return generic_response

    token = users_store.create_password_reset(user_id)
    reset_link = f"{str(request.base_url).rstrip('/')}/reset-password?token={token}"
    mailer.send_email(
        to_email=payload.email.strip().lower(),
        subject="Recupera tu contraseña de FuturePilot",
        body=(
            "Recibimos una solicitud para restablecer tu contraseña de FuturePilot.\n\n"
            f"Abre este link para elegir una nueva contraseña (valido por 1 hora):\n{reset_link}\n\n"
            "Si no fuiste tú, ignora este correo - tu contraseña actual sigue funcionando."
        ),
    )
    return generic_response


@app.post("/api/v1/auth/reset-password", status_code=status.HTTP_200_OK)
def reset_password(payload: ResetPasswordRequest, request: Request):
    password_reset_rate_limiter.check(client_ip(request))

    user_id = users_store.consume_password_reset(payload.token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este link ya no es válido. Solicita uno nuevo.",
        )
    users_store.set_password(user_id, payload.new_password)
    return {"success": True, "detail": "Contraseña actualizada. Ya puedes iniciar sesión."}


@app.get("/api/v1/auth/me", status_code=status.HTTP_200_OK)
def get_me(current_user: dict = Depends(get_current_user_required)):
    return {"success": True, "user": current_user}


@app.post("/api/v1/auth/logout", status_code=status.HTTP_200_OK)
def logout(
    authorization: Optional[str] = Header(default=None),
    current_user: dict = Depends(get_current_user_required),
):
    token = authorization[len("Bearer "):].strip()
    users_store.delete_session(token)
    return {"success": True}


# --------------------------------------------------------------------------
# Resultados del usuario autenticado - permiten que el flujo de assessment
# (Frontend/assessment.js) recuerde el perfil de una cuenta entre sesiones,
# sin obligar a repetir el test cada vez que alguien inicia sesion.
# --------------------------------------------------------------------------
class ClaimResultRequest(BaseModel):
    result_id: int = Field(..., description="id devuelto por POST /api/v1/assess")


@app.get("/api/v1/me/results", status_code=status.HTTP_200_OK)
def get_my_results(current_user: dict = Depends(get_current_user_required)):
    """Ultimo resultado de test guardado para la cuenta autenticada, o
    resultados=None si todavia no ha completado ninguno con esta cuenta."""
    latest = users_store.latest_result_for_user(current_user["id"])
    if latest is None:
        return {"success": True, "results": None}
    return {
        "success": True,
        "results": json.loads(latest["results_json"]),
        "created_at": latest["created_at"],
    }


@app.post("/api/v1/me/claim-result", status_code=status.HTTP_200_OK)
def claim_my_result(
    payload: ClaimResultRequest,
    current_user: dict = Depends(get_current_user_required),
):
    """El test se completa antes de iniciar sesion (queda como fila anonima
    en test_results). Justo despues de un login/registro exitoso el
    frontend llama esto para asociar ese resultado ya calculado a la cuenta
    - nunca se recalcula ni se reenvia el resultado completo.

    Es idempotente a proposito. Si el UPDATE se confirmo pero la respuesta
    se perdio por el camino, el cliente reintenta y tiene que recibir exito:
    el resultado SI quedo vinculado. Devolver 404 ahi dejaria al frontend
    reintentando indefinidamente sobre un resultado que ya es suyo (ver
    users_store.claim_test_result para los cuatro casos)."""
    outcome = users_store.claim_test_result(payload.result_id, current_user["id"])
    if outcome in ("not_found", "owned_by_other"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resultado no encontrado o ya asociado a otra cuenta.",
        )

    # El test se calculo con user_id="default_student" (ver
    # process_user_test) porque todavia no habia sesion - la memoria del
    # AI Mentor para ese calculo vive en ese balde compartido, nunca bajo
    # el id real. Se copia aca, ahora que sabemos de quien es de verdad.
    latest = users_store.latest_result_for_user(current_user["id"])
    if latest:
        ai_system.sync_memory_from_results(str(current_user["id"]), json.loads(latest["results_json"]))

    # El Pasaporte registra "test completado" y "roadmap creado" en el
    # mismo momento: en esta arquitectura el roadmap siempre se genera como
    # parte del mismo calculo del test (ver ai_engine.process_user_test),
    # asi que ambos se vuelven ciertos para la cuenta a la vez, aca, no en
    # el frontend.
    #
    # Los sellos ya son idempotentes (UNIQUE en la tabla), pero los eventos
    # no: sin este guard, cada reintento anadiria otra linea de "Terminó el
    # test" a la actividad reciente. Se comprueba en vez de asumir que
    # outcome == "already_owned" implica que el evento existe, porque un
    # fallo justo entre el UPDATE y estas lineas deja lo primero hecho y lo
    # segundo no - el reintento debe poder completar lo que falte.
    for event_type in ("test_completed", "roadmap_created"):
        if not users_store.has_passport_event(current_user["id"], event_type):
            users_store.record_passport_event(current_user["id"], event_type)

    new_stamps = (
        _award_passport_stamps(current_user["id"], "test_completed", None, None)
        + _award_passport_stamps(current_user["id"], "roadmap_created", None, None)
    )
    return {"success": True, "new_stamps": new_stamps}


# --------------------------------------------------------------------------
# Pasaporte FuturePilot - el recorrido del estudiante dentro de la
# plataforma. GET arma la vista completa (perfil + snapshot vocacional del
# ultimo resultado + progreso agregado + sellos + actividad reciente); los
# eventos que el propio frontend puede reportar estan restringidos a
# PASSPORT_CLIENT_EVENT_TYPES (ver comentario ahi arriba).
# --------------------------------------------------------------------------
class PassportProfileUpdateRequest(BaseModel):
    country: Optional[str] = None
    city: Optional[str] = None
    languages: Optional[List[str]] = None
    photo_data_url: Optional[str] = Field(default=None, max_length=300_000)

    @field_validator("photo_data_url")
    @classmethod
    def validate_photo(cls, value: Optional[str]) -> Optional[str]:
        if value and not value.startswith("data:image/"):
            raise ValueError("photo_data_url debe ser un data URL de imagen (data:image/...)")
        return value


class PassportGoalsUpdateRequest(BaseModel):
    goals: Dict[str, Any]


class PassportEventRequest(BaseModel):
    event_type: str
    subject_id: Optional[str] = None
    subject_label: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

    @field_validator("event_type")
    @classmethod
    def validate_event_type(cls, value: str) -> str:
        if value not in PASSPORT_CLIENT_EVENT_TYPES:
            raise ValueError(f"event_type no permitido desde el cliente: {value}")
        return value


@app.get("/api/v1/passport", status_code=status.HTTP_200_OK)
def get_passport(current_user: dict = Depends(get_current_user_required)):
    profile = users_store.get_passport_profile(current_user["id"])

    vocational = None
    latest_result = users_store.latest_result_for_user(current_user["id"])
    if latest_result:
        results = json.loads(latest_result["results_json"])
        vocational = {
            "personality": results.get("personality"),
            "learning_style": results.get("learning_style"),
            "strengths": results.get("strengths") or [],
            "weaknesses": results.get("weaknesses") or [],
            "recommended_careers": [
                {"title": career.get("title"), "match_percentage": career.get("match_percentage")}
                for career in (results.get("recommended_careers") or [])[:5]
            ],
            "completed_at": latest_result["created_at"],
        }

    return {
        "success": True,
        "user": {
            "name": current_user.get("name"),
            "email": current_user["email"],
            "member_since": current_user["created_at"],
        },
        "profile": profile,
        "vocational": vocational,
        "progress": users_store.passport_progress(current_user["id"]),
        "stamps": users_store.list_passport_stamps(current_user["id"]),
        "recent_activity": users_store.list_passport_events(current_user["id"], limit=15),
    }


@app.put("/api/v1/passport/profile", status_code=status.HTTP_200_OK)
def update_passport_profile_route(
    payload: PassportProfileUpdateRequest,
    current_user: dict = Depends(get_current_user_required),
):
    profile = users_store.update_passport_profile(
        current_user["id"],
        country=payload.country,
        city=payload.city,
        languages=payload.languages,
        photo_data_url=payload.photo_data_url,
    )
    return {"success": True, "profile": profile}


@app.put("/api/v1/passport/goals", status_code=status.HTTP_200_OK)
def update_passport_goals_route(
    payload: PassportGoalsUpdateRequest,
    current_user: dict = Depends(get_current_user_required),
):
    profile = users_store.update_passport_goals(current_user["id"], payload.goals)
    return {"success": True, "profile": profile}


@app.post("/api/v1/passport/events", status_code=status.HTTP_200_OK)
def record_passport_event_route(
    payload: PassportEventRequest,
    current_user: dict = Depends(get_current_user_required),
):
    users_store.record_passport_event(
        current_user["id"], payload.event_type, payload.subject_id, payload.subject_label, payload.metadata,
    )
    new_stamps = _award_passport_stamps(
        current_user["id"], payload.event_type, payload.subject_id, payload.subject_label
    )
    return {"success": True, "new_stamps": new_stamps}


# --------------------------------------------------------------------------
# Panel de administracion. Toda ruta bajo /api/v1/admin/* exige
# get_current_admin_required (401 sin sesion, 403 si la sesion es valida
# pero no es la cuenta admin) - ningun dato sale ni cambia en el backend
# sin ese chequeo, sin importar lo que muestre o no el frontend.
# --------------------------------------------------------------------------
@app.get("/api/v1/admin/me", status_code=status.HTTP_200_OK)
def admin_me(current_admin: dict = Depends(get_current_admin_required)):
    return {"success": True, "user": current_admin}


@app.get("/api/v1/admin/dashboard", status_code=status.HTTP_200_OK)
def admin_dashboard(current_admin: dict = Depends(get_current_admin_required)):
    since_7d = (utc_now() - timedelta(days=7)).isoformat()

    return {
        "success": True,
        "metrics": {
            "total_users": users_store.count_users(),
            "new_users_7d": users_store.count_users_since(since_7d),
            "active_sessions": users_store.count_active_sessions(),
            "tests_completed": users_store.count_test_results(),
            "tests_completed_7d": users_store.count_test_results_since(since_7d),
        },
        "top_careers": users_store.top_careers(limit=5),
        "top_countries": users_store.top_countries(limit=5),
        "recent_activity": users_store.recent_test_results(limit=10),
    }


# --------------------------------------------------------------------------
# Theme Lab - guarda un override de las 8 categorias de color de
# Frontend/style.css. La vista previa en vivo (Frontend/admin/theme-lab.js)
# es 100% client-side contra un <iframe> - nada de esto se llama hasta que
# el admin pulsa "Guardar tema". GET /api/theme (publico, mas arriba) es lo
# que hace que el cambio se vea para cualquier visitante real.
# --------------------------------------------------------------------------
class ThemeUpdateRequest(BaseModel):
    colors: Dict[str, str] = Field(..., description="Mapa de categoria de color -> valor CSS")

    @field_validator("colors")
    @classmethod
    def validate_keys(cls, value: Dict[str, str]) -> Dict[str, str]:
        unknown = set(value) - set(THEME_COLOR_KEYS)
        if unknown:
            raise ValueError(f"Claves de color desconocidas: {', '.join(sorted(unknown))}")
        return value


@app.put("/api/v1/admin/theme", status_code=status.HTTP_200_OK)
def update_theme(
    payload: ThemeUpdateRequest,
    current_admin: dict = Depends(get_current_admin_required),
):
    write_json(THEME_CONFIG_PATH, payload.colors)
    users_store.record_admin_action(current_admin["id"], "theme.save", {"colors": payload.colors})
    return {"success": True, "colors": payload.colors}


@app.delete("/api/v1/admin/theme", status_code=status.HTTP_200_OK)
def reset_theme(current_admin: dict = Depends(get_current_admin_required)):
    """Restaura el tema original: borra el override, no escribe nada -
    style.css vuelve a mandar con sus valores por defecto."""
    delete_json(THEME_CONFIG_PATH)
    users_store.record_admin_action(current_admin["id"], "theme.reset")
    return {"success": True}


# --------------------------------------------------------------------------
# Feature flags - secciones del admin todavia en construccion que se
# pueden activar para probarlas. GET /api/flags (publico, mas arriba) es
# lo que consulta Frontend/admin/admin-dashboard.js para decidir como
# pintar el sidebar.
# --------------------------------------------------------------------------
class FlagUpdateRequest(BaseModel):
    enabled: bool


@app.put("/api/v1/admin/flags/{flag_key}", status_code=status.HTTP_200_OK)
def update_flag(
    flag_key: str,
    payload: FlagUpdateRequest,
    current_admin: dict = Depends(get_current_admin_required),
):
    if flag_key not in DEFAULT_FEATURE_FLAGS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feature flag desconocido: {flag_key}",
        )
    flags = {**DEFAULT_FEATURE_FLAGS, **read_json(FLAGS_CONFIG_PATH, {})}
    flags[flag_key] = payload.enabled
    write_json(FLAGS_CONFIG_PATH, flags)
    users_store.record_admin_action(
        current_admin["id"], "flag.update", {"flag_key": flag_key, "enabled": payload.enabled}
    )
    return {"success": True, "flags": flags}


# --------------------------------------------------------------------------
# System Health - cada check corre una condicion real (consulta a la base
# de datos, existencia de archivos, autotest de hashing, etc.), nunca un
# estado inventado. repairAction (si viene) es la clave que
# POST /api/v1/admin/repair/{action} sabe ejecutar para ese problema en
# particular.
# --------------------------------------------------------------------------
def _check_backend() -> Dict[str, Any]:
    return {"status": "ok", "detail": "El proceso de FastAPI esta respondiendo."}


def _check_database() -> Dict[str, Any]:
    try:
        total = users_store.count_users()
        return {"status": "ok", "detail": f"Consulta de prueba exitosa ({total} usuarios)."}
    except Exception as error:  # noqa: BLE001 - health check, cualquier fallo cuenta
        return {"status": "error", "detail": str(error)}


def _check_ai() -> Dict[str, Any]:
    if not careers_db or not questions_db:
        return {
            "status": "error",
            "detail": f"{len(careers_db)} carreras / {len(questions_db)} preguntas en memoria - datos vacios.",
            "repairAction": "reload-data",
        }
    return {
        "status": "ok",
        "detail": f"{len(careers_db)} carreras y {len(questions_db)} preguntas cargadas.",
    }


def _check_globe() -> Dict[str, Any]:
    if GLOBE_DIST_DIR.exists():
        return {"status": "ok", "detail": "futurepilot-globe/dist presente y montado en /globe."}
    return {
        "status": "warning",
        "detail": "futurepilot-globe/dist no existe todavia - corre 'npm run build' en futurepilot-globe/.",
    }


def _check_login_pages() -> Dict[str, Any]:
    required = ["login.html", "admin/admin-login.html"]
    missing = [name for name in required if not (FRONTEND_DIR / name).exists()]
    if missing:
        return {"status": "error", "detail": f"Faltan paginas de login: {', '.join(missing)}"}
    return {"status": "ok", "detail": "Paginas de login de estudiante y admin presentes."}


def _check_auth() -> Dict[str, Any]:
    try:
        salt = secrets.token_bytes(16)
        digest_a = hash_password("healthcheck", salt)
        digest_b = hash_password("healthcheck", salt)
        hashing_ok = digest_a == digest_b and len(digest_a) == 64
        users_store.count_active_sessions()
        if not hashing_ok:
            return {"status": "error", "detail": "El autotest de hashing PBKDF2 no fue consistente."}
        return {"status": "ok", "detail": "Autotest de hashing PBKDF2 y tabla de sesiones OK."}
    except Exception as error:  # noqa: BLE001
        return {"status": "error", "detail": str(error)}


def _check_apis() -> Dict[str, Any]:
    api_routes = [route for route in app.routes if getattr(route, "path", "").startswith("/api/")]
    return {"status": "ok", "detail": f"{len(api_routes)} rutas /api/* registradas."}


def _check_frontend_pages() -> Dict[str, Any]:
    # roadmap.html ya no existe: /roadmap es un redirect a /journey (ver
    # roadmap_page mas arriba). Mientras estuvo en esta lista, el chequeo
    # daba "error" siempre y arrastraba el estado global a rojo, tapando
    # cualquier fallo de verdad. La lista debe reflejar las paginas que el
    # sitio sirve HOY.
    required = [
        "index.html", "assessment.html", "careers.html",
        "journey.html", "flightplan.html", "passport.html", "login.html",
    ]
    missing = [name for name in required if not (FRONTEND_DIR / name).exists()]
    if missing:
        return {"status": "error", "detail": f"Faltan paginas: {', '.join(missing)}"}
    return {"status": "ok", "detail": "Paginas principales del sitio presentes."}


def _check_static_assets() -> Dict[str, Any]:
    required = [
        "style.css", "futurepilot-logo-transparent.png",
        "i18n.js", "language-toggle.js", "site.js",
    ]
    missing = [name for name in required if not (FRONTEND_DIR / name).exists()]
    if missing:
        return {"status": "warning", "detail": f"Faltan: {', '.join(missing)}"}
    return {"status": "ok", "detail": "CSS, JS compartido y logo presentes."}


_STATUS_SEVERITY = {"error": 0, "warning": 1, "ok": 2}


@app.get("/api/v1/admin/health", status_code=status.HTTP_200_OK)
def admin_health(current_admin: dict = Depends(get_current_admin_required)):
    checks = {
        "backend": _check_backend(),
        "frontend": _check_frontend_pages(),
        "database": _check_database(),
        "ai": _check_ai(),
        "globe": _check_globe(),
        "login": _check_login_pages(),
        "auth": _check_auth(),
        "apis": _check_apis(),
        "static_assets": _check_static_assets(),
    }
    overall = min((check["status"] for check in checks.values()), key=lambda s: _STATUS_SEVERITY[s])
    return {"success": True, "overall": overall, "checks": checks}


# --------------------------------------------------------------------------
# Herramientas de reparacion - solo acciones seguras de ejecutar dentro del
# mismo proceso sin efectos secundarios peligrosos: recargar datos desde
# disco y re-sincronizar el flag de admin. Deliberadamente NO hay una
# accion de "reiniciar el servidor": eso requiere reiniciar el proceso de
# Python desde afuera (con --reload activo en uvicorn, guardar cualquier
# .py ya lo hace solo) y hacerlo desde dentro de la misma peticion HTTP que
# lo pide es fragil e inseguro de exponer, incluso protegido por admin.
# --------------------------------------------------------------------------
@app.post("/api/v1/admin/repair/{action}", status_code=status.HTTP_200_OK)
def admin_repair(action: str, current_admin: dict = Depends(get_current_admin_required)):
    global careers_db, questions_db, ai_system

    if action == "reload-data":
        careers_db = load_json_file("data/careers.json")
        questions_db = load_json_file("data/questions.json")
        ai_system = FuturePilotAIEcosystem(careers_data=careers_db, questions_data=questions_db)
        users_store.record_admin_action(
            current_admin["id"], "repair.reload-data",
            {"careers": len(careers_db), "questions": len(questions_db)},
        )
        return {
            "success": True,
            "detail": f"Recargado desde disco: {len(careers_db)} carreras, {len(questions_db)} preguntas.",
        }

    if action == "resync-admin":
        users_store.sync_admin_email(ADMIN_EMAIL or None)
        users_store.record_admin_action(current_admin["id"], "repair.resync-admin")
        return {"success": True, "detail": "is_admin re-sincronizado contra ADMIN_EMAIL."}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Accion de reparacion desconocida: '{action}'. Disponibles: reload-data, resync-admin.",
    )


@app.get("/api/v1/admin/audit-log", status_code=status.HTTP_200_OK)
def admin_audit_log(current_admin: dict = Depends(get_current_admin_required)):
    """Quien cambio que desde el panel (tema, feature flags, reparaciones)
    y cuando. Sin pagina propia todavia - la seccion 'Logs del sistema' del
    sidebar ya esta reservada para esto (ver DEFAULT_FEATURE_FLAGS)."""
    return {"success": True, "entries": users_store.list_admin_audit_log(limit=50)}


# --------------------------------------------------------------------------
# Modelos de datos - Evaluación vocacional
# --------------------------------------------------------------------------
class UserAnswerItem(BaseModel):
    question_index: int = Field(..., description="Indice de la pregunta respondida")
    answer_index: int = Field(..., description="Indice de la opcion seleccionada por el estudiante")


ANON_ID_PATTERN = re.compile(r"^[a-zA-Z0-9-]{1,64}$")


def resolve_anon_memory_id(anon_id: Optional[str]) -> str:
    """anon_id llega del cliente (localStorage, generado con
    crypto.randomUUID) para que cada navegador anonimo tenga su propia
    memoria de IA en vez de compartir un balde "default_student" entre
    todos los visitantes. Se valida estricto porque termina siendo parte
    de un nombre de archivo (StudentMemorySystem._get_path) - sin esto, un
    anon_id malicioso tipo "../../etc/passwd" seria un path traversal real.
    Prefijo "anon-" ademas evita cualquier colision con un user_id numerico
    real o con el literal "default_student"."""
    if anon_id and ANON_ID_PATTERN.match(anon_id):
        return f"anon-{anon_id}"
    return "default_student"


class TestSubmissionRequest(BaseModel):
    answers: List[UserAnswerItem] = Field(..., description="Lista de respuestas seleccionadas en el test")
    anon_id: Optional[str] = Field(
        default=None,
        description="Identificador de sesion anonima generado en el cliente (localStorage). Ignorado si hay sesion real.",
    )


class MentorChatRequest(BaseModel):
    message: str = Field(..., description="Mensaje enviado por el usuario al AI Mentor")
    anon_id: Optional[str] = Field(
        default=None,
        description="Identificador de sesion anonima generado en el cliente (localStorage). Ignorado si hay sesion real.",
    )
    user_context: Optional[Dict[str, Any]] = Field(
        default=None,
        description=(
            "Contexto adicional opcional. El user_id real para recuperar la "
            "memoria del estudiante se resuelve siempre del token de sesion "
            "(Authorization: Bearer) o de anon_id, nunca de este campo - un "
            "user_id aqui es ignorado a efectos de identidad."
        ),
    )


# --------------------------------------------------------------------------
# API - Evaluación vocacional / IA
# --------------------------------------------------------------------------
@app.get("/api/v1/status", status_code=status.HTTP_200_OK)
def get_system_status():
    """Endpoint de comprobacion de estado de la API."""
    return {
        "system": "FuturePilot AI Engine",
        "status": "Online",
        "questions_loaded": len(questions_db),
        "careers_loaded": len(careers_db),
    }


@app.get("/api/v1/questions", status_code=status.HTTP_200_OK)
def get_all_questions():
    """Obtiene el banco completo de preguntas para el frontend."""
    return {
        "success": True,
        "total": len(questions_db),
        "questions": questions_db,
    }


@app.get("/api/v1/careers", status_code=status.HTTP_200_OK)
def get_all_careers():
    """Obtiene el catálogo completo de carreras (fuente única de verdad)."""
    return {
        "success": True,
        "total": len(careers_db),
        "careers": careers_db,
    }


@app.post("/api/v1/assess", status_code=status.HTTP_200_OK)
def process_test_assessment(
    payload: TestSubmissionRequest,
    current_user: Optional[dict] = Depends(get_current_user_optional),
):
    """
    Procesa las respuestas entregadas por el estudiante, calcula su vector de
    habilidades por clusters, evalua las carreras compatibles y genera el roadmap.
    El test se puede completar sin haber iniciado sesion; si hay un token de
    sesion valido, el resultado queda asociado al usuario real en vez de al
    identificador anonimo por defecto.
    """
    if not payload.answers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe proporcionar al menos una respuesta para procesar la evaluacion.",
        )

    user_id = str(current_user["id"]) if current_user else resolve_anon_memory_id(payload.anon_id)

    try:
        formatted_answers = [answer.model_dump() for answer in payload.answers]
        results = ai_system.process_user_test(formatted_answers, user_id=user_id)

        top_choice = (results.get("recommended_careers") or [None])[0]
        result_id = users_store.record_test_result(
            user_id=current_user["id"] if current_user else None,
            top_career_id=top_choice.get("career_id") if top_choice else None,
            top_career_name=top_choice.get("title") if top_choice else None,
            results_json=json.dumps(results),
        )

        return {
            "success": True,
            "data": results,
            # El test normalmente se completa antes de iniciar sesion (ver
            # flujo en Frontend/assessment.js): este id deja el resultado
            # "reclamable" via POST /api/v1/me/claim-result justo despues del
            # login/registro, sin tener que recalcular ni reenviar el
            # resultado completo por la red.
            "result_id": result_id,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error procesando el test de orientacion: {str(e)}",
        )


@app.post("/api/v1/mentor/chat", status_code=status.HTTP_200_OK)
def chat_with_mentor(
    payload: MentorChatRequest,
    current_user: Optional[dict] = Depends(get_current_user_optional),
):
    """
    Chatea con el AI Mentor. Usa MentorEngine (ai_engine.py), un motor
    rule-based que se apoya en la memoria persistente del estudiante y en
    el catálogo de carreras — sin depender de ninguna API externa de LLM.
    """
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El mensaje del usuario no puede estar vacio.",
        )

    # El user_id de identidad siempre viene del token validado en servidor
    # (o de anon_id, validado estricto - ver resolve_anon_memory_id), nunca
    # del payload libre del cliente. name y passport_goals tambien se
    # resuelven aca para que el mentor pueda personalizar respuestas
    # (saludo, universidades segun la meta del Pasaporte) sin que el
    # cliente pueda falsificarlos.
    user_id = str(current_user["id"]) if current_user else resolve_anon_memory_id(payload.anon_id)
    passport_goals = {}
    if current_user:
        passport_goals = users_store.get_passport_profile(current_user["id"]).get("goals") or {}
    context = {
        **(payload.user_context or {}),
        "user_id": user_id,
        "name": current_user.get("name") if current_user else None,
        "passport_goals": passport_goals,
    }

    try:
        response_text = ai_system.mentor.chat(
            user_message=payload.message,
            context=context,
        )

        new_stamps: List[Dict[str, str]] = []
        if current_user:
            users_store.record_passport_event(current_user["id"], "ai_conversation")
            new_stamps = _award_passport_stamps(current_user["id"], "ai_conversation", None, None)

        return {
            "success": True,
            "response": response_text,
            "new_stamps": new_stamps,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al comunicar con el AI Mentor: {str(e)}",
        )


# --------------------------------------------------------------------------
# Ejecucion directa con uvicorn
# --------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
