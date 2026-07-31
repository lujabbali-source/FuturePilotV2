import universities from "../universities/medellin";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "medellin",
    name: "Medellín",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    universities,
});
