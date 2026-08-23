# -*- coding: utf-8 -*-
"""Que paginas pide cuenta la aplicacion.

Hasta ahora solo /passport se protegia. El globo, las carreras, la ruta y el
plan de vuelo se servian a cualquiera: las 226 ciudades con sus universidades,
los roadmaps y el mentor, sin registrarse nunca.

Dos cosas se comprueban aqui y las dos importan por motivos distintos:

  - Que el guard siga enchufado en las cinco paginas. Es una linea facil de
    perder en un merge, y perderla no rompe nada visible: la pagina sigue
    funcionando, solo que para todo el mundo.

  - Que `next` no acepte destinos ajenos. Esa es la parte con dientes: un
    /login?next=https://sitio-falso.com convertiria nuestro propio login en
    un trampolin de phishing, con el dominio bueno en la barra hasta despues
    de que el estudiante escriba la contraseña.
"""
import json
import shutil
import subprocess
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
WEB = RAIZ / "web" / "src"

# Las paginas privadas y el punto de entrada por el que arranca cada una.
ENTRADAS = {
    "globe": WEB / "main.jsx",
    "careers": WEB / "careers" / "main.js",
    "journey": WEB / "journey" / "main.js",
    "flightplan": WEB / "flightplan" / "main.js",
}


def test_every_private_page_asks_for_an_account():
    """Sin esto se navega el globo entero sin cuenta."""
    assert len(ENTRADAS) == 4, "cambio la lista de paginas privadas sin actualizar el test"
    for nombre, archivo in ENTRADAS.items():
        assert archivo.exists(), f"no existe el punto de entrada de {nombre}: {archivo}"
        texto = archivo.read_text(encoding="utf-8")
        assert "exigirCuenta.js" in texto, f"/{nombre} se sirve sin pedir cuenta"


def test_the_guard_runs_before_the_page_does():
    """Los imports de un modulo ES se evaluan todos antes del cuerpo y en
    orden. Si el guard no es el primero, app.js ya se ejecuto entero -
    incluidas sus llamadas a la API - antes de que nadie mire si hay sesion."""
    for nombre, archivo in ENTRADAS.items():
        imports = [ln.strip() for ln in archivo.read_text(encoding="utf-8").splitlines()
                   if ln.strip().startswith("import ")]
        assert imports, f"{nombre} no tiene imports"
        assert "exigirCuenta.js" in imports[0], (
            f"en /{nombre} el guard no es el primer import, es: {imports[0]}")


def test_the_passport_no_longer_has_its_own_copy():
    """Tenia la comprobacion escrita a mano y redirigia sin `next`. Con las dos
    activas, la suya pisaba el destino guardado por el guard."""
    texto = (WEB / "passport" / "app.js").read_text(encoding="utf-8")
    assert "exigirCuenta" in texto, "el pasaporte dejo de usar el guard compartido"
    assert 'localStorage.getItem("futurePilotAuthToken")' not in texto, \
        "el pasaporte volvio a leer el token por su cuenta"


def test_login_sends_the_user_where_they_were_going():
    """Sin esto, hacer clic en el globo te manda a registrarte y te deja en el
    test, sin pista de que el globo seguia esperando."""
    texto = (WEB / "login" / "app.js").read_text(encoding="utf-8")
    assert "destinoTrasEntrar" in texto, "el login no lee el parametro `next`"
    assert 'window.location.href = "/assessment";' not in texto, \
        "quedo una redireccion fija a /assessment que ignora `next`"


# --- La parte con dientes: se ejecuta el codigo, no se lee -----------------

DESTINOS_HOSTILES = [
    "https://sitio-falso.com",           # absoluta
    "//sitio-falso.com",                 # sin protocolo: el navegador la trata como absoluta
    r"/\sitio-falso.com",                # barra invertida, que algunos navegadores normalizan
    "http://localhost:8000/globe",       # nuestro host, pero absoluta
    "javascript:alert(1)",               # esquema ejecutable
    "/admin",                            # existe, pero no es una pagina de estudiante
    "/api/v1/me/export",                 # un endpoint, no una pagina
    "/globe/../admin",                   # travesia
]

DESTINOS_VALIDOS = ["/globe", "/careers", "/journey", "/flightplan", "/passport", "/assessment"]


def _evaluar(entradas):
    """Corre destinoSeguro() de verdad en node y devuelve lo que responde."""
    guard = (WEB / "shared" / "sessionGuard.js").resolve().as_uri()
    script = (
        f'const m = await import({json.dumps(guard)});\n'
        f'const entradas = {json.dumps(entradas)};\n'
        'console.log(JSON.stringify(entradas.map((e) => m.destinoSeguro(e))));\n'
    )
    salida = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        capture_output=True, text=True, timeout=60,
    )
    assert salida.returncode == 0, f"node fallo: {salida.stderr}"
    return json.loads(salida.stdout.strip().splitlines()[-1])


@pytest.mark.skipif(not shutil.which("node"), reason="hace falta node")
def test_next_refuses_to_send_users_off_the_site():
    """La redireccion abierta es el fallo clasico de este parametro."""
    resultados = _evaluar(DESTINOS_HOSTILES)
    assert len(resultados) == len(DESTINOS_HOSTILES)
    malos = [d for d, r in zip(DESTINOS_HOSTILES, resultados) if r is not None]
    assert not malos, f"`next` acepto destinos que no son nuestros: {malos}"


@pytest.mark.skipif(not shutil.which("node"), reason="hace falta node")
def test_next_still_works_for_real_pages():
    """Un filtro que rechaza todo tambien pasa el test de arriba."""
    resultados = _evaluar(DESTINOS_VALIDOS)
    assert resultados == DESTINOS_VALIDOS, \
        f"el filtro rechazo paginas reales: {dict(zip(DESTINOS_VALIDOS, resultados))}"
