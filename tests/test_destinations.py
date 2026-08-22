# -*- coding: utf-8 -*-
"""El clasificador de destinos.

Dos niveles, ningun porcentaje, y cada ciudad con el motivo por el que
aparece. La logica vive en el cliente (web/src/services/destinationService.js)
porque ahi es donde vive el catalogo de ciudades; aqui se vigilan las reglas
que sostienen su honestidad, que son de datos y no de JavaScript.
"""
import json
import re
import unicodedata
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
SERVICIO = RAIZ / "web" / "src" / "services" / "destinationService.js"
PANEL = RAIZ / "web" / "src" / "components" / "DestinationPanel.jsx"
LOCALES = RAIZ / "web" / "src" / "locales"
AMERICAS = RAIZ / "web" / "src" / "database" / "countries" / "americas"
COLOMBIA = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"


def _ciudades():
    """Las ciudades curadas, con el idioma en que se estudia."""
    salida = []
    archivos = [f for f in AMERICAS.glob("*.js") if f.name != "index.js"]
    archivos += [f for f in COLOMBIA.glob("*.js") if f.name != "index.js"]
    for archivo in archivos:
        texto = archivo.read_text(encoding="utf-8")
        for trozo in texto.split("defineCity(")[1:]:
            nombre = re.search(r'name:\s*"([^"]+)"', trozo)
            idioma = re.search(r'language:\s*"([^"]+)"', trozo)
            salida.append({
                "archivo": archivo.stem,
                "name": nombre.group(1) if nombre else None,
                "language": idioma.group(1) if idioma else None,
                "universities": trozo.count("defineUniversity("),
            })
    return salida


def test_there_are_two_tiers_and_only_two():
    """Tres niveles insinuarian una precision que no existe. El tercero que se
    propuso - "posibilidad condicionada" - necesitaria costos, y hay costo de
    vida en 1 de 223 ciudades. Se añade cuando haya datos, no antes."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    niveles = re.search(r"export const TIERS = \{([^}]*)\}", codigo)
    assert niveles, "no se encontro la definicion de niveles"
    assert len(re.findall(r"\w+:", niveles.group(1))) == 2


def test_no_destination_carries_a_percentage():
    """"Madrid 94% compatible" suena a que alguien lo midio. Nadie lo midio:
    lo que hay es idioma, geografia y una respuesta sobre salir del pais."""
    for archivo in (SERVICIO, PANEL):
        texto = archivo.read_text(encoding="utf-8")
        assert "match_percentage" not in texto
        assert not re.search(r"\bpercent|\bpct\b|%\s*compat", texto, re.I), \
            f"{archivo.name} habla de porcentajes"


def test_the_reasons_the_code_emits_all_have_wording():
    """Una razon sin texto sale en pantalla como
    `destinations.reasons.language`, que es peor que no explicar nada."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    emitidas = set(re.findall(r'\{\s*key:\s*"(\w+)"', codigo))
    assert emitidas, "el clasificador no emite ninguna razon"

    for lang in ("es", "en"):
        catalogo = json.loads((LOCALES / lang / "globe.json").read_text(encoding="utf-8"))
        escritas = set((catalogo.get("destinations") or {}).get("reasons") or {})
        faltan = emitidas - escritas
        assert not faltan, f"razones sin texto en {lang}: {sorted(faltan)}"


def test_the_two_languages_say_the_same_things():
    es = json.loads((LOCALES / "es" / "globe.json").read_text(encoding="utf-8"))["destinations"]
    en = json.loads((LOCALES / "en" / "globe.json").read_text(encoding="utf-8"))["destinations"]
    assert set(es) == set(en)
    assert set(es["reasons"]) == set(en["reasons"])


def test_the_screen_says_what_it_is_not():
    """Un estudiante no puede salir de aqui creyendo que le prometimos una
    admision. El aviso va en la pantalla, no enterrado en los terminos."""
    for lang, palabras in (("es", ("garantía de admisión", "migratorio")),
                           ("en", ("admission guarantee", "immigration"))):
        catalogo = json.loads((LOCALES / lang / "globe.json").read_text(encoding="utf-8"))
        aviso = catalogo["destinations"]["caveat"]
        for palabra in palabras:
            assert palabra in aviso, f"el aviso en {lang} no menciona {palabra!r}"
    assert 'className="dest-panel__caveat"' in PANEL.read_text(encoding="utf-8")


