// Togo — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "togo";
const countryName = "Togo";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/togo.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "togo-lome",
      name: "Lomé",
      coordinates: {"lat": 6.12874, "lng": 1.22154},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 2188376 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "togo-kara",
      name: "Kara",
      coordinates: {"lat": 9.55111, "lng": 1.18611},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 104207 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Togo",
  capital: "Lome",
  currency: "XOF",
  language: "francés",
  continent: "África",
  population: 8591626,
  cities,
  // Las universidades no van aqui: viven en ./universities/togo.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["togo"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
