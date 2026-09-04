// Reunión — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "reunion";
const countryName = "Reunión";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/reunion.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "reunion-sainte-marie",
      name: "Sainte-Marie",
      coordinates: {"lat": -20.89686, "lng": 55.55056},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 34344 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "reunion-saint-denis",
      name: "Saint-Denis",
      coordinates: {"lat": -20.88231, "lng": 55.4504},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 154765 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Reunion",
  capital: "Saint-Denis",
  currency: "EUR",
  language: "francés",
  continent: "África",
  population: null,
  cities,
  // Las universidades no van aqui: viven en ./universities/reunion.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["reunion"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
