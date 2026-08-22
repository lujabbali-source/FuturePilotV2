// Universidades de Barbados. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "barbados-university-of-the-west-indies-cave-hill",
      name: "University of the West Indies, Cave Hill",
      cityId: null,
      website: "http://www.uwichill.edu.bb/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
