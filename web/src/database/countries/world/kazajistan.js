// Kazajistán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "kazajistan";
const countryName = "Kazajistán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/kazajistan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "kazajistan-almaty",
      name: "Almaty",
      coordinates: {"lat": 43.25249, "lng": 76.9115},
      isCapital: false,
      universityCount: 27,
      statistics: { population: 1977011 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-astana",
      name: "Astana",
      coordinates: {"lat": 51.1801, "lng": 71.44598},
      isCapital: false,
      universityCount: 9,
      statistics: { population: 1544142 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-oral",
      name: "Oral",
      coordinates: {"lat": 51.24601, "lng": 51.42558},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 330000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-pavlodar",
      name: "Pavlodar",
      coordinates: {"lat": 52.27601, "lng": 76.96881},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 329002 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-karagandy",
      name: "Karagandy",
      coordinates: {"lat": 49.80187, "lng": 73.10211},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 497777 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-atyrau",
      name: "Atyrau",
      coordinates: {"lat": 47.1048, "lng": 51.88427},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 290700 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-shymkent",
      name: "Shymkent",
      coordinates: {"lat": 42.30988, "lng": 69.60042},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1200000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-semey",
      name: "Semey",
      coordinates: {"lat": 50.42064, "lng": 80.25025},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 292780 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-ust-kamenogorsk",
      name: "Ust-Kamenogorsk",
      coordinates: {"lat": 49.97143, "lng": 82.60586},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 319067 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kazajistan-otegen-batyra",
      name: "Otegen Batyra",
      coordinates: {"lat": 43.41845, "lng": 77.02187},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 18864 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Kazakhstan",
  capital: "Nur-Sultan",
  currency: "KZT",
  language: "kazajo",
  continent: "Asia",
  population: 20843754,
  cities,
  // Las universidades no van aqui: viven en ./universities/kazajistan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 29,
  aliases: ["kazajistan", "kazakhstan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
