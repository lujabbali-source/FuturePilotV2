import universities from "../universities/cartagena";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cartagena",
    name: "Cartagena",
    coordinates: { lat: 10.391, lng: -75.4794 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 2600000, "max": 4200000, "currency": "COP"},
        studentBudget: {"min": 400, "max": 580, "currency": "USD"},
        rent: {"min": 160, "max": 260, "currency": "USD"},
        food: {"min": 140, "max": 210, "currency": "USD"},
        transportation: {"min": 25, "max": 35, "currency": "USD"},
        utilities: {"min": 55, "max": 95, "currency": "USD"},
    },
    jobs: { averageSalary: {"amount": 3500000, "currency": "COP", "source": "America cities.docx", "asOf": "2026"}, mainIndustries: [{"es": "Turismo y hotelería", "en": "Tourism & Hospitality"}, {"es": "Petroquímica", "en": "Petrochemicals"}] },
    living: {
        bestNeighborhoods: [{"es": "Bocagrande, Castillogrande, Manga, Getsemaní, Zona Norte.", "en": "Bocagrande, Castillogrande, Manga, Getsemaní, Zona Norte."}],
        tourism: [{"es": "Ciudad Amurallada, Castillo San Felipe de Barajas, Islas del Rosario, Barú.", "en": "Walled City (Ciudad Amurallada), Castillo San Felipe de Barajas, Rosario Islands, Baru."}],
        food: [{"es": "Posta negra cartagenera, arroz con coco, pescado frito, patacones.", "en": "Posta Negra Cartagenera, Coconut rice, Fried fish, Patacones."}],
    },
    breakdown: {
        household: [{"label": {"es": "Una persona (moderado)", "en": "Single person (Moderate)"}, "amount": {"min": 2600000, "max": 4200000, "currency": "COP"}}, {"label": {"es": "Estudiante (frugal)", "en": "Student (Frugal)"}, "amount": {"min": 1600000, "max": 2300000, "currency": "COP"}}, {"label": {"es": "Familia de cuatro", "en": "Family of four"}, "amount": {"min": 1600, "max": 2600, "currency": "USD"}}],
        housing: [{"label": {"es": "Habitación compartida", "en": "Shared room"}, "amount": {"min": 160, "max": 260, "currency": "USD"}}, {"label": {"es": "Apartaestudio (zona estándar - Manga/Mancini)", "en": "1 bedroom apartment (Standard area - Manga/Mancini)"}, "amount": {"min": 350, "max": 500, "currency": "USD"}}],
        food: [{"label": {"es": "Mercado (1 persona)", "en": "Local groceries (1 person)"}, "amount": {"min": 140, "max": 210, "currency": "USD"}}, {"label": {"es": "Corrientazo", "en": "Cheap local lunch (Corrientazo)"}, "amount": {"min": 3, "max": 5, "currency": "USD"}}, {"label": {"es": "Cena de gama media (2 personas)", "en": "Mid-range restaurant dinner (2 people)"}, "amount": {"min": 35, "max": 65, "currency": "USD"}}],
        utilities: [{"label": {"es": "Estratos 3–4", "en": "Strata 3–4"}, "amount": {"min": 55, "max": 95, "currency": "USD"}}, {"label": {"es": "Estratos 5–6 / zonas turísticas", "en": "Strata 5–6 / Tourist Zones"}, "amount": {"min": 120, "max": 200, "currency": "USD"}}, {"label": {"es": "Internet en casa y plan móvil", "en": "Home internet & mobile plan"}, "amount": {"min": 22, "max": 32, "currency": "USD"}}],
        transport: [{"label": {"es": "Transcaribe y buses", "en": "Transcaribe / Buses"}, "amount": {"min": 25, "max": 35, "currency": "USD"}}, {"label": {"es": "Taxis y apps de transporte", "en": "Taxis / Rideshares"}, "amount": {"min": 35, "max": 65, "currency": "USD"}}],
        student: [{"label": {"es": "Costo esencial total del estudiante", "en": "Total essential student cost"}, "amount": {"min": 400, "max": 580, "currency": "USD"}}],
    },
});
