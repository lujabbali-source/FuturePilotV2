import universities from "../universities/cucuta";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cucuta",
    name: "Cúcuta",
    coordinates: { lat: 7.8891, lng: -72.4967 },
    region: "Bucaramanga y Santanderes (Cúcuta, Pamplona)",
    statistics: { population: "~600.000 habitantes (Bucaramanga)", safety: "Alta", weather: "18°C a 27°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~90 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 380, "max": 600, "currency": "USD"},
        studentBudget: {"min": 380, "max": 600, "currency": "USD"},
    },
    jobs: { mainIndustries: ["Border Trade with Venezuela", "Textiles", "Clay & Ceramic Manufacturing", "Mining"] },
});
