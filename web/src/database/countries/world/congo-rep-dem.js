// Congo (Rep. Dem.) — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion y las universidades con su sitio oficial. Todo lo demas
// (ciudades, costo de vida, salarios, cultura) esta vacio a proposito. Ver
// web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCountry, defineUniversity } from "../schema";

export default defineCountry({
  id: "congo-rep-dem",
  name: "Congo (Rep. Dem.)",
  nameEn: "DR Congo",
  capital: "Kinshasa",
  currency: "CDF",
  language: "French",
  continent: "África",
  population: 112832473,
  // Sin ciudades: la fuente de universidades trae provincia en solo el 14% de
  // los casos, y provincia no es ciudad. Inventar el reparto por ciudades
  // seria la peor clase de dato falso, porque parece preciso.
  cities: [],
  // Las universidades no van aqui: viven en ./universities/congo-rep-dem.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["congo-rep-dem", "dr-congo"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "mledoze/countries (ODbL-1.0)", "Banco Mundial, SP.POP.TOTL"],
});
