import universities from "../universities/manizales";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "manizales",
    name: "Manizales",
    coordinates: { lat: 5.0703, lng: -75.5138 },
    universities,
});
