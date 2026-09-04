// Hong Kong — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "hong-kong";
const countryName = "Hong Kong";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/hong-kong.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "hong-kong-oi-man-estate",
      name: "Oi Man Estate",
      coordinates: {"lat": 22.31197, "lng": 114.17853},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 17407 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hong-kong-tai-shui-hang",
      name: "Tai Shui Hang",
      coordinates: {"lat": 22.40631, "lng": 114.22385},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 17647 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hong-kong-wong-chuk-hang",
      name: "Wong Chuk Hang",
      coordinates: {"lat": 22.23981, "lng": 114.17001},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 16316 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hong-kong-wang-tau-hom-estate",
      name: "Wang Tau Hom Estate",
      coordinates: {"lat": 22.34009, "lng": 114.18673},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 16794 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Hong Kong",
  capital: "Hong Kong",
  currency: "HKD",
  language: "chino",
  continent: "Asia",
  population: 7498900,
  cities,
  // Las universidades no van aqui: viven en ./universities/hong-kong.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["hong-kong"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
