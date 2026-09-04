// Universidades por ciudad de Kuwait. Generado; no editar a mano.
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
  "kuwait-as-salimiyah": [
      defineUniversity({
        id: "kuwait-as-salimiyah-american-university-of-kuwait",
        name: "American University of Kuwait",
        cityId: "kuwait-as-salimiyah",
        website: "http://www.auk.edu.kw/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de As Sālimīyah (Wikidata).
      }),
  ],
  "kuwait-ar-riqqah": [
      defineUniversity({
        id: "kuwait-ar-riqqah-american-university-of-the-middle-east",
        name: "American University of the Middle East",
        cityId: "kuwait-ar-riqqah",
        website: "http://www.aum.edu.kw/",
        source: "open-dataset",
        // Situada a 2.2 km del centro de Ar Riqqah (Wikidata).
      }),
  ],
  "kuwait-al-mahbulah": [
      defineUniversity({
        id: "kuwait-al-mahbulah-kuwait-technical-college",
        name: "Kuwait Technical College",
        cityId: "kuwait-al-mahbulah",
        website: null,
        source: "open-dataset",
        // Situada a 1.8 km del centro de Al Mahbūlah (Wikidata).
      }),
  ],
  "kuwait-kuwait-city": [
      defineUniversity({
        id: "kuwait-kuwait-city-mubarak-al-abdullah-joint-command-and-staff-college",
        name: "Mubarak al-Abdullah Joint Command and Staff College",
        cityId: "kuwait-kuwait-city",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Kuwait City (Wikidata).
      }),
  ],
  "kuwait-al-jahra": [
      defineUniversity({
        id: "kuwait-al-jahra-kuwait-college-of-science-and-technology",
        name: "Kuwait College of Science and Technology",
        cityId: "kuwait-al-jahra",
        website: null,
        source: "open-dataset",
        // Situada a 12.7 km del centro de Al Jahrā’ (Wikidata).
      }),
  ],
  "kuwait-ar-rabiyah": [
      defineUniversity({
        id: "kuwait-ar-rabiyah-kuwait-university",
        name: "Kuwait University",
        cityId: "kuwait-ar-rabiyah",
        website: "http://www.kuniv.edu.kw/",
        source: "open-dataset",
        // Situada a 5.4 km del centro de Ar Rābiyah (Wikidata).
      }),
  ],
  "kuwait-sabah-as-salim": [
      defineUniversity({
        id: "kuwait-sabah-as-salim-gulf-university-for-science-and-technology",
        name: "Gulf University for Science and Technology",
        cityId: "kuwait-sabah-as-salim",
        website: "http://www.gust.edu.kw/",
        source: "open-dataset",
        // Situada a 2.1 km del centro de Şabāḩ as Sālim (Wikidata).
      }),
  ],
};
