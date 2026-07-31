export const imageQueries = {
  all: `
    SELECT images.*, cities.name AS city_name,
           countries.name AS country_name
    FROM images
    JOIN cities ON cities.id = images.city_id
    JOIN countries ON countries.id = cities.country_id
    ORDER BY cities.name COLLATE NOCASE
  `,
  byId: 'SELECT * FROM images WHERE id = ?',
  byCity: `
    SELECT images.*, cities.name AS city_name,
           countries.name AS country_name
    FROM images
    JOIN cities ON cities.id = images.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.id = ? OR cities.name = ?
  `,
  search: `
    SELECT images.*, cities.name AS city_name,
           countries.name AS country_name
    FROM images
    JOIN cities ON cities.id = images.city_id
    JOIN countries ON countries.id = cities.country_id
    WHERE cities.name LIKE ? COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO images (city_id, hero_image, gallery)
    VALUES (?, ?, ?)
    ON CONFLICT(city_id) DO UPDATE SET
      hero_image = COALESCE(excluded.hero_image, images.hero_image),
      gallery = CASE WHEN excluded.gallery = '[]' THEN images.gallery ELSE excluded.gallery END
    RETURNING *
  `,
};
