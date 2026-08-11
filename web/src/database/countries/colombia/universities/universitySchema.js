export function defineUniversity({ id, name, cityId, website, type, coverage = null }) {
    return {
        id,
        name,
        cityId,
        website,
        officialWebsite: website,
        logo: null,
        type,
        rankings: { national: null, world: null },
        featuredPrograms: [],
        scholarships: [],
        coverage
    };
}
