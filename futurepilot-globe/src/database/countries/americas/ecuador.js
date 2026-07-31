import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "ecuador";
const countryName = "Ecuador";

const cities = [
  defineCity({
    id: "ecuador-quito",
    name: "Quito",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-quito-universidad-central-del-ecuador-uce",
        "name": "Universidad Central del Ecuador (UCE)",
        "cityId": "ecuador-quito",
        "website": "https://www.uce.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-quito-escuela-politecnica-nacional-epn",
        "name": "Escuela Politécnica Nacional (EPN)",
        "cityId": "ecuador-quito",
        "website": "https://www.epn.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-san-francisco-de-quito-usfq",
        "name": "Universidad San Francisco de Quito (USFQ)",
        "cityId": "ecuador-quito",
        "website": "https://www.usfq.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-pontificia-universidad-catolica-del-ecuador-puce",
        "name": "Pontificia Universidad Católica del Ecuador (PUCE)",
        "cityId": "ecuador-quito",
        "website": "https://www.puce.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-de-las-americas-udla",
        "name": "Universidad de Las Américas (UDLA)",
        "cityId": "ecuador-quito",
        "website": "https://www.udla.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-de-las-fuerzas-armadas-espe-sede-sangolqui-quito",
        "name": "Universidad de las Fuerzas Armadas (ESPE) (Sede Sangolquí/Quito)",
        "cityId": "ecuador-quito",
        "website": "https://www.espe.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-tecnologica-equinoccial-ute",
        "name": "Universidad Tecnológica Equinoccial (UTE)",
        "cityId": "ecuador-quito",
        "website": "https://www.ute.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-internacional-del-ecuador-uide",
        "name": "Universidad Internacional del Ecuador (UIDE)",
        "cityId": "ecuador-quito",
        "website": "https://www.uide.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-politecnica-salesiana-ups-campus-quito",
        "name": "Universidad Politécnica Salesiana (UPS - Campus Quito)",
        "cityId": "ecuador-quito",
        "website": "https://www.ups.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-quito-universidad-andina-simon-bolivar-uasb",
        "name": "Universidad Andina Simón Bolívar (UASB)",
        "cityId": "ecuador-quito",
        "website": "https://www.uasb.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-guayaquil",
    name: "Guayaquil",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-guayaquil-escuela-superior-politecnica-del-litoral-espol",
        "name": "Escuela Superior Politécnica del Litoral (ESPOL)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.espol.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-de-guayaquil-ug",
        "name": "Universidad de Guayaquil (UG)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.ug.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-catolica-de-santiago-de-guayaquil-ucsg",
        "name": "Universidad Católica de Santiago de Guayaquil (UCSG)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.ucsg.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-de-especialidades-espiritu-santo-uees-sede-samborondon-guayaquil",
        "name": "Universidad de Especialidades Espíritu Santo (UEES) (Sede Samborondón/Guayaquil)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.uees.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-laica-vicente-rocafuerte-de-guayaquil-ulvr",
        "name": "Universidad Laica Vicente Rocafuerte de Guayaquil (ULVR)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.ulvr.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-casa-grande",
        "name": "Universidad Casa Grande",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.casagrande.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-guayaquil-universidad-politecnica-salesiana-ups-campus-guayaquil",
        "name": "Universidad Politécnica Salesiana (UPS - Campus Guayaquil)",
        "cityId": "ecuador-guayaquil",
        "website": "https://www.ups.edu.ec",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-cuenca",
    name: "Cuenca",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-cuenca-universidad-de-cuenca",
        "name": "Universidad de Cuenca",
        "cityId": "ecuador-cuenca",
        "website": "https://www.ucuenca.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-cuenca-universidad-del-azuay-uda",
        "name": "Universidad del Azuay (UDA)",
        "cityId": "ecuador-cuenca",
        "website": "https://www.uda.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-cuenca-universidad-politecnica-salesiana-ups-matriz-cuenca",
        "name": "Universidad Politécnica Salesiana (UPS - Matriz Cuenca)",
        "cityId": "ecuador-cuenca",
        "website": "https://www.ups.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-cuenca-universidad-catolica-de-cuenca-ucacue",
        "name": "Universidad Católica de Cuenca (UCACUE)",
        "cityId": "ecuador-cuenca",
        "website": "https://www.ucacue.edu.ec",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-ambato-riobamba",
    name: "Ambato, Riobamba",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-ambato-riobamba-ambato-tungurahua",
        "name": "Ambato (Tungurahua)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.uta.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-universidad-tecnica-de-ambato-uta",
        "name": "Universidad Técnica de Ambato (UTA)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.uta.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-pontificia-universidad-catolica-del-ecuador-puce-sede-ambato",
        "name": "Pontificia Universidad Católica del Ecuador (PUCE - Sede Ambato)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://pucesa.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-riobamba-chimborazo",
        "name": "Riobamba (Chimborazo)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.espoch.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-escuela-superior-politecnica-de-chimborazo-espoch",
        "name": "Escuela Superior Politécnica de Chimborazo (ESPOCH)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.espoch.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-universidad-nacional-de-chimborazo-unach",
        "name": "Universidad Nacional de Chimborazo (UNACH)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.unach.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-latacunga-cotopaxi",
        "name": "Latacunga (Cotopaxi)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.utc.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-ambato-riobamba-universidad-tecnica-de-cotopaxi-utc",
        "name": "Universidad Técnica de Cotopaxi (UTC)",
        "cityId": "ecuador-ambato-riobamba",
        "website": "https://www.utc.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-loja",
    name: "Loja",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-loja-loja",
        "name": "Loja",
        "cityId": "ecuador-loja",
        "website": "https://www.utpl.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-loja-universidad-tecnica-particular-de-loja-utpl",
        "name": "Universidad Técnica Particular de Loja (UTPL)",
        "cityId": "ecuador-loja",
        "website": "https://www.utpl.edu.ec",
        "type": "private"
      }),
      defineUniversity({
        "id": "ecuador-loja-universidad-nacional-de-loja-unl",
        "name": "Universidad Nacional de Loja (UNL)",
        "cityId": "ecuador-loja",
        "website": "https://unl.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-loja-machala-el-oro",
        "name": "Machala (El Oro)",
        "cityId": "ecuador-loja",
        "website": "https://www.utmachala.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-loja-universidad-tecnica-de-machala-utmach",
        "name": "Universidad Técnica de Machala (UTMACH)",
        "cityId": "ecuador-loja",
        "website": "https://www.utmachala.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-portoviejo",
    name: "Portoviejo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-portoviejo-portoviejo-y-manta-manabi",
        "name": "Portoviejo y Manta (Manabí)",
        "cityId": "ecuador-portoviejo",
        "website": "https://www.utm.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-portoviejo-universidad-tecnica-de-manabi-utm-portoviejo",
        "name": "Universidad Técnica de Manabí (UTM) (Portoviejo)",
        "cityId": "ecuador-portoviejo",
        "website": "https://www.utm.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-portoviejo-universidad-san-gregorio-de-portoviejo",
        "name": "Universidad San Gregorio de Portoviejo",
        "cityId": "ecuador-portoviejo",
        "website": "https://www.sangregorio.edu.ec",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-manta",
    name: "Manta",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-manta-universidad-laica-eloy-alfaro-de-manabi-uleam-manta",
        "name": "Universidad Laica Eloy Alfaro de Manabí (ULEAM) (Manta)",
        "cityId": "ecuador-manta",
        "website": "https://www.uleam.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-santa-elena",
    name: "Santa Elena",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-santa-elena-santa-elena",
        "name": "Santa Elena",
        "cityId": "ecuador-santa-elena",
        "website": "https://www.upse.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-santa-elena-universidad-estatal-peninsula-de-santa-elena-upse",
        "name": "Universidad Estatal Península de Santa Elena (UPSE)",
        "cityId": "ecuador-santa-elena",
        "website": "https://www.upse.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-esmeraldas",
    name: "Esmeraldas",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-esmeraldas-esmeraldas",
        "name": "Esmeraldas",
        "cityId": "ecuador-esmeraldas",
        "website": "https://www.utelvt.edu.ec",
        "type": null
      }),
      defineUniversity({
        "id": "ecuador-esmeraldas-universidad-tecnica-luis-vargas-torres-de-esmeraldas-utelvt",
        "name": "Universidad Técnica Luis Vargas Torres de Esmeraldas (UTELVT)",
        "cityId": "ecuador-esmeraldas",
        "website": "https://www.utelvt.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-ibarra",
    name: "Ibarra",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-ibarra-universidad-tecnica-del-norte-utn-ibarra",
        "name": "Universidad Técnica del Norte (UTN) (Ibarra)",
        "cityId": "ecuador-ibarra",
        "website": "https://www.utn.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-ibarra-universidad-politecnica-estatal-del-carchi-upec-tulcan",
        "name": "Universidad Politécnica Estatal del Carchi (UPEC) (Tulcán)",
        "cityId": "ecuador-ibarra",
        "website": "https://www.upec.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-urcuqui",
    name: "Urcuquí",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-urcuqui-yachay-tech-universidad-de-investigacion-de-tecnologia-experimental-urcuqui",
        "name": "Yachay Tech (Universidad de Investigación de Tecnología Experimental) (Urcuquí)",
        "cityId": "ecuador-urcuqui",
        "website": "https://www.yachaytech.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-puyo",
    name: "Puyo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-puyo-universidad-estatal-amazonica-uea-puyo",
        "name": "Universidad Estatal Amazónica (UEA) (Puyo)",
        "cityId": "ecuador-puyo",
        "website": "https://www.uea.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-tena",
    name: "Tena",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-tena-universidad-regional-amazonica-ikiam-tena",
        "name": "Universidad Regional Amazónica IKIAM (Tena)",
        "cityId": "ecuador-tena",
        "website": "https://www.ikiam.edu.ec",
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
