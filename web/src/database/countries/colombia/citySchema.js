export function defineCity({ id, name, coordinates, isCapital = false, ...overrides }) {
    return {
        id,
        name,
        country: "Colombia",
        countryId: "colombia",
        coordinates,
        image: null,
        isCapital,
        dataStatus: "source-word",
        costOfLiving: {
            currency: "COP",
            monthlyEstimate: null,
            rent: null,
            food: null,
            transportation: null,
            utilities: null,
            studentBudget: null
        },
        universities: [],
        scholarships: [],
        jobs: {
            averageSalary: null,
            mainIndustries: [],
            studentJobs: [],
            remoteOpportunities: [],
            internships: [],
            employmentRate: null
        },
        statistics: {
            population: null,
            safety: null,
            weather: null,
            language: "Spanish",
            currency: "COP",
            internetSpeed: null,
            qualityOfLife: null,
            studentSatisfaction: null
        },
        living: {
            bestNeighborhoods: [],
            transportation: null,
            healthcare: [],
            nightlife: [],
            culture: [],
            food: [],
            tourism: []
        },
        ...overrides
    };
}
