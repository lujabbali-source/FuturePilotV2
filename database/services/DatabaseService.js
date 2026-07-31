import { DatabaseClient, DEFAULT_DATABASE_PATH } from '../connection.js';
import {
  CityRepository,
  CountryRepository,
  ImageRepository,
  LivingCostRepository,
  ProgramRepository,
  RankingRepository,
  ScholarshipRepository,
  UniversityRepository,
} from '../repositories/index.js';

export class DatabaseService {
  constructor({ databasePath = DEFAULT_DATABASE_PATH, client } = {}) {
    this.client = client ?? new DatabaseClient(databasePath);
    this.countries = new CountryRepository(this.client);
    this.cities = new CityRepository(this.client);
    this.universities = new UniversityRepository(this.client);
    this.programs = new ProgramRepository(this.client);
    this.scholarships = new ScholarshipRepository(this.client);
    this.livingCosts = new LivingCostRepository(this.client);
    this.rankings = new RankingRepository(this.client);
    this.images = new ImageRepository(this.client);
  }

  getCountries() {
    return this.countries.getAll();
  }

  getCountry(identifier) {
    return Number.isInteger(identifier) ? this.countries.getById(identifier) : this.countries.getByCountry(identifier);
  }

  getCities(country) {
    return this.cities.getByCountry(country);
  }

  getCity(identifier) {
    return Number.isInteger(identifier) ? this.cities.getById(identifier) : this.cities.getByCity(identifier)[0] ?? null;
  }

  getUniversities({ country, city, search } = {}) {
    if (search) return this.universities.search(search);
    if (country !== undefined) return this.universities.getByCountry(country);
    if (city !== undefined) return this.universities.getByCity(city);
    return this.universities.getAll();
  }

  getUniversity(identifier) {
    return this.universities.getById(identifier);
  }

  getPrograms(universityId) {
    return universityId === undefined ? this.programs.getAll() : this.programs.getByUniversity(universityId);
  }

  getScholarships({ university, country, city, search } = {}) {
    if (search) return this.scholarships.search(search);
    if (university !== undefined) return this.scholarships.getByUniversity(university);
    if (country !== undefined) return this.scholarships.getByCountry(country);
    if (city !== undefined) return this.scholarships.getByCity(city);
    return this.scholarships.getAll();
  }

  getLivingCost(city) {
    const costs = city === undefined ? this.livingCosts.getAll() : this.livingCosts.getByCity(city);
    return city === undefined ? costs : costs[0] ?? null;
  }

  getRankings(university) {
    return university === undefined ? this.rankings.getAll() : this.rankings.getByUniversity(university);
  }

  getImages(city) {
    return city === undefined ? this.images.getAll() : this.images.getByCity(city);
  }

  seed(seedData) {
    return this.client.transaction(() => {
      const countryIds = new Map();
      const cityIds = new Map();
      const universityIds = new Map();

      for (const country of seedData.countries ?? []) {
        const savedCountry = this.countries.insert(country);
        countryIds.set(country.iso2, savedCountry.id);
      }

      for (const city of seedData.cities ?? []) {
        const countryId = countryIds.get(city.country_iso2);
        if (!countryId) throw new Error(`Seed country not found: ${city.country_iso2}`);
        const savedCity = this.cities.insert({ ...city, country_id: countryId });
        cityIds.set(`${city.country_iso2}:${city.name}`, savedCity.id);
      }

      for (const university of seedData.universities ?? []) {
        const countryId = countryIds.get(university.country_iso2);
        const cityId = cityIds.get(`${university.country_iso2}:${university.city_name}`);
        if (!countryId || !cityId) throw new Error(`Seed city/country not found for: ${university.official_name}`);
        const savedUniversity = this.universities.insert({
          ...university,
          country_id: countryId,
          city_id: cityId,
        });
        universityIds.set(`${university.country_iso2}:${university.official_name}`, savedUniversity.id);
      }

      for (const program of seedData.programs ?? []) {
        const universityId = universityIds.get(`${program.country_iso2}:${program.university_name}`);
        if (!universityId) throw new Error(`Seed university not found: ${program.university_name}`);
        this.programs.insert({ ...program, university_id: universityId });
      }

      for (const scholarship of seedData.scholarships ?? []) {
        const universityId = universityIds.get(`${scholarship.country_iso2}:${scholarship.university_name}`);
        if (!universityId) throw new Error(`Seed university not found: ${scholarship.university_name}`);
        this.scholarships.insert({ ...scholarship, university_id: universityId });
      }

      for (const livingCost of seedData.livingCosts ?? []) {
        const cityId = cityIds.get(`${livingCost.country_iso2}:${livingCost.city_name}`);
        if (!cityId) throw new Error(`Seed city not found: ${livingCost.city_name}`);
        this.livingCosts.insert({ ...livingCost, city_id: cityId });
      }

      for (const ranking of seedData.rankings ?? []) {
        const universityId = universityIds.get(`${ranking.country_iso2}:${ranking.university_name}`);
        if (!universityId) throw new Error(`Seed university not found: ${ranking.university_name}`);
        this.rankings.insert({ ...ranking, university_id: universityId });
      }

      for (const image of seedData.images ?? []) {
        const cityId = cityIds.get(`${image.country_iso2}:${image.city_name}`);
        if (!cityId) throw new Error(`Seed city not found: ${image.city_name}`);
        this.images.insert({ ...image, city_id: cityId });
      }

      return {
        countries: this.countries.getAll().length,
        cities: this.cities.getAll().length,
        universities: this.universities.getAll().length,
      };
    });
  }

  close() {
    this.client.close();
  }
}
