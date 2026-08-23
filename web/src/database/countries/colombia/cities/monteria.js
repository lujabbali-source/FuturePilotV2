import universities from "../universities/monteria";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "monteria",
    name: "Montería",
    coordinates: { lat: 8.7575, lng: -75.8918 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 380, "max": 600, "currency": "USD"},
        studentBudget: {"min": 380, "max": 600, "currency": "USD"},
    },
    jobs: { mainIndustries: [{"es": "Ganadería y exportación de carne", "en": "Livestock & Beef Exports"}, {"es": "Agricultura", "en": "Agriculture"}, {"es": "Comercio fluvial", "en": "River Commerce"}] },
});
