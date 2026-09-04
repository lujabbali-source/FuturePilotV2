// Universidades por ciudad de Israel. Generado; no editar a mano.
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
  "israel-nesher": [
      defineUniversity({
        id: "israel-nesher-technion-israel-institute-of-technology",
        name: "Technion – Israel Institute of Technology",
        cityId: "israel-nesher",
        website: "http://www.technion.ac.il/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Nesher (Wikidata).
      }),
      defineUniversity({
        id: "israel-nesher-university-of-haifa",
        name: "University of Haifa",
        cityId: "israel-nesher",
        website: "http://www.haifa.ac.il/",
        source: "open-dataset",
        // Situada a 2.4 km del centro de Nesher (Wikidata).
      }),
      defineUniversity({
        id: "israel-nesher-the-william-davidson-faculty-of-industrial-engineering-management",
        name: "The William Davidson Faculty of Industrial Engineering & Management",
        cityId: "israel-nesher",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Nesher (Wikidata).
      }),
      defineUniversity({
        id: "israel-nesher-the-william-davidson-faculty-of-industrial-engineering-management",
        name: "The William Davidson Faculty of Industrial Engineering & Management",
        cityId: "israel-nesher",
        website: null,
        source: "open-dataset",
        // Situada a 2.1 km del centro de Nesher (Wikidata).
      }),
      defineUniversity({
        id: "israel-nesher-russell-berrie-nanotechnology-institute",
        name: "Russell Berrie Nanotechnology Institute",
        cityId: "israel-nesher",
        website: "http://rbni.technion.ac.il/",
        source: "open-dataset",
        // Situada a 2.5 km del centro de Nesher (Wikidata).
      }),
  ],
  "israel-jerusalem": [
      defineUniversity({
        id: "israel-jerusalem-center-for-jewish-art",
        name: "Center for Jewish Art",
        cityId: "israel-jerusalem",
        website: null,
        source: "open-dataset",
        // Situada a 1.7 km del centro de Jerusalem (Wikidata).
      }),
      defineUniversity({
        id: "israel-jerusalem-schechter-institute-of-jewish-studies",
        name: "Schechter Institute of Jewish Studies",
        cityId: "israel-jerusalem",
        website: null,
        source: "open-dataset",
        // Situada a 1.1 km del centro de Jerusalem (Wikidata).
      }),
  ],
  "israel-ra-anana": [
      defineUniversity({
        id: "israel-ra-anana-open-university-of-israel",
        name: "Open University of Israel",
        cityId: "israel-ra-anana",
        website: "http://www.openu.ac.il/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Ra'anana (Wikidata).
      }),
      defineUniversity({
        id: "israel-ra-anana-open-university-of-israel",
        name: "Open University of Israel",
        cityId: "israel-ra-anana",
        website: "http://www.openu.ac.il/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Ra'anana (Wikidata).
      }),
  ],
};
