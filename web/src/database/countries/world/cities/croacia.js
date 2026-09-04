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
  "croacia-osijek": [
      defineUniversity({
        id: "croacia-osijek-university-of-osijek",
        name: "University of Osijek",
        cityId: "croacia-osijek",
        website: "http://www.unios.hr/",
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-school-of-medicine-university-of-osijek",
        name: "School of Medicine, University of Osijek",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-catholic-faculty-of-theology-in-akovo",
        name: "Catholic Faculty of Theology in Đakovo",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-faculty-of-civil-engineering-university-of-osijek",
        name: "Faculty of Civil Engineering, University of Osijek",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-faculty-of-food-technology-university-of-osijek",
        name: "Faculty of Food Technology, University of Osijek",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-faculty-of-law-university-of-osijek",
        name: "Faculty of Law, University of Osijek",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
      }),
      defineUniversity({
        id: "croacia-osijek-faculty-of-teacher-education-university-of-osijek",
        name: "Faculty of Teacher Education, University of Osijek",
        cityId: "croacia-osijek",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Osijek (Wikidata).
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
      defineUniversity({
        id: "croacia-centar-vern-university",
        name: "VERN' University",
        cityId: "croacia-centar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Centar (Wikidata).
      }),
      defineUniversity({
        id: "croacia-centar-professional-business-school-of-higher-education-libertas",
        name: "Professional Business School of Higher Education LIBERTAS",
        cityId: "croacia-centar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Centar (Wikidata).
      }),
      defineUniversity({
        id: "croacia-centar-institute-of-philosophy-and-theology-of-the-society-of-jesus",
        name: "Institute of Philosophy and Theology of the Society of Jesus",
        cityId: "croacia-centar",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Centar (Wikidata).
      }),
  ],
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
  "croacia-pula": [
      defineUniversity({
        id: "croacia-pula-university-of-pula",
        name: "University of Pula",
        cityId: "croacia-pula",
        website: "http://www.unipu.hr/",
        source: "open-dataset",
        // Situada a 0.5 km del centro de Pula (Wikidata).
      }),
      defineUniversity({
        id: "croacia-pula-istrian-polytechnic",
        name: "Istrian Polytechnic",
        cityId: "croacia-pula",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Pula (Wikidata).
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
};
