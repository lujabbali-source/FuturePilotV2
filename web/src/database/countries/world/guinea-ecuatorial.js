// Guinea Ecuatorial — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "guinea-ecuatorial";
const countryName = "Guinea Ecuatorial";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/guinea-ecuatorial.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "guinea-ecuatorial-malabo",
      name: "Malabo",
      coordinates: {"lat": 3.75578, "lng": 8.78166},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 155963 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-ecuatorial-bata",
      name: "Bata",
      coordinates: {"lat": 1.86391, "lng": 9.76582},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 173046 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-ecuatorial-ciudad-de-la-paz",
      name: "Ciudad de la Paz",
      coordinates: {"lat": 1.5925, "lng": 10.82361},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 2000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Equatorial Guinea",
  capital: "Ciudad de la Paz",
  currency: "XAF",
  language: "español",
  continent: "África",
  population: 1938431,
  cities,
  // Las universidades no van aqui: viven en ./universities/guinea-ecuatorial.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["equatorial-guinea", "guinea-ecuatorial"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
