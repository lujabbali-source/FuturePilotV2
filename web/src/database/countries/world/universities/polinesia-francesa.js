// Universidades de Polinesia Francesa. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "polinesia-francesa-universite-de-la-polynesie-francaise",
      name: "Université de la Polynésie Française",
      cityId: null,
      website: "http://www.upf.pf/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
