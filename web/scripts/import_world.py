# -*- coding: utf-8 -*-
"""Importa el resto del mundo desde fuentes abiertas.

America esta curada a mano (21 paises + Colombia, 515 universidades con su
tipo y su sitio, agrupadas en 202 ciudades). Eso no se toca: es mejor dato del
que puede dar ninguna fuente automatica.

Lo que hace este script es llenar los otros ~180 paises con lo UNICO que se
puede verificar, y dejar explicitamente vacio todo lo demas.

La regla que gobierna el archivo, la misma de resources.json: aqui no se
inventa nada. Si la fuente no lo trae, queda en null y la interfaz lo dice.
Rellenar `type` con una adivinanza o el arriendo con una estimacion produce un
archivo que se ve completo y esta lleno de mentiras que nadie puede
distinguir de la verdad. Un estudiante planeando su vida sobre una cifra
inventada es un daño real, no un bug de presentacion.

NINGUNA FUENTE ES ODbL, y es a proposito. Hasta el 3 de septiembre de 2026 los
paises salian de mledoze/countries, que es ODbL-1.0: exige atribucion y ademas
obliga a compartir-igual las bases DERIVADAS. Y `world/` es exactamente eso,
una base derivada. Mientras FuturePilot era un proyecto tecnico daba igual; en
cuanto cobra, esa clausula deja de ser un detalle de licencia y pasa a ser un
riesgo legal sobre el producto entero. Se sustituyo por dos fuentes que dan lo
mismo sin compartir-igual, y no se vuelve a meter una ODbL aqui.

Fuentes, todas comprobadas antes de escribir esto:

  - Hipo/university-domains-list (MIT): 10.257 universidades en 201 paises,
    con dominio y sitio oficial. NO trae tipo ni ciudad.
  - GeoNames countryInfo.txt (CC BY 4.0): capital, moneda e idiomas de los 252.
  - Wikidata (CC0): el nombre del pais en español, quien es miembro de la ONU
    y como se llama cada idioma. Es lo unico que countryInfo.txt no trae.
  - Banco Mundial, indicador SP.POP.TOTL (CC BY 4.0): poblacion por pais.
  - censo_ciudades.json, que produce web/scripts/censo_ciudades.py cruzando
    GeoNames (ciudades con lat/lng) con Wikidata (universidades con lat/lng).

Ese ultimo es el que llena las ciudades. Durante mucho tiempo este archivo
las dejo vacias a proposito, y el comentario que lo explicaba decia:

    "la fuente de universidades trae provincia en solo el 14% de los casos,
     y provincia no es ciudad. Inventar el reparto por ciudades seria la peor
     clase de dato falso, porque parece preciso."

Sigue siendo verdad de Hipolabs. Lo que cambio es que ya no hace falta
inventarlo: el censo situa cada universidad por COORDENADAS y la asigna a la
ciudad mas cercana midiendo la distancia, que queda guardada. Una distancia
es comprobable; un parecido entre nombres no lo era. Si no hay ciudad a menos
del radio, la universidad se queda sin ciudad en vez de forzarla.

Se ejecuta a mano y vuelca el resultado al repo. No hay ninguna llamada en
tiempo de ejecucion: las APIs se mueren - la de restcountries se descontinuo
mientras preparaba esto - y la aplicacion no puede morirse con ellas.

    python web/scripts/import_world.py
"""
from __future__ import annotations

import argparse
import collections
import json
import re
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SALIDA = RAIZ / "web" / "src" / "database" / "countries" / "world"
SALIDA_U = SALIDA / "universities"
SALIDA_C = SALIDA / "cities"
CACHE = Path(__file__).resolve().parent / ".cache-world"
CENSO = Path(__file__).resolve().parent / "censo_ciudades.json"

