from __future__ import annotations

import hashlib
import json
import re
import sqlite3
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


SCHEMA = """
CREATE TABLE IF NOT EXISTS catalog_imports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    source_file TEXT NOT NULL,
    source_sha256 TEXT NOT NULL,
    imported_at TEXT NOT NULL,
    row_count INTEGER NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS universities (
    whed_id TEXT PRIMARY KEY,
    official_name TEXT NOT NULL,
    native_name TEXT,
    country TEXT NOT NULL,
    country_code TEXT,
    country_key TEXT NOT NULL,
    city TEXT,
    city_key TEXT,
    official_website TEXT,
    institution_type TEXT,
    source TEXT NOT NULL CHECK (source = 'WHED'),
    source_url TEXT,
    source_updated_at TEXT,
    last_seen_import_id INTEGER,
    is_active INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (last_seen_import_id) REFERENCES catalog_imports(id)
);

CREATE INDEX IF NOT EXISTS idx_universities_country
    ON universities(country_key, is_active);
CREATE INDEX IF NOT EXISTS idx_universities_city
    ON universities(country_key, city_key, is_active);
CREATE INDEX IF NOT EXISTS idx_universities_name
    ON universities(official_name COLLATE NOCASE);
"""


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(value: str | None) -> str:
    if not value:
        return ""

    normalized = unicodedata.normalize("NFKD", value)
    without_marks = "".join(char for char in normalized if not unicodedata.combining(char))
    return re.sub(r"[^a-z0-9]+", "-", without_marks.casefold()).strip("-")


def clean(value: object) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def normalized_key(value: object) -> str:
    return re.sub(r"[^a-z0-9]+", "", str(value).casefold())


FIELD_ALIASES = {
    "whed_id": {
        "whedid",
        "globalwhedid",
        "globalidentifier",
        "institutionid",
        "id",
    },
    "official_name": {
        "officialname",
        "institutionname",
        "institutionnameenglish",
        "name",
        "nameenglish",
    },
    "native_name": {"nativename", "localname", "namelocal", "nameinnativelanguage"},
    "country": {"country", "countryname", "countryterritory", "countryorterritory"},
    "country_code": {"countrycode", "iso2", "iso3", "iso3166"},
    "city": {"city", "cityname", "locality", "town"},
    "official_website": {"website", "officialwebsite", "url", "institutionwebsite"},
    "institution_type": {"institutiontype", "typeofinstitution", "funding", "fundingtype"},
    "source_url": {"sourceurl", "whedurl", "permalink", "profileurl"},
    "source_updated_at": {"sourceupdatedat", "updatedat", "lastupdated", "dateupdated"},
}


def pick(record: dict, field: str) -> object:
    aliases = FIELD_ALIASES[field]
    for key, value in record.items():
        if normalized_key(key) in aliases:
            return value
    return None


def normalize_record(record: dict) -> dict:
    whed_id = clean(pick(record, "whed_id"))
    official_name = clean(pick(record, "official_name"))
    country = clean(pick(record, "country"))

    missing = [
        field
        for field, value in (
            ("whed_id", whed_id),
            ("official_name", official_name),
            ("country", country),
        )
        if not value
    ]
    if missing:
        raise ValueError(f"WHED record is missing required fields: {', '.join(missing)}")

    return {
        "whed_id": whed_id,
        "official_name": official_name,
        "native_name": clean(pick(record, "native_name")),
        "country": country,
        "country_code": clean(pick(record, "country_code")),
        "country_key": slugify(country),
        "city": clean(pick(record, "city")),
        "city_key": slugify(clean(pick(record, "city"))),
        "official_website": clean(pick(record, "official_website")),
        "institution_type": clean(pick(record, "institution_type")),
        "source_url": clean(pick(record, "source_url")),
        "source_updated_at": clean(pick(record, "source_updated_at")),
        "source": "WHED",
    }


def record_hash(record: dict) -> str:
    payload = json.dumps(record, ensure_ascii=False, sort_keys=True).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


