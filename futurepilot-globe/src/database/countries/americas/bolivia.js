import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "bolivia";
const countryName = "Bolivia";

const cities = [
  defineCity({
    id: "bolivia-la-paz",
    name: "La Paz",
    coordinates: null,
    isCapital: false,
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
    coordinates: null,
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
    coordinates: null,
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
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "bolivia-oruro-oruro",
        "name": "Oruro",
        "cityId": "bolivia-oruro",
        "website": "https://www.uto.edu.bo",
        "type": null
      }),
      defineUniversity({
        "id": "bolivia-oruro-universidad-tecnica-de-oruro-uto",
        "name": "Universidad Técnica de Oruro (UTO)",
        "cityId": "bolivia-oruro",
        "website": "https://www.uto.edu.bo",
        "type": "public"
      }),
      defineUniversity({
        "id": "bolivia-oruro-potosi",
        "name": "Potosí",
        "cityId": "bolivia-oruro",
        "website": "https://www.uatf.edu.bo",
        "type": null
      }),
      defineUniversity({
        "id": "bolivia-oruro-universidad-autonoma-tomas-frias-uatf",
        "name": "Universidad Autónoma Tomás Frías (UATF)",
        "cityId": "bolivia-oruro",
        "website": "https://www.uatf.edu.bo",
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
  {
    "name": "Universidad Autónoma Gabriel René Moreno (UAGRM)",
    "website": "https://www.uagrm.edu.bo",
    "type": "public"
  },
  {
    "name": "Universidad Privada de Santa Cruz de la Sierra (UPSA)",
    "website": "https://www.upsa.edu.bo",
    "type": "private"
  },
  {
    "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede Santa Cruz)",
    "website": "https://www.scz.ucb.edu.bo",
    "type": "private"
  },
  {
    "name": "Universidad de Aquino Bolivia (UDABOL)",
    "website": "https://www.udabol.edu.bo",
    "type": "private"
  },
  {
    "name": "Universidad Tecnológica Privada de Santa Cruz (UTEPSA)",
    "website": "https://www.utepsa.edu",
    "type": "private"
  },
  {
    "name": "Universidad Nur",
    "website": "https://www.nur.edu",
    "type": "private"
  },
  {
    "name": "Universidad Autónoma Juan Misael Saracho (UAJMS)",
    "website": "https://www.uajms.edu.bo",
    "type": "public"
  },
  {
    "name": "Universidad Católica Boliviana \"San Pablo\" (UCB - Sede Tarija)",
    "website": "https://www.tja.ucb.edu.bo",
    "type": "private"
  },
  {
    "name": "Trinidad (Beni)",
    "website": "https://www.uabjb.edu.bo",
    "type": null
  },
  {
    "name": "Universidad Autónoma del Beni José Ballivián (UABJB)",
    "website": "https://www.uabjb.edu.bo",
    "type": "public"
  },
  {
    "name": "Cobija (Pando)",
    "website": "https://www.uap.edu.bo",
    "type": null
  },
  {
    "name": "Universidad Amazónica de Pando (UAP)",
    "website": "https://www.uap.edu.bo",
    "type": "public"
  }
],
});
