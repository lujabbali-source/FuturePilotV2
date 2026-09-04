// Universidades por ciudad de Armenia. Generado; no editar a mano.
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
  "armenia-kentron": [
      defineUniversity({
        id: "armenia-kentron-northern-university",
        name: "Northern University",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-yerevan-state-university",
        name: "Yerevan State University",
        cityId: "armenia-kentron",
        website: "http://www.ysu.am/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-armenian-state-pedagogical-university",
        name: "Armenian State Pedagogical University",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-armenian-state-university-of-economics",
        name: "Armenian State University of Economics",
        cityId: "armenia-kentron",
        website: "http://www.asue.am/",
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-agribusiness-teaching-center",
        name: "Agribusiness Teaching Center",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-hrachia-adjarian-university",
        name: "Hrachia Adjarian University",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 1.5 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-yerevan-state-institute-of-theatre-and-cinematography",
        name: "Yerevan State Institute of Theatre and Cinematography",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-armenian-national-agrarian-university",
        name: "Armenian National Agrarian University",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 1.4 km del centro de Kentron (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kentron-national-polytechnic-university-of-armenia",
        name: "National Polytechnic University of Armenia",
        cityId: "armenia-kentron",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Kentron (Wikidata).
      }),
  ],
  "armenia-kanaker-zeytun": [
      defineUniversity({
        id: "armenia-kanaker-zeytun-fondation-universite-francaise-en-armenie",
        name: "Fondation Université Française en Arménie",
        cityId: "armenia-kanaker-zeytun",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Kanaker-Zeytun (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kanaker-zeytun-european-university-of-armenia",
        name: "European University of Armenia",
        cityId: "armenia-kanaker-zeytun",
        website: null,
        source: "open-dataset",
        // Situada a 2.0 km del centro de Kanaker-Zeytun (Wikidata).
      }),
      defineUniversity({
        id: "armenia-kanaker-zeytun-eurasia-international-university",
        name: "Eurasia International University",
        cityId: "armenia-kanaker-zeytun",
        website: "http://www.eiu.am/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Kanaker-Zeytun (Wikidata).
      }),
  ],
  "armenia-gyumri": [
      defineUniversity({
        id: "armenia-gyumri-shirak-state-university-named-after-mikayel-nalbandian",
        name: "Shirak State University named after Mikayel Nalbandian",
        cityId: "armenia-gyumri",
        website: null,
        source: "open-dataset",
        // Situada a 4.3 km del centro de Gyumri (Wikidata).
      }),
  ],
  "armenia-abovyan": [
      defineUniversity({
        id: "armenia-abovyan-armenak-khanperyants-military-aviation-university",
        name: "Armenak Khanperyants Military Aviation University",
        cityId: "armenia-abovyan",
        website: null,
        source: "open-dataset",
        // Situada a 5.4 km del centro de Abovyan (Wikidata).
      }),
      defineUniversity({
        id: "armenia-abovyan-armenak-khanperyants-military-aviation-university",
        name: "Armenak Khanperyants Military Aviation University",
        cityId: "armenia-abovyan",
        website: null,
        source: "open-dataset",
        // Situada a 5.4 km del centro de Abovyan (Wikidata).
      }),
  ],
};
