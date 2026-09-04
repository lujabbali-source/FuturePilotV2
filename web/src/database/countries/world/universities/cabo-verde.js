// Universidades de Cabo Verde. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "cabo-verde-universidade-jean-piaget-de-cabo-verde",
      name: "Universidade Jean Piaget de Cabo Verde",
      cityId: null,
      website: "http://cv.unipiaget.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
