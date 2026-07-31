import cityCatalog from "../database/countries/colombia/cities/index";
import { countries } from "../database/countries";

const cityLoaders = import.meta.glob(
    "../database/countries/colombia/cities/{bogota,medellin,cali,barranquilla,cartagena,santa-marta,monteria,sincelejo,bucaramanga,cucuta,manizales,pereira,armenia,popayan,pasto,ibague,neiva,florencia,tunja,villavicencio,yopal}.js",
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

export async function loadCity(cityId) {
    const catalogCity = getCitySummary(cityId);
    if (catalogCity && catalogCity.countryId !== "colombia") return catalogCity;

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
