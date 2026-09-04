// Universidades por ciudad de Antigua y Barbuda. Generado; no editar a mano.
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
  "antigua-y-barbuda-saint-john-s": [
      defineUniversity({
        id: "antigua-y-barbuda-saint-john-s-american-university-of-antigua",
        name: "American University of Antigua",
        cityId: "antigua-y-barbuda-saint-john-s",
        website: "http://www.auamed.org/",
        source: "open-dataset",
        // Situada a 6.4 km del centro de Saint John’s (Wikidata).
      }),
      defineUniversity({
        id: "antigua-y-barbuda-saint-john-s-antigua-state-college",
        name: "Antigua State College",
        cityId: "antigua-y-barbuda-saint-john-s",
        website: null,
        source: "open-dataset",
        // Situada a 2.4 km del centro de Saint John’s (Wikidata).
      }),
      defineUniversity({
        id: "antigua-y-barbuda-saint-john-s-university-of-health-sciences-antigua",
        name: "University of Health Sciences Antigua",
        cityId: "antigua-y-barbuda-saint-john-s",
        website: "http://www.uhsa.ag/",
        source: "open-dataset",
        // Situada a 15.2 km del centro de Saint John’s (Wikidata).
      }),
  ],
};
