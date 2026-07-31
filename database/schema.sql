CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    iso2 TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (length(iso2) = 2),
    iso3 TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (length(iso3) = 3),
    name TEXT NOT NULL UNIQUE COLLATE NOCASE,
    continent TEXT,
    currency TEXT,
    language TEXT,
    flag TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER NOT NULL,
    name TEXT NOT NULL COLLATE NOCASE,
    latitude REAL CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
    longitude REAL CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
    population INTEGER CHECK (population IS NULL OR population >= 0),
    is_capital INTEGER NOT NULL DEFAULT 0 CHECK (is_capital IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (country_id, name),
    UNIQUE (id, country_id),
    FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS universities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER NOT NULL,
    country_id INTEGER NOT NULL,
    official_name TEXT NOT NULL COLLATE NOCASE,
    short_name TEXT,
    official_website TEXT,
    type TEXT,
    founded_year INTEGER CHECK (founded_year IS NULL OR founded_year BETWEEN 1000 AND 2100),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (country_id, official_name),
    FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (city_id, country_id) REFERENCES cities(id, country_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER NOT NULL,
    name TEXT NOT NULL COLLATE NOCASE,
    degree TEXT,
    duration TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (university_id, name, degree),
    FOREIGN KEY (university_id) REFERENCES universities(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER NOT NULL,
    name TEXT NOT NULL COLLATE NOCASE,
    description TEXT,
    official_url TEXT,
    eligibility TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (university_id, name),
    FOREIGN KEY (university_id) REFERENCES universities(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS living_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER NOT NULL,
    rent REAL CHECK (rent IS NULL OR rent >= 0),
    food REAL CHECK (food IS NULL OR food >= 0),
    transport REAL CHECK (transport IS NULL OR transport >= 0),
    utilities REAL CHECK (utilities IS NULL OR utilities >= 0),
    internet REAL CHECK (internet IS NULL OR internet >= 0),
    total_estimated REAL CHECK (total_estimated IS NULL OR total_estimated >= 0),
    currency TEXT,
    cost_year INTEGER NOT NULL DEFAULT 2026 CHECK (cost_year BETWEEN 1900 AND 2200),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (city_id, cost_year),
    FOREIGN KEY (city_id) REFERENCES cities(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS rankings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER NOT NULL,
    qs INTEGER CHECK (qs IS NULL OR qs > 0),
    the INTEGER CHECK (the IS NULL OR the > 0),
    shanghai INTEGER CHECK (shanghai IS NULL OR shanghai > 0),
    ranking_year INTEGER NOT NULL DEFAULT 2026 CHECK (ranking_year BETWEEN 1900 AND 2200),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (university_id, ranking_year),
    FOREIGN KEY (university_id) REFERENCES universities(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER NOT NULL UNIQUE,
    hero_image TEXT,
    gallery TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(gallery)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_cities_country_id ON cities(country_id);
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS idx_universities_city_id ON universities(city_id);
CREATE INDEX IF NOT EXISTS idx_universities_country_id ON universities(country_id);
CREATE INDEX IF NOT EXISTS idx_universities_name ON universities(official_name COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS idx_programs_university_id ON programs(university_id);
CREATE INDEX IF NOT EXISTS idx_scholarships_university_id ON scholarships(university_id);
CREATE INDEX IF NOT EXISTS idx_living_costs_city_id ON living_costs(city_id);
CREATE INDEX IF NOT EXISTS idx_rankings_university_id ON rankings(university_id);

CREATE TRIGGER IF NOT EXISTS countries_updated_at
AFTER UPDATE ON countries
FOR EACH ROW
BEGIN
    UPDATE countries SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS cities_updated_at
AFTER UPDATE ON cities
FOR EACH ROW
BEGIN
    UPDATE cities SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS universities_updated_at
AFTER UPDATE ON universities
FOR EACH ROW
BEGIN
    UPDATE universities SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS programs_updated_at
AFTER UPDATE ON programs
FOR EACH ROW
BEGIN
    UPDATE programs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS scholarships_updated_at
AFTER UPDATE ON scholarships
FOR EACH ROW
BEGIN
    UPDATE scholarships SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS living_costs_updated_at
AFTER UPDATE ON living_costs
FOR EACH ROW
BEGIN
    UPDATE living_costs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS rankings_updated_at
AFTER UPDATE ON rankings
FOR EACH ROW
BEGIN
    UPDATE rankings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS images_updated_at
AFTER UPDATE ON images
FOR EACH ROW
BEGIN
    UPDATE images SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
