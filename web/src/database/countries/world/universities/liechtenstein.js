// Universidades de Liechtenstein. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "liechtenstein-internationle-akademie-fur-philosophie",
      name: "Internationle Akademie für Philosophie",
      cityId: null,
      website: "http://www.iap.li/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "liechtenstein-universitat-liechtenstein",
      name: "Universität Liechtenstein",
      cityId: null,
      website: "http://www.uni.li/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
