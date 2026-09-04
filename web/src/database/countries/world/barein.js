// Baréin — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "barein";
const countryName = "Baréin";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/barein.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "barein-ar-rifa",
      name: "Ar Rifā‘",
      coordinates: {"lat": 26.13, "lng": 50.555},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 115495 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "barein-manama",
      name: "Manama",
      coordinates: {"lat": 26.22787, "lng": 50.58565},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 147074 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "barein-madinat-isa",
      name: "Madīnat ‘Īsá",
      coordinates: {"lat": 26.17361, "lng": 50.54778},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 38090 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Bahrain",
  capital: "Manama",
  currency: "BHD",
  language: "árabe",
  continent: "Asia",
  population: 1600366,
  cities,
  // Las universidades no van aqui: viven en ./universities/barein.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 12,
  aliases: ["bahrain", "barein"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
