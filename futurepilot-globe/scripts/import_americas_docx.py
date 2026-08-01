"""Import the country/city/university directory from the supplied Word document.

This importer does not enrich the source data itself (images, costs,
scholarships, statistics stay empty) - the one deliberate exception is
`coordinates`, filled in from the separate, hand-maintained public lookup in
`city_coordinates.py` (the document has no lat/lng), so cities can appear as
markers on the globe. Cities absent from that lookup keep `coordinates: null`.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

from docx import Document

from city_coordinates import CITY_COORDINATES


COUNTRY_PREFIX = "Directorio Oficial de Universidades en "
DESCRIPTION_PREFIXES = (
    "Este documento", "El ", "La ", "Las ", "Los ", "Estas ", "Zonas ",
    "Regiones ", "Región ", "Importante ", "Polo ", "Polos ", "Centros ",
    "Ubicada ", "Ubicado ", "Conocida ", "Conocido ", "Destaca ",
)
ADMIN_WORDS = re.compile(r"\b(estado|región|region|provincia|área|area|zona|centro|norte|sur|este|oeste|costa|llanos|sierra|litoral|metropolitana|capital|departamento)\b", re.I)
NON_CITY_EXACT = {
    "Azuay", "Manabí", "Imbabura", "Carchi", "Patagonia Argentina", "Amazonía Peruana",
    "Región Este", "Alto Paraná", "Itapúa", "Caaguazú", "Guairá", "Chuquisaca", "Tarija",
    "Beni", "Occidente", "Noroeste del Pacífico", "Ontario", "Quebec", "Alberta", "Manitoba",
    "Saskatchewan", "Columbia Británica / British Columbia", "Guanacaste", "La Libertad",
    "Florida", "Texas", "Illinois", "Míchigan", "Indiana", "Norte", "Sur", "Centro-Oeste",
    "Minas Gerais", "Amazonía Boliviana", "Noreste", "Provincias de las Praderas",
    "Centro-Sur", "Ciudad del Saber", "GAM", "Panamá Oeste", "Provincias Centrales",
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", normalized.lower()).strip("-")


def parse_type(text: str) -> str | None:
    match = re.search(r"(?:\*\s*)?Tipo:\s*([^|]+?)(?:\s*$|\s*\*)", text, re.I)
    if not match:
        return None
    value = match.group(1).strip().lower()
    if "públic" in value or "public" in value or "federal" in value or "estadual" in value:
        return "public"
    if "privad" in value or "private" in value or "cofinanc" in value:
        return "private"
    return value or None


def strip_inline_metadata(text: str) -> str:
    value = re.split(r"\s*\*\s*(?:Tipo|Cobertura):", text, maxsplit=1, flags=re.I)[0]
    return clean(value)


def is_country_header(text: str) -> bool:
    return text.startswith(COUNTRY_PREFIX)


def is_region_header(text: str) -> bool:
    return bool(text) and not text[0].isalnum() and not text.startswith("Enlace")


def likely_description(text: str) -> bool:
    return len(text) > 90 or text.endswith((".", ".\"")) or text.startswith(DESCRIPTION_PREFIXES)


def split_city_candidates(text: str) -> list[str]:
    value = re.sub(r"^[^A-Za-zÀ-ÿ]+", "", text)
    value = clean(value)
    if not value:
        return []

    groups = re.findall(r"\(([^)]+)\)", value)
    prefix = clean(value.split("(", 1)[0])
    candidates: list[str] = []

    def add(item: str) -> None:
        item = clean(item.strip(" ,/"))
        if not item or item in NON_CITY_EXACT:
            return
        if ADMIN_WORDS.search(item) and len(item.split()) > 1:
            return
        if item not in candidates:
            candidates.append(item)

    if groups:
        if prefix:
            add(re.split(r"\s+y\s+", prefix, maxsplit=1, flags=re.I)[0])
        for group in groups:
            for item in re.split(r"\s+y\s+|,|/", group, flags=re.I):
                add(item)
    else:
        for item in re.split(r"\s+y\s+|,|/", prefix, flags=re.I):
            add(item)

    return candidates


def extract_region_candidates(text: str) -> list[str]:
    candidates = split_city_candidates(text)
    return [item for item in candidates if not ADMIN_WORDS.fullmatch(item)]


def parse_document(path: Path) -> dict[str, dict]:
    """Anchored on "Enlace Oficial:" lines, the one 100%-reliable marker in the
    document (599/599 entries have one). Everything since the last entry
    closed (or since the last country header) is buffered; when "Enlace
    Oficial:" appears, the LAST buffered line is always the entry's own name
    (an entry's name always immediately precedes its Tipo:/Enlace Oficial:
    lines with nothing in between) and anything buffered BEFORE that is
    region/city heading or description text, processed the same way the old
    line-by-line loop did. This avoids the previous heuristic (looking ahead
    up to 2 lines for a "Tipo:" line), which misclassified plain-text city/
    sub-region headers with no emoji (e.g. "Rosario (Santa Fe)", "Mendoza")
    as fake university entries whenever they happened to sit close enough to
    the next real "Tipo:" line.
    """
    lines = [clean(paragraph.text) for paragraph in Document(path).paragraphs if clean(paragraph.text)]
    countries: dict[str, dict] = {}
    current_country: dict | None = None
    current_city_candidates: list[str] = []
    pending_region_candidates: list[str] = []
    current_region_label: str | None = None
    buffer: list[str] = []

    def process_header_line(line: str) -> None:
        nonlocal current_city_candidates, pending_region_candidates, current_region_label
        if is_region_header(line):
            # Strip the leading emoji/symbol for a clean display label.
            current_region_label = clean(re.sub(r"^\W+", "", line))
            pending_region_candidates = extract_region_candidates(line)
            current_city_candidates = []
            return
        if likely_description(line) or line.startswith("Directorio Oficial") or line.startswith("Cobertura:"):
            return
        candidates = split_city_candidates(line)
        if candidates and len(line) < 100:
            current_city_candidates = candidates
            pending_region_candidates = candidates

    for line in lines:
        if is_country_header(line):
            buffer.clear()
            name = line[len(COUNTRY_PREFIX):].strip()
            country_id = slug(name.replace(" (USA)", ""))
            current_country = {"id": country_id, "name": name, "cities": {}, "nationalUniversities": []}
            countries[country_id] = current_country
            current_city_candidates = []
            pending_region_candidates = []
            current_region_label = None
            continue
        if current_country is None:
            continue
        if not line.startswith("Enlace Oficial:"):
            buffer.append(line)
            continue

        website = line.split(":", 1)[1].strip()
        entry_lines = buffer[:]
        buffer.clear()

        type_value = None
        if entry_lines and re.match(r"^Tipo:", entry_lines[-1], re.I):
            type_value = parse_type(entry_lines[-1])
            entry_lines = entry_lines[:-1]

        if not entry_lines:
            continue  # malformed entry with no name line at all - nothing to attach the link to

        name_line = entry_lines[-1]
        for header_line in entry_lines[:-1]:
            process_header_line(header_line)

        name = strip_inline_metadata(name_line)
        type_value = type_value or parse_type(name_line)

        city_candidates = current_city_candidates or pending_region_candidates
        if not city_candidates:
            current_country["nationalUniversities"].append({"name": name, "website": website, "type": type_value})
            continue
        chosen_city = next((city for city in city_candidates if city.lower() in name.lower()), city_candidates[0])
        city_id = f"{current_country['id']}-{slug(chosen_city)}"
        city = current_country["cities"].setdefault(
            city_id, {"id": city_id, "name": chosen_city, "region": current_region_label, "universities": []}
        )
        city["universities"].append({"id": f"{city_id}-{slug(name)}", "name": name, "cityId": city_id, "website": website, "type": type_value})

    return countries


def js(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_country_files(countries: dict[str, dict], output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    output_countries = [country for country in countries.values() if country["id"] != "colombia"]
    for country in output_countries:
        content = "import { defineCity, defineCountry, defineUniversity } from \"../schema\";\n\n"
        content += f"const countryId = {json.dumps(country['id'], ensure_ascii=False)};\n"
        content += f"const countryName = {json.dumps(country['name'], ensure_ascii=False)};\n\n"
        content += "const cities = [\n"
        for city in country["cities"].values():
            coords = CITY_COORDINATES.get(city["id"])
            lat, lng, is_capital = coords if coords else (None, None, False)
            coordinates_js = "null" if lat is None else json.dumps({"lat": lat, "lng": lng})

            content += "  defineCity({\n"
            content += f"    id: {json.dumps(city['id'], ensure_ascii=False)},\n    name: {json.dumps(city['name'], ensure_ascii=False)},\n"
            content += f"    region: {json.dumps(city.get('region'), ensure_ascii=False)},\n"
            content += f"    coordinates: {coordinates_js},\n    isCapital: {json.dumps(is_capital)},\n    countryId,\n    countryName,\n    universities: [\n"
            for university in city["universities"]:
                content += "      defineUniversity(" + js(university).replace("\n", "\n      ") + "),\n"
            content += "    ],\n  }),\n"
        content += "];\n\n"
        national_universities_js = ",\n".join(
            "    defineUniversity(" + js({**u, "id": f"{country['id']}-national-{slug(u['name'])}", "cityId": "national"}).replace("\n", "\n    ") + ")"
            for u in country["nationalUniversities"]
        )
        national_universities_block = (
            "[]" if not country["nationalUniversities"] else f"[\n{national_universities_js},\n  ]"
        )
        content += "export default defineCountry({\n"
        content += (
            "  id: countryId,\n  name: countryName,\n  capital: null,\n  currency: null,\n  language: null,\n"
            f"  continent: \"America\",\n  cities,\n  nationalUniversities: {national_universities_block},\n"
            "});\n"
        )
        (output_dir / f"{country['id']}.js").write_text(content, encoding="utf-8")

    index = "".join(f'import {country["id"].replace("-", "_")} from "./{country["id"]}";\n' for country in output_countries)
    index += "\nexport const countries = {\n"
    index += "".join(f'  "{country["id"]}": {country["id"].replace("-", "_")},\n' for country in output_countries)
    index += "};\n\nexport default countries;\n"
    (output_dir / "index.js").write_text(index, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("document", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    countries = parse_document(args.document)
    for country in countries.values():
        university_count = sum(len(city["universities"]) for city in country["cities"].values())
        print(f"{country['id']}: {len(country['cities'])} cities, {university_count} universities")
    if not args.dry_run:
        write_country_files(countries, args.output)


if __name__ == "__main__":
    main()
