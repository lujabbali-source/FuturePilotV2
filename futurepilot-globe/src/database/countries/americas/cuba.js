import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "cuba";
const countryName = "Cuba";

const cities = [
  defineCity({
    id: "cuba-la-habana",
    name: "La Habana",
    coordinates: null,
    isCapital: false,
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
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-santa-clara-santa-clara-villa-clara",
        "name": "Santa Clara (Villa Clara)",
        "cityId": "cuba-santa-clara",
        "website": "https://www.uclv.edu.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-santa-clara-universidad-central-marta-abreu-de-las-villas-uclv",
        "name": "Universidad Central \"Marta Abreu\" de Las Villas (UCLV)",
        "cityId": "cuba-santa-clara",
        "website": "https://www.uclv.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-santa-clara-cienfuegos",
        "name": "Cienfuegos",
        "cityId": "cuba-santa-clara",
        "website": "https://www.ucf.edu.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-santa-clara-universidad-de-cienfuegos-carlos-rafael-rodriguez-ucf",
        "name": "Universidad de Cienfuegos Carlos Rafael Rodríguez (UCF)",
        "cityId": "cuba-santa-clara",
        "website": "https://www.ucf.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-villa-clara",
    name: "Villa Clara",
    coordinates: null,
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
    id: "cuba-santiago-de-cuba",
    name: "Santiago de Cuba",
    coordinates: null,
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
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-camaguey-camaguey",
        "name": "Camagüey",
        "cityId": "cuba-camaguey",
        "website": "https://www.reduc.edu.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-camaguey-universidad-de-camaguey-ignacio-agramonte-loynaz-uc",
        "name": "Universidad de Camagüey Ignacio Agramonte Loynaz (UC)",
        "cityId": "cuba-camaguey",
        "website": "https://www.reduc.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-camaguey-holguin",
        "name": "Holguín",
        "cityId": "cuba-camaguey",
        "website": "https://www.uho.edu.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-camaguey-universidad-de-holguin-uho",
        "name": "Universidad de Holguín (UHo)",
        "cityId": "cuba-camaguey",
        "website": "https://www.uho.edu.cu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "cuba-pinar-del-rio",
    name: "Pinar del Río",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "cuba-pinar-del-rio-pinar-del-rio",
        "name": "Pinar del Río",
        "cityId": "cuba-pinar-del-rio",
        "website": "https://www.upr.edu.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-pinar-del-rio-universidad-de-pinar-del-rio-hermanos-saiz-montes-de-oca-upr",
        "name": "Universidad de Pinar del Río Hermanos Saíz Montes de Oca (UPR)",
        "cityId": "cuba-pinar-del-rio",
        "website": "https://www.upr.edu.cu",
        "type": "public"
      }),
      defineUniversity({
        "id": "cuba-pinar-del-rio-matanzas-varadero",
        "name": "Matanzas / Varadero",
        "cityId": "cuba-pinar-del-rio",
        "website": "https://www.umcc.cu",
        "type": null
      }),
      defineUniversity({
        "id": "cuba-pinar-del-rio-universidad-de-matanzas-camilo-cienfuegos-um",
        "name": "Universidad de Matanzas Camilo Cienfuegos (UM)",
        "cityId": "cuba-pinar-del-rio",
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