# Cuantas universidades tiene que tener una ciudad para entrar en el bundle.
# No es un juicio sobre la ciudad: es que `cities` se lee de forma sincrona
# desde destinationService, o sea que va en la carga inicial del globo. Es el
# mismo motivo por el que las universidades nacionales se cargan aparte, y ahi
# se rechazaron 161 kB comprimidos. Medido en esta base:
#
#     min   ciudades   bundle inicial (gzip)
#       1      5.351          182 kB   <- mas que los 161 kB ya rechazados
#       2      2.668          102 kB
#       3      1.475           65 kB
#       5        687           41 kB
#
# El 2 no es un numero magico: es que una ciudad de una sola universidad se
# queda igualmente sin nada que enseñar hasta que alguien investigue su costo
# de vida, y hasta entonces son 80 kB que paga cada visitante del globo para
# ver un marcador vacio. Cuando esas ciudades tengan contenido, se baja a 1.
MIN_UNIVERSIDADES = 2

FUENTES = {
    "universidades": "https://raw.githubusercontent.com/Hipo/university-domains-list"
                     "/master/world_universities_and_domains.json",
    "poblacion": "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL"
                 "?format=json&mrnev=1&per_page=400",
}

GEONAMES_PAISES = "https://download.geonames.org/export/dump/countryInfo.txt"
QLEVER = "https://qlever.cs.uni-freiburg.de/api/wikidata"
AGENTE = "FuturePilot/1.0 (importador del mundo; contacto via repo)"

# Wikidata (CC0) aporta las tres cosas que countryInfo.txt no trae. Se pide a
# QLever, que sirve el mismo volcado de Wikidata; el endpoint oficial estaba
# en incidencia y limitando a 1 peticion por minuto cuando se escribio esto.
CONSULTAS = {
    # El nombre del pais en español. countryInfo.txt solo lo da en ingles.
    "nombres": """SELECT ?iso ?n WHERE {
      ?p wdt:P297 ?iso . ?p rdfs:label ?n . FILTER(LANG(?n)="es") }""",
    # Miembro de la ONU (P463 -> Q1065). Sustituye a `unMember`, y sirve para
    # el mismo filtro de antes: entra si es miembro o si tiene universidades.
    "onu": """SELECT ?iso WHERE {
      ?p wdt:P297 ?iso . ?p wdt:P463 wd:Q1065 }""",
    # ISO 639-1 -> nombre del idioma en español. countryInfo.txt da "et,ru"
    # y "et" en la ficha de un pais no le dice nada a nadie.
    "idiomas": """SELECT ?cod ?n WHERE {
      ?l wdt:P218 ?cod . ?l rdfs:label ?n . FILTER(LANG(?n)="es") }""",
}

# La etiqueta de Wikidata en español es a veces el nombre FORMAL, y para una
# ficha que lee un estudiante de bachillerato eso es peor: nadie busca su
# futuro en "Republica Popular China". Estas seis son las unicas donde la
# etiqueta automatica empeoraba el nombre que ya habia, revisadas una a una al
# cambiar de fuente. No es dato inventado - es como se llama la ficha - pero
# se deja explicito aqui para que se vea que es una decision y no un descuido.
#
# Suazilandia merece mencion aparte: no es solo mas largo, es que el pais se
# llama Esuatini desde 2018 y la etiqueta de Wikidata en español va atrasada.
NOMBRES_PROPIOS = {
    "CN": "China",              # etiqueta: República Popular China
    "TW": "Taiwán",             # etiqueta: República de China
    "NL": "Países Bajos",       # etiqueta: Reino de los Países Bajos
    "SZ": "Esuatini",           # etiqueta: Suazilandia (nombre anterior a 2018)
    "MM": "Myanmar",            # etiqueta: Birmania
    "FM": "Micronesia",         # etiqueta: Estados Federados de Micronesia
}

# Los que ya estan curados a mano. El importador no los toca ni los duplica.
YA_CURADOS = {
    "AR", "BO", "BR", "CA", "CL", "CO", "CR", "CU", "DO", "EC", "GT", "HN",
    "HT", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "US", "UY",
}

# countryInfo.txt trae el continente en dos letras. NA y SA se juntan en
# "América" para no cambiar lo que ya ensena la interfaz de los 22 curados.
CONTINENTES = {
    "AF": "África", "NA": "América", "SA": "América", "AS": "Asia",
    "EU": "Europa", "OC": "Oceanía", "AN": "Antártida",
}

