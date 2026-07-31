import universities from "../universities/cucuta";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cucuta",
    name: "Cúcuta",
    coordinates: { lat: 7.8891, lng: -72.4967 },
    universities,
});
