// Serbia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "serbia";
const countryName = "Serbia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/serbia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "serbia-belgrade",
      name: "Belgrade",
      coordinates: {"lat": 44.80401, "lng": 20.46513},
      isCapital: true,
      universityCount: 20,
      statistics: { population: 1273651 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-zemun",
      name: "Zemun",
      coordinates: {"lat": 44.8458, "lng": 20.40116},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 155591 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-novi-beograd",
      name: "Novi Beograd",
      coordinates: {"lat": 44.80556, "lng": 20.42417},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 209763 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-novi-sad",
      name: "Novi Sad",
      coordinates: {"lat": 45.25167, "lng": 19.83694},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 215400 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-sabac",
      name: "Šabac",
      coordinates: {"lat": 44.74667, "lng": 19.69},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 55114 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-novi-pazar",
      name: "Novi Pazar",
      coordinates: {"lat": 43.13667, "lng": 20.51222},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 85996 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-nis",
      name: "Niš",
      coordinates: {"lat": 43.32472, "lng": 21.90333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 250000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "serbia-cacak",
      name: "Čačak",
      coordinates: {"lat": 43.89139, "lng": 20.34972},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 117072 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Serbia",
  capital: "Belgrade",
  currency: "RSD",
  language: "serbio",
  continent: "Europa",
  population: 6549143,
  cities,
  // Las universidades no van aqui: viven en ./universities/serbia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 13,
  aliases: ["serbia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
