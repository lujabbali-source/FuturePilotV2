import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "paraguay";
const countryName = "Paraguay";

const cities = [
  defineCity({
    id: "paraguay-asuncion",
    name: "Asunción",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "paraguay-asuncion-universidad-nacional-de-asuncion-una",
        "name": "Universidad Nacional de Asunción (UNA)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.una.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-catolica-nuestra-senora-de-la-asuncion-uc",
        "name": "Universidad Católica \"Nuestra Señora de la Asunción\" (UC)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.universidadcatolica.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-autonoma-de-asuncion-uaa",
        "name": "Universidad Autónoma de Asunción (UAA)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.uaa.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-americana-ua",
        "name": "Universidad Americana (UA)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.americana.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-columbia-del-paraguay",
        "name": "Universidad Columbia del Paraguay",
        "cityId": "paraguay-asuncion",
        "website": "https://www.columbia.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-san-carlos-usc",
        "name": "Universidad San Carlos (USC)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.sancarlos.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-politecnica-taiwan-paraguay-uptp-sede-luque",
        "name": "Universidad Politécnica Taiwán-Paraguay (UPTP) (Sede Luque)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.uptp.edu.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-asuncion-universidad-del-pacifico-up",
        "name": "Universidad del Pacífico (UP)",
        "cityId": "paraguay-asuncion",
        "website": "https://www.upacifico.edu.py",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "paraguay-encarnacion",
    name: "Encarnación",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "paraguay-encarnacion-universidad-nacional-de-itapua-uni",
        "name": "Universidad Nacional de Itapúa (UNI)",
        "cityId": "paraguay-encarnacion",
        "website": "https://www.uni.edu.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-encarnacion-universidad-catolica-nuestra-senora-de-la-asuncion-campus-itapua",
        "name": "Universidad Católica \"Nuestra Señora de la Asunción\" (Campus Itapúa)",
        "cityId": "paraguay-encarnacion",
        "website": "https://www.uci.edu.py",
        "type": "private"
      }),
      defineUniversity({
        "id": "paraguay-encarnacion-universidad-autonoma-de-encarnacion-unae",
        "name": "Universidad Autónoma de Encarnación (UNAE)",
        "cityId": "paraguay-encarnacion",
        "website": "https://www.unae.edu.py",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "paraguay-coronel-oviedo",
    name: "Coronel Oviedo",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "paraguay-coronel-oviedo-coronel-oviedo-caaguazu",
        "name": "Coronel Oviedo (Caaguazú)",
        "cityId": "paraguay-coronel-oviedo",
        "website": "https://www.unca.edu.py",
        "type": null
      }),
      defineUniversity({
        "id": "paraguay-coronel-oviedo-universidad-nacional-de-caaguazu-unca",
        "name": "Universidad Nacional de Caaguazú (UNCA)",
        "cityId": "paraguay-coronel-oviedo",
        "website": "https://www.unca.edu.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-coronel-oviedo-villarrica-guaira",
        "name": "Villarrica (Guairá)",
        "cityId": "paraguay-coronel-oviedo",
        "website": "https://www.unves.edu.py",
        "type": null
      }),
      defineUniversity({
        "id": "paraguay-coronel-oviedo-universidad-nacional-de-villarrica-del-espiritu-santo-unves",
        "name": "Universidad Nacional de Villarrica del Espíritu Santo (UNVES)",
        "cityId": "paraguay-coronel-oviedo",
        "website": "https://www.unves.edu.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-coronel-oviedo-universidad-catolica-nuestra-senora-de-la-asuncion-campus-guaira",
        "name": "Universidad Católica \"Nuestra Señora de la Asunción\" (Campus Guairá)",
        "cityId": "paraguay-coronel-oviedo",
        "website": "https://www.ucguaira.edu.py",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "paraguay-concepcion",
    name: "Concepción",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "paraguay-concepcion-concepcion",
        "name": "Concepción",
        "cityId": "paraguay-concepcion",
        "website": "https://www.unc.edu.py",
        "type": null
      }),
      defineUniversity({
        "id": "paraguay-concepcion-universidad-nacional-de-concepcion-unc",
        "name": "Universidad Nacional de Concepción (UNC)",
        "cityId": "paraguay-concepcion",
        "website": "https://www.unc.edu.py",
        "type": "public"
      }),
      defineUniversity({
        "id": "paraguay-concepcion-pilar-neembucu",
        "name": "Pilar (Ñeembucú)",
        "cityId": "paraguay-concepcion",
        "website": "https://www.unp.edu.py",
        "type": null
      }),
      defineUniversity({
        "id": "paraguay-concepcion-universidad-nacional-de-pilar-unp",
        "name": "Universidad Nacional de Pilar (UNP)",
        "cityId": "paraguay-concepcion",
        "website": "https://www.unp.edu.py",
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
    "name": "Universidad Nacional del Este (UNE)",
    "website": "https://www.une.edu.py",
    "type": "public"
  },
  {
    "name": "Universidad Católica \"Nuestra Señora de la Asunción\" (Campus Alto Paraná)",
    "website": "https://www.uc.edu.py/altoparana",
    "type": "private"
  },
  {
    "name": "Universidad Privada del Este (UPE)",
    "website": "https://www.upe.edu.py",
    "type": "private"
  }
],
});
