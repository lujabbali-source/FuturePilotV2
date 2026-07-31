export function countryName(country){

    return country.properties.name;

}

export function isSelected(
    country,
    selectedCountry
){

    return (
        selectedCountry?.properties.name ===
        country.properties.name
    );

}