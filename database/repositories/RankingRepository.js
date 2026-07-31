import { rankingQueries } from '../queries/rankings.js';
import { countryIdentifierParameters, deleteById, updateById } from './helpers.js';

export class RankingRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(rankingQueries.all);
  }

  getById(id) {
    return this.db.get(rankingQueries.byId, [id]);
  }

  getByUniversity(universityId) {
    return this.db.all(rankingQueries.byUniversity, [universityId]);
  }

  getByCountry(identifier) {
    return this.db.all(rankingQueries.byCountry, countryIdentifierParameters(identifier));
  }

  getByCity(identifier) {
    return this.db.all(rankingQueries.byCity, [identifier, identifier]);
  }

  search(term) {
    return this.db.all(rankingQueries.search, [`%${term}%`]);
  }

  insert(ranking) {
    return this.db.get(rankingQueries.upsert, [
      ranking.university_id,
      ranking.qs ?? null,
      ranking.the ?? null,
      ranking.shanghai ?? null,
      ranking.ranking_year ?? 2026,
    ]);
  }

  update(id, changes) {
    return updateById(
      this.db,
      'rankings',
      id,
      changes,
      ['university_id', 'qs', 'the', 'shanghai', 'ranking_year'],
      rankingQueries.byId,
    );
  }

  delete(id) {
    return deleteById(this.db, 'rankings', id);
  }
}
