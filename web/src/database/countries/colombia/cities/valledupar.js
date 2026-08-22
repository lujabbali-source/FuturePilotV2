import { defineCity } from "../citySchema";

// Valledupar — de "America cities.docx", via web/scripts/apply_colombia_cities.py.
// Las coordenadas son conocimiento geografico publico, igual que en
// city_coordinates.py: el documento no trae lat/lng.
//
// Sin universidades todavia: el documento de ciudades no las lista y el de
// universidades no cubre esta. Se queda vacio en vez de suponerlas.

export default defineCity({
  id: "valledupar",
  name: "Valledupar",
  coordinates: { lat: 10.4631, lng: -73.2532 },
  region: "Cesar",
  costOfLiving: {
    currency: "COP",
    monthlyEstimate: {"min": 380, "max": 600, "currency": "USD"},
    rent: null,
    food: null,
    transportation: null,
    utilities: null,
    studentBudget: {"min": 380, "max": 600, "currency": "USD"},
  },
  statistics: {
    population: "~500.000 habitantes",
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
    mainIndustries: ["Coal Mining Logistics", "Cattle Livestock", "Cotton & Agribusiness", "Vallenato Culture"],
    studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null,
  },
});
