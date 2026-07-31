export function updateById(db, table, id, changes, allowedColumns, selectQuery) {
  const entries = Object.entries(changes)
    .filter(([column, value]) => allowedColumns.includes(column) && value !== undefined);

  if (entries.length === 0) {
    throw new Error(`No valid fields supplied to update ${table}`);
  }

  const assignments = entries.map(([column]) => `${column} = ?`).join(', ');
  const values = entries.map(([, value]) => value).concat(id);
  db.run(`UPDATE ${table} SET ${assignments} WHERE id = ?`, values);
  return db.get(selectQuery, [id]);
}

export function deleteById(db, table, id) {
  const result = db.run(`DELETE FROM ${table} WHERE id = ?`, [id]);
  return result.changes > 0;
}

export function countryIdentifierParameters(identifier) {
  return [identifier, identifier, identifier, identifier];
}

export function parseGallery(row) {
  if (!row) return row;
  return {
    ...row,
    gallery: JSON.parse(row.gallery || '[]'),
  };
}

export function serializeGallery(gallery = []) {
  if (!Array.isArray(gallery)) {
    throw new TypeError('gallery must be an array of image URLs');
  }
  return JSON.stringify(gallery);
}
