export const initialData = {
  countries: [
    {
      iso2: 'CO',
      iso3: 'COL',
      name: 'Colombia',
      continent: 'South America',
      currency: 'COP',
      language: 'Spanish',
      flag: '🇨🇴',
    },
  ],
  cities: [
    {
      country_iso2: 'CO',
      name: 'Bogotá',
      latitude: 4.711,
      longitude: -74.0721,
      population: 8000000,
      is_capital: 1,
    },
  ],
  universities: [
    {
      country_iso2: 'CO',
      city_name: 'Bogotá',
      official_name: 'Universidad Nacional de Colombia',
      short_name: 'UNAL',
      official_website: 'https://unal.edu.co',
      type: 'Public',
      founded_year: 1867,
    },
  ],
  programs: [
    {
      country_iso2: 'CO',
      university_name: 'Universidad Nacional de Colombia',
      name: 'Ingeniería de Sistemas y Computación',
      degree: 'Bachelor',
      duration: '10 semesters',
    },
  ],
  scholarships: [
    {
      country_iso2: 'CO',
      university_name: 'Universidad Nacional de Colombia',
      name: 'Programa de apoyo socioeconómico',
      description: 'Ejemplo de beca para validar la relación entre universidad y ayudas financieras.',
      official_url: 'https://bienestar.unal.edu.co',
      eligibility: 'Consultar requisitos oficiales de la universidad.',
    },
  ],
  livingCosts: [
    {
      country_iso2: 'CO',
      city_name: 'Bogotá',
      rent: 1400000,
      food: 650000,
      transport: 180000,
      utilities: 180000,
      internet: 90000,
      total_estimated: 2500000,
      currency: 'COP',
      cost_year: 2026,
    },
  ],
  rankings: [
    {
      country_iso2: 'CO',
      university_name: 'Universidad Nacional de Colombia',
      qs: 259,
      the: 801,
      shanghai: 901,
      ranking_year: 2026,
    },
  ],
  images: [
    {
      country_iso2: 'CO',
      city_name: 'Bogotá',
      hero_image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
      gallery: [
        'https://images.unsplash.com/photo-1531058020387-3be344556be6',
      ],
    },
  ],
};
