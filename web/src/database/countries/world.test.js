// Contrato de las ciudades importadas.
//
// Lo genera web/scripts/import_world.py a partir de censo_ciudades.json, y lo
// que se comprueba aqui es lo que romperia en silencio: una ciudad sin
// coordenadas no se pinta en el globo pero tampoco da error, y una
// universidad apuntando a una ciudad que no existe deja un panel vacio que
// parece un fallo de red. Ninguna de las dos cosas se ve mirando el archivo.
//
// Vive AQUI y no dentro de world/ porque el importador borra todos los *.js
// de esa carpeta antes de regenerarla. Puesto ahi dentro, desaparece en la
// primera ejecucion y los tests pasan a verde por no existir.
//
// Se ejecuta con `npm --prefix web test` (node --test, sin dependencias).
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { countries } from "./world/index.js";

const carpeta = join(dirname(fileURLToPath(import.meta.url)), "world", "cities");
const conCiudades = Object.values(countries).filter((p) => p.cities.length);
const archivos = readdirSync(carpeta).filter((f) => f.endsWith(".js"));

test("hay paises importados con ciudades", () => {
  // Si esto falla, el censo no se aplico: los 192 paises volvieron a quedar
  // con cities: [] y nadie se entera hasta que el globo sale vacio.
  assert.ok(conCiudades.length > 100,
    `solo ${conCiudades.length} paises con ciudades`);
});

test("toda ciudad tiene coordenadas usables", () => {
  for (const pais of conCiudades) {
    for (const ciudad of pais.cities) {
      const { lat, lng } = ciudad.coordinates || {};
      assert.ok(Number.isFinite(lat) && lat >= -90 && lat <= 90,
        `${ciudad.id}: lat invalida (${lat})`);
      assert.ok(Number.isFinite(lng) && lng >= -180 && lng <= 180,
        `${ciudad.id}: lng invalida (${lng})`);
    }
  }
});

test("los ids de ciudad son unicos en todo el mundo", () => {
  // cityService busca por id recorriendo todos los paises y devuelve el
  // primero que encuentra. Dos ciudades con el mismo id harian que una de las
  // dos fuera inalcanzable, sin ningun sintoma salvo el panel equivocado.
  const vistos = new Set();
  for (const pais of conCiudades) {
    for (const ciudad of pais.cities) {
      assert.ok(!vistos.has(ciudad.id), `id repetido: ${ciudad.id}`);
      vistos.add(ciudad.id);
    }
  }
});

test("cada universidad diferida apunta a una ciudad que existe", async () => {
  assert.ok(archivos.length > 0, "no hay archivos de universidades por ciudad");

  let universidades = 0;
  for (const archivo of archivos) {
    const idPais = archivo.replace(/\.js$/, "");
    const pais = countries[idPais];
    assert.ok(pais, `${archivo} no corresponde a ningun pais`);

    const porCiudad = (await import(pathToFileURL(join(carpeta, archivo)))).default;
    const idsDelPais = new Set(pais.cities.map((c) => c.id));

    for (const [idCiudad, lista] of Object.entries(porCiudad)) {
      assert.ok(idsDelPais.has(idCiudad),
        `${archivo}: ${idCiudad} no esta en las ciudades de ${idPais}`);
      for (const u of lista) {
        assert.equal(u.cityId, idCiudad,
          `${u.id}: cityId ${u.cityId} no cuadra con ${idCiudad}`);
        // Importada: la fuente abierta no dice si es publica o privada, y una
        // etiqueta adivinada se ve igual que una cierta.
        assert.equal(u.type, null, `${u.id}: una importada no puede traer type`);
        assert.equal(u.source, "open-dataset");
        universidades += 1;
      }
    }
  }
  assert.ok(universidades > 5000, `solo ${universidades} universidades situadas`);
});

test("el recuento del resumen cuadra con las universidades diferidas", async () => {
  // universityCount va en el bundle y la lista se carga aparte. Si se
  // desincronizan, la ficha promete 22 universidades y ensena 3.
  for (const archivo of archivos) {
    const idPais = archivo.replace(/\.js$/, "");
    const porCiudad = (await import(pathToFileURL(join(carpeta, archivo)))).default;
    for (const ciudad of countries[idPais].cities) {
      assert.equal(ciudad.universityCount, (porCiudad[ciudad.id] || []).length,
        `${ciudad.id}: el resumen dice ${ciudad.universityCount}`);
    }
  }
});
