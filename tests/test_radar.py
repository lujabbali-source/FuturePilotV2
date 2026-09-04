"""El radar del perfil (web/src/assessment/radar.js).

Lo usan dos pantallas -la cuenta del estudiante y el informe imprimible- y
todo lo que hace ocurre en el navegador, asi que aqui no se puede pulsar
nada. Lo que si se puede vigilar es la CAUSA de los dos fallos que estos
tests vienen a cerrar, porque los dos eran silenciosos: nada peta, el grafico
se dibuja entero y bonito, y simplemente hay ejes que no responden al clic.
"""

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
RADAR_JS = REPO_ROOT / "web" / "src" / "assessment" / "radar.js"
RADAR_CSS = REPO_ROOT / "web" / "src" / "assessment" / "radar.css"


def test_every_axis_has_a_hit_area_of_its_own():
    """Cada eje necesita una zona sensible que NO dependa de su puntuacion.

    El vertice no sirve: esta a la distancia que marque la puntuacion, asi que
    un eje con un 0 pone su punto en el centro exacto y todos los ejes bajos
    acaban amontonados en el mismo pixel, tapandose unos a otros. En un perfil
    con cinco ceros solo respondian tres ejes de ocho.
    """
    codigo = RADAR_JS.read_text(encoding="utf-8")

    assert "radar__hit" in codigo, "el radar perdio las zonas sensibles por eje"
    # Se generan recorriendo EJES, no escritas a mano: si algun dia hay nueve
    # dimensiones, tienen que aparecer nueve sectores sin tocar nada.
    zonas = re.search(r"EJES\.map\(\((.*?)\)\s*=>\s*\(?\s*`?[^`]*radar__hit", codigo, re.S)
    assert zonas, "las zonas sensibles no se generan a partir de EJES"


def test_nothing_painted_on_top_swallows_the_clicks():
    """El poligono del perfil se dibuja ENCIMA de las zonas sensibles.

    Con su relleno por defecto se come los clics de toda la parte central del
    grafico - justo la de los ejes mas bajos, que son los que el sector viene
    a rescatar. Es el fallo mas facil de reintroducir de los dos: basta con
    que alguien limpie una regla que "no parece hacer nada".
    """
    hoja = RADAR_CSS.read_text(encoding="utf-8")

    bloque = re.search(
        r"((?:\.radar__(?:area|ring|spoke),?\s*)+)\{[^}]*pointer-events:\s*none",
        hoja,
    )
    assert bloque, "sin pointer-events:none, el perfil se traga los clics de los ejes bajos"
    for clase in ("area", "ring", "spoke"):
        assert f".radar__{clase}" in bloque.group(1), f".radar__{clase} volveria a capturar clics"


def test_the_hit_areas_stay_invisible_and_clickable():
    """Transparentes, pero sensibles. `fill: transparent` por si solo no basta
    en todos los motores: sin `pointer-events: all` el sector se vuelve sordo
    y volvemos al punto de partida sin que nada avise."""
    hoja = RADAR_CSS.read_text(encoding="utf-8")

    regla = re.search(r"\.radar__hit\s*\{([^}]*)\}", hoja)
    assert regla, "no encuentro la regla .radar__hit"
    assert "fill: transparent" in regla.group(1)
    assert "pointer-events: all" in regla.group(1)


def test_opening_an_axis_marks_its_score_on_the_chart():
    """Al abrir un eje se situa su puntuacion SOBRE el grafico: un anillo a esa
    altura y el radio encendido del centro al vertice.

    El perfil no se toca - se sigue viendo la forma real y se puede comparar
    el eje abierto con los otros siete. Antes, abrir un eje solo cambiaba el
    texto de debajo: en un eje bajo, cuyo vertice queda casi en el centro, no
    se movia nada visible.
    """
    codigo = RADAR_JS.read_text(encoding="utf-8")

    assert "data-radar-level" in codigo and "data-radar-ray" in codigo
    assert "function situarNivel" in codigo

    # El poligono del perfil se dibuja con `distancias` (las ocho reales) y no
    # se reescribe nunca: si alguien lo tocara, el grafico dejaria de ser el
    # perfil del estudiante.
    assert 'class="radar__area" points="${poligono(distancias)}"' in codigo
    assert not re.search(r'radar__area[^\n]*setAttribute', codigo), \
        "el poligono del perfil no puede reescribirse: dejaria de ser el perfil real"


def test_the_chart_is_drawn_without_inline_styles():
    """La CSP del sitio prohibe `style=`. Un radar pintado con estilos en linea
    sale en blanco en produccion sin un solo error en consola; `points`, `x2` e
    `y2` son atributos de SVG, no estilos, y por eso si valen."""
    codigo = RADAR_JS.read_text(encoding="utf-8")

    assert 'style="' not in codigo
    assert "style='" not in codigo
    assert ".style.setProperty" not in codigo, "el radar no necesita tocar estilos"


def test_the_wheel_gives_every_dimension_a_place_of_its_own():
    """La corona exterior: un segmento por dimension, con su tono y su numero.

    Es lo que arregla el problema de fondo del grafico anterior. Un eje con un
    0 no tenia NINGUNA presencia: su vertice caia en el centro, confundido con
    los demas ceros, y lo unico que quedaba de esa dimension era su nombre
    suelto en el borde. Con la corona, las ocho existen en el dibujo valgan lo
    que valgan, y el sitio donde pulsar es evidente.
    """
    codigo = RADAR_JS.read_text(encoding="utf-8")
    hoja = RADAR_CSS.read_text(encoding="utf-8")

    assert "function arco(" in codigo, "la corona de la rueda desaparecio"
    assert "radar__arc" in codigo and "radar__num" in codigo
    # Un tono por segmento, y los ocho definidos: si faltara uno, ese segmento
    # saldria sin relleno y la rueda tendria un hueco.
    for i in range(8):
        assert f".radar__arc--{i}" in hoja, f"al segmento {i} le falta su color"
        assert f"--radar-arc-{i}:" in hoja, f"al segmento {i} le falta su variable"


def test_the_grid_rings_are_circles_not_polygons():
    """La rejilla es circular a proposito. Cuando era octogonal tenia la misma
    forma que el poligono del perfil, y a poca distancia las dos figuras se
    confundian: no se distinguia el dato de la referencia. Con la rejilla
    redonda, lo unico angular del grafico es el perfil del estudiante."""
    codigo = RADAR_JS.read_text(encoding="utf-8")

    anillos = re.search(r"const anillos = .*?\.join\(\"\"\);", codigo, re.S)
    assert anillos, "no encuentro la rejilla"
    assert "<circle" in anillos.group(0), "la rejilla volvio a ser poligonal"
    assert "<polygon" not in anillos.group(0)
