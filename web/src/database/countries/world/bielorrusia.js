// Bielorrusia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "bielorrusia";
const countryName = "Bielorrusia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/bielorrusia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "bielorrusia-minsk",
      name: "Minsk",
      coordinates: {"lat": 53.90019, "lng": 27.56653},
      isCapital: true,
      universityCount: 17,
      statistics: { population: 1742124 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-homyel",
      name: "Homyel'",
      coordinates: {"lat": 52.4345, "lng": 30.9754},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 501193 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-brest",
      name: "Brest",
      coordinates: {"lat": 52.10894, "lng": 23.71749},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 347138 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-polotsk",
      name: "Polotsk",
      coordinates: {"lat": 55.4879, "lng": 28.7856},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 79285 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-mahilyow",
      name: "Mahilyow",
      coordinates: {"lat": 53.90876, "lng": 30.34044},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 352896 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-hrodna",
      name: "Hrodna",
      coordinates: {"lat": 53.6758, "lng": 23.82887},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 363718 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-vitebsk",
      name: "Vitebsk",
      coordinates: {"lat": 55.1904, "lng": 30.2049},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 358927 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "bielorrusia-pinsk",
      name: "Pinsk",
      coordinates: {"lat": 52.12153, "lng": 26.06726},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 123283 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Belarus",
  capital: "Minsk",
  currency: "BYN",
  language: "bielorruso",
  continent: "Europa",
  population: 9085991,
  cities,
  // Las universidades no van aqui: viven en ./universities/bielorrusia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 34,
  aliases: ["belarus", "bielorrusia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
