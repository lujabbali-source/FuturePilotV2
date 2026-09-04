// Mozambique — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "mozambique";
const countryName = "Mozambique";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/mozambique.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "mozambique-nampula",
      name: "Nampula",
      coordinates: {"lat": -15.11646, "lng": 39.2666},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 770379 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "mozambique-maputo",
      name: "Maputo",
      coordinates: {"lat": -25.96553, "lng": 32.58322},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 1254837 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "mozambique-chimoio",
      name: "Chimoio",
      coordinates: {"lat": -19.11639, "lng": 33.48333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 422046 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "mozambique-beira",
      name: "Beira",
      coordinates: {"lat": -19.84361, "lng": 34.83889},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 687764 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Mozambique",
  capital: "Maputo",
  currency: "MZN",
  language: "portugués",
  continent: "África",
  population: 35631653,
  cities,
  // Las universidades no van aqui: viven en ./universities/mozambique.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 8,
  aliases: ["mozambique"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
