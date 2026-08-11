import universities from "../universities/popayan";
import { defineCity } from "../citySchema";

export default defineCity({ id: "popayan", name: "Popayán", coordinates: { lat: 2.4448, lng: -76.6147 }, region: "Centro-Sur y Suroccidente (Popayán, Pasto, Neiva, Ibagué, Florencia)", statistics: { population: "~550.000 habitantes (Ibagué)", safety: "Moderada", weather: "12°C a 30°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" }, universities });
