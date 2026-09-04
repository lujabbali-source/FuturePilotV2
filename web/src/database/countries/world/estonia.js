// Estonia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "estonia";
const countryName = "Estonia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/estonia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "estonia-tartu",
      name: "Tartu",
      coordinates: {"lat": 58.38062, "lng": 26.72509},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 91407 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "estonia-pirita",
      name: "Pirita",
      coordinates: {"lat": 59.469, "lng": 24.838},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 18310 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Estonia",
  capital: "Tallinn",
  currency: "EUR",
  language: "estonio",
  continent: "Europa",
  population: 1366475,
  cities,
  // Las universidades no van aqui: viven en ./universities/estonia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["estonia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
