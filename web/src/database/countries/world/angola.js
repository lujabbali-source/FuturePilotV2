// Angola — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "angola";
const countryName = "Angola";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/angola.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "angola-luanda",
      name: "Luanda",
      coordinates: {"lat": -8.83682, "lng": 13.23432},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 2776168 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "angola-vila-flor",
      name: "Vila Flor",
      coordinates: {"lat": -8.98007, "lng": 13.30781},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 256066 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Angola",
  capital: "Luanda",
  currency: "AOA",
  language: "portugués",
  continent: "África",
  population: 39040039,
  cities,
  // Las universidades no van aqui: viven en ./universities/angola.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 8,
  aliases: ["angola"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
