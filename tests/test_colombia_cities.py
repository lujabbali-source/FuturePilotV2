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
