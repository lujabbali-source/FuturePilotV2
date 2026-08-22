import universities from "../universities/manizales";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "manizales",
    name: "Manizales",
    coordinates: { lat: 5.0703, lng: -75.5138 },
    region: "Eje Cafetero (Manizales, Pereira, Armenia)",
    statistics: { population: "~1.400.000 habitantes (Región)", safety: "Alta", weather: "14°C a 26°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~95 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 1800000, "max": 3000000, "currency": "COP"},
        studentBudget: {"min": 1200000, "max": 1700000, "currency": "COP"},
        rent: {"min": 250, "max": 400, "currency": "USD"},
    },
    jobs: { mainIndustries: ["Coffee Production & Export", "Higher Education", "Call Centers/BPO", "Agro-industry", "Metalworking"] },
});
