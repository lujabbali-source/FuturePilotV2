import universities from "../universities/bucaramanga";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bucaramanga",
    name: "Bucaramanga",
    coordinates: { lat: 7.1193, lng: -73.1227 },
    region: "Bucaramanga y Santanderes (Cúcuta, Pamplona)",
    statistics: { population: "~600.000 habitantes (Bucaramanga)", safety: "Alta", weather: "18°C a 27°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~90 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    universities,
});
