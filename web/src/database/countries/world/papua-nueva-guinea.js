// Papúa Nueva Guinea — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "papua-nueva-guinea";
const countryName = "Papúa Nueva Guinea";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/papua-nueva-guinea.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "papua-nueva-guinea-port-moresby",
      name: "Port Moresby",
      coordinates: {"lat": -9.47723, "lng": 147.15089},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 283733 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "papua-nueva-guinea-kokopo",
      name: "Kokopo",
      coordinates: {"lat": -4.3432, "lng": 152.26867},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 26273 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Papua New Guinea",
  capital: "Port Moresby",
  currency: "PGK",
  language: "inglés",
  continent: "Oceanía",
  population: 10762817,
  cities,
  // Las universidades no van aqui: viven en ./universities/papua-nueva-guinea.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 5,
  aliases: ["papua-new-guinea", "papua-nueva-guinea"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
