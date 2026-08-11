import universities from "../universities/pereira";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "pereira",
    name: "Pereira",
    coordinates: { lat: 4.8143, lng: -75.6946 },
    region: "Eje Cafetero (Manizales, Pereira, Armenia)",
    statistics: { population: "~1.400.000 habitantes (Región)", safety: "Alta", weather: "14°C a 26°C", language: "Español", currency: "Peso colombiano (COP)", internetSpeed: "~95 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    universities
});
