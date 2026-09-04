// Universidades por ciudad de Ruanda. Generado; no editar a mano.
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
  "ruanda-ndera": [
      defineUniversity({
        id: "ruanda-ndera-kigali-institute-of-education",
        name: "Kigali Institute of Education",
        cityId: "ruanda-ndera",
        website: "http://www.kie.ac.rw/",
        source: "open-dataset",
        // Situada a 5.3 km del centro de Ndera (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-ndera-adventist-university-of-central-africa",
        name: "Adventist University of Central Africa",
        cityId: "ruanda-ndera",
        website: "http://www.auca.ac.rw/",
        source: "open-dataset",
        // Situada a 3.3 km del centro de Ndera (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-ndera-adventist-university-of-central-africa",
        name: "Adventist University of Central Africa",
        cityId: "ruanda-ndera",
        website: "http://www.auca.ac.rw/",
        source: "open-dataset",
        // Situada a 3.3 km del centro de Ndera (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-ndera-african-leadership-university",
        name: "African Leadership University",
        cityId: "ruanda-ndera",
        website: null,
        source: "open-dataset",
        // Situada a 2.8 km del centro de Ndera (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-ndera-african-leadership-university",
        name: "African Leadership University",
        cityId: "ruanda-ndera",
        website: null,
        source: "open-dataset",
        // Situada a 3.0 km del centro de Ndera (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-ndera-kim-university",
        name: "KIM University",
        cityId: "ruanda-ndera",
        website: null,
        source: "open-dataset",
        // Situada a 3.2 km del centro de Ndera (Wikidata).
      }),
  ],
  "ruanda-kigali": [
      defineUniversity({
        id: "ruanda-kigali-mount-kigali-university",
        name: "Mount Kigali University",
        cityId: "ruanda-kigali",
        website: null,
        source: "open-dataset",
        // Situada a 6.1 km del centro de Kigali (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-kigali-african-centre-of-excellence-in-data-science",
        name: "African Centre of Excellence in Data Science",
        cityId: "ruanda-kigali",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Kigali (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-kigali-university-of-tourism",
        name: "UNIVERSITY OF TOURISM",
        cityId: "ruanda-kigali",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Kigali (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-kigali-university-of-global-health-equity",
        name: "University of Global Health Equity",
        cityId: "ruanda-kigali",
        website: null,
        source: "open-dataset",
        // Situada a 3.5 km del centro de Kigali (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-kigali-university-of-lay-adventists-of-kigali",
        name: "University of Lay Adventists of Kigali",
        cityId: "ruanda-kigali",
        website: null,
        source: "open-dataset",
        // Situada a 4.6 km del centro de Kigali (Wikidata).
      }),
  ],
  "ruanda-butare": [
      defineUniversity({
        id: "ruanda-butare-catholic-university-of-rwanda",
        name: "Catholic University of Rwanda",
        cityId: "ruanda-butare",
        website: null,
        source: "open-dataset",
        // Situada a 3.3 km del centro de Butare (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-butare-saint-charles-borromeo-major-seminary-of-nyakibanda",
        name: "Saint Charles Borromeo Major Seminary of Nyakibanda",
        cityId: "ruanda-butare",
        website: null,
        source: "open-dataset",
        // Situada a 15.7 km del centro de Butare (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-butare-university-of-rwanda",
        name: "University of Rwanda",
        cityId: "ruanda-butare",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Butare (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-butare-national-university-of-rwanda",
        name: "National University of Rwanda",
        cityId: "ruanda-butare",
        website: "http://www.nur.ac.rw/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Butare (Wikidata).
      }),
  ],
  "ruanda-musanze": [
      defineUniversity({
        id: "ruanda-musanze-institute-of-applied-sciences-ruhengeri",
        name: "Institute of Applied Sciences Ruhengeri",
        cityId: "ruanda-musanze",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Musanze (Wikidata).
      }),
      defineUniversity({
        id: "ruanda-musanze-iprc-musanze",
        name: "IPRC Musanze",
        cityId: "ruanda-musanze",
        website: null,
        source: "open-dataset",
        // Situada a 6.9 km del centro de Musanze (Wikidata).
      }),
  ],
};
