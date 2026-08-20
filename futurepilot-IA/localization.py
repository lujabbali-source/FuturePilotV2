"""Catalogo de textos del motor, en los dos idiomas.

El motor generaba su prosa con f-strings en castellano incrustadas en el
codigo: el arquetipo, la justificacion de cada carrera, el roadmap y las
predicciones. Con la aplicacion en ingles el estudiante veia media pantalla
en un idioma y media en otro.

La regla que sigue el modulo: **el motor produce claves y parametros, y el
texto se arma al responder**. No al calcular. Un resultado se guarda una vez
(`results_json`) y se relee muchas, y el estudiante puede cambiar de idioma
entre una cosa y la otra; si la prosa se congelara en el momento del
calculo, el test hecho en castellano se leeria en castellano para siempre.

Los clusters (ANALYTICAL, CREATIVE...) siguen siendo identificadores en
mayusculas dentro del motor. Aqui solo se les pone etiqueta.
"""

from typing import Any, Dict, Iterable, List, Optional

LANGS = ("en", "es")
DEFAULT_LANG = "en"


def resolve(lang: Optional[str]) -> str:
    """Un idioma desconocido cae al ingles: es una preferencia de
    presentacion, no algo por lo que fallar."""
    normalized = (lang or "").strip().lower()[:2]
    return normalized if normalized in LANGS else DEFAULT_LANG


# --------------------------------------------------------------------------
# Clusters de habilidad
# --------------------------------------------------------------------------
CLUSTER_LABELS: Dict[str, Dict[str, str]] = {
    "en": {
        "ANALYTICAL": "Analytical thinking",
        "CREATIVE": "Creativity",
        "SOCIAL": "Working with people",
        "LEADERSHIP": "Leadership",
        "TECHNICAL": "Technical skill",
        "SCIENTIFIC": "Scientific reasoning",
        "PRACTICAL": "Hands-on work",
        "ENTREPRENEURIAL": "Entrepreneurial drive",
    },
    "es": {
        "ANALYTICAL": "Pensamiento analítico",
        "CREATIVE": "Creatividad",
        "SOCIAL": "Trato con personas",
        "LEADERSHIP": "Liderazgo",
        "TECHNICAL": "Habilidad técnica",
        "SCIENTIFIC": "Razonamiento científico",
        "PRACTICAL": "Trabajo manual",
        "ENTREPRENEURIAL": "Iniciativa emprendedora",
    },
}


def cluster_label(cluster: str, lang: str) -> str:
    return CLUSTER_LABELS[resolve(lang)].get(cluster, cluster)


def cluster_labels(clusters: Iterable[str], lang: str) -> List[str]:
    return [cluster_label(cluster, lang) for cluster in clusters]


# --------------------------------------------------------------------------
# Arquetipos: (nombre, estilo de aprendizaje)
# --------------------------------------------------------------------------
ARCHETYPES: Dict[str, Dict[str, Dict[str, str]]] = {
    "methodical": {
        "en": {
            "name": "Methodical and technical",
            "style": "Learns best through structured projects and writing code.",
        },
        "es": {
            "name": "Metódico y tecnológico",
            "style": "Aprende mejor mediante proyectos estructurados y código.",
        },
    },
    "disruptive": {
        "en": {
            "name": "Disruptive innovator",
            "style": "Learns through visual experiments and hands-on challenges.",
        },
        "es": {
            "name": "Innovador disruptivo",
            "style": "Aprende mediante experimentos visuales y desafíos prácticos.",
        },
    },
    "empathetic": {
        "en": {
            "name": "Empathetic and interpersonal",
            "style": "Learns best through collaborative work.",
        },
        "es": {
            "name": "Interpersonal empático",
            "style": "Aprende mejor con metodologías colaborativas.",
        },
    },
    "adaptive": {
        "en": {
            "name": "Adaptive and multidisciplinary",
            "style": "Moves comfortably between logical reasoning and working with people.",
        },
        "es": {
            "name": "Multidisciplinario adaptativo",
            "style": "Se mueve con soltura entre el razonamiento lógico y el trato con personas.",
        },
    },
}

