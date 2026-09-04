// Letonia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "letonia";
const countryName = "Letonia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/letonia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "letonia-riga",
      name: "Riga",
      coordinates: {"lat": 56.946, "lng": 24.10589},
      isCapital: true,
      universityCount: 9,
      statistics: { population: 742572 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "letonia-darzciems",
      name: "Dārzciems",
      coordinates: {"lat": 56.94563, "lng": 24.17459},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 17599 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Latvia",
  capital: "Riga",
  currency: "EUR",
  language: "letón",
  continent: "Europa",
  population: 1847785,
  cities,
  // Las universidades no van aqui: viven en ./universities/letonia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 24,
  aliases: ["latvia", "letonia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
