export const livingCostQueries = {
  all: `
    SELECT living_costs.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM living_costs
    JOIN cities ON cities.id = living_costs.city_id
    JOIN countries ON countries.id = cities.country_id
    ORDER BY living_costs.cost_year DESC, cities.name COLLATE NOCASE
  `,
  byId: `
    SELECT living_costs.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM living_costs
    JOIN cities ON cities.id = living_costs.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE living_costs.id = ?
  `,
  byCity: `
    SELECT living_costs.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM living_costs
    JOIN cities ON cities.id = living_costs.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.id = ? OR cities.name = ?
    ORDER BY living_costs.cost_year DESC
  `,
  byCountry: `
    SELECT living_costs.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM living_costs
    JOIN cities ON cities.id = living_costs.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE countries.id = ? OR countries.iso2 = ? OR countries.iso3 = ? OR countries.name = ?
    ORDER BY living_costs.cost_year DESC, cities.name COLLATE NOCASE
  `,
  search: `
    SELECT living_costs.*, cities.name AS city_name,
           countries.name AS country_name, countries.iso2 AS country_iso2
    FROM living_costs
    JOIN cities ON cities.id = living_costs.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.name LIKE ? COLLATE NOCASE
       OR countries.name LIKE ? COLLATE NOCASE
    ORDER BY living_costs.cost_year DESC
  `,
  upsert: `
    INSERT INTO living_costs
      (city_id, rent, food, transport, utilities, internet, total_estimated, currency, cost_year)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(city_id, cost_year) DO UPDATE SET
      rent = COALESCE(excluded.rent, living_costs.rent),
      food = COALESCE(excluded.food, living_costs.food),
      transport = COALESCE(excluded.transport, living_costs.transport),
      utilities = COALESCE(excluded.utilities, living_costs.utilities),
      internet = COALESCE(excluded.internet, living_costs.internet),
      total_estimated = COALESCE(excluded.total_estimated, living_costs.total_estimated),
      currency = COALESCE(excluded.currency, living_costs.currency)
    RETURNING *
  `,
};
