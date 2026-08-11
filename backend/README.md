# backend/

This folder is a data library (`users_store.py`, `data/`), not a standalone server. `backend/main.py` was retired — its static-file serving and routes were absorbed into `futurepilot-IA/app.py`, the single unified backend entry point. Run the app from there.

## Users and sessions

`users_store.py` is a plain-sqlite3 store for accounts, sessions and test-result summaries. See its docstrings and `futurepilot-IA/app.py`'s `/api/v1/auth/*` and `/api/v1/me/*` routes for the API surface.

## University data

The external WHED catalog integration (`whed_catalog.py`, `import_whed.py`) was retired. University data for the FuturePilot Globe is now sourced entirely from a manually curated Word document, converted to per-country/per-city JS files under `futurepilot-globe/src/database/countries/`. See `futurepilot-globe/scripts/parse_universities_docx.py` and `import_americas_docx.py` for the conversion pipeline. The backend does not expose a university API — the globe app reads the generated files directly.
