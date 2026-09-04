// Eslovenia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "eslovenia";
const countryName = "Eslovenia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/eslovenia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "eslovenia-novo-mesto",
      name: "Novo Mesto",
      coordinates: {"lat": 45.80397, "lng": 15.16886},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 24446 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovenia-maribor",
      name: "Maribor",
      coordinates: {"lat": 46.55583, "lng": 15.64593},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 96209 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovenia-ljubljana",
      name: "Ljubljana",
      coordinates: {"lat": 46.05108, "lng": 14.50513},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 272220 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "eslovenia-koper",
      name: "Koper",
      coordinates: {"lat": 45.5482, "lng": 13.72963},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 25753 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Slovenia",
  capital: "Ljubljana",
  currency: "EUR",
  language: "esloveno",
  continent: "Europa",
  population: 2130986,
  cities,
  // Las universidades no van aqui: viven en ./universities/eslovenia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["eslovenia", "slovenia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
