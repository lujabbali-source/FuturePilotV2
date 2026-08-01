"""
===============================================================================
FUTUREPILOT API SERVER (FASTAPI) - Backend unificado
===============================================================================
Punto de entrada único del backend de FuturePilot. Absorbe lo que antes
eran dos servidores FastAPI separados (backend/main.py y este archivo):

  - Sirve Frontend/ como sitio estático (HTML/CSS/JS vanilla).
  - Expone la API de evaluación vocacional respaldada por el motor de IA
    rule-based (ai_engine.py): preguntas, carreras, assess, mentor chat.
  - Expone el catálogo de universidades WHED (backend/whed_catalog.py).
  - Expone autenticación real (backend/users_store.py): registro/login con
    contraseñas hasheadas (PBKDF2-SHA256, stdlib) y sesiones por token
    bearer (Authorization header, no cookies).

backend/ dejó de correr su propio servidor: main.py se retiró porque su
funcionalidad (estáticos, páginas HTML, catálogo) quedó absorbida aquí.
La carpeta backend/ se conserva como librería de datos (whed_catalog.py,
import_whed.py, data/).
===============================================================================
"""

import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import Depends, FastAPI, Header, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

# --------------------------------------------------------------------------
# Resolución de rutas e imports entre paquetes hermanos
# --------------------------------------------------------------------------
# "futurepilot-IA" tiene un guion en el nombre y no puede importarse como
# paquete Python normal (import futurepilot-IA fallaría). Por eso se agregan
# explícitamente al sys.path tanto la raíz del repo (para poder hacer
# `from backend.whed_catalog import WhedCatalog`) como esta misma carpeta
# (para `import ai_engine`), sin importar desde qué cwd se lance uvicorn.
BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent
for _path in (REPO_ROOT, BASE_DIR):
    if str(_path) not in sys.path:
        sys.path.insert(0, str(_path))

from ai_engine import FuturePilotAIEcosystem  # noqa: E402
from backend.users_store import (  # noqa: E402
    DuplicateEmailError,
    InvalidCredentialsError,
    UsersStore,
)
from backend.whed_catalog import WhedCatalog  # noqa: E402

FRONTEND_DIR = REPO_ROOT / "Frontend"

app = FastAPI(
    title="FuturePilot API",
    description="Backend unificado: evaluación vocacional (IA rule-based) + catálogo de universidades WHED",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


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

whed_catalog = WhedCatalog(REPO_ROOT / "backend" / "data" / "whed.sqlite3")
users_store = UsersStore(REPO_ROOT / "backend" / "data" / "users.sqlite3")


# --------------------------------------------------------------------------
# Estáticos y páginas HTML (antes en backend/main.py)
# --------------------------------------------------------------------------
app.mount("/Frontend", StaticFiles(directory=str(FRONTEND_DIR)), name="static")


@app.get("/style.css")
def style_css():
    return FileResponse(str(FRONTEND_DIR / "style.css"))


@app.get("/futurepilot-logo.png")
def logo():
    return FileResponse(str(FRONTEND_DIR / "futurepilot-logo.png"))


@app.get("/")
def home():
    return FileResponse(str(FRONTEND_DIR / "index.html"))


@app.get("/assessment")
def assessment_page():
    return FileResponse(str(FRONTEND_DIR / "assessment.html"))


@app.get("/careers")
def careers_page():
    return FileResponse(str(FRONTEND_DIR / "careers.html"))


@app.get("/roadmap")
def roadmap_page():
    return FileResponse(str(FRONTEND_DIR / "roadmap.html"))


@app.get("/journey")
def journey_page():
    return FileResponse(str(FRONTEND_DIR / "journey.html"))


@app.get("/flightplan")
def flightplan_page():
    return FileResponse(str(FRONTEND_DIR / "flightplan.html"))


# --------------------------------------------------------------------------
# Catálogo WHED (antes en backend/main.py)
# --------------------------------------------------------------------------
@app.get("/api/catalog/metadata")
def catalog_metadata():
    return whed_catalog.metadata()


@app.get("/api/universities")
def list_universities(
    country: str | None = None,
    city: str | None = None,
    search: str | None = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    return whed_catalog.search(
        country=country,
        city=city,
        search=search,
        limit=limit,
        offset=offset,
    )


@app.get("/api/universities/{whed_id}")
def get_university(whed_id: str):
    university = whed_catalog.get(whed_id)
    if university is None:
        raise HTTPException(status_code=404, detail="WHED institution not found")
    return university


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


@app.post("/api/v1/auth/register", status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest):
    try:
        user = users_store.register(payload.email, payload.password, payload.name)
    except DuplicateEmailError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe una cuenta registrada con ese email.",
        )
    token = users_store.create_session(user["id"])
    return {"success": True, "token": token, "user": user}


@app.post("/api/v1/auth/login", status_code=status.HTTP_200_OK)
def login(payload: LoginRequest):
    try:
        user = users_store.verify_login(payload.email, payload.password)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contrasena invalidos.",
        )
    token = users_store.create_session(user["id"])
    return {"success": True, "token": token, "user": user}


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
# Modelos de datos - Evaluación vocacional
# --------------------------------------------------------------------------
class UserAnswerItem(BaseModel):
    question_index: int = Field(..., description="Indice de la pregunta respondida")
    answer_index: int = Field(..., description="Indice de la opcion seleccionada por el estudiante")


class TestSubmissionRequest(BaseModel):
    answers: List[UserAnswerItem] = Field(..., description="Lista de respuestas seleccionadas en el test")


class MentorChatRequest(BaseModel):
    message: str = Field(..., description="Mensaje enviado por el usuario al AI Mentor")
    user_context: Optional[Dict[str, Any]] = Field(
        default=None,
        description=(
            "Contexto adicional opcional. El user_id real para recuperar la "
            "memoria del estudiante se resuelve siempre del token de sesion "
            "(Authorization: Bearer), nunca de este campo - un user_id aqui "
            "es ignorado a efectos de identidad."
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

    user_id = str(current_user["id"]) if current_user else "default_student"

    try:
        formatted_answers = [answer.model_dump() for answer in payload.answers]
        results = ai_system.process_user_test(formatted_answers, user_id=user_id)
        return {
            "success": True,
            "data": results,
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

    # El user_id de identidad siempre viene del token validado en servidor,
    # nunca del payload del cliente - ver MentorChatRequest.user_context.
    user_id = str(current_user["id"]) if current_user else "default_student"
    context = {**(payload.user_context or {}), "user_id": user_id}

    try:
        response_text = ai_system.mentor.chat(
            user_message=payload.message,
            context=context,
        )
        return {
            "success": True,
            "response": response_text,
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
