export function isPolygon(country) {

    return country.geometry.type === "Polygon";

}

export function isMultiPolygon(country) {

    return country.geometry.type === "MultiPolygon";

}