// Universidades por ciudad de Ciudad del Vaticano. Generado; no editar a mano.
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
  "ciudad-del-vaticano-vatican-city": [
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-scuola-vaticana-di-paleografia-diplomatica-e-archivistica",
        name: "Scuola vaticana di paleografia, diplomatica e archivistica",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-north-american-college",
        name: "Pontifical North American College",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-north-american-college",
        name: "Pontifical North American College",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-institute-of-sacred-music",
        name: "Pontifical Institute of Sacred Music",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-ethiopian-college",
        name: "Pontifical Ethiopian College",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-university-of-saint-thomas-aquinas",
        name: "Pontifical University of Saint Thomas Aquinas",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 2.9 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontificio-collegio-urbano-de-propaganda-fide",
        name: "Pontificio Collegio Urbano de Propaganda Fide",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Vatican City (Wikidata).
      }),
      defineUniversity({
        id: "ciudad-del-vaticano-vatican-city-pontifical-lateran-university",
        name: "Pontifical Lateran University",
        cityId: "ciudad-del-vaticano-vatican-city",
        website: null,
        source: "open-dataset",
        // Situada a 4.5 km del centro de Vatican City (Wikidata).
      }),
  ],
};
