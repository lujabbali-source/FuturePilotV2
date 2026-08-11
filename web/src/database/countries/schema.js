export function defineCountry({ id, name, capital = null, currency = null, language = null, continent = "America", cities = [], nationalUniversities = [] }) {
    return { id, name, capital, currency, language, continent, cities, nationalUniversities };
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

export function defineUniversity({ id, name, cityId, website = null, type = null, coverage = null, rankings = null }) {
    return {
        id,
        name,
        cityId,
        website,
        officialWebsite: website,
        logo: null,
        type,
        rankings: rankings || { national: null, world: null },
        featuredPrograms: [],
        scholarships: [],
        coverage,
    };
}
