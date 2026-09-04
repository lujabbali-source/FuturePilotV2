// Afganistán — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "afganistan";
const countryName = "Afganistán";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/afganistan.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "afganistan-kabul",
      name: "Kabul",
      coordinates: {"lat": 34.52813, "lng": 69.17233},
      isCapital: true,
      universityCount: 20,
      statistics: { population: 4434550 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "afganistan-jalalabad",
      name: "Jalālābād",
      coordinates: {"lat": 34.42647, "lng": 70.45153},
      isCapital: false,
      universityCount: 5,
      statistics: { population: 271900 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "afganistan-shibirghan",
      name: "Shibirghān",
      coordinates: {"lat": 36.66757, "lng": 65.7529},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 55641 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "afganistan-khost",
      name: "Khōst",
      coordinates: {"lat": 33.33951, "lng": 69.92041},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 96123 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "afganistan-herat",
      name: "Herāt",
      coordinates: {"lat": 34.34817, "lng": 62.19967},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 574300 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Afghanistan",
  capital: "Kabul",
  currency: "AFN",
  language: "persa",
  continent: "Asia",
  population: 43844111,
  cities,
  // Las universidades no van aqui: viven en ./universities/afganistan.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 40,
  aliases: ["afganistan", "afghanistan"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
