// Austria — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "austria";
const countryName = "Austria";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/austria.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "austria-vienna",
      name: "Vienna",
      coordinates: {"lat": 48.20849, "lng": 16.37208},
      isCapital: true,
      universityCount: 9,
      statistics: { population: 1691468 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-linz",
      name: "Linz",
      coordinates: {"lat": 48.30639, "lng": 14.28611},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 204846 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-sankt-polten",
      name: "Sankt Pölten",
      coordinates: {"lat": 48.20762, "lng": 15.63725},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 21911 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-baden",
      name: "Baden",
      coordinates: {"lat": 48.00543, "lng": 16.23264},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 26286 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-salzburg",
      name: "Salzburg",
      coordinates: {"lat": 47.79941, "lng": 13.04399},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 157245 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-innere-stadt",
      name: "Innere Stadt",
      coordinates: {"lat": 48.20906, "lng": 16.37135},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 16450 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-innsbruck",
      name: "Innsbruck",
      coordinates: {"lat": 47.26266, "lng": 11.39454},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 132493 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-landstra-e",
      name: "Landstraße",
      coordinates: {"lat": 48.2019, "lng": 16.38792},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 98389 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-alsergrund",
      name: "Alsergrund",
      coordinates: {"lat": 48.22321, "lng": 16.35506},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 41645 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-wilten",
      name: "Wilten",
      coordinates: {"lat": 47.25829, "lng": 11.38808},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 18142 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-wiener-neustadt",
      name: "Wiener Neustadt",
      coordinates: {"lat": 47.80485, "lng": 16.23196},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 44820 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-pradl",
      name: "Pradl",
      coordinates: {"lat": 47.26539, "lng": 11.4152},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 32588 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-favoriten",
      name: "Favoriten",
      coordinates: {"lat": 48.16116, "lng": 16.38233},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 201882 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-geidorf",
      name: "Geidorf",
      coordinates: {"lat": 47.08393, "lng": 15.444},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 24767 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "austria-sankt-leonhard",
      name: "Sankt Leonhard",
      coordinates: {"lat": 47.06924, "lng": 15.45784},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 15853 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Austria",
  capital: "Vienna",
  currency: "EUR",
  language: "alemán",
  continent: "Europa",
  population: 9208163,
  cities,
  // Las universidades no van aqui: viven en ./universities/austria.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 46,
  aliases: ["austria"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
