// Universidades de Jamaica. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema.js";

export default [
    defineUniversity({
      id: "jamaica-northern-caribbean-university",
      name: "Northern Caribbean University",
      cityId: null,
      website: "http://www.ncu.edu.jm/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "jamaica-university-of-technology-jamaica",
      name: "University of Technology Jamaica",
      cityId: null,
      website: "http://www.utech.edu.jm/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "jamaica-university-of-the-west-indies-mona",
      name: "University of the West Indies, Mona",
      cityId: null,
      website: "http://www.uwimona.edu.jm/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
