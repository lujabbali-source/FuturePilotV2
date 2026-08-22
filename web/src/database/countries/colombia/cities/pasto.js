import universities from "../universities/pasto";
import { defineCity } from "../citySchema";

export default defineCity({ id: "pasto", name: "Pasto", coordinates: { lat: 1.2136, lng: -77.2811 }, region: "Centro-Sur y Suroccidente (Popayán, Pasto, Neiva, Ibagué, Florencia)", statistics: { population: "~550.000 habitantes (Ibagué)", safety: "Moderada", weather: "12°C a 30°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" }, universities,
    costOfLiving: {
        currency: "COP",
        monthlyEstimate: {"min": 350, "max": 550, "currency": "USD"},
        studentBudget: {"min": 350, "max": 550, "currency": "USD"},
    },
    jobs: { mainIndustries: ["Agriculture", "Dairy Production", "Handicrafts"] },
});
