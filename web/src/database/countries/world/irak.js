// Irak — importado, no curado.
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
  id: "irak",
  name: "Irak",
  nameEn: "Iraq",
  capital: "Baghdad",
  currency: "IQD",
  language: "Arabic",
  continent: "Asia",
  population: 47020774,
  // Sin ciudades: la fuente de universidades trae provincia en solo el 14% de
  // los casos, y provincia no es ciudad. Inventar el reparto por ciudades
  // seria la peor clase de dato falso, porque parece preciso.
  cities: [],
  // Las universidades no van aqui: viven en ./universities/irak.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 47,
  aliases: ["irak", "iraq"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "mledoze/countries (ODbL-1.0)", "Banco Mundial, SP.POP.TOTL"],
});
