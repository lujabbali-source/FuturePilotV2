// Universidades por ciudad de Macedonia del Norte. Generado; no editar a mano.
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
  "macedonia-del-norte-skopje": [
      defineUniversity({
        id: "macedonia-del-norte-skopje-fon-university",
        name: "FON University",
        cityId: "macedonia-del-norte-skopje",
        website: "http://www.fon.edu.mk/",
        source: "open-dataset",
        // Situada a 3.6 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-military-academy-of-north-macedonia",
        name: "Military Academy of North Macedonia",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-international-balkan-university",
        name: "International Balkan University",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-european-university",
        name: "European University",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-accademia-italiana-skopje",
        name: "Accademia Italiana Skopje",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-university-of-tourism-and-management",
        name: "University of Tourism and Management",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 2.5 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-ss-cyril-and-methodius-university-of-skopje",
        name: "Ss. Cyril and Methodius University of Skopje",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Skopje (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-skopje-university-american-college-skopje",
        name: "University American College Skopje",
        cityId: "macedonia-del-norte-skopje",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Skopje (Wikidata).
      }),
  ],
  "macedonia-del-norte-shtip": [
      defineUniversity({
        id: "macedonia-del-norte-shtip-goce-delcev-university-of-stip",
        name: "Goce Delčev University of Štip",
        cityId: "macedonia-del-norte-shtip",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Shtip (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-shtip-novo-selo-school-stip",
        name: "Novo Selo School, Štip",
        cityId: "macedonia-del-norte-shtip",
        website: null,
        source: "open-dataset",
        // Situada a 1.6 km del centro de Shtip (Wikidata).
      }),
  ],
  "macedonia-del-norte-cair": [
      defineUniversity({
        id: "macedonia-del-norte-cair-mother-teresa-university-in-skopje",
        name: "Mother Teresa University in Skopje",
        cityId: "macedonia-del-norte-cair",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Čair (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-cair-faculty-of-agricultural-science-and-food-in-skopje",
        name: "Faculty of Agricultural Science and Food in Skopje",
        cityId: "macedonia-del-norte-cair",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Čair (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-cair-institute-of-animal-biotechnology",
        name: "Institute of Animal Biotechnology",
        cityId: "macedonia-del-norte-cair",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Čair (Wikidata).
      }),
  ],
  "macedonia-del-norte-struga": [
      defineUniversity({
        id: "macedonia-del-norte-struga-international-university-of-struga",
        name: "International University of Struga",
        cityId: "macedonia-del-norte-struga",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Struga (Wikidata).
      }),
      defineUniversity({
        id: "macedonia-del-norte-struga-international-university-of-struga",
        name: "International University of Struga",
        cityId: "macedonia-del-norte-struga",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Struga (Wikidata).
      }),
  ],
};
