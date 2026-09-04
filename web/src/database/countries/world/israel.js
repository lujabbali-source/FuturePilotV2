// Israel — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "israel";
const countryName = "Israel";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/israel.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "israel-nesher",
      name: "Nesher",
      coordinates: {"lat": 32.76622, "lng": 35.04425},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 24148 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "israel-jerusalem",
      name: "Jerusalem",
      coordinates: {"lat": 31.76904, "lng": 35.21633},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 971800 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "israel-ra-anana",
      name: "Ra'anana",
      coordinates: {"lat": 32.1836, "lng": 34.87386},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 75421 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Israel",
  capital: "Jerusalem",
  currency: "ILS",
  language: "hebreo",
  continent: "Asia",
  population: 10122800,
  cities,
  // Las universidades no van aqui: viven en ./universities/israel.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 24,
  aliases: ["israel"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
