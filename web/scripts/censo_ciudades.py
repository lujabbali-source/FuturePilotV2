# -*- coding: utf-8 -*-
"""Censo: cuantas ciudades investigables hay en el mundo, pais por pais.

Esto NO escribe en la base de datos. Es el paso previo: contar, para poder
decidir con numeros donde se corta. La pregunta que responde es una sola:

    si el panel de una ciudad pide universidades, becas, presupuesto de
    estudiante y empleo, cuantas ciudades del mundo tienen de verdad algo
    que contar ahi?

Porque "todas las ciudades de los 195 paises" son cientos de miles, y la
inmensa mayoria no tiene una sola universidad. Investigar esas es pagar por
que un modelo rellene un panel inventado. El filtro honesto es: tiene
universidad, si o no.

El enlace universidad -> ciudad es el problema que dejo abierto
import_world.py ("Hipolabs NO trae tipo ni ciudad", y por eso ~180 paises
quedaron con cities: [] y cityId: null). Aqui se resuelve sin adivinar:

  - GeoNames da las ciudades con lat/lng y poblacion: 34.128.
  - Wikidata da las universidades: 15.575 con coordenadas propias y 4.237 mas
    que no las tienen pero declaran municipio (P131). Las segundas van
    marcadas con origen "ciudad-declarada" y sin kilometros.
  - Cada universidad se asigna a la ciudad mas cercana DEL MUNDO midiendo la
    distancia, y esa distancia queda guardada en el informe.

El emparejamiento es global, no pais por pais, y eso arregla dos cosas a la
vez. La primera: el pais de una universidad lo da la ciudad donde cae, no lo
que declare Wikidata, que en los territorios dependientes pone el estado
soberano (las de Guam salian bajo Estados Unidos, las de Macao bajo China, y
doce territorios aparecian sin ninguna universidad teniendolas). La segunda:
entran las 162 que no tienen pais puesto.

Una distancia es un dato verificable; un parecido entre "Universidad de
Antioquia" y una lista de nombres de ciudad es una corazonada. La diferencia
importa: sobre estas cifras alguien decide una mudanza.

Lo que no encaja no se fuerza. Una universidad a mas de RADIO_KM de cualquier
ciudad conocida se cuenta como "sin asignar" y sale en el informe. Ese numero
es util por si mismo: si es alto, el corte de poblacion es demasiado grueso y
hay que bajar de cities15000 a cities5000 o cities1000.

Sobre de donde salen las universidades: NO se usa query.wikidata.org. El
servicio oficial estaba en incidencia y limitando a 1 peticion por minuto
mientras se escribio esto, lo que convierte el censo en cuatro horas de
espera. QLever (Universidad de Friburgo) sirve los mismos datos de Wikidata
por SPARQL y resuelve el mundo entero en 19 segundos. WDQS queda como
respaldo por si QLever cae; da igual cual conteste, el dato es el mismo.

Hipolabs entra solo como control: si un pais tiene 300 universidades ahi y 4
en Wikidata, el censo lo marca como mal cubierto en vez de dejarte creer que
ese pais no tiene universidades.

Fuentes, todas abiertas:

  - GeoNames (CC BY 4.0): cities15000 / cities5000 / cities1000, countryInfo.
  - Wikidata (CC0) via QLever: universidades con coordenadas.
  - Hipo/university-domains-list (MIT): control de cobertura.

Se ejecuta a mano. Cachea todo en disco: reejecutar no vuelve a bajar nada.

    python web/scripts/censo_ciudades.py
    python web/scripts/censo_ciudades.py --ciudades cities5000
    python web/scripts/censo_ciudades.py --radio 50
"""
from __future__ import annotations

import argparse
import collections
import csv
import hashlib
import io
import json
import math
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
CACHE = Path(__file__).resolve().parent / ".cache-censo"
SALIDA = Path(__file__).resolve().parent / "censo_ciudades.json"

