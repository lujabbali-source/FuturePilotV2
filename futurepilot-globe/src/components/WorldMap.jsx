import { feature } from "topojson-client";
import countries from "../../public/geo/countries-110m.json";

export default function WorldMap() {

    const world = feature(
        countries,
        countries.objects.countries
    );

    console.log(world);

    return null;
}