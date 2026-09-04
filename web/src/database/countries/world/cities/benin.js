// Universidades por ciudad de Benín. Generado; no editar a mano.
//
// Se carga bajo demanda al abrir una ciudad, no en el arranque del globo.
// Cada universidad lleva en un comentario a cuantos km del centro de la
// ciudad esta: es lo que justifica la asignacion, y permite revisarla. Las
// que quedaron a mas del radio no estan en ningun sitio, que es lo correcto.
//
// `type` va en null siempre: la fuente abierta no dice si es publica o
// privada. `website` solo aparece si el nombre cuadra exactamente con una
// entrada de Hipolabs.

import { defineUniversity } from "../../schema.js";

export default {
  "benin-cotonou": [
      defineUniversity({
        id: "benin-cotonou-cerco-institute",
        name: "Cerco Institute",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Cotonou (Wikidata).
      }),
      defineUniversity({
        id: "benin-cotonou-african-university-of-technology-and-management",
        name: "African University of Technology and Management",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Cotonou (Wikidata).
      }),
      defineUniversity({
        id: "benin-cotonou-university-of-science-and-technology-of-benin",
        name: "University of Science and Technology of Benin",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Cotonou (Wikidata).
      }),
      defineUniversity({
        id: "benin-cotonou-esep-le-berger",
        name: "Esep Le Berger",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Cotonou (Wikidata).
      }),
      defineUniversity({
        id: "benin-cotonou-esep-le-berger",
        name: "Esep Le Berger",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Cotonou (Wikidata).
      }),
      defineUniversity({
        id: "benin-cotonou-universite-irgib-africa",
        name: "Université IRGIB Africa",
        cityId: "benin-cotonou",
        website: null,
        source: "open-dataset",
        // Situada a 2.7 km del centro de Cotonou (Wikidata).
      }),
  ],
  "benin-godome": [
      defineUniversity({
        id: "benin-godome-seme-city",
        name: "Sèmè City",
        cityId: "benin-godome",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Godomè (Wikidata).
      }),
      defineUniversity({
        id: "benin-godome-institut-superieur-des-metiers-de-l-audiovisuel",
        name: "Institut Supérieur des Métiers de l’Audiovisuel",
        cityId: "benin-godome",
        website: null,
        source: "open-dataset",
        // Situada a 4.5 km del centro de Godomè (Wikidata).
      }),
      defineUniversity({
        id: "benin-godome-institut-superieur-des-metiers-de-l-audiovisuel",
        name: "Institut Supérieur des Métiers de l’Audiovisuel",
        cityId: "benin-godome",
        website: null,
        source: "open-dataset",
        // Situada a 4.5 km del centro de Godomè (Wikidata).
      }),
  ],
  "benin-ketou": [
      defineUniversity({
        id: "benin-ketou-national-university-of-agriculture",
        name: "National University of Agriculture",
        cityId: "benin-ketou",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Kétou (Wikidata).
      }),
      defineUniversity({
        id: "benin-ketou-universite-d-agriculture-de-ketou",
        name: "Université d'Agriculture de Kétou",
        cityId: "benin-ketou",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Kétou (Wikidata).
      }),
  ],
  "benin-abomey-calavi": [
      defineUniversity({
        id: "benin-abomey-calavi-escae-university-benin",
        name: "ESCAE-University, Benin",
        cityId: "benin-abomey-calavi",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Abomey-Calavi (Wikidata).
      }),
      defineUniversity({
        id: "benin-abomey-calavi-university-of-abomey-calavi",
        name: "University of Abomey-Calavi",
        cityId: "benin-abomey-calavi",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Abomey-Calavi (Wikidata).
      }),
  ],
  "benin-abomey": [
      defineUniversity({
        id: "benin-abomey-national-university-of-sciences-technologies-engineering-and-mathematics",
        name: "National University of Sciences, Technologies, Engineering and Mathematics",
        cityId: "benin-abomey",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Abomey (Wikidata).
      }),
      defineUniversity({
        id: "benin-abomey-national-university-of-sciences-technologies-engineering-and-mathematics",
        name: "National University of Sciences, Technologies, Engineering and Mathematics",
        cityId: "benin-abomey",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Abomey (Wikidata).
      }),
  ],
};
