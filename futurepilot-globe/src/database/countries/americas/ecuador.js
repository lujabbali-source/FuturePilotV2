import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "ecuador";
const countryName = "Ecuador";

const cities = [
  defineCity({
    id: "ecuador-quito",
    name: "Quito",
    region: "Quito y Pichincha",
    coordinates: {"lat": -0.1807, "lng": -78.4678},
    isCapital: true,
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
    region: "Guayaquil y Guayas",
    coordinates: {"lat": -2.1894, "lng": -79.8891},
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
    region: "Cuenca y Azuay",
    coordinates: {"lat": -2.9006, "lng": -79.0045},
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
    id: "ecuador-ambato",
    name: "Ambato",
    region: "Ambato, Riobamba y Latacunga (Sierra Centro)",
    coordinates: {"lat": -1.2417, "lng": -78.6197},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-ambato-universidad-tecnica-de-ambato-uta",
        "name": "Universidad Técnica de Ambato (UTA)",
        "cityId": "ecuador-ambato",
        "website": "https://www.uta.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-ambato-pontificia-universidad-catolica-del-ecuador-puce-sede-ambato",
        "name": "Pontificia Universidad Católica del Ecuador (PUCE - Sede Ambato)",
        "cityId": "ecuador-ambato",
        "website": "https://pucesa.edu.ec",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-chimborazo",
    name: "Chimborazo",
    region: "Ambato, Riobamba y Latacunga (Sierra Centro)",
    coordinates: {"lat": -1.6635, "lng": -78.6547},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-chimborazo-escuela-superior-politecnica-de-chimborazo-espoch",
        "name": "Escuela Superior Politécnica de Chimborazo (ESPOCH)",
        "cityId": "ecuador-chimborazo",
        "website": "https://www.espoch.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-chimborazo-universidad-nacional-de-chimborazo-unach",
        "name": "Universidad Nacional de Chimborazo (UNACH)",
        "cityId": "ecuador-chimborazo",
        "website": "https://www.unach.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-cotopaxi",
    name: "Cotopaxi",
    region: "Ambato, Riobamba y Latacunga (Sierra Centro)",
    coordinates: {"lat": -0.9331, "lng": -78.6157},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-cotopaxi-universidad-tecnica-de-cotopaxi-utc",
        "name": "Universidad Técnica de Cotopaxi (UTC)",
        "cityId": "ecuador-cotopaxi",
        "website": "https://www.utc.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-loja",
    name: "Loja",
    region: "Loja y Machala (Zona Sur)",
    coordinates: {"lat": -3.9931, "lng": -79.2042},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    ],
  }),
  defineCity({
    id: "ecuador-machala",
    name: "Machala",
    region: "Loja y Machala (Zona Sur)",
    coordinates: {"lat": -3.2581, "lng": -79.9553},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-machala-universidad-tecnica-de-machala-utmach",
        "name": "Universidad Técnica de Machala (UTMACH)",
        "cityId": "ecuador-machala",
        "website": "https://www.utmachala.edu.ec",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "ecuador-portoviejo",
    name: "Portoviejo",
    region: "Manabí (Portoviejo, Manta) y Costa Norte (Santa Elena, Esmeraldas)",
    coordinates: {"lat": -1.0546, "lng": -80.453},
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "ecuador-portoviejo-universidad-tecnica-de-manabi-utm-portoviejo",
        "name": "Universidad Técnica de Manabí (UTM) (Portoviejo)",
        "cityId": "ecuador-portoviejo",
        "website": "https://www.utm.edu.ec",
        "type": "public"
      }),
      defineUniversity({
        "id": "ecuador-portoviejo-universidad-laica-eloy-alfaro-de-manabi-uleam-manta",
        "name": "Universidad Laica Eloy Alfaro de Manabí (ULEAM) (Manta)",
        "cityId": "ecuador-portoviejo",
        "website": "https://www.uleam.edu.ec",
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
    id: "ecuador-santa-elena",
    name: "Santa Elena",
    region: "Manabí (Portoviejo, Manta) y Costa Norte (Santa Elena, Esmeraldas)",
    coordinates: {"lat": -2.227, "lng": -80.858},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Manabí (Portoviejo, Manta) y Costa Norte (Santa Elena, Esmeraldas)",
    coordinates: {"lat": 0.9682, "lng": -79.6517},
    isCapital: false,
    countryId,
    countryName,
    universities: [
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
    region: "Ibarra y la Sierra Norte (Imbabura, Carchi, Urcuquí)",
    coordinates: {"lat": 0.3517, "lng": -78.1223},
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
    region: "Ibarra y la Sierra Norte (Imbabura, Carchi, Urcuquí)",
    coordinates: {"lat": 0.3833, "lng": -78.1917},
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
    region: "Región Amazónica (Puyo, Tena)",
    coordinates: {"lat": -1.4924, "lng": -78.0022},
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
    region: "Región Amazónica (Puyo, Tena)",
    coordinates: {"lat": -0.9938, "lng": -77.8131},
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
