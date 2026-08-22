# -*- coding: utf-8 -*-
"""Escribe el desglose de costos: la letra chica de cada cifra.

El panel de costos muestra un rango por concepto. Detras de "arriendo
680.000 – 1.100.000 COP" el documento dice si eso es una habitacion
compartida, un apartaestudio en Laureles o uno en El Poblado - y esa
diferencia es la que decide si a alguien le alcanza.

Cada linea lleva su etiqueta en los dos idiomas y su cifra con moneda. Una
etiqueta sin regla de traduccion se SALTA y se avisa: es mejor que falte una
linea a que salga en ingles en medio de una pantalla en castellano.

    python web/scripts/apply_colombia_breakdown.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from colombia_breakdown_es import etiqueta_es  # noqa: E402

FUENTE = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities-source.json"
CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"

# Bloque del documento -> grupo del panel, en el orden en que se muestran.
GRUPOS = [
    ("Monthly estimate", "household"),
    ("Rent", "housing"),
    ("Food", "food"),
    ("Utilities", "utilities"),
    ("Transportation", "transport"),
    ("Student budget", "student"),
]


def main() -> None:
    fuente = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    tocadas, saltadas = [], []

    for cid, ciudad in fuente.items():
        archivo = CIUDADES / f"{cid}.js"
        if not archivo.exists():
            continue

        grupos = {}
        for bloque, grupo in GRUPOS:
            lineas = []
            for e in (ciudad["costOfLiving"].get(bloque) or []):
                etiqueta = e.get("label")
                if not etiqueta:
                    continue
                es = etiqueta_es(etiqueta)
                if es is None:
                    saltadas.append(f"{cid}: {etiqueta}")
                    continue
                linea = {"label": {"es": es, "en": etiqueta}}
                dinero = (e.get("money") or [None])[0]
                if dinero:
                    linea["amount"] = {k: dinero[k] for k in ("min", "max", "currency")}
                elif e.get("text"):
                    # "Composition" no trae cifra: es una frase. Se guarda en
                    # ingles unicamente porque describe la ciudad y aun no esta
                    # traducida; la pantalla la muestra igual.
                    linea["note"] = e["text"]
                lineas.append(linea)
            if lineas:
                grupos[grupo] = lineas

        if not grupos:
            continue
        texto = archivo.read_text(encoding="utf-8")
        if re.search(r"breakdown:\s*\{", texto):
            continue
        cuerpo = ",\n        ".join(
            f"{g}: {json.dumps(v, ensure_ascii=False)}" for g, v in grupos.items())
        bloque_js = "    breakdown: {\n        " + cuerpo + ",\n    },\n"
        cierre = texto.rfind("});")
        delante = texto[:cierre].rstrip()
        if delante and delante[-1] not in ",{":
            texto = delante + ",\n" + texto[cierre:]
            cierre = texto.rfind("});")
        archivo.write_text(texto[:cierre] + bloque_js + texto[cierre:], encoding="utf-8")
        tocadas.append(f"{cid}({sum(len(v) for v in grupos.values())})")

    print(f"ciudades con desglose: {len(tocadas)}")
    print("  " + ", ".join(tocadas))
    if saltadas:
        print(f"\nETIQUETAS SIN TRADUCIR, saltadas ({len(saltadas)}):")
        for s in saltadas[:10]:
            print("   ", s)


if __name__ == "__main__":
    main()
