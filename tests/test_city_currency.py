# -*- coding: utf-8 -*-
"""El panel de ciudad y las monedas.

Abrir una ciudad que no fuera colombiana dejaba la pantalla en NEGRO: sin
panel, sin globo y sin nada, hasta recargar.

La causa: `new Intl.NumberFormat(locale, { style: "currency", currency })`
no devuelve algo raro cuando el codigo no sirve - LANZA un RangeError. Y lo
hace al construirse, antes de mirar si hay alguna cifra que formatear. El
panel sacaba la moneda de `statistics.currency`, que en los datos del mundo
es prosa para leer ("Dolar canadiense (CAD)"), asi que la excepcion salia
dentro del render y React desmontaba el arbol entero.

Veinte de las ciento cincuenta monedas del proyecto lo provocaban.
"""
import json
import re
import shutil
import subprocess
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
DATOS = RAIZ / "web" / "src" / "database" / "countries"
MODULO = RAIZ / "web" / "src" / "components" / "panels" / "moneda.js"
PANEL = RAIZ / "web" / "src" / "components" / "panels" / "CityPanel.jsx"

PATRON = re.compile(r'currency:\s*"([^"]*)"')


def monedas_del_proyecto():
    valores = set()
    for archivo in DATOS.rglob("*.js"):
        valores.update(PATRON.findall(archivo.read_text(encoding="utf-8")))
    return sorted(valores)


def _en_node(script):
    salida = subprocess.run(["node", "--input-type=module", "-e", script],
                            capture_output=True, text=True, timeout=120,
                            cwd=str(RAIZ), encoding="utf-8")
    assert salida.returncode == 0, f"node fallo: {salida.stderr}"
    return json.loads(salida.stdout.strip().splitlines()[-1])


@pytest.mark.skipif(not shutil.which("node"), reason="hace falta node")
def test_no_currency_in_the_project_can_blank_the_page():
    """Se prueban TODAS las monedas de la base, no una muestra."""
    valores = monedas_del_proyecto()
    # Un test que no examina nada pasa siempre. Si el patron deja de casar
    # (porque cambia el formato de los datos), esto lo dice en vez de dar
    # un falso verde.
    assert len(valores) >= 100, f"solo se encontraron {len(valores)} monedas; el patron no esta casando"

    script = (
        'import { formateadorMoneda } from "./web/src/components/panels/moneda.js";\n'
        f'const valores = {json.dumps(valores, ensure_ascii=False)};\n'
        'const rotas = [];\n'
        'for (const v of valores) {\n'
        '  try { formateadorMoneda("es-ES", v).format(1234567); }\n'
        '  catch (e) { rotas.push([v, String(e)]); }\n'
        '}\n'
        'console.log(JSON.stringify(rotas));\n'
    )
    rotas = _en_node(script)
    assert not rotas, f"monedas que siguen lanzando: {rotas}"


@pytest.mark.skipif(not shutil.which("node"), reason="hace falta node")
def test_the_bug_was_real_and_this_is_what_fixed_it():
    """Contraprueba. Sin esto, el test de arriba tambien pasaria si el fallo
    nunca hubiera existido, y no se sabria que el arreglo hace falta."""
    valores = monedas_del_proyecto()
    script = (
        f'const valores = {json.dumps(valores, ensure_ascii=False)};\n'
        'let lanzaban = 0;\n'
        'for (const v of valores) {\n'
        '  try { new Intl.NumberFormat("es-ES", { style: "currency", currency: v }); }\n'
        '  catch { lanzaban++; }\n'
        '}\n'
        'console.log(JSON.stringify(lanzaban));\n'
    )
    lanzaban = _en_node(script)
    assert lanzaban > 0, (
        "ninguna moneda de los datos lanza con el metodo viejo: o se limpiaron "
        "los datos, y entonces este test ya no vigila nada, o el patron no casa"
    )


@pytest.mark.skipif(not shutil.which("node"), reason="hace falta node")
def test_the_iso_code_is_pulled_out_of_the_prose():
    """El arreglo no puede ser "quitar el simbolo a todo": los datos del mundo
    llevan el codigo dentro del texto y se puede recuperar."""
    casos = {
        "COP": "COP",
        "cop": "COP",
        "Dólar canadiense (CAD)": "CAD",
        "Dólar estadounidense (USD) / Bitcoin": "USD",
        "Bitcoin": None,
        "": None,
    }
    script = (
        'import { codigoMoneda } from "./web/src/components/panels/moneda.js";\n'
        f'const entradas = {json.dumps(list(casos), ensure_ascii=False)};\n'
        'console.log(JSON.stringify(entradas.map((e) => codigoMoneda(e))));\n'
    )
    assert _en_node(script) == list(casos.values())


def test_the_panel_no_longer_builds_the_formatter_by_hand():
    """Si vuelve a construirse ahi, vuelve el fallo: el modulo seguro existe
    justo para que no haya un Intl suelto en medio de un render."""
    assert "Intl.NumberFormat" not in PANEL.read_text(encoding="utf-8"), \
        "CityPanel volvio a construir Intl.NumberFormat directamente"


def test_a_foreign_city_is_not_priced_in_colombian_pesos():
    """El ultimo recurso era "COP". Para una ciudad de fuera eso pinta como
    pesos una cifra que nadie midio en pesos - un error silencioso, que es
    peor que la pantalla negra porque nadie lo nota."""
    codigo = PANEL.read_text(encoding="utf-8")
    assert 'city.countryId === "colombia" ? "COP" : null' in codigo, \
        "volvio el 'COP' de ultimo recurso para cualquier ciudad"
