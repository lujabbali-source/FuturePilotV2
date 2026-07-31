import { DatabaseService } from '../services/DatabaseService.js';

const service = new DatabaseService();
console.log('Base de datos inicializada correctamente.');
service.close();