DEFAULT_ARCHETYPE = "adaptive"


def archetype(key: Optional[str], lang: str) -> Dict[str, str]:
    return ARCHETYPES.get(key or DEFAULT_ARCHETYPE, ARCHETYPES[DEFAULT_ARCHETYPE])[resolve(lang)]


# --------------------------------------------------------------------------
# Plantillas de prosa
# --------------------------------------------------------------------------
TEMPLATES: Dict[str, Dict[str, str]] = {
    "en": {
        "reasoning": (
            "Profile read ({personality}): with {confidence}% confidence, your answers "
            "point strongly towards {career}. Worth working on: {gaps}."
        ),
        "reasoning.noGaps": "your strongest areas",
        "reasoning.noCareer": "your profile",
        "justification.withGaps": (
            "At {pct}% compatibility, your profile ({personality}) lines up especially "
            "well on {strengths}. To get closer to {career}, work on {gaps}."
        ),
        "justification.noGaps": (
            "At {pct}% compatibility, your profile ({personality}) is a strong fit for "
            "{career}, thanks to {strengths}."
        ),
        "justification.noStrengths": "your overall profile",
        "prediction.growth": (
            "With steady practice, your analytical ability can grow by around 15% "
            "over the next six months."
        ),
        "prediction.projects": (
            "Your fit with {career} means you can take on intermediate-level projects "
            "sooner than most."
        ),
        "roadmap.gapsFallback": "advanced skills",
        "roadmap.step1.title": "Fundamentals and key concepts",
        "roadmap.step1.desc": "The groundwork {career} is built on.",
        "roadmap.step2.title": "Levelling up: {gaps}",
        "roadmap.step2.desc": "Shoring up the areas with most room to grow.",
        "roadmap.step3.title": "Portfolio project",
        "roadmap.step3.desc": "Something finished that shows what you can do.",
        "roadmap.step4.title": "Certification and first professional steps",
        "roadmap.step4.desc": "Formal validation and a way into real opportunities.",
        "hypothesis.bias": "The student leans strongly towards {cluster}, at {value}/10.",
        "hypothesis.stable": "The profile has held steady across {count} assessments.",
        "hypothesis.first": "First assessment: consistency still needs confirming.",
        # --- Fit against the career's requirements ------------------------
        "fit.strong": "{career} fits you on {items}.",
        "fit.short": "Where you fall short: {items}.",
        "fit.item": "{cluster} ({score} against the {needed} it asks for)",
        "fit.noGap": "There is no dimension where you fall short.",
        "fit.balanced": "Your profile is fairly even, so no career stands out strongly over the rest.",

        "pressure.withCareer": (
            "Here is what your data says. The decision is yours.\n\n"
            "{fit}\n\n"
            "Your closest match is still {top} at {topPct}%, and {career} comes out at {pct}%. "
            "That does not make {career} impossible — it means it would cost you more effort "
            "in the areas where you are weakest today.\n\n"
            "If you are going to talk it through at home, these numbers argue better than «I don't like it»."
        ),
        "pressure.noCareer": (
            "This is one of the hardest parts of choosing, and it is completely normal.\n\n"
            "What I have is your data: your profile points to {top} at {topPct}%, and that comes from "
            "your own answers, not from anyone's opinion. Tell me which career they are pushing for "
            "and I will show you how it fits you against that one."
        ),

        "compare.head": "{a} against {b}, with your profile:",
        "compare.line": "· {career}: {pct}% compatibility. {fit}",
        "compare.verdict": "On your numbers, {winner} fits you better by {margin} points.",
        "compare.tie": "On your numbers the two are almost even, so this one comes down to which you like more.",
        "compare.needTwo": "Name the two careers you want compared and I will put them side by side against your profile.",

        "progress.body": "You are {percent}% of the way through. Next up is {step}.",
        "progress.done": "You have completed all six milestones. From here the route is yours to set.",

        "why.career": "By the numbers: {fit}",
        "why.noContext": "About what exactly? Name the career or the figure and I will explain it.",
        "journey.test": "taking the vocational test",
        "journey.profile": "completing your identification in the passport",
        "journey.explore": "exploring three countries on the globe",
        "journey.universities": "discovering three universities",
        "journey.goal": "setting your target university",
        "journey.mentor": "talking to me",
        "levelling.item": "Raise {cluster} from {from_} to {to}",
        "action.roadmap": "Explore your roadmap",
        "action.hubs": "Review the global hubs",
        "action.practice": "Practise your weaker areas",
    },
    "es": {
        "reasoning": (
            "Lectura del perfil ({personality}): con un {confidence}% de confianza, tus "
            "respuestas apuntan con fuerza a {career}. Conviene trabajar: {gaps}."
        ),
        "reasoning.noGaps": "tus áreas más fuertes",
        "reasoning.noCareer": "tu perfil",
        "justification.withGaps": (
            "Con un {pct}% de compatibilidad, tu perfil ({personality}) encaja "
            "especialmente en {strengths}. Para acercarte más a {career}, conviene "
            "reforzar {gaps}."
        ),
        "justification.noGaps": (
            "Con un {pct}% de compatibilidad, tu perfil ({personality}) encaja con "
            "fuerza en {career}, gracias a {strengths}."
        ),
        "justification.noStrengths": "tu perfil general",
        "prediction.growth": (
            "Con práctica constante, tu capacidad analítica puede crecer alrededor de "
            "un 15% en los próximos seis meses."
        ),
        "prediction.projects": (
            "Tu afinidad con {career} te permite abordar proyectos de nivel intermedio "
            "antes que la mayoría."
        ),
        "roadmap.gapsFallback": "habilidades avanzadas",
        "roadmap.step1.title": "Fundamentos y conceptos clave",
        "roadmap.step1.desc": "Las bases sobre las que se sostiene {career}.",
        "roadmap.step2.title": "Nivelación en {gaps}",
        "roadmap.step2.desc": "Reforzar las áreas con más margen de mejora.",
        "roadmap.step3.title": "Proyecto para el portafolio",
        "roadmap.step3.desc": "Algo terminado que demuestre lo que sabes hacer.",
        "roadmap.step4.title": "Certificación y primeros pasos profesionales",
        "roadmap.step4.desc": "Validación formal y una vía hacia oportunidades reales.",
        "hypothesis.bias": "El estudiante muestra un sesgo fuerte hacia {cluster}, con {value}/10.",
        "hypothesis.stable": "El perfil se mantiene estable a lo largo de {count} evaluaciones.",
        "hypothesis.first": "Primer diagnóstico: falta confirmar la consistencia.",
        # --- Encaje contra los requisitos de la carrera -------------------
        # Cada carrera del catalogo declara que nivel pide en cada dimension.
        # Cruzarlo con el vector del estudiante es lo mas concreto que el
        # motor sabe decir, y hasta ahora no lo decia.
        "fit.strong": "{career} encaja contigo en {items}.",
        "fit.short": "Donde te queda lejos: {items}.",
        "fit.item": "{cluster} ({score} y pide {needed})",
        "fit.noGap": "No hay ninguna dimensión donde te quedes corto.",
        "fit.balanced": "Tu perfil está bastante parejo, así que ninguna carrera destaca con fuerza sobre las demás.",

        # --- Presion externa ----------------------------------------------
        "pressure.withCareer": (
            "Te cuento lo que dicen tus datos, y la decisión la tomas tú.\n\n"
            "{fit}\n\n"
            "Tu mejor coincidencia sigue siendo {top} con un {topPct}%, y {career} te da un {pct}%. "
            "Eso no significa que {career} sea imposible: significa que te costaría más esfuerzo "
            "en las áreas donde hoy estás más flojo.\n\n"
            "Si vas a hablarlo en casa, estos números son mejor argumento que «no me gusta»."
        ),
        "pressure.noCareer": (
            "Es de las cosas más difíciles de esto, y es normal.\n\n"
            "Lo que tengo son tus datos: tu perfil apunta a {top} con un {topPct}%, y sale de tus "
            "propias respuestas, no de una opinión. Si me dices qué carrera te están proponiendo, "
            "te digo cómo encaja contigo comparada con esa."
        ),

        # --- Comparar dos carreras ----------------------------------------
        "compare.head": "{a} contra {b}, con tu perfil:",
        "compare.line": "· {career}: {pct}% de compatibilidad. {fit}",
        "compare.verdict": "Con tus números, {winner} te encaja mejor por {margin} puntos.",
        "compare.tie": "Con tus números las dos te encajan casi igual, así que aquí decide lo que te guste más.",
        "compare.needTwo": "Dime las dos carreras que quieres comparar y te las pongo lado a lado con tu perfil.",

        # --- Progreso -------------------------------------------------------
        "progress.body": "Llevas {percent}% del recorrido. Lo que sigue es {step}.",
        "progress.done": "Has completado los seis hitos del recorrido. A partir de aquí lo marcas tú.",

        # --- Seguimiento ----------------------------------------------------
        "why.career": "Por los números: {fit}",
        "why.noContext": "¿Sobre qué en concreto? Dime la carrera o el dato y te lo explico.",
        # Nombre de cada hito del recorrido. El frontend tiene los suyos en
        # site.json; estos son para cuando el mentor los nombra en una frase.
        "journey.test": "hacer el test vocacional",
        "journey.profile": "completar tu identificación en el pasaporte",
        "journey.explore": "explorar tres países en el globo",
        "journey.universities": "descubrir tres universidades",
        "journey.goal": "fijar tu universidad objetivo",
        "journey.mentor": "hablar conmigo",
        "levelling.item": "Subir {cluster} de {from_} a {to}",
        "action.roadmap": "Explorar tu roadmap",
        "action.hubs": "Revisar los hubs globales",
        "action.practice": "Practicar tus áreas más flojas",
    },
}


