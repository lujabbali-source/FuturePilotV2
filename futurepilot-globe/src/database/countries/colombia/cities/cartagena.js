import universities from "../universities/cartagena";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cartagena",
    name: "Cartagena",
    coordinates: { lat: 10.391, lng: -75.4794 },
    universities,
});
