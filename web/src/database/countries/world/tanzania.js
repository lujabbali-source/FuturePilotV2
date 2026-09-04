// Tanzania — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "tanzania";
const countryName = "Tanzania";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/tanzania.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "tanzania-magomeni",
      name: "Magomeni",
      coordinates: {"lat": -6.8, "lng": 39.25},
      isCapital: false,
      universityCount: 10,
      statistics: { population: 19086 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-usa-river",
      name: "Usa River",
      coordinates: {"lat": -3.36667, "lng": 36.85},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 21000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-zanzibar",
      name: "Zanzibar",
      coordinates: {"lat": -6.16394, "lng": 39.19793},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 709809 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-morogoro",
      name: "Morogoro",
      coordinates: {"lat": -6.82102, "lng": 37.66122},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 471409 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-mbeya",
      name: "Mbeya",
      coordinates: {"lat": -8.9, "lng": 33.45},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 541603 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-dodoma",
      name: "Dodoma",
      coordinates: {"lat": -6.17221, "lng": 35.73947},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 765179 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-arusha",
      name: "Arusha",
      coordinates: {"lat": -3.36667, "lng": 36.68333},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 617631 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-mwanza",
      name: "Mwanza",
      coordinates: {"lat": -2.51667, "lng": 32.9},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1104521 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tanzania-dar-es-salaam",
      name: "Dar es Salaam",
      coordinates: {"lat": -6.82349, "lng": 39.26951},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 5383728 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Tanzania",
  capital: "Dodoma",
  currency: "TZS",
  language: "suajili",
  continent: "África",
  population: 70545865,
  cities,
  // Las universidades no van aqui: viven en ./universities/tanzania.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 19,
  aliases: ["tanzania"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
