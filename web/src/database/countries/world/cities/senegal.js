// Universidades por ciudad de Senegal. Generado; no editar a mano.
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
  "senegal-dakar": [
      defineUniversity({
        id: "senegal-dakar-dakar-institute-of-technology",
        name: "Dakar Institute of Technology",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a 3.1 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-dakar-bourguiba-university",
        name: "Dakar Bourguiba University",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-universite-euro-afrique",
        name: "Université Euro-Afrique",
        cityId: "senegal-dakar",
        website: "http://www.uea.edu.sn/",
        source: "open-dataset",
        // Situada a 3.9 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-universite-dakar-bourguiba",
        name: "Université Dakar Bourguiba",
        cityId: "senegal-dakar",
        website: "http://www.udb.sn/",
        source: "open-dataset",
        // Situada a 2.9 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-ecole-superieure-multinationale-des-telecommunications",
        name: "Ecole Supérieure Multinationale des Télécommunications",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-universite-cheikh-anta-diop",
        name: "Université Cheikh Anta Diop",
        cityId: "senegal-dakar",
        website: "http://www.ucad.sn/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-universite-des-sciences-de-la-sante-de-dakar",
        name: "Université des Sciences de la Santé de Dakar",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-institut-polytechnique-panafricain",
        name: "Institut Polytechnique Panafricain",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-institut-africain-de-management",
        name: "Institut Africain de Management",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-institut-superieur-d-informatique",
        name: "Institut Supérieur d'Informatique",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-institut-superieur-de-droit-de-dakar",
        name: "Institut Supérieur de Droit de Dakar",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-euromed-universite",
        name: "EUROMED Université",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-icagi-amadou-mahtar-mbow",
        name: "ICAGI Amadou Mahtar Mbow",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-hec-dakar-business-school",
        name: "HEC Dakar Business School",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-inseps-ucad",
        name: "INSEPS UCAD",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
      defineUniversity({
        id: "senegal-dakar-isfad-ucad",
        name: "ISFAD UCAD",
        cityId: "senegal-dakar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Dakar (Wikidata).
      }),
  ],
  "senegal-saint-louis": [
      defineUniversity({
        id: "senegal-saint-louis-universite-kocc-barma-saint-louis",
        name: "Université Kocc Barma Saint-Louis",
        cityId: "senegal-saint-louis",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Saint-Louis (Wikidata).
      }),
      defineUniversity({
        id: "senegal-saint-louis-universite-gaston-berger",
        name: "Université Gaston Berger",
        cityId: "senegal-saint-louis",
        website: null,
        source: "open-dataset",
        // Situada a 8.4 km del centro de Saint-Louis (Wikidata).
      }),
  ],
  "senegal-kaolack": [
      defineUniversity({
        id: "senegal-kaolack-universite-sine-saloum-el-hadji-ibrahima-niasse",
        name: "Université Sine-Saloum El Hadji Ibrahima Niasse",
        cityId: "senegal-kaolack",
        website: null,
        source: "open-dataset",
        // Situada a 5.9 km del centro de Kaolack (Wikidata).
      }),
      defineUniversity({
        id: "senegal-kaolack-universite-el-hadji-ibrahima-niasse",
        name: "Université El Hadji Ibrahima Niasse",
        cityId: "senegal-kaolack",
        website: null,
        source: "open-dataset",
        // Situada a 5.9 km del centro de Kaolack (Wikidata).
      }),
  ],
  "senegal-diamniadio": [
      defineUniversity({
        id: "senegal-diamniadio-universite-amadou-mahtar-mbow",
        name: "Université Amadou Mahtar Mbow",
        cityId: "senegal-diamniadio",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Diamniadio (Wikidata).
      }),
      defineUniversity({
        id: "senegal-diamniadio-amadou-mahtar-m-bow-university",
        name: "Amadou-Mahtar M'Bow University",
        cityId: "senegal-diamniadio",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Diamniadio (Wikidata).
      }),
  ],
  "senegal-le-plateau": [
      defineUniversity({
        id: "senegal-le-plateau-brighton-international-university",
        name: "Brighton International University",
        cityId: "senegal-le-plateau",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Le Plateau (Wikidata).
      }),
  ],
};
