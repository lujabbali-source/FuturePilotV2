// Universidades de Islas Caimán. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "islas-caiman-international-college-of-the-cayman-islands",
      name: "International College of the Cayman Islands",
      cityId: null,
      website: "http://www.icci.edu.ky/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "islas-caiman-st-matthews-university",
      name: "St. Matthews University",
      cityId: null,
      website: "http://www.stmatthews.edu/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
