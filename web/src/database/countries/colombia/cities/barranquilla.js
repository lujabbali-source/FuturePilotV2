import universities from "../universities/barranquilla";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "barranquilla",
    name: "Barranquilla",
    coordinates: { lat: 10.9685, lng: -74.7813 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2200000, "max": 3600000, "currency": "COP"},
        studentBudget: {"min": 350, "max": 500, "currency": "USD"},
        rent: {"min": 560000, "max": 920000, "currency": "COP"},
        food: {"min": 520000, "max": 720000, "currency": "COP"},
        transportation: {"min": 100000, "max": 140000, "currency": "COP"},
        utilities: {"min": 200000, "max": 360000, "currency": "COP"},
    },
    jobs: { mainIndustries: ["Logistics & Maritime Freight", "Industrial Manufacturing", "Construction", "BPO", "Commerce"] },
});
