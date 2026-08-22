// Universidades de Sudán del Sur. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "sudan-del-sur-university-of-juba",
      name: "University of Juba",
      cityId: null,
      website: "http://www.juba.edu.sd/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "sudan-del-sur-university-of-northern-bahr-el-ghazal",
      name: "University of Northern Bahr El-Ghazal",
      cityId: null,
      website: "http://www.unbeg.edu.sd/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
