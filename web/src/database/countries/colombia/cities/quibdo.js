import { defineCity } from "../citySchema";

// Quibdó — de "America cities.docx", via web/scripts/apply_colombia_cities.py.
// Las coordenadas son conocimiento geografico publico, igual que en
// city_coordinates.py: el documento no trae lat/lng.
//
// Sin universidades todavia: el documento de ciudades no las lista y el de
// universidades no cubre esta. Se queda vacio en vez de suponerlas.

export default defineCity({
  id: "quibdo",
  name: "Quibdó",
  coordinates: { lat: 5.6947, lng: -76.6611 },
  region: "Chocó",
  costOfLiving: {
    currency: "COP",
    monthlyEstimate: {"min": 350, "max": 550, "currency": "USD"},
    rent: null,
    food: null,
    transportation: null,
    utilities: null,
    studentBudget: {"min": 350, "max": 550, "currency": "USD"},
  },
  statistics: {
    population: "~130.000 habitantes",
    safety: null,
    weather: null,
    language: "Español",
    currency: "Peso colombiano (COP)",
    internetSpeed: null,
    qualityOfLife: null,
    studentSatisfaction: null,
  },
  jobs: {
    averageSalary: null,
    mainIndustries: ["Gold & Platinum Mining trade", "Public Sector", "Forestry", "River Transportation along Atrato River"],
    studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null,
  },
});
