// Universidades por ciudad de Malaui. Generado; no editar a mano.
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
  "malaui-lilongwe": [
      defineUniversity({
        id: "malaui-lilongwe-malawi-adventist-university",
        name: "Malawi Adventist University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a 9.5 km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-african-bible-college",
        name: "African Bible College",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-daeyang-university",
        name: "Daeyang University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-jubilee-university",
        name: "Jubilee University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-malawi-assemblies-of-god-university",
        name: "Malawi Assemblies of God University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-nkhoma-university",
        name: "Nkhoma University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-pentecostal-life-university",
        name: "Pentecostal Life University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-shareworld-open-university-malawi",
        name: "ShareWorld Open University Malawi",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-unicaf-university",
        name: "UNICAF University",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-university-of-lilongwe",
        name: "University of Lilongwe",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
      defineUniversity({
        id: "malaui-lilongwe-african-bible-colleges",
        name: "African Bible Colleges",
        cityId: "malaui-lilongwe",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Lilongwe (Wikidata).
      }),
  ],
  "malaui-blantyre": [
      defineUniversity({
        id: "malaui-blantyre-catholic-university-of-malawi",
        name: "Catholic University of Malawi",
        cityId: "malaui-blantyre",
        website: "http://www.cunima.net/",
        source: "open-dataset",
        // Situada a 18.5 km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-malawi-university-of-science-and-technology",
        name: "Malawi University of Science and Technology",
        cityId: "malaui-blantyre",
        website: "http://www.must.ac.mw/",
        source: "open-dataset",
        // Situada a 25.8 km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-blantyre-international-university",
        name: "Blantyre International University",
        cityId: "malaui-blantyre",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-central-christian-university",
        name: "Central Christian University",
        cityId: "malaui-blantyre",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-malawi-college-of-accountancy",
        name: "Malawi College of Accountancy",
        cityId: "malaui-blantyre",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Blantyre (Wikidata).
      }),
      defineUniversity({
        id: "malaui-blantyre-university-of-blantyre-synod",
        name: "University of Blantyre Synod",
        cityId: "malaui-blantyre",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Blantyre (Wikidata).
      }),
  ],
  "malaui-zomba": [
      defineUniversity({
        id: "malaui-zomba-zomba-theological-college",
        name: "Zomba Theological College",
        cityId: "malaui-zomba",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Zomba (Wikidata).
      }),
      defineUniversity({
        id: "malaui-zomba-university-of-malawi",
        name: "University of Malawi",
        cityId: "malaui-zomba",
        website: "http://www.unima.ac.mw/",
        source: "open-dataset",
        // Situada a 1.1 km del centro de Zomba (Wikidata).
      }),
  ],
};
