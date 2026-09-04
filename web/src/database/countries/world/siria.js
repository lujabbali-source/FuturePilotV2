// Siria — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "siria";
const countryName = "Siria";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/siria.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "siria-as-sanamayn",
      name: "Aş Şanamayn",
      coordinates: {"lat": 33.07186, "lng": 36.18316},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 25702 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "siria-damascus",
      name: "Damascus",
      coordinates: {"lat": 33.5102, "lng": 36.29128},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 1569394 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "siria-homs",
      name: "Homs",
      coordinates: {"lat": 34.72405, "lng": 36.72559},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 775404 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "siria-aleppo",
      name: "Aleppo",
      coordinates: {"lat": 36.20124, "lng": 37.16117},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 2098210 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "siria-latakia",
      name: "Latakia",
      coordinates: {"lat": 35.53125, "lng": 35.79088},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 709000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Syria",
  capital: "Damascus",
  currency: "SYP",
  language: "árabe",
  continent: "Asia",
  population: 25620427,
  cities,
  // Las universidades no van aqui: viven en ./universities/siria.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 15,
  aliases: ["siria", "syria"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
