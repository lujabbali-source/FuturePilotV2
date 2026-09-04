// Albania — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "albania";
const countryName = "Albania";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/albania.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "albania-tirana",
      name: "Tirana",
      coordinates: {"lat": 41.32744, "lng": 19.81866},
      isCapital: true,
      universityCount: 23,
      statistics: { population: 418495 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "albania-shkoder",
      name: "Shkodër",
      coordinates: {"lat": 42.06828, "lng": 19.51258},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 95553 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "albania-vlore",
      name: "Vlorë",
      coordinates: {"lat": 40.4696, "lng": 19.48379},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 115261 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Albania",
  capital: "Tirana",
  currency: "ALL",
  language: "albanés",
  continent: "Europa",
  population: 2349580,
  cities,
  // Las universidades no van aqui: viven en ./universities/albania.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 16,
  aliases: ["albania"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
