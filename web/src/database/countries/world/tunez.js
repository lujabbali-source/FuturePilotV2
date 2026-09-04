// Túnez — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "tunez";
const countryName = "Túnez";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/tunez.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "tunez-tunis",
      name: "Tunis",
      coordinates: {"lat": 36.81897, "lng": 10.16579},
      isCapital: true,
      universityCount: 19,
      statistics: { population: 693210 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-sousse",
      name: "Sousse",
      coordinates: {"lat": 35.82539, "lng": 10.63699},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 221715 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-aryanah",
      name: "Aryanah",
      coordinates: {"lat": 36.86012, "lng": 10.19337},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 114486 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-sukrah",
      name: "Sukrah",
      coordinates: {"lat": 36.87744, "lng": 10.2468},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 159862 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-sfax",
      name: "Sfax",
      coordinates: {"lat": 34.74056, "lng": 10.76028},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 280566 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-hammam-sousse",
      name: "Hammam Sousse",
      coordinates: {"lat": 35.8609, "lng": 10.60313},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 42691 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-le-kram",
      name: "Le Kram",
      coordinates: {"lat": 36.83578, "lng": 10.31641},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 88302 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-nabeul",
      name: "Nabeul",
      coordinates: {"lat": 36.45606, "lng": 10.73763},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 70437 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-kairouan",
      name: "Kairouan",
      coordinates: {"lat": 35.6781, "lng": 10.09633},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 139070 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "tunez-rawad",
      name: "Rawad",
      coordinates: {"lat": 36.89479, "lng": 10.18604},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 94961 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Tunisia",
  capital: "Tunis",
  currency: "TND",
  language: "árabe",
  continent: "África",
  population: 12348573,
  cities,
  // Las universidades no van aqui: viven en ./universities/tunez.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 19,
  aliases: ["tunez", "tunisia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
