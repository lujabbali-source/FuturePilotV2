"""El informe vocacional imprimible (/informe).

La pagina se compone entera en el navegador, asi que la mayor parte de lo
que puede romperse no esta en Python: esta en el bundle y en las cadenas de
traduccion. Lo que se comprueba aqui es justo eso - que la ruta existe y sale
del build, que el documento no depende de un endpoint que nadie escribio, y
que las dos listas de traduccion dicen lo mismo. Un informe al que le falta
media hoja de texto en ingles no revienta: se imprime con las claves crudas
("report.method.limits") en un PDF que alguien va a enseñar en una entrevista.
"""

import json
import re
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent
REPORT_DIR = REPO_ROOT / "web" / "src" / "report"
LOCALES_DIR = REPO_ROOT / "web" / "src" / "locales"


def test_the_report_page_is_served_from_the_build(client):
    respuesta = client.get("/informe")

    assert respuesta.status_code == 200
    assert "/app/assets/" in respuesta.text, "no parece el HTML compilado por Vite"


def test_the_report_reads_the_dashboard_endpoint_that_already_exists():
    """El informe NO trae API propia, y es deliberado.

    /api/v1/me/dashboard ya devuelve el ultimo resultado traducido, la cuenta
    y las metas del pasaporte en una sola peticion. Un endpoint nuevo seria
    una segunda fuente para los mismos datos, y dos fuentes acaban
    discrepando: la pantalla diria una cosa y el PDF otra sobre el mismo test.
    Si alguien cambia esta llamada, que sea a sabiendas.
    """
    codigo = (REPORT_DIR / "app.js").read_text(encoding="utf-8")

    llamadas = set(re.findall(r"fetch\(\s*[`\"']([^`\"']+)", codigo))
    assert llamadas == {"/api/v1/me/dashboard?lang=${currentLanguage()}"}, llamadas


def test_the_report_never_writes_an_inline_style():
    """La CSP del sitio prohibe `style=` (ver _build_csp). Un informe que
    pinte las barras asi no falla de forma visible: sale con todas las
    puntuaciones en blanco, que es peor que un error."""
    codigo = (REPORT_DIR / "app.js").read_text(encoding="utf-8")

    assert 'style="' not in codigo
    assert "style='" not in codigo
    # El unico camino permitido para un ancho dinamico.
    assert "setProperty" in codigo


def test_the_print_stylesheet_forces_backgrounds_and_hides_the_interface():
    """Las dos reglas de las que depende que el PDF se parezca a la pantalla.

    Sin print-color-adjust el navegador descarta todos los fondos al
    imprimir y las barras salen vacias; sin ocultar la barra de acciones, el
    boton "Descargar PDF" acaba impreso dentro del propio PDF.
    """
    hoja = (REPORT_DIR / "page.css").read_text(encoding="utf-8")

    assert "@media print" in hoja
    assert "print-color-adjust: exact" in hoja
    assert re.search(r"@page\s*\{[^}]*size:\s*A4", hoja), "el PDF no fija tamano de pagina"

    bloque = hoja.split("@media print", 1)[1]
    for oculto in (".rep-toolbar", ".fp-header", "#fpMentorBubble"):
        assert oculto in bloque, f"{oculto} se imprimiria dentro del documento"


