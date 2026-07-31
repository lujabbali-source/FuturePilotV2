import { booleanPointInPolygon, point } from "@turf/turf";
import { world } from "../geo/world";

export function getCountryFromLatLng(lat, lng) {
  const clickedPoint = point([lng, lat]);

  for (const country of world.features) {
    if (booleanPointInPolygon(clickedPoint, country)) {
      return country;
    }
  }

  return null;
}