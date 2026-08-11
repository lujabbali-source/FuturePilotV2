import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "bolivia";
const countryName = "Bolivia";

const cities = [
  defineCity({
    id: "bolivia-santa-cruz-de-la-sierra",
    name: "Santa Cruz de la Sierra",
    region: "Santa Cruz de la Sierra (Departamento de Santa Cruz)",
    coordinates: { lat: -17.7833, lng: -63.1821 },
    statistics: { population: "~1.900.000 habitantes", safety: "Moderada", weather: "17°C a 32°C", language: "Español", currency: "Boliviano (BOB)", internetSpeed: "~60 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [],
  }),
  defineCity({
    id: "bolivia-tarija",
    name: "Tarija",
    region: "Tarija (Zona Sur)",
    coordinates: { lat: -21.5355, lng: -64.7296 },
    statistics: { population: "~250.000 habitantes", safety: "Muy alta", weather: "9°C a 28°C", language: "Español", currency: "Boliviano (BOB)", internetSpeed: "~45 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [],
  }),
  defineCity({
    id: "bolivia-la-paz",
    name: "La Paz",
    region: "La Paz y El Alto (Sede de Gobierno)",
    coordinates: {"lat": -16.5, "lng": -68.15},
    statistics: { population: "~1.800.000 habitantes (Área Conurbada)", safety: "Moderada", weather: "-1°C a 17°C", language: "Español / Aimara", currency: "Boliviano (BOB)", internetSpeed: "~50 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Muy alta" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-la-paz-universidad-mayor-de-san-andres-umsa",
        "name": "Universidad Mayor de San Andrés (UMSA)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.umsa.bo",
        "type": "public"
      }),
      defineUniversity({
        "id": "bolivia-la-paz-universidad-catolica-boliviana-san-pablo-ucb-sede-la-paz",
        "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede La Paz)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.ucb.edu.bo",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-la-paz-universidad-publica-de-el-alto-upea-el-alto",
        "name": "Universidad Pública de El Alto (UPEA) (El Alto)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.upea.bo",
        "type": "public"
      }),
      defineUniversity({
        "id": "bolivia-la-paz-universidad-privada-boliviana-upb-campus-la-paz",
        "name": "Universidad Privada Boliviana (UPB - Campus La Paz)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.upb.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-la-paz-universidad-del-valle-univalle-sede-la-paz",
        "name": "Universidad del Valle (UNIVALLE - Sede La Paz)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.univalle.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-la-paz-universidad-salesiana-de-bolivia-usb",
        "name": "Universidad Salesiana de Bolivia (USB)",
        "cityId": "bolivia-la-paz",
        "website": "https://www.usalesiana.edu.bo",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-cochabamba",
    name: "Cochabamba",
    region: "Cochabamba (Valle Central)",
    coordinates: {"lat": -17.3895, "lng": -66.1568},
    statistics: { population: "~800.000 habitantes", safety: "Alta", weather: "8°C a 26°C", language: "Español / Quechua", currency: "Boliviano (BOB)", internetSpeed: "~55 Mbps", qualityOfLife: "Muy alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-cochabamba-universidad-mayor-de-san-simon-umss",
        "name": "Universidad Mayor de San Simón (UMSS)",
        "cityId": "bolivia-cochabamba",
        "website": "https://www.umss.edu.bo",
        "type": "public"
      }),
      defineUniversity({
        "id": "bolivia-cochabamba-universidad-privada-boliviana-upb-campus-matriz-cochabamba",
        "name": "Universidad Privada Boliviana (UPB - Campus Matriz Cochabamba)",
        "cityId": "bolivia-cochabamba",
        "website": "https://www.upb.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-cochabamba-universidad-del-valle-univalle-campus-matriz-tiquipaya-cochabamba",
        "name": "Universidad del Valle (UNIVALLE - Campus Matriz Tiquipaya/Cochabamba)",
        "cityId": "bolivia-cochabamba",
        "website": "https://www.univalle.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-cochabamba-universidad-catolica-boliviana-san-pablo-ucb-sede-cochabamba",
        "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede Cochabamba)",
        "cityId": "bolivia-cochabamba",
        "website": "https://www.ucb.edu.bo",
        "type": "private"
      }),
      defineUniversity({
        "id": "bolivia-cochabamba-universidad-de-ciencias-administrativas-y-tecnologicas-ucatec",
        "name": "Universidad de Ciencias Administrativas y Tecnológicas (UCATEC)",
        "cityId": "bolivia-cochabamba",
        "website": "https://www.ucatec.edu.bo",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-sucre",
    name: "Sucre",
    region: "Sucre (Capital Constitucional / Chuquisaca)",
    coordinates: {"lat": -19.0333, "lng": -65.2627},
    statistics: { population: "~300.000 habitantes", safety: "Muy alta", weather: "7°C a 23°C", language: "Español", currency: "Boliviano (BOB)", internetSpeed: "~45 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-sucre-universidad-mayor-real-y-pontificia-de-san-francisco-xavier-de-chuquisaca-usfx",
        "name": "Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)",
        "cityId": "bolivia-sucre",
        "website": "https://www.usfx.bo",
        "type": "public"
      }),
      defineUniversity({
        "id": "bolivia-sucre-universidad-del-valle-univalle-sede-sucre",
        "name": "Universidad del Valle (UNIVALLE - Sede Sucre)",
        "cityId": "bolivia-sucre",
        "website": "https://www.univalle.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-oruro",
    name: "Oruro",
    region: "Oruro y Potosí (Zona Andina)",
    coordinates: {"lat": -17.9833, "lng": -67.15},
    statistics: { population: "~260.000 habitantes (Oruro)", safety: "Moderada - Alta", weather: "-4°C a 18°C", language: "Español / Quechua / Aimara", currency: "Boliviano (BOB)", internetSpeed: "~40 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-oruro-universidad-tecnica-de-oruro-uto",
        "name": "Universidad Técnica de Oruro (UTO)",
        "cityId": "bolivia-oruro",
        "website": "https://www.uto.edu.bo",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-potosi",
    name: "Potosí",
    region: "Oruro y Potosí (Zona Andina)",
    coordinates: {"lat": -19.5836, "lng": -65.7531},
    statistics: { population: "~260.000 habitantes (Oruro)", safety: "Moderada - Alta", weather: "-4°C a 18°C", language: "Español / Quechua / Aimara", currency: "Boliviano (BOB)", internetSpeed: "~40 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-potosi-universidad-autonoma-tomas-frias-uatf",
        "name": "Universidad Autónoma Tomás Frías (UATF)",
        "cityId": "bolivia-potosi",
        "website": "https://www.uatf.edu.bo",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-trinidad",
    name: "Trinidad",
    region: "Beni y Pando (Amazonía Boliviana)",
    coordinates: {"lat": -14.8333, "lng": -64.9},
    statistics: { population: "~130.000 habitantes (Trinidad)", safety: "Alta", weather: "20°C a 33°C", language: "Español", currency: "Boliviano (BOB)", internetSpeed: "~35 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-trinidad-universidad-autonoma-del-beni-jose-ballivian-uabjb",
        "name": "Universidad Autónoma del Beni José Ballivián (UABJB)",
        "cityId": "bolivia-trinidad",
        "website": "https://www.uabjb.edu.bo",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "bolivia-pando",
    name: "Pando",
    region: "Beni y Pando (Amazonía Boliviana)",
    coordinates: {"lat": -11.0267, "lng": -68.7692},
    statistics: { population: "~130.000 habitantes (Trinidad)", safety: "Alta", weather: "20°C a 33°C", language: "Español", currency: "Boliviano (BOB)", internetSpeed: "~35 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-pando-universidad-amazonica-de-pando-uap",
        "name": "Universidad Amazónica de Pando (UAP)",
        "cityId": "bolivia-pando",
        "website": "https://www.uap.edu.bo",
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
  nationalUniversities: [
    defineUniversity({
      "name": "Universidad Autónoma Gabriel René Moreno (UAGRM)",
      "website": "https://www.uagrm.edu.bo",
      "type": "public",
      "id": "bolivia-national-universidad-autonoma-gabriel-rene-moreno-uagrm",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Privada de Santa Cruz de la Sierra (UPSA)",
      "website": "https://www.upsa.edu.bo",
      "type": "private",
      "id": "bolivia-national-universidad-privada-de-santa-cruz-de-la-sierra-upsa",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede Santa Cruz)",
      "website": "https://www.scz.ucb.edu.bo",
      "type": "private",
      "id": "bolivia-national-universidad-catolica-boliviana-san-pablo-ucb-sede-santa-cruz",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad de Aquino Bolivia (UDABOL)",
      "website": "https://www.udabol.edu.bo",
      "type": "private",
      "id": "bolivia-national-universidad-de-aquino-bolivia-udabol",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Tecnológica Privada de Santa Cruz (UTEPSA)",
      "website": "https://www.utepsa.edu",
      "type": "private",
      "id": "bolivia-national-universidad-tecnologica-privada-de-santa-cruz-utepsa",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Nur",
      "website": "https://www.nur.edu",
      "type": "private",
      "id": "bolivia-national-universidad-nur",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Autónoma Juan Misael Saracho (UAJMS)",
      "website": "https://www.uajms.edu.bo",
      "type": "public",
      "id": "bolivia-national-universidad-autonoma-juan-misael-saracho-uajms",
      "cityId": "national"
    }),
    defineUniversity({
      "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede Tarija)",
      "website": "https://www.tja.ucb.edu.bo",
      "type": "private",
      "id": "bolivia-national-universidad-catolica-boliviana-san-pablo-ucb-sede-tarija",
      "cityId": "national"
    }),
  ],
});
