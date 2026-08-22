import universities from "../universities/pereira";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "pereira",
    name: "Pereira",
    coordinates: { lat: 4.8143, lng: -75.6946 },
    region: "Eje Cafetero (Manizales, Pereira, Armenia)",
    statistics: { population: "~1.400.000 habitantes (Región)", safety: "Alta", weather: "14°C a 26°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~95 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 480, "max": 800, "currency": "USD"},
        studentBudget: {"min": 320, "max": 450, "currency": "USD"},
        rent: {"min": 280, "max": 450, "currency": "USD"},
    },
    jobs: { averageSalary: 3400000, mainIndustries: ["Commercial Trade", "Coffee Logistics", "Garment Manufacturing", "BPO", "Tourism & Leisure"] },
});
