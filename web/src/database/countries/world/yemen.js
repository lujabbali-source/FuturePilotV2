// Yemen — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "yemen";
const countryName = "Yemen";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/yemen.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "yemen-sanaa",
      name: "Sanaa",
      coordinates: {"lat": 15.35452, "lng": 44.20646},
      isCapital: true,
      universityCount: 11,
      statistics: { population: 1937451 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "yemen-taiz",
      name: "Taiz",
      coordinates: {"lat": 13.57952, "lng": 44.02091},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 940600 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "yemen-ibb",
      name: "Ibb",
      coordinates: {"lat": 13.96667, "lng": 44.18333},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 771514 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "yemen-mukalla",
      name: "Mukalla",
      coordinates: {"lat": 14.54248, "lng": 49.12424},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 594951 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Yemen",
  capital: "Sanaa",
  currency: "YER",
  language: "árabe",
  continent: "Asia",
  population: 41773878,
  cities,
  // Las universidades no van aqui: viven en ./universities/yemen.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 13,
  aliases: ["yemen"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
