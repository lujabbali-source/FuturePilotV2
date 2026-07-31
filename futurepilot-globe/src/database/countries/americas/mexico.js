import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "mexico";
const countryName = "México";

const cities = [
  defineCity({
    id: "mexico-ciudad-de-mexico",
    name: "Ciudad de México",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-nacional-autonoma-de-mexico-unam",
        "name": "Universidad Nacional Autónoma de México (UNAM)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.unam.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-instituto-politecnico-nacional-ipn",
        "name": "Instituto Politécnico Nacional (IPN)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.ipn.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-tecnologico-de-monterrey-itesm-campus-ciudad-de-mexico-santa-fe-estado-de-mexico",
        "name": "Tecnológico de Monterrey (ITESM - Campus Ciudad de México / Santa Fe / Estado de México)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://tec.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-autonoma-metropolitana-uam",
        "name": "Universidad Autónoma Metropolitana (UAM)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.uam.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-iberoamericana-uia-ibero",
        "name": "Universidad Iberoamericana (UIA / Ibero)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://ibero.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-instituto-tecnologico-autonomo-de-mexico-itam",
        "name": "Instituto Tecnológico Autónomo de México (ITAM)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.itam.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-anahuac-mexico-campus-norte-y-sur",
        "name": "Universidad Anáhuac México (Campus Norte y Sur)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.anahuac.mx/mexico",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-panamericana-up",
        "name": "Universidad Panamericana (UP)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.up.edu.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-ciudad-de-mexico-universidad-autonoma-del-estado-de-mexico-uaemex-toluca",
        "name": "Universidad Autónoma del Estado de México (UAEMex) (Toluca)",
        "cityId": "mexico-ciudad-de-mexico",
        "website": "https://www.uaemex.mx",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "mexico-monterrey",
    name: "Monterrey",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-monterrey-tecnologico-de-monterrey-itesm-campus-monterrey-campus-central",
        "name": "Tecnológico de Monterrey (ITESM - Campus Monterrey / Campus Central)",
        "cityId": "mexico-monterrey",
        "website": "https://tec.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-monterrey-universidad-autonoma-de-nuevo-leon-uanl",
        "name": "Universidad Autónoma de Nuevo León (UANL)",
        "cityId": "mexico-monterrey",
        "website": "https://www.uanl.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-monterrey-universidad-de-monterrey-udem",
        "name": "Universidad de Monterrey (UDEM)",
        "cityId": "mexico-monterrey",
        "website": "https://www.udem.edu.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-monterrey-universidad-regiomontana-u-r-i-e-l-u-r",
        "name": "Universidad Regiomontana (U-R-I-E-L / U-R)",
        "cityId": "mexico-monterrey",
        "website": "https://www.u-r.mx",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "mexico-guadalajara",
    name: "Guadalajara",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-guadalajara-universidad-de-guadalajara-udg",
        "name": "Universidad de Guadalajara (UDG)",
        "cityId": "mexico-guadalajara",
        "website": "https://www.udg.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-guadalajara-instituto-tecnologico-y-de-estudios-superiores-de-occidente-iteso",
        "name": "Instituto Tecnológico y de Estudios Superiores de Occidente (ITESO)",
        "cityId": "mexico-guadalajara",
        "website": "https://www.iteso.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-guadalajara-universidad-autonoma-de-guadalajara-uag",
        "name": "Universidad Autónoma de Guadalajara (UAG)",
        "cityId": "mexico-guadalajara",
        "website": "https://www.uag.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-guadalajara-tecnologico-de-monterrey-itesm-campus-guadalajara",
        "name": "Tecnológico de Monterrey (ITESM - Campus Guadalajara)",
        "cityId": "mexico-guadalajara",
        "website": "https://tec.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-guadalajara-universidad-panamericana-up-campus-guadalajara",
        "name": "Universidad Panamericana (UP - Campus Guadalajara)",
        "cityId": "mexico-guadalajara",
        "website": "https://www.up.edu.mx",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "mexico-puebla",
    name: "Puebla",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-puebla-benemerita-universidad-autonoma-de-puebla-buap",
        "name": "Benemérita Universidad Autónoma de Puebla (BUAP)",
        "cityId": "mexico-puebla",
        "website": "https://www.buap.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-puebla-universidad-de-las-americas-puebla-udlap-cholula-puebla",
        "name": "Universidad de las Américas Puebla (UDLAP) (Cholula/Puebla)",
        "cityId": "mexico-puebla",
        "website": "https://www.udlap.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-puebla-universidad-popular-autonoma-del-estado-de-puebla-upaep",
        "name": "Universidad Popular Autónoma del Estado de Puebla (UPAEP)",
        "cityId": "mexico-puebla",
        "website": "https://upaep.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-puebla-tecnologico-de-monterrey-itesm-campus-puebla",
        "name": "Tecnológico de Monterrey (ITESM - Campus Puebla)",
        "cityId": "mexico-puebla",
        "website": "https://tec.mx",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "mexico-queretaro",
    name: "Querétaro",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-queretaro-queretaro",
        "name": "Querétaro",
        "cityId": "mexico-queretaro",
        "website": "https://www.uaq.mx",
        "type": null
      }),
      defineUniversity({
        "id": "mexico-queretaro-universidad-autonoma-de-queretaro-uaq",
        "name": "Universidad Autónoma de Querétaro (UAQ)",
        "cityId": "mexico-queretaro",
        "website": "https://www.uaq.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-queretaro-universidad-aeronautica-en-queretaro-unaq",
        "name": "Universidad Aeronáutica en Querétaro (UNAQ)",
        "cityId": "mexico-queretaro",
        "website": "https://www.unaq.edu.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-queretaro-tecnologico-de-monterrey-itesm-campus-queretaro",
        "name": "Tecnológico de Monterrey (ITESM - Campus Querétaro)",
        "cityId": "mexico-queretaro",
        "website": "https://tec.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-queretaro-guanajuato-leon-guanajuato-capital",
        "name": "Guanajuato (León / Guanajuato Capital)",
        "cityId": "mexico-queretaro",
        "website": "https://www.ugto.mx",
        "type": null
      }),
      defineUniversity({
        "id": "mexico-queretaro-universidad-de-guanajuato-ugto",
        "name": "Universidad de Guanajuato (UGTO)",
        "cityId": "mexico-queretaro",
        "website": "https://www.ugto.mx",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "mexico-merida",
    name: "Mérida",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-merida-universidad-autonoma-de-yucatan-uady",
        "name": "Universidad Autónoma de Yucatán (UADY)",
        "cityId": "mexico-merida",
        "website": "https://www.uady.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-merida-universidad-anahuac-mayab",
        "name": "Universidad Anáhuac Mayab",
        "cityId": "mexico-merida",
        "website": "https://merida.anahuac.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-merida-instituto-tecnologico-de-merida-itm",
        "name": "Instituto Tecnológico de Mérida (ITM)",
        "cityId": "mexico-merida",
        "website": "https://www.merida.tecnm.mx",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "mexico-tijuana",
    name: "Tijuana",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "mexico-tijuana-universidad-autonoma-de-baja-california-uabc-tijuana-mexicali-ensenada",
        "name": "Universidad Autónoma de Baja California (UABC) (Tijuana / Mexicali / Ensenada)",
        "cityId": "mexico-tijuana",
        "website": "https://www.uabc.mx",
        "type": "public"
      }),
      defineUniversity({
        "id": "mexico-tijuana-cetys-universidad-mexicali-tijuana",
        "name": "CETYS Universidad (Mexicali / Tijuana)",
        "cityId": "mexico-tijuana",
        "website": "https://www.cetys.mx",
        "type": "private"
      }),
      defineUniversity({
        "id": "mexico-tijuana-centro-de-investigacion-cientifica-y-de-educacion-superior-de-ensenada-cicese",
        "name": "Centro de Investigación Científica y de Educación Superior de Ensenada (CICESE)",
        "cityId": "mexico-tijuana",
        "website": "https://www.cicese.edu.mx",
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
