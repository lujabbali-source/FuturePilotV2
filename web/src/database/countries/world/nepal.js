// Nepal — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "nepal";
const countryName = "Nepal";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/nepal.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "nepal-kathmandu",
      name: "Kathmandu",
      coordinates: {"lat": 27.70169, "lng": 85.3206},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 1442271 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nepal-pokhara",
      name: "Pokhara",
      coordinates: {"lat": 28.26689, "lng": 83.96851},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 600051 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nepal-madhyapur-thimi",
      name: "Madhyapur Thimi",
      coordinates: {"lat": 27.68056, "lng": 85.3875},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 119955 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nepal-rajbiraj",
      name: "Rājbirāj",
      coordinates: {"lat": 26.53968, "lng": 86.74796},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 69803 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "nepal-nepalgunj",
      name: "Nepalgunj",
      coordinates: {"lat": 28.05, "lng": 81.61667},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 166258 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Nepal",
  capital: "Kathmandu",
  currency: "NPR",
  language: "nepalí",
  continent: "Asia",
  population: 29618118,
  cities,
  // Las universidades no van aqui: viven en ./universities/nepal.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["nepal"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
