import universities from "../universities/bucaramanga";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "bucaramanga",
    name: "Bucaramanga",
    coordinates: { lat: 7.1193, lng: -73.1227 },
    universities,
});
