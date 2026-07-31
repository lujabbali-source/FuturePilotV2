import universities from "../universities/santa-marta";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "santa-marta",
    name: "Santa Marta",
    coordinates: { lat: 11.2408, lng: -74.199 },
    universities,
});
