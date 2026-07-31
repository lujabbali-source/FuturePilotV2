# WHED catalog

FuturePilot stores the official institution catalog in SQLite and reads it through the backend API. The frontend never ships a manually maintained university list.

WHED does not expose a public API in the portal. Its terms also prohibit copying all or a substantial part of the portal without prior consent. The importer therefore accepts only a CSV or JSON export that FuturePilot is authorized to receive from IAU/MyWHED.

## Import an authorized export

```powershell
python backend/import_whed.py C:\path\to\authorized-whed-export.csv --dry-run
python backend/import_whed.py C:\path\to\authorized-whed-export.csv
```

JSON input can be a top-level array or an object containing `items`, `institutions`, `universities`, `records`, or `data`. Required fields are a Global WHED ID, the official institution name, and country. The importer preserves the source name and official website, stores `source = WHED`, validates duplicate IDs, records a SHA-256 checksum, and keeps the latest snapshot active without deleting historical enrichment records.

The local database defaults to `backend/data/whed.sqlite3`. Override it with `--database`. Use `--append` only when the file is a partial authorized export; the default is a complete snapshot replacement.

## API

- `GET /api/universities?country=Colombia&city=bogota&limit=100`
- `GET /api/universities/{global-whed-id}`
- `GET /api/catalog/metadata`

The catalog is paginated and indexed by WHED ID, country, city, and official name so it can handle more than 20,000 institutions. FuturePilot-specific fields such as scholarships, programs, costs, rankings, and advisor data should be stored in separate tables keyed by `whed_id`, not mixed into the imported source record.