GEONAMES = "https://download.geonames.org/export/dump"
HIPOLABS = ("https://raw.githubusercontent.com/Hipo/university-domains-list"
            "/master/world_universities_and_domains.json")
AGENTE = "FuturePilot/1.0 (censo de ciudades universitarias; contacto via repo)"

# Los dos endpoints SPARQL, en orden de preferencia. Mismos datos de Wikidata.
ENDPOINTS = [
    ("qlever", "https://qlever.cs.uni-freiburg.de/api/wikidata"),
    ("wdqs", "https://query.wikidata.org/sparql"),
]

# A cuanto de una ciudad tiene que estar una universidad para considerarla
# suya. 30 km cubre un campus a las afueras sin llegar a la ciudad siguiente.
RADIO_KM = 30.0

# Tamano de pagina. El mundo entero de una vez corta la conexion; 10.000 no.
PAGINA = 10000

# Ni la Antartida ni los islotes deshabitados son destinos academicos. Mismo
# criterio que import_world.py: se listan si tienen universidad.
SALTAR = {"AQ", "BV", "HM", "GS", "UM"}

# Universidades con coordenadas. P31/P279* Q3918 recoge tambien politecnicos y
# escuelas superiores, que para un estudiante son destino igual.
#
# NO se pide el pais (P17), y es a proposito. Wikidata pone en P17 el estado
# SOBERANO, asi que las universidades de Guam salian bajo Estados Unidos, las
# de Macao bajo China y las de Reunion, Guadalupe, Guayana Francesa, Nueva
# Caledonia y Polinesia bajo Francia. Doce territorios aparecian sin ninguna
# universidad cuando en realidad las tienen: no faltaban, estaban contadas en
# otro pais. Filtrar por P17 era la causa, no el sintoma.
#
# El pais sale ahora de la ciudad en la que cae la universidad, que GeoNames ya
# sabe y que ademas es la respuesta correcta a la pregunta que importa: no
# "de quien depende este territorio" sino "donde va a vivir el estudiante".
# De paso entran 162 universidades que no tenian P17 puesto.
CONSULTA = """
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?u ?nombre ?coord WHERE {{
  ?u wdt:P31/wdt:P279* wd:Q3918 .
  ?u wdt:P625 ?coord .
  OPTIONAL {{ ?u rdfs:label ?nombre . FILTER(LANG(?nombre) = "en") }}
}}
ORDER BY ?u
LIMIT {limite} OFFSET {salto}
"""

# Segunda pasada: las que NO tienen coordenadas propias pero SI dicen en que
# municipio estan (P131), y ese municipio tiene coordenadas.
#
# Son 4.237, un 27% mas sobre las 15.575 de la primera pasada, y no son casos
# raros: la Universidad de Tartu es una de ellas. Wikidata la tiene bien
# clasificada y con su ciudad, pero nadie le ha puesto lat/lng, y por eso
# Estonia salia con una sola universidad teniendo diez.
#
# La diferencia con la primera pasada importa y se guarda: aqui la ubicacion
# es el centro del municipio que Wikidata DECLARA, no la del campus. Por eso
# estas van con origen "ciudad-declarada" y sin kilometros - un "a 2,4 km del
# centro" seria mentira, porque la distancia medida no es la del campus sino
# la del centro del municipio contra el centro de la ciudad de GeoNames.
CONSULTA_DECLARADA = """
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?u ?nombre ?coord ?municipio WHERE {{
  ?u wdt:P31/wdt:P279* wd:Q3918 .
  FILTER NOT EXISTS {{ ?u wdt:P625 ?propia }}
  ?u wdt:P131 ?adm .
  ?adm wdt:P625 ?coord .
  OPTIONAL {{ ?adm rdfs:label ?municipio . FILTER(LANG(?municipio) = "en") }}
  OPTIONAL {{ ?u rdfs:label ?nombre . FILTER(LANG(?nombre) = "en") }}
}}
ORDER BY ?u
LIMIT {limite} OFFSET {salto}
"""


