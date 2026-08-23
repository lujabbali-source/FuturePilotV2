# -*- coding: utf-8 -*-
"""Traduce las industrias y rellena el clima que quedo vacio.

`mainIndustries` se importo del documento tal cual, en ingles, y es lo que se
lee en la pestaña de empleo: "Technology & Innovation" dentro de una interfaz
en castellano. Aqui se traduce, en los dos idiomas, con el mismo patron que el
resto de la prosa.

Una industria sin traduccion NO se escribe: se avisa y se deja la que hubiera.
Es preferible que falte a que se cuele en ingles.

    python web/scripts/apply_colombia_stats.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from colombia_stats_es import ESTADISTICAS_ES, INDUSTRIAS_ES  # noqa: E402

CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"


def js(valor) -> str:
    return json.dumps(valor, ensure_ascii=False)


def main() -> None:
    tocadas, sin_traducir = [], []

    for archivo in sorted(CIUDADES.glob("*.js")):
        if archivo.name == "index.js":
            continue
        cid = archivo.stem
        texto = original = archivo.read_text(encoding="utf-8")

        # --- industrias -------------------------------------------------
        m = re.search(r"mainIndustries:\s*(\[[^\]]*\])", texto)
        if m and '"es"' not in m.group(1):
            try:
                lista = json.loads(m.group(1))
            except ValueError:
                lista = []
            bilingues, faltan = [], False
            for nombre in lista:
                es = INDUSTRIAS_ES.get(nombre)
                if not es:
                    sin_traducir.append(f"{cid}: {nombre}")
                    faltan = True
                    break
                bilingues.append({"es": es, "en": nombre})
            if bilingues and not faltan:
                texto = texto.replace(m.group(0), f"mainIndustries: {js(bilingues)}", 1)

        # --- clima y demas ----------------------------------------------
        for campo, valor in (ESTADISTICAS_ES.get(cid) or {}).items():
            # Solo si esta vacio: lo que ya estaba curado a mano no se toca.
            texto = re.sub(rf"({campo}:\s*)null", rf"\1{js(valor)}", texto, count=1)

        if texto != original:
            archivo.write_text(texto, encoding="utf-8")
            tocadas.append(cid)

    print(f"ciudades actualizadas: {len(tocadas)}")
    print("  " + ", ".join(tocadas))
    if sin_traducir:
        print(f"\nINDUSTRIAS SIN TRADUCIR ({len(sin_traducir)}), no escritas:")
        for s in sin_traducir[:12]:
            print("   ", s)


if __name__ == "__main__":
    main()
