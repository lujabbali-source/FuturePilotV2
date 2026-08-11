import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "cuba";
const countryName = "Cuba";

const cities = [
  defineCity({
    id: "cuba-la-habana",
    name: "La Habana",
    region: "La Habana y Mayabeque (Capital y Occidente)",
    coordinates: {"lat": 23.1136, "lng": -82.3666},
    statistics: { population: "~2.100.000 habitantes", safety: "Alta", weather: "19°C a 31°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~35 Mbps", qualityOfLife: "Media", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-la-habana-universidad-de-la-habana-uh",
        "name": "Universidad de La Habana (UH)",
        "cityId": "cuba-la-habana",
        "website": "https://www.uh.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-la-habana-universidad-tecnologica-de-la-habana-jose-antonio-echeverria-cujae",
        "name": "Universidad Tecnológica de La Habana José Antonio Echeverría (CUJAE)",
        "cityId": "cuba-la-habana",
        "website": "https://cujae.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-la-habana-universidad-de-ciencias-medicas-de-la-habana-ucmh",
        "name": "Universidad de Ciencias Médicas de La Habana (UCMH)",
        "cityId": "cuba-la-habana",
        "website": "http://www.ucmh.sld.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-la-habana-universidad-de-las-ciencias-informaticas-uci",
        "name": "Universidad de las Ciencias Informáticas (UCI)",
        "cityId": "cuba-la-habana",
        "website": "https://www.uci.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-la-habana-universidad-agraria-de-la-habana-fructuoso-rodriguez-perez-unah-mayabeque-la-habana",
        "name": "Universidad Agraria de La Habana Fructuoso Rodríguez Pérez (UNAH) (Mayabeque/La Habana)",
        "cityId": "cuba-la-habana",
        "website": "https://www.unah.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-la-habana-universidad-de-las-artes-isa",
        "name": "Universidad de las Artes (ISA)",
        "cityId": "cuba-la-habana",
        "website": "https://www.isa.cult.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-santa-clara",
    name: "Santa Clara",
    region: "Santa Clara y Cienfuegos (Región Central / Villa Clara)",
    coordinates: {"lat": 22.4069, "lng": -79.9647},
    statistics: { population: "~240.000 habitantes (Santa Clara)", safety: "Muy alta", weather: "18°C a 32°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-santa-clara-universidad-central-marta-abreu-de-las-villas-uclv",
        "name": "Universidad Central \"Marta Abreu\" de Las Villas (UCLV)",
        "cityId": "cuba-santa-clara",
        "website": "https://www.uclv.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-villa-clara",
    name: "Villa Clara",
    region: "Santa Clara y Cienfuegos (Región Central / Villa Clara)",
    coordinates: {"lat": 22.4069, "lng": -79.9647},
    statistics: { population: "~240.000 habitantes (Santa Clara)", safety: "Muy alta", weather: "18°C a 32°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-villa-clara-universidad-de-ciencias-medicas-de-villa-clara",
        "name": "Universidad de Ciencias Médicas de Villa Clara",
        "cityId": "cuba-villa-clara",
        "website": "http://www.ucm.vcl.sld.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-cienfuegos",
    name: "Cienfuegos",
    region: "Santa Clara y Cienfuegos (Región Central / Villa Clara)",
    coordinates: {"lat": 22.1461, "lng": -80.4361},
    statistics: { population: "~240.000 habitantes (Santa Clara)", safety: "Muy alta", weather: "18°C a 32°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-cienfuegos-universidad-de-cienfuegos-carlos-rafael-rodriguez-ucf",
        "name": "Universidad de Cienfuegos Carlos Rafael Rodríguez (UCF)",
        "cityId": "cuba-cienfuegos",
        "website": "https://www.ucf.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-santiago-de-cuba",
    name: "Santiago de Cuba",
    region: "Santiago de Cuba (Región Oriental)",
    coordinates: {"lat": 20.0247, "lng": -75.8219},
    statistics: { population: "~500.000 habitantes", safety: "Muy alta", weather: "21°C a 33°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-santiago-de-cuba-universidad-de-oriente-uo",
        "name": "Universidad de Oriente (UO)",
        "cityId": "cuba-santiago-de-cuba",
        "website": "https://www.uo.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-santiago-de-cuba-universidad-de-ciencias-medicas-de-santiago-de-cuba",
        "name": "Universidad de Ciencias Médicas de Santiago de Cuba",
        "cityId": "cuba-santiago-de-cuba",
        "website": "http://www.scu.sld.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-camaguey",
    name: "Camagüey",
    region: "Camagüey y Holguín (Centro-Oriente)",
    coordinates: {"lat": 21.3808, "lng": -77.9169},
    statistics: { population: "~320.000 habitantes (Camagüey)", safety: "Muy alta", weather: "20°C a 33°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~25 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-camaguey-universidad-de-camaguey-ignacio-agramonte-loynaz-uc",
        "name": "Universidad de Camagüey Ignacio Agramonte Loynaz (UC)",
        "cityId": "cuba-camaguey",
        "website": "https://www.reduc.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-holguin",
    name: "Holguín",
    region: "Camagüey y Holguín (Centro-Oriente)",
    coordinates: {"lat": 20.8872, "lng": -76.2631},
    statistics: { population: "~320.000 habitantes (Camagüey)", safety: "Muy alta", weather: "20°C a 33°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~25 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-holguin-universidad-de-holguin-uho",
        "name": "Universidad de Holguín (UHo)",
        "cityId": "cuba-holguin",
        "website": "https://www.uho.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-pinar-del-rio",
    name: "Pinar del Río",
    region: "Pinar del Río y Matanzas (Occidente)",
    coordinates: {"lat": 22.4175, "lng": -83.6981},
    statistics: { population: "~150.000 habitantes (Matanzas)", safety: "Muy alta", weather: "19°C a 31°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-pinar-del-rio-universidad-de-pinar-del-rio-hermanos-saiz-montes-de-oca-upr",
        "name": "Universidad de Pinar del Río Hermanos Saíz Montes de Oca (UPR)",
        "cityId": "cuba-pinar-del-rio",
        "website": "https://www.upr.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-matanzas",
    name: "Matanzas",
    region: "Pinar del Río y Matanzas (Occidente)",
    coordinates: {"lat": 23.0411, "lng": -81.5775},
    statistics: { population: "~150.000 habitantes (Matanzas)", safety: "Muy alta", weather: "19°C a 31°C", language: "Español", currency: "Peso cubano (CUP)", internetSpeed: "~30 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-matanzas-universidad-de-matanzas-camilo-cienfuegos-um",
        "name": "Universidad de Matanzas Camilo Cienfuegos (UM)",
        "cityId": "cuba-matanzas",
        "website": "https://www.umcc.cu",
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
