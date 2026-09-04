// Nueva Caledonia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCountry } from "../schema.js";

const countryId = "nueva-caledonia";
const countryName = "Nueva Caledonia";

// Sin ciudades: Hipolabs le ve 1 universidades, pero
// Wikidata solo situa 0 ciudad(es) que llegue(n) al minimo
// de 2. Es un hueco de la fuente, NO que el pais no tenga
// universidades. Se cura a mano o con otra fuente.
const cities = [

];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "New Caledonia",
  capital: "Noumea",
  currency: "XPF",
  language: "francés",
  continent: "Oceanía",
  population: 295333,
  cities,
  // Las universidades no van aqui: viven en ./universities/nueva-caledonia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["new-caledonia", "nueva-caledonia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
