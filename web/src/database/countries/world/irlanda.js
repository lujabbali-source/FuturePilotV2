// Irlanda — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "irlanda";
const countryName = "Irlanda";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/irlanda.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "irlanda-dublin",
      name: "Dublin",
      coordinates: {"lat": 53.33306, "lng": -6.24889},
      isCapital: true,
      universityCount: 14,
      statistics: { population: 1024027 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-limerick",
      name: "Limerick",
      coordinates: {"lat": 52.66472, "lng": -8.62306},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 102287 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-galway",
      name: "Galway",
      coordinates: {"lat": 53.27245, "lng": -9.05095},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 85910 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-maynooth",
      name: "Maynooth",
      coordinates: {"lat": 53.385, "lng": -6.59361},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 17259 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-waterford",
      name: "Waterford",
      coordinates: {"lat": 52.25833, "lng": -7.11194},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 60079 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-tralee",
      name: "Tralee",
      coordinates: {"lat": 52.27042, "lng": -9.70264},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26079 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-tallaght",
      name: "Tallaght",
      coordinates: {"lat": 53.2859, "lng": -6.37344},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 81022 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-kilkenny",
      name: "Kilkenny",
      coordinates: {"lat": 52.65417, "lng": -7.25222},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 21589 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-finglas",
      name: "Finglas",
      coordinates: {"lat": 53.38917, "lng": -6.29694},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 19768 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-cork",
      name: "Cork",
      coordinates: {"lat": 51.89797, "lng": -8.47061},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 224004 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-carlow",
      name: "Carlow",
      coordinates: {"lat": 52.84083, "lng": -6.92611},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 27351 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "irlanda-ballincollig",
      name: "Ballincollig",
      coordinates: {"lat": 51.88333, "lng": -8.58333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 18621 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Ireland",
  capital: "Dublin",
  currency: "EUR",
  language: "inglés",
  continent: "Europa",
  population: 5484367,
  cities,
  // Las universidades no van aqui: viven en ./universities/irlanda.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 27,
  aliases: ["ireland", "irlanda"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
