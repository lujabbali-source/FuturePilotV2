// Bosnia y Herzegovina — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "bosnia-y-herzegovina";
const countryName = "Bosnia y Herzegovina";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/bosnia-y-herzegovina.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "bosnia-y-herzegovina-sarajevo",
      name: "Sarajevo",
      coordinates: {"lat": 43.84864, "lng": 18.35644},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 696731 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bosnia-y-herzegovina-mostar",
      name: "Mostar",
      coordinates: {"lat": 43.34333, "lng": 17.80806},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 104518 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bosnia-y-herzegovina-banja-luka",
      name: "Banja Luka",
      coordinates: {"lat": 44.77879, "lng": 17.20629},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 221106 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bosnia-y-herzegovina-tuzla",
      name: "Tuzla",
      coordinates: {"lat": 44.53842, "lng": 18.66709},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 142486 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bosnia-y-herzegovina-ilidza",
      name: "Ilidža",
      coordinates: {"lat": 43.83148, "lng": 18.30697},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 71277 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bosnia-y-herzegovina-bijeljina",
      name: "Bijeljina",
      coordinates: {"lat": 44.75874, "lng": 19.21437},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 37692 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Bosnia and Herzegovina",
  capital: "Sarajevo",
  currency: "BAM",
  language: "bosnio",
  continent: "Europa",
  population: 3140095,
  cities,
  // Las universidades no van aqui: viven en ./universities/bosnia-y-herzegovina.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 16,
  aliases: ["bosnia-and-herzegovina", "bosnia-y-herzegovina"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
