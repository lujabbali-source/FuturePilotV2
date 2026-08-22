# -*- coding: utf-8 -*-
"""Escribe las fortalezas y retos de cada ciudad, en los dos idiomas.

Van en su propia seccion del panel y no mezcladas con las estadisticas porque
son de otra naturaleza: una poblacion es un dato, "conviene precaucion en El
Centro de noche" es un juicio sobre un barrio real. Mezclarlos haria que el
juicio se leyera con la autoridad del dato.

    python web/scripts/apply_colombia_outlook.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from colombia_outlook_es import OUTLOOK_ES  # noqa: E402

FUENTE = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities-source.json"
CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"

MAPA = {"key strengths": "strengths", "key challenges": "challenges",
        "safety strategy": "safetyStrategy", "english proficiency": "englishProficiency"}


def ingles(ciudad: dict) -> dict[str, str]:
    salida = {}
    for seccion in ("statistics", "jobs", "living", "costOfLiving"):
        for bloque, lista in (ciudad.get(seccion) or {}).items():
            for e in lista:
                campo = MAPA.get((e.get("label") or "").lower().strip())
                if campo and e.get("text") and campo not in salida:
                    salida[campo] = e["text"]
    return salida


def main() -> None:
    fuente = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    tocadas, sin_traducir = [], []

    for cid, ciudad in fuente.items():
        archivo = CIUDADES / f"{cid}.js"
        if not archivo.exists():
            continue
        en, es = ingles(ciudad), OUTLOOK_ES.get(cid, {})
        pares = []
        for campo, texto_en in en.items():
            if not es.get(campo):
                sin_traducir.append(f"{cid}.{campo}")
                continue
            pares.append(f"{campo}: " + json.dumps({"es": es[campo], "en": texto_en},
                                                   ensure_ascii=False))
        if not pares:
            continue

        texto = archivo.read_text(encoding="utf-8")
        if re.search(r"outlook:\s*\{", texto):
            continue
        bloque = "    outlook: {\n        " + ",\n        ".join(pares) + ",\n    },\n"
        cierre = texto.rfind("});")
        delante = texto[:cierre].rstrip()
        if delante and delante[-1] not in ",{":
            texto = delante + ",\n" + texto[cierre:]
            cierre = texto.rfind("});")
        archivo.write_text(texto[:cierre] + bloque + texto[cierre:], encoding="utf-8")
        tocadas.append(cid)

    print(f"ciudades con fortalezas y retos: {len(tocadas)} -> {', '.join(tocadas)}")
    if sin_traducir:
        print(f"SIN traduccion, no escritos: {', '.join(sin_traducir)}")


if __name__ == "__main__":
    main()
