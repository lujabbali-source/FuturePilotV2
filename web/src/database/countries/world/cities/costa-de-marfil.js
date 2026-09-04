// Universidades por ciudad de Costa de Marfil. Generado; no editar a mano.
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
  "costa-de-marfil-abidjan": [
      defineUniversity({
        id: "costa-de-marfil-abidjan-felix-houphouet-boigny-university",
        name: "Félix Houphouët Boigny University",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-universite-saint-joseph-cote-d-ivoire",
        name: "Université Saint-Joseph Côte d'Ivoire",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-ecole-normale-superieure-abidjan",
        name: "École Normale Supérieure Abidjan",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-ecole-superieure-africaine-des-technologies-de-l-information-et-de-la-communication",
        name: "Ecole Supérieure Africaine des Technologies de l'Information et de la Communication",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-graduate-school-of-management-abidjan",
        name: "Graduate School of Management Abidjan",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-hec-abidjan",
        name: "HEC Abidjan",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-institut-national-des-arts-et-de-l-action-culturelle",
        name: "Institut National des Arts et de l'Action Culturelle",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-institut-universitaire-d-abidjan",
        name: "Institut universitaire d'Abidjan",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-virtual-university-of-cote-d-ivoire",
        name: "Virtual University of Côte d'Ivoire",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-cifad",
        name: "CIFAD",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-abidjan-university-of-the-lagoons",
        name: "University of the Lagoons",
        cityId: "costa-de-marfil-abidjan",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Abidjan (Wikidata).
      }),
  ],
  "costa-de-marfil-san-pedro": [
      defineUniversity({
        id: "costa-de-marfil-san-pedro-university-of-san-pedro",
        name: "University of San Pedro",
        cityId: "costa-de-marfil-san-pedro",
        website: null,
        source: "open-dataset",
        // Situada a 8.1 km del centro de San-Pédro (Wikidata).
      }),
  ],
  "costa-de-marfil-marcory": [
      defineUniversity({
        id: "costa-de-marfil-marcory-universite-catholique-de-l-afrique-de-l-ouest",
        name: "Université Catholique de l'Afrique de l'Ouest",
        cityId: "costa-de-marfil-marcory",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Marcory (Wikidata).
      }),
      defineUniversity({
        id: "costa-de-marfil-marcory-higher-institute-of-technology-of-ivory-coast",
        name: "Higher Institute of Technology of Ivory Coast",
        cityId: "costa-de-marfil-marcory",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Marcory (Wikidata).
      }),
  ],
};
