// Bélgica — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "belgica";
const countryName = "Bélgica";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/belgica.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "belgica-leuven",
      name: "Leuven",
      coordinates: {"lat": 50.87959, "lng": 4.70093},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 101032 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-gent",
      name: "Gent",
      coordinates: {"lat": 51.05, "lng": 3.71667},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 265086 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-etterbeek",
      name: "Etterbeek",
      coordinates: {"lat": 50.83272, "lng": 4.38835},
      isCapital: false,
      universityCount: 6,
      statistics: { population: 48344 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-namur",
      name: "Namur",
      coordinates: {"lat": 50.4669, "lng": 4.86746},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 110939 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-mons",
      name: "Mons",
      coordinates: {"lat": 50.45413, "lng": 3.95229},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 95299 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-heverlee",
      name: "Heverlee",
      coordinates: {"lat": 50.86426, "lng": 4.69597},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 23278 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-mechelen",
      name: "Mechelen",
      coordinates: {"lat": 51.02574, "lng": 4.47762},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 77530 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-louvain-la-neuve",
      name: "Louvain-la-Neuve",
      coordinates: {"lat": 50.66829, "lng": 4.61443},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 29521 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-liege",
      name: "Liège",
      coordinates: {"lat": 50.63373, "lng": 5.56749},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 195278 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "belgica-antwerp",
      name: "Antwerp",
      coordinates: {"lat": 51.22047, "lng": 4.40026},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 529247 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Belgium",
  capital: "Brussels",
  currency: "EUR",
  language: "neerlandés",
  continent: "Europa",
  population: 11941781,
  cities,
  // Las universidades no van aqui: viven en ./universities/belgica.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 50,
  aliases: ["belgica", "belgium"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
