import universities from "../universities/cali";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cali",
    name: "Cali",
    coordinates: { lat: 3.4516, lng: -76.532 },
    region: "Cali y Región Pacífica (Palmira, Buenaventura)",
    statistics: { population: "~2.300.000 habitantes", safety: "Moderada - Baja", weather: "19°C a 31°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~85 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    universities,
});
