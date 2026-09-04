// Ruanda — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "ruanda";
const countryName = "Ruanda";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/ruanda.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "ruanda-kigali",
      name: "Kigali",
      coordinates: {"lat": -1.94995, "lng": 30.05885},
      isCapital: true,
      universityCount: 5,
      statistics: { population: 1132686 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ruanda-ndera",
      name: "Ndera",
      coordinates: {"lat": -1.9495, "lng": 30.1697},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 41764 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ruanda-butare",
      name: "Butare",
      coordinates: {"lat": -2.59667, "lng": 29.73944},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 62823 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "ruanda-musanze",
      name: "Musanze",
      coordinates: {"lat": -1.49984, "lng": 29.63497},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 153368 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Rwanda",
  capital: "Kigali",
  currency: "RWF",
  language: "kiñaruanda",
  continent: "África",
  population: 14569341,
  cities,
  // Las universidades no van aqui: viven en ./universities/ruanda.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 11,
  aliases: ["ruanda", "rwanda"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
