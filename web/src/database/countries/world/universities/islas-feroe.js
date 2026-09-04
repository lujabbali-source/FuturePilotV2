// Universidades de Islas Feroe. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "islas-feroe-university-of-the-faroe-islands",
      name: "University of the Faroe Islands",
      cityId: null,
      website: "http://www.setur.fo/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
