// Universidades por ciudad de Liberia. Generado; no editar a mano.
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
  "liberia-kakata": [
      defineUniversity({
        id: "liberia-kakata-barshell-university",
        name: "Barshell University",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-bluecrest-university-college-liberia",
        name: "BlueCrest University College Liberia",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-censil-college",
        name: "CENSIL College",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-cepres-international-university",
        name: "CEPRES International University",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-carver-christian-university",
        name: "Carver Christian University",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-licosess-college-of-education",
        name: "LICOSESS College of Education",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-rafiki-college-of-classical-education",
        name: "Rafiki College of Classical Education",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-smythe-institute-of-management-and-technology",
        name: "Smythe Institute of Management and Technology",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
      defineUniversity({
        id: "liberia-kakata-starz-university",
        name: "Starz University",
        cityId: "liberia-kakata",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kakata (Wikidata).
      }),
  ],
  "liberia-monrovia": [
      defineUniversity({
        id: "liberia-monrovia-united-methodist-university",
        name: "United Methodist University",
        cityId: "liberia-monrovia",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Monrovia (Wikidata).
      }),
      defineUniversity({
        id: "liberia-monrovia-university-of-liberia",
        name: "University of Liberia",
        cityId: "liberia-monrovia",
        website: "http://www.universityliberia.org/",
        source: "open-dataset",
        // Situada a 0.3 km del centro de Monrovia (Wikidata).
      }),
      defineUniversity({
        id: "liberia-monrovia-african-methodist-episcopal-university",
        name: "African Methodist Episcopal University",
        cityId: "liberia-monrovia",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Monrovia (Wikidata).
      }),
      defineUniversity({
        id: "liberia-monrovia-adventist-university-of-west-africa",
        name: "Adventist University of West Africa",
        cityId: "liberia-monrovia",
        website: null,
        source: "open-dataset",
        // Situada a 1.0 km del centro de Monrovia (Wikidata).
      }),
      defineUniversity({
        id: "liberia-monrovia-african-methodist-episcopal-zion-university",
        name: "African Methodist Episcopal Zion University",
        cityId: "liberia-monrovia",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Monrovia (Wikidata).
      }),
  ],
  "liberia-saclepea": [
      defineUniversity({
        id: "liberia-saclepea-african-bible-college-university",
        name: "African Bible College University",
        cityId: "liberia-saclepea",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Saclepea (Wikidata).
      }),
      defineUniversity({
        id: "liberia-saclepea-liberia-international-christian-college",
        name: "Liberia International Christian College",
        cityId: "liberia-saclepea",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Saclepea (Wikidata).
      }),
      defineUniversity({
        id: "liberia-saclepea-nimba-university",
        name: "Nimba University",
        cityId: "liberia-saclepea",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Saclepea (Wikidata).
      }),
  ],
};
