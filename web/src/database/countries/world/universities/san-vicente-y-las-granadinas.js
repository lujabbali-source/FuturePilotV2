// Universidades de San Vicente y las Granadinas. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "san-vicente-y-las-granadinas-trinity-university-school-of-medicine",
      name: "Trinity University School of Medicine",
      cityId: null,
      website: "http://www.tusom.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
