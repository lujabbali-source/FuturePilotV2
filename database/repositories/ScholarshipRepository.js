import { scholarshipQueries } from '../queries/scholarships.js';
import { countryIdentifierParameters, deleteById, updateById } from './helpers.js';

export class ScholarshipRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(scholarshipQueries.all);
  }

  getById(id) {
    return this.db.get(scholarshipQueries.byId, [id]);
  }

  getByUniversity(universityId) {
    return this.db.all(scholarshipQueries.byUniversity, [universityId]);
  }

  getByCountry(identifier) {
    return this.db.all(scholarshipQueries.byCountry, countryIdentifierParameters(identifier));
  }

  getByCity(identifier) {
    return this.db.all(scholarshipQueries.byCity, [identifier, identifier]);
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(scholarshipQueries.search, [value, value, value]);
  }

  insert(scholarship) {
    return this.db.get(scholarshipQueries.upsert, [
      scholarship.university_id,
      scholarship.name,
      scholarship.description ?? null,
      scholarship.official_url ?? null,
      scholarship.eligibility ?? null,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'scholarships',
      id,
      changes,
      ['university_id', 'name', 'description', 'official_url', 'eligibility'],
      scholarshipQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'scholarships', id);
  }
}
