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
    living: {
        bestNeighborhoods: [{"es": "Pinares, Avenida Circunvalar, Cerritos (zona campestre), Álamos.", "en": "Pinares, Av. Circunvalar, Cerritos (suburban luxury), Álamos."}],
        tourism: [{"es": "Bioparque Ukumarí, Salento y el Valle de Cocora (cerca), Termales de Santa Rosa de Cabal, Otún Quimbaya.", "en": "Ukumarí Biopark, Salento & Cocora Valley (nearby), Santa Rosa de Cabal Hot Springs, Otún Quimbaya."}],
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 480, "max": 800, "currency": "USD"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 320, "max": 450, "currency": "USD"}}],
        housing: [{"label": {"es": "Apartaestudio (Pinares/Circunvalar)", "en": "1 bedroom apartment (Pinares/Circunvalar)"}, "amount": {"min": 280, "max": 450, "currency": "USD"}}],
    },
});
