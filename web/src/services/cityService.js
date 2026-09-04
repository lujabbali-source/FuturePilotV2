import cityCatalog from "../database/countries/colombia/cities/index";
import { countries } from "../database/countries";

// La carpeta entera, no una lista escrita a mano. Antes iban los 21 nombres
// enumerados aqui: añadir una ciudad al catalogo sin acordarse de esta linea
// la dejaba cargando para siempre, sin ningun error que lo delatara. Justo lo
// que paso con Valledupar, Quibdó y Leticia.
const cityLoaders = import.meta.glob(
    "../database/countries/colombia/cities/*.js",
    { import: "default" }
);

// Las universidades de las ciudades importadas, un archivo por pais. Van
// aparte por lo mismo que las nacionales: son 11.269 registros, y meterlos en
// el resumen que lee el globo al arrancar costaba ~400 kB comprimidos para un
// dato que solo se mira al abrir una ciudad concreta.
const worldCityLoaders = import.meta.glob(
    "../database/countries/world/cities/*.js",
    { import: "default" }
);

const emptyCity = {
    image: null,
    costOfLiving: {},
    universities: [],
    scholarships: [],
    jobs: {},
    statistics: {},
    living: {}
};

function getLoader(cityId) {
    return cityLoaders[
        `../database/countries/colombia/cities/${cityId}.js`
    ];
}

export function getCities(countryId = "colombia") {
    if (countryId === "colombia") return cityCatalog;
    return countries[countryId]?.cities || [];
}

export function getCitySummary(cityId) {
    for (const country of Object.values(countries)) {
        const city = country.cities?.find((item) => item.id === cityId);
        if (city) return city;
    }
    return null;
}

/** Las universidades de una ciudad importada, si las tiene en su archivo.
 *
 *  Un pais sin archivo no es un error: sencillamente no tiene ninguna ciudad
 *  con universidades situadas. Mismo criterio que getNationalUniversities. */
async function loadWorldUniversities(city) {
    const loader = worldCityLoaders[
        `../database/countries/world/cities/${city.countryId}.js`
    ];
    if (!loader) return [];
    try {
        return (await loader())?.[city.id] || [];
    } catch {
        return [];
    }
}

export async function loadCity(cityId) {
    const catalogCity = getCitySummary(cityId);
    if (catalogCity && catalogCity.countryId !== "colombia") {
        // Los paises curados a mano ya las traen dentro de la ciudad; los
        // importados las tienen en el archivo diferido.
        if (catalogCity.universities?.length) return catalogCity;
        return {
            ...catalogCity,
            universities: await loadWorldUniversities(catalogCity),
        };
    }

    const loader = getLoader(cityId);
    if (!loader) return null;

    const city = await loader();

    return {
        ...emptyCity,
        ...city,
        costOfLiving: { ...emptyCity.costOfLiving, ...city.costOfLiving },
        jobs: { ...emptyCity.jobs, ...city.jobs },
        statistics: { ...emptyCity.statistics, ...city.statistics },
        living: { ...emptyCity.living, ...city.living }
    };
}
