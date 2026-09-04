// Azerbaiyán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "azerbaiyan";
const countryName = "Azerbaiyán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/azerbaiyan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "azerbaiyan-baku",
      name: "Baku",
      coordinates: {"lat": 40.37767, "lng": 49.89201},
      isCapital: true,
      universityCount: 28,
      statistics: { population: 2351300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "azerbaiyan-bilajari",
      name: "Bilajari",
      coordinates: {"lat": 40.4444, "lng": 49.80566},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 42194 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "azerbaiyan-khirdalan",
      name: "Khirdalan",
      coordinates: {"lat": 40.44808, "lng": 49.75502},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 196200 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Azerbaijan",
  capital: "Baku",
  currency: "AZN",
  language: "azerí",
  continent: "Asia",
  population: 10246996,
  cities,
  // Las universidades no van aqui: viven en ./universities/azerbaiyan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 32,
  aliases: ["azerbaijan", "azerbaiyan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
