// Libia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "libia";
const countryName = "Libia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/libia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "libia-tripoli",
      name: "Tripoli",
      coordinates: {"lat": 32.88743, "lng": 13.18733},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 1302947 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libia-benghazi",
      name: "Benghazi",
      coordinates: {"lat": 32.11486, "lng": 20.06859},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 757490 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libia-al-bayda",
      name: "Al Bayḑā’",
      coordinates: {"lat": 32.76272, "lng": 21.75506},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 129439 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libia-janzur",
      name: "Janzūr",
      coordinates: {"lat": 32.81868, "lng": 13.01727},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 154389 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Libya",
  capital: "Tripoli",
  currency: "LYD",
  language: "árabe",
  continent: "África",
  population: 7458555,
  cities,
  // Las universidades no van aqui: viven en ./universities/libia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 11,
  aliases: ["libia", "libya"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
