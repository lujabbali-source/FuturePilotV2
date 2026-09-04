// Universidades de Corea del Norte. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "corea-del-norte-pyongyang-university-of-science-and-technology",
      name: "Pyongyang University of Science and Technology",
      cityId: null,
      website: "http://www.pust.net/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
