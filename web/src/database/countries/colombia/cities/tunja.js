import universities from "../universities/tunja";
import { defineCity } from "../citySchema";

export default defineCity({ id: "tunja", name: "Tunja", coordinates: { lat: 5.5353, lng: -73.3678 }, region: "Boyacá y Llanos Orientales (Tunja, Villavicencio, Yopal)", statistics: { population: "~550.000 habitantes (Villavicencio / Tunja)", safety: "Alta", weather: "10°C a 32°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" }, universities });
