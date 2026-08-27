// Contrato de las preguntas de "elige hasta 2".
//
// Se ejecuta con `npm --prefix web test` (node --test, sin dependencias).
import test from "node:test";
import assert from "node:assert/strict";

import { senalQueCuenta } from "./multiSignal.js";

// Una pregunta del banco: cuatro niveles de evidencia, del mas alto al mas
// bajo. Es el orden que traen hoy las 50.
const pregunta = { answers: [{ points: 4 }, { points: 3 }, { points: 1 }, { points: 0 }] };

test("marcar dos señales puntua igual que marcar solo la mas fuerte", () => {
  assert.equal(senalQueCuenta(pregunta, [0, 2]), 0);
  assert.equal(senalQueCuenta(pregunta, [0]), 0);
});

test("marcar solo la floja puntua lo que vale la floja", () => {
  // Aqui se ve por que no vale quedarse con la de MENOS puntos de las
  // marcadas: si [1, 3] valiera 0, quien reconoce dos cosas ciertas
  // puntuaria menos que quien reconoce solo la floja.
  assert.equal(senalQueCuenta(pregunta, [3]), 3);
  assert.equal(senalQueCuenta(pregunta, [1, 3]), 1);
});

test("el orden en que se marcan no cambia el resultado", () => {
  assert.equal(senalQueCuenta(pregunta, [2, 0]), senalQueCuenta(pregunta, [0, 2]));
});

test("no depende de que la mejor respuesta sea la primera del array", () => {
  // Este es el fallo que se estaba arreglando. La version anterior mandaba
  // el indice canonico mas bajo, asi que con una pregunta invertida - o
  // simplemente reordenada - mandaba la opcion de 0 puntos creyendo que era
  // la mejor. Cuando el banco tenga items invertidos, este test es el que
  // impide que la regresion vuelva en silencio.
  const invertida = { answers: [{ points: 0 }, { points: 1 }, { points: 3 }, { points: 4 }] };
  assert.equal(senalQueCuenta(invertida, [0, 3]), 3);
});

test("sin ninguna señal marcada no hay respuesta", () => {
  assert.equal(senalQueCuenta(pregunta, []), null);
  assert.equal(senalQueCuenta(pregunta, undefined), null);
});
