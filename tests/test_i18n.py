"""Idioma del test vocacional: el banco de preguntas y su resolucion."""

import json
from pathlib import Path

import pytest

LOCALES = Path(__file__).resolve().parent.parent / "web" / "src" / "locales"


def test_every_question_and_answer_has_a_spanish_version(app_module):
    """El banco guarda el ingles y su traduccion en el MISMO registro, para
    que los metadatos de puntuacion existan una sola vez. Una traduccion
    que falte se sirve en ingles, asi que no rompe nada visible - por eso
    hace falta un test que lo detecte."""
    for question in app_module.questions_db:
        assert question.get("question_es"), f"sin traducir: {question['question']}"
        for answer in question["answers"]:
            assert answer.get("text_es"), f"respuesta sin traducir: {answer['text']}"


@pytest.mark.parametrize("lang,expected", [("es", "es"), ("en", "en"), ("fr", "en"), ("", "en")])
def test_questions_endpoint_resolves_the_language(client, lang, expected):
    """Un idioma no soportado cae al ingles en vez de dar error: es una
    preferencia de presentacion, no motivo para rechazar la peticion."""
    body = client.get(f"/api/v1/questions?lang={lang}").json()
    assert body["lang"] == expected


def test_spanish_and_english_differ_but_keep_the_same_scoring(client):
    """Lo unico que cambia entre idiomas es el texto. Si cambiara el
    cluster o los puntos, el mismo estudiante sacaria un perfil distinto
    segun el idioma en el que hiciera el test."""
    es = client.get("/api/v1/questions?lang=es").json()["questions"]
    en = client.get("/api/v1/questions?lang=en").json()["questions"]

    assert len(es) == len(en)
    assert [q["question"] for q in es] != [q["question"] for q in en]

    for q_es, q_en in zip(es, en):
        puntos_es = [(a["cluster"], a["points"]) for a in q_es["answers"]]
        puntos_en = [(a["cluster"], a["points"]) for a in q_en["answers"]]
        assert puntos_es == puntos_en, q_en["question"]


def test_localized_payload_hides_the_translation_suffixes(client):
    """El cliente recibe `question` y `text` como cadenas: no tiene por que
    saber que en disco hay sufijos por idioma."""
    for question in client.get("/api/v1/questions?lang=es").json()["questions"]:
        assert isinstance(question["question"], str)
        assert not any(key.endswith(("_es", "_en")) for key in question)
        for answer in question["answers"]:
            assert not any(key.endswith(("_es", "_en")) for key in answer)


def test_ui_namespaces_have_the_same_keys_in_both_languages():
    """Una clave que exista solo en un idioma se renderiza en el otro como
    el literal de la clave ("welcome.start") delante del estudiante."""

    def flatten(node, prefix=""):
        keys = set()
        for key, value in node.items():
            path = f"{prefix}{key}"
            keys |= flatten(value, f"{path}.") if isinstance(value, dict) else {path}
        return keys

    # Todos los namespaces, no una lista escrita a mano: uno nuevo tiene que
    # quedar cubierto sin que nadie se acuerde de añadirlo aqui.
    namespaces = sorted(p.name for p in (LOCALES / "es").glob("*.json"))
    assert namespaces, "no se encontro ningun archivo de idioma"

    for namespace in namespaces:
        en_path = LOCALES / "en" / namespace
        assert en_path.exists(), f"{namespace} existe en es pero no en en"
        es = flatten(json.loads((LOCALES / "es" / namespace).read_text(encoding="utf-8")))
        en = flatten(json.loads(en_path.read_text(encoding="utf-8")))
        assert es == en, f"{namespace}: solo-es={sorted(es - en)} solo-en={sorted(en - es)}"


def test_every_career_is_fully_translated(app_module):
    """El catalogo venia con el titulo y la categoria en ingles y la
    descripcion en castellano, asi que se veia mezclado en los DOS idiomas a
    la vez. Media traduccion no se nota al programar y se nota mucho en
    pantalla."""
    for career in app_module.careers_db:
        for field in ("title", "category", "description"):
            assert career.get(field), f"{career['id']}: falta {field} en ingles"
            assert career.get(f"{field}_es"), f"{career['id']}: falta {field}_es"


