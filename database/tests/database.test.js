import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseClient } from '../connection.js';
import { DatabaseService } from '../services/DatabaseService.js';
import { initialData } from '../seed/initialData.js';

function createService() {
  const client = new DatabaseClient(':memory:');
  return new DatabaseService({ client });
}

test('seed is idempotent and preserves relationships', () => {
  const service = createService();

  try {
    service.seed(initialData);
    service.seed(initialData);

    assert.equal(service.getCountries().length, 1);
    assert.equal(service.getCities('CO').length, 1);
    assert.equal(service.getUniversities({ country: 'CO' }).length, 1);
    assert.equal(service.getPrograms(1).length, 1);
    assert.equal(service.getScholarships({ country: 'CO' }).length, 1);
    assert.equal(service.getLivingCost(1).currency, 'COP');
    assert.equal(service.getRankings(1).length, 1);
    assert.deepEqual(service.getImages(1)[0].gallery.length, 1);
  } finally {
    service.close();
  }
});

test('foreign keys reject a university linked to another country city', () => {
  const service = createService();

  try {
    const country = service.countries.insert({ iso2: 'CO', iso3: 'COL', name: 'Colombia' });
    const city = service.cities.insert({ country_id: country.id, name: 'Bogotá' });

    assert.throws(() => service.universities.insert({
      city_id: city.id,
      country_id: country.id + 999,
      official_name: 'Invalid University',
    }));
  } finally {
    service.close();
  }
});
