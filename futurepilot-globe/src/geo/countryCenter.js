export default function countryCenter(country) {

    const geometry = country.geometry;

    if (
        geometry.type === "Polygon"
    ) {

        return geometry.coordinates[0][0];

    }

    if (
        geometry.type === "MultiPolygon"
    ) {

        return geometry.coordinates[0][0][0];

    }

    return [0,0];

}