def test_careers_endpoint_translates_but_keeps_the_matching_key(client):
    """La categoria que se pinta va traducida; la que usa ai_engine para
    emparejar hubs globales tiene que seguir siendo la inglesa, o media
    aplicacion se queda sin ciudades recomendadas."""
    es = client.get("/api/v1/careers?lang=es").json()["careers"]
    en = client.get("/api/v1/careers?lang=en").json()["careers"]

    assert [c["id"] for c in es] == [c["id"] for c in en]
    assert [c["title"] for c in es] != [c["title"] for c in en]
    # La clave de emparejamiento no depende del idioma.
    assert [c["category_key"] for c in es] == [c["category_key"] for c in en]
    # Y el cliente no ve los sufijos de traduccion.
    assert not any(k.endswith(("_es", "_en")) for k in es[0])


def test_results_are_stored_untranslated_and_read_in_any_language(client, sample_answers):
    """El resultado se guarda en bruto (claves de texto e ids) y se redacta
    al devolverlo. Ese es el motivo: un test hecho en castellano se tiene que
    poder releer en ingles, sin repetirlo."""
    es = client.post("/api/v1/assess?lang=es", json={"answers": sample_answers}).json()["data"]
    en = client.post("/api/v1/assess?lang=en", json={"answers": sample_answers}).json()["data"]

    assert es["recommended_careers"][0]["career_id"] == en["recommended_careers"][0]["career_id"]
    for field in ("personality", "learning_style"):
        assert es[field] and en[field] and es[field] != en[field], field

    # Nada de lo que se pinta puede quedarse como identificador en crudo.
    assert not any(s.isupper() for s in es["strengths"]), es["strengths"]
    assert not any(s.isupper() for s in en["strengths"]), en["strengths"]

    # Ni como clave de plantilla sin resolver.
    for texto in [es["top_choice"]["justification"], en["top_choice"]["justification"],
                  *es["future_predictions"], *en["future_predictions"]]:
        assert " " in texto, f"clave sin redactar: {texto}"

    # El roadmap tambien: es lo que lee Journey.
    for datos in (es, en):
        for checkpoint in datos["roadmap"]["checkpoints"]:
            assert checkpoint["title"] and " " in checkpoint["title"]
            assert "{" not in checkpoint["description"]


def test_unknown_language_falls_back_to_english_everywhere(client, sample_answers):
    """Un idioma que no existe no puede dejar la pantalla en blanco."""
    fr = client.post("/api/v1/assess?lang=fr", json={"answers": sample_answers}).json()
    en = client.post("/api/v1/assess?lang=en", json={"answers": sample_answers}).json()
    assert fr["lang"] == "en"
    assert fr["data"]["personality"] == en["data"]["personality"]


def test_every_archetype_and_template_exists_in_both_languages():
    """Una plantilla que falte se devuelve como su propia clave
    ("justification.withGaps") y aparece asi delante del estudiante."""
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "futurepilot-IA"))
    import localization

    en, es = localization.TEMPLATES["en"], localization.TEMPLATES["es"]
    assert set(en) == set(es), f"solo-en={sorted(set(en) - set(es))} solo-es={sorted(set(es) - set(en))}"

    for key, archetype in localization.ARCHETYPES.items():
        assert set(archetype) == {"en", "es"}, key
        for lang in ("en", "es"):
            assert archetype[lang]["name"] and archetype[lang]["style"], f"{key}/{lang}"

    assert set(localization.CLUSTER_LABELS["en"]) == set(localization.CLUSTER_LABELS["es"])
    assert set(localization.MENTOR_TEXTS["en"]) == set(localization.MENTOR_TEXTS["es"])


def test_every_global_hub_has_both_descriptions():
    """Los hubs se pintan en el Flight Plan. Uno sin traducir mete una frase
    en castellano en medio de la pantalla en ingles."""
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "futurepilot-IA"))
    from ai_engine import CareerEngine

    for hub in CareerEngine.GLOBAL_HUBS:
        assert hub.get("desc"), f"{hub['name']}: sin descripcion en ingles"
        assert hub.get("desc_es"), f"{hub['name']}: sin descripcion en castellano"


