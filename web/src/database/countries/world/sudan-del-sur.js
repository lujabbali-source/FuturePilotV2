// Sudán del Sur — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "sudan-del-sur";
const countryName = "Sudán del Sur";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/sudan-del-sur.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "sudan-del-sur-juba",
      name: "Juba",
      coordinates: {"lat": 4.85165, "lng": 31.58247},
      isCapital: true,
      universityCount: 4,
      statistics: { population: 450000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "sudan-del-sur-wau",
      name: "Wau",
      coordinates: {"lat": 7.70111, "lng": 27.98972},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 127384 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "South Sudan",
  capital: "Juba",
  currency: "SSP",
  language: "inglés",
  continent: "África",
  population: 12188788,
  cities,
  // Las universidades no van aqui: viven en ./universities/sudan-del-sur.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 2,
  aliases: ["south-sudan", "sudan-del-sur"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
