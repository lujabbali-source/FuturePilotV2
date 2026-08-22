import universities from "../universities/bucaramanga";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bucaramanga",
    name: "Bucaramanga",
    coordinates: { lat: 7.1193, lng: -73.1227 },
    region: "Bucaramanga y Santanderes (Cúcuta, Pamplona)",
    statistics: { population: "~600.000 habitantes (Bucaramanga)", safety: "Alta", weather: "18°C a 27°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~90 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2000000, "max": 3200000, "currency": "COP"},
        studentBudget: {"min": 320, "max": 450, "currency": "USD"},
        rent: {"min": 280, "max": 420, "currency": "USD"},
        food: {"min": 120, "max": 170, "currency": "USD"},
    },
    jobs: { averageSalary: 3600000, mainIndustries: ["Footwear & Apparel Manufacturing", "Healthcare Services", "Oil & Gas engineering"] },
});
