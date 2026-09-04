// Suiza — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "suiza";
const countryName = "Suiza";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/suiza.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "suiza-geneva",
      name: "Geneva",
      coordinates: {"lat": 46.20222, "lng": 6.14569},
      isCapital: false,
      universityCount: 10,
      statistics: { population: 201741 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-zurich",
      name: "Zürich",
      coordinates: {"lat": 47.36667, "lng": 8.55},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 415367 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-bern",
      name: "Bern",
      coordinates: {"lat": 46.94809, "lng": 7.44744},
      isCapital: true,
      universityCount: 4,
      statistics: { population: 121631 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-basel",
      name: "Basel",
      coordinates: {"lat": 47.55839, "lng": 7.57327},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 177595 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-renens",
      name: "Renens",
      coordinates: {"lat": 46.53989, "lng": 6.5881},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 20927 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-zug",
      name: "Zug",
      coordinates: {"lat": 47.17242, "lng": 8.51745},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 30542 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-montreux",
      name: "Montreux",
      coordinates: {"lat": 46.43301, "lng": 6.91143},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 25984 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-luzern",
      name: "Luzern",
      coordinates: {"lat": 47.05048, "lng": 8.30635},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 81691 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-lugano",
      name: "Lugano",
      coordinates: {"lat": 46.01008, "lng": 8.96004},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 63185 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suiza-fribourg",
      name: "Fribourg",
      coordinates: {"lat": 46.80237, "lng": 7.15128},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 38365 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Switzerland",
  capital: "Bern",
  currency: "CHF",
  language: "alemán",
  continent: "Europa",
  population: 9092436,
  cities,
  // Las universidades no van aqui: viven en ./universities/suiza.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 76,
  aliases: ["suiza", "switzerland"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
