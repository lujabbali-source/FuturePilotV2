import { defineCity, defineCountry, defineUniversity } from "../schema";

const countryId = "el-salvador";
const countryName = "El Salvador";

const cities = [
  defineCity({
    id: "el-salvador-san-salvador",
    name: "San Salvador",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-de-el-salvador-ues-sede-central-campus-central",
        "name": "Universidad de El Salvador (UES - Sede Central / Campus Central)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.ues.edu.sv",
        "type": "public"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-don-bosco-udb-soyapango-san-salvador",
        "name": "Universidad Don Bosco (UDB) (Soyapango / San Salvador)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.udb.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-tecnologica-de-el-salvador-utec",
        "name": "Universidad Tecnológica de El Salvador (UTEC)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.utec.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-francisco-gaviria-ufg",
        "name": "Universidad Francisco Gaviria (UFG)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.ufg.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-evangelica-de-el-salvador-uees",
        "name": "Universidad Evangélica de El Salvador (UEES)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.uees.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-universidad-politecnica-de-el-salvador-upes",
        "name": "Universidad Politécnica de El Salvador (UPES)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.upes.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-escuela-superior-de-economia-y-negocios-esen-santa-tecla-la-libertad",
        "name": "Escuela Superior de Economía y Negocios (ESEN) (Santa Tecla / La Libertad)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.esen.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-salvador-instituto-tecnologico-centroamericano-itca-fepade-sede-santa-tecla",
        "name": "Instituto Tecnológico Centroamericano (ITCA-FEPADE - Sede Santa Tecla)",
        "cityId": "el-salvador-san-salvador",
        "website": "https://www.itca.edu.sv",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "el-salvador-antiguo-cuscatlan",
    name: "Antiguo Cuscatlán",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-antiguo-cuscatlan-universidad-centroamericana-jose-simeon-canas-uca-antiguo-cuscatlan",
        "name": "Universidad Centroamericana José Simeón Cañas (UCA) (Antiguo Cuscatlán)",
        "cityId": "el-salvador-antiguo-cuscatlan",
        "website": "https://www.uca.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-antiguo-cuscatlan-universidad-dr-jose-matias-delgado-ujmd-antiguo-cuscatlan",
        "name": "Universidad Dr. José Matías Delgado (UJMD) (Antiguo Cuscatlán)",
        "cityId": "el-salvador-antiguo-cuscatlan",
        "website": "https://www.ujmd.edu.sv",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "el-salvador-santa-ana",
    name: "Santa Ana",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-santa-ana-facultad-multidisciplinaria-de-occidente-ues-fmo-ues-santa-ana",
        "name": "Facultad Multidisciplinaria de Occidente - UES (FMO-UES) (Santa Ana)",
        "cityId": "el-salvador-santa-ana",
        "website": "https://www.fmo.ues.edu.sv",
        "type": "public"
      }),
      defineUniversity({
        "id": "el-salvador-santa-ana-universidad-catolica-de-el-salvador-unicaes-sede-central-santa-ana",
        "name": "Universidad Católica de El Salvador (UNICAES - Sede Central Santa Ana)",
        "cityId": "el-salvador-santa-ana",
        "website": "https://www.catolica.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-santa-ana-universidad-autonoma-de-santa-ana-unasa",
        "name": "Universidad Autónoma de Santa Ana (UNASA)",
        "cityId": "el-salvador-santa-ana",
        "website": "https://www.unasa.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-santa-ana-itca-fepade-regional-santa-ana",
        "name": "ITCA-FEPADE (Regional Santa Ana)",
        "cityId": "el-salvador-santa-ana",
        "website": "https://www.itca.edu.sv",
        "type": "public"
      }),
    ],
  }),
  defineCity({
    id: "el-salvador-san-miguel",
    name: "San Miguel",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-san-miguel-facultad-multidisciplinaria-oriental-ues-fmo-ues-san-miguel",
        "name": "Facultad Multidisciplinaria Oriental - UES (FMO-UES) (San Miguel)",
        "cityId": "el-salvador-san-miguel",
        "website": "https://www.fmo.ues.edu.sv",
        "type": "public"
      }),
      defineUniversity({
        "id": "el-salvador-san-miguel-universidad-capitan-general-gerardo-barrios-ugb-sede-san-miguel",
        "name": "Universidad Capitán General Gerardo Barrios (UGB - Sede San Miguel)",
        "cityId": "el-salvador-san-miguel",
        "website": "https://www.ugb.edu.sv",
        "type": "private"
      }),
      defineUniversity({
        "id": "el-salvador-san-miguel-universidad-de-oriente-univo-san-miguel",
        "name": "Universidad de Oriente (UNIVO) (San Miguel)",
        "cityId": "el-salvador-san-miguel",
        "website": "https://www.univo.edu.sv",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "el-salvador-usulutan",
    name: "Usulután",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-usulutan-universidad-catolica-de-el-salvador-unicaes-centro-regional-ilobasco-usulutan",
        "name": "Universidad Católica de El Salvador (UNICAES - Centro Regional Ilobasco / Usulután)",
        "cityId": "el-salvador-usulutan",
        "website": "https://www.catolica.edu.sv",
        "type": "private"
      }),
    ],
  }),
  defineCity({
    id: "el-salvador-san-vicente",
    name: "San Vicente",
    coordinates: null,
    isCapital: false,
    countryId,
    countryName,
    universities: [
      defineUniversity({
        "id": "el-salvador-san-vicente-facultad-multidisciplinaria-paracentral-ues-fmp-ues-san-vicente",
        "name": "Facultad Multidisciplinaria Paracentral - UES (FMP-UES) (San Vicente)",
        "cityId": "el-salvador-san-vicente",
        "website": "https://www.fmp.ues.edu.sv",
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