# Ninguna es ODbL. GeoNames y el Banco Mundial piden atribucion (esta lista y
# world/FUENTES.md la dan); Wikidata es CC0 y no pide nada. Ver el comentario
# de arriba sobre por que se saco mledoze/countries.
ATRIBUCION = [
    "Hipo/university-domains-list (MIT)",
    "GeoNames (CC BY 4.0)",
    "Wikidata (CC0)",
    "Banco Mundial, SP.POP.TOTL",
]


def bajar(nombre: str) -> object:
    """Descarga con cache en disco: reejecutar no vuelve a pedir 12 MB."""
    CACHE.mkdir(exist_ok=True)
    destino = CACHE / f"{nombre}.json"
    if not destino.exists():
        print(f"  bajando {nombre}...")
        with urllib.request.urlopen(FUENTES[nombre], timeout=120) as r:
            destino.write_bytes(r.read())
    return json.loads(destino.read_text(encoding="utf-8"))


def bajar_paises() -> list[dict]:
    """Los paises desde GeoNames countryInfo.txt (CC BY 4.0).

    Sustituye a mledoze/countries, que era ODbL-1.0. La ODbL tiene clausula de
    compartir-igual sobre las bases derivadas, y `world/` ES una base derivada:
    con FuturePilot cobrando, esa clausula pasa de detalle a riesgo legal. Esta
    columna a columna da lo mismo - capital, moneda, idiomas - con atribucion
    y sin compartir-igual. Lo unico que no traia (nombre en español, ONU,
    nombre del idioma) lo pone Wikidata, que es CC0.
    """
    CACHE.mkdir(exist_ok=True)
    destino = CACHE / "countryInfo.txt"
    if not destino.exists():
        print("  bajando countryInfo.txt...")
        req = urllib.request.Request(GEONAMES_PAISES, headers={"User-Agent": AGENTE})
        with urllib.request.urlopen(req, timeout=120) as r:
            destino.write_bytes(r.read())

    paises = []
    for linea in destino.read_text(encoding="utf-8").splitlines():
        if linea.startswith("#") or not linea.strip():
            continue
        c = linea.split("\t")
        if len(c) < 17 or not c[0].strip():
            continue
        paises.append({
            "iso2": c[0].strip(),
            "iso3": c[1].strip(),
            "nombreEn": c[4].strip(),
            "capital": c[5].strip() or None,
            "continente": c[8].strip(),
            "moneda": c[10].strip() or None,
            "idiomas": [i.split("-")[0].lower()
                        for i in c[15].split(",") if i.strip()],
        })
    return paises


