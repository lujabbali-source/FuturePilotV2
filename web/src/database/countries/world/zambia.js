// Zambia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "zambia";
const countryName = "Zambia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/zambia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "zambia-lusaka",
      name: "Lusaka",
      coordinates: {"lat": -15.40669, "lng": 28.28713},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 2212301 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "zambia-kitwe",
      name: "Kitwe",
      coordinates: {"lat": -12.80243, "lng": 28.21323},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 665961 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "zambia-kabwe",
      name: "Kabwe",
      coordinates: {"lat": -14.4469, "lng": 28.44644},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 288598 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Zambia",
  capital: "Lusaka",
  currency: "ZMW",
  language: "inglés",
  continent: "África",
  population: 21913874,
  cities,
  // Las universidades no van aqui: viven en ./universities/zambia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 7,
  aliases: ["zambia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
