import universities from "../universities/pereira";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "pereira",
    name: "Pereira",
    coordinates: { lat: 4.8143, lng: -75.6946 },
    universities
});
