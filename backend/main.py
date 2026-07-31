print("🔥 NEW MAIN LOADED 🔥")

from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

try:
    from .whed_catalog import WhedCatalog
except ImportError:
    from whed_catalog import WhedCatalog

app = FastAPI()
whed_catalog = WhedCatalog(Path(__file__).resolve().parent / "data" / "whed.sqlite3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Archivos estáticos
app.mount(
    "/Frontend",
    StaticFiles(directory="Frontend"),
    name="static"
)
#app.mount(
#   "/assets",
#    StaticFiles(directory="/assets"),
#   name="assets"
#)

from fastapi.responses import FileResponse

@app.get("/style.css")
def style_css():
    return FileResponse("Frontend/style.css")

@app.get("/futurepilot-logo.png")
def logo():
    return FileResponse("Frontend/futurepilot-logo.png")

class AssessmentResult(BaseModel):
    career: str
    learningStyle: str
    universityGoal: str


# HOME

@app.get("/")
def home():
    return FileResponse("Frontend/index.html")


# ASSESSMENT

@app.get("/assessment")
def assessment_page():
    return FileResponse("Frontend/assessment.html")


# CAREERS

@app.get("/careers")
def careers_page():
    return FileResponse("Frontend/careers.html")


# ROADMAP

@app.get("/roadmap")
def roadmap_page():
    return FileResponse("Frontend/roadmap.html")


# JOURNEY

@app.get("/journey")
def journey_page():
    return FileResponse("Frontend/journey.html")


# FLIGHTPLAN

@app.get("/flightplan")
def flightplan_page():
    return FileResponse("Frontend/flightplan.html")


# API

@app.post("/assessment-result")
def save_assessment(data: AssessmentResult):
    return {
        "status": "success",
        "career": data.career,
        "learningStyle": data.learningStyle,
        "universityGoal": data.universityGoal
    }


@app.get("/api/catalog/metadata")
def catalog_metadata():
    return whed_catalog.metadata()


@app.get("/api/universities")
def list_universities(
    country: str | None = None,
    city: str | None = None,
    search: str | None = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    return whed_catalog.search(
        country=country,
        city=city,
        search=search,
        limit=limit,
        offset=offset,
    )


@app.get("/api/universities/{whed_id}")
def get_university(whed_id: str):
    university = whed_catalog.get(whed_id)
    if university is None:
        raise HTTPException(status_code=404, detail="WHED institution not found")
    return university
