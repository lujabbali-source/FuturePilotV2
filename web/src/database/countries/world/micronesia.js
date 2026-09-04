// Micronesia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCountry } from "../schema.js";

const countryId = "micronesia";
const countryName = "Micronesia";

// Sin ciudades: la fuente no le conoce ninguna universidad
// a este pais. No es que no las tenga; es que no constan.
const cities = [

];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Micronesia",
  capital: "Palikir",
  currency: "USD",
  language: "inglés",
  continent: "Oceanía",
  population: 113683,
  cities,
  // Las universidades no van aqui: viven en ./universities/micronesia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 0,
  aliases: ["micronesia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
