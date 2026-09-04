// Somalia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "somalia";
const countryName = "Somalia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/somalia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "somalia-mogadishu",
      name: "Mogadishu",
      coordinates: {"lat": 2.03711, "lng": 45.34375},
      isCapital: true,
      universityCount: 12,
      statistics: { population: 2587183 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-hargeysa",
      name: "Hargeysa",
      coordinates: {"lat": 9.56, "lng": 44.065},
      isCapital: false,
      universityCount: 9,
      statistics: { population: 477876 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-bosaso",
      name: "Bosaso",
      coordinates: {"lat": 11.28421, "lng": 49.18158},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 74287 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-garoowe",
      name: "Garoowe",
      coordinates: {"lat": 8.40207, "lng": 48.48284},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 57300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-laascaanood",
      name: "Laascaanood",
      coordinates: {"lat": 8.47738, "lng": 47.35971},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 60100 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-berbera",
      name: "Berbera",
      coordinates: {"lat": 10.43959, "lng": 45.01432},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 242344 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "somalia-baardheere",
      name: "Baardheere",
      coordinates: {"lat": 2.34464, "lng": 42.27644},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 42240 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Somalia",
  capital: "Mogadishu",
  currency: "SOS",
  language: "somalí",
  continent: "África",
  population: 19654739,
  cities,
  // Las universidades no van aqui: viven en ./universities/somalia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 17,
  aliases: ["somalia"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
