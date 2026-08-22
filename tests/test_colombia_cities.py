# -*- coding: utf-8 -*-
"""Las ciudades colombianas, tras importar 'America cities.docx'.

El documento trae 18 ciudades con costo de vida, poblacion, empleo y vida
diaria - los paneles que estaban vacios en 222 de 223 ciudades. Se vuelca a
JSON tal cual (cities-source.json) y de ahi se escribe a las fichas solo lo que
no necesita traduccion.
"""
import json
import re
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"
FUENTE = CIUDADES.parent / "cities-source.json"
PANEL = RAIZ / "web" / "src" / "components" / "panels" / "CityPanel.jsx"
SERVICIO = RAIZ / "web" / "src" / "services" / "cityService.js"


def fichas():
    return sorted(f for f in CIUDADES.glob("*.js") if f.name != "index.js")


def test_the_document_dump_survived():
    datos = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    assert len(datos) >= 18, f"solo {len(datos)} ciudades en el volcado"
    con_dinero = [c for c, d in datos.items()
                  if any("money" in e for s in ("costOfLiving", "jobs")
                         for lista in d[s].values() for e in lista)]
    assert len(con_dinero) >= 15, f"solo {len(con_dinero)} ciudades con cifras"


def test_money_is_kept_as_a_range():
    """El documento dice "1.8M - 2.6M COP". Guardar 2.2M inventaria una
    precision que la fuente no da, y encima parece mas fiable que el original.
    Sobre esa cifra alguien presupuesta una mudanza."""
    datos = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    for cid, ciudad in datos.items():
        for seccion in ("costOfLiving", "jobs", "statistics", "living"):
            for lista in ciudad[seccion].values():
                for entrada in lista:
                    for dinero in entrada.get("money") or []:
                        assert {"min", "max", "currency"} <= set(dinero), \
                            f"{cid}: una cifra sin rango o sin moneda"
                        assert dinero["min"] <= dinero["max"]


def test_currency_travels_with_the_number():
    """Las ocho primeras ciudades traen pesos y las diez ultimas dolares. Sin
    la moneda pegada al numero, alguien los compara o los suma."""
    datos = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    monedas = {d["currency"] for c in datos.values()
               for s in c.values() if isinstance(s, dict)
               for lista in s.values() for e in lista for d in e.get("money") or []}
    assert monedas <= {"COP", "USD"}, f"moneda desconocida: {monedas}"
    assert "COP" in monedas and "USD" in monedas


def test_every_range_says_its_currency():
    """El documento convierte a pesos solo las ciudades grandes; el resto llegan
    en dolares.

    Un rango sin moneda se pinta con la de la ciudad, que es COP: el
    presupuesto de estudiante de Cali, 330 dolares, se leeria como 330 pesos.
    Noventa veces mas barato de lo que es, en la pantalla donde alguien decide
    si le alcanza para mudarse.
    """
    sin_moneda = []
    for ficha in fichas():
        bloque = re.search(r"costOfLiving:\s*\{(.*?)\n\s*\}",
                           ficha.read_text(encoding="utf-8"), re.S)
        if not bloque:
            continue
        for rango in re.findall(r'\{[^{}]*"min"[^{}]*\}', bloque.group(1)):
            if '"currency"' not in rango:
                sin_moneda.append(f"{ficha.stem}: {rango[:44]}")
    assert not sin_moneda, "rangos sin moneda:\n  " + "\n  ".join(sin_moneda[:8])


def test_the_three_new_cities_exist_and_are_registered():
    """Valledupar, Quibdo y Leticia no tenian ficha. Un archivo sin registrar
    en el indice no existe para la aplicacion."""
    indice = (CIUDADES / "index.js").read_text(encoding="utf-8")
    for cid in ("valledupar", "quibdo", "leticia"):
        assert (CIUDADES / f"{cid}.js").exists(), f"falta la ficha de {cid}"
        assert f'from "./{cid}"' in indice, f"{cid} no esta importada"
        assert re.search(rf"^\s*{cid},\s*$", indice, re.M), f"{cid} no esta en la lista"


