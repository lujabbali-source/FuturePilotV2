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

    for namespace in ("test.json", "common.json"):
        es = flatten(json.loads((LOCALES / "es" / namespace).read_text(encoding="utf-8")))
        en = flatten(json.loads((LOCALES / "en" / namespace).read_text(encoding="utf-8")))
        assert es == en, f"{namespace}: solo-es={sorted(es - en)} solo-en={sorted(en - es)}"


def test_every_cluster_has_a_label_in_both_languages(app_module):
    """La pantalla de perfil sin analisis nombra clusters. Uno sin etiqueta
    aparecería como "ANALYTICAL" en crudo."""
    clusters = set(app_module.ai_system.brain.profile_engine.CLUSTERS)
    for lang in ("es", "en"):
        etiquetas = json.loads((LOCALES / lang / "test.json").read_text(encoding="utf-8"))["cluster"]
        assert clusters <= set(etiquetas), f"{lang}: faltan {sorted(clusters - set(etiquetas))}"
