// Kenia — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "kenia";
const countryName = "Kenia";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/kenia.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "kenia-nairobi",
      name: "Nairobi",
      coordinates: {"lat": -1.28333, "lng": 36.81667},
      isCapital: true,
      universityCount: 10,
      statistics: { population: 4397073 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-machakos",
      name: "Machakos",
      coordinates: {"lat": -1.52233, "lng": 37.26521},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 63767 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-lang-ata",
      name: "Lang'ata",
      coordinates: {"lat": -1.3666, "lng": 36.73324},
      isCapital: false,
      universityCount: 4,
      statistics: { population: 172569 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-thika",
      name: "Thika",
      coordinates: {"lat": -1.03326, "lng": 37.06933},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 251407 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-ruiru",
      name: "Ruiru",
      coordinates: {"lat": -1.14665, "lng": 36.96087},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 490120 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-kiambu",
      name: "Kiambu",
      coordinates: {"lat": -1.17139, "lng": 36.83556},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 147870 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-kapsabet",
      name: "Kapsabet",
      coordinates: {"lat": 0.20387, "lng": 35.105},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 41997 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-kitengela",
      name: "Kitengela",
      coordinates: {"lat": -1.47612, "lng": 36.96144},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 154436 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-rongo",
      name: "Rongo",
      coordinates: {"lat": -0.75675, "lng": 34.59833},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 20688 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-ngong",
      name: "Ngong",
      coordinates: {"lat": -1.3527, "lng": 36.6699},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 102323 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-meru",
      name: "Meru",
      coordinates: {"lat": 0.04626, "lng": 37.65587},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 80191 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-ongata-rongai",
      name: "Ongata Rongai",
      coordinates: {"lat": -1.3953, "lng": 36.764},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 172569 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-kericho",
      name: "Kericho",
      coordinates: {"lat": -0.36774, "lng": 35.28314},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 53804 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "kenia-juja",
      name: "Juja",
      coordinates: {"lat": -1.10148, "lng": 37.0132},
      isCapital: false,
      universityCount: 2,
      statistics: { population: 156041 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "Kenya",
  capital: "Nairobi",
  currency: "KES",
  language: "inglés",
  continent: "África",
  population: 57532493,
  cities,
  // Las universidades no van aqui: viven en ./universities/kenia.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 49,
  aliases: ["kenia", "kenya"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