def test_every_city_has_coordinates_or_says_it_does_not():
    """Sin coordenadas el globo no puede ponerla, y volar a una ciudad sin
    ellas manda la camara a NaN."""
    sin = []
    for ficha in fichas():
        texto = ficha.read_text(encoding="utf-8")
        m = re.search(r"coordinates:\s*\{\s*lat:\s*(-?[\d.]+),\s*lng:\s*(-?[\d.]+)", texto)
        if not m:
            sin.append(ficha.stem)
            continue
        lat, lng = float(m.group(1)), float(m.group(2))
        assert -90 <= lat <= 90 and -180 <= lng <= 180, f"{ficha.stem}: fuera del mundo"
    assert not sin, f"ciudades sin coordenadas: {sin}"


def test_the_loader_finds_any_city_in_the_folder():
    """Antes el cargador llevaba los 21 nombres escritos a mano: añadir una
    ciudad sin acordarse de esa linea la dejaba en "Cargando ciudad" para
    siempre, sin ningun error. Es exactamente lo que paso con las tres
    nuevas."""
    codigo = SERVICIO.read_text(encoding="utf-8")
    glob = re.search(r"import\.meta\.glob\(\s*\n?\s*\"([^\"]+)\"", codigo)
    assert glob, "no se encontro el glob de ciudades"
    assert "{" not in glob.group(1), \
        f"el cargador vuelve a llevar una lista escrita a mano: {glob.group(1)}"


def test_the_panel_can_print_a_range():
    """Si el panel solo entiende numeros, un rango sale como "Aun no
    conectado" y el dato importado se pierde en el ultimo metro."""
    codigo = PANEL.read_text(encoding="utf-8")
    assert "value.min" in codigo and "value.max" in codigo, \
        "money() no sabe pintar un rango"


def test_curated_spanish_was_not_overwritten_with_english():
    """El documento esta en ingles y las fichas traian poblacion y clima ya
    curados en castellano. El importador amplia, no pisa."""
    for ficha in fichas():
        texto = ficha.read_text(encoding="utf-8")
        m = re.search(r'population:\s*"([^"]+)"', texto)
        if m and "habitantes" not in m.group(1):
            pytest.fail(f"{ficha.stem}: poblacion sin traducir -> {m.group(1)}")


# ---------------------------------------------------------------------------
# La prosa, en los dos idiomas
# ---------------------------------------------------------------------------
TRADUCCIONES_PY = RAIZ / "web" / "scripts" / "colombia_living_es.py"


def _bloques_living():
    for ficha in fichas():
        texto = ficha.read_text(encoding="utf-8")
        m = re.search(r"living:\s*\{(.*?)\n\s*\},", texto, re.S)
        if m:
            yield ficha.stem, m.group(1)


def test_the_daily_life_prose_speaks_both_languages():
    """El documento esta en ingles. Guardarlo tal cual dejaria a un estudiante
    colombiano leyendo "World-class institutions like..." dentro de una
    interfaz en castellano - y guardar solo la traduccion romperia el ingles.
    Van los dos: la pantalla elige, no el importador."""
    revisados = 0
    for cid, bloque in _bloques_living():
        for entrada in re.findall(r'\{[^{}]*"en"[^{}]*\}|\{[^{}]*"es"[^{}]*\}', bloque):
            revisados += 1
            assert '"es"' in entrada and '"en"' in entrada, \
                f"{cid}: un texto de vida diaria en un solo idioma -> {entrada[:60]}"
    assert revisados >= 30, f"solo {revisados} textos bilingues; se esperaban ~39"


def test_no_english_prose_leaks_into_a_spanish_field():
    """Un `{es}` que en realidad trae el ingles es peor que no traducir: nadie
    lo ve hasta que un estudiante lee la ficha."""
    import json as _json
    sospechosos = []
    for cid, bloque in _bloques_living():
        for entrada in re.findall(r'\{[^{}]*\}', bloque):
            try:
                par = _json.loads(entrada)
            except ValueError:
                continue
            es = (par.get("es") or "").lower()
            # Con limite de palabra, no con espacio delante: el ingles suele
            # estar al PRINCIPIO de la frase ("World-class. Hospital...") y
            # exigir un espacio previo hacia que la guarda no viera justo el
            # caso mas probable. Se comprobo rompiendolo.
            import re as _re
            for delator in ("world-class", "nearby", "like", "heritage",
                            "venue", "outstanding", "excellent", "avg"):
                if _re.search(rf"(?<![a-záéíóúñ]){delator}(?![a-záéíóúñ])", es):
                    sospechosos.append(f"{cid}: {es[:60]}")
                    break
    assert not sospechosos, "castellano con ingles dentro:\n  " + "\n  ".join(sospechosos)


