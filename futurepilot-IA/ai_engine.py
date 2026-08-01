"""
===============================================================================
FUTUREPILOT AI - BRAIN ORCHESTRATOR
===============================================================================
Cerebro central modular y coordinador para la plataforma FuturePilot AI.
Implementa un ciclo cognitivo completo basado en patrones SOLID y arquitectura
orientada a agentes autónomos.

Estructura del Ciclo Cognitivo:
  Perceive -> Update Memory -> Analyze & Hypothesize -> Evaluate Confidence ->
  Decide -> Plan -> Build Response -> Learn

Módulos coordinados:
  - PerceptionEngine: Procesamiento e ingesta de entradas del usuario.
  - ProfileEngine: Cálculo vectorial y taxonomía de clusters.
  - StudentMemorySystem: Persistencia de memoria activa e histórica.
  - ReasoningEngine: Deducción lógica y generación de hipótesis.
  - DecisionEngine: Algoritmos de coincidencia vectorial (Similitud Cosenoidal).
  - RoadmapPlanner: Planeación de rutas educativas adaptativas (GPS).
  - LearningEngine: Métricas de evolución y predicción de crecimiento.
  - CareerEngine: Mapeo de hubs globales y requerimientos del mercado.
  - ResponseBuilder: Ensamblador unificado del estado cognitivo de salida.
===============================================================================
"""

import os
import json
import math
from datetime import datetime
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple

DEFAULT_MEMORY_DIR = str(Path(__file__).resolve().parent / "data" / "users")


# =============================================================================
# ESTADOS INTERNOS Y ESTRUCTURAS DE DATOS COGNITIVAS
# =============================================================================

@dataclass
class SimulatedEmotions:
    """
    Estados internos simulados utilizados exclusivamente como pesos
    cuantitativos para priorizar decisiones algorítmicas.
    """
    curiosity: float = 0.5      # Prioriza exploración de nuevas categorías
    uncertainty: float = 0.5    # Determina si se solicitan más datos
    confidence: float = 0.5     # Define la firmeza de las recomendaciones


@dataclass
class BrainState:
    """
    Representa el estado interno actual del cerebro en un instante dado.
    """
    user_id: str
    current_goal: str = "Vocational Discovery"
    context: Dict[str, Any] = field(default_factory=dict)
    active_memory: Dict[str, Any] = field(default_factory=dict)
    confidence_level: float = 0.0
    hypotheses: List[str] = field(default_factory=list)
    next_action: str = "Awaiting Input"
    internal_emotions: SimulatedEmotions = field(default_factory=SimulatedEmotions)


@dataclass
class BrainResponse:
    """
    Contenedor estándar unificado devuelto por el Brain Orchestrator.
    """
    top_career: Optional[Dict[str, Any]]
    top_matches: List[Dict[str, Any]]
    roadmap: Optional[Dict[str, Any]]
    reasoning: str
    confidence: float
    strengths: List[str]
    weaknesses: List[str]
    recommended_hubs: List[Dict[str, Any]]
    learning_style: str
    personality: str
    memory_updates: Dict[str, Any]
    next_actions: List[str]
    future_predictions: List[str]

    def to_dict(self) -> Dict[str, Any]:
        """Convierte la respuesta cognitiva a un diccionario explícito."""
        return asdict(self)


# =============================================================================
# MÓDULOS DE COMPONENTE INDEPENDIENTES
# =============================================================================

