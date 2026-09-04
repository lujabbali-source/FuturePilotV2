// Benín — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "benin";
const countryName = "Benín";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/benin.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "benin-cotonou",
      name: "Cotonou",
      coordinates: {"lat": 6.36536, "lng": 2.41833},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 679012 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "benin-godome",
      name: "Godomè",
      coordinates: {"lat": 6.38948, "lng": 2.34581},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 253262 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "benin-ketou",
      name: "Kétou",
      coordinates: {"lat": 7.36332, "lng": 2.59978},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 39626 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "benin-abomey-calavi",
      name: "Abomey-Calavi",
      coordinates: {"lat": 6.44852, "lng": 2.35566},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 385755 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "benin-abomey",
      name: "Abomey",
      coordinates: {"lat": 7.18286, "lng": 1.99119},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 117824 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Benin",
  capital: "Porto-Novo",
  currency: "XOF",
  language: "francés",
  continent: "África",
  population: 14814460,
  cities,
  // Las universidades no van aqui: viven en ./universities/benin.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 3,
  aliases: ["benin"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
