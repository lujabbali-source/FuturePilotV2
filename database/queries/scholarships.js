export const scholarshipQueries = {
  all: `
    SELECT scholarships.*, universities.official_name AS university_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    ORDER BY scholarships.name COLLATE NOCASE
  `,
  byId: `
    SELECT scholarships.*, universities.official_name AS university_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    WHERE scholarships.id = ?
  `,
  byUniversity: `
    SELECT scholarships.*, universities.official_name AS university_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    WHERE scholarships.university_id = ?
    ORDER BY scholarships.name COLLATE NOCASE
  `,
  byCountry: `
    SELECT scholarships.*, universities.official_name AS university_name,
           countries.name AS country_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    JOIN countries ON countries.id = universities.country_id
    WHERE countries.id = ? OR countries.iso2 = ? OR countries.iso3 = ? OR countries.name = ?
    ORDER BY scholarships.name COLLATE NOCASE
  `,
  byCity: `
    SELECT scholarships.*, universities.official_name AS university_name,
           cities.name AS city_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    JOIN cities ON cities.id = universities.city_id
    WHERE cities.id = ? OR cities.name = ?
    ORDER BY scholarships.name COLLATE NOCASE
  `,
  search: `
    SELECT scholarships.*, universities.official_name AS university_name
    FROM scholarships
    JOIN universities ON universities.id = scholarships.university_id
    WHERE scholarships.name LIKE ? COLLATE NOCASE
       OR scholarships.description LIKE ? COLLATE NOCASE
       OR scholarships.eligibility LIKE ? COLLATE NOCASE
    ORDER BY scholarships.name COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO scholarships
      (university_id, name, description, official_url, eligibility)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(university_id, name) DO UPDATE SET
      description = COALESCE(excluded.description, scholarships.description),
      official_url = COALESCE(excluded.official_url, scholarships.official_url),
      eligibility = COALESCE(excluded.eligibility, scholarships.eligibility)
    RETURNING *
  `,
};
