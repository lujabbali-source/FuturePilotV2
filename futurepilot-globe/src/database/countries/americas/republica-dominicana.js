import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "republica-dominicana";
const countryName = "República Dominicana";

const cities = [
  defineCity({
    id: "republica-dominicana-santo-domingo",
    name: "Santo Domingo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-universidad-autonoma-de-santo-domingo-uasd",
        "name": "Universidad Autónoma de Santo Domingo (UASD)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://uasd.edu.do",
        "type": "public"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-pontificia-universidad-catolica-madre-y-maestra-pucmm-campus-santo-domingo",
        "name": "Pontificia Universidad Católica Madre y Maestra (PUCMM - Campus Santo Domingo)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://pucmm.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-instituto-tecnologico-de-santo-domingo-intec",
        "name": "Instituto Tecnológico de Santo Domingo (INTEC)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://www.intec.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-universidad-iberoamericana-unibe",
        "name": "Universidad Iberoamericana (UNIBE)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://www.unibe.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-universidad-nacional-pedro-henriquez-urena-unphu",
        "name": "Universidad Nacional Pedro Henríquez Ureña (UNPHU)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://unphu.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-universidad-apec-unapec",
        "name": "Universidad APEC (UNAPEC)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://unapec.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-instituto-tecnologico-de-las-americas-itla-boca-chica-santo-domingo",
        "name": "Instituto Tecnológico de Las Américas (ITLA) (Boca Chica / Santo Domingo)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://itla.edu.do",
        "type": "public"
      }),
      defineUniversity({
        "id": "republica-dominicana-santo-domingo-universidad-catolica-santo-domingo-ucsd",
        "name": "Universidad Católica Santo Domingo (UCSD)",
        "cityId": "republica-dominicana-santo-domingo",
        "website": "https://ucsd.edu.do",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "republica-dominicana-santiago-de-los-caballeros",
    name: "Santiago de los Caballeros",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "republica-dominicana-santiago-de-los-caballeros-pontificia-universidad-catolica-madre-y-maestra-pucmm-campus-santiago-sede-principal",
        "name": "Pontificia Universidad Católica Madre y Maestra (PUCMM - Campus Santiago / Sede Principal)",
        "cityId": "republica-dominicana-santiago-de-los-caballeros",
        "website": "https://pucmm.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santiago-de-los-caballeros-universidad-tecnologica-de-santiago-utesa-sede-matriz",
        "name": "Universidad Tecnológica de Santiago (UTESA - Sede Matriz)",
        "cityId": "republica-dominicana-santiago-de-los-caballeros",
        "website": "https://www.utesa.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santiago-de-los-caballeros-universidad-abierta-para-adultos-uapa-sede-central",
        "name": "Universidad Abierta para Adultos (UAPA - Sede Central)",
        "cityId": "republica-dominicana-santiago-de-los-caballeros",
        "website": "https://www.uapa.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-santiago-de-los-caballeros-universidad-autonoma-de-santo-domingo-uasd-recinto-santiago",
        "name": "Universidad Autónoma de Santo Domingo (UASD - Recinto Santiago)",
        "cityId": "republica-dominicana-santiago-de-los-caballeros",
        "website": "https://uasd.edu.do",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "republica-dominicana-san-pedro-de-macoris",
    name: "San Pedro de Macorís",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "republica-dominicana-san-pedro-de-macoris-san-pedro-de-macoris",
        "name": "San Pedro de Macorís",
        "cityId": "republica-dominicana-san-pedro-de-macoris",
        "website": "https://www.uce.edu.do",
        "type": null
      }),
      defineUniversity({
        "id": "republica-dominicana-san-pedro-de-macoris-universidad-central-del-este-uce",
        "name": "Universidad Central del Este (UCE)",
        "cityId": "republica-dominicana-san-pedro-de-macoris",
        "website": "https://www.uce.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-san-pedro-de-macoris-universidad-autonoma-de-santo-domingo-uasd-centro-san-pedro",
        "name": "Universidad Autónoma de Santo Domingo (UASD - Centro San Pedro)",
        "cityId": "republica-dominicana-san-pedro-de-macoris",
        "website": "https://uasd.edu.do",
        "type": "public"
      }),
      defineUniversity({
        "id": "republica-dominicana-san-pedro-de-macoris-universidad-o-m-organizacion-y-metodo-sede-la-romana",
        "name": "Universidad O&M (Organización y Método - Sede La Romana)",
        "cityId": "republica-dominicana-san-pedro-de-macoris",
        "website": "https://www.udoym.edu.do",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "republica-dominicana-la-vega-moca",
    name: "La Vega, Moca",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "republica-dominicana-la-vega-moca-universidad-catolica-tecnologica-del-cibao-ucateci",
        "name": "Universidad Católica Tecnológica del Cibao (UCATECI)",
        "cityId": "republica-dominicana-la-vega-moca",
        "website": "https://ucateci.edu.do",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-la-vega-moca-san-francisco-de-macoris-duarte",
        "name": "San Francisco de Macorís (Duarte)",
        "cityId": "republica-dominicana-la-vega-moca",
        "website": "https://www.ucne.edu",
        "type": null
      }),
      defineUniversity({
        "id": "republica-dominicana-la-vega-moca-universidad-catolica-nordestana-ucne",
        "name": "Universidad Católica Nordestana (UCNE)",
        "cityId": "republica-dominicana-la-vega-moca",
        "website": "https://www.ucne.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "republica-dominicana-la-vega-moca-universidad-autonoma-de-santo-domingo-uasd-recinto-san-francisco",
        "name": "Universidad Autónoma de Santo Domingo (UASD - Recinto San Francisco)",
        "cityId": "republica-dominicana-la-vega-moca",
        "website": "https://uasd.edu.do",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "republica-dominicana-san-cristobal",
    name: "San Cristóbal",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "republica-dominicana-san-cristobal-san-cristobal",
        "name": "San Cristóbal",
        "cityId": "republica-dominicana-san-cristobal",
        "website": "https://www.ipl.edu.do",
        "type": null
      }),
      defineUniversity({
        "id": "republica-dominicana-san-cristobal-instituto-politecnico-loyola-ipl",
        "name": "Instituto Politécnico Loyola (IPL)",
        "cityId": "republica-dominicana-san-cristobal",
        "website": "https://www.ipl.edu.do",
        "type": "public"
      }),
      defineUniversity({
        "id": "republica-dominicana-san-cristobal-barahona",
        "name": "Barahona",
        "cityId": "republica-dominicana-san-cristobal",
        "website": "https://uasd.edu.do",
        "type": null
      }),
      defineUniversity({
        "id": "republica-dominicana-san-cristobal-universidad-autonoma-de-santo-domingo-uasd-centro-barahona-curso",
        "name": "Universidad Autónoma de Santo Domingo (UASD - Centro Barahona / CURSO)",
        "cityId": "republica-dominicana-san-cristobal",
        "website": "https://uasd.edu.do",
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