class WhedCatalog:
    def __init__(self, database_path: str | Path):
        self.database_path = Path(database_path)
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        self.initialize()

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.database_path)
        connection.row_factory = sqlite3.Row
        return connection

    def initialize(self) -> None:
        with self.connect() as connection:
            connection.executescript(SCHEMA)

    def import_snapshot(
        self,
        records: Iterable[dict],
        source_file: str,
        source_sha256: str,
        replace_snapshot: bool = True,
    ) -> dict:
        normalized_records = [normalize_record(record) for record in records]
        if len({record["whed_id"] for record in normalized_records}) != len(normalized_records):
            raise ValueError("The WHED export contains duplicate Global WHED IDs")

        imported_at = utc_now()
        with self.connect() as connection:
            cursor = connection.execute(
                """
                INSERT INTO catalog_imports
                    (source, source_file, source_sha256, imported_at, row_count, status)
                VALUES (?, ?, ?, ?, ?, 'completed')
                """,
                ("WHED", source_file, source_sha256, imported_at, len(normalized_records)),
            )
            import_id = cursor.lastrowid

            if replace_snapshot:
                connection.execute("UPDATE universities SET is_active = 0")

            connection.executemany(
                """
                INSERT INTO universities (
                    whed_id, official_name, native_name, country, country_code,
                    country_key, city, city_key, official_website, institution_type,
                    source, source_url, source_updated_at, last_seen_import_id, is_active
                ) VALUES (
                    :whed_id, :official_name, :native_name, :country, :country_code,
                    :country_key, :city, :city_key, :official_website, :institution_type,
                    :source, :source_url, :source_updated_at, :last_seen_import_id, 1
                )
                ON CONFLICT(whed_id) DO UPDATE SET
                    official_name = excluded.official_name,
                    native_name = excluded.native_name,
                    country = excluded.country,
                    country_code = excluded.country_code,
                    country_key = excluded.country_key,
                    city = excluded.city,
                    city_key = excluded.city_key,
                    official_website = excluded.official_website,
                    institution_type = excluded.institution_type,
                    source = excluded.source,
                    source_url = excluded.source_url,
                    source_updated_at = excluded.source_updated_at,
                    last_seen_import_id = excluded.last_seen_import_id,
                    is_active = 1
                """,
                [dict(record, last_seen_import_id=import_id) for record in normalized_records],
            )

        return {
            "importId": import_id,
            "source": "WHED",
            "sourceFile": source_file,
            "rowCount": len(normalized_records),
            "importedAt": imported_at,
            "sourceSha256": source_sha256,
        }

    def search(
        self,
        country: str | None = None,
        city: str | None = None,
        search: str | None = None,
        limit: int = 50,
        offset: int = 0,
    ) -> dict:
        conditions = ["is_active = 1"]
        parameters: list[object] = []

        if country:
            conditions.append("country_key = ?")
            parameters.append(slugify(country))
        if city:
            conditions.append("city_key = ?")
            parameters.append(slugify(city))
        if search:
            conditions.append("official_name LIKE ?")
            parameters.append(f"%{search.strip()}%")

        where = " AND ".join(conditions)
        with self.connect() as connection:
            total = connection.execute(
                f"SELECT COUNT(*) FROM universities WHERE {where}", parameters
            ).fetchone()[0]
            rows = connection.execute(
                f"""
                SELECT whed_id, official_name, native_name, country, country_code,
                       city, official_website, institution_type, source,
                       source_url, source_updated_at
                FROM universities
                WHERE {where}
                ORDER BY country, city, official_name COLLATE NOCASE
                LIMIT ? OFFSET ?
                """,
                [*parameters, limit, offset],
            ).fetchall()

        return {
            "items": [
                {
                    "id": row["whed_id"],
                    "officialName": row["official_name"],
                    "nativeName": row["native_name"],
                    "country": row["country"],
                    "countryCode": row["country_code"],
                    "city": row["city"],
                    "officialWebsite": row["official_website"],
                    "institutionType": row["institution_type"],
                    "source": row["source"],
                    "sourceUrl": row["source_url"],
                    "sourceUpdatedAt": row["source_updated_at"],
                }
                for row in rows
            ],
            "total": total,
            "limit": limit,
            "offset": offset,
            "source": "WHED",
        }

    def get(self, whed_id: str) -> dict | None:
        with self.connect() as connection:
            row = connection.execute(
                """
                SELECT whed_id, official_name, native_name, country, country_code,
                       city, official_website, institution_type, source,
                       source_url, source_updated_at
                FROM universities
                WHERE whed_id = ? AND is_active = 1
                """,
                (whed_id,),
            ).fetchone()
        if not row:
            return None
        return {
            "id": row["whed_id"],
            "officialName": row["official_name"],
            "nativeName": row["native_name"],
            "country": row["country"],
            "countryCode": row["country_code"],
            "city": row["city"],
            "officialWebsite": row["official_website"],
            "institutionType": row["institution_type"],
            "source": row["source"],
            "sourceUrl": row["source_url"],
            "sourceUpdatedAt": row["source_updated_at"],
        }

    def metadata(self) -> dict:
        with self.connect() as connection:
            row = connection.execute(
                """
                SELECT source, source_file, source_sha256, imported_at, row_count
                FROM catalog_imports
                ORDER BY id DESC
                LIMIT 1
                """
            ).fetchone()
            count = connection.execute(
                "SELECT COUNT(*) FROM universities WHERE is_active = 1"
            ).fetchone()[0]

        return {
            "source": "WHED",
            "activeUniversityCount": count,
            "lastImport": None
            if row is None
            else {
                "sourceFile": row["source_file"],
                "sourceSha256": row["source_sha256"],
                "importedAt": row["imported_at"],
                "rowCount": row["row_count"],
            },
        }
