// Gambia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "gambia";
const countryName = "Gambia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/gambia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "gambia-latri-kunda",
      name: "Latri Kunda",
      coordinates: {"lat": 13.44861, "lng": -16.68528},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 23724 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Gambia",
  capital: "Banjul",
  currency: "GMD",
  language: "inglés",
  continent: "África",
  population: 2822093,
  cities,
  // Las universidades no van aqui: viven en ./universities/gambia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 3,
  aliases: ["gambia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