class StudentMemorySystem:
    """
    Módulo de Memoria Persistente de Corto y Largo Plazo.
    """
    def __init__(self, storage_dir: str = None):
        # Ruta absoluta por defecto: antes era relativa ("data/users") y
        # dependia silenciosamente del cwd del proceso que lanzaba uvicorn,
        # lo que podia escribir la memoria del estudiante en una carpeta
        # distinta a la esperada segun desde donde se arrancara el server.
        self.storage_dir = storage_dir or DEFAULT_MEMORY_DIR
        if not os.path.exists(self.storage_dir):
            os.makedirs(self.storage_dir, exist_ok=True)

    def _get_path(self, user_id: str) -> str:
        return os.path.join(self.storage_dir, f"{user_id}_memory.json")

    def load_memory(self, user_id: str) -> Dict[str, Any]:
        path = self._get_path(user_id)
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return {
            "user_id": user_id,
            "created_at": datetime.now().isoformat(),
            "assessments_count": 0,
            "assessment_history": [],
            "explored_careers": [],
            "completed_checkpoints": [],
            "hypotheses_log": []
        }

    def save_memory(self, user_id: str, memory_data: Dict[str, Any]) -> None:
        path = self._get_path(user_id)
        try:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(memory_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[MemorySystem Error] No se pudo guardar la memoria: {e}")


class PerceptionEngine:
    """
    Módulo de Percepción: Procesa e ingiere entradas crudas del usuario.
    """
    def parse_test_inputs(
        self,
        raw_answers: List[Dict[str, Any]],
        questions_db: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        processed_responses = []
        for item in raw_answers:
            q_idx = item.get("question_index")
            a_idx = item.get("answer_index")
            if q_idx is not None and 0 <= q_idx < len(questions_db):
                q_data = questions_db[q_idx]
                answers = q_data.get("answers", [])
                if 0 <= a_idx < len(answers):
                    ans = answers[a_idx]
                    processed_responses.append({
                        "cluster": ans.get("cluster"),
                        "points": ans.get("points", 3),
                        "question": q_data.get("question")
                    })
        return {
            "total_answered": len(processed_responses),
            "responses": processed_responses,
            "timestamp": datetime.now().isoformat()
        }


class ProfileEngine:
    """
    Módulo de Perfilamiento: Calcula vectores de habilidades por clústeres.
    """
    CLUSTERS = [
        "ANALYTICAL", "CREATIVE", "SOCIAL", "LEADERSHIP",
        "TECHNICAL", "SCIENTIFIC", "PRACTICAL", "ENTREPRENEURIAL"
    ]

    def calculate_vector(self, parsed_perception: Dict[str, Any]) -> Dict[str, float]:
        scores = {c: 0.0 for c in self.CLUSTERS}
        max_possible = {c: 0.0 for c in self.CLUSTERS}

        for resp in parsed_perception.get("responses", []):
            cluster = resp.get("cluster")
            points = resp.get("points", 0)
            if cluster in scores:
                scores[cluster] += points
                max_possible[cluster] += 4.0

        vector = {}
        for c in self.CLUSTERS:
            if max_possible[c] > 0:
                vector[c] = round((scores[c] / max_possible[c]) * 10.0, 1)
            else:
                vector[c] = 5.0
        return vector


class ReasoningEngine:
    """
    Módulo de Razonamiento y Generación de Hipótesis Cognitivas.
    """
    CLUSTER_DESCRIPTORS = {
        "ANALYTICAL": "Pensamiento estructurado y desglose lógico",
        "CREATIVE": "Innovación conceptual y visión estética",
        "SOCIAL": "Empatía e inteligencia interpersonal",
        "LEADERSHIP": "Gestión de equipos y toma de decisiones",
        "TECHNICAL": "Afinidad con arquitectura digital y código",
        "SCIENTIFIC": "Investigación basada en métodos científicos",
        "PRACTICAL": "Ejecución pragmática y aprendizaje activo",
        "ENTREPRENEURIAL": "Identificación de oportunidades de valor"
    }

    def infer_archetype(self, vector: Dict[str, float]) -> Tuple[str, str]:
        sorted_c = sorted(vector.items(), key=lambda x: x[1], reverse=True)
        top1, val1 = sorted_c[0]
        top2, val2 = sorted_c[1]

        if top1 in ["ANALYTICAL", "TECHNICAL"] and top2 in ["ANALYTICAL", "TECHNICAL"]:
            return "Metódico y Tecnológico", "Aprende mejor mediante proyectos estructurados y código."
        elif top1 in ["CREATIVE", "ENTREPRENEURIAL"] or top2 in ["CREATIVE", "ENTREPRENEURIAL"]:
            return "Innovador Disruptivo", "Aprende mediante experimentos visuales y desafíos prácticos."
        elif top1 == "SOCIAL" or top2 == "SOCIAL":
            return "Interpersonal Empático", "Aprende mejor con metodologías colaborativas."
        return "Multidisciplinario Adaptativo", "Demuestra versatilidad entre razonamiento lógico e interacción."

    def generate_hypotheses(self, vector: Dict[str, float], memory: Dict[str, Any]) -> List[str]:
        hypotheses = []
        sorted_c = sorted(vector.items(), key=lambda x: x[1], reverse=True)
        top1, val1 = sorted_c[0]
        
        hypotheses.append(f"El estudiante muestra un sesgo fuerte hacia {top1} con {val1}/10.")
        
        history_count = memory.get("assessments_count", 0)
        if history_count > 0:
            hypotheses.append(f"El perfil muestra estabilidad a lo largo de {history_count + 1} evaluaciones.")
        else:
            hypotheses.append("Primer diagnóstico: Se requiere validar consistencia en siguientes iteraciones.")
            
        return hypotheses


class DecisionEngine:
    """
    Módulo de Toma de Decisiones y Coincidencia Vectorial.
    """
    @staticmethod
    def cosine_similarity(v1: List[float], v2: List[float]) -> float:
        dot = sum(a * b for a, b in zip(v1, v2))
        n1 = math.sqrt(sum(a * a for a in v1))
        n2 = math.sqrt(sum(b * b for b in v2))
        if n1 == 0 or n2 == 0:
            return 0.0
        return dot / (n1 * n2)

    def rank_careers(self, user_vector: Dict[str, float], careers_db: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        clusters = list(user_vector.keys())
        u_vals = [user_vector[c] for c in clusters]
        matches = []

        for career in careers_db:
            reqs = career.get("requirements", {})
            c_vals = [reqs.get(c, 5.0) for c in clusters]
            
            sim = self.cosine_similarity(u_vals, c_vals)
            pct = round(sim * 100, 1)

            strengths = [c for c in clusters if user_vector[c] >= reqs.get(c, 5.0)]
            gaps = [c for c in clusters if reqs.get(c, 5.0) - user_vector[c] > 2.0]

            matches.append({
                "career_id": career.get("id"),
                "title": career.get("title"),
                "category": career.get("category"),
                "match_percentage": pct,
                "strengths": strengths,
                "skill_gaps": gaps,
                "description": career.get("description", ""),
                "requirements": reqs
            })

        matches.sort(key=lambda x: x["match_percentage"], reverse=True)
        return matches


class CareerEngine:
    """
    Módulo de Hubs Globales y Oportunidades del Mercado.
    """
    GLOBAL_HUBS = [
        {"name": "Silicon Valley (EE. UU.)", "category": "Technology", "desc": "Hub global de tecnología e inteligencia artificial."},
        {"name": "Zúrich (Suiza)", "category": "Engineering", "desc": "Líder en ingeniería de precisión y biotecnología."},
        {"name": "Tokio (Japón)", "category": "Technology", "desc": "Pioneros en robótica y automatización."},
        {"name": "Londres (Reino Unido)", "category": "Business", "desc": "Centro internacional de ciencia de datos y finanzas."},
        {"name": "Bogotá (Colombia)", "category": "Technology", "desc": "Ecosistema emergente de desarrollo de software en LatAm."}
    ]

    def get_recommended_hubs(self, top_category: str) -> List[Dict[str, Any]]:
        recommended = [h for h in self.GLOBAL_HUBS if h["category"] == top_category]
        if not recommended:
            recommended = self.GLOBAL_HUBS[:3]
        return recommended


class RoadmapPlanner:
    """
    Módulo de Planificación de Rutas (GPS Educativo).
    """
    def build_roadmap(self, career_title: str, gaps: List[str]) -> Dict[str, Any]:
        gap_str = ", ".join(gaps) if gaps else "Habilidades Avanzadas"
        return {
            "career_title": career_title,
            "estimated_months": 8,
            "checkpoints": [
                {"step": 1, "title": "Fundamentos y Conceptos Clave", "reward_xp": 100, "description": f"Bases esenciales para {career_title}."},
                {"step": 2, "title": f"Nivelación en {gap_str}", "reward_xp": 250, "description": "Fortalecimiento de áreas de oportunidad."},
                {"step": 3, "title": "Proyecto Integrador para Portfolio", "reward_xp": 400, "description": "Demostración práctica de competencias."},
                {"step": 4, "title": "Certificación y Aplicación Profesional", "reward_xp": 600, "description": "Validación final y vinculación con oportunidades."}
            ]
        }


class LearningEngine:
    """
    Módulo de Aprendizaje Continuo y Predicción de Evolución.
    """
    def predict_growth(self, vector: Dict[str, float], top_career: str) -> List[str]:
        predictions = [
            f"Con práctica constante, tu capacidad analítica puede incrementarse un 15% en los próximos 6 meses.",
            f"Tu alineación con {top_career} te permitirá completar proyectos de nivel intermedio rápidamente."
        ]
        return predictions


class ResponseBuilder:
    """
    Ensamblador unificado de respuestas cognitivas.
    """
    def assemble(
        self,
        top_career: Optional[Dict[str, Any]],
        top_matches: List[Dict[str, Any]],
        roadmap: Optional[Dict[str, Any]],
        reasoning: str,
        confidence: float,
        strengths: List[str],
        weaknesses: List[str],
        hubs: List[Dict[str, Any]],
        learning_style: str,
        personality: str,
        memory_updates: Dict[str, Any],
        predictions: List[str]
    ) -> BrainResponse:
        return BrainResponse(
            top_career=top_career,
            top_matches=top_matches,
            roadmap=roadmap,
            reasoning=reasoning,
            confidence=confidence,
            strengths=strengths,
            weaknesses=weaknesses,
            recommended_hubs=hubs,
            learning_style=learning_style,
            personality=personality,
            memory_updates=memory_updates,
            next_actions=["Explorar Roadmap", "Revisar Hubs Globales", "Realizar Práctica de Nivelación"],
            future_predictions=predictions
        )


class MentorEngine:
    """
    Módulo de Mentoría Conversacional. Responde preguntas del estudiante
    apoyándose en su memoria persistente (último diagnóstico, roadmap,
    vector de habilidades) y en el catálogo de carreras. Sigue el mismo
    enfoque rule-based/templated que el resto del cerebro: sin llamadas a
    un LLM externo.
    """

    INTENT_KEYWORDS = {
        "roadmap": ["roadmap", "pasos", "plan", "ruta", "checkpoint", "siguiente"],
        "career": ["carrera", "career", "profesion", "profesión", "trabajo"],
        "university": ["universidad", "university", "estudiar", "hub", "pais", "país", "destino"],
        "skills": ["habilidad", "skill", "fortaleza", "debilidad", "gap", "mejorar"],
        "motivation": ["animo", "ánimo", "motivacion", "motivación", "duda", "nervios", "miedo", "inseguro"],
    }

    def __init__(self, memory_system: StudentMemorySystem, careers_db: List[Dict[str, Any]]):
        self.memory_system = memory_system
        self.careers_db = careers_db

    def _detect_intent(self, message: str) -> str:
        lowered = message.lower()
        for intent, keywords in self.INTENT_KEYWORDS.items():
            if any(keyword in lowered for keyword in keywords):
                return intent
        return "general"

    def chat(self, user_message: str, context: Optional[Dict[str, Any]] = None) -> str:
        context = context or {}
        user_id = context.get("user_id", "default_student")
        memory = self.memory_system.load_memory(user_id)
        history = memory.get("assessment_history", [])

        if not history:
            return (
                "Todavía no tengo un diagnóstico tuyo. Completa el test de orientación "
                "vocacional primero y con gusto te ayudo a interpretar tus resultados."
            )

        last = history[-1]
        top_choice = last.get("top_choice") or "tu perfil vocacional"
        intent = self._detect_intent(user_message)

        if intent == "roadmap":
            return (
                f"Tu ruta hacia {top_choice} tiene 4 checkpoints: fundamentos y conceptos "
                f"clave, nivelación de habilidades, un proyecto integrador para portafolio, "
                f"y certificación/aplicación profesional. Puedes verlos en detalle en Journey."
            )
        if intent == "career":
            return (
                f"Según tu último diagnóstico, tu mejor match es {top_choice}. Puedes "
                f"comparar otras opciones compatibles en la pantalla de Careers."
            )
        if intent == "university":
            return (
                f"Revisa los hubs globales recomendados para {top_choice} en tu Flight "
                f"Plan: ahí encontrarás países y universidades alineados a tu perfil."
            )
        if intent == "skills":
            vector = last.get("vector")
            return (
                f"Tu vector de habilidades más reciente fue {vector}. Enfócate en las "
                f"áreas con menor puntaje para cerrar brechas hacia {top_choice}."
            )
        if intent == "motivation":
            return (
                "Es normal tener dudas al elegir un camino. Tu diagnóstico se basa en tus "
                f"propias respuestas, y {top_choice} refleja fortalezas reales tuyas — "
                "avanza un checkpoint a la vez."
            )

        return (
            f"Puedo ayudarte con tu roadmap, tu carrera recomendada ({top_choice}), "
            "universidades/hubs, tus habilidades o si necesitas ánimo. ¿Sobre cuál "
            "quieres hablar?"
        )


# =============================================================================
# CEREBRO PRINCIPAL: FUTUREPILOT BRAIN (ORCHESTRATOR)
# =============================================================================

class FuturePilotBrain:
    """
    Coordinador Central de Inteligencia Artificial para FuturePilot.
    Orquesta el flujo completo de módulos siguiendo el ciclo cognitivo.
    """

    def __init__(self, careers_data: List[Dict[str, Any]], questions_data: List[Dict[str, Any]]):
        self.careers_db = careers_data
        self.questions_db = questions_data

        # Inicialización de módulos coordinados
        self.memory_system = StudentMemorySystem()
        self.perception = PerceptionEngine()
        self.profile_engine = ProfileEngine()
        self.reasoning = ReasoningEngine()
        self.decision = DecisionEngine()
        self.career_engine = CareerEngine()
        self.planner = RoadmapPlanner()
        self.learning = LearningEngine()
        self.builder = ResponseBuilder()

    def run_cognitive_cycle(self, raw_answers: List[Dict[str, Any]], user_id: str = "default_user") -> BrainResponse:
        """
        Ciclo Cognitivo Interno:
        1. Perceive -> 2. Update Memory -> 3. Analyze & Hypothesize ->
        4. Evaluate Confidence -> 5. Decide -> 6. Plan -> 7. Build Response -> 8. Learn
        """
        # Paso 1: Percepción
        percept_data = self.perception.parse_test_inputs(raw_answers, self.questions_db)
        user_vector = self.profile_engine.calculate_vector(percept_data)

        # Paso 2: Carga de Memoria Activa
        user_memory = self.memory_system.load_memory(user_id)

        # Paso 3: Análisis y Generación de Hipótesis
        personality, learning_style = self.reasoning.infer_archetype(user_vector)
        hypotheses = self.reasoning.generate_hypotheses(user_vector, user_memory)

        # Paso 4: Evaluación de Confianza Cognitiva (Simulada)
        answered_ratio = min(1.0, percept_data["total_answered"] / max(1, len(self.questions_db)))
        confidence = round(0.5 + (answered_ratio * 0.45), 2)

        # Paso 5: Toma de Decisiones (Coincidencia Vectorial)
        ranked_matches = self.decision.rank_careers(user_vector, self.careers_db)
        top_match = ranked_matches[0] if ranked_matches else None

        # Paso 6: Planificación (Roadmap & Hubs)
        roadmap = None
        recommended_hubs = []
        if top_match:
            roadmap = self.planner.build_roadmap(top_match["title"], top_match["skill_gaps"])
            recommended_hubs = self.career_engine.get_recommended_hubs(top_match.get("category", ""))

        # Paso 7: Generar Justificación Razonada
        strengths = top_match.get("strengths", []) if top_match else []
        gaps = top_match.get("skill_gaps", []) if top_match else []
        reasoning_text = (
            f"Análisis Cognitivo ({personality}): Con un nivel de confianza del {int(confidence*100)}%, "
            f"la IA identifica alta compatibilidad con {top_match['title'] if top_match else 'tu perfil'}. "
            f"Se recomienda potenciar: {', '.join(gaps) if gaps else 'tus áreas clave'}."
        )

        # Paso 8: Predicciones de Crecimiento
        predictions = self.learning.predict_growth(user_vector, top_match["title"] if top_match else "")

        # Actualizar la Memoria del Usuario
        user_memory["assessments_count"] += 1
        user_memory["assessment_history"].append({
            "timestamp": datetime.now().isoformat(),
            "vector": user_vector,
            "top_choice": top_match["title"] if top_match else None
        })
        self.memory_system.save_memory(user_id, user_memory)

        # Paso 9: Construir Respuesta Unificada
        return self.builder.assemble(
            top_career=top_match,
            top_matches=ranked_matches,
            roadmap=roadmap,
            reasoning=reasoning_text,
            confidence=confidence,
            strengths=strengths,
            weaknesses=gaps,
            hubs=recommended_hubs,
            learning_style=learning_style,
            personality=personality,
            memory_updates={"assessments_count": user_memory["assessments_count"]},
            predictions=predictions
        )


# =============================================================================
# CAPA DE COMPATIBILIDAD HACIA ATRÁS (FACADE)
# =============================================================================

class FuturePilotAIEcosystem:
    """
    Fachada adaptadora para mantener compatibilidad total con el servidor FastAPI (app.py).
    """
    def __init__(self, careers_data: List[Dict[str, Any]], questions_data: List[Dict[str, Any]]):
        self.brain = FuturePilotBrain(careers_data, questions_data)
        self.mentor = MentorEngine(self.brain.memory_system, careers_data)

    @staticmethod
    def _build_career_justification(match: Dict[str, Any], personality: str) -> str:
        """Genera una justificacion propia por carrera (fortalezas/gaps de esa
        carrera especifica) en vez de reutilizar el mismo texto de razonamiento
        general para las cinco carreras recomendadas."""
        strengths = match.get("strengths") or []
        gaps = match.get("skill_gaps") or []
        pct = match.get("match_percentage", 0)
        strengths_text = ", ".join(strengths) if strengths else "tu perfil general"

        if gaps:
            return (
                f"Con un {pct}% de compatibilidad, tu perfil ({personality}) se alinea "
                f"especialmente en {strengths_text}. Para acercarte aun mas a "
                f"{match.get('title')}, conviene reforzar: {', '.join(gaps)}."
            )
        return (
            f"Con un {pct}% de compatibilidad, tu perfil ({personality}) encaja "
            f"fuertemente con {match.get('title')} gracias a {strengths_text}."
        )

    def process_user_test(self, user_answers: List[Dict[str, Any]], user_id: str = "default_student") -> Dict[str, Any]:
        response: BrainResponse = self.brain.run_cognitive_cycle(user_answers, user_id)

        recommended_careers = [
            {
                "career_id": m["career_id"],
                "title": m["title"],
                "category": m["category"],
                "match_percentage": m["match_percentage"],
                "strengths": m["strengths"],
                "skill_gaps": m["skill_gaps"],
                "justification": self._build_career_justification(m, response.personality),
                "description": m["description"]
            }
            for m in response.top_matches
        ]

        # Formato esperado por el API anterior, mas los campos que ya calcula
        # FuturePilotBrain (personality, learning_style, strengths/weaknesses,
        # confidence, recommended_hubs, future_predictions) y que antes se
        # descartaban aqui - necesarios para la vista de resultados completos.
        return {
            "user_id": user_id,
            "user_vector": self.brain.profile_engine.calculate_vector(
                self.brain.perception.parse_test_inputs(user_answers, self.brain.questions_db)
            ),
            "personality": response.personality,
            "learning_style": response.learning_style,
            "strengths": response.strengths,
            "weaknesses": response.weaknesses,
            "confidence": response.confidence,
            "recommended_hubs": response.recommended_hubs,
            "future_predictions": response.future_predictions,
            "recommended_careers": recommended_careers,
            "top_choice": {
                **(response.top_career if response.top_career else {}),
                "justification": recommended_careers[0]["justification"] if recommended_careers else response.reasoning,
            },
            "roadmap": response.roadmap
        }