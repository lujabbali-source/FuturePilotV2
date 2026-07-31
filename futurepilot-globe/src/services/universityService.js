const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const cache = new Map();

function toUniversity(record) {
    return {
        id: record.id,
        name: record.officialName,
        officialName: record.officialName,
        country: record.country,
        city: record.city,
        website: record.officialWebsite,
        officialWebsite: record.officialWebsite,
        type: record.institutionType,
        source: record.source,
        sourceUrl: record.sourceUrl,
        sourceUpdatedAt: record.sourceUpdatedAt,
        logo: null,
        rankings: { national: null, world: null },
        featuredPrograms: [],
        scholarships: [],
    };
}

export async function getUniversities(city, { limit = 100 } = {}) {
    if (Array.isArray(city?.universities) && city.universities.length > 0) {
        return city.universities;
    }

    const country = city?.country || city?.countryId;
    const cityKey = city?.id || city?.name;
    const cacheKey = `${country || ""}:${cityKey || ""}:${limit}`;

    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const params = new URLSearchParams({ limit: String(limit) });
    if (country) params.set("country", country);
    if (cityKey) params.set("city", cityKey);

    const response = await fetch(`${API_BASE_URL}/api/universities?${params}`);
    if (!response.ok) {
        throw new Error(`WHED catalog request failed with ${response.status}`);
    }

    const payload = await response.json();
    const universities = payload.items.map(toUniversity);
    cache.set(cacheKey, universities);
    return universities;
}
