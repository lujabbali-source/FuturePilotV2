// Australia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "australia";
const countryName = "Australia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/australia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "australia-canberra",
      name: "Canberra",
      coordinates: {"lat": -35.28346, "lng": 149.12807},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 367752 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-brisbane",
      name: "Brisbane",
      coordinates: {"lat": -27.46794, "lng": 153.02809},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 2780063 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-perth",
      name: "Perth",
      coordinates: {"lat": -31.95224, "lng": 115.8614},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 2384371 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-ballarat",
      name: "Ballarat",
      coordinates: {"lat": -37.56622, "lng": 143.84957},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 111973 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-darwin",
      name: "Darwin",
      coordinates: {"lat": -12.46113, "lng": 130.84185},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 139902 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-surry-hills",
      name: "Surry Hills",
      coordinates: {"lat": -33.88374, "lng": 151.21282},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 15828 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-willetton",
      name: "Willetton",
      coordinates: {"lat": -32.05251, "lng": 115.88782},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 19262 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-adelaide-city-centre",
      name: "Adelaide city centre",
      coordinates: {"lat": -34.92873, "lng": 138.60334},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 19820 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-scarborough",
      name: "Scarborough",
      coordinates: {"lat": -31.89578, "lng": 115.76431},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 17605 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-sydney",
      name: "Sydney",
      coordinates: {"lat": -33.86785, "lng": 151.20732},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 5638830 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-epping",
      name: "Epping",
      coordinates: {"lat": -33.77271, "lng": 151.08184},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 23435 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-cessnock",
      name: "Cessnock",
      coordinates: {"lat": -32.83211, "lng": 151.35623},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 23211 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-carlton",
      name: "Carlton",
      coordinates: {"lat": -37.8, "lng": 144.96667},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 16055 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-buderim",
      name: "Buderim",
      coordinates: {"lat": -26.68443, "lng": 153.05705},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 28774 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-bracken-ridge",
      name: "Bracken Ridge",
      coordinates: {"lat": -27.3171, "lng": 153.03097},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 16701 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "australia-cranebrook",
      name: "Cranebrook",
      coordinates: {"lat": -33.7061, "lng": 150.7094},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 15649 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Australia",
  capital: "Canberra",
  currency: "AUD",
  language: "inglés",
  continent: "Oceanía",
  population: 27614411,
  cities,
  // Las universidades no van aqui: viven en ./universities/australia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 59,
  aliases: ["australia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
