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

Fuentes, las tres comprobadas antes de escribir esto:

  - Hipo/university-domains-list (MIT): 10.257 universidades en 201 paises,
    con dominio y sitio oficial. NO trae tipo ni ciudad.
  - mledoze/countries (ODbL-1.0): capital, moneda, idiomas y el nombre del
    pais en español para los 250.
  - Banco Mundial, indicador SP.POP.TOTL: poblacion por pais.

Se ejecuta a mano y vuelca el resultado al repo. No hay ninguna llamada en
tiempo de ejecucion: las APIs se mueren - la de restcountries se descontinuo
mientras preparaba esto - y la aplicacion no puede morirse con ellas.

    python web/scripts/import_world.py
"""
from __future__ import annotations

import json
import re
import unicodedata
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SALIDA = RAIZ / "web" / "src" / "database" / "countries" / "world"
SALIDA_U = SALIDA / "universities"
CACHE = Path(__file__).resolve().parent / ".cache-world"

FUENTES = {
    "universidades": "https://raw.githubusercontent.com/Hipo/university-domains-list"
                     "/master/world_universities_and_domains.json",
    "paises": "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
    "poblacion": "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL"
                 "?format=json&mrnev=1&per_page=400",
}

# Los que ya estan curados a mano. El importador no los toca ni los duplica.
YA_CURADOS = {
    "AR", "BO", "BR", "CA", "CL", "CO", "CR", "CU", "DO", "EC", "GT", "HN",
    "HT", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "US", "UY",
}

CONTINENTES = {
    "Africa": "África", "Americas": "América", "Asia": "Asia",
    "Europe": "Europa", "Oceania": "Oceanía", "Antarctic": "Antártida",
}

ATRIBUCION = [
    "Hipo/university-domains-list (MIT)",
    "mledoze/countries (ODbL-1.0)",
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


def slug(texto: str) -> str:
    plano = "".join(
        c for c in unicodedata.normalize("NFD", texto.lower())
        if unicodedata.category(c) != "Mn"
    )
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", plano)).strip("-")


def js(valor) -> str:
    """Un valor de Python como literal de JavaScript."""
    return json.dumps(valor, ensure_ascii=False)


def main() -> None:
    print("Importando el mundo desde fuentes abiertas.\n")
    universidades = bajar("universidades")
    paises = bajar("paises")
    poblacion_cruda = bajar("poblacion")

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
    for viejo in list(SALIDA.glob("*.js")) + list(SALIDA_U.glob("*.js")):
        viejo.unlink()

    escritos, total_u, sin_universidades = [], 0, []
    for pais in sorted(paises, key=lambda c: c["name"]["common"]):
        cca2 = pais.get("cca2", "")
        if cca2 in YA_CURADOS:
            continue
        # Se queda fuera lo que no es un sitio donde alguien pueda estudiar.
        # El dataset trae la Antartida y la Isla Bouvet: son paises en sentido
        # geografico, pero listarlos como destino academico es ruido. El
        # criterio: miembro de la ONU, o que tenga al menos una universidad
        # (asi entran Hong Kong o Groenlandia sin abrir la puerta a los islotes
        # deshabitados).
        if not pais.get("unMember") and not por_pais.get(cca2):
            continue

        nombre_es = (pais.get("translations", {}).get("spa", {}).get("common")
                     or pais["name"]["common"])
        nombre_en = pais["name"]["common"]
        identificador = slug(nombre_es)
        if not identificador:
            continue

        monedas = pais.get("currencies") or {}
        idiomas = list((pais.get("languages") or {}).values())
        capital = (pais.get("capital") or [None])[0]

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

        alias_pais = sorted({slug(nombre_en), identificador} - {""})

        cuerpo = f'''// {nombre_es} — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion y las universidades con su sitio oficial. Todo lo demas
// (ciudades, costo de vida, salarios, cultura) esta vacio a proposito. Ver
// web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import {{ defineCountry, defineUniversity }} from "../schema";

export default defineCountry({{
  id: {js(identificador)},
  name: {js(nombre_es)},
  nameEn: {js(nombre_en)},
  capital: {js(capital)},
  currency: {js(next(iter(monedas), None))},
  language: {js(idiomas[0] if idiomas else None)},
  continent: {js(CONTINENTES.get(pais.get("region"), pais.get("region")))},
  population: {js(poblacion.get(pais.get("cca3")))},
  // Sin ciudades: la fuente de universidades trae provincia en solo el 14% de
  // los casos, y provincia no es ciudad. Inventar el reparto por ciudades
  // seria la peor clase de dato falso, porque parece preciso.
  cities: [],
  // Las universidades no van aqui: viven en ./universities/{identificador}.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: {len(entradas)},
  aliases: {js(alias_pais)},
  dataStatus: "source-open-dataset",
  sources: {js(ATRIBUCION)},
}});
'''
        (SALIDA / f"{identificador}.js").write_text(cuerpo, encoding="utf-8")

        lista_js = f'''// Universidades de {nombre_es}. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import {{ defineUniversity }} from "../../schema";

export default [
{chr(10).join(entradas)}
];
'''
        (SALIDA_U / f"{identificador}.js").write_text(lista_js, encoding="utf-8")
        escritos.append((identificador, nombre_es, len(lista)))

    # El indice del continente, con el mismo patron que americas/index.js.
    imports = "\n".join(
        f'import {re.sub(r"[^a-z0-9]", "_", i)} from "./{i}";' for i, _, _ in escritos
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
    print(f"  {total_u} universidades importadas")
    print(f"  {len(sin_universidades)} paises sin ninguna universidad en la fuente")
    if sin_universidades:
        print("    " + ", ".join(sin_universidades[:8])
              + (" ..." if len(sin_universidades) > 8 else ""))
    print("\n  Nada de costo de vida, salarios ni cultura: eso no se importa.")


if __name__ == "__main__":
    main()
