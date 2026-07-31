"""
===============================================================================
FUTUREPILOT API SERVER (FASTAPI)
===============================================================================
Servidor web principal para la carpeta futurepilot_ia.
Expone los endpoints HTTP necesarios para comunicar el frontend web (HTML/JS)
con el motor de Inteligencia Artificial (ai_engine.py).
===============================================================================
"""

import os
import json
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional

# Importar el motor principal de la IA
from ai_engine import FuturePilotAIEcosystem

# Inicializacion de FastAPI
app = FastAPI(
    title="FuturePilot AI API",
    description="Servidor de Inteligencia Artificial para Orientación Vocacional y Educativa",
    version="1.0.0"
)

# Configuracion de CORS (permite solicitudes desde el frontend web)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar archivos de datos de la carpeta data/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def load_json_file(relative_path: str) -> List[Dict[str, Any]]:
    """Carga de manera segura un archivo JSON desde la ruta relativa dada."""
    file_path = os.path.join(BASE_DIR, relative_path)
    if not os.path.exists(file_path):
        print(f"Advertencia: No se encontro el archivo en {file_path}")
        return []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error cargando {file_path}: {e}")
        return []


# Carga de bases de datos locales
careers_db = load_json_file("data/careers.json")
questions_db = load_json_file("data/questions.json")

# Inicializar el motor unificado de IA
ai_system = FuturePilotAIEcosystem(
    careers_data=careers_db,
    questions_data=questions_db
)


# =============================================================================
# MODELOS DE DATOS (PYDANTIC SCHEMAS)
# =============================================================================
class UserAnswerItem(BaseModel):
    question_index: int = Field(..., description="Indice de la pregunta respondida")
    answer_index: int = Field(..., description="Indice de la opcion seleccionada por el estudiante")


class TestSubmissionRequest(BaseModel):
    answers: List[UserAnswerItem] = Field(..., description="Lista de respuestas seleccionadas en el test")


class MentorChatRequest(BaseModel):
    message: str = Field(..., description="Mensaje enviado por el usuario al AI Mentor")
    user_context: Optional[Dict[str, Any]] = Field(default=None, description="Contexto del perfil del estudiante")


# =============================================================================
# ENDPOINTS DE LA API
# =============================================================================
@app.get("/", status_code=status.HTTP_200_OK)
def get_system_status():
    """Endpoint de comprobacion de estado de la API."""
    return {
        "system": "FuturePilot AI Engine",
        "status": "Online",
        "questions_loaded": len(questions_db),
        "careers_loaded": len(careers_db)
    }


@app.get("/api/v1/questions", status_code=status.HTTP_200_OK)
def get_all_questions():
    """Obtiene el banco completo de preguntas para el frontend."""
    return {
        "success": True,
        "total": len(questions_db),
        "questions": questions_db
    }


@app.post("/api/v1/assess", status_code=status.HTTP_200_OK)
def process_test_assessment(payload: TestSubmissionRequest):
    """
    Procesa las respuestas entregadas por el estudiante, calcula su vector de
    habilidades por clusters, evalua las carreras compatibles y genera el roadmap.
    """
    if not payload.answers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe proporcionar al menos una respuesta para procesar la evaluacion."
        )

    try:
        formatted_answers = [answer.model_dump() for answer in payload.answers]
        results = ai_system.process_user_test(formatted_answers)
        return {
            "success": True,
            "data": results
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error procesando el test de orientacion: {str(e)}"
        )


@app.post("/api/v1/mentor/chat", status_code=status.HTTP_200_OK)
def chat_with_mentor(payload: MentorChatRequest):
    """
    Permite chatear con el AI Mentor Educativo dinamico impulsado por la API de Gemini.
    """
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El mensaje del usuario no puede estar vacio."
        )

    try:
        response_text = ai_system.mentor.chat(
            user_message=payload.message,
            context=payload.user_context
        )
        return {
            "success": True,
            "response": response_text
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al comunicar con el AI Mentor: {str(e)}"
        )


# =============================================================================
# EJECUCION DIRECTA CON UVICORN
# =============================================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)