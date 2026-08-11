import universities from "../universities/florencia";
import { defineCity } from "../citySchema";

export default defineCity({ id: "florencia", name: "Florencia", coordinates: { lat: 1.6144, lng: -75.6062 }, region: "Centro-Sur y Suroccidente (Popayán, Pasto, Neiva, Ibagué, Florencia)", statistics: { population: "~550.000 habitantes (Ibagué)", safety: "Moderada", weather: "12°C a 30°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" }, universities });
