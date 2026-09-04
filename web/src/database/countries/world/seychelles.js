// Seychelles — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "seychelles";
const countryName = "Seychelles";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/seychelles.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "seychelles-victoria",
      name: "Victoria",
      coordinates: {"lat": -4.62001, "lng": 55.45501},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 22881 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Seychelles",
  capital: "Victoria",
  currency: "SCR",
  language: "inglés",
  continent: "África",
  population: 122730,
  cities,
  // Las universidades no van aqui: viven en ./universities/seychelles.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 2,
  aliases: ["seychelles"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
