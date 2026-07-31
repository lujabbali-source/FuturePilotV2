import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "panama";
const countryName = "Panamá";

const cities = [
  defineCity({
    id: "panama-ciudad-de-panama",
    name: "Ciudad de Panamá",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-de-panama-up",
        "name": "Universidad de Panamá (UP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-tecnologica-de-panama-utp-campus-victor-levi-sasso",
        "name": "Universidad Tecnológica de Panamá (UTP - Campus Victor Levi Sasso)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-catolica-santa-maria-la-antigua-usma",
        "name": "Universidad Católica Santa María La Antigua (USMA)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://usma.ac.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-del-istmo-udi",
        "name": "Universidad del Istmo (UDI)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.udistmo.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-latina-de-panama",
        "name": "Universidad Latina de Panamá",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.ulatina.edu.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-interamericana-de-panama-uip",
        "name": "Universidad Interamericana de Panamá (UIP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.uip.edu.pa",
        "type": "private"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-maritima-internacional-de-panama-umip",
        "name": "Universidad Marítima Internacional de Panamá (UMIP)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://umip.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-universidad-especializada-de-las-americas-udelas",
        "name": "Universidad Especializada de las Américas (UDELAS)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://www.udelas.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-ciudad-de-panama-florida-state-university-panama-fsu-panama-ciudad-del-saber",
        "name": "Florida State University - Panamá (FSU Panama) (Ciudad del Saber)",
        "cityId": "panama-ciudad-de-panama",
        "website": "https://panama.fsu.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "panama-david",
    name: "David",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-david-universidad-autonoma-de-chiriqui-unachi-david",
        "name": "Universidad Autónoma de Chiriquí (UNACHI) (David)",
        "cityId": "panama-david",
        "website": "https://www.unachi.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-david-universidad-tecnologica-de-panama-centro-regional-de-chiriqui",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Chiriquí)",
        "cityId": "panama-david",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-david-universidad-catolica-santa-maria-la-antigua-sede-david",
        "name": "Universidad Católica Santa María La Antigua (Sede David)",
        "cityId": "panama-david",
        "website": "https://usma.ac.pa",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "panama-colon",
    name: "Colón",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-colon-universidad-de-panama-centro-regional-universitario-de-colon-cruc",
        "name": "Universidad de Panamá (Centro Regional Universitario de Colón - CRUC)",
        "cityId": "panama-colon",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-colon-universidad-tecnologica-de-panama-centro-regional-de-colon",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Colón)",
        "cityId": "panama-colon",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-santiago-de-veraguas",
    name: "Santiago de Veraguas",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-santiago-de-veraguas-santiago-veraguas",
        "name": "Santiago (Veraguas)",
        "cityId": "panama-santiago-de-veraguas",
        "website": "https://www.up.ac.pa",
        "type": null
      }),
      defineUniversity({
        "id": "panama-santiago-de-veraguas-universidad-de-panama-centro-regional-universitario-de-veraguas-cruv",
        "name": "Universidad de Panamá (Centro Regional Universitario de Veraguas - CRUV)",
        "cityId": "panama-santiago-de-veraguas",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-santiago-de-veraguas-escuela-normal-superior-juan-demostenes-arosemena",
        "name": "Escuela Normal Superior Juan Demóstenes Arosemena",
        "cityId": "panama-santiago-de-veraguas",
        "website": null,
        "type": "public"
      }),
      defineUniversity({
        "id": "panama-santiago-de-veraguas-universidad-tecnologica-de-panama-centro-regional-de-cocle",
        "name": "Universidad Tecnológica de Panamá (Centro Regional de Coclé)",
        "cityId": "panama-santiago-de-veraguas",
        "website": "https://utp.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-chitre",
    name: "Chitré",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-chitre-chitre-herrera-las-tablas-los-santos",
        "name": "Chitré (Herrera) / Las Tablas (Los Santos)",
        "cityId": "panama-chitre",
        "website": "https://www.up.ac.pa",
        "type": null
      }),
      defineUniversity({
        "id": "panama-chitre-universidad-de-panama-cru-de-azuero-chitre",
        "name": "Universidad de Panamá (CRU de Azuero / Chitré)",
        "cityId": "panama-chitre",
        "website": "https://www.up.ac.pa",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "panama-penonome",
    name: "Penonomé",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "panama-penonome-penonome-cocle",
        "name": "Penonomé (Coclé)",
        "cityId": "panama-penonome",
        "website": "https://utp.ac.pa",
        "type": null
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
