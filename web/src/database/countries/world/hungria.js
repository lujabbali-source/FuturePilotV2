// Hungría — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "hungria";
const countryName = "Hungría";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/hungria.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "hungria-budapest-viii-kerulet",
      name: "Budapest VIII. kerület",
      coordinates: {"lat": 47.48919, "lng": 19.07012},
      isCapital: false,
      universityCount: 7,
      statistics: { population: 82222 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-zuglo",
      name: "Zugló",
      coordinates: {"lat": 47.51758, "lng": 19.10549},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 130000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-lagymanyos",
      name: "Lágymányos",
      coordinates: {"lat": 47.47243, "lng": 19.05806},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 19741 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-erzsebetvaros",
      name: "Erzsébetváros",
      coordinates: {"lat": 47.50207, "lng": 19.07218},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 62000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-ujszeged",
      name: "Újszeged",
      coordinates: {"lat": 46.24754, "lng": 20.16571},
      isCapital: false,
      universityCount: 1,
      statistics: { population: 25300 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-szeged",
      name: "Szeged",
      coordinates: {"lat": 46.253, "lng": 20.14824},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 160766 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-nyiregyhaza",
      name: "Nyíregyháza",
      coordinates: {"lat": 47.95539, "lng": 21.71671},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 117689 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-eger",
      name: "Eger",
      coordinates: {"lat": 47.90265, "lng": 20.37329},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 53876 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-debrecen",
      name: "Debrecen",
      coordinates: {"lat": 47.53167, "lng": 21.62444},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 202402 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-sopron",
      name: "Sopron",
      coordinates: {"lat": 47.68501, "lng": 16.59049},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 62246 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-pest",
      name: "Pest",
      coordinates: {"lat": 47.5, "lng": 19.08333},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 1001748 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-pecs",
      name: "Pécs",
      coordinates: {"lat": 46.07617, "lng": 18.22814},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 145347 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-gyor",
      name: "Győr",
      coordinates: {"lat": 47.68333, "lng": 17.63512},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 129301 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-godollo",
      name: "Gödöllő",
      coordinates: {"lat": 47.59657, "lng": 19.35515},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 32374 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-ferencvaros",
      name: "Ferencváros",
      coordinates: {"lat": 47.47754, "lng": 19.09081},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 59056 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "hungria-budapest",
      name: "Budapest",
      coordinates: {"lat": 47.49835, "lng": 19.04045},
      isCapital: true,
      universityCount: 1,
      statistics: { population: 1741041 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Hungary",
  capital: "Budapest",
  currency: "HUF",
  language: "húngaro",
  continent: "Europa",
  population: 9514251,
  cities,
  // Las universidades no van aqui: viven en ./universities/hungria.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 42,
  aliases: ["hungary", "hungria"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
