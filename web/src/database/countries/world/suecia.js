// Suecia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "suecia";
const countryName = "Suecia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/suecia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "suecia-vasastaden",
      name: "Vasastaden",
      coordinates: {"lat": 59.35, "lng": 18.03333},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 58458 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suecia-vaxjo",
      name: "Växjö",
      coordinates: {"lat": 56.87767, "lng": 14.80906},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 71282 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suecia-uppsala",
      name: "Uppsala",
      coordinates: {"lat": 59.85882, "lng": 17.63889},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 177074 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suecia-ostermalm",
      name: "Östermalm",
      coordinates: {"lat": 59.33879, "lng": 18.08487},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 36418 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suecia-malmo",
      name: "Malmö",
      coordinates: {"lat": 55.60587, "lng": 13.00073},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 362133 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "suecia-gothenburg",
      name: "Gothenburg",
      coordinates: {"lat": 57.70716, "lng": 11.96679},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 608462 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Sweden",
  capital: "Stockholm",
  currency: "SEK",
  language: "sueco",
  continent: "Europa",
  population: 10596620,
  cities,
  // Las universidades no van aqui: viven en ./universities/suecia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 36,
  aliases: ["suecia", "sweden"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
