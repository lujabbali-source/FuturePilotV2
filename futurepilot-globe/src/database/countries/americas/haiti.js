import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "haiti";
const countryName = "Haití";

const cities = [
  defineCity({
    id: "haiti-puerto-principe",
    name: "Puerto Príncipe",
    region: "Puerto Príncipe y Área Metropolitana (Departamento del Oeste)",
    coordinates: {"lat": 18.5944, "lng": -72.3074},
    statistics: { population: "~2.800.000 habitantes", safety: "Baja", weather: "22°C a 34°C", language: "Criollo haitiano / Francés", currency: "Gourde haitiano (HTG)", internetSpeed: "~25 Mbps", qualityOfLife: "Baja", studentSatisfaction: "Media" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "haiti-puerto-principe-universite-d-etat-d-haiti-ueh",
        "name": "Université d'État d'Haïti (UEH)",
        "cityId": "haiti-puerto-principe",
        "website": "https://ueh.edu.ht",
        "type": "public"
      }),
      defineUniversity({
        "id": "haiti-puerto-principe-universite-quisqueya-uniq",
        "name": "Université Quisqueya (UNIQ)",
        "cityId": "haiti-puerto-principe",
        "website": "https://uniq.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-puerto-principe-universite-notre-dame-d-haiti-undh-campus-puerto-principe",
        "name": "Université Notre Dame d'Haïti (UNDH - Campus Puerto Príncipe)",
        "cityId": "haiti-puerto-principe",
        "website": "https://undh.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-puerto-principe-universite-episteme-uepistem",
        "name": "Université EpiStème (UEPISTÈM)",
        "cityId": "haiti-puerto-principe",
        "website": "https://episteme.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-puerto-principe-universite-caraibe",
        "name": "Université Caraïbe",
        "cityId": "haiti-puerto-principe",
        "website": "https://uca.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-puerto-principe-universite-lumiere",
        "name": "Université Lumière",
        "cityId": "haiti-puerto-principe",
        "website": "https://ulumiere.edu.ht",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "haiti-cap-haitien",
    name: "Cap-Haïtien",
    region: "Cap-Haïtien y Limonade (Departamento del Norte)",
    coordinates: {"lat": 19.7592, "lng": -72.2014},
    statistics: { population: "~200.000 habitantes", safety: "Moderada", weather: "21°C a 33°C", language: "Criollo haitiano / Francés", currency: "Gourde haitiano (HTG)", internetSpeed: "~20 Mbps", qualityOfLife: "Media - Baja", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "haiti-cap-haitien-universite-d-etat-d-haiti-campus-henri-christophe-de-limonade-ueh-chcl",
        "name": "Université d'État d'Haïti - Campus Henri Christophe de Limonade (UEH-CHCL)",
        "cityId": "haiti-cap-haitien",
        "website": "https://chcl.ueh.edu.ht",
        "type": "public"
      }),
      defineUniversity({
        "id": "haiti-cap-haitien-universite-notre-dame-d-haiti-undh-campus-cap-haitien",
        "name": "Université Notre Dame d'Haïti (UNDH - Campus Cap-Haïtien)",
        "cityId": "haiti-cap-haitien",
        "website": "https://undh.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-cap-haitien-universite-publique-du-nord-a-cap-haitien-upnch",
        "name": "Université Publique du Nord à Cap-Haïtien (UPNCH)",
        "cityId": "haiti-cap-haitien",
        "website": "https://upnch.edu.ht",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "haiti-les-cayes",
    name: "Les Cayes",
    region: "Les Cayes (Departamento del Sur)",
    coordinates: {"lat": 18.2, "lng": -73.75},
    statistics: { population: "~140.000 habitantes (Les Cayes)", safety: "Moderada", weather: "22°C a 33°C", language: "Criollo haitiano / Francés", currency: "Gourde haitiano (HTG)", internetSpeed: "~20 Mbps", qualityOfLife: "Media - Baja", studentSatisfaction: "Media" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "haiti-les-cayes-universite-publique-du-sud-aux-cayes-upsac",
        "name": "Université Publique du Sud aux Cayes (UPSAC)",
        "cityId": "haiti-les-cayes",
        "website": "https://upsac.edu.ht",
        "type": "public"
      }),
      defineUniversity({
        "id": "haiti-les-cayes-universite-american-university-of-the-caribbean-auc",
        "name": "Université American University of the Caribbean (AUC)",
        "cityId": "haiti-les-cayes",
        "website": "https://auc.edu.ht",
        "type": "private"
      }),
      defineUniversity({
        "id": "haiti-les-cayes-universite-notre-dame-d-haiti-undh-campus-les-cayes",
        "name": "Université Notre Dame d'Haïti (UNDH - Campus Les Cayes)",
        "cityId": "haiti-les-cayes",
        "website": "https://undh.edu.ht",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "haiti-jacmel",
    name: "Jacmel",
    region: "Jacmel (Departamento del Sudeste)",
    coordinates: {"lat": 18.234, "lng": -72.535},
    statistics: { population: "~140.000 habitantes (Les Cayes)", safety: "Moderada", weather: "22°C a 33°C", language: "Criollo haitiano / Francés", currency: "Gourde haitiano (HTG)", internetSpeed: "~20 Mbps", qualityOfLife: "Media - Baja", studentSatisfaction: "Media" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "haiti-jacmel-universite-publique-du-sud-est-a-jacmel-upsej",
        "name": "Université Publique du Sud-Est à Jacmel (UPSEJ)",
        "cityId": "haiti-jacmel",
        "website": "https://upsej.edu.ht",
        "type": "public"
      }),
      defineUniversity({
        "id": "haiti-jacmel-universite-notre-dame-d-haiti-undh-campus-jacmel",
        "name": "Université Notre Dame d'Haïti (UNDH - Campus Jacmel)",
        "cityId": "haiti-jacmel",
        "website": "https://undh.edu.ht",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "haiti-gonaives",
    name: "Gonaïves",
    region: "Gonaïves y Saint-Marc (Departamento de Artibonite)",
    coordinates: {"lat": 19.45, "lng": -72.6833},
    statistics: { population: "~300.000 habitantes (Gonaïves)", safety: "Moderada - Baja", weather: "22°C a 35°C", language: "Criollo haitiano / Francés", currency: "Gourde haitiano (HTG)", internetSpeed: "~18 Mbps", qualityOfLife: "Baja", studentSatisfaction: "Media" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "haiti-gonaives-universite-publique-de-l-artibonite-aux-gonaives-upag",
        "name": "Université Publique de l'Artibonite aux Gonaïves (UPAG)",
        "cityId": "haiti-gonaives",
        "website": "https://upag.edu.ht",
        "type": "public"
      }),
    ],
  }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  capital: null,
  currency: null,
  language: null,
  continent: "America",
  cities,
  nationalUniversities: [],
});
