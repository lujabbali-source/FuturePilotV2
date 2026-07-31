"""Import the country/city/university directory from the supplied Word document.

This importer deliberately does not enrich the source. Coordinates, images,
costs, scholarships and other fields absent from the document remain empty.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

from docx import Document


COUNTRY_PREFIX = "Directorio Oficial de Universidades en "
UNIVERSITY_HINTS = (
    "Universidad", "Universidade", "University", "Institut", "Institute",
    "Escuela", "School", "Pontificia", "Colegio", "Corporación",
    "Corporation", "Politécnico", "Politecnico", "Tecnológico", "Tecnologico",
    "Fundación", "Fundacao", "Faculdade", "École", "Centre", "Centro",
    "McGill", "Harvard", "Princeton", "Yale", "Stanford", "Columbia",
    "Cornell", "Duke", "Brown", "Dartmouth", "Carnegie", "Northeastern",
    "Rice", "Johns Hopkins", "Georgetown", "Emory", "Purdue", "CETYS",
    "INCAE", "ITCA", "UNITEC", "FAREM", "UNAH", "UNAN", "USAC", "UCA",
)
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


def is_type_or_link(text: str) -> bool:
    return bool(re.match(r"^(?:\*\s*)?(?:Tipo|Cobertura|Enlace Oficial):", text, re.I))


def is_country_header(text: str) -> bool:
    return text.startswith(COUNTRY_PREFIX)


def normalized_starts_with_university(text: str) -> bool:
    normalized = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii").lower()
    return any(normalized.startswith(unicodedata.normalize("NFKD", hint).encode("ascii", "ignore").decode("ascii").lower()) for hint in UNIVERSITY_HINTS)


def is_region_header(text: str) -> bool:
    return bool(text) and not text[0].isalnum() and not text.startswith("Enlace")


def likely_description(text: str) -> bool:
    return len(text) > 90 or text.endswith((".", ".\"")) or text.startswith(DESCRIPTION_PREFIXES)


def looks_like_university(index: int, lines: list[str]) -> bool:
    text = lines[index]
    if is_type_or_link(text) or is_country_header(text) or is_region_header(text):
        return False
    if "* Tipo:" in text or "* Cobertura:" in text:
        return True
    if index + 1 < len(lines) and re.match(r"^Tipo:", lines[index + 1], re.I):
        return True
    if index + 2 < len(lines) and re.match(r"^Tipo:", lines[index + 2], re.I):
        return True
    return normalized_starts_with_university(text) and not likely_description(text)


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
    lines = [clean(paragraph.text) for paragraph in Document(path).paragraphs if clean(paragraph.text)]
    countries: dict[str, dict] = {}
    current_country: dict | None = None
    current_city_candidates: list[str] = []
    pending_region_candidates: list[str] = []

    for index, line in enumerate(lines):
        if is_country_header(line):
            name = line[len(COUNTRY_PREFIX):].strip()
            country_id = slug(name.replace(" (USA)", ""))
            current_country = {"id": country_id, "name": name, "cities": {}, "nationalUniversities": []}
            countries[country_id] = current_country
            current_city_candidates = []
            pending_region_candidates = []
            continue
        if current_country is None:
            continue
        if is_region_header(line):
            pending_region_candidates = extract_region_candidates(line)
            current_city_candidates = []
            continue
        if is_type_or_link(line) or likely_description(line):
            continue
        if looks_like_university(index, lines):
            name = strip_inline_metadata(line)
            type_value = parse_type(line)
            lookahead = index + 1
            if type_value is None and lookahead < len(lines) and re.match(r"^Tipo:", lines[lookahead], re.I):
                type_value = parse_type(lines[lookahead])
            website = None
            for candidate in lines[index + 1:index + 4]:
                if candidate.startswith("Enlace Oficial:"):
                    website = candidate.split(":", 1)[1].strip()
                    break

            city_candidates = current_city_candidates or pending_region_candidates
            if not city_candidates:
                current_country["nationalUniversities"].append({"name": name, "website": website, "type": type_value})
                continue
            chosen_city = next((city for city in city_candidates if city.lower() in name.lower()), city_candidates[0])
            city_id = f"{current_country['id']}-{slug(chosen_city)}"
            city = current_country["cities"].setdefault(city_id, {"id": city_id, "name": chosen_city, "universities": []})
            city["universities"].append({"id": f"{city_id}-{slug(name)}", "name": name, "cityId": city_id, "website": website, "type": type_value})
            continue
        if line.startswith("Directorio Oficial") or line.startswith("Cobertura:"):
            continue
        city_candidates = split_city_candidates(line)
        if city_candidates and len(line) < 100:
            current_city_candidates = city_candidates
            pending_region_candidates = city_candidates

    return countries


def js(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_country_files(countries: dict[str, dict], output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    output_countries = [country for country in countries.values() if country["id"] != "colombia"]
    for country in output_countries:
        city_blocks = []
        for city in country["cities"].values():
            university_blocks = [
                f"defineUniversity({js({k: v for k, v in university.items() if k != 'id' or True})})"
                for university in city["universities"]
            ]
            university_blocks = [block.replace("\"", "\"") for block in university_blocks]
            city_blocks.append({**city, "coordinates": None})

        content = "import { defineCity, defineCountry, defineUniversity } from \"../schema\";\n\n"
        content += f"const countryId = {json.dumps(country['id'], ensure_ascii=False)};\n"
        content += f"const countryName = {json.dumps(country['name'], ensure_ascii=False)};\n\n"
        content += "const cities = [\n"
        for city in city_blocks:
            content += "  defineCity({\n"
            content += f"    id: {json.dumps(city['id'], ensure_ascii=False)},\n    name: {json.dumps(city['name'], ensure_ascii=False)},\n"
            content += "    coordinates: null,\n    isCapital: false,\n    countryId,\n    countryName,\n    universities: [\n"
            for university in city["universities"]:
                content += "      defineUniversity(" + js(university).replace("\n", "\n      ") + "),\n"
            content += "    ],\n  }),\n"
        content += "];\n\n"
        content += "export default defineCountry({\n"
        content += "  id: countryId,\n  name: countryName,\n  capital: null,\n  currency: null,\n  language: null,\n  continent: \"America\",\n  cities,\n  nationalUniversities: " + js(country["nationalUniversities"]) + ",\n});\n"
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
