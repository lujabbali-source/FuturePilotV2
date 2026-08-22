// `dataStatus` y `source` existen para que la interfaz sepa de donde salio
// cada cosa. Los 22 paises de America estan curados a mano y llevan los 28
// campos; los importados de fuentes abiertas traen lo verificable y el resto
// vacio. Sin esta marca, un pais a medias se ve igual que uno completo y no
// hay forma de saber que falta por hacer - ni de impedir que alguien rellene
// los huecos adivinando.
export function defineCountry({
    id, name, nameEn = null, capital = null, currency = null, language = null,
    continent = "America", population = null, cities = [], nationalUniversities = [],
    universityCount = null, aliases = [], dataStatus = "curated", sources = [],
}) {
    return {
        id, name, nameEn, capital, currency, language, continent, population,
        cities, nationalUniversities,
        // Cuantas universidades tiene, sin cargarlas. La lista de los paises
        // importados vive aparte y se pide solo al abrir el pais: son 6.768
        // registros y meterlos en el bundle costaba 161 kB comprimidos en
        // CADA carga del globo, para un dato que casi nadie mira.
        universityCount: universityCount ?? nationalUniversities.length,
        aliases, dataStatus, sources,
    };
}

export function defineCity({ id, name, countryId, countryName, coordinates = null, isCapital = false, universities = [], ...overrides }) {
    const cityUniversities = universities.map((university) => ({
        ...university,
        cityId: university.cityId || id,
        city: university.city || name,
        country: university.country || countryName,
    }));

    return {
        id,
        name,
        country: countryName,
        countryId,
        coordinates,
        image: null,
        isCapital,
        dataStatus: coordinates ? "source-word" : "source-word-needs-coordinates",
        costOfLiving: {
            currency: null,
            monthlyEstimate: null,
            rent: null,
            food: null,
            transportation: null,
            utilities: null,
            studentBudget: null,
        },
        universities: cityUniversities,
        scholarships: [],
        jobs: {
            averageSalary: null,
            mainIndustries: [],
            studentJobs: [],
            remoteOpportunities: [],
            internships: [],
            employmentRate: null,
        },
        statistics: {
            population: null,
            safety: null,
            weather: null,
            language: null,
            currency: null,
            internetSpeed: null,
            qualityOfLife: null,
            studentSatisfaction: null,
        },
        living: {
            bestNeighborhoods: [],
            transportation: null,
            healthcare: [],
            nightlife: [],
            culture: [],
            food: [],
            tourism: [],
        },
        ...overrides,
    };
}

export function defineUniversity({ id, name, cityId, website = null, type = null, coverage = null, rankings = null, source = "curated" }) {
    return {
        id,
        name,
        cityId,
        website,
        officialWebsite: website,
        logo: null,
        type,
        rankings: rankings || { national: null, world: null },
        // "curated" o "open-dataset". Una importada NUNCA puede traer `type`:
        // la fuente abierta no dice si es publica o privada, y adivinarlo
        // pondria una etiqueta falsa que se ve igual que una cierta.
        source,
        featuredPrograms: [],
        scholarships: [],
        coverage,
    };
}
