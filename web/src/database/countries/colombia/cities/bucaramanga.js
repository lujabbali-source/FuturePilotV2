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
    jobs: { averageSalary: {"amount": 3600000, "currency": "COP", "source": "America cities.docx", "asOf": "2026"}, mainIndustries: [{"es": "Calzado y confección", "en": "Footwear & Apparel Manufacturing"}, {"es": "Servicios de salud", "en": "Healthcare Services"}, {"es": "Ingeniería de petróleo y gas", "en": "Oil & Gas engineering"}] },
    living: {
        bestNeighborhoods: [{"es": "Cabecera del Llano, Sotomayor, Cañaveral (Floridablanca), Ruitoque.", "en": "Cabecera del Llano, Sotomayor, Cañaveral (Floridablanca), Ruitoque."}],
        healthcare: [{"es": "Referente nacional destacado (Fundación FOSCAL, Hospital Internacional de Colombia - HIC).", "en": "Outstanding national reference (Fundación FOSCAL, Hospital Internacional de Colombia - HIC)."}],
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 2000000, "max": 3200000, "currency": "COP"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 1300000, "max": 1800000, "currency": "COP"}}, {"label": {"es": "Familia de cuatro", "en": "Family of four"}, "amount": {"min": 1300, "max": 2000, "currency": "USD"}}],
        housing: [{"label": {"es": "Apartaestudio (zona estándar - Cabecera/Cañaveral)", "en": "1 bedroom apartment (Standard area - Cabecera/Cañaveral)"}, "amount": {"min": 280, "max": 420, "currency": "USD"}}, {"label": {"es": "Presupuesto de estudiante", "en": "Student budget"}, "amount": {"min": 320, "max": 450, "currency": "USD"}}],
        food: [{"label": {"es": "Mercado (1 persona)", "en": "Local groceries (1 person)"}, "amount": {"min": 120, "max": 170, "currency": "USD"}}, {"label": {"es": "Almuerzo corriente", "en": "Cheap local lunch"}, "amount": {"min": 2, "max": 4, "currency": "USD"}}, {"label": {"es": "Cena de gama media (2 personas)", "en": "Mid-range dinner (2 people)"}, "amount": {"min": 20, "max": 35, "currency": "USD"}}],
    },
});
