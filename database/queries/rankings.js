export const rankingQueries = {
  all: `
    SELECT rankings.*, universities.official_name AS university_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    ORDER BY rankings.ranking_year DESC, universities.official_name COLLATE NOCASE
  `,
  byId: `
    SELECT rankings.*, universities.official_name AS university_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    WHERE rankings.id = ?
  `,
  byUniversity: `
    SELECT rankings.*, universities.official_name AS university_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    WHERE rankings.university_id = ?
    ORDER BY rankings.ranking_year DESC
  `,
  byCountry: `
    SELECT rankings.*, universities.official_name AS university_name,
           countries.name AS country_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    JOIN countries ON countries.id = universities.country_id
    WHERE countries.id = ? OR countries.iso2 = ? OR countries.iso3 = ? OR countries.name = ?
    ORDER BY rankings.ranking_year DESC
  `,
  byCity: `
    SELECT rankings.*, universities.official_name AS university_name,
           cities.name AS city_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    JOIN cities ON cities.id = universities.city_id
    WHERE cities.id = ? OR cities.name = ?
    ORDER BY rankings.ranking_year DESC
  `,
  search: `
    SELECT rankings.*, universities.official_name AS university_name
    FROM rankings
    JOIN universities ON universities.id = rankings.university_id
    WHERE universities.official_name LIKE ? COLLATE NOCASE
    ORDER BY rankings.ranking_year DESC
  `,
  upsert: `
    INSERT INTO rankings (university_id, qs, the, shanghai, ranking_year)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(university_id, ranking_year) DO UPDATE SET
      qs = COALESCE(excluded.qs, rankings.qs),
      the = COALESCE(excluded.the, rankings.the),
      shanghai = COALESCE(excluded.shanghai, rankings.shanghai)
    RETURNING *
  `,
};