def test_the_plane_flies_along_the_trail_it_draws():
    """La curva de la portada esta escrita dos veces y tienen que coincidir.

    cover.js la usa como `d` del trazo que se ve; page.css la usa como
    offset-path, el rail por el que viaja el avion. CSS no sabe leer el `d`
    de un path y pasarselo desde JavaScript exigiria un `style=` que la CSP
    prohibe, asi que la duplicidad no tiene arreglo - solo vigilancia. Si se
    separan, el avion vuela por fuera de su propia estela y nada falla: solo
    sale un PDF raro.
    """
    codigo = (REPORT_DIR / "cover.js").read_text(encoding="utf-8")
    hoja = (REPORT_DIR / "page.css").read_text(encoding="utf-8")

    en_js = re.search(r'RUTA_AVION\s*=\s*"([^"]+)"', codigo)
    assert en_js, "no encuentro RUTA_AVION en cover.js"

    # Solo las declaraciones de verdad: `offset-path` aparece tambien dentro de
    # los `@supports (offset-path: path("M 0 0 L 1 1"))`, que es una sonda de
    # soporte y no una trayectoria. Esas van precedidas de "@supports (" en la
    # misma linea; las reales abren linea.
    en_css = re.findall(r'^\s*offset-path:\s*path\("([^"]+)"\)', hoja, re.M)
    assert en_css, "no encuentro el offset-path del avion en page.css"

    for ruta in en_css:
        assert ruta == en_js.group(1), (
            f"la estela y el rail del avion se separaron. "
            f"cover.js: {en_js.group(1)!r} / page.css: {ruta!r}"
        )


def test_the_cover_prints_as_a_page_of_its_own():
    """Una portada que comparte hoja con la primera seccion no es una
    portada. Y el avion tiene que llegar al final aunque se imprima a media
    animacion: congelado a mitad de camino sale con la estela cortada."""
    hoja = (REPORT_DIR / "page.css").read_text(encoding="utf-8")
    bloque = hoja.split("@media print", 1)[1]

    assert "break-after: page" in bloque
    assert "offset-distance: 100% !important" in bloque
    assert "stroke-dashoffset: 0 !important" in bloque


def _claves(nodo, prefijo=""):
    """Todas las claves hoja de un diccionario anidado, en notacion punto."""
    if not isinstance(nodo, dict):
        return {prefijo}
    return {c for k, v in nodo.items() for c in _claves(v, f"{prefijo}.{k}" if prefijo else k)}


def test_the_report_says_the_same_thing_in_both_languages():
    idiomas = {
        lang: json.loads((LOCALES_DIR / lang / "test.json").read_text(encoding="utf-8"))["report"]
        for lang in ("es", "en")
    }

    faltan_en = _claves(idiomas["es"]) - _claves(idiomas["en"])
    faltan_es = _claves(idiomas["en"]) - _claves(idiomas["es"])
    assert not faltan_en, f"sin traducir al ingles: {sorted(faltan_en)}"
    assert not faltan_es, f"sin traducir al castellano: {sorted(faltan_es)}"


def test_every_key_the_report_asks_for_is_translated():
    """Lo que la lista de arriba no ve: una clave que el codigo pide y que no
    existe en NINGUN idioma. i18next devuelve entonces la clave misma, asi
    que el PDF sale con "report.method.limits" impreso donde iba el parrafo
    que explica los limites del test."""
    codigo = (REPORT_DIR / "app.js").read_text(encoding="utf-8")
    catalogo = json.loads((LOCALES_DIR / "es" / "test.json").read_text(encoding="utf-8"))["report"]
    disponibles = _claves(catalogo)

    # tr("x.y") y tr(`sections.${...}`): las plantilladas se comprueban por su
    # prefijo, que es lo unico verificable estaticamente.
    pedidas = set(re.findall(r"tr\(\s*[\"']([a-zA-Z.]+)[\"']", codigo))
    prefijos = set(re.findall(r"tr\(\s*`([a-zA-Z.]+)\.\$\{", codigo))

    faltan = pedidas - disponibles
    assert not faltan, f"claves pedidas por el informe y no traducidas: {sorted(faltan)}"

    for prefijo in prefijos:
        assert any(c.startswith(f"{prefijo}.") for c in disponibles), \
            f"el informe pide {prefijo}.* y no hay ninguna clave asi"


@pytest.mark.parametrize("clave", ["method.how", "method.limits", "method.retake"])
def test_the_report_keeps_its_methodological_note(clave):
    """La nota que evita que un "87%" impreso con logo se lea como un
    veredicto. Es la unica parte del documento que no se puede recortar por
    espacio: va a manos de una familia decidiendo que estudia un menor."""
    for lang in ("es", "en"):
        catalogo = json.loads((LOCALES_DIR / lang / "test.json").read_text(encoding="utf-8"))
        seccion, campo = clave.split(".")
        texto = catalogo["report"][seccion][campo]
        assert len(texto) > 80, f"{lang}/{clave} se quedo en un titular"


