// República Checa — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "republica-checa";
const countryName = "República Checa";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/republica-checa.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "republica-checa-prague",
      name: "Prague",
      coordinates: {"lat": 50.08804, "lng": 14.42076},
      isCapital: true,
      universityCount: 7,
      statistics: { population: 1165581 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-brno",
      name: "Brno",
      coordinates: {"lat": 49.19522, "lng": 16.60796},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 379466 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-olomouc",
      name: "Olomouc",
      coordinates: {"lat": 49.59552, "lng": 17.25175},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 99496 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-dejvice",
      name: "Dejvice",
      coordinates: {"lat": 50.10079, "lng": 14.39071},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 23401 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-nove-mesto",
      name: "Nové Město",
      coordinates: {"lat": 50.07829, "lng": 14.42089},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 27105 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-jihlava",
      name: "Jihlava",
      coordinates: {"lat": 49.3961, "lng": 15.59124},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 50108 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-ceske-budejovice",
      name: "České Budějovice",
      coordinates: {"lat": 48.97447, "lng": 14.47434},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 93426 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-zizkov",
      name: "Žižkov",
      coordinates: {"lat": 50.08333, "lng": 14.45},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 58267 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-pilsen",
      name: "Pilsen",
      coordinates: {"lat": 49.74747, "lng": 13.37759},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 168733 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-opava",
      name: "Opava",
      coordinates: {"lat": 49.93866, "lng": 17.90257},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 60252 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-jindrichuv-hradec",
      name: "Jindřichův Hradec",
      coordinates: {"lat": 49.14404, "lng": 15.00301},
      isCapital: false,
      universityCount: 0,
      statistics: { population: 22812 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "republica-checa-jicin",
      name: "Jičín",
      coordinates: {"lat": 50.43723, "lng": 15.35162},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 16328 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Czechia",
  capital: "Prague",
  currency: "CZK",
  language: "checo",
  continent: "Europa",
  population: 10886878,
  cities,
  // Las universidades no van aqui: viven en ./universities/republica-checa.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 30,
  aliases: ["czechia", "republica-checa"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