def test_the_language_signal_has_something_to_read():
    """El nivel fuerte se apoya sobre todo en el idioma. Si las ciudades
    dejaran de traerlo, todo caeria al monton de "revisalo" sin que nadie se
    diera cuenta: no hay error, solo recomendaciones peores."""
    ciudades = _ciudades()
    assert len(ciudades) > 200, f"solo {len(ciudades)} ciudades leidas"
    con_idioma = [c for c in ciudades if c["language"]]
    assert len(con_idioma) / len(ciudades) > 0.9, (
        f"solo {len(con_idioma)} de {len(ciudades)} ciudades dicen en que idioma se estudia"
    )


def test_a_city_with_nowhere_to_study_is_not_a_destination():
    """No es un filtro de calidad: es que no hay nada que ir a estudiar. La
    regla tiene que estar en el codigo, porque el catalogo si trae ciudades
    sin universidades."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    assert re.search(r"if \(!universidades\) continue", codigo), \
        "el clasificador ya no descarta las ciudades sin universidades"
    sin_ninguna = [c for c in _ciudades() if not c["universities"]]
    assert sin_ninguna, (
        "ninguna ciudad del catalogo esta sin universidades: el test no esta "
        "comprobando nada real, revisa la regla"
    )


def test_saying_you_would_rather_stay_is_respected():
    """La unica preferencia que bloquea. A quien contesto que por ahora
    prefiere quedarse, llenarle la pantalla de destinos extranjeros contradice
    lo que acaba de responder."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    assert re.search(r'mobility === "prefer_home".*continue', codigo, re.S), \
        "prefer_home ya no filtra los destinos de fuera"


def test_what_we_do_not_know_is_said_out_loud():
    """Sin esto, que una ciudad no tenga pegas listadas se lee como que no las
    tiene. Hay costo de vida en 1 de 223: el silencio enganaria en 222."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    assert 'key: "checkCosts"' in codigo
    assert "costOfLiving?.monthlyEstimate" in codigo


# ---------------------------------------------------------------------------
# Volar al destino
# ---------------------------------------------------------------------------
APP = RAIZ / "web" / "src" / "App.jsx"
CAMARA = RAIZ / "web" / "src" / "components" / "camera" / "CameraController.jsx"


def test_choosing_a_destination_selects_its_country_too():
    """El panel de ciudad y los marcadores cuelgan del pais seleccionado.
    Eligiendo solo la ciudad, la tarjeta se abria sobre un globo que seguia
    mirando a otra parte: se hacia clic en Ciudad de Mexico y no pasaba nada
    visible."""
    codigo = APP.read_text(encoding="utf-8")
    manejador = re.search(r"handleDestinationSelect = useCallback\((.*?)\n  \}, \[\]\);",
                          codigo, re.S)
    assert manejador, "no existe el manejador de destino"
    cuerpo = manejador.group(1)
    assert "setSelectedCountry" in cuerpo
    assert "setSelectedCity" in cuerpo
    assert "setCameraTarget" in cuerpo


def test_a_city_is_approached_closer_than_a_country():
    """A la distancia de un pais, una ciudad es un pixel y el vuelo no se
    distingue de no haber hecho nada."""
    codigo = APP.read_text(encoding="utf-8")
    distancias = [float(x) for x in re.findall(r"setCameraDistance\(([\d.]+)\)", codigo)]
    assert distancias, "nadie fija la distancia de camara"
    assert min(distancias) < 2.15, "ninguna vista se acerca mas que un pais"


def test_the_camera_still_has_a_default_for_countries():
    """La distancia se hizo configurable para las ciudades. Si el valor por
    defecto se perdiera, los paises - que llevan funcionando desde antes -
    volarian a donde toque."""
    assert re.search(r"distance = 2\.15", CAMARA.read_text(encoding="utf-8")), \
        "CameraController perdio su distancia por defecto"


def test_a_destination_without_coordinates_still_goes_somewhere():
    """Hoy las 223 ciudades tienen coordenadas, pero el catalogo crece. Una
    ciudad nueva sin ellas no puede dejar el globo quieto sin explicacion."""
    cuerpo = re.search(r"handleDestinationSelect = useCallback\((.*?)\n  \}, \[\]\);",
                       APP.read_text(encoding="utf-8"), re.S).group(1)
    assert "getCountryCenter" in cuerpo, "sin coordenadas no hay plan B"
    assert "Number.isFinite" in cuerpo, \
        "unas coordenadas corruptas mandarian la camara a NaN, y de ahi no vuelve"
