import { cityQueries } from '../queries/cities.js';
import { countryIdentifierParameters, deleteById, updateById } from './helpers.js';

export class CityRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(cityQueries.all);
  }

  getById(id) {
    return this.db.get(cityQueries.byId, [id]);
  }

  getByCountry(identifier) {
    return this.db.all(cityQueries.byCountry, countryIdentifierParameters(identifier));
  }

  getByCity(name) {
    return this.db.all(cityQueries.byName, [`%${name}%`]);
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(cityQueries.search, [value, value]);
  }

  insert(city) {
    return this.db.get(cityQueries.upsert, [
      city.country_id,
      city.name,
      city.latitude ?? null,
      city.longitude ?? null,
      city.population ?? null,
      city.is_capital ?? 0,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'cities',
      id,
      changes,
      ['country_id', 'name', 'latitude', 'longitude', 'population', 'is_capital'],
      cityQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'cities', id);
  }
}
