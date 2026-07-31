import universities from "../universities/sincelejo";
import { defineCity } from "../citySchema";

export default defineCity({
    id: "sincelejo",
    name: "Sincelejo",
    coordinates: { lat: 9.3047, lng: -75.3978 },
    universities,
});
