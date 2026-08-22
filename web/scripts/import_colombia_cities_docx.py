# -*- coding: utf-8 -*-
"""Convierte 'America cities.docx' en JSON, sin perder ni inventar nada.

El documento trae, curado a mano, 18 ciudades colombianas con costo de vida,
estadisticas, empleo y vida diaria - justo los paneles que hasta ahora estaban
vacios en 222 de 223 ciudades.

Dos reglas gobiernan este script:

  1. El JSON es un VOLCADO FIEL. Cada linea del documento acaba en el, con su
     etiqueta y su texto tal cual. Lo que el documento no dice, no aparece.

  2. Los rangos se guardan como rangos. El documento dice "1.8M - 2.6M COP" y
     eso es lo que se guarda: un minimo y un maximo. Colapsarlo a 2.2M
     inventaria una precision que la fuente no tiene, y sobre esa cifra alguien
     va a planear una mudanza.

El JSON es la fuente; escribir los archivos .js de la app es un paso aparte,
para poder revisar el volcado antes de que toque nada.

    python web/scripts/import_colombia_cities_docx.py "ruta/al/America cities.docx"
"""
from __future__ import annotations

import json
import re
import sys
import unicodedata
import zipfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SALIDA = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities-source.json"

# `w:t` es prefijo de `w:tc`, `w:tbl` y `w:tab`: sin anclar el cierre, el
# extractor se traga las etiquetas de tabla y saca XML como si fuera texto.
TEXTO = re.compile(r"<w:t(?:\s[^>]*)?>(.*?)</w:t>", re.S)
PARRAFO = re.compile(r"<w:p[ >].*?</w:p>", re.S)

# "2. Medellín (Antioquia)"
CIUDAD = re.compile(r"^(\d{1,2})\.\s+(.+?)\s*\(([^)]+)\)\s*$")
# Un titulo numerado que NO es una ciudad ("19. Regional Tier Matrix..."). Sin
# esto su texto se colaba dentro de la ultima ciudad.
OTRO_TITULO = re.compile(r"^\d{1,2}\.\s+\S")

# Las ultimas diez ciudades vienen condensadas: la etiqueta va en la misma
# linea que el valor, sin encabezado de seccion propio. Se reparten a mano
# porque el documento no las reparte.
ETIQUETA_A_SECCION = {
    "statistics": "statistics", "population": "statistics", "weather": "statistics",
    "climate": "statistics", "safety": "statistics", "quality of life": "statistics",
    "language": "statistics", "internet speed": "statistics",
    "economy": "jobs", "average salary": "jobs", "employment rate": "jobs",
    "main industries": "jobs", "key strengths": "jobs", "key challenges": "jobs",
    "culture": "living", "tourism": "living", "culture & nature": "living",
    "best neighborhoods": "living", "healthcare": "living", "food": "living",
    "nightlife": "living", "transportation": "living",
}
SECCIONES = {
    "cost of living": "costOfLiving",
    "statistics": "statistics",
    "jobs": "jobs",
    "economy & jobs": "jobs",
    "living": "living",
    "quality of life & safety": "statistics",
    "scholarships": "scholarships",
    "universities": "universities",
}

MULTIPLICADOR = {"k": 1_000, "m": 1_000_000}


def leer_parrafos(docx: Path) -> list[str]:
    with zipfile.ZipFile(docx) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    salida = []
    for parrafo in PARRAFO.findall(xml):
        texto = " ".join(TEXTO.findall(parrafo))
        texto = (texto.replace("&amp;", "&").replace("&lt;", "<")
                      .replace("&gt;", ">").replace("&quot;", '"'))
        texto = re.sub(r"\s+", " ", texto).strip()
        if texto:
            salida.append(texto)
    return salida


def slug(texto: str) -> str:
    plano = "".join(
        c for c in unicodedata.normalize("NFD", texto.lower())
        if unicodedata.category(c) != "Mn"
    )
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", plano)).strip("-")


def dinero(texto: str) -> list[dict] | None:
    """El rango de dinero de la linea, en COP si lo trae y si no en USD.

    Las ocho primeras ciudades vienen con la conversion a pesos ya hecha por
    una persona; las diez ultimas solo traen dolares. Se guarda la moneda junto
    al numero para que nadie los sume por accidente.
    """
    en_cop = pesos(texto)
    if en_cop:
        return [en_cop]
    salida = []
    for m in re.finditer(r"\$([\d.,]+)\s*(?:–|-|—|to)\s*\$?([\d.,]+)\+?\s*USD", texto):
        try:
            lo, hi = float(m.group(1).replace(",", "")), float(m.group(2).replace(",", ""))
        except ValueError:
            continue
        # La etiqueta que precede al rango ("Student:", "Single person:") dice
        # de quien es ese presupuesto. Sin ella, dos cifras en la misma linea
        # son indistinguibles.
        antes = texto[:m.start()].rstrip()
        quien = re.search(r"([A-Za-z][A-Za-z ]{2,24}):\s*$", antes)
        salida.append({"min": int(min(lo, hi)), "max": int(max(lo, hi)),
                       "currency": "USD",
                       "who": quien.group(1).strip() if quien else None})
    return salida or None


