import { readFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const databaseDirectory = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_DATABASE_PATH = path.join(databaseDirectory, 'data', 'futurepilot.sqlite');
const schemaPath = path.join(databaseDirectory, 'schema.sql');

export class DatabaseClient {
  constructor(databasePath = DEFAULT_DATABASE_PATH) {
    this.databasePath = databasePath;
    mkdirSync(path.dirname(databasePath), { recursive: true });
    this.db = new DatabaseSync(databasePath);
    this.db.exec('PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL;');
    this.db.exec(readFileSync(schemaPath, 'utf8'));
    this.db.prepare('INSERT OR IGNORE INTO schema_migrations (version) VALUES (?)').run(1);
  }

  get(sql, parameters = []) {
    return this.db.prepare(sql).get(...parameters);
  }

  all(sql, parameters = []) {
    return this.db.prepare(sql).all(...parameters);
  }

  run(sql, parameters = []) {
    return this.db.prepare(sql).run(...parameters);
  }

  transaction(callback) {
    this.db.exec('BEGIN');
    try {
      const result = callback();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  close() {
    this.db.close();
  }
}

export async function ensureDatabaseDirectory(databasePath = DEFAULT_DATABASE_PATH) {
  mkdirSync(path.dirname(databasePath), { recursive: true });
}
