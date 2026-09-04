// Universidades por ciudad de Brunéi. Generado; no editar a mano.
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
  "brunei-bandar-seri-begawan": [
      defineUniversity({
        id: "brunei-bandar-seri-begawan-brunei-polytechnic",
        name: "Brunei Polytechnic",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-brunei-polytechnic",
        name: "Brunei Polytechnic",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 1.9 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-kemuda-institute",
        name: "KEMUDA Institute",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 5.9 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-seri-begawan-religious-teachers-university-college",
        name: "Seri Begawan Religious Teachers University College",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-universiti-brunei-darussalam",
        name: "Universiti Brunei Darussalam",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 10.9 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-university-of-technology-brunei",
        name: "University of Technology Brunei",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 10.7 km del centro de Bandar Seri Begawan (Wikidata).
      }),
      defineUniversity({
        id: "brunei-bandar-seri-begawan-sultan-sharif-ali-islamic-university",
        name: "Sultan Sharif Ali Islamic University",
        cityId: "brunei-bandar-seri-begawan",
        website: null,
        source: "open-dataset",
        // Situada a 3.4 km del centro de Bandar Seri Begawan (Wikidata).
      }),
  ],
};
