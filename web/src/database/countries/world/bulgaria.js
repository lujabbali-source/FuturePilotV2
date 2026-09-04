// Bulgaria — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "bulgaria";
const countryName = "Bulgaria";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/bulgaria.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "bulgaria-sofia",
      name: "Sofia",
      coordinates: {"lat": 42.69751, "lng": 23.32415},
      isCapital: true,
      universityCount: 14,
      statistics: { population: 1152556 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bulgaria-veliko-turnovo",
      name: "Veliko Tŭrnovo",
      coordinates: {"lat": 43.08124, "lng": 25.62904},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 59166 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bulgaria-varna",
      name: "Varna",
      coordinates: {"lat": 43.21912, "lng": 27.91024},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 318737 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bulgaria-plovdiv",
      name: "Plovdiv",
      coordinates: {"lat": 42.15387, "lng": 24.75001},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 329489 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bulgaria-burgas",
      name: "Burgas",
      coordinates: {"lat": 42.50651, "lng": 27.46886},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 210646 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bulgaria-blagoevgrad",
      name: "Blagoevgrad",
      coordinates: {"lat": 42.01457, "lng": 23.09804},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 67810 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Bulgaria",
  capital: "Sofia",
  currency: "BGN",
  language: "búlgaro",
  continent: "Europa",
  population: 6433302,
  cities,
  // Las universidades no van aqui: viven en ./universities/bulgaria.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 37,
  aliases: ["bulgaria"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
