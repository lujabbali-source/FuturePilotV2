import universities from "../universities/santa-marta";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "santa-marta",
    name: "Santa Marta",
    coordinates: { lat: 11.2408, lng: -74.199 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 500, "max": 850, "currency": "USD"},
        studentBudget: {"min": 500, "max": 850, "currency": "USD"},
    },
    jobs: { mainIndustries: ["Port Operations", "International Tourism", "Banana & Palm Agribusiness"] },
    living: {
        tourism: [{"es": "Parque Nacional Natural Tayrona, Minca (café y bosque de niebla), El Rodadero, Ciudad Perdida.", "en": "Tayrona National Natural Park, Minca (coffee/cloud forest), Rodadero, Lost City (Ciudad Perdida)."}],
    },
});