def test_every_cluster_has_a_label_in_both_languages(app_module):
    """La pantalla de perfil sin analisis nombra clusters. Uno sin etiqueta
    aparecería como "ANALYTICAL" en crudo."""
    clusters = set(app_module.ai_system.brain.profile_engine.CLUSTERS)
    for lang in ("es", "en"):
        etiquetas = json.loads((LOCALES / lang / "test.json").read_text(encoding="utf-8"))["cluster"]
        assert clusters <= set(etiquetas), f"{lang}: faltan {sorted(clusters - set(etiquetas))}"


def test_legacy_results_can_still_be_read_in_both_languages(app_module, client, register_and_login):
    """Los resultados guardados antes de este cambio traian la prosa ya
    escrita en castellano, y se quedaban asi para siempre: con la aplicacion
    en ingles el arquetipo, la justificacion y el roadmap seguian saliendo
    en castellano. Es la mezcla que se ve en pantalla.

    Todo lo necesario para rehacerlos esta guardado (el vector da el
    arquetipo, cada carrera guarda su id y sus clusters), asi que se
    reconstruyen al leerlos en vez de pedirle a nadie que repita el test."""
    antiguo = {
        "user_vector": {"ANALYTICAL": 4.0, "CREATIVE": 9.0, "SOCIAL": 8.0, "LEADERSHIP": 3.0,
                        "TECHNICAL": 3.0, "SCIENTIFIC": 4.0, "PRACTICAL": 5.0,
                        "ENTREPRENEURIAL": 4.0},
        "personality": "Innovador Disruptivo",
        "learning_style": "Aprende mediante experimentos visuales y desafíos prácticos.",
        "strengths": ["SOCIAL", "CREATIVE"],
        "weaknesses": ["ANALYTICAL"],
        "confidence": 0.92,
        "recommended_careers": [{
            "career_id": "c43", "title": "Creative Writing", "category": "Arts",
            "match_percentage": 92.3, "strengths": ["SOCIAL", "CREATIVE"],
            "skill_gaps": ["ANALYTICAL"],
            "justification": "Con un 92.3% de compatibilidad, tu perfil (Innovador Disruptivo) ...",
            "description": "Construye narrativas...",
        }],
        "top_choice": {"career_id": "c43", "title": "Creative Writing",
                       "justification": "Con un 92.3% de compatibilidad, ..."},
        "roadmap": {"career_title": "Creative Writing", "estimated_months": 8, "checkpoints": [
            {"step": 1, "title": "Fundamentos y Conceptos Clave", "reward_xp": 100,
             "description": "Bases esenciales para Creative Writing."},
            {"step": 2, "title": "Nivelación en ANALYTICAL", "reward_xp": 250,
             "description": "Fortalecimiento de áreas de oportunidad."},
        ]},
        "future_predictions": ["Con práctica constante, ...", "Tu alineación con ..."],
        "recommended_hubs": [{"name": "París (Francia)", "category": "Arts",
                              "desc": "Escena artística, editorial y audiovisual histórica."}],
    }
    original = json.dumps(antiguo, sort_keys=True)

    es = app_module._localize_results(antiguo, "es")
    en = app_module._localize_results(antiguo, "en")

    # Lo que estaba congelado en castellano ahora responde al idioma.
    assert es["personality"] != en["personality"]
    assert es["learning_style"] != en["learning_style"]
    assert es["strengths"] != en["strengths"]
    assert en["recommended_careers"][0]["justification"].startswith("At 92.3%")
    assert es["recommended_careers"][0]["justification"].startswith("Con un 92.3%")
    assert en["roadmap"]["checkpoints"][0]["title"] == "Fundamentals and key concepts"
    assert en["recommended_hubs"][0]["desc"].startswith("A historic art")

    # Ni una etiqueta de cluster en crudo se escapa a la pantalla.
    for datos in (es, en):
        assert not any(s.isupper() for s in datos["strengths"]), datos["strengths"]
        assert "ANALYTICAL" not in datos["roadmap"]["checkpoints"][1]["title"]

    # Y traducir NO puede modificar lo que se recibio: si lo hiciera, la
    # segunda lectura traduciria sobre lo ya traducido en la primera y las
    # dos lenguas acabarian mezcladas en la misma frase.
    assert json.dumps(antiguo, sort_keys=True) == original
    otra_vez = app_module._localize_results(antiguo, "en")
    assert otra_vez["recommended_careers"][0]["justification"] == \
        en["recommended_careers"][0]["justification"]