def pesos(texto: str) -> dict | None:
    """El rango en pesos que la linea menciona, si lo menciona.

    Se prefiere COP sobre USD: es la moneda en la que el estudiante piensa, y
    la conversion del documento ya la hizo una persona. Devuelve min y max
    aunque sean iguales - un valor unico es un rango de anchura cero, y asi
    quien lo lea no tiene que distinguir dos formas.
    """
    m = re.search(
        r"([\d.,]+)\s*([kM])?\s*(?:–|-|—|to)\s*([\d.,]+)\s*([kM])?\+?\s*COP", texto)
    if not m:
        m2 = re.search(r"([\d.,]+)\s*([kM])?\s*COP", texto)
        if not m2:
            return None
        valor = _numero(m2.group(1), m2.group(2))
        return {"min": valor, "max": valor, "currency": "COP"} if valor else None
    lo = _numero(m.group(1), m.group(2) or m.group(4))
    hi = _numero(m.group(3), m.group(4) or m.group(2))
    if lo is None or hi is None:
        return None
    return {"min": min(lo, hi), "max": max(lo, hi), "currency": "COP"}


def _numero(crudo: str, sufijo: str | None) -> int | None:
    limpio = crudo.replace(",", "")
    try:
        valor = float(limpio)
    except ValueError:
        return None
    if sufijo:
        valor *= MULTIPLICADOR[sufijo.lower()]
    elif valor < 10_000:
        # Sin sufijo y por debajo de diez mil no es una cifra mensual en pesos:
        # es el numero de un indice o un porcentaje que se colo.
        return None
    return int(round(valor))


def partir(linea: str) -> tuple[str | None, str]:
    """Separa "Etiqueta:  valor" en sus dos mitades."""
    m = re.match(r"^([^:]{2,60}):\s*(.*)$", linea)
    if not m:
        return None, linea
    return m.group(1).strip(), m.group(2).strip()


def main() -> None:
    docx = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not docx or not docx.exists():
        sys.exit("Uso: python import_colombia_cities_docx.py <archivo.docx>")

    parrafos = leer_parrafos(docx)

    # El documento arranca con una plantilla vacia y luego numera las ciudades.
    inicio = next(i for i, t in enumerate(parrafos) if CIUDAD.match(t))
    ciudades: dict[str, dict] = {}
    actual = None
    seccion = None
    subseccion = None

    for linea in parrafos[inicio:]:
        if OTRO_TITULO.match(linea) and not CIUDAD.match(linea):
            actual = None      # un titulo numerado que no es ciudad cierra la anterior
            continue
        encabezado = CIUDAD.match(linea)
        if encabezado:
            nombre = encabezado.group(2).strip()
            # "Bogotá, D.C." y "Cartagena de Indias" comparten id con la ficha
            # que ya existe en la app.
            base = nombre.split(",")[0].replace(" de Indias", "").strip()
            actual = {
                "name": nombre,
                "department": encabezado.group(3).strip(),
                "costOfLiving": {}, "statistics": {}, "jobs": {},
                "living": {}, "scholarships": {}, "universities": {},
            }
            ciudades[slug(base)] = actual
            seccion = subseccion = None
            continue

        if actual is None:
            continue

        clave = SECCIONES.get(linea.lower().rstrip(":").strip())
        if clave:
            seccion, subseccion = clave, None
            continue
        if seccion is None:
            continue

        etiqueta, valor = partir(linea)
        if etiqueta and not valor:
            # "Rent:" a secas abre un sub-bloque; lo que sigue cuelga de el.
            subseccion = etiqueta
            actual[seccion].setdefault(subseccion, [])
            continue

        entrada = {"label": etiqueta, "text": valor if etiqueta else linea}
        rangos = dinero(linea)
        if rangos:
            entrada["money"] = rangos

        # Si la etiqueta dice a que seccion pertenece, mandarla ahi: en las
        # ciudades condensadas todo caia bajo "costo de vida", incluida la
        # poblacion y la economia.
        propia = ETIQUETA_A_SECCION.get((etiqueta or "").lower().strip())
        destino_seccion = actual[propia or seccion]
        destino = subseccion if (subseccion and not propia) else "_"
        destino_seccion.setdefault(destino, [])
        destino_seccion[destino].append(entrada)

    payload = {
        "_README": [
            "Volcado fiel de 'America cities.docx'. Generado por",
            "web/scripts/import_colombia_cities_docx.py; no editar a mano.",
            "",
            "Los rangos se guardan como rangos (min/max en COP). El documento",
            "dice '1.8M - 2.6M' y eso es lo que hay: un punto medio inventaria",
            "una precision que la fuente no tiene, y alguien planea una mudanza",
            "sobre esa cifra.",
            "",
            "El texto esta en ingles porque el documento lo esta. Lo que se",
            "lleve a la interfaz hay que traducirlo.",
        ],
        "cities": ciudades,
    }
    SALIDA.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
                      encoding="utf-8")

    print(f"{len(ciudades)} ciudades -> {SALIDA.relative_to(RAIZ)}")
    for cid, datos in ciudades.items():
        campos = sum(len(v) for v in datos.values() if isinstance(v, dict))
        con_cop = sum(
            1 for seccion in datos.values() if isinstance(seccion, dict)
            for lista in seccion.values() if isinstance(lista, list)
            for e in lista if "money" in e
        )
        print(f"  {cid:16} {campos:3} bloques, {con_cop:2} lineas con cifras")


if __name__ == "__main__":
    main()
