# -*- coding: utf-8 -*-
"""Lleva cities-source.json a las fichas de las ciudades colombianas.

Escribe SOLO lo que no necesita traducirse: cifras, poblacion, velocidad de
internet, salario y la lista de industrias. Son numeros y nombres propios, y
se leen igual en los dos idiomas.

Lo que NO escribe, y es a proposito: los barrios, la cultura, el turismo, las
fortalezas y los retos. Todo eso es prosa, esta en ingles en el documento, y
volcarlo tal cual dejaria a un estudiante colombiano leyendo parrafos en
ingles dentro de una interfaz en español. Se queda esperando en el JSON hasta
que haya version en castellano.

Los rangos entran como rangos. El documento dice "1.8M - 2.6M COP"; guardar
2.2M inventaria un dato que la fuente no da, y encima parece mas preciso que
el original.

    python web/scripts/apply_colombia_cities.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
FUENTE = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities-source.json"
CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"

# Coordenadas de las capitales que faltaban. Igual que en city_coordinates.py:
# conocimiento geografico publico, no inventado ni sacado del documento.
NUEVAS = {
    "valledupar": (10.4631, -73.2532, "Valledupar", "Cesar"),
    "quibdo": (5.6947, -76.6611, "Quibdó", "Chocó"),
    "leticia": (-4.2153, -69.9406, "Leticia", "Amazonas"),
}

# Que etiqueta del documento alimenta que campo de costOfLiving.
COSTO = {
    "monthlyEstimate": ("monthly estimate", "single person"),
    "studentBudget": ("student budget", "total essential student cost", "student"),
    "rent": ("rent", "1 bedroom apartment", "shared room"),
    "food": ("food", "local groceries"),
    "transportation": ("transportation", "transcaribe", "metro"),
    "utilities": ("utilities", "strata 3"),
}


def entradas(ciudad: dict, seccion: str):
    for bloque, lista in (ciudad.get(seccion) or {}).items():
        for e in lista:
            yield bloque, e


def rango_para(ciudad: dict, campo: str) -> dict | None:
    """El rango para un campo, prefiriendo la etiqueta mas especifica.

    La moneda viaja DENTRO del rango. El documento convierte a pesos solo las
    primeras ciudades; el resto vienen en dolares, y descartarlas tiraria un
    dato real que si existe. Guardar la moneda junto al numero deja que la
    pantalla escriba "USD" y que quien compare dos ciudades vea que no estan
    en la misma unidad, en vez de suponerlo.
    """
    pistas = COSTO[campo]
    mejor = None
    for bloque, e in entradas(ciudad, "costOfLiving"):
        texto = f"{bloque} {e.get('label') or ''} {e.get('text') or ''}".lower()
        for dinero in e.get("money") or []:
            quien = (dinero.get("who") or "").lower()
            for prioridad, pista in enumerate(pistas):
                if pista in texto or pista in quien:
                    puntua = (prioridad, 0 if dinero["currency"] == "COP" else 1)
                    if mejor is None or puntua < (mejor[0], mejor[2]):
                        mejor = (prioridad, dinero, puntua[1])
                    break
    if mejor is None:
        return None
    d = mejor[1]
    return {"min": d["min"], "max": d["max"], "currency": d["currency"]}


def buscar(ciudad: dict, seccion: str, *pistas: str) -> str | None:
    for bloque, e in entradas(ciudad, seccion):
        texto = f"{bloque} {e.get('label') or ''}".lower()
        if any(p in texto for p in pistas):
            return e.get("text") or None
    return None


def poblacion(ciudad: dict) -> str | None:
    crudo = buscar(ciudad, "statistics", "population", "statistics")
    if not crudo:
        return None
    m = re.search(r"~?([\d.,]+)\s*(million|mill[oó]n)?", crudo)
    if not m:
        return None
    numero = m.group(1).replace(",", "")
    try:
        valor = float(numero)
    except ValueError:
        return None
    if m.group(2):
        valor *= 1_000_000
    if valor < 1000:
        return None
    return f"~{int(valor):,}".replace(",", ".") + " habitantes"


def internet(ciudad: dict) -> str | None:
    crudo = buscar(ciudad, "statistics", "internet", "broadband")
    if not crudo:
        return None
    m = re.search(r"([\d.]+)\s*Mbps", crudo)
    return f"~{m.group(1)} Mbps" if m else None


def salario(ciudad: dict) -> int | None:
    for _, e in entradas(ciudad, "jobs"):
        texto = f"{e.get('label') or ''} {e.get('text') or ''}".lower()
        if "salary" not in texto:
            continue
        for dinero in e.get("money") or []:
            if dinero["currency"] == "COP":
                return dinero["min"]
    return None


def industrias(ciudad: dict) -> list[str]:
    crudo = buscar(ciudad, "jobs", "economy", "main industries", "industries")
    if not crudo:
        return []
    # "Border Trade with Venezuela, Textiles, Mining." -> tres industrias.
    partes = [p.strip(" .") for p in re.split(r"[,;]", crudo.split("(")[0])]
    return [p for p in partes if 2 < len(p) < 46][:6]


def js(valor) -> str:
    return json.dumps(valor, ensure_ascii=False)


def main() -> None:
    fuente = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    tocados, creados, saltados = [], [], []

    for cid, ciudad in fuente.items():
        archivo = CIUDADES / f"{cid}.js"
        if not archivo.exists() and cid not in NUEVAS:
            saltados.append(cid)
            continue

        costos = {campo: rango_para(ciudad, campo) for campo in COSTO}
        datos = {
            "costOfLiving": {k: v for k, v in costos.items() if v},
            "population": poblacion(ciudad),
            "internetSpeed": internet(ciudad),
            "averageSalary": salario(ciudad),
            "mainIndustries": industrias(ciudad),
        }

        if archivo.exists():
            if aplicar(archivo, datos):
                tocados.append(cid)
        else:
            crear(archivo, cid, ciudad, datos)
            creados.append(cid)

    print(f"actualizadas: {len(tocados)}  ->  {', '.join(tocados)}")
    print(f"creadas     : {len(creados)}  ->  {', '.join(creados)}")
    if saltados:
        print(f"sin ficha en la app y sin coordenadas: {', '.join(saltados)}")
    print("\nLa prosa (barrios, cultura, turismo) se queda en el JSON: esta en")
    print("ingles y hay que traducirla antes de que la lea un estudiante.")


def _insertar(texto: str, bloque: str) -> str:
    """Mete un bloque nuevo justo antes de cerrar el defineCity.

    Con la coma que haga falta: no todas las fichas la ponen en su ultima
    propiedad (`universities` a secas, sin coma), y sin ella el archivo deja de
    ser JavaScript valido y el build entero se cae.
    """
    cierre = texto.rfind("});")
    if cierre == -1:
        return texto
    delante = texto[:cierre].rstrip()
    if delante and delante[-1] not in ",{":
        texto = delante + ",\n" + texto[cierre:]
        cierre = texto.rfind("});")
    return texto[:cierre] + bloque + texto[cierre:]


def aplicar(archivo: Path, datos: dict) -> bool:
    """Rellena lo que falta; nunca pisa lo que ya estaba.

    Casi ninguna ficha declara `costOfLiving`: se quedan con los null del
    esquema, asi que no hay nada que reemplazar y el bloque hay que INSERTARLO.
    Y las que traen poblacion o velocidad las traen curadas y en castellano; el
    documento esta en ingles y sobrescribirlas seria un retroceso.
    """
    texto = original = archivo.read_text(encoding="utf-8")
    costos = datos["costOfLiving"]

    if costos:
        if re.search(r"costOfLiving:\s*\{", texto):
            for campo, rango in costos.items():
                texto = re.sub(rf"({campo}:\s*)null", rf"\1{js(rango)}", texto, count=1)
        else:
            pares = ",\n        ".join(f"{k}: {js(v)}" for k, v in costos.items())
            texto = _insertar(
                texto, '    costOfLiving: {\n        currency: "COP",\n        '
                       + pares + ",\n    },\n")

    trabajo = []
    if datos["averageSalary"] and not re.search(r"averageSalary:\s*\d", texto):
        trabajo.append(("averageSalary", str(datos["averageSalary"])))
    if datos["mainIndustries"] and not re.search(r"mainIndustries:\s*\[\s*\"", texto):
        trabajo.append(("mainIndustries", js(datos["mainIndustries"])))
    if trabajo:
        if re.search(r"jobs:\s*\{", texto):
            for clave, valor in trabajo:
                texto = re.sub(rf"({clave}:\s*)(null|\[\s*\])", rf"\1{valor}",
                               texto, count=1)
        else:
            texto = _insertar(
                texto,
                "    jobs: { " + ", ".join(f"{k}: {v}" for k, v in trabajo) + " },\n")

    for clave, valor in (("population", datos["population"]),
                         ("internetSpeed", datos["internetSpeed"])):
        if valor and re.search(rf"{clave}:\s*null", texto):
            texto = re.sub(rf"({clave}:\s*)null", rf"\1{js(valor)}", texto, count=1)

    if texto != original:
        archivo.write_text(texto, encoding="utf-8")
        return True
    return False


def crear(archivo: Path, cid: str, ciudad: dict, datos: dict) -> None:
    lat, lng, nombre, region = NUEVAS[cid]
    costos = datos["costOfLiving"]
    cuerpo = f'''import {{ defineCity }} from "../citySchema";

// {nombre} — de "America cities.docx", via web/scripts/apply_colombia_cities.py.
// Las coordenadas son conocimiento geografico publico, igual que en
// city_coordinates.py: el documento no trae lat/lng.
//
// Sin universidades todavia: el documento de ciudades no las lista y el de
// universidades no cubre esta. Se queda vacio en vez de suponerlas.

export default defineCity({{
  id: {js(cid)},
  name: {js(nombre)},
  coordinates: {{ lat: {lat}, lng: {lng} }},
  region: {js(region)},
  costOfLiving: {{
    currency: "COP",
    monthlyEstimate: {js(costos.get("monthlyEstimate"))},
    rent: {js(costos.get("rent"))},
    food: {js(costos.get("food"))},
    transportation: {js(costos.get("transportation"))},
    utilities: {js(costos.get("utilities"))},
    studentBudget: {js(costos.get("studentBudget"))},
  }},
  statistics: {{
    population: {js(datos["population"])},
    safety: null,
    weather: null,
    language: "Español",
    currency: "Peso colombiano (COP)",
    internetSpeed: {js(datos["internetSpeed"])},
    qualityOfLife: null,
    studentSatisfaction: null,
  }},
  jobs: {{
    averageSalary: {js(datos["averageSalary"])},
    mainIndustries: {js(datos["mainIndustries"])},
    studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null,
  }},
}});
'''
    archivo.write_text(cuerpo, encoding="utf-8")


if __name__ == "__main__":
    main()
