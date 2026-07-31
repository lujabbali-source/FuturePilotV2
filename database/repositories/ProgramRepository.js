import { programQueries } from '../queries/programs.js';
import { deleteById, updateById } from './helpers.js';

export class ProgramRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(programQueries.all);
  }

  getById(id) {
    return this.db.get(programQueries.byId, [id]);
  }

  getByUniversity(universityId) {
    return this.db.all(programQueries.byUniversity, [universityId]);
  }

  getByCountry(countryId) {
    return this.db.all(
      `SELECT programs.* FROM programs JOIN universities ON universities.id = programs.university_id WHERE universities.country_id = ? ORDER BY programs.name COLLATE NOCASE`,
      [countryId],
    );
  }

  getByCity(cityId) {
    return this.db.all(
      `SELECT programs.* FROM programs JOIN universities ON universities.id = programs.university_id WHERE universities.city_id = ? ORDER BY programs.name COLLATE NOCASE`,
      [cityId],
    );
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(programQueries.search, [value, value]);
  }

  insert(program) {
    return this.db.get(programQueries.upsert, [
      program.university_id,
      program.name,
      program.degree ?? null,
      program.duration ?? null,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'programs',
      id,
      changes,
      ['university_id', 'name', 'degree', 'duration'],
      programQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'programs', id);
  }
}
