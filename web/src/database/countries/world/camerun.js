// Camerún — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "camerun";
const countryName = "Camerún";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/camerun.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "camerun-yaounde",
      name: "Yaoundé",
      coordinates: {"lat": 3.86667, "lng": 11.51667},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 1299369 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "camerun-bamenda",
      name: "Bamenda",
      coordinates: {"lat": 5.9597, "lng": 10.14597},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 420445 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "camerun-nanga-eboko",
      name: "Nanga Eboko",
      coordinates: {"lat": 4.68333, "lng": 12.36667},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 28518 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Cameroon",
  capital: "Yaounde",
  currency: "XAF",
  language: "inglés",
  continent: "África",
  population: 29879337,
  cities,
  // Las universidades no van aqui: viven en ./universities/camerun.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 10,
  aliases: ["cameroon", "camerun"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
