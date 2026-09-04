// Universidades de Maldivas. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "maldivas-cyryx-college",
      name: "Cyryx College",
      cityId: null,
      website: "http://www.cyryxcollege.edu.mv/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "maldivas-maldives-national-university",
      name: "Maldives National University",
      cityId: null,
      website: "http://www.mnu.edu.mv/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "maldivas-mandhu-college",
      name: "Mandhu College",
      cityId: null,
      website: "https://www.mandhucollege.edu.mv/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
