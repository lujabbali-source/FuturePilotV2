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

// Abreviaturas del propio mapa (Natural Earth, public/geo/countries-110m.json).
// Escribe "Dem. Rep. Congo" y "Bosnia and Herz.", que no coinciden ni con el
// nombre en español ni con el inglés completo. Son manías del mapa, no
// propiedades de los países, así que viven aquí junto a la traducción de
// nombre a ficha y no dentro de los datos generados.
//
// Faltan a propósito Antártida, Sahara Occidental, Malvinas, Chipre del Norte,
// Somalilandia y las Tierras Australes Francesas: el importador las deja fuera
// porque no son destinos donde alguien pueda estudiar, y el mapa las pinta sin
// ficha, que es lo correcto.
const mapQuirks = {
    "dem-rep-congo": "congo-rep-dem",
    "dominican-rep": "republica-dominicana",
    "cote-d-ivoire": "costa-de-marfil",
    "central-african-rep": "republica-centroafricana",
    "eq-guinea": "guinea-ecuatorial",
    turkey: "turquia",
    "solomon-is": "islas-salomon",
    "bosnia-and-herz": "bosnia-y-herzegovina",
    macedonia: "macedonia-del-norte",
    "s-sudan": "sudan-del-sur",
};

/** Índice de todos los nombres por los que se puede llamar a un país.
 *
 *  Las fichas están indexadas por su slug en ESPAÑOL, y el mapa las nombra en
 *  inglés: "Germany" no encontraba "alemania". Con los datos ya en el repo, el
 *  globo resolvía 88 de los 177 países del mapa — la mitad quedaba muda al
 *  hacer clic, sin un solo error en consola que lo delatara.
 *
 *  Cada país generado trae sus `aliases` (hoy, su nombre en inglés). El índice
 *  se construye una sola vez, la primera vez que alguien pregunta. */
let indiceNombres = null;

function nombreIndex() {
    if (indiceNombres) return indiceNombres;
    indiceNombres = { ...mapQuirks };
    for (const [id, country] of Object.entries(countries)) {
        indiceNombres[id] = id;
        for (const alias of country?.aliases || []) {
            // El id gana: un alias nunca puede tapar a un país que ya existe
            // con ese nombre propio.
            if (!countries[alias]) indiceNombres[normalize(alias)] = id;
        }
    }
    // Los de siempre mandan sobre todo lo demás.
    Object.assign(indiceNombres, aliases);
    return indiceNombres;
}

export function getCountryIdFromName(name) {
    const normalizedName = normalize(name);
    const encontrado = nombreIndex()[normalizedName];
    if (encontrado && countries[encontrado]) return encontrado;
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
