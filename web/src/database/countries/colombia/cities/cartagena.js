import universities from "../universities/cartagena";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cartagena",
    name: "Cartagena",
    coordinates: { lat: 10.391, lng: -75.4794 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2600000, "max": 4200000, "currency": "COP"},
        studentBudget: {"min": 400, "max": 580, "currency": "USD"},
        rent: {"min": 160, "max": 260, "currency": "USD"},
        food: {"min": 140, "max": 210, "currency": "USD"},
        transportation: {"min": 25, "max": 35, "currency": "USD"},
        utilities: {"min": 55, "max": 95, "currency": "USD"},
    },
    jobs: { averageSalary: 3500000, mainIndustries: ["Tourism & Hospitality", "Petrochemicals"] },
    living: {
        bestNeighborhoods: [{"es": "Bocagrande, Castillogrande, Manga, Getsemaní, Zona Norte.", "en": "Bocagrande, Castillogrande, Manga, Getsemaní, Zona Norte."}],
        tourism: [{"es": "Ciudad Amurallada, Castillo San Felipe de Barajas, Islas del Rosario, Barú.", "en": "Walled City (Ciudad Amurallada), Castillo San Felipe de Barajas, Rosario Islands, Baru."}],
        food: [{"es": "Posta negra cartagenera, arroz con coco, pescado frito, patacones.", "en": "Posta Negra Cartagenera, Coconut rice, Fried fish, Patacones."}],
    },
});
