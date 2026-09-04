// Universidades por ciudad de Finlandia. Generado; no editar a mano.
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
  "finlandia-helsinki": [
      defineUniversity({
        id: "finlandia-helsinki-naval-academy",
        name: "Naval Academy",
        cityId: "finlandia-helsinki",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Helsinki (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-helsinki-hanken-school-of-economics",
        name: "Hanken School of Economics",
        cityId: "finlandia-helsinki",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Helsinki (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-helsinki-university-of-helsinki",
        name: "University of Helsinki",
        cityId: "finlandia-helsinki",
        website: "http://www.helsinki.fi/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Helsinki (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-helsinki-university-of-helsinki",
        name: "University of Helsinki",
        cityId: "finlandia-helsinki",
        website: "http://www.helsinki.fi/",
        source: "open-dataset",
        // Situada a 0.8 km del centro de Helsinki (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-helsinki-university-of-the-arts-helsinki",
        name: "University of the Arts Helsinki",
        cityId: "finlandia-helsinki",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Helsinki (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-helsinki-sibelius-academy",
        name: "Sibelius Academy",
        cityId: "finlandia-helsinki",
        website: "http://www.siba.fi/",
        source: "open-dataset",
        // Situada a 0.3 km del centro de Helsinki (Wikidata).
      }),
  ],
  "finlandia-turku": [
      defineUniversity({
        id: "finlandia-turku-royal-academy-of-turku",
        name: "Royal Academy of Turku",
        cityId: "finlandia-turku",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Turku (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-turku-university-of-turku",
        name: "University of Turku",
        cityId: "finlandia-turku",
        website: "http://www.utu.fi/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Turku (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-turku-abo-akademi-university",
        name: "Åbo Akademi University",
        cityId: "finlandia-turku",
        website: "http://www.abo.fi/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Turku (Wikidata).
      }),
  ],
  "finlandia-lappeenranta": [
      defineUniversity({
        id: "finlandia-lappeenranta-army-academy",
        name: "Army Academy",
        cityId: "finlandia-lappeenranta",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Lappeenranta (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-lappeenranta-lappeenranta-lahti-university-of-technology-lut",
        name: "Lappeenranta-Lahti University of Technology LUT",
        cityId: "finlandia-lappeenranta",
        website: null,
        source: "open-dataset",
        // Situada a 5.3 km del centro de Lappeenranta (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-lappeenranta-maanpuolustusopisto",
        name: "Maanpuolustusopisto",
        cityId: "finlandia-lappeenranta",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Lappeenranta (Wikidata).
      }),
  ],
  "finlandia-vaasa": [
      defineUniversity({
        id: "finlandia-vaasa-hanken-school-of-economics",
        name: "Hanken School of Economics",
        cityId: "finlandia-vaasa",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Vaasa (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-vaasa-university-of-vaasa",
        name: "University of Vaasa",
        cityId: "finlandia-vaasa",
        website: "http://www.uwasa.fi/",
        source: "open-dataset",
        // Situada a 1.6 km del centro de Vaasa (Wikidata).
      }),
  ],
  "finlandia-tampere": [
      defineUniversity({
        id: "finlandia-tampere-university-of-tampere",
        name: "University of Tampere",
        cityId: "finlandia-tampere",
        website: "http://www.uta.fi/",
        source: "open-dataset",
        // Situada a 0.7 km del centro de Tampere (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-tampere-tampere-university",
        name: "Tampere University",
        cityId: "finlandia-tampere",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Tampere (Wikidata).
      }),
  ],
  "finlandia-leppavaara": [
      defineUniversity({
        id: "finlandia-leppavaara-helsinki-university-of-technology",
        name: "Helsinki University of Technology",
        cityId: "finlandia-leppavaara",
        website: "http://www.hut.fi/",
        source: "open-dataset",
        // Situada a 3.1 km del centro de Leppävaara (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-leppavaara-aalto-university-school-of-engineering",
        name: "Aalto University School of Engineering",
        cityId: "finlandia-leppavaara",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Leppävaara (Wikidata).
      }),
  ],
  "finlandia-kuopio": [
      defineUniversity({
        id: "finlandia-kuopio-university-of-eastern-finland",
        name: "University of Eastern Finland",
        cityId: "finlandia-kuopio",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Kuopio (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-kuopio-university-of-kuopio",
        name: "University of Kuopio",
        cityId: "finlandia-kuopio",
        website: "http://www.uku.fi/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Kuopio (Wikidata).
      }),
  ],
  "finlandia-kallio": [
      defineUniversity({
        id: "finlandia-kallio-war-college",
        name: "War College",
        cityId: "finlandia-kallio",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kallio (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-kallio-war-college",
        name: "War College",
        cityId: "finlandia-kallio",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Kallio (Wikidata).
      }),
  ],
  "finlandia-hervanta": [
      defineUniversity({
        id: "finlandia-hervanta-tampere-university-of-technology",
        name: "Tampere University of Technology",
        cityId: "finlandia-hervanta",
        website: "http://www.tut.fi/",
        source: "open-dataset",
        // Situada a 0.4 km del centro de Hervanta (Wikidata).
      }),
      defineUniversity({
        id: "finlandia-hervanta-tampere-university",
        name: "Tampere University",
        cityId: "finlandia-hervanta",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Hervanta (Wikidata).
      }),
  ],
};
