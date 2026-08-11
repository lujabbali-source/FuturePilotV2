import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "guatemala";
const countryName = "Guatemala";

const cities = [
  defineCity({
    id: "guatemala-ciudad-de-guatemala",
    name: "Ciudad de Guatemala",
    region: "Ciudad de Guatemala y Área Metropolitana (Departamento de Guatemala, Fraijanes, Santa Catarina Pinula)",
    coordinates: {"lat": 14.6349, "lng": -90.5069},
    statistics: { population: "~3.000.000 habitantes (Área Metropolitana)", safety: "Moderada", weather: "13°C a 27°C", language: "Español", currency: "Quetzal (GTQ)", internetSpeed: "~70 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Sobresaliente" },
    isCapital: true,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-de-san-carlos-de-guatemala-usac",
        "name": "Universidad de San Carlos de Guatemala (USAC)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://www.usac.edu.gt",
        "type": "public"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-del-valle-de-guatemala-uvg",
        "name": "Universidad del Valle de Guatemala (UVG)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://www.uvg.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-francisco-marroquin-ufm",
        "name": "Universidad Francisco Marroquín (UFM)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://www.ufm.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-rafael-landivar-url-campus-central",
        "name": "Universidad Rafael Landívar (URL - Campus Central)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://principal.url.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-galileo",
        "name": "Universidad Galileo",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://www.galileo.edu",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-del-istmo-unis",
        "name": "Universidad del Istmo (UNIS)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://unis.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-mariano-galvez-de-guatemala-umg",
        "name": "Universidad Mariano Gálvez de Guatemala (UMG)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://umg.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-panamericana-upana",
        "name": "Universidad Panamericana (UPANA)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://www.upana.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-ciudad-de-guatemala-universidad-da-vinci-de-guatemala-udv",
        "name": "Universidad Da Vinci de Guatemala (UDV)",
        "cityId": "guatemala-ciudad-de-guatemala",
        "website": "https://udv.edu.gt",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "guatemala-quetzaltenango",
    name: "Quetzaltenango",
    region: "Quetzaltenango (Xela) y Occidente",
    coordinates: {"lat": 14.8347, "lng": -91.5181},
    statistics: { population: "~200.000 habitantes", safety: "Alta", weather: "4°C a 22°C", language: "Español / Quiché", currency: "Quetzal (GTQ)", internetSpeed: "~55 Mbps", qualityOfLife: "Alta", studentSatisfaction: "Muy alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "guatemala-quetzaltenango-centro-universitario-de-occidente-usac-cunoc",
        "name": "Centro Universitario de Occidente - USAC (CUNOC)",
        "cityId": "guatemala-quetzaltenango",
        "website": "https://cunoc.edu.gt",
        "type": "public"
      }),
      defineUniversity({
        "id": "guatemala-quetzaltenango-universidad-rafael-landivar-campus-san-alberto-hurtado-s-j-quetzaltenango",
        "name": "Universidad Rafael Landívar (Campus San Alberto Hurtado, S.J. - Quetzaltenango)",
        "cityId": "guatemala-quetzaltenango",
        "website": "https://principal.url.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-quetzaltenango-universidad-mesoamericana-campus-quetzaltenango",
        "name": "Universidad Mesoamericana (Campus Quetzaltenango)",
        "cityId": "guatemala-quetzaltenango",
        "website": "https://www.mesoamericana.edu.gt",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-quetzaltenango-universidad-del-valle-de-guatemala-campus-altiplano-solola",
        "name": "Universidad del Valle de Guatemala (Campus Altiplano - Sololá)",
        "cityId": "guatemala-quetzaltenango",
        "website": "https://www.uvg.edu.gt/campuses/altiplano/",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "guatemala-coban",
    name: "Cobán",
    region: "Alta Verapaz (Cobán) y Región Norte",
    coordinates: {"lat": 15.4667, "lng": -90.3667},
    statistics: { population: "~130.000 habitantes (Cobán)", safety: "Alta", weather: "13°C a 26°C", language: "Español / Kekchí", currency: "Quetzal (GTQ)", internetSpeed: "~45 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "guatemala-coban-centro-universitario-del-norte-usac-cunor-coban",
        "name": "Centro Universitario del Norte - USAC (CUNOR - Cobán)",
        "cityId": "guatemala-coban",
        "website": "https://cunor.usac.edu.gt",
        "type": "public"
      }),
      defineUniversity({
        "id": "guatemala-coban-universidad-rafael-landivar-campus-san-pedro-claver-s-j-san-juan-chamelco-coban",
        "name": "Universidad Rafael Landívar (Campus San Pedro Claver, S.J. - San Juan Chamelco / Cobán)",
        "cityId": "guatemala-coban",
        "website": "https://principal.url.edu.gt",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "guatemala-escuintla",
    name: "Escuintla",
    region: "Escuintla y Costa Sur",
    coordinates: {"lat": 14.305, "lng": -90.785},
    statistics: { population: "~170.000 habitantes", safety: "Moderada", weather: "21°C a 34°C", language: "Español", currency: "Quetzal (GTQ)", internetSpeed: "~50 Mbps", qualityOfLife: "Media", studentSatisfaction: "Media - Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "guatemala-escuintla-universidad-del-valle-de-guatemala-campus-sur-santa-lucia-cotzumalguapa",
        "name": "Universidad del Valle de Guatemala (Campus Sur - Santa Lucía Cotzumalguapa)",
        "cityId": "guatemala-escuintla",
        "website": "https://www.uvg.edu.gt/campuses/sur/",
        "type": "private"
      }),
      defineUniversity({
        "id": "guatemala-escuintla-centro-universitario-del-sur-usac-cunsur-escuintla",
        "name": "Centro Universitario del Sur - USAC (CUNSUR - Escuintla)",
        "cityId": "guatemala-escuintla",
        "website": "https://cunsur.usac.edu.gt",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "guatemala-zacapa",
    name: "Zacapa",
    region: "Zacapa y Chiquimula (Región Oriente)",
    coordinates: {"lat": 14.9722, "lng": -89.5306},
    statistics: { population: "~110.000 habitantes (Chiquimula)", safety: "Moderada - Alta", weather: "20°C a 35°C", language: "Español", currency: "Quetzal (GTQ)", internetSpeed: "~45 Mbps", qualityOfLife: "Media - Alta", studentSatisfaction: "Alta" },
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "guatemala-zacapa-centro-universitario-de-chiquimula-usac-cunori",
        "name": "Centro Universitario de Chiquimula - USAC (CUNORI)",
        "cityId": "guatemala-zacapa",
        "website": "https://cunori.edu.gt",
        "type": "public"
      }),
      defineUniversity({
        "id": "guatemala-zacapa-universidad-rafael-landivar-campus-san-luis-gonzaga-s-j-zacapa",
        "name": "Universidad Rafael Landívar (Campus San Luis Gonzaga, S.J. - Zacapa)",
        "cityId": "guatemala-zacapa",
        "website": "https://principal.url.edu.gt",
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
