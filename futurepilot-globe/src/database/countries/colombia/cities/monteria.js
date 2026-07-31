import universities from "../universities/monteria";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "monteria",
    name: "Montería",
    coordinates: { lat: 8.7575, lng: -75.8918 },
    universities,
});
