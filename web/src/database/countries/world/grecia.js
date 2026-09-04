// Grecia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "grecia";
const countryName = "Grecia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/grecia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "grecia-athens",
      name: "Athens",
      coordinates: {"lat": 37.98376, "lng": 23.72784},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 664046 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-corfu",
      name: "Corfu",
      coordinates: {"lat": 39.62441, "lng": 19.92016},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 40047 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-piraeus",
      name: "Piraeus",
      coordinates: {"lat": 37.94203, "lng": 23.64619},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 163688 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-patra",
      name: "Pátra",
      coordinates: {"lat": 38.2462, "lng": 21.73508},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 168034 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-chania",
      name: "Chaniá",
      coordinates: {"lat": 35.51124, "lng": 24.02921},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 53910 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-irakleion",
      name: "Irákleion",
      coordinates: {"lat": 35.32787, "lng": 25.14341},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 137154 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "grecia-zografos",
      name: "Zográfos",
      coordinates: {"lat": 37.97574, "lng": 23.76911},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 71026 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Greece",
  capital: "Athens",
  currency: "EUR",
  language: "griego",
  continent: "Europa",
  population: 10413962,
  cities,
  // Las universidades no van aqui: viven en ./universities/grecia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 33,
  aliases: ["grecia", "greece"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
