import { countries } from "../database/countries";

function normalize(value) {
    return String(value || "")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

const aliases = {
    brazil: "brasil",
    brasil: "brasil",
    "united-states": "estados-unidos",
    "united-states-of-america": "estados-unidos",
    usa: "estados-unidos",
    "dominican-republic": "republica-dominicana",
    "costa-rica": "costa-rica",
    canada: "canada",
    colombia: "colombia",
};

export function getCountryIdFromName(name) {
    const normalizedName = normalize(name);
    if (aliases[normalizedName]) return aliases[normalizedName];
    return countries[normalizedName] ? normalizedName : null;
}

export function getCountry(countryId) {
    return countries[countryId] || null;
}

export function getCountries() {
    return Object.values(countries);
}
