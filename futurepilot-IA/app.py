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
web/src/database/countries/**/*.js via
web/scripts/parse_universities_docx.py +
import_americas_docx.py. El backend no expone rutas de universidades -
el globo lee esos archivos directamente.
===============================================================================
"""

import base64
import binascii
import copy
import json
import os
import re
import secrets
import sys
import threading
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator, model_validator

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

import localization  # noqa: E402
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
    utc_now_iso,
)

load_dotenv(REPO_ROOT / ".env")

FRONTEND_DIR = REPO_ROOT / "Frontend"

# Unica fuente de verdad de quien es administrador: el email configurado en
# .env (nunca un valor de prueba escrito en el codigo). Vacio = nadie es
# admin. Ver .env.example para instrucciones.
ADMIN_EMAIL = (os.environ.get("ADMIN_EMAIL") or "").strip()

# --------------------------------------------------------------------------
# Entorno de ejecucion. Por defecto "development" a proposito: un despliegue
# real tiene que declararse explicitamente, no heredarse por descuido. Lo
# que cambia con FUTUREPILOT_ENV=production:
#
#   - /docs, /redoc y /openapi.json dejan de publicarse.
#   - El correo de recuperacion no cae al fallback de imprimir el link en
#     consola (ver backend/mailer.py): un link de reset en los logs es un
#     token de robo de cuenta esperando a que alguien lea el log.
#   - check_production_config() avisa de todo lo que este mal configurado.
# --------------------------------------------------------------------------
ENVIRONMENT = (os.environ.get("FUTUREPILOT_ENV") or "development").strip().lower()
IS_PRODUCTION = ENVIRONMENT == "production"

app = FastAPI(
    title="FuturePilot API",
    description="Backend unificado: evaluación vocacional (IA rule-based) + autenticación",
    version="2.0.0",
    # La documentacion interactiva describe cada endpoint y su payload. En
    # desarrollo es util; en produccion es un mapa gratis de la superficie
    # de la API para cualquiera que pase por ahi.
    docs_url=None if IS_PRODUCTION else "/docs",
    redoc_url=None if IS_PRODUCTION else "/redoc",
    openapi_url=None if IS_PRODUCTION else "/openapi.json",
)

# Limitadores de fuerza bruta / spam en las rutas de autenticacion. Ver
# backend/rate_limiter.py para las limitaciones de este enfoque (un solo
# proceso) y como reemplazarlo por Redis si el deployment escala.
login_rate_limiter = RateLimiter(max_requests=10, window_seconds=60)
register_rate_limiter = RateLimiter(max_requests=5, window_seconds=300)
password_reset_rate_limiter = RateLimiter(max_requests=5, window_seconds=300)
# El enlace del acudiente es un token de 32 bytes: adivinarlo es inviable.
# El limite esta por si alguien lo intenta igual, y para que un bot que
# recorra /consent/... no consuma el servidor entero.
consent_rate_limiter = RateLimiter(max_requests=30, window_seconds=300)

# Origenes permitidos por CORS: configurables via env (coma-separada) para
# no tener que tocar codigo por cada entorno (dev/staging/produccion). Los
# puertos de Vite quedan como default solo para que `npm run dev` en
# web/ siga funcionando sin configuracion extra - el sitio
# servido por este mismo backend (todo same-origin) no necesita CORS.
#
# En produccion el default de desarrollo no aplica: si nadie declara
# CORS_ORIGINS, la lista queda vacia (nadie de fuera puede llamar a la API),
# que es lo correcto para un sitio same-origin. Heredar "localhost:5173" en
# un servidor real no rompe nada visible, y por eso mismo se quedaria ahi
# para siempre.
_default_cors_origins = "" if IS_PRODUCTION else "http://localhost:5173,http://127.0.0.1:5173"
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
# Cabeceras de seguridad en cada respuesta. script-src ya NO necesita
# 'unsafe-inline': todas las paginas se sirven compiladas desde web/ y
# ninguna trae scripts inline.
#
# frame-src y frame-ancestors pasaron de 'self' a 'none' al retirarse el
# Theme Lab, que era lo unico que embebia una pagina propia en un <iframe>
# (la vista previa del tema). Sin ningun iframe en el sitio, 'none' cierra
# el clickjacking del todo en vez de permitirlo desde el mismo origen.
# --------------------------------------------------------------------------
def _build_csp(*, allow_inline_scripts: bool) -> str:
    # Nada externo. La politica permitia fonts.googleapis.com y
    # fonts.gstatic.com para las tipografias, asi que cada carga de pagina
    # mandaba a Google la IP del estudiante, su navegador y la pagina que
    # estaba viendo. Ahora se sirven desde aqui (ver Frontend/fonts.css) y la
    # CSP no autoriza un solo destino de fuera: si algun dia se cuela una
    # dependencia externa, el navegador la bloquea en vez de permitirla.
    #
    # Ni script-src ni style-src necesitan ya 'unsafe-inline'. El sitio no
    # tiene un solo <script> ni un solo <style> inline: todo se sirve
    # compilado desde web/. Lo que sigue siendo dinamico - el ancho de las
    # barras de progreso - se aplica con CSSOM (element.style /
    # setProperty), que la CSP no gobierna.
    #
    # El parametro se conserva porque los tests construyen las dos
    # politicas para comprobar que la permisiva ya no se usa en ninguna ruta.
    script_src = "'self' 'unsafe-inline'" if allow_inline_scripts else "'self'"
    return (
        "default-src 'self'; "
        f"script-src {script_src}; "
        "style-src 'self'; "
        "font-src 'self'; "
        "img-src 'self' data:; "
        "connect-src 'self'; "
        "frame-src 'none'; "
        "frame-ancestors 'none'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "form-action 'self'"
    )


# Ya no queda ninguna pagina con scripts inline: todas se sirven desde el
# build de web/ (Fase 3 completa). La politica permisiva y la lista de
# rutas migradas que convivio con ella durante la migracion desaparecieron.
_CSP = _build_csp(allow_inline_scripts=False)


def _cache_control_for(path: str, content_type: str) -> str:
    """Politica de cache segun lo que se sirve.

    Los assets de /app/assets/ llevan un hash del contenido en el nombre
    (Vite): si el contenido cambia, cambia la URL, asi que se pueden cachear
    para siempre sin miedo a servir algo viejo.

    El HTML es justo lo contrario: su URL es fija y es quien apunta al
    asset con hash de turno. Si el navegador lo cachea, sigue pidiendo el
    bundle anterior y un despliegue no llega nunca al usuario.

    El resto (CSS e imagenes de /Frontend, que no llevan hash) se revalida
    en cada carga: barato via 304, y no se queda pegado.
    """
    if path.startswith("/app/assets/"):
        return "public, max-age=31536000, immutable"
    if "text/html" in content_type:
        return "no-store"
    return "no-cache"


@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = _CSP
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"

    # Las respuestas de la API no se cachean: cada una depende del token de
    # quien pregunta y de datos que cambian.
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    else:
        response.headers["Cache-Control"] = _cache_control_for(
            request.url.path, response.headers.get("content-type", "")
        )
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
# Rutas de aprendizaje por carrera. Una carrera sin entrada aqui usa solo la
# espina generica, asi que el archivo puede ir creciendo por tandas.
roadmaps_db = load_json_file("data/roadmaps.json")
# Que es cada dimension del perfil, por que importa y como se sube. Ocho
# entradas, no setenta y tres: las habilidades son las mismas para todas las
# carreras; lo que cambia por carrera es el nivel que pide.
skills_db = load_json_file("data/skills.json")
questions_db = load_json_file("data/questions.json")

ai_system = FuturePilotAIEcosystem(careers_data=careers_db, questions_data=questions_db,
                                   roadmaps_data=roadmaps_db)

# Configurable via env var: para tests aislados (ver tests/conftest.py) y
# para deployments reales donde la base deberia vivir en un disco
# persistente separado, no junto al codigo de la app.
USERS_DB_PATH = os.environ.get("USERS_DB_PATH") or str(REPO_ROOT / "backend" / "data" / "users.sqlite3")
users_store = UsersStore(USERS_DB_PATH)
# Las cuentas borradas antes de que el borrado limpiara el blob siguen siendo
# vinculables. Se limpian al arrancar: idempotente y sin coste apreciable, y
# nadie tiene que acordarse de ejecutar un script para que un borrado que ya
# se pidio se cumpla del todo.
_limpiadas = users_store.scrub_orphaned_result_owners()
if _limpiadas:
    print(f"[FuturePilot] {_limpiadas} resultados de cuentas borradas quedaron sin identificador.")

users_store.sync_admin_email(ADMIN_EMAIL or None)

# --------------------------------------------------------------------------
# Configuracion en JSON simple bajo backend/data/, leida del disco en cada
# uso (ver backend/config_store.py). Ausencia de archivo = valores por
# defecto, nunca un error.
# --------------------------------------------------------------------------
ADMIN_SETUP_PATH = REPO_ROOT / "backend" / "data" / "admin_setup.json"


# --------------------------------------------------------------------------
# Reclamacion de la cuenta de administrador
# --------------------------------------------------------------------------
# El acceso a /admin se concede a la cuenta cuyo email coincide con
# ADMIN_EMAIL (ver sync_admin_email) y el registro NO verifica el correo.
# Sin nada mas, quien se registrara primero con ese email se llevaba el
# panel, y los emails de admin suelen ser adivinables.
#
# Ahora ese registro concreto exige un token de un solo uso. El token se
# genera solo en el primer arranque y se imprime en la consola del
# servidor: quien despliega ya esta mirando ahi, y es un canal que un
# atacante remoto no tiene. Mismo patron que el primer login de Jenkins o
# GitLab. ADMIN_SETUP_TOKEN permite fijarlo desde el entorno para
# despliegues automatizados.
#
# En cuanto la cuenta existe el token deja de hacer falta: el email ya
# esta tomado y registrarlo otra vez choca con el UNIQUE de la tabla.
def admin_seat_is_claimed() -> bool:
    """True si ya hay una cuenta con el email de administrador."""
    return bool(ADMIN_EMAIL) and users_store.find_user_id_by_email(ADMIN_EMAIL) is not None


def admin_setup_token() -> Optional[str]:
    """Token vigente para reclamar la cuenta admin, o None si no hace falta.

    Se persiste en disco para que sobreviva a un reinicio: si se generara
    uno nuevo en cada arranque, un reinicio a mitad del despliegue
    invalidaria el que el operador acaba de copiar de la consola.
    """
    if not ADMIN_EMAIL or admin_seat_is_claimed():
        return None

    from_env = (os.environ.get("ADMIN_SETUP_TOKEN") or "").strip()
    if from_env:
        return from_env

    # El fichero guarda para que email se emitio: si ADMIN_EMAIL cambia, el
    # token anterior deja de valer y se emite uno nuevo. Reutilizarlo
    # significaria que quien vio el token del email antiguo puede reclamar
    # tambien el nuevo.
    stored = read_json(ADMIN_SETUP_PATH, {})
    if stored.get("token") and stored.get("email") == ADMIN_EMAIL:
        return stored["token"]

    token = secrets.token_urlsafe(24)
    write_json(ADMIN_SETUP_PATH, {"token": token, "email": ADMIN_EMAIL})
    return token


def clear_admin_setup_token() -> None:
    """Se llama cuando la cuenta queda reclamada: el token ya no sirve para
    nada y no tiene por que seguir en disco."""
    delete_json(ADMIN_SETUP_PATH)


# Bandera por pais para los sellos del Pasaporte - mismos ids que
# web/src/database/countries/ (colombia + los 21 de
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


# Cuantos paises distintos hay que explorar para ganarse el sello de
# continente. Con 22 paises en el catalogo, 8 es suficiente recorrido para
# que signifique algo y bastante poco para ser alcanzable.
CONTINENT_STAMP_THRESHOLD = 8


def _award_passport_stamps(
    user_id: int, event_type: str, subject_id: Optional[str], subject_label: Optional[str]
) -> List[Dict[str, Any]]:
    """Reglas fijas evento -> sello.

    Cada sello lleva su TIPO y su SUJETO, no solo una etiqueta: el pasaporte
    dibuja un diseño distinto para una ciudad, una universidad, un pais o un
    hito, y necesita saber cual es cual. La rareza ordena la coleccion sin
    convertirla en un juego: lo comun es lo que se hace a diario (visitar una
    ciudad), lo raro es lo que exige recorrido (un continente).

    award_passport_stamp es idempotente (UNIQUE en la tabla), asi que esta
    funcion solo devuelve los sellos otorgados de verdad AHORA - lo que el
    frontend usa para decidir cual animar "estampandose", sin repetir la
    animacion en visitas posteriores al mismo sitio.
    """
    newly_awarded: List[Dict[str, Any]] = []

    def try_award(key: str, label: str, **kwargs) -> None:
        if users_store.award_passport_stamp(user_id, key, label, **kwargs):
            newly_awarded.append({"key": key, "label": label, **kwargs})

    nombre = subject_label or (subject_id or "").replace("-", " ").title()

    if event_type == "test_completed":
        try_award(
            "test_completed", "Perfil vocacional",
            stamp_type="assessment", rarity="milestone",
        )
    elif event_type == "roadmap_created":
        try_award(
            "roadmap_created", "Roadmap creado",
            stamp_type="roadmap", rarity="milestone",
        )
    elif event_type == "ai_conversation":
        try_award(
            "ai_chat", "Primera conversación",
            stamp_type="mentor", rarity="common",
        )
    elif event_type == "university_viewed" and subject_id:
        # Un sello POR universidad, no uno generico. Antes existia
        # "university_visited" a secas: daba igual descubrir una o treinta.
        try_award(
            f"univ_{subject_id}", nombre,
            stamp_type="university", subject_id=subject_id, subject_label=nombre,
            rarity="common",
        )
    elif event_type == "city_explored" and subject_id:
        # city_explored ya se registraba como evento pero no daba ningun
        # sello: el recorrido por ciudades no dejaba huella en el pasaporte.
        try_award(
            f"city_{subject_id}", nombre,
            stamp_type="city", subject_id=subject_id, subject_label=nombre,
            rarity="common",
        )
    elif event_type == "country_explored" and subject_id:
        try_award(
            f"country_{subject_id}", nombre,
            stamp_type="country", subject_id=subject_id, subject_label=nombre,
            rarity="special",
            metadata={"flag": PASSPORT_COUNTRY_FLAGS.get(subject_id, "🌍")},
        )
        # El sello de continente no tiene evento propio: se gana al cruzar
        # un umbral de paises, asi que se comprueba justo despues de sumar
        # uno nuevo.
        explorados = users_store.passport_progress(user_id)["countries_explored"]
        if explorados >= CONTINENT_STAMP_THRESHOLD:
            try_award(
                "continent_americas", "Américas",
                stamp_type="continent", subject_id="americas", subject_label="Américas",
                rarity="rare", metadata={"countries": explorados},
            )
    elif event_type == "academic_goal_set" and subject_label:
        try_award(
            "academic_goal", subject_label,
            stamp_type="academic_goal", subject_id=subject_id,
            subject_label=subject_label, rarity="milestone",
        )

    return newly_awarded


# --------------------------------------------------------------------------
# Estáticos y páginas HTML (antes en backend/main.py)
# --------------------------------------------------------------------------
app.mount("/Frontend", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

# Build de web/ (Vite). Empezo siendo solo el globo 3D y va absorbiendo el
# resto del sitio pagina a pagina - cada pagina migrada es una entrada mas
# en web/vite.config.js. Las que aun no lo estan se siguen sirviendo desde
# Frontend/, sin interferir.
#
# Todo el dist se monta bajo /app porque vite.config.js declara
# base:"/app/". El prefijo existe para no chocar con lo que ya sirve este
# backend en la raiz. Las URLs publicas no cambian: cada pagina tiene su
# propia ruta mas abajo, que devuelve el HTML compilado correspondiente.
WEB_DIST_DIR = REPO_ROOT / "web" / "dist"
WEB_BUILD_AVAILABLE = WEB_DIST_DIR.exists()

if WEB_BUILD_AVAILABLE:
    app.mount("/app", StaticFiles(directory=str(WEB_DIST_DIR)), name="web")
else:
    print(
        f"Advertencia: {WEB_DIST_DIR} no existe todavia - corre "
        "'npm --prefix web run build' para habilitar las paginas compiladas."
    )


def _web_page(filename: str, fallback: Optional[Path] = None) -> FileResponse:
    """Sirve una pagina del build de web/. Si el build no existe todavia y
    la pagina tiene una version sin compilar en Frontend/, se usa esa - asi
    un checkout limpio sin `npm run build` sigue arrancando en vez de dar
    500 en media web."""
    built = WEB_DIST_DIR / filename
    if built.exists():
        return FileResponse(str(built))
    if fallback and fallback.exists():
        return FileResponse(str(fallback))
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=f"Falta {filename}. Corre 'npm --prefix web run build'.",
    )


# La portada tambien acepta HEAD, por el mismo motivo que /healthz: es la URL
# que sondea por defecto casi cualquier monitor de disponibilidad, y con solo
# GET registrado le contestabamos 405. Las demas paginas se quedan en GET: a
# nadie se le ocurre monitorizar /passport.
@app.get("/")
@app.head("/", include_in_schema=False)
def home():
    return _web_page("index.html")


@app.get("/globe")
def globe_page():
    """El globo se servia con un mount (StaticFiles html=True) bajo /globe.
    Ahora que web/ construye varias paginas, cada una tiene su ruta y el
    dist entero se monta una sola vez bajo /app."""
    return _web_page("globe.html")


@app.get("/assessment")
def assessment_page():
    # Primera pagina migrada al build de web/ (Fase 3). Ya no existe copia
    # sin compilar en Frontend/, asi que requiere `npm --prefix web run
    # build`; _web_page devuelve un 503 explicandolo si falta.
    return _web_page("assessment.html")


@app.get("/login")
def login_page():
    return _web_page("login.html")


@app.get("/reset-password")
def reset_password_page():
    return _web_page("reset-password.html")


@app.get("/careers")
def careers_page():
    return _web_page("careers.html")


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
    return _web_page("journey.html")


@app.get("/flightplan")
def flightplan_page():
    return _web_page("flightplan.html")


@app.get("/passport")
def passport_page():
    return _web_page("passport.html")


@app.get("/consent/{token}")
def consent_page(token: str):
    """Centro para Padres. Publica a proposito: el acudiente no tiene cuenta
    y no vamos a pedirle que se cree una para responder una pregunta.

    La pagina es un cascaron vacio; el token no se mira aqui. Los datos los
    pide ella a /api/v1/consent/{token}, que si comprueba que el enlace vale.
    """
    return _web_page("parent.html")


@app.get("/terms")
def terms_page():
    return _web_page("terms.html")


@app.get("/privacy")
def privacy_page():
    return _web_page("privacy.html")


# El panel de administracion es una carpeta separada (Frontend/admin/),
# completamente desacoplada del sitio de estudiantes. Las paginas en si no
# traen ningun dato: son un shell vacio que la propia pagina bloquea hasta
# verificar contra /api/v1/admin/me (ver admin-dashboard.js) - los datos
# reales solo salen por la API, que si esta protegida en el servidor.
@app.get("/admin")
def admin_dashboard_page():
    return _web_page("admin-dashboard.html")


@app.get("/admin/login")
def admin_login_page():
    return _web_page("admin-login.html")


@app.get("/admin/system-health")
def admin_system_health_page():
    return _web_page("system-health.html")


# --------------------------------------------------------------------------
# Autenticación
# --------------------------------------------------------------------------
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class RegisterRequest(BaseModel):
    email: str = Field(..., description="Email del estudiante")
    password: str = Field(..., min_length=8, description="Contrasena, minimo 8 caracteres")
    name: Optional[str] = Field(default=None, description="Nombre para mostrar (opcional)")
    admin_setup_token: Optional[str] = Field(
        default=None,
        description=(
            "Solo para reclamar la cuenta de administrador la primera vez. "
            "El servidor lo imprime en su consola al arrancar. Para el resto "
            "de registros se ignora."
        ),
    )

    is_minor: bool = Field(
        default=False,
        description="El estudiante declara ser menor de 18 anos.",
    )
    guardian_email: Optional[str] = Field(
        default=None,
        description=(
            "Correo del padre, madre o acudiente. Obligatorio si is_minor. "
            "Se ignora si no lo es: quien dice ser mayor de edad no deja el "
            "correo de nadie mas."
        ),
    )

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if not EMAIL_PATTERN.match(value.strip()):
            raise ValueError("Email invalido")
        return value

    @model_validator(mode="after")
    def validate_guardian(self) -> "RegisterRequest":
        """El correo del acudiente solo se exige - y solo se acepta - cuando
        hace falta.

        La comprobacion de que no sea el suyo propio no detecta a un menor
        deshonesto: puede poner cualquier otra direccion. Detecta el atajo
        obvio, el que se toma sin pensarlo, y de paso el error de teclear dos
        veces el mismo correo sin darse cuenta.
        """
        if not self.is_minor:
            self.guardian_email = None
            return self
        acudiente = (self.guardian_email or "").strip()
        if not acudiente:
            raise ValueError(
                "Si eres menor de edad hace falta el correo de tu padre, madre o acudiente."
            )
        if not EMAIL_PATTERN.match(acudiente):
            raise ValueError("El correo del acudiente no es valido.")
        if acudiente.lower() == self.email.strip().lower():
            raise ValueError(
                "El correo del acudiente tiene que ser distinto del tuyo."
            )
        self.guardian_email = acudiente
        return self


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

    # Reclamar la cuenta de administrador exige el token de primer arranque.
    # Se compara con compare_digest para no filtrar por tiempo cuanto prefijo
    # del token se acerto.
    if ADMIN_EMAIL and payload.email.strip().lower() == ADMIN_EMAIL.lower():
        expected = admin_setup_token()
        provided = (payload.admin_setup_token or "").strip()
        if expected and not secrets.compare_digest(provided, expected):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "Este email esta reservado para la cuenta de administrador. "
                    "Para reclamarla hace falta el token de configuracion que el "
                    "servidor imprime en su consola al arrancar."
                ),
            )

    try:
        user = users_store.register(
            payload.email, payload.password, payload.name,
            is_minor=payload.is_minor, guardian_email=payload.guardian_email,
        )
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
    if user.get("is_admin"):
        # Asiento ocupado: el token de reclamacion ya no sirve para nada.
        clear_admin_setup_token()

    # Si es menor, se abre el expediente del acudiente. NO bloquea nada: la
    # sesion se crea igual y la cuenta funciona entera desde este momento. Lo
    # que arranca aqui es el reloj de los 30 dias y el enlace del correo.
    if user.get("is_minor") and user.get("guardian_email"):
        consent_token = users_store.create_consent_request(
            user["id"], user["guardian_email"])
        _notificar_acudiente(user, consent_token, request)

    token = users_store.create_session(user["id"])
    return {"success": True, "token": token, "user": user}


def _notificar_acudiente(user: dict, consent_token: str, request: Request) -> bool:
    """Avisa al acudiente y le manda su enlace.

    Devuelve si el correo salio de verdad, pero NO propaga el fallo: que el
    correo no salga no puede impedir que el chico tenga su cuenta. El
    expediente ya quedo abierto y el enlace se puede reenviar.

    Sin SMTP configurado esto no envia nada (ver backend/mailer.py): en
    desarrollo el cuerpo se imprime en consola, en produccion ni eso, porque
    el mensaje lleva el token dentro.
    """
    enlace = f"{str(request.base_url).rstrip('/')}/consent/{consent_token}"
    nombre = (user.get("name") or "").strip() or user["email"]
    try:
        return mailer.send_email(
            to_email=user["guardian_email"],
            subject="Permiso para la cuenta de FuturePilot de tu hijo o hija",
            body=f"Hola,\n\n{nombre} creo una cuenta en FuturePilot y nos dijo que es menor de edad, indicandote como su padre, madre o acudiente.\n\nFuturePilot es una plataforma de orientacion vocacional para estudiantes de secundaria. Para poder seguir tratando sus datos necesitamos tu autorizacion:\n\n    {enlace}\n\nAhi puedes ver que guardamos exactamente, autorizar o negar, y pedir que se borre todo.\n\nSi no respondes, en 30 dias borraremos sus datos.\n\nSi no conoces a esta persona, ignora este mensaje: sin tu autorizacion los datos se borran solos.\n\n- FuturePilot",
        )
    except Exception as error:  # noqa: BLE001
        # Un SMTP caido no puede tumbar un registro que ya se completo.
        print(f"[FuturePilot] No se pudo avisar al acudiente: {error}")
        return False


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
    """Espejo de /api/v1/admin/me para la sesion de estudiante: responde 401
    si el token ya no vale. Hoy ninguna pagina lo llama - el test consulta
    /api/v1/me/results, que ademas trae datos - pero es la forma canonica de
    preguntar "¿sigue viva mi sesion?" sin pedir nada mas, y es como los
    tests comprueban que el logout de verdad la invalida."""
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
class ChangePasswordRequest(BaseModel):
    current_password: str = Field(..., description="Contrasena actual")
    new_password: str = Field(..., min_length=8, description="Nueva contrasena, minimo 8 caracteres")


class DeleteAccountRequest(BaseModel):
    password: str = Field(..., description="Contrasena actual, para confirmar")


class ClaimResultRequest(BaseModel):
    result_id: int = Field(..., description="id devuelto por POST /api/v1/assess")


@app.get("/api/v1/me/results", status_code=status.HTTP_200_OK)
def get_my_results(
    lang: Optional[str] = None,
    current_user: dict = Depends(get_current_user_required),
):
    """Ultimo resultado de test guardado para la cuenta autenticada, o
    resultados=None si todavia no ha completado ninguno con esta cuenta."""
    latest = users_store.latest_result_for_user(current_user["id"])
    if latest is None:
        return {"success": True, "results": None}
    return {
        "success": True,
        "results": _localize_results(json.loads(latest["results_json"]), lang),
        "lang": _resolve_lang(lang),
        # Lo ya marcado viaja con el resultado: /journey necesita las dos
        # cosas a la vez y pedirlas por separado deja la barra parpadeando.
        "completed_checkpoints": ai_system.completed_checkpoints(str(current_user["id"])),
        "created_at": latest["created_at"],
    }


# Cuantas acciones reales cuentan como "hecho" en cada hito del recorrido.
# Un porcentaje decorativo no le dice nada a nadie: cada uno de estos sale de
# algo que el estudiante hizo de verdad y que quedo registrado.
# El orden es el de la historia que cuenta la ruta, no el de la base de datos:
# primero descubres quien eres, luego te identificas, luego mires a donde
# puedes ir, luego eliges. El "siguiente paso" que se sugiere en pantalla es el
# primero de esta lista que no este completo, asi que el orden importa.
#
# Ninguno esta bloqueado de verdad: todos se pueden hacer hoy, en cualquier
# orden. Se marcan como hecho / actual / pendiente, que es la verdad, en vez de
# como "se desbloqueara cuando la IA analice tu perfil" - eso era lo que decia
# la version anterior de esta pagina sobre funciones que no existen.
JOURNEY_STEPS = [
    # (clave, campo de progress, cuantas hacen falta, a donde lleva)
    ("test", "tests_completed", 1, "/assessment"),
    ("profile", None, 1, "/passport"),
    ("explore", "countries_explored", 3, "/globe"),
    ("universities", "universities_explored", 3, "/globe"),
    # Tres de los cuatro campos del objetivo: la meta pensada, no tecleada.
    ("goal", None, 3, "/passport"),
    ("mentor", "ai_conversations", 1, "#mentor"),
]


def _build_journey(profile: Dict[str, Any], progress: Dict[str, Any]) -> List[Dict[str, Any]]:
    """El recorrido del estudiante, paso a paso, con lo que lleva hecho.

    Todo sale de acciones registradas: el perfil esta completo si hay pais y
    ciudad, el objetivo si hay universidad soñada, y el resto son contadores
    de eventos reales del pasaporte. Nada aqui es un numero de adorno.
    """
    goals = profile.get("goals") or {}
    # El objetivo no es una casilla: se cuenta cuantos campos ha pensado.
    # Antes bastaba escribir el nombre de una universidad para dar el hito
    # entero por hecho, asi que el recorrido subia un escalon completo por
    # teclear una palabra. Tres de cuatro es haberlo pensado; uno es una idea
    # suelta.
    campos_objetivo = ("dream_university", "desired_career", "target_country", "languages_to_learn")
    hechos = {
        "profile": 1 if (profile.get("country") and profile.get("city")) else 0,
        "goal": sum(1 for campo in campos_objetivo if (goals.get(campo) or "").strip()),
    }

    journey = []
    for key, campo, objetivo, destino in JOURNEY_STEPS:
        hecho = hechos[key] if campo is None else int(progress.get(campo) or 0)
        journey.append({
            "key": key,
            "done": min(hecho, objetivo),
            "target": objetivo,
            "complete": hecho >= objetivo,
            "href": destino,
        })
    return journey


@app.get("/api/v1/me/dashboard", status_code=status.HTTP_200_OK)
def get_my_dashboard(
    lang: Optional[str] = None,
    current_user: dict = Depends(get_current_user_required),
):
    """Todo lo que necesita la pantalla de cuenta, en una sola peticion.

    Antes esa pantalla solo sabia del ultimo resultado del test, asi que era
    una hoja de resultados y nada mas. Una cuenta es mas que eso: quien eres,
    que llevas hecho, que hiciste ultimamente y por donde ibas. Todos esos
    datos ya se estaban guardando; lo unico que faltaba era servirlos.

    Se devuelven juntos a proposito: son una sola pantalla, y cuatro
    peticiones en paralelo pintarian la pagina a trozos.
    """
    user_id = current_user["id"]
    profile = users_store.get_passport_profile(user_id)
    progress = users_store.passport_progress(user_id)
    journey = _build_journey(profile, progress)

    historial = users_store.results_history_for_user(user_id, limit=10)
    resultados = [
        {
            "id": fila["id"],
            "created_at": fila["created_at"],
            "results": _localize_results(json.loads(fila["results_json"]), lang),
        }
        for fila in historial
    ]

    return {
        "success": True,
        "lang": _resolve_lang(lang),
        "account": {
            "name": current_user.get("name"),
            "email": current_user["email"],
            "member_since": current_user["created_at"],
            "passport_id": f"FP-{user_id:06d}",
        },
        # El mas reciente aparte: es lo que se pinta arriba. El resto es el
        # historial, que solo tiene sentido si hay mas de uno.
        "latest": resultados[0] if resultados else None,
        "history": resultados[1:],
        "progress": progress,
        "journey": journey,
        # Cuanto del recorrido esta hecho, contando pasos completos sobre el
        # total. Se calcula aqui para que ninguna pantalla se invente el suyo.
        "journey_percent": round(
            100 * sum(1 for paso in journey if paso["complete"]) / len(journey)
        ) if journey else 0,
        "stamps": users_store.list_passport_stamps(user_id)[-6:],
        "recent_activity": users_store.list_passport_events(user_id, limit=8),
        "goals": profile.get("goals") or {},
    }


@app.post("/api/v1/me/password", status_code=status.HTTP_200_OK)
def change_my_password(
    payload: ChangePasswordRequest,
    current_user: dict = Depends(get_current_user_required),
):
    """Cambia la contrasena de la cuenta autenticada.

    Exige la contrasena actual aunque ya haya sesion valida: un token
    robado, o un portatil que alguien dejo abierto, no deberia bastar para
    quedarse con la cuenta.
    """
    try:
        users_store.verify_login(current_user["email"], payload.current_password)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La contrasena actual no es correcta.",
        )

    users_store.set_password(current_user["id"], payload.new_password)
    # set_password cierra todas las sesiones, incluida esta. Es lo que se
    # quiere: si la razon del cambio es que alguien mas entro, ese alguien
    # tiene que quedarse fuera. El cliente vuelve a iniciar sesion.
    return {"success": True, "detail": "Contrasena actualizada. Vuelve a iniciar sesion."}


@app.get("/api/v1/me/export", status_code=status.HTTP_200_OK)
def export_my_data(current_user: dict = Depends(get_current_user_required)):
    """Todo lo que la plataforma guarda sobre esta cuenta, en un JSON.

    Sin traducir y sin resumir: es una copia de los datos, no una pantalla.
    Se sirve como descarga para que el estudiante pueda quedarse con lo suyo
    sin tener que pedirselo a nadie.
    """
    user_id = current_user["id"]
    return {
        "exported_at": utc_now_iso(),
        "account": {
            "name": current_user.get("name"),
            "email": current_user["email"],
            "member_since": current_user["created_at"],
        },
        "passport_profile": users_store.get_passport_profile(user_id),
        "passport_progress": users_store.passport_progress(user_id),
        "passport_stamps": users_store.list_passport_stamps(user_id),
        "passport_events": users_store.list_passport_events(user_id, limit=1000),
        "test_results": [
            {"created_at": fila["created_at"], "results": json.loads(fila["results_json"])}
            for fila in users_store.results_history_for_user(user_id, limit=100)
        ],
    }


@app.delete("/api/v1/me", status_code=status.HTTP_200_OK)
def delete_my_account(
    payload: DeleteAccountRequest,
    current_user: dict = Depends(get_current_user_required),
):
    """Borra la cuenta. Irreversible.

    Pide la contrasena por lo mismo que el cambio de contrasena: tener la
    sesion abierta no puede ser suficiente para destruir la cuenta de otro.
    Los resultados de test sobreviven desligados (ver delete_account): dejan
    de apuntar a nadie, pero no falsean las estadisticas de la plataforma.
    """
    try:
        users_store.verify_login(current_user["email"], payload.password)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La contrasena no es correcta.",
        )

    users_store.delete_account(current_user["id"])
    # La base no era todo. El mentor guarda el historial de cada estudiante en
    # un archivo aparte (data/users/{id}_memory.json) y nadie lo borraba: la
    # cuenta desaparecia y el perfil - con sus evaluaciones dentro - se
    # quedaba en disco, con el id de la persona en el propio nombre.
    ai_system.forget_student(str(current_user["id"]))
    return {"success": True, "detail": "Cuenta eliminada."}


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
# Formatos que aceptamos para la foto del pasaporte, con los bytes que tiene
# que traer el archivo al principio para ser de verdad de ese tipo.
#
# `data:image/svg+xml` desaparece a proposito: un SVG es un documento con
# marcado dentro, no una fotografia, y aqui la unica razon de existir del
# campo es la cara de alguien.
_FOTO_FORMATOS = {
    "image/jpeg": (b"\xff\xd8\xff",),
    "image/png": (b"\x89PNG\r\n\x1a\n",),
    "image/webp": (b"RIFF",),
}
# Una foto de 320x320 recomprimida pesa ~25 KB, o ~34 KB al pasarla a base64.
# 150 KB deja margen de sobra sin que el campo sirva de almacen general.
_FOTO_MAX = 150_000


def _decodificar_foto(value: str) -> tuple[str, bytes]:
    """Comprueba que el data URL sea una imagen real y devuelve sus bytes.

    Antes bastaba con que la cadena empezara por `data:image/`, asi que
    `data:image/png;base64,` seguido de cualquier cosa pasaba: ni era una
    imagen ni habia forma de saberlo hasta que el navegador no la pintaba.
    """
    if not value.startswith("data:"):
        raise ValueError("la foto debe ser un data URL")
    cabecera, _, cuerpo = value.partition(",")
    if not cuerpo:
        raise ValueError("el data URL no trae contenido")
    tipo = cabecera[5:].split(";")[0].strip().lower()
    if tipo not in _FOTO_FORMATOS:
        raise ValueError(f"formato de imagen no admitido: {tipo or 'sin tipo'}")
    if ";base64" not in cabecera:
        raise ValueError("la foto debe venir en base64")
    try:
        crudo = base64.b64decode(cuerpo, validate=True)
    except (binascii.Error, ValueError) as exc:
        raise ValueError("la foto no es base64 valido") from exc
    if not any(crudo.startswith(firma) for firma in _FOTO_FORMATOS[tipo]):
        raise ValueError(f"el contenido no es un {tipo}")
    return tipo, crudo


def _sin_metadatos_jpeg(crudo: bytes) -> bytes:
    """Quita de un JPEG los segmentos de metadatos.

    El navegador ya no manda EXIF porque redibuja la foto en un lienzo antes
    de subirla, pero el endpoint es publico: quien llame a la API a mano puede
    mandar el archivo tal cual salio del celular, con el modelo del aparato,
    la fecha exacta y las coordenadas GPS de donde se tomo pegadas detras de
    la cara. Se descartan APP1..APP15 (EXIF, XMP, IPTC) y los comentarios.

    Es manipulacion de bytes, no decodificacion: no hace falta ninguna
    libreria de imagenes.
    """
    if not crudo.startswith(b"\xff\xd8"):
        return crudo
    salida = bytearray(b"\xff\xd8")
    i, n = 2, len(crudo)
    while i + 3 < n:
        if crudo[i] != 0xFF:
            break  # no estamos en un limite de segmento: se copia el resto
        marcador = crudo[i + 1]
        if marcador == 0xDA:  # SOS: detras van los datos comprimidos
            break
        if marcador == 0x01 or 0xD0 <= marcador <= 0xD8:  # sin longitud
            salida += crudo[i:i + 2]
            i += 2
            continue
        longitud = int.from_bytes(crudo[i + 2:i + 4], "big")
        fin = i + 2 + longitud
        if longitud < 2 or fin > n:
            break
        if not (0xE1 <= marcador <= 0xEF or marcador == 0xFE):
            salida += crudo[i:fin]
        i = fin
    salida += crudo[i:]
    return bytes(salida)


def _foto_saneada(value: str) -> str:
    tipo, crudo = _decodificar_foto(value)
    if tipo == "image/jpeg":
        crudo = _sin_metadatos_jpeg(crudo)
    return f"data:{tipo};base64," + base64.b64encode(crudo).decode("ascii")


class PassportProfileUpdateRequest(BaseModel):
    country: Optional[str] = None
    city: Optional[str] = None
    languages: Optional[List[str]] = None
    photo_data_url: Optional[str] = Field(default=None, max_length=_FOTO_MAX)

    @field_validator("photo_data_url")
    @classmethod
    def validate_photo(cls, value: Optional[str]) -> Optional[str]:
        # La cadena vacia es como se quita la foto; `None` significa "no
        # toques este campo".
        if value is None or value == "":
            return value
        return _foto_saneada(value)


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
def get_passport(
    lang: Optional[str] = None,
    current_user: dict = Depends(get_current_user_required),
):
    profile = users_store.get_passport_profile(current_user["id"])

    return {
        "success": True,
        "user": {
            "name": current_user.get("name"),
            "email": current_user["email"],
            "member_since": current_user["created_at"],
            # Identificador visible del pasaporte. Se deriva del id real de
            # la cuenta en vez de generarse en el cliente para que sea el
            # mismo en cualquier dispositivo, y va con formato de documento
            # porque es lo que se imprime en la cubierta.
            "passport_id": f"FP-{current_user['id']:06d}",
        },
        "profile": profile,
        # Sin `vocational` ni `progress`: el perfil vocacional y el recuento
        # de progreso los sirve /api/v1/me/dashboard, que es quien los pinta.
        # Mandarlos aqui obligaba a leer y traducir el ultimo resultado del
        # test en cada carga del pasaporte para nada.
        "stamps": users_store.list_passport_stamps(current_user["id"]),
    }


@app.put("/api/v1/passport/profile", status_code=status.HTTP_200_OK)
def update_passport_profile_route(
    payload: PassportProfileUpdateRequest,
    current_user: dict = Depends(get_current_user_required),
):
    # El store entiende `None` como "no cambies este campo", asi que quitar la
    # foto necesita una senal distinta: la cadena vacia, que aqui se convierte
    # en el NULL que de verdad la borra de la fila.
    foto = payload.photo_data_url
    profile = users_store.update_passport_profile(
        current_user["id"],
        country=payload.country,
        city=payload.city,
        languages=payload.languages,
        photo_data_url=foto,
        clear_photo=(foto == ""),
    )
    return {"success": True, "profile": profile}


# Disposicion a estudiar fuera. Se guarda la CLAVE, nunca la frase: el
# estudiante puede cambiar de idioma despues de responder, y una respuesta
# congelada en castellano se leeria en castellano para siempre - el mismo
# motivo por el que el motor emite claves y no prosa.
MOBILITY_CHOICES = ("yes_definitely", "yes_if_viable", "maybe", "prefer_home")


class ExplorationPreferencesRequest(BaseModel):
    mobility: Optional[str] = None
    # Cerrar sin responder tambien es una respuesta: significa "ahora no". Se
    # guarda para no volver a preguntarselo cada vez que entra al globo.
    dismissed: bool = False

    @field_validator("mobility")
    @classmethod
    def validate_mobility(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and value not in MOBILITY_CHOICES:
            raise ValueError(
                f"mobility debe ser una de {MOBILITY_CHOICES}, no {value!r}"
            )
        return value


@app.get("/api/v1/me/preferences", status_code=status.HTTP_200_OK)
def get_my_preferences(current_user: dict = Depends(get_current_user_required)):
    """Las preferencias de exploracion, y lo que ya sabemos sin preguntar.

    `known` es la mitad importante: el pasaporte YA guarda los idiomas que
    habla el estudiante y el pais al que le gustaria ir. Volver a preguntarlo
    en el globo seria hacerle repetir lo que ya escribio, que es justo lo que
    convierte una experiencia en un formulario.
    """
    perfil = users_store.get_passport_profile(current_user["id"])
    metas = perfil.get("goals") or {}
    return {
        "success": True,
        "preferences": perfil.get("preferences") or {},
        "known": {
            # De donde es. Sirve para saber que destino es "quedarse" y cual
            # es "salir", que es la diferencia que cambia toda la pantalla.
            "home_country": perfil.get("country"),
            "home_city": perfil.get("city"),
            "languages": perfil.get("languages") or [],
            "languages_to_learn": (metas.get("languages_to_learn") or "").strip() or None,
            "target_country": (metas.get("target_country") or "").strip() or None,
            "desired_career": (metas.get("desired_career") or "").strip() or None,
        },
    }


@app.put("/api/v1/me/preferences", status_code=status.HTTP_200_OK)
def update_my_preferences(
    payload: ExplorationPreferencesRequest,
    current_user: dict = Depends(get_current_user_required),
):
    cambios: Dict[str, Any] = {}
    if payload.mobility is not None:
        cambios["mobility"] = payload.mobility
        cambios["mobility_answered_at"] = utc_now_iso()
    if payload.dismissed:
        cambios["mobility_dismissed_at"] = utc_now_iso()
    if not cambios:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No hay nada que guardar.",
        )
    return {
        "success": True,
        "preferences": users_store.update_passport_preferences(current_user["id"], cambios),
    }


@app.put("/api/v1/passport/goals", status_code=status.HTTP_200_OK)
def update_passport_goals_route(
    payload: PassportGoalsUpdateRequest,
    current_user: dict = Depends(get_current_user_required),
):
    profile = users_store.update_passport_goals(current_user["id"], payload.goals)

    # El sello de meta academica se gana al fijar una universidad objetivo,
    # y se emite AQUI - no desde el cliente - porque solo el servidor sabe
    # que la meta quedo guardada de verdad. Marcar una meta es una decision
    # real del estudiante, no una pantalla que abrio.
    new_stamps: List[Dict[str, Any]] = []
    universidad = (payload.goals.get("dream_university") or "").strip()
    if universidad:
        if not users_store.has_passport_event(current_user["id"], "academic_goal_set"):
            users_store.record_passport_event(
                current_user["id"], "academic_goal_set", None, universidad
            )
        new_stamps = _award_passport_stamps(
            current_user["id"], "academic_goal_set", None, universidad
        )

    return {"success": True, "profile": profile, "new_stamps": new_stamps}


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
class ConsentDecision(BaseModel):
    authorized: bool = Field(..., description="True autoriza, False niega.")


def _consent_publico(expediente: dict) -> dict:
    """Lo que ve quien abre el enlace.

    Se manda el nombre y el correo del estudiante porque el acudiente puede
    tener mas de un hijo y necesita saber de cual se le habla. No se manda
    nada mas de la cuenta: ni el resultado del test, ni el pasaporte, ni por
    donde ha navegado. El permiso es sobre el tratamiento, no una mirilla.
    """
    return {
        "status": expediente["status"],
        "studentName": expediente.get("student_name"),
        "studentEmail": expediente.get("student_email"),
        "guardianEmail": expediente["guardian_email"],
        "requestedAt": expediente["requested_at"],
        "expiresAt": expediente["expires_at"],
        "resolvedAt": expediente.get("resolved_at"),
    }


@app.get("/api/v1/consent/{token}", status_code=status.HTTP_200_OK)
def get_consent(token: str, request: Request):
    consent_rate_limiter.check(client_ip(request))
    expediente = users_store.get_consent_by_token(token)
    if expediente is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Este enlace no es valido. Puede que se haya pedido uno nuevo.",
        )
    return {"success": True, "consent": _consent_publico(expediente)}


@app.post("/api/v1/consent/{token}", status_code=status.HTTP_200_OK)
def resolve_consent(token: str, payload: ConsentDecision, request: Request):
    """El acudiente responde.

    Que niegue NO borra la cuenta aqui mismo. Se registra la negativa y el
    borrado lo hace el proceso de mantenimiento, que es explicito y deja
    rastro: un DELETE en cascada disparado desde un clic en un correo, sin
    confirmacion y sin vuelta atras, es demasiado poder para un enlace que
    pudo reenviarse a cualquiera.
    """
    consent_rate_limiter.check(client_ip(request))
    resuelto = users_store.resolve_consent(token, payload.authorized)
    if resuelto is None:
        actual = users_store.get_consent_by_token(token)
        if actual is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Este enlace no es valido.",
            )
        # Ya respondido o vencido. Se devuelve el estado real en vez de un
        # error a secas: el acudiente merece ver que fue lo que quedo.
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Este permiso ya no admite respuesta.",
                "consent": _consent_publico(actual),
            },
        )
    return {"success": True, "consent": _consent_publico(resuelto)}


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
    if (WEB_DIST_DIR / "globe.html").exists():
        return {"status": "ok", "detail": "web/dist presente y montado en /app."}
    return {
        "status": "warning",
        "detail": "web/dist no existe todavia - corre 'npm --prefix web run build'.",
    }


def _check_login_pages() -> Dict[str, Any]:
    missing = [
        name for name in ("login.html", "admin-login.html")
        if not (WEB_DIST_DIR / name).exists()
    ]
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
    # Todas las paginas salen ya del build de web/. Si falta alguna es que
    # nadie corrio `npm --prefix web run build`.
    required = [
        "index.html", "assessment.html", "careers.html", "journey.html",
        "flightplan.html", "passport.html", "login.html", "reset-password.html",
        "terms.html", "privacy.html", "globe.html",
    ]
    missing = [name for name in required if not (WEB_DIST_DIR / name).exists()]
    if missing:
        return {
            "status": "error",
            "detail": f"Faltan paginas compiladas ({', '.join(missing)}). Corre 'npm --prefix web run build'.",
        }
    return {"status": "ok", "detail": f"{len(required)} paginas compiladas presentes."}


def _check_static_assets() -> Dict[str, Any]:
    # Frontend/ ya solo guarda CSS e imagenes: todo el JS se movio a
    # web/src/ y viaja dentro del bundle, asi que buscar ficheros .js
    # sueltos aqui daria "warning" para siempre.
    required = [
        "style.css", "assessment.css", "login.css", "passport.css",
        "journey.css", "futurepilot-logo-transparent.png",
    ]
    missing = [name for name in required if not (FRONTEND_DIR / name).exists()]
    if missing:
        return {"status": "warning", "detail": f"Faltan: {', '.join(missing)}"}
    return {"status": "ok", "detail": "Hojas de estilo e imagenes compartidas presentes."}


_STATUS_SEVERITY = {"error": 0, "warning": 1, "ok": 2}


def _check_backups() -> Dict[str, str]:
    """Hay copias, y son recientes.

    Una copia que dejo de hacerse hace tres semanas no avisa: el cron falla en
    silencio, el disco se llena, alguien cambia una ruta. Lo unico que
    convierte un respaldo en una garantia es que alguien mire si sigue vivo, y
    este panel es donde se mira.
    """
    try:
        from backend import backup as backup_mod
    except ImportError as error:
        return {"status": "error", "detail": f"no se pudo cargar el modulo: {error}"}

    copias = backup_mod.listar()
    if not copias:
        return {"status": "error",
                "detail": f"No hay ninguna copia en {backup_mod.carpeta_copias()}. "
                          "Programa 'python -m backend.backup' a diario."}

    ultima, tam = copias[-1]
    edad_h = (time.time() - ultima.stat().st_mtime) / 3600
    ok, detalle = backup_mod.verificar(ultima)
    if not ok:
        return {"status": "error", "detail": f"La copia mas reciente no sirve: {detalle}"}
    if edad_h > 48:
        return {"status": "warning",
                "detail": f"La copia mas reciente tiene {edad_h/24:.1f} dias. "
                          "El respaldo diario puede haber dejado de correr."}
    return {"status": "ok",
            "detail": f"{len(copias)} copias, la ultima hace {edad_h:.0f} h "
                      f"({tam/1024:.0f} KB, {detalle})."}


def _check_consents() -> Dict[str, str]:
    """El barrido de permisos sigue corriendo.

    Mismo problema que los respaldos y peor final. A un acudiente que no
    responde le prometimos por correo que en 30 dias borrariamos los datos de
    su hijo, y a uno que se nego le dijimos "sus datos se borraran". Quien
    cumple esa frase es un comando de mantenimiento que corre fuera de este
    proceso (backend/consent_expiry.py). Si nadie lo programo, o el cron
    murio, no falla nada visible: simplemente los datos de un menor se quedan,
    y la promesa pasa a ser mentira en silencio.

    Que aparezca algo aqui no es un fallo del servidor. Es trabajo pendiente
    que solo se puede hacer a mano, y por eso se mira desde el panel.
    """
    try:
        from backend import consent_expiry
    except ImportError as error:
        return {"status": "error", "detail": f"no se pudo cargar el modulo: {error}"}

    try:
        pendientes = consent_expiry.listar()
    except Exception as error:  # noqa: BLE001 - health check, cualquier fallo cuenta
        return {"status": "error", "detail": f"no se pudo consultar: {error}"}

    if not pendientes:
        return {"status": "ok", "detail": "Ningun borrado de menor pendiente."}

    # El mas viejo manda: mide cuanto lleva sin correr el barrido.
    atraso_dias = 0.0
    for expediente in pendientes:
        try:
            vencio = datetime.fromisoformat(expediente["expires_at"])
        except (ValueError, KeyError):
            continue
        if vencio.tzinfo is None:
            vencio = vencio.replace(tzinfo=timezone.utc)
        atraso_dias = max(atraso_dias, (datetime.now(timezone.utc) - vencio).days)

    detalle = (f"{len(pendientes)} cuenta(s) de menor sin autorizacion que deberian "
               f"estar borradas (la mas antigua lleva {atraso_dias:.0f} dia(s) de "
               f"retraso). Corre 'python -m backend.consent_expiry --borrar'.")
    # Una semana de retraso ya no es un cron que se salto un dia: es que nadie
    # lo programo, y llevamos una semana incumpliendolo por escrito.
    return {"status": "error" if atraso_dias > 7 else "warning", "detail": detalle}


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
        "backups": _check_backups(),
        "consents": _check_consents(),
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
        ai_system = FuturePilotAIEcosystem(careers_data=careers_db, questions_data=questions_db,
                                   roadmaps_data=roadmaps_db)
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
    """Quien hizo que desde el panel y cuando. No tiene pagina propia: se
    conserva porque el registro en si vale para reconstruir que paso, y
    este endpoint es la unica forma de leerlo sin abrir el SQLite a mano."""
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
SUPPORTED_LANGS = ("en", "es")


def _resolve_lang(lang: Optional[str]) -> str:
    """Un idioma no soportado cae al ingles en vez de dar error: el idioma
    es una preferencia de presentacion, no algo por lo que rechazar una
    peticion."""
    normalized = (lang or "").strip().lower()[:2]
    return normalized if normalized in SUPPORTED_LANGS else "en"


def _localize_question(question: Dict[str, Any], lang: str) -> Dict[str, Any]:
    """Aplana un registro con traducciones a la forma que espera el cliente.

    Si falta una traduccion se usa el ingles, nunca una cadena vacia: es
    preferible una pregunta sin traducir a una pregunta en blanco."""
    suffix = "" if _resolve_lang(lang) == "en" else f"_{_resolve_lang(lang)}"
    localized = {
        key: value for key, value in question.items()
        if key != "answers" and not key.endswith(tuple(f"_{code}" for code in SUPPORTED_LANGS))
    }
    localized["question"] = question.get(f"question{suffix}") or question["question"]
    localized["answers"] = [
        {
            **{k: v for k, v in answer.items()
               if not k.endswith(tuple(f"_{code}" for code in SUPPORTED_LANGS))},
            "text": answer.get(f"text{suffix}") or answer["text"],
        }
        for answer in question.get("answers", [])
    ]
    return localized


# Por debajo de esta diferencia contra lo que pide la carrera no se considera
# una carencia: estar en 6.8 donde piden 7.0 no es una brecha, es la misma
# cosa medida con ruido. Mismo umbral que usa el mentor.
GAP_THRESHOLD = 1.0


def _career_match_percentage(vector: Dict[str, Any], career: Dict[str, Any]) -> Optional[float]:
    """La compatibilidad de UNA carrera con el perfil.

    Se puntua con el mismo motor que el test para que el numero no pueda
    discrepar del que el estudiante ve en su pantalla de resultados."""
    if not vector:
        return None
    puntuadas = ai_system.brain.decision.rank_careers(vector, [career])
    return puntuadas[0]["match_percentage"] if puntuadas else None


def _localize_career(career: Dict[str, Any], lang: str) -> Dict[str, Any]:
    """Misma idea que _localize_question, para una carrera.

    `category` viaja traducida porque es lo que se pinta en la tarjeta, pero
    se conserva el valor ingles en `category_key`: ai_engine empareja los
    hubs globales por esa cadena y traducirla dejaria a media aplicacion sin
    ciudades recomendadas."""
    localized = {
        key: value for key, value in career.items()
        if not key.endswith(tuple(f"_{code}" for code in SUPPORTED_LANGS))
    }
    localized["category_key"] = career["category"]
    for field in ("title", "category", "description"):
        localized[field] = localization.career_field(career, field, lang)
    return localized


def _upgrade_legacy_results(results: Dict[str, Any]) -> Dict[str, Any]:
    """Reconstruye la forma sin redactar de un resultado antiguo.

    Hasta ahora el motor guardaba la prosa ya escrita, en castellano. Esos
    resultados se quedaban en castellano para siempre: con la aplicacion en
    ingles, el arquetipo, el estilo de aprendizaje, la justificacion de cada
    carrera y el roadmap seguian saliendo en el idioma en que se hizo el
    test. Es justo la mezcla que se ve en pantalla.

    Todo lo que hace falta para rehacerlos esta guardado: el vector de
    perfil da el arquetipo, cada carrera guarda su id, sus fortalezas y sus
    brechas, y los hitos van numerados. Asi que en vez de descartar el
    resultado o de pedirle a nadie que repita el test, se recompone la forma
    nueva al leerlo.

    Es una conversion de LECTURA: no se reescribe la base de datos. Un
    resultado ya en formato nuevo sale de aqui intacto.
    """
    if results.get("archetype_key"):
        return results

    vector = results.get("user_vector")
    if not vector:
        # Sin vector no hay forma de recuperar el arquetipo. Se devuelve tal
        # cual: un resultado antiguo en castellano es mejor que uno vacio.
        return results

    results["archetype_key"] = ai_system.brain.reasoning.infer_archetype(vector)
    results.pop("personality", None)
    results.pop("learning_style", None)

    matches = results.get("recommended_careers") or []
    for match in matches:
        if isinstance(match.get("justification"), str):
            match["justification"] = ai_system._build_career_justification(match)

    top_choice = results.get("top_choice")
    if isinstance(top_choice, dict) and isinstance(top_choice.get("justification"), str):
        top_choice["justification"] = matches[0]["justification"] if matches else None

    # El roadmap antiguo guarda el titulo de la carrera y la prosa de cada
    # hito. Los hitos van numerados 1..4 y esa numeracion es justamente la
    # clave de texto, asi que se recuperan por el numero de paso.
    roadmap = results.get("roadmap")
    if roadmap and roadmap.get("checkpoints") and not roadmap["checkpoints"][0].get("key"):
        roadmap.pop("career_title", None)
        roadmap["career_id"] = (
            (results.get("top_choice") or {}).get("career_id")
            or (matches[0].get("career_id") if matches else None)
        )
        brechas = matches[0].get("skill_gaps") if matches else []
        roadmap["checkpoints"] = [
            {
                "step": cp.get("step", i + 1),
                "key": f"roadmap.step{cp.get('step', i + 1)}",
                "reward_xp": cp.get("reward_xp"),
                **({"gaps": brechas} if cp.get("step", i + 1) == 2 else {}),
            }
            for i, cp in enumerate(roadmap["checkpoints"])
        ]
        results["roadmap"] = roadmap

    # Predicciones y acciones: eran dos frases fijas en orden conocido.
    predicciones = results.get("future_predictions") or []
    if predicciones and isinstance(predicciones[0], str):
        career_id = (results.get("top_choice") or {}).get("career_id")
        results["future_predictions"] = [
            {"key": "prediction.growth", "params": {}},
            {"key": "prediction.projects", "params": {}, "career_id": career_id},
        ][:len(predicciones)]

    acciones = results.get("next_actions") or []
    if acciones and isinstance(acciones[0], str):
        results["next_actions"] = [
            {"key": "action.roadmap"}, {"key": "action.hubs"}, {"key": "action.practice"},
        ][:len(acciones)]

    # Los hubs antiguos solo traian la descripcion castellana. Se emparejan
    # por nombre con el catalogo actual, que ya la tiene en los dos idiomas.
    hubs = results.get("recommended_hubs") or []
    if hubs and not hubs[0].get("desc_es"):
        catalogo = {h["name"]: h for h in ai_system.brain.career_engine.GLOBAL_HUBS}
        results["recommended_hubs"] = [catalogo.get(h.get("name"), h) for h in hubs]

    return results


def _refresh_match_details(results: Dict[str, Any]) -> Dict[str, Any]:
    """Recalcula fortalezas y brechas de cada carrera desde el vector guardado.

    Mismo problema que la ruta, otra cara. El motor devolvia como fortaleza
    TODO cluster que llegara al requisito, y para un perfil alto eso son los
    ocho: la pantalla decia "encajas sobre todo en" seguido de la lista
    completa de dimensiones, en las ocho carreras, con lo cual no decia nada.
    Se corrigio a las tres mayores, pero los resultados que ya estaban
    guardados conservan las ocho, porque se calcularon antes.

    Todo lo necesario esta guardado - el vector del estudiante - y los
    requisitos estan en el catalogo, asi que se rehace al leer. La
    justificacion se reconstruye tambien: lleva las fortalezas dentro, y
    arreglar la lista sin arreglar la frase dejaria las dos contradiciendose.
    """
    vector = results.get("user_vector")
    matches = results.get("recommended_careers") or []
    if not vector or not matches:
        return results

    catalogo = {c["id"]: c for c in careers_db}
    for match in matches:
        career = catalogo.get(match.get("career_id"))
        if not career:
            continue
        requisitos = career.get("requirements") or {}
        if not requisitos:
            continue

        sobrantes = sorted(
            ((c, vector[c] - requisitos.get(c, 5.0)) for c in vector
             if vector[c] >= requisitos.get(c, 5.0)),
            key=lambda par: par[1], reverse=True,
        )
        faltantes = sorted(
            ((c, requisitos.get(c, 5.0) - vector[c]) for c in vector
             if requisitos.get(c, 5.0) - vector[c] > 2.0),
            key=lambda par: par[1], reverse=True,
        )
        match["strengths"] = [c for c, _ in sobrantes[:3]]
        match["skill_gaps"] = [c for c, _ in faltantes[:3]]
        match["justification"] = ai_system._build_career_justification(match)

    top = results.get("top_choice")
    if isinstance(top, dict) and matches:
        top["justification"] = matches[0]["justification"]
    return results


def _refresh_roadmap_content(results: Dict[str, Any]) -> Dict[str, Any]:
    """Rehace las sub-tareas del roadmap a partir de la ruta de la carrera.

    Guardar la ruta dentro del resultado fue el error. Es un dato del
    servidor, igual que la prosa, y por el mismo motivo se resuelve al leer:
    quien hizo el test antes de que existieran las 73 rutas tiene los hitos
    guardados SIN sub-tareas, y en pantalla veia un roadmap con los titulos
    puestos y ni una casilla debajo. No es un caso raro - le pasa a todas las
    cuentas anteriores a esa version, que son justo las de los primeros
    usuarios.

    Rehacerlo siempre, y no solo cuando falta, tiene una segunda ventaja:
    corregir una ruta en roadmaps.json arregla el roadmap de todo el mundo sin
    tener que repetir el test.

    El paso de nivelacion es la excepcion, porque no sale de la ruta escrita
    sino del cruce entre el perfil y lo que pide la carrera. Se recalcula con
    el vector guardado; si no lo hay, se respeta lo que hubiera.
    """
    roadmap = results.get("roadmap")
    if not roadmap or not roadmap.get("checkpoints"):
        return results

    career_id = roadmap.get("career_id")
    if not career_id:
        return results

    matches = results.get("recommended_careers") or []
    gaps = next((m.get("skill_gaps") or [] for m in matches
                 if m.get("career_id") == career_id), [])
    vector = results.get("user_vector")
    career = next((c for c in careers_db if c["id"] == career_id), None)

    fresco = ai_system.brain.planner.build_roadmap(career_id, gaps, vector, career)
    por_paso = {cp["step"]: cp for cp in fresco["checkpoints"]}

    for cp in roadmap["checkpoints"]:
        nuevo = por_paso.get(cp.get("step"))
        if not nuevo:
            continue
        contenido = nuevo.get("content")
        # El de nivelacion solo se pisa si se pudo recalcular: sin vector
        # guardado, lo que ya hubiera es mejor que nada.
        if contenido or cp.get("step") != 2:
            cp["content"] = contenido
    return results


def _localize_results(results: Dict[str, Any], lang: str) -> Dict[str, Any]:
    """Redacta un resultado de test en el idioma pedido.

    Se hace al devolver, no al calcular. El resultado se guarda en bruto
    (`results_json`: claves de texto, ids de carrera y clusters en
    mayusculas) y hay que poder releerlo en el idioma que el estudiante
    tenga puesto HOY, no en el que tenia el dia que hizo el test.

    Los resultados guardados por versiones anteriores traian la prosa ya
    redactada en castellano. _upgrade_legacy_results los reconstruye antes
    de entrar aqui, para que tambien se puedan leer en ingles."""
    if not results:
        return results

    # Copia profunda antes de tocar nada. La funcion reescribe campos dentro
    # de las listas anidadas (las carreras, los hitos), y un dict(results) de
    # primer nivel las comparte con el original. Sin esto, leer el mismo
    # resultado dos veces seguidas en idiomas distintos traduce la segunda
    # vez sobre lo ya traducido en la primera, y salen las dos lenguas
    # mezcladas en la misma frase.
    results = copy.deepcopy(results)
    results = _upgrade_legacy_results(results)
    results = _refresh_match_details(results)
    results = _refresh_roadmap_content(results)

    lang = _resolve_lang(lang)
    catalog = {career["id"]: career for career in careers_db}

    def career_title(career_id: Optional[str]) -> str:
        career = catalog.get(career_id or "")
        return localization.career_field(career, "title", lang) if career else ""

    archetype = localization.archetype(results.get("archetype_key"), lang)

    def redactar(spec: Optional[Dict[str, Any]], fallback: str = "") -> str:
        """Convierte un {key, params, career_id, gaps, strengths} en prosa."""
        if not isinstance(spec, dict) or "key" not in spec:
            return fallback
        # El arquetipo aparece en varias plantillas y siempre es el mismo,
        # asi que se pasa de oficio en vez de repetirlo en cada spec.
        params = {"personality": archetype["name"], **(spec.get("params") or {})}
        if "career_id" in spec:
            params["career"] = (
                career_title(spec["career_id"])
                or localization.text("reasoning.noCareer", lang)
            )
        if "gaps" in spec:
            gaps = localization.cluster_labels(spec["gaps"], lang)
            params["gaps"] = localization.join(gaps, lang) or localization.text(
                "reasoning.noGaps", lang
            )
        if "strengths" in spec:
            strengths = localization.cluster_labels(spec["strengths"], lang)
            params["strengths"] = localization.join(strengths, lang) or localization.text(
                "justification.noStrengths", lang
            )
        return localization.text(spec["key"], lang, **params)

    if results.get("archetype_key"):
        results["personality"] = archetype["name"]
        results["learning_style"] = archetype["style"]

    # Los clusters se guardan como identificadores (ANALYTICAL); en pantalla
    # tienen que leerse como texto.
    for field in ("strengths", "weaknesses"):
        if results.get(field):
            results[field] = localization.cluster_labels(results[field], lang)

    for field in ("future_predictions", "next_actions"):
        entries = results.get(field)
        if entries and isinstance(entries[0], dict):
            results[field] = [redactar(entry) for entry in entries]

    if results.get("recommended_hubs"):
        results["recommended_hubs"] = [
            {**hub, "desc": localization.hub_desc(hub, lang)}
            for hub in results["recommended_hubs"]
        ]

    roadmap = results.get("roadmap")
    if roadmap and roadmap.get("checkpoints"):
        titulo = career_title(roadmap.get("career_id"))
        roadmap = dict(roadmap)
        roadmap["career_title"] = titulo
        roadmap["checkpoints"] = [
            {**cp,
             **localization.checkpoint_text(cp, lang, titulo),
             # Las sub-tareas viajan con los dos idiomas y, en el paso de
             # nivelacion, con el cluster en mayusculas. Sin esto el cliente
             # recibiria ambas versiones y un identificador en crudo.
             "content": localization.checkpoint_content(cp.get("content"), lang, titulo)}
            if cp.get("key") else cp
            for cp in roadmap["checkpoints"]
        ]
        results["roadmap"] = roadmap

    for match in results.get("recommended_careers") or []:
        career = catalog.get(match.get("career_id") or "")
        if career:
            for field in ("title", "category", "description"):
                match[field] = localization.career_field(career, field, lang)
        for field in ("strengths", "skill_gaps"):
            if match.get(field) and isinstance(match[field][0], str):
                match[field] = localization.cluster_labels(match[field], lang)
        match["justification"] = redactar(
            match.get("justification"), fallback=match.get("justification") or ""
        )

    top_choice = results.get("top_choice")
    if isinstance(top_choice, dict):
        top_choice = dict(top_choice)
        career = catalog.get(top_choice.get("career_id") or "")
        if career:
            for field in ("title", "category", "description"):
                top_choice[field] = localization.career_field(career, field, lang)
        top_choice["justification"] = redactar(
            top_choice.get("justification"), fallback=top_choice.get("justification") or ""
        )
        results["top_choice"] = top_choice

    return results


# HEAD ademas de GET. `@app.get` en FastAPI registra GET a secas, y buena
# parte de los monitores de disponibilidad y de los balanceadores sondean con
# HEAD porque no necesitan el cuerpo: recibian 405 y daban el servicio por
# caido estando perfectamente vivo. El cuerpo lo descarta el propio protocolo,
# asi que la misma funcion sirve para las dos.
@app.get("/healthz", status_code=status.HTTP_200_OK)
@app.head("/healthz", status_code=status.HTTP_200_OK, include_in_schema=False)
def liveness_probe():
    """Sonda para el balanceador / orquestador. Deliberadamente publica y
    deliberadamente muda: solo dice que el proceso responde y sabe hablar
    con su base de datos. Todo el detalle real (que chequeo falla y por
    que) vive en /api/v1/admin/health, que exige sesion de admin - una
    sonda no autenticada no tiene por que revelar el estado interno."""
    try:
        users_store.count_users()
    except Exception:  # noqa: BLE001 - la sonda no debe filtrar el motivo
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="unavailable"
        )
    return {"status": "ok"}


@app.get("/api/v1/questions", status_code=status.HTTP_200_OK)
def get_all_questions(lang: str = "en"):
    """Banco completo de preguntas, ya resuelto al idioma pedido.

    questions.json guarda cada texto en ingles (`question`, `text`) y su
    traduccion al lado (`question_es`, `text_es`), en el MISMO registro:
    los metadatos de puntuacion (cluster, points) son identicos en los dos
    idiomas y tenerlos una sola vez es lo que impide que diverjan. Partir
    el banco en un archivo por idioma habria duplicado esa parte.

    El cliente recibe la forma de siempre - `question` y `text` como
    cadenas - sin tener que saber que existen sufijos por idioma."""
    localized = [_localize_question(question, lang) for question in questions_db]
    return {
        "success": True,
        "total": len(localized),
        "lang": _resolve_lang(lang),
        "questions": localized,
    }


@app.get("/api/v1/careers", status_code=status.HTTP_200_OK)
def get_all_careers(lang: Optional[str] = None):
    """Obtiene el catálogo completo de carreras (fuente única de verdad)."""
    return {
        "success": True,
        "total": len(careers_db),
        "lang": _resolve_lang(lang),
        "careers": [_localize_career(career, lang) for career in careers_db],
    }


@app.post("/api/v1/assess", status_code=status.HTTP_200_OK)
def process_test_assessment(
    payload: TestSubmissionRequest,
    lang: Optional[str] = None,
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
            # Se guarda en bruto y se traduce al salir: asi el mismo
            # resultado se puede releer manana en el otro idioma.
            "data": _localize_results(results, lang),
            "lang": _resolve_lang(lang),
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


class CheckpointRequest(BaseModel):
    item_id: str = Field(..., min_length=1, max_length=120,
                         description="id de la sub-tarea, ej. c1:foundations:0")
    done: bool = Field(True, description="true para marcarla, false para desmarcarla")


@app.get("/api/v1/careers/{career_id}/roadmap", status_code=status.HTTP_200_OK)
def get_career_roadmap(
    career_id: str,
    lang: Optional[str] = None,
    current_user: dict = Depends(get_current_user_required),
):
    """La ruta de CUALQUIER carrera, no solo la que salio en el test.

    El roadmap vivia encerrado en el resultado del test, asi que el estudiante
    solo podia ver la ruta de la carrera que el test eligio por el. Eso es al
    reves de para que sirve la aplicacion: se entra aqui a decidir, y para
    decidir hay que poder mirar lo que implica cada opcion antes de
    comprometerse con ninguna.

    El paso de nivelacion sale del perfil de quien pregunta cruzado con lo que
    pide ESTA carrera, asi que cambia segun quien mire - que es justo lo que
    lo hace util para comparar dos carreras.
    """
    career = next((c for c in careers_db if c.get("id") == career_id), None)
    if career is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No existe la carrera {career_id}.")

    vector, gaps, propia = {}, [], False
    latest = users_store.latest_result_for_user(current_user["id"])
    if latest is not None:
        resultado = json.loads(latest["results_json"])
        vector = resultado.get("user_vector") or {}
        propia = (resultado.get("roadmap") or {}).get("career_id") == career_id
        gaps = next((m.get("skill_gaps") or []
                     for m in (resultado.get("recommended_careers") or [])
                     if m.get("career_id") == career_id), [])
        if not gaps:
            # Una carrera fuera del top: las brechas se calculan al vuelo
            # contra sus requisitos, o el hito de nivelacion saldria vacio.
            requisitos = career.get("requirements") or {}
            gaps = [c for c, pide in requisitos.items() if vector.get(c, 0) < pide]

    roadmap = ai_system.brain.planner.build_roadmap(career_id, gaps, vector, career)
    titulo = localization.career_field(career, "title", lang)
    roadmap["career_title"] = titulo
    roadmap["checkpoints"] = [
        {**cp,
         **localization.checkpoint_text(cp, lang, titulo),
         "content": localization.checkpoint_content(cp.get("content"), lang, titulo)}
        for cp in roadmap["checkpoints"]
    ]

    return {
        "success": True,
        "roadmap": roadmap,
        # Para que la pagina pueda avisar de que esto no es tu ruta.
        "is_own": propia,
        "completed_checkpoints": ai_system.completed_checkpoints(str(current_user["id"])),
    }


@app.get("/api/v1/careers/{career_id}/fit", status_code=status.HTTP_200_OK)
def get_career_fit(
    career_id: str,
    lang: Optional[str] = None,
    current_user: dict = Depends(get_current_user_required),
):
    """Por que esta carrera encaja contigo, dimension a dimension.

    El motor ya sabia puntuar el perfil y comparar contra lo que pide cada
    carrera; lo que faltaba era decirlo. El estudiante veia un porcentaje sin
    saber de donde salia ni que hacer si no le gustaba.

    Devuelve dos listas: en que dimensiones llegas o sobras, y en cuales te
    quedas corto. Cada una con lo que tienes, lo que pide la carrera, y que
    es esa dimension - y para las que faltan, como se sube y con que."""
    career = next((c for c in careers_db if c.get("id") == career_id), None)
    if career is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No existe la carrera {career_id}.")

    latest = users_store.latest_result_for_user(current_user["id"])
    if latest is None:
        # Sin test no hay perfil contra el que comparar. Es una respuesta
        # valida, no un error: la pantalla la usa para invitar a hacerlo.
        return {"success": True, "career_id": career_id, "has_profile": False,
                "matched": [], "gaps": []}

    resultado = json.loads(latest["results_json"])
    vector = resultado.get("user_vector") or {}
    requisitos = career.get("requirements") or {}
    lang = _resolve_lang(lang)

    def describir(cluster: str, tiene: float, pide: float, con_ayuda: bool) -> Dict[str, Any]:
        info = skills_db.get(cluster) or {}
        suffix = "" if lang == "en" else f"_{lang}"

        def campo(nombre):
            return info.get(f"{nombre}{suffix}") or info.get(nombre, "")

        def lista(nombre):
            return [
                item.get(f"text{suffix}") or item.get("text", "")
                for item in (info.get(nombre) or [])
            ]

        salida = {
            "cluster": cluster,
            "label": localization.cluster_label(cluster, lang),
            "score": round(tiene, 1),
            "needed": round(pide, 1),
            "what": campo("what"),
            "why": campo("why"),
        }
        # Las estrategias y las herramientas solo donde hacen falta. En una
        # dimension que ya cubres, decirle como mejorarla es ruido.
        if con_ayuda:
            salida["strategies"] = lista("strategies")
            salida["tools"] = lista("tools")
        return salida

    matched, gaps = [], []
    for cluster, pide in requisitos.items():
        tiene = vector.get(cluster)
        if tiene is None:
            continue
        if tiene >= pide:
            matched.append(describir(cluster, tiene, pide, con_ayuda=False))
        elif pide - tiene >= GAP_THRESHOLD:
            gaps.append(describir(cluster, tiene, pide, con_ayuda=True))

    # Lo mas relevante primero: donde mas sobras y donde mas falta.
    matched.sort(key=lambda e: e["score"] - e["needed"], reverse=True)
    gaps.sort(key=lambda e: e["score"] - e["needed"])

    return {
        "success": True,
        "career_id": career_id,
        "career": _localize_career(career, lang),
        "has_profile": True,
        "match_percentage": _career_match_percentage(vector, career),
        "matched": matched,
        "gaps": gaps,
        "lang": lang,
    }


@app.post("/api/v1/me/roadmap/checkpoint", status_code=status.HTTP_200_OK)
def toggle_roadmap_checkpoint(
    payload: CheckpointRequest,
    current_user: dict = Depends(get_current_user_required),
):
    """Marca una sub-tarea del roadmap como hecha, o la desmarca.

    El progreso vive en la CUENTA, no en el navegador: quien marca un paso
    desde el movil tiene que verlo marcado al abrir el portatil. Ese es todo
    el motivo por el que esto es un endpoint y no localStorage."""
    completados = ai_system.toggle_checkpoint(
        str(current_user["id"]), payload.item_id, payload.done
    )
    return {"success": True, "completed": completados}


@app.post("/api/v1/mentor/chat", status_code=status.HTTP_200_OK)
def chat_with_mentor(
    payload: MentorChatRequest,
    lang: Optional[str] = None,
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
    passport_profile, passport_goals = {}, {}
    if current_user:
        passport_profile = users_store.get_passport_profile(current_user["id"])
        passport_goals = passport_profile.get("goals") or {}
    # El recorrido va en el contexto para que el mentor pueda responder
    # "como voy" con el mismo numero que pinta el plan de vuelo, en vez de
    # con uno propio que podria discrepar.
    journey_context = None
    if current_user:
        progreso = users_store.passport_progress(current_user["id"])
        pasos = _build_journey(passport_profile, progreso)
        pendiente = next((paso for paso in pasos if not paso["complete"]), None)
        journey_context = {
            "percent": round(100 * sum(1 for p in pasos if p["complete"]) / len(pasos)) if pasos else 0,
            "next_step": pendiente["key"] if pendiente else None,
        }

    context = {
        **(payload.user_context or {}),
        "user_id": user_id,
        "name": current_user.get("name") if current_user else None,
        "passport_goals": passport_goals,
        "journey": journey_context,
    }

    try:
        response_text = ai_system.mentor.chat(
            user_message=payload.message,
            context=context,
            lang=lang,
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
def check_production_config() -> List[str]:
    """Revisa la configuracion y devuelve los problemas encontrados.

    Se ejecuta al arrancar y solo IMPRIME: no aborta. Un despliegue que se
    niega a levantar por una advertencia de configuracion es peor que uno
    que arranca avisando a gritos - sobre todo cuando el fallo aparece a
    las 3 de la mañana en un reinicio automatico.

    Devuelve la lista para poder probarla sin capturar stdout.
    """
    problems: List[str] = []

    if not WEB_BUILD_AVAILABLE:
        problems.append(
            "No existe web/dist: el sitio entero devolvera 503. "
            "Corre 'npm --prefix web run build' antes de arrancar."
        )

    if not IS_PRODUCTION:
        return problems

    if not ADMIN_EMAIL:
        problems.append("ADMIN_EMAIL vacio: nadie podra entrar a /admin.")
    elif not admin_seat_is_claimed():
        problems.append(
            f"La cuenta admin ({ADMIN_EMAIL}) todavia no existe. Reclamala en "
            "/login con el token que aparece arriba, como primer paso del "
            "despliegue."
        )

    if not mailer.is_configured():
        problems.append(
            "SMTP sin configurar: la recuperacion de contraseña no funcionara. "
            "En produccion el link NO se imprime en consola a proposito."
        )

    # En muchos PaaS el disco del contenedor es efimero: la base dentro del
    # repo se pierde en cada despliegue, y con ella todas las cuentas.
    try:
        db_inside_repo = Path(USERS_DB_PATH).resolve().is_relative_to(REPO_ROOT)
    except (OSError, ValueError):
        db_inside_repo = False
    if db_inside_repo:
        problems.append(
            f"La base de usuarios vive dentro del repo ({USERS_DB_PATH}). "
            "Apunta USERS_DB_PATH a un disco persistente."
        )

    insecure_origins = [o for o in CORS_ORIGINS if "localhost" in o or "127.0.0.1" in o]
    if insecure_origins:
        problems.append(f"CORS_ORIGINS incluye origenes de desarrollo: {', '.join(insecure_origins)}")

    return problems


def report_admin_setup_token() -> None:
    """Imprime el token de reclamacion mientras la cuenta admin este libre.

    La consola del servidor es el canal fuera de banda: quien despliega la
    esta mirando, y un atacante remoto no. Por eso el token va aqui y no en
    ninguna respuesta HTTP.
    """
    token = admin_setup_token()
    if not token:
        return
    borde = "=" * 68
    print(f"\n{borde}")
    print("  RECLAMA LA CUENTA DE ADMINISTRADOR")
    print(f"  Registra {ADMIN_EMAIL} en /login usando este token:")
    print(f"\n      {token}\n")
    print("  Hasta entonces, ese email no se puede registrar sin el.")
    print(f"{borde}\n")


def report_production_config() -> None:
    report_admin_setup_token()

    problems = check_production_config()
    if not problems:
        print(f"[FuturePilot] Configuracion OK (entorno: {ENVIRONMENT}).")
        return
    print(f"[FuturePilot] {len(problems)} problema(s) de configuracion (entorno: {ENVIRONMENT}):")
    for problem in problems:
        print(f"  - {problem}")


report_production_config()


# --------------------------------------------------------------------------
# El barrido de permisos de acudiente, dentro de este mismo proceso.
#
# Deberia ser un cron - y en la documentacion del modulo sigue estando la
# linea de crontab para quien despliegue donde eso sea posible. En Render no
# lo es: sus cron jobs corren en un contenedor aparte y no pueden montar el
# disco persistente, asi que no verian la base de datos.
#
# Por eso vive aqui, y por eso esta APAGADO por defecto. Que borrar exija
# escribir --borrar fue una decision deliberada: borrar es irreversible y se
# lleva la cuenta de una persona real. Una variable de entorno es la forma de
# tomar esa misma decision una sola vez, a conciencia, al desplegar - no un
# comportamiento que aparece solo porque si.
# --------------------------------------------------------------------------
CONSENT_SWEEP_ENABLED = (
    os.environ.get("CONSENT_SWEEP_ENABLED") or "").strip().lower() in (
        "1", "true", "yes", "si", "sí", "on")
CONSENT_SWEEP_INTERVAL_HOURS = float(
    os.environ.get("CONSENT_SWEEP_INTERVAL_HOURS") or "24")


def run_consent_sweep() -> int:
    """Una pasada del barrido. Devuelve cuantas cuentas borro.

    Grita lo que hace, siempre. Un borrado automatico silencioso es la peor
    version de esto: cuando alguien pregunte por que desaparecio una cuenta,
    el log tiene que poder responder.
    """
    from backend import consent_expiry

    borradas = consent_expiry.borrar()
    if not borradas:
        print("[consent] Barrido: nada que borrar.")
        return 0

    print(f"[consent] Barrido: {len(borradas)} cuenta(s) de menor borradas "
          "por falta de autorizacion del acudiente.")
    for expediente in borradas:
        print(f"  - cuenta {expediente['user_id']} ({expediente['student_email']}), "
              f"acudiente {expediente['guardian_email']}, estado {expediente['status']}")
    return len(borradas)


def _consent_sweep_loop() -> None:
    while True:
        try:
            run_consent_sweep()
        except Exception as error:  # noqa: BLE001
            # Un fallo no puede matar el hilo: si muere, el barrido deja de
            # correr en silencio y volvemos justo al problema que esto venia
            # a resolver. Se avisa y se reintenta en la siguiente vuelta.
            print(f"[consent] ERROR en el barrido: {error}")
        time.sleep(CONSENT_SWEEP_INTERVAL_HOURS * 3600)


def start_consent_sweep() -> bool:
    """Arranca el hilo si esta activado. Devuelve si lo arranco."""
    if not CONSENT_SWEEP_ENABLED:
        print("[consent] Barrido automatico APAGADO. El plazo de 30 dias y las "
              "negativas de los acudientes no se ejecutan solos: corre "
              "'python -m backend.consent_expiry --borrar' a mano, o pon "
              "CONSENT_SWEEP_ENABLED=1. El panel de salud avisa si se acumulan.")
        return False

    # Daemon: no puede impedir que el servidor se apague. Y ojo con
    # --workers > 1, que arrancaria un barrido por worker; hoy no es un
    # problema porque se despliega con un solo proceso.
    hilo = threading.Thread(target=_consent_sweep_loop, name="consent-sweep", daemon=True)
    hilo.start()
    print(f"[consent] Barrido automatico activo, cada "
          f"{CONSENT_SWEEP_INTERVAL_HOURS:g} h.")
    return True


start_consent_sweep()


# --------------------------------------------------------------------------
# Ejecucion directa - SOLO desarrollo.
#
# En produccion se arranca con un gestor de procesos, no con este bloque:
#
#   python -m uvicorn --app-dir futurepilot-IA app:app --host 0.0.0.0 --port 8000
#
# Ojo con --workers > 1: el rate limiter guarda su estado en memoria del
# proceso (ver backend/rate_limiter.py), asi que cada worker llevaria su
# propia cuenta y el limite efectivo se multiplicaria por el numero de
# workers. Con varios workers hace falta mover el limitador a Redis.
# --------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
