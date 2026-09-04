// Países Bajos — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "paises-bajos";
const countryName = "Países Bajos";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/paises-bajos.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "paises-bajos-rotterdam",
      name: "Rotterdam",
      coordinates: {"lat": 51.9225, "lng": 4.47917},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 868135 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-utrecht",
      name: "Utrecht",
      coordinates: {"lat": 52.09083, "lng": 5.12222},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 376435 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-nijmegen",
      name: "Nijmegen",
      coordinates: {"lat": 51.8425, "lng": 5.85278},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 177359 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-maastricht",
      name: "Maastricht",
      coordinates: {"lat": 50.84833, "lng": 5.68889},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 122378 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-leiden",
      name: "Leiden",
      coordinates: {"lat": 52.15833, "lng": 4.49306},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 119713 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-heerlen",
      name: "Heerlen",
      coordinates: {"lat": 50.88365, "lng": 5.98154},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 93084 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "paises-bajos-enschede",
      name: "Enschede",
      coordinates: {"lat": 52.21833, "lng": 6.89583},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 153655 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "The Netherlands",
  capital: "Amsterdam",
  currency: "EUR",
  language: "neerlandés",
  continent: "Europa",
  population: 18087633,
  cities,
  // Las universidades no van aqui: viven en ./universities/paises-bajos.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 48,
  aliases: ["netherlands", "paises-bajos", "the-netherlands"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
