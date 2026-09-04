// Kirguistán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "kirguistan";
const countryName = "Kirguistán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/kirguistan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "kirguistan-bishkek",
      name: "Bishkek",
      coordinates: {"lat": 42.87, "lng": 74.59},
      isCapital: true,
      universityCount: 16,
      statistics: { population: 900000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kirguistan-osh",
      name: "Osh",
      coordinates: {"lat": 40.52828, "lng": 72.7985},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 322164 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kirguistan-lebedinovka",
      name: "Lebedinovka",
      coordinates: {"lat": 42.88454, "lng": 74.67819},
      isCapital: false,
      universityCount: 0,
      statistics: { population: 21118 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Kyrgyzstan",
  capital: "Bishkek",
  currency: "KGS",
  language: "kirguís",
  continent: "Asia",
  population: 7343064,
  cities,
  // Las universidades no van aqui: viven en ./universities/kirguistan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 13,
  aliases: ["kirguistan", "kyrgyzstan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