def text(key: str, lang: str, **params: Any) -> str:
    """Un texto del catalogo, ya interpolado.

    Si la clave no existe se devuelve la clave misma. Es feo a proposito: se
    ve en pantalla y se corrige, en vez de dejar un hueco en blanco que nadie
    nota."""
    template = TEMPLATES[resolve(lang)].get(key)
    if template is None:
        return key
    return template.format(**params)


def join(items: List[str], lang: str) -> str:
    """Une una lista en prosa: "a, b y c" / "a, b and c"."""
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    conjunction = "y" if resolve(lang) == "es" else "and"
    return f"{', '.join(items[:-1])} {conjunction} {items[-1]}"


# --------------------------------------------------------------------------
# Mentor conversacional
# --------------------------------------------------------------------------
# Las palabras clave se buscan en los DOS idiomas a la vez, no en el que
# tenga puesto la interfaz. Alguien con la aplicacion en ingles puede
# escribir "carrera" perfectamente, y al reves; adivinar el idioma por el
# ajuste de pantalla seria dejar de entender a media base de usuarios.
MENTOR_KEYWORDS: Dict[str, List[str]] = {
    "greeting": ["hola", "buenas", "hey", "qué tal", "que tal", "hi", "hello", "good morning"],
    "farewell": ["adios", "adiós", "chao", "nos vemos", "bye", "hasta luego", "see you", "goodbye"],
    "thanks": ["gracias", "thank", "thanks"],
    "help": ["ayuda", "que puedes hacer", "qué puedes hacer", "en que me ayudas",
             "en qué me ayudas", "opciones", "help", "what can you do", "options"],
    "roadmap": ["roadmap", "pasos", "plan", "ruta", "checkpoint", "siguiente",
                "steps", "next", "route"],
    "career": ["carrera", "career", "profesion", "profesión", "trabajo", "job", "degree"],
    "university": ["universidad", "university", "estudiar", "hub", "pais", "país",
                   "destino", "study", "country", "abroad", "destination"],
    "skills": ["habilidad", "skill", "fortaleza", "debilidad", "gap", "mejorar",
               "strength", "weakness", "improve"],
    "motivation": ["animo", "ánimo", "motivacion", "motivación", "duda", "nervios",
                   "miedo", "inseguro", "motivation", "scared", "unsure", "doubt", "nervous"],
    # Quien decide una carrera casi nunca decide solo. Es de las cosas que
    # mas se preguntan y hasta ahora caia en la respuesta generica.
    "pressure": ["papa", "papá", "mama", "mamá", "papas", "papás", "padres", "familia",
                 "mis viejos", "quieren que", "me obligan", "presion", "presión",
                 "esperan que", "dad", "mom", "parents", "family", "they want me",
                 "pressure", "expect me"],
    "compare": ["comparar", "compara", "diferencia", "cual es mejor", "cuál es mejor",
                "o mejor", "versus", "vs", "compare", "difference", "which is better"],
    "progress": ["progreso", "avance", "como voy", "cómo voy", "que me falta",
                 "qué me falta", "progress", "how am i doing", "what is left"],
    "why": ["por que", "por qué", "porque", "porqué", "explica", "explicame",
            "explícame", "why", "explain", "how come"],
}

