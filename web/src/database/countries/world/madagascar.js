// Madagascar — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "madagascar";
const countryName = "Madagascar";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/madagascar.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "madagascar-antananarivo",
      name: "Antananarivo",
      coordinates: {"lat": -18.91368, "lng": 47.53613},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 1349501 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "madagascar-antsirabe",
      name: "Antsirabe",
      coordinates: {"lat": -19.86586, "lng": 47.03333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 260907 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Madagascar",
  capital: "Antananarivo",
  currency: "MGA",
  language: "francés",
  continent: "África",
  population: 32740678,
  cities,
  // Las universidades no van aqui: viven en ./universities/madagascar.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 6,
  aliases: ["madagascar"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
