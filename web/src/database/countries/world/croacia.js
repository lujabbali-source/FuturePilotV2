// Croacia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "croacia";
const countryName = "Croacia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/croacia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "croacia-zagreb",
      name: "Zagreb",
      coordinates: {"lat": 45.81444, "lng": 15.97798},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 663592 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "croacia-split",
      name: "Split",
      coordinates: {"lat": 43.50891, "lng": 16.43915},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 149830 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "croacia-rijeka",
      name: "Rijeka",
      coordinates: {"lat": 45.32673, "lng": 14.44241},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 107964 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "croacia-koprivnica",
      name: "Koprivnica",
      coordinates: {"lat": 46.16364, "lng": 16.8297},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 22262 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "croacia-dubrovnik",
      name: "Dubrovnik",
      coordinates: {"lat": 42.64125, "lng": 18.10909},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26922 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "croacia-centar",
      name: "Centar",
      coordinates: {"lat": 45.81313, "lng": 15.97753},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 37000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Croatia",
  capital: "Zagreb",
  currency: "EUR",
  language: "croata",
  continent: "Europa",
  population: 3876200,
  cities,
  // Las universidades no van aqui: viven en ./universities/croacia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 12,
  aliases: ["croacia", "croatia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
