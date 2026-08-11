import universities from "../universities/villavicencio";
import { defineCity } from "../citySchema";

export default defineCity({ id: "villavicencio", name: "Villavicencio", coordinates: { lat: 4.142, lng: -73.6266 }, region: "Boyacá y Llanos Orientales (Tunja, Villavicencio, Yopal)", statistics: { population: "~550.000 habitantes (Villavicencio / Tunja)", safety: "Alta", weather: "10°C a 32°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" }, universities });
