export function debugCountry(country) {

    console.group("🌍 Country Debug");

    console.log(
        "Nombre:",
        country.properties.name
    );

    console.log(
        "Tipo:",
        country.geometry.type
    );

    console.log(
        "Geometría:",
        country.geometry
    );

    console.groupEnd();

}