// Marruecos — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "marruecos";
const countryName = "Marruecos";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/marruecos.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "marruecos-rabat",
      name: "Rabat",
      coordinates: {"lat": 34.01325, "lng": -6.83255},
      isCapital: true,
      universityCount: 9,
      statistics: { population: 1655753 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-casablanca",
      name: "Casablanca",
      coordinates: {"lat": 33.58831, "lng": -7.61138},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 3665954 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-tetouan",
      name: "Tétouan",
      coordinates: {"lat": 35.57845, "lng": -5.36837},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 415810 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-meknes",
      name: "Meknes",
      coordinates: {"lat": 33.89352, "lng": -5.54727},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 568295 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-marrakesh",
      name: "Marrakesh",
      coordinates: {"lat": 31.63416, "lng": -7.99994},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 995871 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-ifrane",
      name: "Ifrane",
      coordinates: {"lat": 33.52666, "lng": -5.11019},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 73782 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-new-fes",
      name: "New Fes",
      coordinates: {"lat": 34.05466, "lng": -5.00725},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 22451 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-fes",
      name: "Fes",
      coordinates: {"lat": 34.03313, "lng": -5.00028},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1191905 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-bouskoura",
      name: "Bouskoura",
      coordinates: {"lat": 33.44976, "lng": -7.65239},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 112501 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-ben-guerir",
      name: "Ben Guerir",
      coordinates: {"lat": 32.24088, "lng": -7.95397},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 96777 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "marruecos-dakhla",
      name: "Dakhla",
      coordinates: {"lat": 30.41145, "lng": -9.55344},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 55618 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Morocco",
  capital: "Rabat",
  currency: "MAD",
  language: "árabe",
  continent: "África",
  population: 38430770,
  cities,
  // Las universidades no van aqui: viven en ./universities/marruecos.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 33,
  aliases: ["marruecos", "morocco"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