def test_every_english_text_got_a_translation():
    """Si el documento crece y nadie traduce lo nuevo, el importador lo salta
    en silencio y ese campo se queda vacio para siempre."""
    fuente = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    traducciones = TRADUCCIONES_PY.read_text(encoding="utf-8")
    CAMPOS = {"best neighborhoods": "bestNeighborhoods", "culture": "culture",
              "culture & nature": "culture", "tourism": "tourism",
              "healthcare": "healthcare", "food": "food",
              "nightlife": "nightlife", "transportation": "transportation"}
    faltan = []
    for cid, ciudad in fuente.items():
        for bloque, lista in (ciudad.get("living") or {}).items():
            for e in lista:
                campo = CAMPOS.get((e.get("label") or bloque or "").lower())
                if not campo or not e.get("text"):
                    continue
                if not re.search(rf'"{cid}":\s*\{{(?:[^{{}}]|\{{[^{{}}]*\}})*?"{campo}"',
                                 traducciones, re.S):
                    faltan.append(f"{cid}.{campo}")
    assert not faltan, f"textos del documento sin traduccion: {sorted(set(faltan))}"


def test_the_panel_can_read_a_bilingual_value():
    codigo = PANEL.read_text(encoding="utf-8")
    assert "function enIdioma" in codigo, "el panel no resuelve textos bilingues"
    assert "resolvedLanguage" in codigo, "el panel no sabe en que idioma esta"


# ---------------------------------------------------------------------------
# Fortalezas y retos
# ---------------------------------------------------------------------------
OUTLOOK_PY = RAIZ / "web" / "scripts" / "colombia_outlook_es.py"
LOCALES = RAIZ / "web" / "src" / "locales"


def test_the_outlook_tab_exists_in_both_languages():
    """Un boton cuya etiqueta falta sale como `panel.sections.outlook`."""
    assert '{ id: "outlook"' in PANEL.read_text(encoding="utf-8")
    for lang in ("es", "en"):
        j = json.loads((LOCALES / lang / "cities.json").read_text(encoding="utf-8"))
        assert j["panel"]["sections"].get("outlook"), f"falta la etiqueta en {lang}"
        for campo in ("strengths", "challenges", "safetyStrategy", "englishProficiency"):
            assert j["panel"]["fields"].get(campo), f"falta {campo} en {lang}"
        assert j["panel"].get("outlookNote"), f"falta la advertencia en {lang}"


def test_the_screen_says_these_are_judgements():
    """La diferencia entre esta seccion y las demas: una poblacion es un dato,
    "conviene precaucion en El Centro de noche" es un juicio sobre un barrio
    donde vive gente. Sin decirlo, el juicio se lee con la autoridad del dato -
    y el juicio va sobre sitios reales y personas reales."""
    assert 'className="panel-note"' in PANEL.read_text(encoding="utf-8")
    for lang, palabras in (("es", ("valoraciones", "no mediciones")),
                           ("en", ("judgements", "not measurements"))):
        nota = json.loads((LOCALES / lang / "cities.json").read_text(encoding="utf-8"))["panel"]["outlookNote"]
        for palabra in palabras:
            assert palabra in nota, f"la advertencia en {lang} no dice {palabra!r}"


def test_outlook_is_bilingual_too():
    con_outlook = 0
    for ficha in fichas():
        bloque = re.search(r"outlook:\s*\{(.*?)\n\s*\},",
                           ficha.read_text(encoding="utf-8"), re.S)
        if not bloque:
            continue
        con_outlook += 1
        for entrada in re.findall(r'\{[^{}]*\}', bloque.group(1)):
            assert '"es"' in entrada and '"en"' in entrada, \
                f"{ficha.stem}: fortaleza o reto en un solo idioma"
    assert con_outlook >= 4, f"solo {con_outlook} ciudades con fortalezas y retos"


def test_no_judgement_was_softened_away():
    """Estos textos son advertencias sobre barrios reales. Se traducen tal
    cual: suavizar "caution required in Downtown at night" para que suene mejor
    seria quitarle a alguien una advertencia que le sirve."""
    traducciones = OUTLOOK_PY.read_text(encoding="utf-8")
    assert "precaución" in traducciones, "se perdio la advertencia de El Centro"
    assert "Gentrificación" in traducciones, "se perdio el reto de Medellín"
