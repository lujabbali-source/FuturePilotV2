// Líbano — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "libano";
const countryName = "Líbano";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/libano.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "libano-beirut",
      name: "Beirut",
      coordinates: {"lat": 33.89332, "lng": 35.50157},
      isCapital: true,
      universityCount: 18,
      statistics: { population: 1916100 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libano-tripoli",
      name: "Tripoli",
      coordinates: {"lat": 34.43352, "lng": 35.84415},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 229398 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libano-ra-s-bayrut",
      name: "Ra’s Bayrūt",
      coordinates: {"lat": 33.9, "lng": 35.48333},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 1251739 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libano-aley",
      name: "Aley",
      coordinates: {"lat": 33.80528, "lng": 35.6},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 130000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "libano-jounieh",
      name: "Jounieh",
      coordinates: {"lat": 33.98083, "lng": 35.61778},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 96315 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Lebanon",
  capital: "Beirut",
  currency: "LBP",
  language: "árabe",
  continent: "Asia",
  population: 5849421,
  cities,
  // Las universidades no van aqui: viven en ./universities/libano.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 24,
  aliases: ["lebanon", "libano"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
