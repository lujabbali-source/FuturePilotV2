// Universidades de Seychelles. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "seychelles-university-of-seychelles",
      name: "University of Seychelles",
      cityId: null,
      website: "http://www.unisey.ac.sc/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "seychelles-university-of-seychelles-american-institute-of-medicine",
      name: "University of Seychelles - American Institute of Medicine",
      cityId: null,
      website: "http://www.usaim.edu/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
