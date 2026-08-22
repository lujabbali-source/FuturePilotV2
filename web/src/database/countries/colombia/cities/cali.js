import universities from "../universities/cali";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cali",
    name: "Cali",
    coordinates: { lat: 3.4516, lng: -76.532 },
    region: "Cali y Región Pacífica (Palmira, Buenaventura)",
    statistics: { population: "~2.300.000 habitantes", safety: "Moderada - Baja", weather: "19°C a 31°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~85 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 520, "max": 850, "currency": "USD"},
        studentBudget: {"min": 330, "max": 480, "currency": "USD"},
        rent: {"min": 280, "max": 420, "currency": "USD"},
    },
    jobs: { mainIndustries: ["Sugar Cane & Agro-industry", "Pharmaceuticals", "Food & Beverage Processing", "Commercial Trade", "Salsa Tourism"] },
    living: {
        bestNeighborhoods: [{"es": "San Antonio (bohemio e histórico), Granada, El Peñón, Ciudad Jardín (sur).", "en": "San Antonio (bohemian/historic), Granada, Peñón, Ciudad Jardín (south)."}],
    },
});