# --------------------------------------------------------------------------
# Descarga con cache
# --------------------------------------------------------------------------

def bajar(url: str, nombre: str, binario: bool = False) -> bytes | str:
    """Baja una vez y guarda. Reejecutar no vuelve a pedir nada."""
    CACHE.mkdir(exist_ok=True)
    destino = CACHE / nombre
    if not destino.exists():
        print(f"        bajando {nombre}...", flush=True)
        req = urllib.request.Request(url, headers={"User-Agent": AGENTE})
        with urllib.request.urlopen(req, timeout=300) as r:
            destino.write_bytes(r.read())
    datos = destino.read_bytes()
    return datos if binario else datos.decode("utf-8")


def sparql(query: str, nombre: str) -> list[dict]:
    """Una pagina SPARQL, cacheada. Prueba QLever y cae a WDQS si hace falta.

    El nombre del archivo lleva un hash de la consulta. Sin el, cambiar la
    consulta y reejecutar devolvia en silencio los resultados de la consulta
    ANTERIOR - que es justo como se puede pasar una tarde depurando un cambio
    que si estaba bien. Al cambiar la consulta, el hash cambia y la cache
    vieja se queda ahi sin estorbar (se puede borrar a mano).
    """
    CACHE.mkdir(exist_ok=True)
    firma = hashlib.sha256(query.encode("utf-8")).hexdigest()[:8]
    destino = CACHE / f"sparql-{nombre}-{firma}.json"
    if destino.exists():
        return json.loads(destino.read_text(encoding="utf-8"))["results"]["bindings"]

    ultimo_error = None
    for etiqueta, base in ENDPOINTS:
        url = base + "?" + urllib.parse.urlencode({"query": query, "format": "json"})
        req = urllib.request.Request(url, headers={
            "User-Agent": AGENTE,
            "Accept": "application/sparql-results+json",
        })
        for intento in range(3):
            try:
                with urllib.request.urlopen(req, timeout=300) as r:
                    crudo = r.read()
                json.loads(crudo)  # que no se cachee una respuesta rota
                destino.write_bytes(crudo)
                return json.loads(crudo)["results"]["bindings"]
            except Exception as e:  # noqa: BLE001 - da igual por que fallo
                ultimo_error = f"{etiqueta}: {type(e).__name__}: {e}"
                print(f"        {ultimo_error}", flush=True)
                time.sleep(5 * (intento + 1))
    raise RuntimeError(f"Ningun endpoint SPARQL respondio. Ultimo: {ultimo_error}")


# --------------------------------------------------------------------------
# Fuentes
# --------------------------------------------------------------------------

def cargar_paises() -> dict[str, dict]:
    """countryInfo.txt de GeoNames: ISO2 -> nombre, continente, poblacion."""
    texto = bajar(f"{GEONAMES}/countryInfo.txt", "countryInfo.txt")
    paises = {}
    for linea in texto.splitlines():
        if linea.startswith("#") or not linea.strip():
            continue
        c = linea.split("\t")
        if len(c) < 9:
            continue
        iso2 = c[0].strip()
        if not iso2 or iso2 in SALTAR:
            continue
        paises[iso2] = {
            "iso2": iso2,
            "nombre": c[4].strip(),
            "continente": c[8].strip(),
            "poblacion": int(c[7]) if c[7].strip().isdigit() else None,
        }
    return paises


