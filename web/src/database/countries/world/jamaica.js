// Jamaica — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "jamaica";
const countryName = "Jamaica";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/jamaica.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "jamaica-new-kingston",
      name: "New Kingston",
      coordinates: {"lat": 18.00747, "lng": -76.78319},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 583958 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "jamaica-kingston",
      name: "Kingston",
      coordinates: {"lat": 17.99702, "lng": -76.79358},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 937700 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Jamaica",
  capital: "Kingston",
  currency: "JMD",
  language: "inglés",
  continent: "América",
  population: 2837077,
  cities,
  // Las universidades no van aqui: viven en ./universities/jamaica.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 3,
  aliases: ["jamaica"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
