import { feature } from "topojson-client";
import countries from "../../public/geo/countries-110m.json";

export const world = feature(
    countries,
    countries.objects.countries
);