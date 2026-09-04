// Finlandia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "finlandia";
const countryName = "Finlandia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/finlandia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "finlandia-helsinki",
      name: "Helsinki",
      coordinates: {"lat": 60.16952, "lng": 24.93545},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 658864 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-turku",
      name: "Turku",
      coordinates: {"lat": 60.45148, "lng": 22.26869},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 206655 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-lappeenranta",
      name: "Lappeenranta",
      coordinates: {"lat": 61.05871, "lng": 28.18871},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 72909 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-vaasa",
      name: "Vaasa",
      coordinates: {"lat": 63.096, "lng": 21.61577},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 69819 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-tampere",
      name: "Tampere",
      coordinates: {"lat": 61.49911, "lng": 23.78712},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 260646 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-leppavaara",
      name: "Leppävaara",
      coordinates: {"lat": 60.21283, "lng": 24.81348},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 28409 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-kuopio",
      name: "Kuopio",
      coordinates: {"lat": 62.89238, "lng": 27.67703},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 125462 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-kallio",
      name: "Kallio",
      coordinates: {"lat": 60.18427, "lng": 24.95034},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 27051 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "finlandia-hervanta",
      name: "Hervanta",
      coordinates: {"lat": 61.44792, "lng": 23.85301},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 25231 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Finland",
  capital: "Helsinki",
  currency: "EUR",
  language: "finés",
  continent: "Europa",
  population: 5646436,
  cities,
  // Las universidades no van aqui: viven en ./universities/finlandia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 35,
  aliases: ["finland", "finlandia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
