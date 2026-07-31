import { livingCostQueries } from '../queries/livingCosts.js';
import { countryIdentifierParameters, deleteById, updateById } from './helpers.js';

export class LivingCostRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(livingCostQueries.all);
  }

  getById(id) {
    return this.db.get(livingCostQueries.byId, [id]);
  }

  getByCity(identifier) {
    return this.db.all(livingCostQueries.byCity, [identifier, identifier]);
  }

  getByCountry(identifier) {
    return this.db.all(livingCostQueries.byCountry, countryIdentifierParameters(identifier));
  }

  search(term) {
    const value = `%${term}%`;
    return this.db.all(livingCostQueries.search, [value, value]);
  }

  insert(livingCost) {
    return this.db.get(livingCostQueries.upsert, [
      livingCost.city_id,
      livingCost.rent ?? null,
      livingCost.food ?? null,
      livingCost.transport ?? null,
      livingCost.utilities ?? null,
      livingCost.internet ?? null,
      livingCost.total_estimated ?? null,
      livingCost.currency ?? null,
      livingCost.cost_year ?? 2026,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'living_costs',
      id,
      changes,
      ['city_id', 'rent', 'food', 'transport', 'utilities', 'internet', 'total_estimated', 'currency', 'cost_year'],
      livingCostQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'living_costs', id);
  }
}
