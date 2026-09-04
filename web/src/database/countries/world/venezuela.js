// Venezuela — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "venezuela";
const countryName = "Venezuela";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/venezuela.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "venezuela-caracas",
      name: "Caracas",
      coordinates: {"lat": 10.48801, "lng": -66.87919},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 3000000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-san-cristobal",
      name: "San Cristóbal",
      coordinates: {"lat": 7.76593, "lng": -72.23576},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 289852 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-san-antonio-de-los-altos",
      name: "San Antonio de Los Altos",
      coordinates: {"lat": 10.38853, "lng": -66.95179},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 63873 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-maracaibo",
      name: "Maracaibo",
      coordinates: {"lat": 10.64232, "lng": -71.61089},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 1752602 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-valencia",
      name: "Valencia",
      coordinates: {"lat": 10.16153, "lng": -68.00044},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1619470 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-nirgua",
      name: "Nirgua",
      coordinates: {"lat": 10.15039, "lng": -68.56478},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 54080 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-baruta",
      name: "Baruta",
      coordinates: {"lat": 10.43424, "lng": -66.87558},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 244216 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-el-cafetal",
      name: "El Cafetal",
      coordinates: {"lat": 10.46541, "lng": -66.82951},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 80029 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "venezuela-la-dolorita",
      name: "La Dolorita",
      coordinates: {"lat": 10.4883, "lng": -66.78608},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 56846 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Venezuela",
  capital: "Caracas",
  currency: "VES",
  language: "español",
  continent: "América",
  population: 28516896,
  cities,
  // Las universidades no van aqui: viven en ./universities/venezuela.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 37,
  aliases: ["venezuela"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
