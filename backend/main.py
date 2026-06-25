print("🔥 NEW MAIN LOADED 🔥")

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

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