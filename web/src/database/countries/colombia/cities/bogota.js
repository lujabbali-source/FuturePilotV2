import universities from "../universities/bogota";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bogota",
    name: "Bogotá",
    coordinates: { lat: 4.711, lng: -74.0721 },
    region: "Bogotá D.C. y Alrededores (Chía, Cajicá)",
    universities,
    isCapital: true,
    costOfLiving: { currency: "COP", monthlyEstimate: 2400000, rent: 1400000, food: 650000, transportation: 180000, utilities: {"min": 160000, "max": 280000, "currency": "COP"}, studentBudget: 2400000 },
    statistics: { population: "~8.000.000 habitantes", safety: "Moderada", weather: "8°C a 19°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~110 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    jobs: { averageSalary: null, mainIndustries: ["Technology", "Finance", "Services"], studentJobs: [], remoteOpportunities: [], internships: [], employmentRate: null },
    living: { bestNeighborhoods: [{"es": "Chicó y Parque de la 93 (estratos 5–6), Chapinero Alto y Zona G (estrato 4), Usaquén (estratos 5–6), Teusaquillo y La Soledad (estratos 3–4).", "en": "Chicó & Parque de la 93 (Estratos 5–6), Chapinero Alto & Zona G (Estrato 4), Usaquén (Estratos 5–6), Teusaquillo & La Soledad (Estratos 3–4)."}], transportation: {"es": "TransMilenio, SITP, aplicaciones de transporte (Uber, Cabify, DiDi).", "en": "TransMilenio, SITP, Rideshares (Uber, Cabify, DiDi)."}, healthcare: [{"es": "Excelente. Instituciones de primer nivel como la Fundación Santa Fe de Bogotá y el Hospital Universitario San Ignacio.", "en": "Excellent. World-class institutions like Fundación Santa Fe de Bogotá and Hospital Universitario San Ignacio."}], nightlife: [{"es": "Zona Rosa (Zona T), Andrés Carne de Res (Chía), Theatron en Chapinero.", "en": "Zona Rosa (Zona T), Andrés Carne de Res (Chia), Theatron in Chapinero."}], culture: [{"es": "Museo del Oro, Museo Botero, arte urbano, Parque Simón Bolívar, Ciclovía.", "en": "Museo del Oro, Museo Botero, street art, Parque Simón Bolívar, Ciclovía."}], food: [{"es": "Ajiaco, alta cocina internacional en la Zona G, cadenas de siempre como Crepes & Waffles.", "en": "Ajiaco, international fine dining in Zona G, staple chains like Crepes & Waffles."}], tourism: [{"es": "Monserrate, La Candelaria, Catedral de Sal de Zipaquirá.", "en": "Monserrate, La Candelaria, Zipaquirá Salt Cathedral."}] },
});