# Las listas son alternativas: se elige una al azar para que el mentor no
# suene a disco rayado. {name} llega vacio o como ", Ana".
MENTOR_TEXTS: Dict[str, Dict[str, List[str]]] = {
    "en": {
        "noProfile.greeting": [
            "Hi{name}! I'm your AI Mentor. I don't have a diagnosis for you yet — take the vocational test and I'll gladly help you read it.",
            "Good to see you{name}! Before I can guide you, I need you to take the FuturePilot test.",
        ],
        "noProfile.bye": ["Any time! I'll be here."],
        "noProfile.general": [
            "I don't have a diagnosis for you yet. Take the vocational test first and I'll gladly help you make sense of your results.",
        ],
        "greeting": [
            "Hi{name}! What can I help with today: your roadmap, your career, universities, or your skills?",
            "Hey{name}! Your profile ({personality}) points strongly towards {career}. What would you like to talk about?",
        ],
        "farewell": [
            "See you! Keep moving through your roadmap.",
            "Good luck with {career}! Come back whenever you like.",
        ],
        "thanks": ["Happy to help! That's what I'm here for.", "You're welcome! I'm here if you need anything else."],
        "help": [
            "I can help with: your roadmap step by step, your recommended career and other good fits, universities and hubs, your strengths and areas to work on, or a bit of encouragement. You can also ask me about any career in the catalogue by name.",
        ],
        "career.known": ["{career}: you're at {pct}% compatibility according to your diagnosis. {description}"],
        "career.unknown": ["{career} didn't make your top matches, but here's what it's about: {description}"],
        "career.noDetails": ["I don't have more details on it yet."],
        "roadmap.have": [
            "Your route towards {career} (~{months} months): {steps}. You can see it in full detail in Journey.",
        ],
        "roadmap.none": ["I don't have a detailed roadmap for {career} yet. Take the test again to generate one."],
        "career.others": ["Your best match is {career} ({pct}%). Also good fits: {others}."],
        "career.single": ["According to your latest diagnosis, your best match is {career}."],
        "university.have": ["For {career}, these hubs fit your profile: {hubs}."],
        "university.none": ["Have a look at the global hubs recommended for {career} in your Flight Plan."],
        "university.goal": [" I saw in your Passport that your goal is to study in {country} — worth comparing those hubs against it."],
        "skills.strengths": ["your strengths ({items})"],
        "skills.weaknesses": ["areas to work on ({items})"],
        "skills.balanced": ["a balanced profile, with no large gaps"],
        "skills.body": ["Based on your diagnosis you have {body}. Focus on closing the gaps towards {career}."],
        "motivation": [
            "Having doubts about which path to take is completely normal. Your diagnosis is built from your own answers, and {career} reflects real strengths of yours — take it one checkpoint at a time.",
            "Nobody has it all figured out on day one. {career} isn't a final verdict, it's a starting point we already know suits you.",
        ],
        "general": [
            "I can help with your roadmap, your recommended career ({career}), universities and hubs, your skills, or a bit of encouragement. You can also ask me about any career in the catalogue. What would you like to talk about?",
        ],
        "fallback.career": ["your vocational profile"],
        "fallback.personality": ["already analysed"],
    },
    "es": {
        "noProfile.greeting": [
            "¡Hola{name}! Soy tu AI Mentor. Todavía no tengo un diagnóstico tuyo — completa el test vocacional y con gusto te ayudo a interpretarlo.",
            "¡Qué bueno verte{name}! Para poder orientarte necesito que hagas primero el test de FuturePilot.",
        ],
        "noProfile.bye": ["¡Cuando quieras! Aquí estaré."],
        "noProfile.general": [
            "Todavía no tengo un diagnóstico tuyo. Completa el test de orientación vocacional primero y con gusto te ayudo a interpretar tus resultados.",
        ],
        "greeting": [
            "¡Hola{name}! ¿En qué te ayudo hoy: tu roadmap, tu carrera, universidades o tus habilidades?",
            "¡Hey{name}! Tu perfil ({personality}) apunta fuerte hacia {career}. ¿Sobre qué quieres hablar?",
        ],
        "farewell": [
            "¡Nos vemos! Sigue avanzando en tu roadmap.",
            "¡Éxitos con {career}! Vuelve cuando quieras.",
        ],
        "thanks": ["¡Con gusto! Para eso estoy.", "¡De nada! Aquí sigo si necesitas algo más."],
        "help": [
            "Puedo ayudarte con: tu roadmap paso a paso, tu carrera recomendada y otras opciones compatibles, universidades y hubs, tus fortalezas y áreas de mejora, o si necesitas ánimo. También puedes preguntarme directamente por cualquier carrera del catálogo por su nombre.",
        ],
        "career.known": ["{career}: tienes un {pct}% de compatibilidad según tu diagnóstico. {description}"],
        "career.unknown": ["{career} no quedó entre tus mejores matches, pero aquí tienes de qué se trata: {description}"],
        "career.noDetails": ["No tengo más detalles todavía."],
        "roadmap.have": [
            "Tu ruta hacia {career} (~{months} meses): {steps}. Puedes verla en detalle en Journey.",
        ],
        "roadmap.none": ["Todavía no tengo un roadmap detallado para {career}. Repite el test para generarlo."],
        "career.others": ["Tu mejor match es {career} ({pct}%). También compatibles: {others}."],
        "career.single": ["Según tu último diagnóstico, tu mejor match es {career}."],
        "university.have": ["Para {career}, estos hubs encajan con tu perfil: {hubs}."],
        "university.none": ["Revisa los hubs globales recomendados para {career} en tu Flight Plan."],
        "university.goal": [" Vi en tu Pasaporte que tu meta es estudiar en {country} — vale la pena comparar esos hubs con esa opción."],
        "skills.strengths": ["tus fortalezas ({items})"],
        "skills.weaknesses": ["áreas de oportunidad ({items})"],
        "skills.balanced": ["un perfil balanceado, sin brechas grandes"],
        "skills.body": ["Con base en tu diagnóstico tienes {body}. Enfócate en cerrar brechas hacia {career}."],
        "motivation": [
            "Es normal tener dudas al elegir un camino. Tu diagnóstico se basa en tus propias respuestas, y {career} refleja fortalezas reales tuyas — avanza un checkpoint a la vez.",
            "Nadie tiene todo resuelto desde el primer día. {career} no es una sentencia final, es un punto de partida que ya sabemos que encaja contigo.",
        ],
        "general": [
            "Puedo ayudarte con tu roadmap, tu carrera recomendada ({career}), universidades y hubs, tus habilidades, o si necesitas ánimo. También puedes preguntarme por cualquier carrera del catálogo. ¿Sobre qué quieres hablar?",
        ],
        "fallback.career": ["tu perfil vocacional"],
        "fallback.personality": ["ya analizado"],
    },
}