def cargar_ciudades(dataset: str) -> dict[str, list[dict]]:
    """GeoNames citiesNNNNN: ciudades con lat/lng y poblacion, por pais."""
    crudo = bajar(f"{GEONAMES}/{dataset}.zip", f"{dataset}.zip", binario=True)
    with zipfile.ZipFile(io.BytesIO(crudo)) as z:
        texto = z.read(f"{dataset}.txt").decode("utf-8")

    por_pais: dict[str, list[dict]] = {}
    for fila in csv.reader(io.StringIO(texto), delimiter="\t", quoting=csv.QUOTE_NONE):
        if len(fila) < 15:
            continue
        iso2 = fila[8].strip()
        if not iso2 or iso2 in SALTAR:
            continue
        try:
            lat, lng = float(fila[4]), float(fila[5])
        except ValueError:
            continue
        por_pais.setdefault(iso2, []).append({
            "geonameId": int(fila[0]),
            "nombre": fila[1],
            "lat": lat,
            "lng": lng,
            "poblacion": int(fila[14]) if fila[14].strip().isdigit() else 0,
            "universidades": [],
        })
    return por_pais


def cargar_universidades() -> list[dict]:
    """Wikidata: todas las universidades del mundo con coordenadas.

    Sin agrupar por pais: de eso se encarga la asignacion, que mira donde cae
    cada una. Ver el comentario de CONSULTA sobre por que no se usa P17.
    """
    vistas: dict[str, dict] = {}

    # Orden importante: primero las que tienen coordenadas propias. Si una
    # aparece en las dos pasadas, se queda la medida y no la declarada.
    for consulta, etiqueta, origen in (
        (CONSULTA, "univ", "coordenadas"),
        (CONSULTA_DECLARADA, "univ-declarada", "ciudad-declarada"),
    ):
        salto, recogidas = 0, 0
        while True:
            filas = sparql(consulta.format(limite=PAGINA, salto=salto),
                           f"{etiqueta}-{salto}")
            for f in filas:
                punto = f["coord"]["value"]  # "POINT(lng lat)"
                try:
                    lng, lat = punto[punto.index("(") + 1:punto.rindex(")")].split()
                    lat, lng = float(lat), float(lng)
                except (ValueError, IndexError):
                    continue
                qid = f["u"]["value"].rsplit("/", 1)[-1]
                # Una universidad con varias etiquetas sale repetida; la
                # primera gana y las demas se descartan por qid.
                if qid in vistas:
                    continue
                vistas[qid] = {
                    "qid": qid,
                    "nombre": f.get("nombre", {}).get("value", ""),
                    "lat": lat,
                    "lng": lng,
                    "origen": origen,
                    "municipio": f.get("municipio", {}).get("value"),
                }
                recogidas += 1
            if len(filas) < PAGINA:
                break
            salto += PAGINA
        print(f"        {origen:16}: {recogidas:6} universidades", flush=True)

    return list(vistas.values())


def cargar_hipolabs() -> dict[str, int]:
    """Control de cobertura: cuantas universidades ve la otra fuente."""
    datos = json.loads(bajar(HIPOLABS, "hipolabs.json"))
    return collections.Counter(
        (u.get("alpha_two_code") or "").upper() for u in datos
        if u.get("alpha_two_code")
    )


# --------------------------------------------------------------------------
# Asignacion por distancia
# --------------------------------------------------------------------------

