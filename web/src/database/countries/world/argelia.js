// Argelia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "argelia";
const countryName = "Argelia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/argelia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "argelia-cheraga",
      name: "Cheraga",
      coordinates: {"lat": 36.76775, "lng": 2.95924},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 27835 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-saida",
      name: "Saïda",
      coordinates: {"lat": 34.83033, "lng": 0.15171},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 142497 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-bir-el-djir",
      name: "Bir el Djir",
      coordinates: {"lat": 35.72, "lng": -0.545},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 68032 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-ali-mendjeli",
      name: "Ali Mendjeli",
      coordinates: {"lat": 36.2459, "lng": 6.5671},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 64120 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-boumerdas",
      name: "Boumerdas",
      coordinates: {"lat": 36.76639, "lng": 3.47717},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 28996 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-tipasa",
      name: "Tipasa",
      coordinates: {"lat": 36.58972, "lng": 2.44889},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 15180 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-ouargla",
      name: "Ouargla",
      coordinates: {"lat": 31.94932, "lng": 5.32502},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 169928 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-mansoura",
      name: "Mansoûra",
      coordinates: {"lat": 34.86158, "lng": -1.33935},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 52285 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-constantine",
      name: "Constantine",
      coordinates: {"lat": 36.365, "lng": 6.61472},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 448028 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-beni-mered",
      name: "Beni Mered",
      coordinates: {"lat": 36.52389, "lng": 2.86131},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 92749 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-batna",
      name: "Batna",
      coordinates: {"lat": 35.55597, "lng": 6.17414},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 289504 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-bab-ezzouar",
      name: "Bab Ezzouar",
      coordinates: {"lat": 36.72615, "lng": 3.18291},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 275630 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "argelia-algiers",
      name: "Algiers",
      coordinates: {"lat": 36.73225, "lng": 3.08746},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 2364230 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Algeria",
  capital: "Algiers",
  currency: "DZD",
  language: "árabe",
  continent: "África",
  population: 47435312,
  cities,
  // Las universidades no van aqui: viven en ./universities/argelia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 29,
  aliases: ["algeria", "argelia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
