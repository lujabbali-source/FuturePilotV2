// Uzbekistán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "uzbekistan";
const countryName = "Uzbekistán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/uzbekistan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "uzbekistan-yunusobod",
      name: "Yunusobod",
      coordinates: {"lat": 41.37139, "lng": 69.27944},
      isCapital: false,
      universityCount: 10,
      statistics: { population: 352000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-tashkent",
      name: "Tashkent",
      coordinates: {"lat": 41.26465, "lng": 69.21627},
      isCapital: true,
      universityCount: 7,
      statistics: { population: 1978028 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-salor",
      name: "Salor",
      coordinates: {"lat": 41.375, "lng": 69.352},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 26494 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-samarkand",
      name: "Samarkand",
      coordinates: {"lat": 39.65456, "lng": 66.96445},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 595200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-qarshi",
      name: "Qarshi",
      coordinates: {"lat": 38.86056, "lng": 65.78905},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 278300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-bukhara",
      name: "Bukhara",
      coordinates: {"lat": 39.77026, "lng": 64.43069},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 280187 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-urganch",
      name: "Urganch",
      coordinates: {"lat": 41.55177, "lng": 60.63143},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 145000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-jizzax",
      name: "Jizzax",
      coordinates: {"lat": 40.13351, "lng": 67.82956},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 179200 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "uzbekistan-chilanzar",
      name: "Chilanzar",
      coordinates: {"lat": 41.28194, "lng": 69.18111},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 260700 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Uzbekistan",
  capital: "Tashkent",
  currency: "UZS",
  language: "uzbeko",
  continent: "Asia",
  population: 37053428,
  cities,
  // Las universidades no van aqui: viven en ./universities/uzbekistan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 23,
  aliases: ["uzbekistan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
