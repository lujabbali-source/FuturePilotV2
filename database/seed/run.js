import { DatabaseService } from '../services/DatabaseService.js';
import { initialData } from './initialData.js';

const service = new DatabaseService();

try {
  const result = service.seed(initialData);
  console.log(`Seed completado: ${result.countries} país(es), ${result.cities} ciudad(es), ${result.universities} universidad(es).`);
} finally {
  service.close();
}
