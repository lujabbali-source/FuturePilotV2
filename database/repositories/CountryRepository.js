import { countryQueries } from '../queries/countries.js';
import { deleteById, updateById } from './helpers.js';

export class CountryRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(countryQueries.all);
  }

  getById(id) {
    return this.db.get(countryQueries.byId, [id]);
  }

  getByCountry(identifier) {
    if (Number.isInteger(identifier)) return this.getById(identifier);
    return this.db.get(countryQueries.byIdentifier, [identifier, identifier, identifier]);
  }

  getByCity(cityName) {
    return this.db.all(countryQueries.byCity, [`%${cityName}%`]);
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(countryQueries.search, [value, value, value]);
  }

  insert(country) {
    return this.db.get(countryQueries.upsert, [
      country.iso2,
      country.iso3,
      country.name,
      country.continent ?? null,
      country.currency ?? null,
      country.language ?? null,
      country.flag ?? null,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'countries',
      id,
      changes,
      ['iso2', 'iso3', 'name', 'continent', 'currency', 'language', 'flag'],
      countryQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'countries', id);
  }
}
