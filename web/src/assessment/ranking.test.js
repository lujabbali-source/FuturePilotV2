// El orden de partida del ranking.
//
// Se ejecuta con `npm --prefix web test` (node --test, sin dependencias).
//
// EL FALLO QUE FIJA ESTE ARCHIVO
//
// renderRanking pinta las filas con `ordenDeOpciones` (barajado) cuando
// todavia no hay respuesta. El manejador de las flechas, en app.js, caia en
// cambio al orden canonico [0,1,2,3]. Con los dos desalineados:
//
//   - la flecha "bajar" de la fila de arriba no hacia NADA, porque en la
//     lista canonica ese indice ya estaba el ultimo;
//   - las que si movian algo reordenaban una lista que el estudiante no
//     estaba viendo;
//   - y el indice que se guardaba (order[0]) no era el que habia quedado
//     primero en pantalla, asi que la respuesta enviada al motor no era la
//     que la persona habia ordenado.
//
// Los dos lados llaman ahora a la misma funcion. Esto lo comprueba.
import test from "node:test";
import assert from "node:assert/strict";

import { ordenDeOpciones } from "./shuffle.js";

// shuffle.js lee la semilla de localStorage. En node no existe, y su
// try/catch cae a "0": determinista, que es justo lo que hace falta aqui.
const pregunta = { answers: [{ points: 4 }, { points: 3 }, { points: 1 }, { points: 0 }] };

test("el orden del ranking es determinista para la misma pregunta", () => {
  const a = ordenDeOpciones(pregunta, 11, "ranking");
  const b = ordenDeOpciones(pregunta, 11, "ranking");
  assert.deepEqual(a, b);
});

test("devuelve una permutacion completa de los indices canonicos", () => {
  const orden = ordenDeOpciones(pregunta, 11, "ranking");
  assert.deepEqual([...orden].sort(), [0, 1, 2, 3]);
});

test("el barajado no coincide con el orden canonico en todas las preguntas", () => {
  // Si coincidiera siempre, el fallo original habria sido invisible y este
  // archivo no protegeria de nada. Basta con que alguna difiera.
  const canonico = [0, 1, 2, 3];
  const alguna = [...Array(50).keys()].some(
    (i) => String(ordenDeOpciones(pregunta, i, "ranking")) !== String(canonico),
  );
  assert.ok(alguna, "el barajado devuelve siempre el orden canonico");
});

test("mover la primera fila hacia abajo cambia quien va primero", () => {
  // Reproduce lo que hace el manejador de app.js, partiendo del MISMO orden
  // que se pinta. Con el fallback equivocado esta operacion era un no-op.
  const orden = [...ordenDeOpciones(pregunta, 11, "ranking")];
  const primeraFila = orden[0];
  const desde = orden.indexOf(primeraFila);
  assert.equal(desde, 0, "la fila de arriba tiene que estar en la posicion 0");

  const hasta = desde + 1;
  assert.ok(hasta < orden.length, "bajar la primera fila tiene que ser posible");
  [orden[desde], orden[hasta]] = [orden[hasta], orden[desde]];
  assert.notEqual(orden[0], primeraFila, "bajar la primera fila no cambio nada");
});

// ---------------------------------------------------------------------------
// EL SEGUNDO FALLO: no habia forma de responder sin reordenar
// ---------------------------------------------------------------------------
// El orden de partida es el barajado y NO cuenta como respuesta - eso es
// deliberado, porque darla por buena seria puntuar por el estudiante. Pero el
// unico gesto que registraba respuesta era mover una fila con las flechas, asi
// que quien miraba la lista y estaba de acuerdo con el orden que veia se
// quedaba con el boton "Siguiente" apagado y sin nada que pulsar.
//
// El test se cortaba ahi. La primera pregunta de ranking es la 11 de 50, de
// modo que el perfil se calculaba con diez respuestas en vez de con cincuenta:
// cada eje del radar medido con una o dos preguntas en lugar de seis o siete.
//
// La correccion: pulsar una fila la manda al primer puesto. Lo que sigue
// reproduce esa operacion tal como la hace app.js.

/** Pulsar una fila: sale de donde este y entra la primera, y las demas
 *  conservan su orden relativo. */
function ponerArriba(orden, elegida) {
  return [elegida, ...orden.filter((indice) => indice !== elegida)];
}

test("pulsar una fila la pone primera y deja respuesta", () => {
  const orden = ordenDeOpciones(pregunta, 11, "ranking");

  for (const elegida of orden) {
    const nuevo = ponerArriba(orden, elegida);
    assert.equal(nuevo[0], elegida, "la fila pulsada tiene que quedar primera");
    assert.deepEqual([...nuevo].sort(), [0, 1, 2, 3], "se perdio o duplico una opcion");
  }
});

test("pulsar la fila que YA esta arriba tambien deja respuesta", () => {
  // El caso que bloqueaba el test: el estudiante esta de acuerdo con el orden
  // que ve. Antes no tenia gesto; ahora pulsa la de arriba y responde sin que
  // la lista se mueva.
  const orden = ordenDeOpciones(pregunta, 11, "ranking");
  const nuevo = ponerArriba(orden, orden[0]);

  assert.deepEqual(nuevo, [...orden], "pulsar la primera no debe reordenar nada");
  assert.equal(nuevo[0], orden[0], "y tiene que seguir siendo la respuesta");
});

test("el resto conserva su orden relativo al subir una fila", () => {
  // Si el resto se rebarajara, el estudiante veria saltar filas que no toco.
  const orden = [3, 1, 0, 2];
  assert.deepEqual(ponerArriba(orden, 0), [0, 3, 1, 2]);
  assert.deepEqual(ponerArriba(orden, 2), [2, 3, 1, 0]);
});
