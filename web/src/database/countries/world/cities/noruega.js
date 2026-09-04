// Universidades por ciudad de Noruega. Generado; no editar a mano.
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
  "noruega-oslo": [
      defineUniversity({
        id: "noruega-oslo-norwegian-military-academy",
        name: "Norwegian Military Academy",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a 6.8 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-norwegian-school-of-sport-sciences",
        name: "Norwegian School of Sport Sciences",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-oslo-metropolitan-university",
        name: "Oslo Metropolitan University",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-university-of-oslo",
        name: "University of Oslo",
        cityId: "noruega-oslo",
        website: "http://www.uio.no/",
        source: "open-dataset",
        // Situada a 3.3 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-mf-norwegian-school-of-theology",
        name: "MF Norwegian School of Theology",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-rudolf-steiner-university-college",
        name: "Rudolf Steiner University College",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-norwegian-military-college",
        name: "Norwegian Military College",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Oslo (Wikidata).
      }),
      defineUniversity({
        id: "noruega-oslo-folkeuniversitet",
        name: "Folkeuniversitet",
        cityId: "noruega-oslo",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Oslo (Wikidata).
      }),
  ],
  "noruega-trondheim": [
      defineUniversity({
        id: "noruega-trondheim-norwegian-institute-of-technology",
        name: "Norwegian Institute of Technology",
        cityId: "noruega-trondheim",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Trondheim (Wikidata).
      }),
      defineUniversity({
        id: "noruega-trondheim-norwegian-university-of-science-and-technology",
        name: "Norwegian University of Science and Technology",
        cityId: "noruega-trondheim",
        website: "http://www.ntnu.no/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Trondheim (Wikidata).
      }),
      defineUniversity({
        id: "noruega-trondheim-royal-norwegian-air-force-academy",
        name: "Royal Norwegian Air Force Academy",
        cityId: "noruega-trondheim",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Trondheim (Wikidata).
      }),
  ],
  "noruega-troms": [
      defineUniversity({
        id: "noruega-troms-fjellheim-bible-school",
        name: "Fjellheim bible school",
        cityId: "noruega-troms",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Tromsø (Wikidata).
      }),
      defineUniversity({
        id: "noruega-troms-university-of-troms-the-arctic-university-of-norway",
        name: "University of Tromsø – The Arctic University of Norway",
        cityId: "noruega-troms",
        website: null,
        source: "open-dataset",
        // Situada a 3.6 km del centro de Tromsø (Wikidata).
      }),
      defineUniversity({
        id: "noruega-troms-centre-of-marine-resource-management",
        name: "Centre of Marine Resource Management",
        cityId: "noruega-troms",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Tromsø (Wikidata).
      }),
  ],
  "noruega-stavanger": [
      defineUniversity({
        id: "noruega-stavanger-university-of-stavanger",
        name: "University of Stavanger",
        cityId: "noruega-stavanger",
        website: "http://www.uis.no/",
        source: "open-dataset",
        // Situada a 4.2 km del centro de Stavanger (Wikidata).
      }),
  ],
  "noruega-bod": [
      defineUniversity({
        id: "noruega-bod-university-of-nordland",
        name: "University of Nordland",
        cityId: "noruega-bod",
        website: null,
        source: "open-dataset",
        // Situada a 8.0 km del centro de Bodø (Wikidata).
      }),
      defineUniversity({
        id: "noruega-bod-nord-university",
        name: "Nord University",
        cityId: "noruega-bod",
        website: null,
        source: "open-dataset",
        // Situada a 8.0 km del centro de Bodø (Wikidata).
      }),
  ],
  "noruega-bergen": [
      defineUniversity({
        id: "noruega-bergen-university-of-bergen",
        name: "University of Bergen",
        cityId: "noruega-bergen",
        website: "http://www.uib.no/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Bergen (Wikidata).
      }),
      defineUniversity({
        id: "noruega-bergen-royal-norwegian-naval-academy",
        name: "Royal Norwegian Naval Academy",
        cityId: "noruega-bergen",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Bergen (Wikidata).
      }),
  ],
};
