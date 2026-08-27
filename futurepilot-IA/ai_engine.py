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

# El motor no redacta: produce claves y parametros, y localization.py los
# convierte en texto en el idioma que pida cada peticion.
import localization

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
    # `reasoning` y `next_actions` viajan como
    # {key, params} sin redactar: el texto se arma en app.py, en el idioma
    # que pida la peticion. Ver localization.py.
    reasoning: Dict[str, Any]
    confidence: float
    strengths: List[str]
    weaknesses: List[str]
    recommended_hubs: List[Dict[str, Any]]
    archetype_key: str
    memory_updates: Dict[str, Any]
    next_actions: List[Dict[str, Any]]

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

    def forget(self, user_id: str) -> bool:
        """Borra la memoria de un estudiante. Devuelve si habia algo que borrar.

        Existe porque `delete_account` no llegaba hasta aqui. La cuenta se
        borraba de la base con cuidado - hasta se limpia el identificador de
        DENTRO de results_json para que las filas no sigan siendo vinculables -
        y luego quedaba en disco un archivo llamado `26_memory.json` con
        `"user_id": "26"` y el historial de tests de esa persona dentro.

        Se hace bajo el mismo lock que las escrituras: sin el, un mensaje del
        mentor que estuviera a medio guardar volveria a crear el archivo
        justo despues de borrarlo.
        """
        ruta = self._get_path(user_id)
        with self.lock(user_id):
            try:
                os.remove(ruta)
                return True
            except FileNotFoundError:
                return False

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

    def cluster_evidence(self, parsed_perception: Dict[str, Any]) -> Dict[str, Dict[str, float]]:
        """Cuantas respuestas alimentaron cada cluster, y con cuantos puntos.

        Es el mismo recuento que hace calculate_vector, pero conservado en
        vez de descartado. Sirve para poder responder en pantalla a la
        pregunta obvia del estudiante: "vale, dices que soy creativo, pero
        *por que*". Un numero de respuestas reales contesta eso; una barra
        sin procedencia, no.
        """
        evidence = {c: {"answered": 0, "points": 0.0, "max_points": 0.0} for c in self.CLUSTERS}
        for resp in parsed_perception.get("responses", []):
            cluster = resp.get("cluster")
            if cluster in evidence:
                evidence[cluster]["answered"] += 1
                evidence[cluster]["points"] += resp.get("points", 0)
                evidence[cluster]["max_points"] += 4.0
        return evidence

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

    def infer_archetype(self, vector: Dict[str, float]) -> str:
        """Devuelve la CLAVE del arquetipo, no su nombre.

        El nombre y el estilo de aprendizaje viven en localization.ARCHETYPES
        y se resuelven al responder: asi el mismo resultado se lee en el
        idioma que el estudiante tenga puesto hoy."""
        sorted_c = sorted(vector.items(), key=lambda x: x[1], reverse=True)
        top1, _ = sorted_c[0]
        top2, _ = sorted_c[1]

        if top1 in ["ANALYTICAL", "TECHNICAL"] and top2 in ["ANALYTICAL", "TECHNICAL"]:
            return "methodical"
        elif top1 in ["CREATIVE", "ENTREPRENEURIAL"] or top2 in ["CREATIVE", "ENTREPRENEURIAL"]:
            return "disruptive"
        elif top1 == "SOCIAL" or top2 == "SOCIAL":
            return "empathetic"
        return "adaptive"

    def generate_hypotheses(self, vector: Dict[str, float], memory: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Hipotesis como {key, params}, sin redactar. Las arma el catalogo."""
        sorted_c = sorted(vector.items(), key=lambda x: x[1], reverse=True)
        top1, val1 = sorted_c[0]

        hypotheses: List[Dict[str, Any]] = [
            {"key": "hypothesis.bias", "params": {"cluster": top1, "value": val1}}
        ]

        history_count = memory.get("assessments_count", 0)
        if history_count > 0:
            hypotheses.append({
                "key": "hypothesis.stable",
                "params": {"count": history_count + 1},
            })
        else:
            hypotheses.append({"key": "hypothesis.first", "params": {}})

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
        {"name": "Silicon Valley (EE. UU.)", "category": "Technology", "desc": "Global hub for technology and artificial intelligence.", "desc_es": "Hub global de tecnología e inteligencia artificial."},
        {"name": "Bangalore (India)", "category": "Technology", "desc": "Asia's largest concentration of software engineering.", "desc_es": "Mayor concentración de ingeniería de software de Asia."},
        {"name": "Bogotá (Colombia)", "category": "Technology", "desc": "A fast-growing software development scene in Latin America.", "desc_es": "Ecosistema emergente de desarrollo de software en LatAm."},
        {"name": "Zúrich (Suiza)", "category": "Engineering", "desc": "A leader in precision engineering and industrial systems.", "desc_es": "Líder en ingeniería de precisión y sistemas industriales."},
        {"name": "Múnich (Alemania)", "category": "Engineering", "desc": "Automotive, mechatronics and advanced manufacturing.", "desc_es": "Automoción, mecatrónica y manufactura avanzada.", "careers": ["c10", "c34", "c61"]},
        {"name": "Londres (Reino Unido)", "category": "Business", "desc": "An international centre for business and consulting.", "desc_es": "Centro internacional de negocios y consultoría.", "careers": ["c72", "c11"]},
        {"name": "Singapur", "category": "Business", "desc": "The gateway to trade and logistics across Asia.", "desc_es": "Puerta de entrada al comercio y la logística de Asia.", "careers": ["c59", "c60"]},
        {"name": "Nueva York (EE. UU.)", "category": "Mathematics & Finance", "desc": "The world capital of financial markets.", "desc_es": "Capital mundial de los mercados financieros."},
        {"name": "Boston (EE. UU.)", "category": "Health", "desc": "A dense cluster of teaching hospitals and clinical research.", "desc_es": "Concentración de hospitales universitarios e investigación clínica.", "careers": ["c7", "c24", "c27"]},
        {"name": "Basilea (Suiza)", "category": "Health", "desc": "A pharmaceutical and life sciences powerhouse.", "desc_es": "Polo farmacéutico y de ciencias de la vida.", "careers": ["c22", "c9", "c16"]},
        {"name": "Cambridge (Reino Unido)", "category": "Science", "desc": "Benchmark basic research and biotechnology.", "desc_es": "Investigación básica y biotecnología de referencia.", "careers": ["c9", "c12", "c16"]},
        {"name": "Ginebra (Suiza)", "category": "Science", "desc": "Particle physics and international scientific bodies.", "desc_es": "Física de partículas y organismos científicos internacionales.", "careers": ["c13", "c21"]},
        {"name": "Milán (Italia)", "category": "Design", "desc": "A world reference in industrial and product design.", "desc_es": "Referente mundial en diseño industrial y de producto.", "careers": ["c41", "c42"]},
        {"name": "Copenhague (Dinamarca)", "category": "Design", "desc": "Scandinavian design and sustainable architecture.", "desc_es": "Diseño escandinavo y arquitectura sostenible.", "careers": ["c36"]},
        {"name": "París (Francia)", "category": "Arts", "desc": "A historic art, publishing and audiovisual scene.", "desc_es": "Escena artística, editorial y audiovisual histórica.", "careers": ["c43", "c44"]},
        {"name": "Los Ángeles (EE. UU.)", "category": "Arts", "desc": "The film, music and animation industry.", "desc_es": "Industria del cine, la música y la animación.", "careers": ["c37", "c39", "c40"]},
        {"name": "Nueva York (EE. UU.)", "category": "Communication", "desc": "The world capital of financial markets.", "desc_es": "Sede de los grandes medios y agencias globales.", "careers": ["c48", "c73"]},
        {"name": "Doha (Catar)", "category": "Communication", "desc": "A hub for international media across the Middle East.", "desc_es": "Centro de medios internacionales para Oriente Medio.", "careers": ["c38"]},
        {"name": "La Haya (Países Bajos)", "category": "Law & Politics", "desc": "Home to the major international courts.", "desc_es": "Sede de las principales cortes internacionales.", "careers": ["c46"]},
        {"name": "Bruselas (Bélgica)", "category": "Law & Politics", "desc": "The institutional and diplomatic heart of Europe.", "desc_es": "Corazón institucional y diplomático de Europa.", "careers": ["c47", "c52"]},
        {"name": "Helsinki (Finlandia)", "category": "Education", "desc": "An education system studied the world over.", "desc_es": "Sistema educativo de referencia internacional.", "careers": ["c45"]},
        {"name": "Estocolmo (Suecia)", "category": "Social Sciences", "desc": "Social research and welfare policy.", "desc_es": "Investigación social y políticas de bienestar.", "careers": ["c49", "c50", "c51"]},
        {"name": "Costa Rica", "category": "Environment", "desc": "A model for conservation and renewable energy.", "desc_es": "Modelo de conservación y energía renovable.", "careers": ["c19", "c69", "c20"]},
        {"name": "Wageningen (Países Bajos)", "category": "Environment", "desc": "A world reference in agricultural and food science.", "desc_es": "Referencia mundial en ciencias agrarias y alimentación.", "careers": ["c67", "c25"]},
        {"name": "Toulouse (Francia)", "category": "Skilled Trades", "desc": "Europe's capital of the aerospace industry.", "desc_es": "Capital europea de la industria aeronáutica.", "careers": ["c65", "c66"]},
        {"name": "Lyon (Francia)", "category": "Skilled Trades", "desc": "Deep culinary tradition and elite chef training.", "desc_es": "Tradición gastronómica y formación culinaria de élite.", "careers": ["c68"]},
    ]

    def get_recommended_hubs(
        self, top_category: str, career_id: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Hubs de la categoria de la carrera, con los que sirven a ESA
        carrera en concreto primero.

        La categoria sola es demasiado gruesa. "Skilled Trades" agrupa
        Toulouse (aeronautica) y Lyon (gastronomia): sin afinar, a quien le
        salia Culinary Arts se le proponia Toulouse en primer lugar. Cada
        hub declara opcionalmente por que carreras es conocido de verdad
        (campo `careers`), y esas van delante.

        Si no hay ningun hub de la categoria se devuelve lista vacia. Antes
        se caia a los tres primeros de GLOBAL_HUBS, que es como recomendarle
        Silicon Valley a un perfil artistico; la UI ya sabe que decir cuando
        no hay destinos.
        """
        de_la_categoria = [hub for hub in self.GLOBAL_HUBS if hub["category"] == top_category]
        if not career_id:
            return de_la_categoria

        # Estable: dentro de cada grupo se conserva el orden de la lista.
        return sorted(
            de_la_categoria,
            key=lambda hub: 0 if career_id in (hub.get("careers") or []) else 1,
        )


class RoadmapPlanner:
    """
    Módulo de Planificación de Rutas (GPS Educativo).

    La ESPINA es la misma para todas las carreras -fundamentos, nivelacion,
    proyecto, salida profesional- porque ordena bien cualquier camino. Lo que
    cambia por carrera es el CONTENIDO de cada paso, y vive en
    data/roadmaps.json.

    Antes no cambiaba nada: los cuatro pasos eran identicos para las 73
    carreras salvo el nombre y la lista de brechas. En pantalla, Fisica
    mostraba exactamente lo mismo que Ingenieria de software.
    """

    # Las sub-tareas por carrera. Una carrera sin entrada usa solo la espina,
    # que es lo que habia antes: asi se puede ir escribiendo por tandas sin
    # dejar la aplicacion a medias por el camino.
    def __init__(self, roadmaps: Optional[Dict[str, Any]] = None):
        self.roadmaps = roadmaps or {}

    def build_roadmap(self, career_id: Optional[str], gaps: List[str],
                      vector: Optional[Dict[str, float]] = None,
                      career: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """El roadmap sale sin redactar: cada hito lleva su clave de texto y,
        cuando la carrera tiene ruta escrita, sus sub-tareas.

        `career_id` en vez del titulo porque el titulo esta traducido y el
        roadmap se guarda; el nombre de la carrera se resuelve al responder,
        contra el catalogo."""
        ruta = self.roadmaps.get(career_id or "") or {}

        checkpoints = [
            {"step": 1, "key": "roadmap.step1", "reward_xp": 100,
             "content": ruta.get("foundations")},
            # El paso de nivelacion NO se escribe a mano: sale del cruce entre
            # el perfil del estudiante y lo que pide la carrera, asi que es
            # distinto para cada persona aunque la carrera sea la misma.
            {"step": 2, "key": "roadmap.step2", "reward_xp": 250, "gaps": gaps,
             "content": self._levelling_step(gaps, vector, career)},
            {"step": 3, "key": "roadmap.step3", "reward_xp": 400,
             "content": ruta.get("project")},
            {"step": 4, "key": "roadmap.step4", "reward_xp": 600,
             "content": ruta.get("launch")},
        ]
        return {
            "career_id": career_id,
            "estimated_months": 8,
            "checkpoints": checkpoints,
        }

    @staticmethod
    def _levelling_step(gaps: List[str], vector: Optional[Dict[str, float]],
                        career: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        """Una sub-tarea por cada dimension donde el estudiante queda corto,
        con el numero que tiene y al que hay que llegar.

        Es lo mas personal del roadmap y no cuesta redactar nada: los dos
        numeros ya estan calculados. "Subir Habilidad tecnica de 5.0 a 9.5" es
        comprobable; "fortalecimiento de areas de oportunidad" no."""
        if not gaps or not vector or not career:
            return None
        requisitos = career.get("requirements") or {}
        items = [
            {"cluster": cluster,
             "from": round(vector[cluster], 1),
             "to": round(requisitos[cluster], 1)}
            for cluster in gaps
            # Solo si de verdad hay que subir. Sin esta comprobacion, una
            # dimension donde el estudiante ya va sobrado imprime un absurdo
            # -"subir Habilidad tecnica de 10.0 a 7.5"- y basta con que la
            # lista de brechas venga de otro calculo para que ocurra.
            if cluster in vector and cluster in requisitos
            and vector[cluster] < requisitos[cluster]
        ]
        return {"key": "levelling", "items": items} if items else None


# Aqui vivia LearningEngine.predict_growth, que devolvia dos "predicciones"
# para todo el mundo: que la capacidad analitica del estudiante creceria "un
# 15% en los proximos seis meses", y que su afinidad con la carrera le
# permitiria abordar proyectos "antes que la mayoria".
#
# Ninguna de las dos salia de ningun calculo. Eran cadenas fijas: el 15%, los
# seis meses y la comparacion con "la mayoria" estaban escritos a mano. La
# primera hablaba de la capacidad analitica aunque fuera el eje mas flojo del
# estudiante, y la segunda comparaba contra una poblacion que no existe -
# FuturePilot no tiene datos de nadie mas con quien comparar.
#
# Se eliminaron enteras. Los terminos del servicio dicen que esto no predice
# el futuro de nadie, y el codigo tenia que decir lo mismo.


class ResponseBuilder:
    """
    Ensamblador unificado de respuestas cognitivas.
    """
    def assemble(
        self,
        top_career: Optional[Dict[str, Any]],
        top_matches: List[Dict[str, Any]],
        roadmap: Optional[Dict[str, Any]],
        reasoning: Dict[str, Any],
        confidence: float,
        strengths: List[str],
        weaknesses: List[str],
        hubs: List[Dict[str, Any]],
        archetype_key: str,
        memory_updates: Dict[str, Any],
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
            archetype_key=archetype_key,
            memory_updates=memory_updates,
            next_actions=[
                {"key": "action.roadmap"},
                {"key": "action.hubs"},
                {"key": "action.practice"},
            ],
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

    # El orden importa: un saludo gana a una pregunta, y "opciones" cae en
    # `help` antes que en `career`.
    INTENT_ORDER = ("greeting", "farewell", "thanks", "help",
                    # `pressure` va antes que `career`: "mis papas quieren que
                    # estudie derecho" menciona una carrera, pero la pregunta
                    # no es sobre la carrera.
                    "pressure", "compare", "progress",
                    "roadmap", "career", "university", "skills", "motivation",
                    # `why` es el ultimo: solo tiene sentido como seguimiento,
                    # y "por que" aparece dentro de muchas otras preguntas.
                    "why")

    # Una diferencia menor de esto entre dos carreras no distingue nada: el
    # calculo tiene mas ruido que eso, y decir "te encaja mejor por 0.4
    # puntos" es dar una precision que no existe.
    COMPARE_MARGIN = 3.0

    # Por debajo de esta diferencia contra lo que pide la carrera no se
    # considera una carencia: estar en 6.8 donde piden 7.0 no es una brecha,
    # es la misma cosa medida con ruido.
    GAP_THRESHOLD = 1.0

    def __init__(self, memory_system: StudentMemorySystem, careers_db: List[Dict[str, Any]],
                 decision: Optional["DecisionEngine"] = None):
        self.memory_system = memory_system
        self.careers_db = careers_db
        # El MISMO motor de decision que puntua el test. Si el mentor
        # calculara la compatibilidad por su cuenta, sus numeros podrian
        # discrepar de los que ve el estudiante en su pantalla de resultados.
        self.decision = decision or DecisionEngine()

    def _detect_named_career(self, message: str) -> Optional[Dict[str, Any]]:
        """Si el mensaje menciona el nombre de una carrera real del
        catalogo (con limite de palabra, para no confundir un titulo corto
        con una palabra suelta), esa mencion tiene prioridad sobre la
        deteccion de intent generica - es la forma mas concreta de
        "razonar" sobre lo que el estudiante pregunto.

        Se buscan los titulos en los DOS idiomas: el estudiante puede
        escribir "psicologia" con la aplicacion en ingles."""
        encontradas = self._detect_named_careers(message)
        return encontradas[0] if encontradas else None

    def _detect_named_careers(self, message: str) -> List[Dict[str, Any]]:
        """Todas las carreras mencionadas, en el orden en que aparecen.

        Hace falta la lista y no solo la primera para poder comparar dos
        ("derecho o diseño?") y para distinguir "mis papas quieren derecho"
        -una carrera- de una comparacion."""
        lowered = message.lower()
        vistas: List[tuple] = []
        for career in self.careers_db:
            for field in ("title", "title_es"):
                title = (career.get(field) or "").strip().lower()
                if not title:
                    continue
                encaje = re.search(r"\b" + re.escape(title) + r"\b", lowered)
                if encaje:
                    vistas.append((encaje.start(), career))
                    break
        vistas.sort(key=lambda par: par[0])
        # Sin duplicados, conservando el orden de aparicion.
        salida, ids = [], set()
        for _, career in vistas:
            if career["id"] not in ids:
                ids.add(career["id"])
                salida.append(career)
        return salida

    # ------------------------------------------------------------------
    # Encaje contra los requisitos de la carrera
    # ------------------------------------------------------------------
    def _profile_fit(self, vector: Dict[str, float], career: Dict[str, Any],
                     lang: str) -> Dict[str, Any]:
        """Cruza el vector del estudiante con lo que pide la carrera.

        Cada carrera del catalogo declara un nivel por dimension
        (`requirements`), y el test produce un vector con esas mismas ocho
        dimensiones. El dato mas util que tiene el motor es la RESTA entre
        los dos, y hasta ahora no la calculaba nadie: el mentor hablaba de
        fortalezas y brechas en abstracto, sin decir contra que.

        Devuelve las dimensiones donde sobra y donde falta, con los dos
        numeros, para que el estudiante pueda comprobarlo el mismo."""
        requisitos = career.get("requirements") or {}
        if not vector or not requisitos:
            return {"strong": [], "short": []}

        fuerte, corto = [], []
        for cluster, pide in requisitos.items():
            tiene = vector.get(cluster)
            if tiene is None:
                continue
            diferencia = tiene - pide
            entrada = {
                "cluster": localization.cluster_label(cluster, lang),
                "score": round(tiene, 1),
                "needed": round(pide, 1),
                "diff": diferencia,
            }
            if diferencia >= 0:
                fuerte.append(entrada)
            elif diferencia <= -self.GAP_THRESHOLD:
                corto.append(entrada)

        # Las tres mas relevantes de cada lado. Listarlas todas convierte la
        # respuesta en una tabla que nadie lee.
        fuerte.sort(key=lambda e: e["diff"], reverse=True)
        corto.sort(key=lambda e: e["diff"])
        return {"strong": fuerte[:3], "short": corto[:3]}

    def _fit_sentence(self, vector: Dict[str, float], career: Dict[str, Any],
                      lang: str) -> str:
        """El encaje, redactado. Cadena vacia si no hay nada que decir."""
        encaje = self._profile_fit(vector, career, lang)
        titulo = localization.career_field(career, "title", lang)

        def listar(entradas):
            return localization.join(
                [localization.text("fit.item", lang, **{k: e[k] for k in ("cluster", "score", "needed")})
                 for e in entradas],
                lang,
            )

        partes = []
        if encaje["strong"]:
            partes.append(localization.text("fit.strong", lang, career=titulo,
                                            items=listar(encaje["strong"])))
        if encaje["short"]:
            partes.append(localization.text("fit.short", lang, items=listar(encaje["short"])))
        elif encaje["strong"]:
            partes.append(localization.text("fit.noGap", lang))

        return " ".join(partes)

    def _career_by_id(self, career_id: Optional[str]) -> Optional[Dict[str, Any]]:
        if not career_id:
            return None
        return next((c for c in self.careers_db if c.get("id") == career_id), None)

    def _match_pct(self, top_matches: List[Dict[str, Any]], career_id: str,
                   vector: Optional[Dict[str, float]] = None) -> Optional[float]:
        """La compatibilidad de esa carrera con el perfil.

        Se guardan solo las ocho mejores, pero el estudiante pregunta por
        cualquiera del catalogo - justamente por las que NO le salieron. Sin
        esto, la comparacion imprimia un guion donde deberia ir el numero, y
        preguntar por una carrera concreta no daba porcentaje alguno.

        Primero se busca en lo guardado (asi coincide exactamente con lo que
        ve en su pantalla) y, si no esta, se puntua al vuelo con el mismo
        motor de decision."""
        for match in top_matches:
            if match.get("career_id") == career_id:
                return match.get("match_percentage")

        if not vector:
            return None
        career = self._career_by_id(career_id)
        if not career:
            return None
        puntuadas = self.decision.rank_careers(vector, [career])
        return puntuadas[0]["match_percentage"] if puntuadas else None

    def _detect_intent(self, message: str) -> str:
        """La palabra clave se busca con limite de palabra y admitiendo el
        plural: "skill" tiene que reconocer "skills" y "habilidad" tiene que
        reconocer "habilidades", que es como escribe la gente. Sin el limite,
        "hi" saludaria dentro de "hilo"; sin el plural, la mitad de las
        preguntas caen en la respuesta generica."""
        lowered = message.lower()
        for intent in self.INTENT_ORDER:
            keywords = localization.MENTOR_KEYWORDS.get(intent, [])
            if any(re.search(rf"\b{re.escape(k)}(?:e?s)?\b", lowered) for k in keywords):
                return intent
        return "general"

    def _log_turn(self, memory: Dict[str, Any], user_id: str, user_message: str,
                  intent: str, career_id: Optional[str] = None) -> None:
        # De que carrera se hablo por ultima vez. Sin esto, un "¿por que?"
        # suelto no tiene a que referirse: el estudiante pregunta por lo que
        # se acaba de decir, no por su carrera principal.
        if career_id:
            memory["last_career_id"] = career_id

        chat_history = memory.setdefault("chat_history", [])
        chat_history.append({
            "timestamp": datetime.now().isoformat(),
            "message": user_message[:500],
            "intent": intent,
        })
        memory["chat_history"] = chat_history[-20:]
        self.memory_system.save_memory(user_id, memory)

    def chat(
        self,
        user_message: str,
        context: Optional[Dict[str, Any]] = None,
        lang: Optional[str] = None,
    ) -> str:
        context = context or {}
        user_id = context.get("user_id", "default_student")
        # Todo el ciclo load->responder->save queda bajo un solo lock por
        # user_id: dos mensajes de chat concurrentes para el mismo
        # estudiante (o un chat justo cuando termina un test) no deben
        # poder pisarse la memoria guardada entre ellos.
        with self.memory_system.lock(user_id):
            return self._chat_locked(user_message, context, user_id, localization.resolve(lang))

    def _say(self, key: str, lang: str, **params: Any) -> str:
        """Una de las variantes de `key`, ya interpolada.

        El catalogo tiene dos mitades: MENTOR_TEXTS son respuestas con varias
        redacciones -se elige una al azar para no sonar a disco rayado- y
        TEMPLATES son frases unicas. Se busca en las dos porque, si no, poner
        una clave en la mitad equivocada no da error: saca la clave en crudo
        a la pantalla del estudiante."""
        variantes = localization.MENTOR_TEXTS[localization.resolve(lang)].get(key)
        if variantes:
            return random.choice(variantes).format(**params)
        return localization.text(key, lang, **params)

    def _career_name(self, career_id: Optional[str], lang: str) -> Optional[str]:
        """El titulo de una carrera en el idioma pedido, buscado por id.

        Se guarda el id y no el nombre porque el nombre esta traducido: el
        mentor tiene que poder hablar de un test hecho en el otro idioma."""
        if not career_id:
            return None
        career = next((c for c in self.careers_db if c.get("id") == career_id), None)
        if not career:
            return None
        return localization.career_field(career, "title", lang)

    def _chat_locked(self, user_message: str, context: Dict[str, Any], user_id: str, lang: str) -> str:
        name = (context.get("name") or "").strip()
        greeting_name = f", {name}" if name else ""
        goals = context.get("passport_goals") or {}

        memory = self.memory_system.load_memory(user_id)
        history = memory.get("assessment_history", [])

        mencionadas = self._detect_named_careers(user_message)
        intent = self._detect_intent(user_message)
        # Una carrera mencionada gana a la deteccion generica, PERO no a las
        # intenciones que hablan de otra cosa aunque nombren una carrera:
        # "mis papas quieren que estudie derecho" no es una consulta sobre
        # derecho, y "derecho o diseño" tampoco.
        if len(mencionadas) >= 2 and intent not in ("pressure", "why"):
            intent = "compare"
        elif mencionadas and intent not in ("pressure", "compare", "why"):
            intent = "career_lookup"
        named_career = mencionadas[0] if mencionadas else None

        if not history:
            if intent == "greeting":
                response = self._say("noProfile.greeting", lang, name=greeting_name)
            elif intent in ("farewell", "thanks"):
                response = self._say("noProfile.bye", lang)
            else:
                response = self._say("noProfile.general", lang)
            self._log_turn(memory, user_id, user_message, intent)
            return response

        last = history[-1]
        # El vector es lo que el motor calcula con mas detalle -las ocho
        # dimensiones con su puntuacion- y hasta ahora el mentor no lo miraba.
        # Es lo que permite responder "por que" en vez de solo "cual".
        vector = last.get("vector") or {}
        top_matches = last.get("top_matches") or []
        roadmap = last.get("roadmap")
        strengths = localization.cluster_labels(last.get("strengths") or [], lang)
        weaknesses = localization.cluster_labels(last.get("weaknesses") or [], lang)
        hubs = last.get("recommended_hubs") or []

        top_choice = (
            self._career_name(last.get("top_choice_id"), lang)
            or self._say("fallback.career", lang)
        )
        personality = localization.archetype(last.get("archetype_key"), lang)["name"]

        def match_name(match: Dict[str, Any]) -> str:
            return self._career_name(match.get("career_id"), lang) or match.get("title", "")

        if intent == "greeting":
            response = self._say("greeting", lang, name=greeting_name,
                                 personality=personality, career=top_choice)

        elif intent == "farewell":
            response = self._say("farewell", lang, career=top_choice)

        elif intent == "thanks":
            response = self._say("thanks", lang)

        elif intent == "help":
            response = self._say("help", lang)

        elif intent == "career_lookup" and named_career:
            title = localization.career_field(named_career, "title", lang)
            description = localization.career_field(named_career, "description", lang)
            match = next((m for m in top_matches if m.get("career_id") == named_career.get("id")), None)
            if match:
                response = self._say("career.known", lang, career=title,
                                     pct=match["match_percentage"], description=description).strip()
            else:
                response = self._say("career.unknown", lang, career=title,
                                     description=description or self._say("career.noDetails", lang))
            # El encaje dimension por dimension. Vale igual para una carrera
            # que quedo fuera del top: saber POR QUE quedo fuera es
            # justamente lo que se esta preguntando.
            encaje = self._fit_sentence(vector, named_career, lang)
            if encaje:
                response = f"{response}\n\n{encaje}"

        elif intent == "pressure":
            # Alguien de fuera empuja hacia una carrera. No se le dice al
            # estudiante que hacer: se le dan sus numeros y el lenguaje para
            # defenderlos.
            propuesta = mencionadas[0] if mencionadas else None
            top_pct = top_matches[0]["match_percentage"] if top_matches else 0
            if propuesta:
                pct = self._match_pct(top_matches, propuesta["id"], vector)
                response = self._say(
                    "pressure.withCareer", lang,
                    fit=self._fit_sentence(vector, propuesta, lang),
                    top=top_choice, topPct=top_pct,
                    career=localization.career_field(propuesta, "title", lang),
                    pct=pct if pct is not None else "—",
                )
            else:
                response = self._say("pressure.noCareer", lang, top=top_choice, topPct=top_pct)

        elif intent == "compare":
            if len(mencionadas) < 2:
                response = self._say("compare.needTwo", lang)
            else:
                a, b = mencionadas[0], mencionadas[1]
                lineas = []
                puntos = {}
                for career in (a, b):
                    titulo = localization.career_field(career, "title", lang)
                    pct = self._match_pct(top_matches, career["id"], vector)
                    puntos[titulo] = pct
                    lineas.append(self._say(
                        "compare.line", lang, career=titulo,
                        pct=pct if pct is not None else "—",
                        fit=self._fit_sentence(vector, career, lang),
                    ))
                cabecera = self._say(
                    "compare.head", lang,
                    a=localization.career_field(a, "title", lang),
                    b=localization.career_field(b, "title", lang),
                )
                # El veredicto solo si la diferencia es mayor que el ruido del
                # calculo. Por debajo de eso, decir cual "gana" seria inventar
                # una precision que el numero no tiene.
                veredicto = ""
                validos = {k: v for k, v in puntos.items() if v is not None}
                if len(validos) == 2:
                    (t1, p1), (t2, p2) = sorted(validos.items(), key=lambda kv: kv[1], reverse=True)
                    veredicto = (
                        self._say("compare.verdict", lang, winner=t1, margin=round(p1 - p2, 1))
                        if p1 - p2 >= self.COMPARE_MARGIN
                        else self._say("compare.tie", lang)
                    )
                response = "\n".join([cabecera, *lineas] + ([veredicto] if veredicto else []))

        elif intent == "why":
            # Seguimiento corto. Se explica la ultima carrera de la que se
            # hablo; sin ese contexto no hay nada que explicar y se pregunta.
            referida = mencionadas[0] if mencionadas else self._career_by_id(
                memory.get("last_career_id") or last.get("top_choice_id")
            )
            encaje = self._fit_sentence(vector, referida, lang) if referida else ""
            response = (
                self._say("why.career", lang, fit=encaje) if encaje
                else self._say("why.noContext", lang)
            )

        elif intent == "progress":
            progreso = context.get("journey") or {}
            siguiente = progreso.get("next_step")
            response = (
                self._say("progress.body", lang,
                          percent=progreso.get("percent", 0),
                          step=localization.text(f"journey.{siguiente}", lang))
                if siguiente else self._say("progress.done", lang)
            )

        elif intent == "roadmap":
            if roadmap and roadmap.get("checkpoints"):
                steps = "; ".join(
                    f"{cp['step']}. {localization.checkpoint_text(cp, lang, top_choice)['title']}"
                    for cp in roadmap["checkpoints"]
                )
                career = self._career_name(roadmap.get("career_id"), lang) or top_choice
                response = self._say("roadmap.have", lang, career=career,
                                     months=roadmap.get("estimated_months", 8), steps=steps)
            else:
                response = self._say("roadmap.none", lang, career=top_choice)

        elif intent == "career":
            if len(top_matches) > 1:
                others = ", ".join(
                    f"{match_name(m)} ({m['match_percentage']}%)" for m in top_matches[1:4]
                )
                response = self._say("career.others", lang, career=top_choice,
                                     pct=top_matches[0]["match_percentage"], others=others)
            else:
                response = self._say("career.single", lang, career=top_choice)

        elif intent == "university":
            if hubs:
                hub_list = "; ".join(
                    f"{hub['name']} ({localization.hub_desc(hub, lang)})" for hub in hubs
                )
                response = self._say("university.have", lang, career=top_choice, hubs=hub_list)
            else:
                response = self._say("university.none", lang, career=top_choice)
            if goals.get("target_country"):
                response += self._say("university.goal", lang, country=goals["target_country"])

        elif intent == "skills":
            parts = []
            if strengths:
                parts.append(self._say("skills.strengths", lang, items=localization.join(strengths, lang)))
            if weaknesses:
                parts.append(self._say("skills.weaknesses", lang, items=localization.join(weaknesses, lang)))
            body = localization.join(parts, lang) if parts else self._say("skills.balanced", lang)
            response = self._say("skills.body", lang, body=body, career=top_choice)

        elif intent == "motivation":
            response = self._say("motivation", lang, career=top_choice)

        else:
            response = self._say("general", lang, career=top_choice)

        self._log_turn(memory, user_id, user_message, intent,
                       career_id=mencionadas[0]["id"] if mencionadas else None)
        return response


# =============================================================================
# CEREBRO PRINCIPAL: FUTUREPILOT BRAIN (ORCHESTRATOR)
# =============================================================================

class FuturePilotBrain:
    """
    Coordinador Central de Inteligencia Artificial para FuturePilot.
    Orquesta el flujo completo de módulos siguiendo el ciclo cognitivo.
    """

    def __init__(self, careers_data: List[Dict[str, Any]], questions_data: List[Dict[str, Any]],
                 roadmaps_data: Optional[Dict[str, Any]] = None):
        self.careers_db = careers_data
        self.questions_db = questions_data

        # Inicialización de módulos coordinados
        self.memory_system = StudentMemorySystem()
        self.perception = PerceptionEngine()
        self.profile_engine = ProfileEngine()
        self.reasoning = ReasoningEngine()
        self.decision = DecisionEngine()
        self.career_engine = CareerEngine()
        self.planner = RoadmapPlanner(roadmaps_data)
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
        archetype_key = self.reasoning.infer_archetype(user_vector)
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
            carrera = next(
                (c for c in self.careers_db if c.get("id") == top_match.get("career_id")), None
            )
            roadmap = self.planner.build_roadmap(
                top_match.get("career_id"), top_match["skill_gaps"],
                vector=user_vector, career=carrera,
            )
            recommended_hubs = self.career_engine.get_recommended_hubs(
                top_match.get("category", ""), top_match.get("career_id")
            )

        # Paso 7: Generar Justificación Razonada
        strengths = top_match.get("strengths", []) if top_match else []
        gaps = top_match.get("skill_gaps", []) if top_match else []
        reasoning = {
            "key": "reasoning",
            "career_id": top_match.get("career_id") if top_match else None,
            "params": {"confidence": int(confidence * 100)},
            "gaps": gaps,
        }

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
            "top_choice_id": top_match.get("career_id") if top_match else None,
            "top_matches": ranked_matches[:TOP_MATCHES_RETURNED],
            "roadmap": roadmap,
            "archetype_key": archetype_key,
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
            reasoning=reasoning,
            confidence=confidence,
            strengths=strengths,
            weaknesses=gaps,
            hubs=recommended_hubs,
            archetype_key=archetype_key,
            memory_updates={"assessments_count": user_memory["assessments_count"]},
        )


# =============================================================================
# CAPA DE COMPATIBILIDAD HACIA ATRÁS (FACADE)
# =============================================================================

class FuturePilotAIEcosystem:
    """
    Fachada adaptadora para mantener compatibilidad total con el servidor FastAPI (app.py).
    """
    def __init__(self, careers_data: List[Dict[str, Any]], questions_data: List[Dict[str, Any]],
                 roadmaps_data: Optional[Dict[str, Any]] = None):
        self.brain = FuturePilotBrain(careers_data, questions_data, roadmaps_data)
        self.mentor = MentorEngine(self.brain.memory_system, careers_data, self.brain.decision)

    def forget_student(self, user_id: str) -> bool:
        """Olvidar todo lo que el mentor sabe de alguien. La llama el borrado
        de cuenta: si no, el perfil sobrevive a la cuenta."""
        return self.brain.memory_system.forget(user_id)

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
        top_choice_id = (results.get("top_choice") or {}).get("career_id")
        with self.brain.memory_system.lock(user_id):
            self._sync_memory_locked(user_id, top_choice_id, results)

    def _sync_memory_locked(self, user_id: str, top_choice_id: Optional[str], results: Dict[str, Any]) -> None:
        memory = self.brain.memory_system.load_memory(user_id)
        memory["assessments_count"] = memory.get("assessments_count", 0) + 1
        memory.setdefault("assessment_history", []).append({
            "timestamp": datetime.now().isoformat(),
            "vector": results.get("user_vector"),
            "top_choice_id": top_choice_id,
            "top_matches": results.get("recommended_careers") or [],
            "roadmap": results.get("roadmap"),
            "archetype_key": results.get("archetype_key"),
            "strengths": results.get("strengths") or [],
            "weaknesses": results.get("weaknesses") or [],
            "recommended_hubs": results.get("recommended_hubs") or [],
        })
        self.brain.memory_system.save_memory(user_id, memory)

    # ------------------------------------------------------------------
    # Progreso del roadmap
    # ------------------------------------------------------------------
    def toggle_checkpoint(self, user_id: str, item_id: str, done: bool) -> List[str]:
        """Marca o desmarca una sub-tarea del roadmap y devuelve la lista
        completa de completadas.

        `completed_checkpoints` estaba en el esquema de la memoria desde el
        primer dia -en el archivo de cada estudiante, siempre vacio- y nada
        escribia nunca en el. Por eso la barra de progreso de /journey era un
        35% fijo en el HTML que no se movia al pulsar nada.

        Es idempotente: marcar dos veces lo mismo no lo duplica, y desmarcar
        algo que no estaba no falla. El cliente puede reintentar sin miedo."""
        with self.brain.memory_system.lock(user_id):
            memory = self.brain.memory_system.load_memory(user_id)
            hechos = list(memory.get("completed_checkpoints") or [])
            if done and item_id not in hechos:
                hechos.append(item_id)
            elif not done and item_id in hechos:
                hechos.remove(item_id)
            memory["completed_checkpoints"] = hechos
            self.brain.memory_system.save_memory(user_id, memory)
            return hechos

    def completed_checkpoints(self, user_id: str) -> List[str]:
        return list(self.brain.memory_system.load_memory(user_id).get("completed_checkpoints") or [])

    @staticmethod
    def _build_career_justification(match: Dict[str, Any]) -> Dict[str, Any]:
        """Justificacion propia de cada carrera (sus fortalezas y sus brechas)
        en vez de repetir el razonamiento general en las ocho.

        Devuelve la clave y los datos, no el texto: se redacta al responder,
        en el idioma pedido."""
        gaps = match.get("skill_gaps") or []
        return {
            "key": "justification.withGaps" if gaps else "justification.noGaps",
            "career_id": match.get("career_id"),
            "params": {"pct": match.get("match_percentage", 0)},
            "strengths": match.get("strengths") or [],
            "gaps": gaps,
        }

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
                "justification": self._build_career_justification(m),
                "description": m["description"]
            }
            for m in response.top_matches
        ]

        # Formato esperado por el API anterior, mas los campos que ya calcula
        # FuturePilotBrain (arquetipo, strengths/weaknesses, confidence,
        # recommended_hubs) y que antes se descartaban
        # aqui - necesarios para la vista de resultados completos.
        #
        # Lo que sale de aqui es la forma SIN TRADUCIR: claves de texto,
        # ids de carrera y clusters en mayusculas. Es lo que se guarda en
        # results_json. app.py lo pasa por _localize_results antes de
        # devolverlo. Ver localization.py.
        return {
            "user_id": user_id,
            "user_vector": self.brain.profile_engine.calculate_vector(
                self.brain.perception.parse_test_inputs(user_answers, self.brain.questions_db)
            ),
            "cluster_evidence": self.brain.profile_engine.cluster_evidence(
                self.brain.perception.parse_test_inputs(user_answers, self.brain.questions_db)
            ),
            "archetype_key": response.archetype_key,
            "strengths": response.strengths,
            "weaknesses": response.weaknesses,
            "confidence": response.confidence,
            "recommended_hubs": response.recommended_hubs,
            "next_actions": response.next_actions,
            "recommended_careers": recommended_careers,
            "top_choice": {
                **(response.top_career if response.top_career else {}),
                "justification": recommended_careers[0]["justification"] if recommended_careers else response.reasoning,
            },
            "roadmap": response.roadmap
        }