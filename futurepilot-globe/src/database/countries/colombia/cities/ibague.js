import universities from "../universities/ibague";
import { defineCity } from "../citySchema";

export default defineCity({ id: "ibague", name: "Ibagué", coordinates: { lat: 4.4389, lng: -75.2322 }, region: "Centro-Sur y Suroccidente (Popayán, Pasto, Neiva, Ibagué, Florencia)", statistics: { population: "~550.000 habitantes (Ibagué)", safety: "Moderada", weather: "12°C a 30°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" }, universities });
