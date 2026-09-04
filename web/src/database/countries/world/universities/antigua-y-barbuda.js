// Universidades de Antigua y Barbuda. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "antigua-y-barbuda-american-university-of-antigua",
      name: "American University of Antigua",
      cityId: null,
      website: "http://www.auamed.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "antigua-y-barbuda-university-of-health-sciences-antigua",
      name: "University of Health Sciences Antigua",
      cityId: null,
      website: "http://www.uhsa.ag/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
