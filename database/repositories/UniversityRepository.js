import { universityQueries } from '../queries/universities.js';
import { countryIdentifierParameters, deleteById, updateById } from './helpers.js';

export class UniversityRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(universityQueries.all);
  }

  getById(id) {
    return this.db.get(universityQueries.byId, [id]);
  }

  getByCountry(identifier) {
    return this.db.all(universityQueries.byCountry, countryIdentifierParameters(identifier));
  }

  getByCity(identifier) {
    return this.db.all(universityQueries.byCity, [identifier, identifier]);
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(universityQueries.search, [value, value]);
  }

  insert(university) {
    return this.db.get(universityQueries.upsert, [
      university.city_id,
      university.country_id,
      university.official_name,
      university.short_name ?? null,
      university.official_website ?? null,
      university.type ?? null,
      university.founded_year ?? null,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'universities',
      id,
      changes,
      ['city_id', 'country_id', 'official_name', 'short_name', 'official_website', 'type', 'founded_year'],
      universityQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'universities', id);
  }
}
