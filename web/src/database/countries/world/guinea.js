// Guinea — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "guinea";
const countryName = "Guinea";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/guinea.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "guinea-camayenne",
      name: "Camayenne",
      coordinates: {"lat": 9.535, "lng": -13.68778},
      isCapital: false,
      universityCount: 14,
      statistics: { population: 1871242 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-dixinn",
      name: "Dixinn",
      coordinates: {"lat": 9.55111, "lng": -13.67306},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 137287 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-nzerekore",
      name: "Nzérékoré",
      coordinates: {"lat": 7.75624, "lng": -8.8179},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 226426 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-labe",
      name: "Labé",
      coordinates: {"lat": 11.31823, "lng": -12.28332},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 107571 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-faranah",
      name: "Faranah",
      coordinates: {"lat": 10.04036, "lng": -10.74343},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 70181 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "guinea-dubreka",
      name: "Dubréka",
      coordinates: {"lat": 9.79111, "lng": -13.52333},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 182296 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Guinea",
  capital: "Conakry",
  currency: "GNF",
  language: "francés",
  continent: "África",
  population: 15099727,
  cities,
  // Las universidades no van aqui: viven en ./universities/guinea.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 4,
  aliases: ["guinea"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
