import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "honduras";
const countryName = "Honduras";

const cities = [
  defineCity({
    id: "honduras-tegucigalpa",
    name: "Tegucigalpa",
    region: "Tegucigalpa y Distrito Central (Departamento de Francisco Morazán)",
    coordinates: {"lat": 14.0723, "lng": -87.1921},
    statistics: { population: "~1.300.000 habitantes", safety: "Moderada - Baja", weather: "14°C a 30°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~60 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-nacional-autonoma-de-honduras-unah",
        "name": "Universidad Nacional Autónoma de Honduras (UNAH)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-tecnologica-centroamericana-unitec-tegucigalpa",
        "name": "Universidad Tecnológica Centroamericana (UNITEC Tegucigalpa)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.unitec.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-pedagogica-nacional-francisco-morazan-upnfm",
        "name": "Universidad Pedagógica Nacional Francisco Morazán (UPNFM)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.upnfm.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-catolica-de-honduras-nuestra-senora-reina-de-la-paz-unicah-campus-sagrado-corazon-de-jesus",
        "name": "Universidad Católica de Honduras \"Nuestra Señora Reina de la Paz\" (UNICAH - Campus Sagrado Corazón de Jesús)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.unicah.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-jose-cecilio-del-valle-ujcv",
        "name": "Universidad José Cecilio del Valle (UJCV)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.ujcv.edu.hn",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-universidad-zamorano-escuela-agricola-panamericana-zamorano",
        "name": "Universidad Zamorano (Escuela Agrícola Panamericana Zamorano)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.zamorano.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-tegucigalpa-centro-universitario-tecnologico-ceutec-tegucigalpa",
        "name": "Centro Universitario Tecnológico (CEUTEC Tegucigalpa)",
        "cityId": "honduras-tegucigalpa",
        "website": "https://www.ceutec.hn",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "honduras-san-pedro-sula",
    name: "San Pedro Sula",
    region: "San Pedro Sula y Valle de Sula (Departamento de Cortés)",
    coordinates: {"lat": 15.5044, "lng": -88.025},
    statistics: { population: "~900.000 habitantes", safety: "Moderada - Baja", weather: "21°C a 35°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~65 Mbps", qualityOfLife: "Media", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-san-pedro-sula-unah-en-el-valle-de-sula-unah-vs",
        "name": "UNAH en el Valle de Sula (UNAH-VS)",
        "cityId": "honduras-san-pedro-sula",
        "website": "https://vallesula.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-san-pedro-sula-universidad-de-san-pedro-sula-usap",
        "name": "Universidad de San Pedro Sula (USAP)",
        "cityId": "honduras-san-pedro-sula",
        "website": "https://www.usap.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-san-pedro-sula-universidad-tecnologica-de-honduras-uth-campus-central-san-pedro-sula",
        "name": "Universidad Tecnológica de Honduras (UTH - Campus Central San Pedro Sula)",
        "cityId": "honduras-san-pedro-sula",
        "website": "https://www.uth.hn",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-san-pedro-sula-unitec-san-pedro-sula",
        "name": "UNITEC San Pedro Sula",
        "cityId": "honduras-san-pedro-sula",
        "website": "https://www.unitec.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "honduras-la-ceiba",
    name: "La Ceiba",
    region: "La Ceiba y Costa Norte (Departamento de Atlántida)",
    coordinates: {"lat": 15.7597, "lng": -86.7822},
    statistics: { population: "~220.000 habitantes", safety: "Moderada", weather: "22°C a 32°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~50 Mbps", qualityOfLife: "Media", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-la-ceiba-centro-universitario-regional-del-litoral-atlantico-unah-curla",
        "name": "Centro Universitario Regional del Litoral Atlántico (UNAH-CURLA)",
        "cityId": "honduras-la-ceiba",
        "website": "https://curla.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-la-ceiba-universidad-catolica-de-honduras-unicah-campus-san-isidro",
        "name": "Universidad Católica de Honduras (UNICAH - Campus San Isidro)",
        "cityId": "honduras-la-ceiba",
        "website": "https://www.unicah.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "honduras-la-ceiba-universidad-tecnologica-de-honduras-uth-la-ceiba",
        "name": "Universidad Tecnológica de Honduras (UTH La Ceiba)",
        "cityId": "honduras-la-ceiba",
        "website": "https://www.uth.hn",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "honduras-comayagua",
    name: "Comayagua",
    region: "Comayagua y Región Central (Departamento de Comayagua)",
    coordinates: {"lat": 14.4522, "lng": -87.6392},
    statistics: { population: "~160.000 habitantes", safety: "Alta", weather: "18°C a 32°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~45 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-comayagua-centro-universitario-regional-del-centro-unah-curc",
        "name": "Centro Universitario Regional del Centro (UNAH-CURC)",
        "cityId": "honduras-comayagua",
        "website": "https://curc.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-comayagua-universidad-catolica-de-honduras-unicah-campus-monsenor-nicolas-d-antonio",
        "name": "Universidad Católica de Honduras (UNICAH - Campus Monseñor Nicolás D'Antonio)",
        "cityId": "honduras-comayagua",
        "website": "https://www.unicah.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "honduras-santa-rosa-de-copan",
    name: "Santa Rosa de Copán",
    region: "Santa Rosa de Copán (Región Occidental)",
    coordinates: {"lat": 14.7667, "lng": -88.7833},
    statistics: { population: "~70.000 habitantes", safety: "Muy alta", weather: "14°C a 27°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~40 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-santa-rosa-de-copan-centro-universitario-regional-del-occidente-unah-curoc",
        "name": "Centro Universitario Regional del Occidente (UNAH-CUROC)",
        "cityId": "honduras-santa-rosa-de-copan",
        "website": "https://curoc.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-santa-rosa-de-copan-universidad-catolica-de-honduras-unicah-campus-santa-rosa-de-lima",
        "name": "Universidad Católica de Honduras (UNICAH - Campus Santa Rosa de Lima)",
        "cityId": "honduras-santa-rosa-de-copan",
        "website": "https://www.unicah.edu",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "honduras-choluteca",
    name: "Choluteca",
    region: "Choluteca y Región Sur (Departamento de Choluteca)",
    coordinates: {"lat": 13.3, "lng": -87.1833},
    statistics: { population: "~170.000 habitantes", safety: "Alta", weather: "23°C a 36°C", language: "Español", currency: "Lempira (HNL)", internetSpeed: "~45 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "honduras-choluteca-centro-universitario-regional-del-litoral-pacifico-unah-curlp",
        "name": "Centro Universitario Regional del Litoral Pacífico (UNAH-CURLP)",
        "cityId": "honduras-choluteca",
        "website": "https://curlp.unah.edu.hn",
        "type": "public"
      }),
      defineUniversity({
        "id": "honduras-choluteca-universidad-tecnologica-de-honduras-uth-choluteca",
        "name": "Universidad Tecnológica de Honduras (UTH Choluteca)",
        "cityId": "honduras-choluteca",
        "website": "https://www.uth.hn",
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
