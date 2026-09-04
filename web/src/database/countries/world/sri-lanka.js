// Sri Lanka — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "sri-lanka";
const countryName = "Sri Lanka";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/sri-lanka.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "sri-lanka-colombo",
      name: "Colombo",
      coordinates: {"lat": 6.93548, "lng": 79.84868},
      isCapital: true,
      universityCount: 9,
      statistics: { population: 648034 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sri-lanka-kandy",
      name: "Kandy",
      coordinates: {"lat": 7.2906, "lng": 80.6336},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 111701 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sri-lanka-anuradhapura",
      name: "Anuradhapura",
      coordinates: {"lat": 8.31223, "lng": 80.41306},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 60943 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Sri Lanka",
  capital: "Colombo",
  currency: "LKR",
  language: "cingalés",
  continent: "Asia",
  population: 21756000,
  cities,
  // Las universidades no van aqui: viven en ./universities/sri-lanka.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 27,
  aliases: ["sri-lanka"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
