// Trinidad y Tobago — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "trinidad-y-tobago";
const countryName = "Trinidad y Tobago";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/trinidad-y-tobago.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "trinidad-y-tobago-tunapuna",
      name: "Tunapuna",
      coordinates: {"lat": 10.65245, "lng": -61.38878},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 17758 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Trinidad and Tobago",
  capital: "Port of Spain",
  currency: "TTD",
  language: "inglés",
  continent: "América",
  population: 1367764,
  cities,
  // Las universidades no van aqui: viven en ./universities/trinidad-y-tobago.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 3,
  aliases: ["trinidad-and-tobago", "trinidad-y-tobago"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
