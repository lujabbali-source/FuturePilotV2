import universities from "../universities/neiva";
import { defineCity } from "../citySchema";

export default defineCity({ id: "neiva", name: "Neiva", coordinates: { lat: 2.9273, lng: -75.2819 }, region: "Centro-Sur y Suroccidente (Popayán, Pasto, Neiva, Ibagué, Florencia)", statistics: { population: "~550.000 habitantes (Ibagué)", safety: "Moderada", weather: "12°C a 30°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" }, universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 400, "max": 650, "currency": "USD"},
        studentBudget: {"min": 400, "max": 650, "currency": "USD"},
    },
    jobs: { mainIndustries: [{"es": "Energía", "en": "Energy"}] },
    living: {
        tourism: [{"es": "Desierto de la Tatacoa, Parque Arqueológico de San Agustín (en la región).", "en": "Tatacoa Desert (Desierto de la Tatacoa), San Agustín Archaeological Park (regional)."}],
    },
});
