export const universityQueries = {
  all: `
    SELECT universities.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM universities
    JOIN cities ON cities.id = universities.city_id
    JOIN countries ON countries.id = universities.country_id
    ORDER BY universities.official_name COLLATE NOCASE
  `,
  byId: `
    SELECT universities.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM universities
    JOIN cities ON cities.id = universities.city_id
    JOIN countries ON countries.id = universities.country_id
    WHERE universities.id = ?
  `,
  byCountry: `
    SELECT universities.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM universities
    JOIN cities ON cities.id = universities.city_id
    JOIN countries ON countries.id = universities.country_id
    WHERE countries.id = ? OR countries.iso2 = ? OR countries.iso3 = ? OR countries.name = ?
    ORDER BY universities.official_name COLLATE NOCASE
  `,
  byCity: `
    SELECT universities.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM universities
    JOIN cities ON cities.id = universities.city_id
    JOIN countries ON countries.id = universities.country_id
    WHERE cities.id = ? OR cities.name = ?
    ORDER BY universities.official_name COLLATE NOCASE
  `,
  search: `
    SELECT universities.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM universities
    JOIN cities ON cities.id = universities.city_id
    JOIN countries ON countries.id = universities.country_id
    WHERE universities.official_name LIKE ? COLLATE NOCASE
       OR universities.short_name LIKE ? COLLATE NOCASE
    ORDER BY universities.official_name COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO universities
      (city_id, country_id, official_name, short_name, official_website, type, founded_year)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(country_id, official_name) DO UPDATE SET
      city_id = excluded.city_id,
      short_name = COALESCE(excluded.short_name, universities.short_name),
      official_website = COALESCE(excluded.official_website, universities.official_website),
      type = COALESCE(excluded.type, universities.type),
      founded_year = COALESCE(excluded.founded_year, universities.founded_year)
    RETURNING *
  `,
};
