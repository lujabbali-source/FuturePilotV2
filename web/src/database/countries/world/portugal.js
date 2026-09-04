// Portugal — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "portugal";
const countryName = "Portugal";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/portugal.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "portugal-lisbon",
      name: "Lisbon",
      coordinates: {"lat": 38.72509, "lng": -9.1498},
      isCapital: true,
      universityCount: 3,
      statistics: { population: 517802 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-funchal",
      name: "Funchal",
      coordinates: {"lat": 32.66568, "lng": -16.92547},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 105795 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-viseu",
      name: "Viseu",
      coordinates: {"lat": 40.66165, "lng": -7.90905},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 103502 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-paranhos",
      name: "Paranhos",
      coordinates: {"lat": 41.17289, "lng": -8.59931},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 45883 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-coimbra",
      name: "Coimbra",
      coordinates: {"lat": 40.20686, "lng": -8.41996},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 140796 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-sao-jorge-de-arroios",
      name: "São Jorge de Arroios",
      coordinates: {"lat": 38.7289, "lng": -9.13806},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 22990 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-setubal",
      name: "Setúbal",
      coordinates: {"lat": 38.5244, "lng": -8.8882},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 118166 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-castelo-branco",
      name: "Castelo Branco",
      coordinates: {"lat": 39.82364, "lng": -7.49101},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 33479 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-alcantara",
      name: "Alcântara",
      coordinates: {"lat": 38.70102, "lng": -9.17145},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 20267 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-porto",
      name: "Porto",
      coordinates: {"lat": 41.1485, "lng": -8.61097},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 252687 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "portugal-cidade-universitaria",
      name: "Cidade Universitária",
      coordinates: {"lat": 38.75199, "lng": -9.15917},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 37000 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Portugal",
  capital: "Lisbon",
  currency: "EUR",
  language: "portugués",
  continent: "Europa",
  population: 10804871,
  cities,
  // Las universidades no van aqui: viven en ./universities/portugal.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 65,
  aliases: ["portugal"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
