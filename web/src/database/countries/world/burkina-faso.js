// Burkina Faso — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "burkina-faso";
const countryName = "Burkina Faso";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/burkina-faso.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "burkina-faso-ouagadougou",
      name: "Ouagadougou",
      coordinates: {"lat": 12.36566, "lng": -1.53388},
      isCapital: true,
      universityCount: 8,
      statistics: { population: 2415266 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burkina-faso-bobo-dioulasso",
      name: "Bobo-Dioulasso",
      coordinates: {"lat": 11.18064, "lng": -4.29489},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 904920 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burkina-faso-nioko-i",
      name: "Nioko I",
      coordinates: {"lat": 12.39501, "lng": -1.43861},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 65263 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burkina-faso-saonre",
      name: "Saonré",
      coordinates: {"lat": 12.2751, "lng": -1.57692},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 47728 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "burkina-faso-koudougou",
      name: "Koudougou",
      coordinates: {"lat": 12.25188, "lng": -2.36694},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 160239 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Burkina Faso",
  capital: "Ouagadougou",
  currency: "XOF",
  language: "francés",
  continent: "África",
  population: 24074580,
  cities,
  // Las universidades no van aqui: viven en ./universities/burkina-faso.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["burkina-faso"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
