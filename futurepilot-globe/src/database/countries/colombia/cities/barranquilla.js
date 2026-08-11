import universities from "../universities/barranquilla";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "barranquilla",
    name: "Barranquilla",
    coordinates: { lat: 10.9685, lng: -74.7813 },
    region: "Barranquilla y Región Caribe (Cartagena, Santa Marta, Montería, Sincelejo)",
    statistics: { population: "~1.300.000 habitantes (Barranquilla)", safety: "Moderada", weather: "24°C a 33°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~80 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
});
