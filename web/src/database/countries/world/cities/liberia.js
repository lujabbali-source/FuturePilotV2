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
  ],
};
