// Universidades de Guayana Francesa. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "guayana-francesa-universite-des-antilles-et-de-la-guyane",
      name: "Université des Antilles et de la Guyane",
      cityId: null,
      website: "http://www.univ-ag.fr/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
