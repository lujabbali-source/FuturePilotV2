import universities from "../universities/medellin";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "medellin",
    name: "Medellín",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    region: "Medellín y Área Metropolitana (Envigado, Sabaneta, Caldas)",
    statistics: { population: "~4.000.000 habitantes", safety: "Moderada", weather: "16°C a 28°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~105 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2600000, "max": 4400000, "currency": "COP"},
        studentBudget: {"min": 1600000, "max": 2300000, "currency": "COP"},
        rent: {"min": 680000, "max": 1100000, "currency": "COP"},
        food: {"min": 560000, "max": 800000, "currency": "COP"},
        transportation: {"min": 100000, "max": 160000, "currency": "COP"},
        utilities: {"min": 140000, "max": 260000, "currency": "COP"},
    },
    jobs: { mainIndustries: ["Technology & Innovation", "Textiles & Fashion", "Financial Services", "Health Tourism", "BPO"] },
});
