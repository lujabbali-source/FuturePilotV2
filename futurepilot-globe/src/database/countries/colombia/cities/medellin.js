import universities from "../universities/medellin";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "medellin",
    name: "Medellín",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    region: "Medellín y Área Metropolitana (Envigado, Sabaneta, Caldas)",
    statistics: { population: "~4.000.000 habitantes", safety: "Moderada", weather: "16°C a 28°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~105 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    universities,
});
