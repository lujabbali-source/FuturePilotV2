// Zimbabue — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "zimbabue";
const countryName = "Zimbabue";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/zimbabue.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "zimbabue-harare",
      name: "Harare",
      coordinates: {"lat": -17.82772, "lng": 31.05337},
      isCapital: true,
      universityCount: 6,
      statistics: { population: 1542813 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "zimbabue-masvingo",
      name: "Masvingo",
      coordinates: {"lat": -20.06373, "lng": 30.82766},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 90286 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "zimbabue-bulawayo",
      name: "Bulawayo",
      coordinates: {"lat": -20.15, "lng": 28.58333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 665952 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Zimbabwe",
  capital: "Harare",
  currency: "ZWG",
  language: "inglés",
  continent: "África",
  population: 16950795,
  cities,
  // Las universidades no van aqui: viven en ./universities/zimbabue.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["zimbabue", "zimbabwe"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
