export const programQueries = {
  all: 'SELECT * FROM programs ORDER BY name COLLATE NOCASE',
  byId: 'SELECT * FROM programs WHERE id = ?',
  byUniversity: `
    SELECT programs.*, universities.official_name AS university_name
    FROM programs
    JOIN universities ON universities.id = programs.university_id
    WHERE programs.university_id = ?
    ORDER BY programs.name COLLATE NOCASE
  `,
  search: `
    SELECT programs.*, universities.official_name AS university_name
    FROM programs
    JOIN universities ON universities.id = programs.university_id
    WHERE programs.name LIKE ? COLLATE NOCASE
       OR programs.degree LIKE ? COLLATE NOCASE
    ORDER BY programs.name COLLATE NOCASE
  `,
  upsert: `
    INSERT INTO programs (university_id, name, degree, duration)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(university_id, name, degree) DO UPDATE SET
      duration = COALESCE(excluded.duration, programs.duration)
    RETURNING *
  `,
};
