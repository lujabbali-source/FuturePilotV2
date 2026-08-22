// Universidades de Benín. Generado; no editar a mano.
// Se carga bajo demanda: ver getNationalUniversities en countryService.

import { defineUniversity } from "../../schema";

export default [
    defineUniversity({
      id: "benin-espam-formation-university",
      name: "Espam Formation University",
      cityId: null,
      website: "http://www.espam-formationuc.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "benin-houdegbe-north-american-university-benin",
      name: "Houdegbe North American University Benin",
      cityId: null,
      website: "http://www.hnaubenin.org/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
    defineUniversity({
      id: "benin-universite-d-abomey-calavi-uac",
      name: "Université d'Abomey-Calavi (UAC)",
      cityId: null,
      website: "http://www.uac.bj/",
      // La fuente abierta no dice si es publica o privada.
      // Se queda en null: una etiqueta adivinada se ve igual
      // que una cierta, y por eso es peor que ninguna.
      type: null,
      source: "open-dataset",
    }),
];
