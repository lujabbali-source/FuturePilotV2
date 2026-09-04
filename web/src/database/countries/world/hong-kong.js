// Hong Kong — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCountry } from "../schema.js";

const countryId = "hong-kong";
const countryName = "Hong Kong";

// Sin ciudades: Hipolabs le ve 15 universidades, pero
// Wikidata solo situa 1 ciudad(es) que llegue(n) al minimo
// de 2. Es un hueco de la fuente, NO que el pais no tenga
// universidades. Se cura a mano o con otra fuente.
const cities = [

];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Hong Kong",
  capital: "Hong Kong",
  currency: "HKD",
  language: "chino",
  continent: "Asia",
  population: 7498900,
  cities,
  // Las universidades no van aqui: viven en ./universities/hong-kong.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["hong-kong"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
