// Sudáfrica — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "sudafrica";
const countryName = "Sudáfrica";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/sudafrica.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "sudafrica-pretoria",
      name: "Pretoria",
      coordinates: {"lat": -25.74486, "lng": 28.18783},
      isCapital: true,
      universityCount: 8,
      statistics: { population: 2112693 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-johannesburg",
      name: "Johannesburg",
      coordinates: {"lat": -26.20227, "lng": 28.04363},
      isCapital: false,
      universityCount: 8,
      statistics: { population: 9418183 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-kuils-river",
      name: "Kuils River",
      coordinates: {"lat": -33.94208, "lng": 18.70663},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 46685 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-gqeberha",
      name: "Gqeberha",
      coordinates: {"lat": -33.96109, "lng": 25.61494},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 1050078 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-butterworth",
      name: "Butterworth",
      coordinates: {"lat": -32.33083, "lng": 28.14981},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 53086 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-bloemfontein",
      name: "Bloemfontein",
      coordinates: {"lat": -29.12107, "lng": 26.214},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 556637 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-alice",
      name: "Alice",
      coordinates: {"lat": -32.78749, "lng": 26.8344},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 18141 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-vanderbijlpark",
      name: "Vanderbijlpark",
      coordinates: {"lat": -26.71171, "lng": 27.83795},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 246754 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-potchefstroom",
      name: "Potchefstroom",
      coordinates: {"lat": -26.71667, "lng": 27.1},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 178285 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-grahamstown",
      name: "Grahamstown",
      coordinates: {"lat": -33.30422, "lng": 26.53276},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 91548 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-durban",
      name: "Durban",
      coordinates: {"lat": -29.8579, "lng": 31.0292},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 3338026 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-centurion",
      name: "Centurion",
      coordinates: {"lat": -25.85891, "lng": 28.18577},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 236580 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-stellenbosch",
      name: "Stellenbosch",
      coordinates: {"lat": -33.93462, "lng": 18.86676},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 96228 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-athlone",
      name: "Athlone",
      coordinates: {"lat": -33.96722, "lng": 18.50214},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 237414 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudafrica-rondebosch",
      name: "Rondebosch",
      coordinates: {"lat": -33.96333, "lng": 18.47639},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 15158 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "South Africa",
  capital: "Pretoria",
  currency: "ZAR",
  language: "zulú",
  continent: "África",
  population: 64747319,
  cities,
  // Las universidades no van aqui: viven en ./universities/sudafrica.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 29,
  aliases: ["south-africa", "sudafrica"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
