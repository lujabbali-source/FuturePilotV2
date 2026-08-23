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
    jobs: { mainIndustries: [{"es": "Producción y exportación de café", "en": "Coffee Production & Export"}, {"es": "Educación superior", "en": "Higher Education"}, {"es": "Call centers y BPO", "en": "Call Centers/BPO"}, {"es": "Agroindustria", "en": "Agro-industry"}, {"es": "Metalmecánica", "en": "Metalworking"}] },
    living: {
        bestNeighborhoods: [{"es": "El Cable, Palermo, La Estrella, Chipre, Milán.", "en": "El Cable, Palermo, La Estrella, Chipre, Milán."}],
        tourism: [{"es": "Parque Nacional Natural Los Nevados, Termales San Vicente y del Otoño, Catedral Basílica de Nuestra Señora del Rosario, Cable Aéreo.", "en": "Los Nevados National Natural Park, Termales San Vicente / Otoño, Cathedral Basilica of Our Lady of Rosary, Cable Aéreo transit."}],
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 1800000, "max": 3000000, "currency": "COP"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 1200000, "max": 1700000, "currency": "COP"}}, {"label": {"es": "Familia de cuatro", "en": "Family of four"}, "amount": {"min": 1200, "max": 1800, "currency": "USD"}}],
        housing: [{"label": {"es": "Apartaestudio (El Cable/Palermo)", "en": "1 bedroom apartment (El Cable/Palermo)"}, "amount": {"min": 250, "max": 400, "currency": "USD"}}, {"label": {"es": "Habitación compartida de estudiante", "en": "Shared student room"}, "amount": {"min": 120, "max": 200, "currency": "USD"}}],
    },
});
