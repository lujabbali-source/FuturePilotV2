import universities from "../universities/barranquilla";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "barranquilla",
    name: "Barranquilla",
    coordinates: { lat: 10.9685, lng: -74.7813 },
    universities,
});
