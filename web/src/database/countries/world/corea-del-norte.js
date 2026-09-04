// Corea del Norte — importado, no curado.
//
// Trae lo que las fuentes abiertas pueden verificar: nombre, capital, moneda,
// idioma, poblacion, las ciudades con universidad y las universidades con su
// sitio oficial. Todo lo demas (costo de vida, salarios, cultura) esta vacio
// a proposito. Ver web/scripts/import_world.py.
//
// Generado. No editar a mano: se sobrescribe. Para curar este pais, muevelo a
// countries/americas/ o su continente y quitale el dataStatus de importado.

import { defineCity, defineCountry } from "../schema.js";

const countryId = "corea-del-norte";
const countryName = "Corea del Norte";

// Ciudades con al menos 2 universidades situadas por coordenadas (GeoNames x
// Wikidata, ver censo_ciudades.py). Solo el resumen: que
// universidades tiene cada una vive en ./cities/corea-del-norte.js
// y se pide al abrir la ciudad. Sin costo de vida ni cultura.
const cities = [
    defineCity({
      id: "corea-del-norte-pyongyang",
      name: "Pyongyang",
      coordinates: {"lat": 39.03385, "lng": 125.75432},
      isCapital: true,
      universityCount: 15,
      statistics: { population: 3222000 },
      countryId,
      countryName,
    }),
    defineCity({
      id: "corea-del-norte-man-gyongdae-ri",
      name: "Man’gyŏngdae-ri",
      coordinates: {"lat": 38.99182, "lng": 125.65871},
      isCapital: false,
      universityCount: 3,
      statistics: { population: 321690 },
      countryId,
      countryName,
    }),
];

export default defineCountry({
  id: countryId,
  name: countryName,
  nameEn: "North Korea",
  capital: "Pyongyang",
  currency: "KPW",
  language: "coreano",
  continent: "Asia",
  population: 26571036,
  cities,
  // Las universidades no van aqui: viven en ./universities/corea-del-norte.js
  // y se cargan solo al abrir el pais (ver getNationalUniversities).
  universityCount: 1,
  aliases: ["corea-del-norte", "north-korea"],
  dataStatus: "source-open-dataset",
  sources: ["Hipo/university-domains-list (MIT)", "GeoNames (CC BY 4.0)", "Wikidata (CC0)", "Banco Mundial, SP.POP.TOTL"],
});
