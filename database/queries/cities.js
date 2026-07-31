export const cityQueries = {
  all: `
    SELECT cities.*, countries.name AS country_name, countries.iso2 AS country_iso2
    FROM cities
    JOIN countries ON countries.id = cities.country_id
    ORDER BY countries.name COLLATE NOCASE, cities.name COLLATE NOCASE
  `,
  byId: `
    SELECT cities.*, countries.name AS country_name, countries.iso2 AS country_iso2
    FROM cities
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.id = ?
  `,
  byCountry: `
    SELECT cities.*, countries.name AS country_name, countries.iso2 AS country_iso2
    FROM cities
    JOIN countries ON countries.id = cities.country_id
    WHERE countries.id = ? OR countries.iso2 = ? OR countries.iso3 = ? OR countries.name = ?
    ORDER BY cities.name COLLATE NOCASE
  `,
  byName: `
    SELECT cities.*, countries.name AS country_name, countries.iso2 AS country_iso2
    FROM cities
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.name LIKE ? COLLATE NOCASE
    ORDER BY cities.name COLLATE NOCASE
  `,
  search: `
    SELECT cities.*, countries.name AS country_name, countries.iso2 AS country_iso2
    FROM cities
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.name LIKE ? COLLATE NOCASE
       OR countries.name LIKE ? COLLATE NOCASE
    ORDER BY cities.name COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO cities (country_id, name, latitude, longitude, population, is_capital)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(country_id, name) DO UPDATE SET
      latitude = COALESCE(excluded.latitude, cities.latitude),
      longitude = COALESCE(excluded.longitude, cities.longitude),
      population = COALESCE(excluded.population, cities.population),
      is_capital = excluded.is_capital
    RETURNING *
  `,
};
