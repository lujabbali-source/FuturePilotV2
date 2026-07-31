import { world } from "../geo/world";

export function getCountryByIntersection(intersection) {
    if (!intersection) return null;

    const countryIndex = intersection.object.userData.countryIndex;

    if (countryIndex === undefined) return null;

    return world.features[countryIndex];
}