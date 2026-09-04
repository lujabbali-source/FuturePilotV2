// Ghana — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "ghana";
const countryName = "Ghana";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/ghana.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "ghana-accra",
      name: "Accra",
      coordinates: {"lat": 5.55602, "lng": -0.1969},
      isCapital: true,
      universityCount: 8,
      statistics: { population: 1963264 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-koforidua",
      name: "Koforidua",
      coordinates: {"lat": 6.09408, "lng": -0.25913},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 151255 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-cape-coast",
      name: "Cape Coast",
      coordinates: {"lat": 5.10535, "lng": -1.2466},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 212426 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-medina-estates",
      name: "Medina Estates",
      coordinates: {"lat": 5.6658, "lng": -0.16307},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 101207 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-ho",
      name: "Ho",
      coordinates: {"lat": 6.60084, "lng": 0.4713},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 130701 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-kumasi",
      name: "Kumasi",
      coordinates: {"lat": 6.68848, "lng": -1.62443},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 2544530 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-sunyani",
      name: "Sunyani",
      coordinates: {"lat": 7.33991, "lng": -2.32676},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 92825 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-aburi",
      name: "Aburi",
      coordinates: {"lat": 5.84802, "lng": -0.17449},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 18399 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-osu",
      name: "Osu",
      coordinates: {"lat": 5.55728, "lng": -0.1864},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 44000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-wa",
      name: "Wa",
      coordinates: {"lat": 10.06069, "lng": -2.50192},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 78107 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-tamale",
      name: "Tamale",
      coordinates: {"lat": 9.40079, "lng": -0.8393},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 464316 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-adenta",
      name: "Adenta",
      coordinates: {"lat": 5.71417, "lng": -0.15418},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 50652 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-awoshi",
      name: "Awoshi",
      coordinates: {"lat": 5.58385, "lng": -0.27787},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 32426 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-new-achimota",
      name: "New Achimota",
      coordinates: {"lat": 5.62657, "lng": -0.25807},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 37116 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ghana-dome",
      name: "Dome",
      coordinates: {"lat": 5.65003, "lng": -0.2361},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 48285 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Ghana",
  capital: "Accra",
  currency: "GHS",
  language: "inglés",
  continent: "África",
  population: 35064272,
  cities,
  // Las universidades no van aqui: viven en ./universities/ghana.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 31,
  aliases: ["ghana"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
