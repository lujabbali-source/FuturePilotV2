import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "puerto-rico";
const countryName = "Puerto Rico";

const cities = [
  defineCity({
    id: "puerto-rico-san-juan",
    name: "San Juan",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-de-puerto-rico-recinto-de-rio-piedras-uprrp",
        "name": "Universidad de Puerto Rico - Recinto de Río Piedras (UPRRP)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.uprrp.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-de-puerto-rico-recinto-de-ciencias-medicas-upr-rcm",
        "name": "Universidad de Puerto Rico - Recinto de Ciencias Médicas (UPR-RCM)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://rcm.upr.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-interamericana-de-puerto-rico-recinto-metro",
        "name": "Universidad Interamericana de Puerto Rico (Recinto Metro)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://metro.inter.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-del-sagrado-corazon-sagrado-santurce",
        "name": "Universidad del Sagrado Corazón (Sagrado) (Santurce)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.sagrado.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-san-juan-universidad-politecnica-de-puerto-rico-pupr-hato-rey",
        "name": "Universidad Politécnica de Puerto Rico (PUPR) (Hato Rey)",
        "cityId": "puerto-rico-san-juan",
        "website": "https://www.pupr.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-carolina",
    name: "Carolina",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-carolina-universidad-ana-g-mendez-uagm-campus-de-cupey-carolina-gurabo",
        "name": "Universidad Ana G. Méndez (UAGM - Campus de Cupey / Carolina / Gurabo)",
        "cityId": "puerto-rico-carolina",
        "website": "https://uagm.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-carolina-universidad-de-puerto-rico-en-carolina-uprc",
        "name": "Universidad de Puerto Rico en Carolina (UPRC)",
        "cityId": "puerto-rico-carolina",
        "website": "https://uprc.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-bayamon",
    name: "Bayamón",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-bayamon-universidad-de-puerto-rico-en-bayamon-uprb",
        "name": "Universidad de Puerto Rico en Bayamón (UPRB)",
        "cityId": "puerto-rico-bayamon",
        "website": "https://www.uprb.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-mayaguez",
    name: "Mayagüez",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-de-puerto-rico-recinto-universitario-de-mayaguez-rum-colegio",
        "name": "Universidad de Puerto Rico - Recinto Universitario de Mayagüez (RUM / Colegio)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://www.uprm.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-interamericana-de-puerto-rico-recinto-de-san-german",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de San Germán)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://sangerman.inter.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-de-puerto-rico-en-aguadilla-uprag",
        "name": "Universidad de Puerto Rico en Aguadilla (UPRAG)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://www.uprag.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-mayaguez-universidad-interamericana-de-puerto-rico-recinto-de-aguadilla",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Aguadilla)",
        "cityId": "puerto-rico-mayaguez",
        "website": "https://aguadilla.inter.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-ponce",
    name: "Ponce",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-ponce-ponce-health-sciences-university-phsu",
        "name": "Ponce Health Sciences University (PHSU)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.psm.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-pontificia-universidad-catolica-de-puerto-rico-pucpr-recinto-de-ponce",
        "name": "Pontificia Universidad Católica de Puerto Rico (PUCPR - Recinto de Ponce)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.pucpr.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-universidad-de-puerto-rico-en-ponce-uprp",
        "name": "Universidad de Puerto Rico en Ponce (UPRP)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.upr.edu/ponce",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-ponce-escuela-de-medicina-san-juan-bautista-caguas-region-centro-sur",
        "name": "Escuela de Medicina San Juan Bautista (Caguas - Región Centro-Sur)",
        "cityId": "puerto-rico-ponce",
        "website": "https://www.sanjuanbautista.edu",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-arecibo",
    name: "Arecibo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-arecibo-universidad-de-puerto-rico-en-arecibo-upra",
        "name": "Universidad de Puerto Rico en Arecibo (UPRA)",
        "cityId": "puerto-rico-arecibo",
        "website": "https://www.upra.edu",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-arecibo-universidad-interamericana-de-puerto-rico-recinto-de-arecibo",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Arecibo)",
        "cityId": "puerto-rico-arecibo",
        "website": "https://arecibo.inter.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-utuado",
    name: "Utuado",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-utuado-universidad-de-puerto-rico-en-utuado-upru",
        "name": "Universidad de Puerto Rico en Utuado (UPRU)",
        "cityId": "puerto-rico-utuado",
        "website": "https://upr.edu/utuado",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-humacao-cayey",
    name: "Humacao, Cayey",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-humacao-cayey-universidad-de-puerto-rico-en-humacao-uprh",
        "name": "Universidad de Puerto Rico en Humacao (UPRH)",
        "cityId": "puerto-rico-humacao-cayey",
        "website": "https://www.upr.edu/humacao",
        "type": "public"
      }),
      defineUniversity({
        "id": "puerto-rico-humacao-cayey-universidad-de-puerto-rico-en-cayey-uprcay",
        "name": "Universidad de Puerto Rico en Cayey (UPRCAY)",
        "cityId": "puerto-rico-humacao-cayey",
        "website": "https://www.upr.edu/cayey",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "puerto-rico-fajardo",
    name: "Fajardo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "puerto-rico-fajardo-universidad-interamericana-de-puerto-rico-recinto-de-fajardo",
        "name": "Universidad Interamericana de Puerto Rico (Recinto de Fajardo)",
        "cityId": "puerto-rico-fajardo",
        "website": "https://fajardo.inter.edu",
        "type": "private"
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
