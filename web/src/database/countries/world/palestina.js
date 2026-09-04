// Palestina — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "palestina";
const countryName = "Palestina";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/palestina.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "palestina-gaza",
      name: "Gaza",
      coordinates: {"lat": 31.50161, "lng": 34.46672},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 410000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-tulkarm",
      name: "Ţūlkarm",
      coordinates: {"lat": 32.31156, "lng": 35.0269},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 44169 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-bethlehem",
      name: "Bethlehem",
      coordinates: {"lat": 31.70487, "lng": 35.20376},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 29019 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-hebron",
      name: "Hebron",
      coordinates: {"lat": 31.52935, "lng": 35.0938},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 160470 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-ramallah",
      name: "Ramallah",
      coordinates: {"lat": 31.89964, "lng": 35.20422},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 43880 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-jericho",
      name: "Jericho",
      coordinates: {"lat": 31.86667, "lng": 35.45},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 19783 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "palestina-east-jerusalem",
      name: "East Jerusalem",
      coordinates: {"lat": 31.78336, "lng": 35.23388},
      isCapital: true,
      universityCount: 2,
      statistics: { population: 428304 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Palestinian Territory",
  capital: "East Jerusalem",
  currency: "ILS",
  language: "árabe",
  continent: "Asia",
  population: 5413596,
  cities,
  // Las universidades no van aqui: viven en ./universities/palestina.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 16,
  aliases: ["palestina", "palestinian-territory"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
