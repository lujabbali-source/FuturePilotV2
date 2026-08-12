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
import random
import re
import time
from datetime import datetime
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple

# Configurable via env var: para tests aislados (ver tests/conftest.py) y
# para deployments reales donde este directorio deberia vivir en un disco
# persistente separado, no junto al codigo de la app.
DEFAULT_MEMORY_DIR = os.environ.get("FUTUREPILOT_MEMORY_DIR") or str(
    Path(__file__).resolve().parent / "data" / "users"
)


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

class _FileLock:
    """Lock inter-proceso minimo basado en creacion atomica de archivo
    (O_CREAT|O_EXCL, atomica tanto en Windows como en POSIX) - sin
    dependencias nuevas. Protege el ciclo completo load->modificar->save de
    la memoria de un estudiante: dos requests concurrentes para el mismo
    user_id (ej. dos mensajes de chat seguidos, o un test terminando justo
    cuando el mentor esta respondiendo) ya no pueden pisarse el resultado
    del otro (el clasico "lost update" de leer-modificar-escribir)."""

    def __init__(self, target_path: str, timeout: float = 5.0, poll_interval: float = 0.05):
        self.lock_path = f"{target_path}.lock"
        self.timeout = timeout
        self.poll_interval = poll_interval
        self._fd = None

    def __enter__(self):
        start = time.monotonic()
        while True:
            try:
                self._fd = os.open(self.lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                return self
            except FileExistsError:
                if time.monotonic() - start > self.timeout:
                    # Un lock huerfano (proceso murio sin liberarlo) no
                    # debe bloquear para siempre.
                    try:
                        os.remove(self.lock_path)
                    except OSError:
                        pass
                    continue
                time.sleep(self.poll_interval)

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._fd is not None:
            os.close(self._fd)
        try:
            os.remove(self.lock_path)
        except OSError:
            pass


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

    def lock(self, user_id: str) -> _FileLock:
        """Envolver el ciclo load+modificar+save de un mismo user_id con
        `with memory_system.lock(user_id):` para que quede atomico."""
        return _FileLock(self._get_path(user_id))

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
        # Escritura atomica: se escribe a un archivo temporal y se
        # reemplaza con os.replace (atomico en Windows y POSIX) para que
        # ningun lector pueda ver un JSON a medio escribir, incluso si el
        # proceso se interrumpe a mitad de la escritura.
        path = self._get_path(user_id)
        tmp_path = f"{path}.tmp-{os.getpid()}"
        try:
            with open(tmp_path, "w", encoding="utf-8") as f:
                json.dump(memory_data, f, ensure_ascii=False, indent=2)
            os.replace(tmp_path, path)
        except Exception as e:
            print(f"[MemorySystem Error] No se pudo guardar la memoria: {e}")
            try:
                os.remove(tmp_path)
            except OSError:
                pass


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

    @staticmethod
    def profile_definition(vector: Dict[str, float]) -> float:
        """Cuanta señal trae el perfil, de 0 a 1.

        0 = todos los clusters valen lo mismo: el estudiante no mostro
        ninguna inclinacion y cualquier recomendacion seria arbitraria.
        1 = maxima dispersion posible entre clusters.

        Se usa para la confianza del analisis: no es lo mismo recomendar
        sobre un perfil marcado que sobre uno plano, aunque en los dos
        casos se hayan contestado las 50 preguntas.
        """
        values = list(vector.values())
        if len(values) < 2:
            return 0.0
        mean = sum(values) / len(values)
        deviation = math.sqrt(sum((v - mean) ** 2 for v in values) / len(values))
        # La desviacion maxima con valores en [0, 10] y media 5 es 5.0.
        return min(1.0, deviation / 5.0)


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


# Cuantas carreras del ranking se devuelven al cliente y se guardan en la
# memoria del estudiante. rank_careers puntua el catalogo ENTERO (hoy 73
# carreras), pero devolverlo entero significa mandar 73 fichas con su
# justificacion generada en cada /api/v1/assess, guardarlas en
# results_json y pintarlas todas en la pantalla de resultados. Con las 10
# carreras iniciales la diferencia no se notaba; ya no es el caso.
TOP_MATCHES_RETURNED = 8


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

    @classmethod
    def profile_similarity(cls, v1: List[float], v2: List[float]) -> float:
        """Coseno CENTRADO (correlacion de Pearson): compara la FORMA de los
        dos perfiles, no su magnitud.

        El coseno a secas sobre vectores que solo tienen valores positivos
        -como estos, donde ningun cluster puede ser negativo- esta acotado
        muy arriba: todo se parece a todo. Y lo hacia al reves de lo que
        deberia. Con el catalogo actual:

          - Un perfil PLANO (el estudiante responde parecido a todo, o sea
            sin señal alguna) daba 98.7% con la primera carrera de la lista.
          - Un perfil MUY definido (10 en dos clusters, 0 en el resto) daba
            como maximo 70.6%.

        Es decir: cuanto mas claro era el estudiante, peor puntuaba, y a
        quien no habia mostrado ninguna inclinacion se le presentaba una
        carrera arbitraria como un 98% de compatibilidad.

        Al restar la media de cada vector antes del coseno se mide si los
        picos y valles coinciden. Un perfil plano queda en 0 (correlacion
        nula) contra todo, que es la respuesta honesta, y uno definido
        separa con claridad las carreras que encajan de las que no.

        Devuelve el valor crudo en [-1, 1]; ver match_percentage para como
        se presenta.
        """
        mean1 = sum(v1) / len(v1) if v1 else 0.0
        mean2 = sum(v2) / len(v2) if v2 else 0.0
        return cls.cosine_similarity([a - mean1 for a in v1], [b - mean2 for b in v2])

    @staticmethod
    def to_match_percentage(similarity: float) -> float:
        """[-1, 1] -> [0, 100]. 100 = la forma del perfil coincide con lo que
        pide la carrera; 50 = no hay relacion; 0 = son opuestos."""
        return round((similarity + 1.0) / 2.0 * 100, 1)

    def rank_careers(self, user_vector: Dict[str, float], careers_db: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        clusters = list(user_vector.keys())
        u_vals = [user_vector[c] for c in clusters]
        matches = []

        for career in careers_db:
            reqs = career.get("requirements", {})
            c_vals = [reqs.get(c, 5.0) for c in clusters]
            
            sim = self.profile_similarity(u_vals, c_vals)
            pct = self.to_match_percentage(sim)

            # Las 3 ventajas mas grandes, de mayor a menor. Antes se
            # devolvia TODO cluster que llegara al requisito: para una
            # carrera poco exigente eso son los 8, y la pantalla de
            # resultados listaba los ocho como "fortalezas". Decir que
            # destacas en todo es no decir nada.
            surpluses = [
                (c, user_vector[c] - reqs.get(c, 5.0))
                for c in clusters
                if user_vector[c] >= reqs.get(c, 5.0)
            ]
            surpluses.sort(key=lambda item: item[1], reverse=True)
            strengths = [cluster for cluster, _ in surpluses[:3]]

            # Solo las 3 brechas mas grandes, de mayor a menor. Antes se
            # devolvian TODAS las que superaran el umbral: para un perfil
            # muy marcado eso son 6 de los 8 clusters, y la justificacion
            # acababa diciendo "conviene reforzar" seguido de media lista,
            # que no le sirve de nada al estudiante.
            deficits = [
                (c, reqs.get(c, 5.0) - user_vector[c])
                for c in clusters
                if reqs.get(c, 5.0) - user_vector[c] > 2.0
            ]
            deficits.sort(key=lambda item: item[1], reverse=True)
            gaps = [cluster for cluster, _ in deficits[:3]]

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
    # Un hub se empareja por la categoria de la carrera recomendada. Habia
    # solo 3 categorias cubiertas (Technology, Engineering, Business); con
    # las 14 del catalogo actual el fallback saltaba casi siempre y acababa
    # proponiendo Silicon Valley a quien le habia salido Creative Writing.
    GLOBAL_HUBS = [
        {"name": "Silicon Valley (EE. UU.)", "category": "Technology", "desc": "Hub global de tecnología e inteligencia artificial."},
        {"name": "Bangalore (India)", "category": "Technology", "desc": "Mayor concentración de ingeniería de software de Asia."},
        {"name": "Bogotá (Colombia)", "category": "Technology", "desc": "Ecosistema emergente de desarrollo de software en LatAm."},
        {"name": "Zúrich (Suiza)", "category": "Engineering", "desc": "Líder en ingeniería de precisión y sistemas industriales."},
        {"name": "Múnich (Alemania)", "category": "Engineering", "desc": "Automoción, mecatrónica y manufactura avanzada."},
        {"name": "Londres (Reino Unido)", "category": "Business", "desc": "Centro internacional de negocios y consultoría."},
        {"name": "Singapur", "category": "Business", "desc": "Puerta de entrada al comercio y la logística de Asia."},
        {"name": "Nueva York (EE. UU.)", "category": "Mathematics & Finance", "desc": "Capital mundial de los mercados financieros."},
        {"name": "Boston (EE. UU.)", "category": "Health", "desc": "Concentración de hospitales universitarios e investigación clínica."},
        {"name": "Basilea (Suiza)", "category": "Health", "desc": "Polo farmacéutico y de ciencias de la vida."},
        {"name": "Cambridge (Reino Unido)", "category": "Science", "desc": "Investigación básica y biotecnología de referencia."},
        {"name": "Ginebra (Suiza)", "category": "Science", "desc": "Física de partículas y organismos científicos internacionales."},
        {"name": "Milán (Italia)", "category": "Design", "desc": "Referente mundial en diseño industrial y de producto."},
        {"name": "Copenhague (Dinamarca)", "category": "Design", "desc": "Diseño escandinavo y arquitectura sostenible."},
        {"name": "París (Francia)", "category": "Arts", "desc": "Escena artística, editorial y audiovisual histórica."},
        {"name": "Los Ángeles (EE. UU.)", "category": "Arts", "desc": "Industria del cine, la música y la animación."},
        {"name": "Nueva York (EE. UU.)", "category": "Communication", "desc": "Sede de los grandes medios y agencias globales."},
        {"name": "Doha (Catar)", "category": "Communication", "desc": "Centro de medios internacionales para Oriente Medio."},
        {"name": "La Haya (Países Bajos)", "category": "Law & Politics", "desc": "Sede de las principales cortes internacionales."},
        {"name": "Bruselas (Bélgica)", "category": "Law & Politics", "desc": "Corazón institucional y diplomático de Europa."},
        {"name": "Helsinki (Finlandia)", "category": "Education", "desc": "Sistema educativo de referencia internacional."},
        {"name": "Estocolmo (Suecia)", "category": "Social Sciences", "desc": "Investigación social y políticas de bienestar."},
        {"name": "Costa Rica", "category": "Environment", "desc": "Modelo de conservación y energía renovable."},
        {"name": "Wageningen (Países Bajos)", "category": "Environment", "desc": "Referencia mundial en ciencias agrarias y alimentación."},
        {"name": "Toulouse (Francia)", "category": "Skilled Trades", "desc": "Capital europea de la industria aeronáutica."},
        {"name": "Lyon (Francia)", "category": "Skilled Trades", "desc": "Tradición gastronómica y formación culinaria de élite."},
    ]

    def get_recommended_hubs(self, top_category: str) -> List[Dict[str, Any]]:
        """Solo hubs de la categoria de la carrera. Si no hay ninguno se
        devuelve una lista vacia: antes se caia a los tres primeros de la
        lista, que es como acabar recomendando un hub tecnologico a un
        perfil artistico. La UI ya sabe que hacer cuando no hay hubs."""
        return [hub for hub in self.GLOBAL_HUBS if hub["category"] == top_category]


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
    apoyándose en su memoria persistente (último diagnóstico completo:
    roadmap real, lista de carreras compatibles, personalidad, fortalezas,
    hubs recomendados) y en el catálogo de carreras. Sigue el mismo enfoque
    rule-based/templated que el resto del cerebro: sin llamadas a un LLM
    externo, pero razonando sobre datos reales en vez de texto fijo -
    reconoce carreras mencionadas por nombre, varía sus frases para no
    sonar repetitivo, y recuerda brevemente la conversación (chat_history
    en la memoria del estudiante) para no responder siempre lo mismo.
    """

    GREETING_KEYWORDS = ["hola", "buenas", "hey", "qué tal", "que tal", "hi ", "hello"]
    FAREWELL_KEYWORDS = ["adios", "adiós", "chao", "nos vemos", "bye", "hasta luego"]
    THANKS_KEYWORDS = ["gracias", "thank"]
    HELP_KEYWORDS = ["ayuda", "que puedes hacer", "qué puedes hacer", "en que me ayudas", "en qué me ayudas", "opciones"]

    INTENT_KEYWORDS = {
        "roadmap": ["roadmap", "pasos", "plan", "ruta", "checkpoint", "siguiente"],
        "career": ["carrera", "career", "profesion", "profesión", "trabajo", "opciones"],
        "university": ["universidad", "university", "estudiar", "hub", "pais", "país", "destino"],
        "skills": ["habilidad", "skill", "fortaleza", "debilidad", "gap", "mejorar"],
        "motivation": ["animo", "ánimo", "motivacion", "motivación", "duda", "nervios", "miedo", "inseguro"],
    }

    def __init__(self, memory_system: StudentMemorySystem, careers_db: List[Dict[str, Any]]):
        self.memory_system = memory_system
        self.careers_db = careers_db

    def _detect_named_career(self, message: str) -> Optional[Dict[str, Any]]:
        """Si el mensaje menciona el nombre de una carrera real del
        catalogo (con limite de palabra, para no confundir un titulo corto
        con una palabra suelta), esa mencion tiene prioridad sobre la
        deteccion de intent generica - es la forma mas concreta de
        "razonar" sobre lo que el estudiante pregunto."""
        lowered = message.lower()
        for career in self.careers_db:
            title = (career.get("title") or "").strip().lower()
            if title and re.search(r"\b" + re.escape(title) + r"\b", lowered):
                return career
        return None

    def _detect_intent(self, message: str) -> str:
        lowered = message.lower()
        if any(keyword in lowered for keyword in self.GREETING_KEYWORDS):
            return "greeting"
        if any(keyword in lowered for keyword in self.FAREWELL_KEYWORDS):
            return "farewell"
        if any(keyword in lowered for keyword in self.THANKS_KEYWORDS):
            return "thanks"
        if any(keyword in lowered for keyword in self.HELP_KEYWORDS):
            return "help"
        for intent, keywords in self.INTENT_KEYWORDS.items():
            if any(keyword in lowered for keyword in keywords):
                return intent
        return "general"

    def _log_turn(self, memory: Dict[str, Any], user_id: str, user_message: str, intent: str) -> None:
        chat_history = memory.setdefault("chat_history", [])
        chat_history.append({
            "timestamp": datetime.now().isoformat(),
            "message": user_message[:500],
            "intent": intent,
        })
        memory["chat_history"] = chat_history[-20:]
        self.memory_system.save_memory(user_id, memory)

    def chat(self, user_message: str, context: Optional[Dict[str, Any]] = None) -> str:
        context = context or {}
        user_id = context.get("user_id", "default_student")
        # Todo el ciclo load->responder->save queda bajo un solo lock por
        # user_id: dos mensajes de chat concurrentes para el mismo
        # estudiante (o un chat justo cuando termina un test) no deben
        # poder pisarse la memoria guardada entre ellos.
        with self.memory_system.lock(user_id):
            return self._chat_locked(user_message, context, user_id)

    def _chat_locked(self, user_message: str, context: Dict[str, Any], user_id: str) -> str:
        name = (context.get("name") or "").strip()
        greeting_name = f", {name}" if name else ""
        goals = context.get("passport_goals") or {}

        memory = self.memory_system.load_memory(user_id)
        history = memory.get("assessment_history", [])

        named_career = self._detect_named_career(user_message)
        intent = "career_lookup" if named_career else self._detect_intent(user_message)

        if not history:
            if intent == "greeting":
                response = random.choice([
                    f"¡Hola{greeting_name}! Soy tu AI Mentor. Todavía no tengo un diagnóstico tuyo — completa el test vocacional y con gusto te ayudo a interpretarlo.",
                    f"¡Qué bueno verte{greeting_name}! Para poder orientarte necesito que hagas primero el test de FuturePilot.",
                ])
            elif intent in ("farewell", "thanks"):
                response = "¡Cuando quieras! Aquí estaré."
            else:
                response = (
                    "Todavía no tengo un diagnóstico tuyo. Completa el test de orientación "
                    "vocacional primero y con gusto te ayudo a interpretar tus resultados."
                )
            self._log_turn(memory, user_id, user_message, intent)
            return response

        last = history[-1]
        top_choice = last.get("top_choice") or "tu perfil vocacional"
        top_matches = last.get("top_matches") or []
        roadmap = last.get("roadmap")
        personality = last.get("personality")
        strengths = last.get("strengths") or []
        weaknesses = last.get("weaknesses") or []
        hubs = last.get("recommended_hubs") or []

        if intent == "greeting":
            response = random.choice([
                f"¡Hola{greeting_name}! ¿En qué te ayudo hoy: tu roadmap, tu carrera, universidades o tus habilidades?",
                f"¡Hey{greeting_name}! Tu perfil ({personality or 'ya analizado'}) apunta fuerte hacia {top_choice}. ¿Sobre qué quieres hablar?",
            ])

        elif intent == "farewell":
            response = random.choice([
                "¡Nos vemos! Sigue avanzando en tu roadmap.",
                f"¡Éxitos con {top_choice}! Vuelve cuando quieras.",
            ])

        elif intent == "thanks":
            response = random.choice([
                "¡Con gusto! Para eso estoy.",
                "¡De nada! Aquí sigo si necesitas algo más.",
            ])

        elif intent == "help":
            response = (
                "Puedo ayudarte con: tu roadmap paso a paso, tu carrera recomendada y otras opciones "
                "compatibles, universidades/hubs, tus fortalezas y áreas de mejora, o si necesitas ánimo. "
                "También puedes preguntarme directamente por cualquier carrera del catálogo por su nombre."
            )

        elif intent == "career_lookup" and named_career:
            match = next((m for m in top_matches if m.get("title") == named_career.get("title")), None)
            if match:
                response = (
                    f"{named_career['title']}: tienes un {match['match_percentage']}% de compatibilidad "
                    f"según tu diagnóstico. {named_career.get('description', '')}"
                ).strip()
            else:
                response = (
                    f"{named_career['title']} no quedó entre tus mejores matches, pero aquí tienes de qué se trata: "
                    f"{named_career.get('description') or 'no tengo más detalles todavía.'}"
                )

        elif intent == "roadmap":
            if roadmap and roadmap.get("checkpoints"):
                steps = "; ".join(f"{cp['step']}. {cp['title']}" for cp in roadmap["checkpoints"])
                response = (
                    f"Tu ruta hacia {roadmap.get('career_title', top_choice)} "
                    f"(~{roadmap.get('estimated_months', 8)} meses): {steps}. Puedes verla en detalle en Journey."
                )
            else:
                response = f"Todavía no tengo un roadmap detallado para {top_choice}. Repite el test para generarlo."

        elif intent == "career":
            if len(top_matches) > 1:
                others = ", ".join(f"{m['title']} ({m['match_percentage']}%)" for m in top_matches[1:4])
                response = (
                    f"Tu mejor match es {top_choice} ({top_matches[0]['match_percentage']}%). "
                    f"También compatibles: {others}."
                )
            else:
                response = f"Según tu último diagnóstico, tu mejor match es {top_choice}."

        elif intent == "university":
            if hubs:
                hub_list = "; ".join(f"{hub['name']} ({hub.get('desc', '')})" for hub in hubs)
                response = f"Para {top_choice}, estos hubs encajan con tu perfil: {hub_list}."
            else:
                response = f"Revisa los hubs globales recomendados para {top_choice} en tu Flight Plan."
            if goals.get("target_country"):
                response += (
                    f" Vi en tu Pasaporte que tu meta es estudiar en {goals['target_country']} — "
                    "vale la pena comparar esos hubs con esa opción."
                )

        elif intent == "skills":
            parts = []
            if strengths:
                parts.append(f"tus fortalezas ({', '.join(strengths)})")
            if weaknesses:
                parts.append(f"áreas de oportunidad ({', '.join(weaknesses)})")
            body = " y ".join(parts) if parts else "un perfil balanceado, sin brechas grandes"
            response = f"Con base en tu diagnóstico tienes {body}. Enfócate en cerrar brechas hacia {top_choice}."

        elif intent == "motivation":
            response = random.choice([
                f"Es normal tener dudas al elegir un camino. Tu diagnóstico se basa en tus propias respuestas, "
                f"y {top_choice} refleja fortalezas reales tuyas — avanza un checkpoint a la vez.",
                f"Nadie tiene todo resuelto desde el primer día. {top_choice} no es una sentencia final, "
                "es un punto de partida que ya sabemos que encaja contigo.",
            ])

        else:
            response = (
                f"Puedo ayudarte con tu roadmap, tu carrera recomendada ({top_choice}), universidades/hubs, "
                "tus habilidades, o si necesitas ánimo. También puedes preguntarme por cualquier carrera "
                "del catálogo. ¿Sobre qué quieres hablar?"
            )

        self._log_turn(memory, user_id, user_message, intent)
        return response


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
        """Envoltorio delgado: todo el ciclo (lee memoria, calcula, guarda
        memoria) queda bajo un solo lock por user_id - ver StudentMemorySystem.lock."""
        with self.memory_system.lock(user_id):
            return self._run_cognitive_cycle_locked(raw_answers, user_id)

    def _run_cognitive_cycle_locked(self, raw_answers: List[Dict[str, Any]], user_id: str) -> BrainResponse:
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

        # Paso 4: Evaluación de Confianza Cognitiva
        #
        # Antes solo miraba cuantas preguntas se habian respondido, asi que
        # un estudiante que contestara las 50 igual (perfil plano, sin
        # ninguna inclinacion) recibia un 95% de confianza sobre una
        # recomendacion que en realidad no distinguia nada. Ahora pesan las
        # dos cosas: cuanto contesto Y cuanta señal hay en lo que contesto.
        answered_ratio = min(1.0, percept_data["total_answered"] / max(1, len(self.questions_db)))
        definition = self.profile_engine.profile_definition(user_vector)
        confidence = round(0.4 + (answered_ratio * 0.3) + (definition * 0.3), 2)

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

        # Actualizar la Memoria del Usuario. Antes esta entrada solo
        # guardaba {timestamp, vector, top_choice} - el MentorEngine no
        # tenia forma de referenciar el roadmap real, la lista completa de
        # carreras compatibles, la personalidad o los hubs recomendados
        # porque esos datos se calculaban y se devolvian a la API pero
        # nunca se persistian. Ahora se guarda todo lo que el mentor podria
        # necesitar para responder con datos reales en vez de texto fijo.
        user_memory["assessments_count"] += 1
        user_memory["assessment_history"].append({
            "timestamp": datetime.now().isoformat(),
            "vector": user_vector,
            "top_choice": top_match["title"] if top_match else None,
            "top_matches": ranked_matches[:TOP_MATCHES_RETURNED],
            "roadmap": roadmap,
            "personality": personality,
            "learning_style": learning_style,
            "strengths": strengths,
            "weaknesses": gaps,
            "recommended_hubs": recommended_hubs,
        })
        self.memory_system.save_memory(user_id, user_memory)

        # Paso 9: Construir Respuesta Unificada
        return self.builder.assemble(
            top_career=top_match,
            top_matches=ranked_matches[:TOP_MATCHES_RETURNED],
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

    def sync_memory_from_results(self, user_id: str, results: Dict[str, Any]) -> None:
        """El test casi siempre se completa antes de iniciar sesion, con
        user_id="default_student" (ver process_user_test) - la memoria del
        cerebro quedaba entonces en un balde COMPARTIDO entre todos los
        estudiantes anonimos, nunca bajo el id real de la cuenta. El
        MentorEngine no podia ver el diagnostico de nadie que hubiera
        iniciado sesion. Esto copia el resultado ya calculado (el mismo que
        se guardo en test_results al reclamarlo) a la memoria del usuario
        real, con la misma forma que run_cognitive_cycle - sin recalcular
        nada."""
        top_choice = (results.get("top_choice") or {}).get("title")
        with self.brain.memory_system.lock(user_id):
            self._sync_memory_locked(user_id, top_choice, results)

    def _sync_memory_locked(self, user_id: str, top_choice: Optional[str], results: Dict[str, Any]) -> None:
        memory = self.brain.memory_system.load_memory(user_id)
        memory["assessments_count"] = memory.get("assessments_count", 0) + 1
        memory.setdefault("assessment_history", []).append({
            "timestamp": datetime.now().isoformat(),
            "vector": results.get("user_vector"),
            "top_choice": top_choice,
            "top_matches": results.get("recommended_careers") or [],
            "roadmap": results.get("roadmap"),
            "personality": results.get("personality"),
            "learning_style": results.get("learning_style"),
            "strengths": results.get("strengths") or [],
            "weaknesses": results.get("weaknesses") or [],
            "recommended_hubs": results.get("recommended_hubs") or [],
        })
        self.brain.memory_system.save_memory(user_id, memory)

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