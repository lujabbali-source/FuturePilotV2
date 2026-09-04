// Laos — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "laos";
const countryName = "Laos";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/laos.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "laos-vientiane",
      name: "Vientiane",
      coordinates: {"lat": 17.96667, "lng": 102.6},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 840940 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "laos-pakse",
      name: "Pakse",
      coordinates: {"lat": 15.12022, "lng": 105.79898},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 77900 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "laos-luang-prabang",
      name: "Luang Prabang",
      coordinates: {"lat": 19.8933, "lng": 102.1525},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 55027 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Laos",
  capital: "Vientiane",
  currency: "LAK",
  language: "lao",
  continent: "Asia",
  population: 7873046,
  cities,
  // Las universidades no van aqui: viven en ./universities/laos.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 2,
  aliases: ["laos"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