def haversine(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Distancia en km sobre la superficie de la Tierra."""
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (math.sin(dlat / 2) ** 2
         + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
         * math.sin(dlng / 2) ** 2)
    return 2 * 6371.0 * math.asin(math.sqrt(a))


def asignar(ciudades_por_pais: dict[str, list[dict]], universidades: list[dict],
            radio: float) -> int:
    """Cada universidad del mundo a su ciudad mas cercana del mundo.

    La busqueda es GLOBAL, no pais por pais, y ahi esta el arreglo: nadie le
    pregunta a Wikidata de que pais es una universidad, se mira en que ciudad
    cae. Asi la Universidad de Guam aterriza en una ciudad de Guam aunque
    Wikidata la tenga bajo Estados Unidos.

    Comparar cada universidad contra cada ciudad es un producto cartesiano que
    no termina a escala mundial (15.573 x 34.128), asi que las ciudades se
    reparten en una rejilla de 1 grado y solo se miden las de las nueve celdas
    vecinas. Un grado de latitud son ~111 km, de sobra para un radio de 30.
    """
    rejilla: dict[tuple[int, int], list[dict]] = {}
    for ciudades in ciudades_por_pais.values():
        for c in ciudades:
            rejilla.setdefault((int(c["lat"]), int(c["lng"])), []).append(c)

    sin_asignar = 0
    for u in universidades:
        cx, cy = int(u["lat"]), int(u["lng"])
        mejor, mejor_km = None, radio
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for c in rejilla.get((cx + dx, cy + dy), ()):
                    km = haversine(u["lat"], u["lng"], c["lat"], c["lng"])
                    if km < mejor_km:
                        mejor, mejor_km = c, km
        if mejor is None:
            sin_asignar += 1
        else:
            mejor["universidades"].append({
                "qid": u["qid"],
                "nombre": u["nombre"],
                "origen": u["origen"],
                # Los km solo valen si la ubicacion era la del campus. Cuando
                # viene del municipio declarado, la distancia medida es entre
                # dos centros administrativos y no dice nada del campus: se
                # deja en null antes que publicar una cifra que parece precisa
                # y no lo es.
                "km": round(mejor_km, 1) if u["origen"] == "coordenadas" else None,
                "municipioDeclarado": u.get("municipio"),
            })
    return sin_asignar


# --------------------------------------------------------------------------

def main() -> None:
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("--ciudades", default="cities15000",
                   choices=["cities15000", "cities5000", "cities1000"],
                   help="corte de poblacion de GeoNames (por defecto cities15000)")
    p.add_argument("--radio", type=float, default=RADIO_KM,
                   help=f"km para dar una universidad por ciudad (por defecto {RADIO_KM})")
    args = p.parse_args()

    print("Censo de ciudades universitarias del mundo.")
    print(f"  ciudades: {args.ciudades}   radio: {args.radio} km\n")

    print("  [1/4] Paises y ciudades desde GeoNames")
    paises = cargar_paises()
    ciudades_por_pais = cargar_ciudades(args.ciudades)
    total_ciudades = sum(len(v) for v in ciudades_por_pais.values())
    print(f"        {len(paises)} paises, {total_ciudades:,} ciudades\n")

    print("  [2/4] Universidades desde Wikidata")
    universidades = cargar_universidades()
    print(f"        {len(universidades):,} universidades con coordenadas\n")

    print("  [3/4] Control de cobertura (Hipolabs)")
    hipolabs = cargar_hipolabs()
    print(f"        {sum(hipolabs.values()):,} universidades en {len(hipolabs)} paises\n")

    print("  [4/4] Asignando cada universidad a su ciudad mas cercana del mundo")
    huerfanas = asignar(ciudades_por_pais, universidades, args.radio)
    print(f"        {huerfanas:,} sin ninguna ciudad a menos de {args.radio} km\n")

    informe = {}
    for iso2 in sorted(paises):
        pais = paises[iso2]
        ciudades = ciudades_por_pais.get(iso2, [])
        con_universidad = [c for c in ciudades if c["universidades"]]
        # El pais de una universidad es el de la ciudad donde cayo, no el que
        # declare Wikidata. Ver el comentario de CONSULTA.
        situadas = sum(len(c["universidades"]) for c in con_universidad)

        # Si la otra fuente ve mas del doble, Wikidata cubre mal este pais y el
        # recuento de aqui es un suelo, no un total.
        vistas_hipolabs = hipolabs.get(iso2, 0)
        mal_cubierto = vistas_hipolabs > max(2 * situadas, 5)

        informe[iso2] = {
            "pais": pais["nombre"],
            "continente": pais["continente"],
            "poblacionPais": pais["poblacion"],
            "ciudadesTotales": len(ciudades),
            "ciudadesConUniversidad": len(con_universidad),
            "universidades": situadas,
            # No hay "universidadesSinCiudad" por pais, y no es un olvido: una
            # universidad que no cae en ninguna ciudad tampoco tiene pais, ya
            # que el pais lo da la ciudad. El total global sale en el resumen.
            "universidadesHipolabs": vistas_hipolabs,
            "coberturaDudosa": mal_cubierto,
            "ciudades": [
                {
                    "geonameId": c["geonameId"],
                    "nombre": c["nombre"],
                    "lat": c["lat"],
                    "lng": c["lng"],
                    "poblacion": c["poblacion"],
                    "universidades": c["universidades"],
                }
                for c in sorted(con_universidad, key=lambda x: -len(x["universidades"]))
            ],
        }

    SALIDA.write_text(json.dumps({
        "_fuentes": ["GeoNames (CC BY 4.0)", "Wikidata (CC0) via QLever",
                     "Hipo/university-domains-list (MIT)"],
        "_parametros": {"dataset": args.ciudades, "radioKm": args.radio},
        "paises": informe,
    }, ensure_ascii=False, indent=2), encoding="utf-8")

    # ---- Resumen ----
    t_ciudades = sum(v["ciudadesConUniversidad"] for v in informe.values())
    t_univ = sum(v["universidades"] for v in informe.values())
    t_huerfanas = huerfanas
    con_algo = sorted((v for v in informe.values() if v["ciudadesConUniversidad"]),
                      key=lambda v: -v["ciudadesConUniversidad"])
    dudosos = [v for v in informe.values() if v["coberturaDudosa"]]

    print(f"\n{'':=<70}")
    print(f"  Ciudades en {args.ciudades:12}       {total_ciudades:>8,}")
    print(f"  Ciudades CON universidad           {t_ciudades:>8,}   <- a investigar")
    print(f"  Paises con al menos una            {len(con_algo):>8}")
    print(f"  Universidades situadas             {t_univ:>8,}")
    print(f"  Universidades sin ciudad cerca     {t_huerfanas:>8,}"
          f"   ({100 * t_huerfanas // max(t_univ, 1)}%)")
    print(f"{'':=<70}")

    print(f"\n  Los 20 paises con mas ciudades universitarias:\n")
    print(f"    {'pais':<24} {'ciudades':>9} {'univ':>6} {'total ciud.':>12}")
    for v in con_algo[:20]:
        print(f"    {v['pais'][:24]:<24} {v['ciudadesConUniversidad']:>9} "
              f"{v['universidades']:>6} {v['ciudadesTotales']:>12}")

    print(f"\n  Reparto acumulado (para elegir el corte):")
    acumulado = 0
    for corte in (10, 25, 50, 100, 195, len(con_algo)):
        acumulado = sum(v["ciudadesConUniversidad"] for v in con_algo[:corte])
        print(f"    los {corte:>3} paises con mas ciudades  ->  "
              f"{acumulado:>6,} ciudades  ({100 * acumulado // max(t_ciudades, 1)}%)")

    if dudosos:
        print(f"\n  {len(dudosos)} paises con cobertura dudosa en Wikidata "
              f"(Hipolabs ve mas del doble).")
        print("  Su recuento es un suelo, no un total:")
        for v in sorted(dudosos, key=lambda x: -x["universidadesHipolabs"])[:10]:
            print(f"    {v['pais'][:26]:<26} wikidata {v['universidades']:>4}  "
                  f"hipolabs {v['universidadesHipolabs']:>4}")

    if t_univ and t_huerfanas * 100 // t_univ > 15:
        print(f"\n  El {100 * t_huerfanas // t_univ}% de universidades no tiene ciudad")
        print("  cerca: el corte de poblacion deja fuera pueblos universitarios.")
        print("  Reejecuta con --ciudades cities5000.")

    print(f"\n  Detalle por pais: {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nCortado. La cache se conserva: al reejecutar retoma donde iba.")
        sys.exit(1)
