// Ciudad del Vaticano — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "ciudad-del-vaticano";
const countryName = "Ciudad del Vaticano";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/ciudad-del-vaticano.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "ciudad-del-vaticano-vatican-city",
      name: "Vatican City",
      coordinates: {"lat": 41.90268, "lng": 12.45414},
      isCapital: true,
      universityCount: 45,
      statistics: { population: 829 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Vatican",
  capital: "Vatican City",
  currency: "EUR",
  language: "latín",
  continent: "Europa",
  population: null,
  cities,
  // Las universidades no van aqui: viven en ./universities/ciudad-del-vaticano.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 5,
  aliases: ["ciudad-del-vaticano", "vatican"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
