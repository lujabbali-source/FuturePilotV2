// Jordania — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "jordania";
const countryName = "Jordania";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/jordania.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "jordania-amman",
      name: "Amman",
      coordinates: {"lat": 31.95522, "lng": 35.94503},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 1275857 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-al-jubayhah",
      name: "Al Jubayhah",
      coordinates: {"lat": 32.01071, "lng": 35.89802},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 46834 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-hayy-al-quwaysimah",
      name: "Ḩayy al Quwaysimah",
      coordinates: {"lat": 31.91037, "lng": 35.94975},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 32396 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-khuraybat-as-suq",
      name: "Khuraybat as Sūq",
      coordinates: {"lat": 31.87913, "lng": 35.92098},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 186158 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-irbid",
      name: "Irbid",
      coordinates: {"lat": 32.55556, "lng": 35.85},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 569068 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-ar-ramtha",
      name: "Ar Ramthā",
      coordinates: {"lat": 32.55873, "lng": 36.00816},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 155693 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jordania-aqaba",
      name: "Aqaba",
      coordinates: {"lat": 29.52667, "lng": 35.00778},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 95048 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Jordan",
  capital: "Amman",
  currency: "JOD",
  language: "árabe",
  continent: "Asia",
  population: 11520684,
  cities,
  // Las universidades no van aqui: viven en ./universities/jordania.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 29,
  aliases: ["jordan", "jordania"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
