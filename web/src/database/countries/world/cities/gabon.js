// Universidades por ciudad de Gabón. Generado; no editar a mano.
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
  "gabon-libreville": [
      defineUniversity({
        id: "gabon-libreville-universite-africaine-des-sciences",
        name: "Université Africaine des Sciences",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a 5.5 km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-universite-omar-bongo",
        name: "Université Omar Bongo",
        cityId: "gabon-libreville",
        website: "http://www.uob.ga/",
        source: "open-dataset",
        // Situada a 3.4 km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-ecole-normale-superieure-de-libreville",
        name: "École Normale Supérieure de Libreville",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a 3.8 km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-african-university-of-management-and-technologies",
        name: "African University of Management and Technologies",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-ecole-superieure-de-gestion-d-informatique-et-des-sciences",
        name: "Ecole Superieure de Gestion d'Informatique et des Sciences",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-franco-gabonese-university-saint-exupery",
        name: "Franco-Gabonese University Saint-Exupery",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-higher-school-of-arts-and-crafts",
        name: "Higher School of Arts and Crafts",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-higher-school-of-management-and-accounting-expertise",
        name: "Higher School of Management and Accounting Expertise",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-institute-of-advanced-techniques",
        name: "Institute of Advanced Techniques",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-national-institute-of-post-information-and-communication-technologies",
        name: "National Institute of Post Information and Communication Technologies",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
      defineUniversity({
        id: "gabon-libreville-university-institute-of-science-of-the-organization",
        name: "University Institute of Science of the Organization",
        cityId: "gabon-libreville",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Libreville (Wikidata).
      }),
  ],
};