# --------------------------------------------------------------------------
# Informe general de administracion (GET /api/v1/admin/report)
# --------------------------------------------------------------------------
def _answers_for(client, clusters):
    """Respuestas que marcan fuerte los clusters dados y flojo el resto."""
    preguntas = client.get("/api/v1/questions").json()["questions"]
    respuestas = []
    for indice, pregunta in enumerate(preguntas):
        opciones = pregunta.get("answers") or []
        if not opciones:
            continue
        cluster = (opciones[0].get("cluster") or "").upper()
        respuestas.append({
            "question_index": indice,
            "answer_index": 0 if cluster in clusters else len(opciones) - 1,
        })
    return respuestas


def test_the_general_report_needs_an_admin_session(client):
    """Son datos agregados de toda la plataforma. Sin sesion de admin no se
    devuelven ni recortados."""
    assert client.get("/api/v1/admin/report").status_code == 401


def test_the_general_report_counts_real_results(client, admin_headers):
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"TECHNICAL", "ANALYTICAL"}), "anon_id": "rep-a"})
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"SOCIAL", "CREATIVE"}), "anon_id": "rep-b"})

    datos = client.get("/api/v1/admin/report?lang=es", headers=admin_headers).json()

    assert datos["success"] is True
    assert datos["totals"]["tests_in_period"] >= 2
    assert datos["careers"], "el reparto de carreras salio vacio"
    # Perfiles opuestos no pueden colapsar en la misma carrera: si lo hicieran,
    # el informe estaria describiendo el sesgo del motor, no a la poblacion.
    assert len({fila["name"] for fila in datos["careers"]}) >= 2


def test_the_percentages_add_up_to_the_whole(client, admin_headers):
    """El porcentaje se calcula en el servidor sobre el total real. Si cada
    vista dividiera por su cuenta, dos secciones del mismo documento darian
    numeros distintos para lo mismo."""
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"SCIENTIFIC"}), "anon_id": "rep-c"})

    datos = client.get("/api/v1/admin/report?lang=es", headers=admin_headers).json()
    total = datos["totals"]["tests_in_period"]

    assert sum(fila["total"] for fila in datos["careers"]) == total
    assert abs(sum(fila["percent"] for fila in datos["careers"]) - 100) < 1.5
    assert sum(fila["total"] for fila in datos["categories"]) <= total


def test_the_report_admits_what_it_cannot_know(client, admin_headers):
    """Los tests anonimos y el tope de la muestra viajan en la respuesta.

    Sin esos dos campos el documento no puede decir su propio alcance, y un
    agregado que no dice su alcance se lee como un censo.
    """
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"LEADERSHIP"}), "anon_id": "rep-d"})

    datos = client.get("/api/v1/admin/report", headers=admin_headers).json()

    assert datos["totals"]["tests_anonymous"] >= 1
    assert set(datos["sample"]) == {"size", "limit", "truncated"}
    assert datos["sample"]["truncated"] is False
    assert datos["totals"]["users_with_results"] <= datos["totals"]["tests_total"]


def test_a_period_filter_narrows_the_report(client, admin_headers):
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"PRACTICAL"}), "anon_id": "rep-e"})

    completo = client.get("/api/v1/admin/report", headers=admin_headers).json()
    acotado = client.get("/api/v1/admin/report?days=30", headers=admin_headers).json()

    assert completo["period"]["days"] is None and completo["period"]["since"] is None
    assert acotado["period"]["days"] == 30 and acotado["period"]["since"]
    # Todo lo sembrado por la suite es de hoy, asi que 30 dias lo cubre entero.
    assert acotado["totals"]["tests_in_period"] == completo["totals"]["tests_in_period"]


