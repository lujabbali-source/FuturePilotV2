# -*- coding: utf-8 -*-
"""Escribe la seccion de vida diaria, en los dos idiomas.

El documento de ciudades esta en ingles. Volcarlo tal cual dejaria a un
estudiante colombiano leyendo "World-class institutions like..." dentro de una
interfaz en castellano, asi que cada frase se guarda como {es, en} y la
pantalla elige. No se elige aqui: el estudiante cambia de idioma cuando quiere,
y una ficha congelada en el idioma de importacion se leeria asi para siempre.

Las traducciones estan en colombia_living_es.py, escritas a mano. Los nombres
propios no se traducen - "Museo del Oro", "Bandeja Paisa", "Comuna 13" son como
se llaman las cosas, y traducirlos volveria el texto inutil para quien luego
quiera buscar el sitio.

    python web/scripts/apply_colombia_living.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from colombia_living_es import TRADUCCIONES  # noqa: E402

FUENTE = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities-source.json"
CIUDADES = RAIZ / "web" / "src" / "database" / "countries" / "colombia" / "cities"

CAMPOS = {
    "best neighborhoods": "bestNeighborhoods", "culture": "culture",
    "culture & nature": "culture", "tourism": "tourism", "healthcare": "healthcare",
    "food": "food", "nightlife": "nightlife", "transportation": "transportation",
}
# Que campos del esquema son listas y cuales una sola frase.
LISTAS = {"bestNeighborhoods", "healthcare", "nightlife", "culture", "food", "tourism"}


def ingles(ciudad: dict) -> dict[str, str]:
    salida = {}
    for bloque, lista in (ciudad.get("living") or {}).items():
        for e in lista:
            campo = CAMPOS.get((e.get("label") or bloque or "").lower())
            if campo and e.get("text") and campo not in salida:
                salida[campo] = e["text"]
    return salida


def js(valor) -> str:
    return json.dumps(valor, ensure_ascii=False)


def main() -> None:
    fuente = json.loads(FUENTE.read_text(encoding="utf-8"))["cities"]
    tocadas, sin_traducir = [], []

    for cid, ciudad in fuente.items():
        archivo = CIUDADES / f"{cid}.js"
        if not archivo.exists():
            continue
        en = ingles(ciudad)
        es = TRADUCCIONES.get(cid, {})
        if not en:
            continue

        pares = []
        for campo, texto_en in en.items():
            texto_es = es.get(campo)
            if not texto_es:
                sin_traducir.append(f"{cid}.{campo}")
                continue
            bilingue = {"es": texto_es, "en": texto_en}
            # Los campos de lista llevan un solo elemento: el documento da una
            # frase con todo dentro y partirla por comas romperia los nombres
            # que llevan coma ("Chicó y Parque de la 93 (estratos 5–6), ...").
            pares.append(f"{campo}: " + (f"[{js(bilingue)}]" if campo in LISTAS else js(bilingue)))

        if not pares:
            continue
        texto = archivo.read_text(encoding="utf-8")
        if re.search(r"living:\s*\{", texto):
            # Ya existe el bloque (Bogotá lo trae con los campos vacios y una
            # frase suelta en ingles). Se rellena campo a campo y solo lo que
            # este vacio: lo que alguien escribio a mano no se pisa.
            antes = texto
            for par in pares:
                campo, _, valor = par.partition(": ")
                texto = re.sub(rf"({campo}:\s*)(\[\s*\]|null)", 
                               lambda m: m.group(1) + valor, texto, count=1)
                # Una frase en ingles suelta en un campo de texto tambien se
                # reemplaza: el par {es, en} la contiene y ademas la traduce.
                if campo not in LISTAS:
                    texto = re.sub(rf'({campo}:\s*)"[^"]*"',
                                   lambda m: m.group(1) + valor, texto, count=1)
            if texto != antes:
                archivo.write_text(texto, encoding="utf-8")
                tocadas.append(cid)
            continue
        bloque = "    living: {\n        " + ",\n        ".join(pares) + ",\n    },\n"
        cierre = texto.rfind("});")
        delante = texto[:cierre].rstrip()
        if delante and delante[-1] not in ",{":
            texto = delante + ",\n" + texto[cierre:]
            cierre = texto.rfind("});")
        archivo.write_text(texto[:cierre] + bloque + texto[cierre:], encoding="utf-8")
        tocadas.append(cid)

    print(f"ciudades con vida diaria: {len(tocadas)} -> {', '.join(tocadas)}")
    if sin_traducir:
        print(f"SIN traduccion, no escritos: {', '.join(sin_traducir)}")


if __name__ == "__main__":
    main()
