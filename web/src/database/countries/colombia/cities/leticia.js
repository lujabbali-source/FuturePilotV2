import { defineCity } from "../citySchema";

// Leticia — de "America cities.docx", via web/scripts/apply_colombia_cities.py.
// Las coordenadas son conocimiento geografico publico, igual que en
// city_coordinates.py: el documento no trae lat/lng.
//
// Sin universidades todavia: el documento de ciudades no las lista y el de
// universidades no cubre esta. Se queda vacio en vez de suponerlas.

export default defineCity({
  id: "leticia",
  name: "Leticia",
  coordinates: { lat: -4.2153, lng: -69.9406 },
  region: "Amazonas",
  costOfLiving: {
    currency: "COP",
    monthlyEstimate: {"min": 400, "max": 650, "currency": "USD"},
    rent: null,
    food: null,
    transportation: null,
    utilities: null,
    studentBudget: null,
  },
  statistics: {
    population: "~50.000 habitantes",
    safety: null,
    weather: "~26 °C, selva ecuatorial en la triple frontera",
    language: "Español",
    currency: "Peso colombiano (COP)",
    internetSpeed: null,
    qualityOfLife: "Media",
    studentSatisfaction: null,
  },
  jobs: {
    averageSalary: null,
    mainIndustries: [{"es": "Ecoturismo", "en": "Ecotourism"}, {"es": "Logística fluvial del Amazonas", "en": "Amazon River Logistics"}, {"es": "Pesca artesanal", "en": "Artisanal Fishing"}, {"es": "Artesanía indígena", "en": "Indigenous Crafts"}],
    studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null,
  },
    living: {
        culture: [{"es": "Excursiones por el río Amazonas, Reserva Tanimboca, Isla de los Micos.", "en": "Amazon River excursions, Tanimboca Reserve, Monkey Island (Isla de los Monos)."}],
    },
});