def sparql(nombre: str) -> list[dict]:
    """Una consulta a Wikidata (CC0), cacheada en disco."""
    CACHE.mkdir(exist_ok=True)
    destino = CACHE / f"wikidata-{nombre}.json"
    if not destino.exists():
        print(f"  consultando wikidata: {nombre}...")
        prefijos = ("PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n"
                    "PREFIX wd: <http://www.wikidata.org/entity/>\n"
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n")
        url = QLEVER + "?" + urllib.parse.urlencode(
            {"query": prefijos + CONSULTAS[nombre]})
        req = urllib.request.Request(url, headers={
            "User-Agent": AGENTE,
            "Accept": "application/sparql-results+json",
        })
        with urllib.request.urlopen(req, timeout=180) as r:
            destino.write_bytes(r.read())
    return json.loads(destino.read_text(encoding="utf-8"))["results"]["bindings"]


def slug(texto: str) -> str:
    plano = "".join(
        c for c in unicodedata.normalize("NFD", texto.lower())
        if unicodedata.category(c) != "Mn"
    )
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", plano)).strip("-")


def js(valor) -> str:
    """Un valor de Python como literal de JavaScript."""
    return json.dumps(valor, ensure_ascii=False)


def normalizar(nombre: str) -> str:
    """Un nombre de universidad reducido a lo comparable.

    Sirve para cruzar la lista de Wikidata (que sabe donde esta cada
    universidad) con la de Hipolabs (que sabe su sitio web). El cruce es por
    igualdad exacta despues de normalizar: sin acentos, sin puntuacion, sin
    articulos. Se descarta a proposito cualquier parecido aproximado - dos
    universidades distintas de la misma ciudad se llaman casi igual, y un
    sitio web equivocado manda a un estudiante a otra institucion.
    """
    plano = "".join(
        c for c in unicodedata.normalize("NFD", nombre.lower())
        if unicodedata.category(c) != "Mn"
    )
    palabras = re.sub(r"[^a-z0-9\s]", " ", plano).split()
    vacias = {"the", "of", "de", "del", "la", "el", "los", "las", "and", "y", "at"}
    return " ".join(p for p in palabras if p not in vacias)


def cargar_censo() -> dict[str, dict]:
    """El censo de ciudades universitarias, indexado por ISO-2."""
    if not CENSO.exists():
        print(f"  AVISO: no encuentro {CENSO.name}. Los paises quedaran sin")
        print("  ciudades, como antes. Genera el censo con:")
        print("      python web/scripts/censo_ciudades.py\n")
        return {}
    return json.loads(CENSO.read_text(encoding="utf-8"))["paises"]


def construir_ciudades(datos_pais: dict, id_pais: str, nombre_pais: str,
                       capital: str | None, sitios: dict[str, str],
                       minimo: int) -> tuple[list[dict], int]:
    """Las ciudades de un pais, con sus universidades ya situadas.

    Devuelve la lista y cuantas universidades quedaron enlazadas a una ciudad.
    El sitio web solo se pone si el nombre normalizado cuadra exactamente con
    una entrada de Hipolabs; si no, queda en null como cualquier otro dato que
    la fuente no da.
    """
    capital_normalizada = normalizar(capital or "")
    ciudades, enlazadas = [], 0

    candidatas = [c for c in datos_pais.get("ciudades", [])
                  if len(c["universidades"]) >= minimo]

    # Dos ciudades distintas pueden dar el mismo slug: en Alemania, Münster y
    # Munster son sitios diferentes y ambos salen "alemania-munster". El
    # resumen listaba las dos y el archivo diferido, que es un objeto, se
    # quedaba con la ultima - la otra ciudad existia en el globo y al abrirla
    # ensenaba las universidades de su homonima. Se desambigua con el
    # geonameId, que no cambia entre ejecuciones; un contador si cambiaria,
    # porque el censo ordena las ciudades por numero de universidades.
    repetidos = collections.Counter(slug(c["nombre"]) for c in candidatas)

    for c in candidatas:
        base = slug(c["nombre"])
        id_ciudad = (f"{id_pais}-{base}" if repetidos[base] == 1
                     else f"{id_pais}-{base}-{c['geonameId']}")
        universidades = []
        for u in c["universidades"]:
            if not u["nombre"]:
                continue
            universidades.append({
                "id": f"{id_ciudad}-{slug(u['nombre'])}"[:140],
                "name": u["nombre"],
                "cityId": id_ciudad,
                "website": sitios.get(normalizar(u["nombre"])),
                "km": u["km"],
            })
        enlazadas += len(universidades)
        ciudades.append({
            "id": id_ciudad,
            "name": c["nombre"],
            "coordinates": {"lat": c["lat"], "lng": c["lng"]},
            "isCapital": bool(capital_normalizada)
                         and normalizar(c["nombre"]) == capital_normalizada,
            "population": c["poblacion"] or None,
            "universities": universidades,
        })
    return ciudades, enlazadas


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("--min-universidades", type=int, default=MIN_UNIVERSIDADES,
                   help="universidades minimas para que una ciudad entre en el "
                        f"bundle (por defecto {MIN_UNIVERSIDADES})")
    args = p.parse_args()

    print("Importando el mundo desde fuentes abiertas.\n")
    universidades = bajar("universidades")
    poblacion_cruda = bajar("poblacion")
    paises = bajar_paises()
    censo = cargar_censo()

    # Lo que countryInfo.txt no trae, desde Wikidata (CC0). El primero gana:
    # un ISO puede repetirse por entidades historicas de Wikidata.
    nombres_es: dict[str, str] = {}
    for f in sparql("nombres"):
        nombres_es.setdefault(f["iso"]["value"].upper(), f["n"]["value"])
    miembros_onu = {f["iso"]["value"].upper() for f in sparql("onu")}
    idiomas_es: dict[str, str] = {}
    for f in sparql("idiomas"):
        idiomas_es.setdefault(f["cod"]["value"].lower(), f["n"]["value"])

    # Poblacion por codigo ISO-3.
    poblacion = {
        fila["countryiso3code"]: int(fila["value"])
        for fila in (poblacion_cruda[1] if len(poblacion_cruda) > 1 else [])
        if fila.get("value") and fila.get("countryiso3code")
    }

    # Universidades agrupadas por codigo ISO-2.
    por_pais: dict[str, list] = {}
    for u in universidades:
        codigo = (u.get("alpha_two_code") or "").upper()
        if codigo:
            por_pais.setdefault(codigo, []).append(u)

    SALIDA.mkdir(parents=True, exist_ok=True)
    SALIDA_U.mkdir(parents=True, exist_ok=True)
    SALIDA_C.mkdir(parents=True, exist_ok=True)
    for viejo in (list(SALIDA.glob("*.js")) + list(SALIDA_U.glob("*.js"))
                  + list(SALIDA_C.glob("*.js"))):
        viejo.unlink()

    escritos, total_u, sin_universidades = [], 0, []
    total_ciudades, total_enlazadas, sin_ciudades = 0, 0, []
    for pais in sorted(paises, key=lambda c: c["nombreEn"]):
        cca2 = pais["iso2"]
        if cca2 in YA_CURADOS:
            continue
        # Se queda fuera lo que no es un sitio donde alguien pueda estudiar.
        # El dataset trae la Antartida y la Isla Bouvet: son paises en sentido
        # geografico, pero listarlos como destino academico es ruido. El
        # criterio: miembro de la ONU, o que tenga al menos una universidad
        # (asi entran Hong Kong o Groenlandia sin abrir la puerta a los islotes
        # deshabitados).
        if cca2 not in miembros_onu and not por_pais.get(cca2):
            continue

        nombre_en = pais["nombreEn"]
        # Si Wikidata no tiene el nombre en español, se usa el ingles antes que
        # dejar el pais fuera: un nombre sin traducir es un defecto visible y
        # arreglable; un pais que no aparece no lo nota nadie.
        nombre_es = NOMBRES_PROPIOS.get(cca2) or nombres_es.get(cca2) or nombre_en
        identificador = slug(nombre_es)
        if not identificador:
            continue

        # "et" no le dice nada a nadie en la ficha de un pais; "estonio" si.
        # Si el codigo no esta en Wikidata se queda el codigo, que al menos es
        # cierto, en vez de inventar un nombre.
        idiomas = [idiomas_es.get(c, c) for c in pais["idiomas"]]
        monedas = [pais["moneda"]] if pais["moneda"] else []
        capital = pais["capital"]

        lista = por_pais.get(cca2, [])
        total_u += len(lista)
        if not lista:
            sin_universidades.append(nombre_es)

        # Un pais puede repetir el nombre de universidad; el id lleva un
        # sufijo para que siga siendo unico y estable entre ejecuciones.
        vistos: dict[str, int] = {}
        entradas = []
        for u in sorted(lista, key=lambda x: x["name"]):
            base = f"{identificador}-{slug(u['name'])}"[:120]
            vistos[base] = vistos.get(base, 0) + 1
            uid = base if vistos[base] == 1 else f"{base}-{vistos[base]}"
            sitio = (u.get("web_pages") or [None])[0]
            entradas.append(
                "    defineUniversity({\n"
                f"      id: {js(uid)},\n"
                f"      name: {js(u['name'])},\n"
                "      cityId: null,\n"
                f"      website: {js(sitio)},\n"
                "      // La fuente abierta no dice si es publica o privada.\n"
                "      // Se queda en null: una etiqueta adivinada se ve igual\n"
                "      // que una cierta, y por eso es peor que ninguna.\n"
                "      type: null,\n"
                '      source: "open-dataset",\n'
                "    }),"
            )

        # GeoNames antepone el articulo en algunos ("The Netherlands"), y el
        # mapa del globo no ("Netherlands"): sin la variante sin articulo, ese
        # pais queda mudo al hacer clic y nada lo delata. Ver mapQuirks en
        # countryService para las manias del mapa que esto no cubre.
        sin_articulo = re.sub(r"^the\s+", "", nombre_en, flags=re.I)
        alias_pais = sorted(
            {slug(nombre_en), slug(sin_articulo), identificador} - {""}
        )

        # Las ciudades del censo. Hipolabs aporta aqui solo el sitio web, por
        # cruce exacto de nombre; de donde esta cada universidad se encarga el
        # censo, que lo sabe por coordenadas.
        sitios = {
            normalizar(u["name"]): (u.get("web_pages") or [None])[0]
            for u in lista if u.get("name")
        }
        ciudades, enlazadas = construir_ciudades(
            censo.get(cca2, {}), identificador, nombre_es, capital, sitios,
            args.min_universidades,
        )
        total_ciudades += len(ciudades)
        total_enlazadas += enlazadas
        if not ciudades and lista:
            sin_ciudades.append(nombre_es)

        # El resumen que va en el bundle: lo justo para pintar el marcador en
        # el globo y ordenar destinos. Las universidades de cada ciudad NO van
        # aqui - son 16.000 y `cities` se lee sincrono en el arranque.
        # Un `cities` vacio tiene dos causas muy distintas y hay que poder
        # distinguirlas: o el pais no tiene universidades, o Wikidata lo cubre
        # mal. La segunda es un hueco de la fuente, no un hecho sobre el pais,
        # y si no se dice aqui alguien acabara creyendo que Estonia no tiene
        # universidades cuando tiene diez.
        minimo = args.min_universidades
        plural = "universidad" if minimo == 1 else "universidades"
        if ciudades:
            nota = (f"// Ciudades con al menos {minimo} {plural} situada"
                    f"{'s' if minimo != 1 else ''} por coordenadas (GeoNames x\n"
                    f"// Wikidata, ver censo_ciudades.py). Solo el resumen: que\n"
                    f"// universidades tiene cada una vive en ./cities/{identificador}.js\n"
                    "// y se pide al abrir la ciudad. Sin costo de vida ni cultura.")
        elif not lista:
            nota = ("// Sin ciudades: la fuente no le conoce ninguna universidad\n"
                    "// a este pais. No es que no las tenga; es que no constan.")
        else:
            vistas = len(censo.get(cca2, {}).get("ciudades", []))
            nota = (f"// Sin ciudades: Hipolabs le ve {len(lista)} universidades, pero\n"
                    f"// Wikidata solo situa {vistas} ciudad(es) que llegue(n) al minimo\n"
                    f"// de {minimo}. Es un hueco de la fuente, NO que el pais no tenga\n"
                    "// universidades. Se cura a mano o con otra fuente.")

        resumen = "\n".join(
            "    defineCity({\n"
            f"      id: {js(c['id'])},\n"
            f"      name: {js(c['name'])},\n"
            f"      coordinates: {js(c['coordinates'])},\n"
            f"      isCapital: {js(c['isCapital'])},\n"
            f"      universityCount: {len(c['universities'])},\n"
            f"      statistics: {{ population: {js(c['population'])} }},\n"
            "      countryId,\n"
            "      countryName,\n"
            "    }),"
            for c in ciudades
        )

        cuerpo = f'''// {nombre_es} — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import {{ {"defineCity, " if ciudades else ""}defineCountry }} from "../schema.js";

const countryId = {js(identificador)};
const countryName = {js(nombre_es)};

{nota}
const cities = [
{resumen}
];

export default defineCountry({{
  id: countryId,
  name: countryName,
  nameEn: {js(nombre_en)},
  capital: {js(capital)},
  currency: {js(next(iter(monedas), None))},
  language: {js(idiomas[0] if idiomas else None)},
  continent: {js(CONTINENTES.get(pais["continente"], pais["continente"]))},
  population: {js(poblacion.get(pais["iso3"]))},
  cities,
  // Las universidades no van aqui: viven en ./universities/{identificador}.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: {len(entradas)},
  aliases: {js(alias_pais)},
  dataStatus: "source-open-dataset",
  sources: {js(ATRIBUCION)},
}});
'''
        (SALIDA / f"{identificador}.js").write_text(cuerpo, encoding="utf-8")

        if ciudades:
            bloques = []
            for c in ciudades:
                us = "\n".join(
                    "      defineUniversity({\n"
                    f"        id: {js(u['id'])},\n"
                    f"        name: {js(u['name'])},\n"
                    f"        cityId: {js(u['cityId'])},\n"
                    f"        website: {js(u['website'])},\n"
                    '        source: "open-dataset",\n'
                    f"        // Situada a {u['km']} km del centro de "
                    f"{c['name']} (Wikidata).\n"
                    "      }),"
                    for u in c["universities"]
                )
                bloques.append(
                    f"  {js(c['id'])}: [\n{us}\n  ],"
                )
            detalle = f'''// Universidades por ciudad de {nombre_es}. Generado; no editar a mano.
//
// Se carga bajo demanda al abrir una ciudad, no en el arranque del globo.
// Cada universidad lleva en un comentario a cuantos km del centro de la
// ciudad esta: es lo que justifica la asignacion, y permite revisarla. Las
// que quedaron a mas del radio no estan en ningun sitio, que es lo correcto.
//
// `type` va en null siempre: la fuente abierta no dice si es publica o
// privada. `website` solo aparece si el nombre cuadra exactamente con una
// entrada de Hipolabs.

import {{ defineUniversity }} from "../../schema.js";

export default {{
{chr(10).join(bloques)}
}};
'''
            (SALIDA_C / f"{identificador}.js").write_text(detalle, encoding="utf-8")

        # Los 14 paises sin ninguna universidad en la fuente generan una lista
        # vacia; importar defineUniversity ahi deja un error de lint por cada
        # uno, y el ruido acaba tapando los errores que si importan.
        lista_js = f'''// Universidades de {nombre_es}. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.
{'''
import { defineUniversity } from "../../schema.js";
''' if entradas else ""}
export default [
{chr(10).join(entradas)}
];
'''
        (SALIDA_U / f"{identificador}.js").write_text(lista_js, encoding="utf-8")
        escritos.append((identificador, nombre_es, len(lista)))

    # El indice del continente, con el mismo patron que americas/index.js.
    imports = "\n".join(
        f'import {re.sub(r"[^a-z0-9]", "_", i)} from "./{i}.js";' for i, _, _ in escritos
    )
    mapa = "\n".join(
        f'  {js(i)}: {re.sub(r"[^a-z0-9]", "_", i)},' for i, _, _ in escritos
    )
    (SALIDA / "index.js").write_text(
        "// Generado por web/scripts/import_world.py. No editar a mano.\n"
        f"// {len(escritos)} paises importados de fuentes abiertas.\n\n"
        f"{imports}\n\nexport const countries = {{\n{mapa}\n}};\n\n"
        "export default countries;\n",
        encoding="utf-8",
    )

    print(f"\n  {len(escritos)} paises escritos en {SALIDA.relative_to(RAIZ)}")
    print(f"  {total_u} universidades importadas (lista nacional, Hipolabs)")
    print(f"  {len(sin_universidades)} paises sin ninguna universidad en la fuente")
    if sin_universidades:
        print("    " + ", ".join(sin_universidades[:8])
              + (" ..." if len(sin_universidades) > 8 else ""))

    print(f"\n  {total_ciudades:,} ciudades con universidad situada por coordenadas")
    print(f"  {total_enlazadas:,} universidades enlazadas a una ciudad (Wikidata)")
    con_sitio = sum(
        1 for f in SALIDA_C.glob("*.js")
        for linea in f.read_text(encoding="utf-8").splitlines()
        if linea.strip().startswith("website:") and "null" not in linea
    )
    print(f"  {con_sitio:,} de ellas con sitio web (cruce exacto con Hipolabs)")
    if sin_ciudades:
        print(f"  {len(sin_ciudades)} paises con universidades pero sin ciudad "
              "en el censo:")
        print("    " + ", ".join(sin_ciudades[:8])
              + (" ..." if len(sin_ciudades) > 8 else ""))

    pesado = sum(f.stat().st_size for f in SALIDA.glob("*.js"))
    diferido = sum(f.stat().st_size for f in SALIDA_C.glob("*.js"))
    print(f"\n  Bundle inicial (paises + resumen de ciudades): {pesado / 1024:,.0f} kB")
    print(f"  Carga diferida (universidades por ciudad):     {diferido / 1024:,.0f} kB")
    print("\n  Nada de costo de vida, salarios ni cultura: eso no se importa.")


if __name__ == "__main__":
    main()
