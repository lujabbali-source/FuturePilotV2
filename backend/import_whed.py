from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path

from whed_catalog import WhedCatalog, normalize_record


def load_records(path: Path) -> list[dict]:
    if path.suffix.casefold() == ".csv":
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            return list(csv.DictReader(handle))

    with path.open("r", encoding="utf-8-sig") as handle:
        payload = json.load(handle)

    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict):
        for key in ("items", "institutions", "universities", "records", "data"):
            if isinstance(payload.get(key), list):
                return payload[key]
    raise ValueError("Expected a list of WHED records in CSV or JSON format")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Import an authorized WHED CSV/JSON export into FuturePilot's local catalog."
    )
    parser.add_argument("input_file", type=Path)
    parser.add_argument(
        "--database",
        type=Path,
        default=Path(__file__).resolve().parent / "data" / "whed.sqlite3",
    )
    parser.add_argument("--append", action="store_true", help="Keep active records not present in this snapshot")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    raw_bytes = args.input_file.read_bytes()
    records = load_records(args.input_file)
    normalized = [normalize_record(record) for record in records]

    if args.dry_run:
        print(json.dumps({"source": "WHED", "rowCount": len(normalized)}, indent=2))
        return

    result = WhedCatalog(args.database).import_snapshot(
        records,
        source_file=str(args.input_file),
        source_sha256=hashlib.sha256(raw_bytes).hexdigest(),
        replace_snapshot=not args.append,
    )
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