def test_career_names_come_back_in_the_language_asked(client, admin_headers):
    """top_career_name se guardo con el idioma que tuviera el estudiante ese
    dia, asi que la tabla venia mezclada. El informe relee el nombre del
    catalogo para que una sola columna no tenga dos idiomas."""
    client.post("/api/v1/assess", json={
        "answers": _answers_for(client, {"TECHNICAL"}), "anon_id": "rep-f"})

    es = client.get("/api/v1/admin/report?lang=es", headers=admin_headers).json()
    en = client.get("/api/v1/admin/report?lang=en", headers=admin_headers).json()

    assert es["lang"] == "es" and en["lang"] == "en"
    nombres_es = [fila["name"] for fila in es["careers"]]
    nombres_en = [fila["name"] for fila in en["careers"]]
    assert nombres_es != nombres_en, "el idioma no cambia un solo nombre de carrera"


def test_a_corrupt_result_row_does_not_sink_the_report(client, admin_headers, app_module):
    """Una fila con JSON invalido se salta. El informe entero no puede caerse
    por un resultado que se guardo mal hace seis meses."""
    app_module.users_store.record_test_result(
        user_id=None, top_career_id=None, top_career_name=None, results_json="{ no es json",
    )

    respuesta = client.get("/api/v1/admin/report", headers=admin_headers)

    assert respuesta.status_code == 200
    assert respuesta.json()["success"] is True


def test_the_pdf_carries_all_eight_dimensions_explained():
    """En papel no hay donde pulsar.

    El radar de pantalla es interactivo: abres un eje y debajo aparece que
    mide y de cuantas respuestas sale. Un PDF no tiene esa afordancia, asi que
    si el documento solo trajera el eje que quedo abierto, explicaria UNA
    dimension de ocho y las otras siete quedarian como un numero sin
    procedencia. El informe imprime las ocho desarrolladas.
    """
    codigo = (REPORT_DIR / "app.js").read_text(encoding="utf-8")

    # La definicion de cada eje y el desglose de puntos, para todos.
    assert "radar.desc." in codigo, "el informe no imprime que mide cada dimension"
    assert "radar.measured" in codigo and "radar.notMeasured" in codigo, \
        "el informe no imprime de donde sale cada puntuacion"
    assert "rep-axis__what" in codigo and "rep-axis__how" in codigo

    # Y se recorre EJES entero, no una seleccion.
    assert re.search(r"EJES\s*\n?\s*\.map\(", codigo), \
        "las dimensiones del informe ya no salen de la lista completa de ejes"


def test_the_interactive_panel_is_not_printed():
    """Su contenido ya viene impreso para las ocho dimensiones. Dejarlo
    repetiria una de ellas -la que quedara abierta- justo bajo el grafico, y
    ademas invitaria por escrito a pulsar algo en una hoja de papel."""
    hoja = (REPORT_DIR / "page.css").read_text(encoding="utf-8")
    bloque = hoja.split("@media print", 1)[1]

    assert re.search(r"\.radar-detail\s*\{[^}]*display:\s*none", bloque), \
        "el panel de 'pulsa un eje' se imprimiria dentro del PDF"


def test_both_reports_share_one_cover_drawing():
    """El informe del estudiante y el de administracion usan el MISMO dibujo.

    Si cada uno se dibujara el suyo, a la primera correccion de la curva
    tendriamos dos aviones distintos volando en dos PDFs que se leen juntos.
    """
    compartido = (REPORT_DIR / "cover.js").read_text(encoding="utf-8")
    assert "export function portadaArte" in compartido

    for modulo in (REPORT_DIR / "app.js",
                   REPO_ROOT / "web" / "src" / "admin" / "report.js"):
        codigo = modulo.read_text(encoding="utf-8")
        assert "portadaArte" in codigo, f"{modulo.name} no usa la portada compartida"
        assert "cover-plane__wing" not in codigo, \
            f"{modulo.name} se dibuja su propio avion en vez de importarlo"