def mentor_options(key: str, lang: str) -> List[str]:
    """Todas las variantes de una respuesta del mentor. Quien llama elige."""
    return MENTOR_TEXTS[resolve(lang)].get(key) or [key]


# --------------------------------------------------------------------------
# Acceso a datos traducidos
# --------------------------------------------------------------------------
def career_field(career: Dict[str, Any], field: str, lang: str) -> str:
    """Un campo de una carrera en el idioma pedido.

    Convenio de careers.json: la clave pelada es el ingles y `_es` la
    traduccion. Si falta la traduccion se cae al ingles - una carrera sin
    traducir se lee; una carrera en blanco, no."""
    suffix = "" if resolve(lang) == "en" else f"_{resolve(lang)}"
    return career.get(f"{field}{suffix}") or career.get(field, "")


def hub_desc(hub: Dict[str, Any], lang: str) -> str:
    """La descripcion de un hub global. Mismo convenio que las carreras."""
    suffix = "" if resolve(lang) == "en" else f"_{resolve(lang)}"
    return hub.get(f"desc{suffix}") or hub.get("desc", "")


def checkpoint_content(content: Optional[Dict[str, Any]], lang: str) -> Optional[Dict[str, Any]]:
    """Traduce las sub-tareas de un hito del roadmap.

    Dos formas conviven. Las escritas a mano en roadmaps.json llevan
    `text`/`text_es`, mismo convenio que el resto de los datos. La de
    nivelacion no se escribe: se genera del cruce entre el perfil y lo que
    pide la carrera, y llega como {cluster, from, to} para redactarse aqui -
    asi el numero se presenta en el idioma correcto y el cluster no sale como
    identificador en mayusculas."""
    if not content:
        return None

    if content.get("key") == "levelling":
        return {
            "title": text("roadmap.step2.title", lang, career="", gaps=join(
                [cluster_label(i["cluster"], lang) for i in content.get("items", [])], lang
            )),
            "items": [
                text("levelling.item", lang, cluster=cluster_label(i["cluster"], lang),
                     from_=i["from"], to=i["to"])
                for i in content.get("items", [])
            ],
        }

    suffix = "" if resolve(lang) == "en" else f"_{resolve(lang)}"
    return {
        "title": content.get(f"title{suffix}") or content.get("title", ""),
        "items": [
            item.get(f"text{suffix}") or item.get("text", "")
            for item in content.get("items", [])
        ],
    }


def checkpoint_text(checkpoint: Dict[str, Any], lang: str, career: str) -> Dict[str, str]:
    """Redacta un hito del roadmap.

    El hito guardado es {step, key, reward_xp} y, en el de nivelacion, la
    lista de clusters flojos. El nombre de la carrera lo pasa quien llama,
    ya traducido."""
    key = checkpoint.get("key", "")
    gaps = cluster_labels(checkpoint.get("gaps") or [], lang)
    gaps_text = join(gaps, lang) or text("roadmap.gapsFallback", lang)
    return {
        "title": text(f"{key}.title", lang, career=career, gaps=gaps_text),
        "description": text(f"{key}.desc", lang, career=career, gaps=gaps_text),
    }
