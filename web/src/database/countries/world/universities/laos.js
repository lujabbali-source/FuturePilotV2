// Universidades de Laos. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "laos-national-university-of-laos",
      name: "National University of Laos",
      cityId: null,
      website: "https://www.nuol.edu.la/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "laos-soutsaka-institute-of-technology",
      name: "Soutsaka Institute of Technology",
      cityId: null,
      website: "https://www.scmt.edu.la/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
