# -*- coding: utf-8 -*-
"""Material de estudio del roadmap.

El roadmap decia que aprender y ahi se acababa: "Aprende estadistica" da por
hecho que el estudiante sabe donde se aprende estadistica, que es justo lo que
no sabe quien todavia esta escogiendo carrera.
"""
import json
from pathlib import Path
from urllib.parse import unquote_plus, urlparse

import pytest

RAIZ = Path(__file__).resolve().parent.parent
CATALOGO = json.loads((RAIZ / "futurepilot-IA" / "data" / "resources.json").read_text(encoding="utf-8"))

# Los unicos sitios a los que se manda a un estudiante. La lista corta es el
# punto: cada uno esta aqui porque alguien comprobo que existe.
HOSTS = {
    "www.youtube.com", "es.wikipedia.org", "en.wikipedia.org", "ocw.mit.edu",
    "www.coursera.org", "docs.python.org", "developer.mozilla.org",
    "es.khanacademy.org", "openstax.org", "exercism.org", "www.freecodecamp.org",
}


@pytest.fixture()
def biblioteca(app_module):
    import resources
    return resources.library()


def _urls_del_catalogo():
    for plantilla in CATALOGO["search"].values():
        yield plantilla
    for tema, cuerpo in CATALOGO["topics"].items():
        for recurso in cuerpo.get("resources", []):
            if recurso.get("url"):
                yield recurso["url"]


def test_no_link_points_at_a_host_nobody_checked():
    """La regla que le da sentido a todo esto: aqui no se inventan enlaces.

    Son 735 sub-tareas y nadie puede verificar dos mil URLs a mano. La unica
    forma de que el material sea confiable es que los destinos salgan de una
    lista corta y conocida - un dominio nuevo que aparezca sin que nadie lo
    haya mirado es exactamente el fallo que este test existe para impedir.
    """
    intrusos = sorted({
        urlparse(url).netloc for url in _urls_del_catalogo()
        if urlparse(url).netloc not in HOSTS
    })
    assert not intrusos, f"dominios sin verificar: {intrusos}"


def test_every_link_is_https():
    inseguros = [u for u in _urls_del_catalogo() if not u.startswith("https://")]
    assert not inseguros, f"enlaces sin https: {inseguros}"


def test_a_subject_gets_material(biblioteca):
    """El caso que motiva la funcion."""
    recursos = biblioteca.resources_for("Estadística descriptiva y distribuciones", "es")
    assert recursos, "una materia estudiable tiene que traer material"
    assert {r["kind"] for r in recursos} <= {"video", "practice", "read"}
    assert all(r["url"].startswith("https://") and r["label"] for r in recursos)


@pytest.mark.parametrize("texto", [
    "Consigue una pasantía en un hospital",
    "Visita una planta o un laboratorio analítico y ve la escala",
    "Habla con gente que ya esté en la industria sobre los horarios",
    "Una pasantía de verano o una monitoría",
    "Voluntariado hospitalario o trabajo en salud comunitaria",
])
def test_going_out_into_the_world_gets_no_buttons(biblioteca, texto):
    """Ninguna pagina web te consigue una pasantia.

    Si todo llevara botones, los botones dejarian de significar algo: el valor
    de que aparezcan esta en que no aparecen siempre."""
    assert biblioteca.resources_for(texto, "es") == []


def test_a_named_subject_survives_the_query(biblioteca):
    """Las mejores sub-tareas no empiezan por verbo, son el nombre de la
    materia. Una primera version quitaba siempre la primera palabra y dejaba
    "Estadistica descriptiva" en "descriptiva"."""
    assert biblioteca._consulta("Estadística descriptiva y distribuciones", "es") \
        == "Estadística descriptiva"
    assert biblioteca._consulta("Aprende mecánica de suelos", "es") == "mecánica"


def test_a_whole_sentence_does_not_become_the_search(biblioteca):
    """Buscar "README que le permita a un desconocido ejecutarla" no devuelve
    nada util. Se corta en el nexo y se le pega la carrera, que es el contexto
    que a la frase suelta le falta."""
    consulta = biblioteca._consulta(
        "Un README que le permita a un desconocido ejecutarla", "es",
        career="Ingeniería de Software",
    )
    assert consulta == "README Ingeniería de Software"


def test_the_material_speaks_the_students_language(biblioteca):
    es = biblioteca.resources_for("Aprende Python: sintaxis y funciones", "es")
    en = biblioteca.resources_for("Learn Python: syntax and functions", "en")
    assert es and en
    assert [r["label"] for r in es] != [r["label"] for r in en]
    # Y la busqueda de video va en el idioma correcto.
    consulta_es = unquote_plus(es[0]["url"].split("search_query=")[-1])
    assert "español" in consulta_es or "curso" in consulta_es


def test_the_roadmap_arrives_with_its_material(client, register_and_login, sample_answers):
    """De punta a punta: lo que llega al navegador."""
    _, headers = register_and_login()
    client.post("/api/v1/assess", json={"answers": sample_answers, "lang": "es"}, headers=headers)

    datos = client.get("/api/v1/me/results?lang=es", headers=headers).json()
    pasos = datos["results"]["roadmap"]["checkpoints"]

    items = [i for cp in pasos if cp.get("content") for i in cp["content"]["items"]]
    assert items, "el roadmap llego sin sub-tareas"
    # La forma cambio de cadena a objeto: si alguien la revierte, el frontend
    # pinta "[object Object]" y esto lo dice antes.
    assert all(isinstance(i, dict) and i.get("text") for i in items)
    assert any(i["resources"] for i in items), "ninguna sub-tarea trajo material"

    for item in items:
        for recurso in item["resources"]:
            assert urlparse(recurso["url"]).netloc in HOSTS
            assert recurso["kind"] in ("video", "practice", "read")


def test_a_topic_never_offers_the_same_kind_twice():
    """En pantalla se leia "Practica / Practica" y el estudiante no tiene forma
    de saber cual es cual. Tres botones solo sirven si son tres cosas
    distintas: mirar, practicar y leer."""
    repetidos = {}
    for tema, cuerpo in CATALOGO["topics"].items():
        vistos = [r.get("kind", "read") for r in cuerpo.get("resources", [])]
        duplicados = {k for k in vistos if vistos.count(k) > 1}
        if duplicados:
            repetidos[tema] = sorted(duplicados)
    assert not repetidos, f"temas con el mismo tipo repetido: {repetidos}"
