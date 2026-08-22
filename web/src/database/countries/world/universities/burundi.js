// Universidades de Burundi. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "burundi-hope-africa-university",
      name: "Hope Africa University",
      cityId: null,
      website: "http://hopeafricauniversity.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "burundi-universite-lumiere-de-bujumbura",
      name: "Université Lumière de Bujumbura",
      cityId: null,
      website: "http://www.ulbu.bi/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "burundi-universite-du-burundi",
      name: "Université du Burundi",
      cityId: null,
      website: "http://www.ub.edu.bi/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
