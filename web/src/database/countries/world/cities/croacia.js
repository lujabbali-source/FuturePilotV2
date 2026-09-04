// Universidades por ciudad de Croacia. Generado; no editar a mano.
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
  "croacia-zagreb": [
      defineUniversity({
        id: "croacia-zagreb-catholic-faculty-of-theology",
        name: "Catholic Faculty of Theology",
        cityId: "croacia-zagreb",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Zagreb (Wikidata).
      }),
      defineUniversity({
        id: "croacia-zagreb-greek-catholic-seminary-in-zagreb",
        name: "Greek Catholic Seminary in Zagreb",
        cityId: "croacia-zagreb",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Zagreb (Wikidata).
      }),
      defineUniversity({
        id: "croacia-zagreb-zagreb-school-of-economics-and-management",
        name: "Zagreb School of Economics and Management",
        cityId: "croacia-zagreb",
        website: "http://www.zsem.hr/",
        source: "open-dataset",
        // Situada a 2.0 km del centro de Zagreb (Wikidata).
      }),
  ],
  "croacia-split": [
      defineUniversity({
        id: "croacia-split-catholic-faculty-of-theology-university-of-split",
        name: "Catholic faculty of Theology, University of Split",
        cityId: "croacia-split",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Split (Wikidata).
      }),
      defineUniversity({
        id: "croacia-split-university-of-split",
        name: "University of Split",
        cityId: "croacia-split",
        website: "http://www.unist.hr/",
        source: "open-dataset",
        // Situada a 2.3 km del centro de Split (Wikidata).
      }),
  ],
  "croacia-rijeka": [
      defineUniversity({
        id: "croacia-rijeka-business-school-par",
        name: "Business School PAR",
        cityId: "croacia-rijeka",
        website: null,
        source: "open-dataset",
        // Situada a 0.1 km del centro de Rijeka (Wikidata).
      }),
      defineUniversity({
        id: "croacia-rijeka-university-of-rijeka",
        name: "University of Rijeka",
        cityId: "croacia-rijeka",
        website: "http://www.uniri.hr/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Rijeka (Wikidata).
      }),
  ],
  "croacia-koprivnica": [
      defineUniversity({
        id: "croacia-koprivnica-university-north",
        name: "University North",
        cityId: "croacia-koprivnica",
        website: "http://www.unin.hr/",
        source: "open-dataset",
        // Situada a 1.5 km del centro de Koprivnica (Wikidata).
      }),
      defineUniversity({
        id: "croacia-koprivnica-university-north",
        name: "University North",
        cityId: "croacia-koprivnica",
        website: "http://www.unin.hr/",
        source: "open-dataset",
        // Situada a 1.5 km del centro de Koprivnica (Wikidata).
      }),
  ],
  "croacia-dubrovnik": [
      defineUniversity({
        id: "croacia-dubrovnik-university-of-dubrovnik",
        name: "University of Dubrovnik",
        cityId: "croacia-dubrovnik",
        website: "http://www.unidu.hr/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Dubrovnik (Wikidata).
      }),
      defineUniversity({
        id: "croacia-dubrovnik-dubrovnik-international-university",
        name: "Dubrovnik International University",
        cityId: "croacia-dubrovnik",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Dubrovnik (Wikidata).
      }),
  ],
  "croacia-centar": [
      defineUniversity({
        id: "croacia-centar-catholic-university-of-croatia",
        name: "Catholic University of Croatia",
        cityId: "croacia-centar",
        website: null,
        source: "open-dataset",
        // Situada a 2.6 km del centro de Centar (Wikidata).
      }),
      defineUniversity({
        id: "croacia-centar-university-of-zagreb",
        name: "University of Zagreb",
        cityId: "croacia-centar",
        website: "http://www.unizg.hr/",
        source: "open-dataset",
        // Situada a 0.6 km del centro de Centar (Wikidata).
      }),
  ],
};
