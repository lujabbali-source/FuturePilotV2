// Surinam — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "surinam";
const countryName = "Surinam";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/surinam.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "surinam-rainville",
      name: "Rainville",
      coordinates: {"lat": 5.83436, "lng": -55.13769},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 22747 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "surinam-tammenga",
      name: "Tammenga",
      coordinates: {"lat": 5.82893, "lng": -55.202},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 15819 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "surinam-latour",
      name: "Latour",
      coordinates: {"lat": 5.79668, "lng": -55.20858},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 29526 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Suriname",
  capital: "Paramaribo",
  currency: "SRD",
  language: "neerlandés",
  continent: "América",
  population: 639850,
  cities,
  // Las universidades no van aqui: viven en ./universities/surinam.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["surinam", "suriname"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
