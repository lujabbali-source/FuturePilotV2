export const countryQueries = {
  all: `
    SELECT * FROM countries
    ORDER BY name COLLATE NOCASE
  `,
  byId: 'SELECT * FROM countries WHERE id = ?',
  byIdentifier: `
    SELECT * FROM countries
    WHERE iso2 = ? OR iso3 = ? OR name = ?
    LIMIT 1
  `,
  byCity: `
    SELECT DISTINCT countries.*
    FROM countries
    JOIN cities ON cities.country_id = countries.id
    WHERE cities.name LIKE ? COLLATE NOCASE
    ORDER BY countries.name COLLATE NOCASE
  `,
  search: `
    SELECT * FROM countries
    WHERE name LIKE ? COLLATE NOCASE
       OR iso2 LIKE ? COLLATE NOCASE
       OR iso3 LIKE ? COLLATE NOCASE
    ORDER BY name COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO countries (iso2, iso3, name, continent, currency, language, flag)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(iso2) DO UPDATE SET
      iso3 = excluded.iso3,
      name = excluded.name,
      continent = COALESCE(excluded.continent, countries.continent),
      currency = COALESCE(excluded.currency, countries.currency),
      language = COALESCE(excluded.language, countries.language),
      flag = COALESCE(excluded.flag, countries.flag)
    RETURNING *
  `,
};
