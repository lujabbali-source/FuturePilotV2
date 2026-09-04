// Universidades de Santa Lucía. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "santa-lucia-spartan-university-of-health-sciences",
      name: "Spartan University of Health Sciences",
      cityId: null,
      website: "http://www.spartanmed.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
