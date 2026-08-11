import universities from "../universities/yopal";
import { defineCity } from "../citySchema";

export default defineCity({ id: "yopal", name: "Yopal", coordinates: { lat: 5.3378, lng: -72.3959 }, region: "Boyacá y Llanos Orientales (Tunja, Villavicencio, Yopal)", statistics: { population: "~550.000 habitantes (Villavicencio / Tunja)", safety: "Alta", weather: "10°C a 32°C (Según altitud)", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~70 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" }, universities });
