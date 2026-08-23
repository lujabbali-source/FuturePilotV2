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
    jobs: { mainIndustries: [{"es": "Caña de azúcar y agroindustria", "en": "Sugar Cane & Agro-industry"}, {"es": "Farmacéutica", "en": "Pharmaceuticals"}, {"es": "Procesamiento de alimentos y bebidas", "en": "Food & Beverage Processing"}, {"es": "Comercio", "en": "Commercial Trade"}, {"es": "Turismo de salsa", "en": "Salsa Tourism"}] },
    living: {
        bestNeighborhoods: [{"es": "San Antonio (bohemio e histórico), Granada, El Peñón, Ciudad Jardín (sur).", "en": "San Antonio (bohemian/historic), Granada, Peñón, Ciudad Jardín (south)."}],
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 520, "max": 850, "currency": "USD"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 330, "max": 480, "currency": "USD"}}],
        housing: [{"label": {"es": "Apartaestudio (zona estándar - San Antonio/Granada)", "en": "1 bedroom apartment (Standard - San Antonio/Granada)"}, "amount": {"min": 280, "max": 420, "currency": "USD"}}, {"label": {"es": "Apartaestudio (zona alta - Ciudad Jardín)", "en": "1 bedroom apartment (Upscale - Ciudad Jardín)"}, "amount": {"min": 450, "max": 750, "currency": "USD"}}],
    },
});
