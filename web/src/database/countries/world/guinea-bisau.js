// Guinea-Bisáu — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "guinea-bisau";
const countryName = "Guinea-Bisáu";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/guinea-bisau.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "guinea-bisau-sintra-nema",
      name: "Sintra-Nema",
      coordinates: {"lat": 11.86236, "lng": -15.59736},
      isCapital: false,
      universityCount: 17,
      statistics: { population: 21451 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Guinea-Bissau",
  capital: "Bissau",
  currency: "XOF",
  language: "portugués",
  continent: "África",
  population: 2249515,
  cities,
  // Las universidades no van aqui: viven en ./universities/guinea-bisau.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 0,
  aliases: ["guinea-bisau", "guinea-bissau"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
