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
    weather: "~27 °C, selva tropical (de las ciudades más lluviosas del mundo)",
    language: "Español",
    currency: "Peso colombiano (COP)",
    internetSpeed: null,
    qualityOfLife: "Media",
    studentSatisfaction: null,
  },
  jobs: {
    averageSalary: null,
    mainIndustries: [{"es": "Comercio de oro y platino", "en": "Gold & Platinum Mining trade"}, {"es": "Sector público", "en": "Public Sector"}, {"es": "Silvicultura", "en": "Forestry"}, {"es": "Transporte fluvial por el río Atrato", "en": "River Transportation along Atrato River"}],
    studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null,
  },
    living: {
        culture: [{"es": "Fiestas de San Pacho (Patrimonio Cultural Inmaterial de la Unesco), música y cocina afrocolombiana del Pacífico.", "en": "Fiestas de San Pacho (UNESCO Intangible Cultural Heritage), Pacific Afro-Colombian music & culinary heritage."}],
    },
});
