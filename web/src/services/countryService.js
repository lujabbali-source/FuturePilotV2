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

// Las universidades de los paises importados viven en archivos aparte y se
// piden solo cuando alguien abre ese pais. Son 6.768 registros: incluirlas en
// el bundle costaba 161 kB comprimidos en cada carga del globo, para un dato
// que la mayoria de estudiantes no va a mirar nunca.
//
// Mismo patron que cityService usa con las ciudades de Colombia.
const universityLoaders = import.meta.glob(
    "../database/countries/world/universities/*.js",
    { import: "default" }
);

/** Las universidades nacionales de un pais. Promesa: puede que no esten cargadas.
 *
 *  Para los paises curados a mano vienen ya en el objeto; para los importados
 *  se traen del archivo suelto. */
export async function getNationalUniversities(countryId) {
    const country = countries[countryId];
    if (!country) return [];
    if (country.nationalUniversities?.length) return country.nationalUniversities;

    const loader = universityLoaders[
        `../database/countries/world/universities/${countryId}.js`
    ];
    if (!loader) return [];
    try {
        return (await loader()) || [];
    } catch {
        // Un pais sin archivo no es un error: sencillamente no tiene lista.
        return [];
    }
}
