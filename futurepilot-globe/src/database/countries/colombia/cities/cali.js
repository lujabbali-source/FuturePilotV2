import universities from "../universities/cali";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "cali",
    name: "Cali",
    coordinates: { lat: 3.4516, lng: -76.532 },
    universities,
});
