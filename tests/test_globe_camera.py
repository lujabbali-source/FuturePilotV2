# -*- coding: utf-8 -*-
"""El vuelo de la camara del globo.

Dos fallos distintos hacian lo mismo de cara al usuario: hacer clic en un
pais y ya no poder explorar el resto del mundo.

  1. El pivote de OrbitControls se movia al pais y se quedaba ahi. Se orbita
     ALREDEDOR del pivote, asi que el pais quedaba de eje de giro; el zoom y
     la rotacion automatica tambien tiraban hacia el.

  2. Peor: nada cancelaba el vuelo cuando el usuario agarraba el globo. Cada
     frame devolvia la camara al destino, y como el arrastre impedia llegar,
     la condicion de "ya llegue" no se cumplia nunca y la animacion se
     quedaba encendida para siempre.

AVISO SOBRE ESTOS TESTS: react-three-fiber necesita un navegador de verdad
(un canvas que componga frames), asi que aqui no se puede montar el
componente ni simular un arrastre. Lo que sigue vigila el codigo fuente, no
el comportamiento. Es una red contra la regresion, no una demostracion; la
prueba de que funciona es abrir el globo y arrastrarlo.
"""
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "web" / "src" / "components" / "camera" / "CameraController.jsx"
BUNDLE = RAIZ / "web" / "dist"


@pytest.fixture(scope="module")
def codigo():
    assert FUENTE.exists(), f"no existe {FUENTE}"
    return FUENTE.read_text(encoding="utf-8")


def test_the_orbit_pivot_stays_at_the_centre_of_the_earth(codigo):
    """Si vuelve a moverse al pais, el pais se convierte en el eje de giro.

    El encuadre no depende de esto: la camara acaba en dir * distancia y el
    pais esta en dir * 1, asi que los dos y el origen estan en la misma recta
    y mirar al origen lo deja igual de centrado. Verificado con three.js:
    el punto del pais se proyecta en (0, 0) con los dos pivotes.
    """
    assert "lookAt.current.set(0, 0, 0)" in codigo, \
        "el pivote de orbita ya no es el centro de la Tierra"
    assert "lookAt.current.copy(dir)" not in codigo, \
        "el pivote volvio a colocarse sobre el pais"


def test_grabbing_the_globe_cancels_the_flight(codigo):
    """El fallo que dejaba la camara con un muelle permanente hacia un pais."""
    assert 'addEventListener("start"' in codigo, \
        "nada cancela el vuelo cuando el usuario agarra el globo"
    # Que escuche no basta: tiene que apagar la animacion.
    inicio = codigo.index('addEventListener("start"')
    contexto = codigo[max(0, inicio - 400):inicio + 200]
    assert "isAnimating.current = false" in contexto, \
        "escucha la interaccion pero no detiene la animacion"


def test_the_listener_is_cleaned_up(codigo):
    """Un listener por cada montaje, sin quitar ninguno, es una fuga: en
    desarrollo StrictMode monta dos veces y en cada navegacion se acumulan."""
    assert 'removeEventListener("start"' in codigo, \
        "el listener no se retira al desmontar"


def test_the_built_bundle_is_not_older_than_the_source():
    """El servidor sirve web/dist, no web/src. Un arreglo sin reconstruir no
    le llega a nadie - ya paso con las ciudades colombianas en la Antartida,
    que estaban bien en el fuente y mal en lo que se servia.

    Se compara la fecha y no el texto: el minificador reescribe el codigo
    (las comillas de "start" salen como backticks, por ejemplo), asi que
    buscar una cadena concreta en el bundle da falsos fallos.
    """
    if not BUNDLE.exists():
        pytest.skip("no hay build; corre npm --prefix web run build")
    globo = sorted(BUNDLE.glob("assets/globe-*.js"))
    assert globo, "no hay chunk del globo en el build"
    mas_nuevo = max(p.stat().st_mtime for p in globo)
    assert mas_nuevo >= FUENTE.stat().st_mtime, (
        "el build del globo es mas viejo que CameraController.jsx: "
        "corre npm --prefix web run build"
    )
