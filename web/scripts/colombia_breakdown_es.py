# -*- coding: utf-8 -*-
"""Traduce las etiquetas del desglose de costos.

Son 39 variaciones de unos pocos patrones: "1 bedroom apartment (Standard area
- Laureles/Envigado)" y "1 bedroom apartment (Upscale area - El Poblado)" son
la misma etiqueta con distinto barrio. Traducirlas a mano una por una seria
repetir la misma frase catorce veces y equivocarse en la decimoquinta, asi que
se traduce por regla y los nombres propios se quedan donde estan.

`Corrientazo`, `TransMilenio`, `El Poblado` y `estratos` no se traducen: son
como se llaman las cosas en Colombia, y el lector al que va dirigido esto los
conoce mejor que su equivalente en ingles.
"""
from __future__ import annotations

import re

# Orden importante: las mas especificas primero, o "Student" pisa a
# "Student/Coliving".
REGLAS: list[tuple[str, str]] = [
    (r"^Single person \(Moderate\)$", "Una persona (moderado)"),
    (r"^Student \(Frugal\)$", "Estudiante (frugal)"),
    (r"^Family of four$", "Familia de cuatro"),

    (r"^Local groceries \(1 person\)$", "Mercado (1 persona)"),
    (r"^Cheap local lunch \(Corrientazo\)$", "Corrientazo"),
    (r"^Cheap local lunch$", "Almuerzo corriente"),
    (r"^Mid-range (?:restaurant )?dinner \(2 people\)$", "Cena de gama media (2 personas)"),

    (r"^Strata 3–4 \(Middle class\)$", "Estratos 3–4 (clase media)"),
    (r"^Strata 3–4$", "Estratos 3–4"),
    (r"^Strata 5–6 \(Upper class\)$", "Estratos 5–6 (clase alta)"),
    (r"^Strata 5–6 / Tourist Zones$", "Estratos 5–6 / zonas turísticas"),
    (r"^Home internet & mobile plan$", "Internet en casa y plan móvil"),

    (r"^Shared room \(Student/Coliving\)$", "Habitación compartida (estudiante/coliving)"),
    (r"^Shared student room$", "Habitación compartida de estudiante"),
    (r"^Shared room$", "Habitación compartida"),
    # El barrio se conserva tal cual: es la parte util de la etiqueta.
    (r"^1 bedroom apartment \(Standard area - (.+)\)$", r"Apartaestudio (zona estándar - \1)"),
    (r"^1 bedroom apartment \(Standard - (.+)\)$", r"Apartaestudio (zona estándar - \1)"),
    (r"^1 bedroom apartment \(Standard area\)$", "Apartaestudio (zona estándar)"),
    (r"^1 bedroom apartment \(Upscale area like (.+)\)$", r"Apartaestudio (zona alta, tipo \1)"),
    (r"^1 bedroom apartment \(Upscale area - (.+)\)$", r"Apartaestudio (zona alta - \1)"),
    (r"^1 bedroom apartment \(Upscale - (.+)\)$", r"Apartaestudio (zona alta - \1)"),
    (r"^1 bedroom apartment \((.+)\)$", r"Apartaestudio (\1)"),

    (r"^Total essential student cost$", "Costo esencial total del estudiante"),
    (r"^Composition$", "En qué consiste"),
    (r"^Student budget$", "Presupuesto de estudiante"),

    (r"^(.+) \(Daily commute\)$", r"\1 (viaje diario)"),
    (r"^Rideshares & Taxis$", "Apps de transporte y taxis"),
    (r"^Rideshares \(Uber/Cabify, 2–3 times a week\)$",
     "Apps de transporte (Uber/Cabify, 2–3 veces por semana)"),
    (r"^Taxis / Rideshares$", "Taxis y apps de transporte"),
    (r"^Taxis / InDrive / Uber$", "Taxis / InDrive / Uber"),
    (r"^TransMetro / Public buses$", "TransMetro y buses urbanos"),
    (r"^Transcaribe / Buses$", "Transcaribe y buses"),
]

_COMPILADAS = [(re.compile(patron), reemplazo) for patron, reemplazo in REGLAS]


def etiqueta_es(ingles: str) -> str | None:
    """La etiqueta en castellano, o None si ninguna regla la cubre.

    Devolver None y no el original es deliberado: una etiqueta sin traducir
    saldria en ingles en medio de una pantalla en castellano, y prefiero que
    el importador la salte y lo diga a que se cuele sin que nadie la vea.
    """
    limpio = " ".join(ingles.split())
    for patron, reemplazo in _COMPILADAS:
        if patron.match(limpio):
            return patron.sub(reemplazo, limpio)
    return None
