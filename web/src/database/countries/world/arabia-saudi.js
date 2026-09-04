// Arabia Saudí — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "arabia-saudi";
const countryName = "Arabia Saudí";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/arabia-saudi.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "arabia-saudi-riyadh",
      name: "Riyadh",
      coordinates: {"lat": 24.68773, "lng": 46.72185},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 4205961 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-jeddah",
      name: "Jeddah",
      coordinates: {"lat": 21.49012, "lng": 39.18624},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 4697000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-irqah",
      name: "‘Irqah",
      coordinates: {"lat": 24.68029, "lng": 46.61109},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 42179 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-tabuk",
      name: "Tabuk",
      coordinates: {"lat": 28.3998, "lng": 36.57151},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 667000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-sultanah",
      name: "Sulţānah",
      coordinates: {"lat": 24.49258, "lng": 39.58572},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 946697 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-ta-if",
      name: "Ta’if",
      coordinates: {"lat": 21.27028, "lng": 40.41583},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 688693 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-dammam",
      name: "Dammam",
      coordinates: {"lat": 26.43442, "lng": 50.10326},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1252523 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "arabia-saudi-thuwal",
      name: "Thuwal",
      coordinates: {"lat": 22.28272, "lng": 39.11245},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26957 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Saudi Arabia",
  capital: "Riyadh",
  currency: "SAR",
  language: "árabe",
  continent: "Asia",
  population: 36973555,
  cities,
  // Las universidades no van aqui: viven en ./universities/arabia-saudi.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 63,
  aliases: ["arabia-saudi", "saudi-arabia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
