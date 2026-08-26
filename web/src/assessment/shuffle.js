// En que orden se le enseñan al estudiante las opciones de cada pregunta.
//
// EL PROBLEMA QUE RESUELVE
//
// En las 50 preguntas, la respuesta que mas puntua estaba SIEMPRE en la
// primera posicion. Quien pulsara siempre la primera opcion sacaba 10 sobre
// 10 en los ocho ejes: un perfil perfecto y plano, medido de verdad. Y no
// hace falta querer hacer trampa - la tendencia a elegir la primera opcion
// esta bien documentada, asi que todos los perfiles salian inflados hacia
// arriba y el test media, en parte, la prisa.
//
// COMO
//
// El orden se calcula, no se guarda: la misma semilla y el mismo indice de
// pregunta dan siempre la misma permutacion. Asi volver atras enseña las
// opciones donde estaban - reordenarlas a media respuesta seria desorientar
// a alguien que ya habia leido cuatro frases - sin tener que persistir un
// array por pregunta junto al progreso.
//
// La semilla vive en localStorage y se renueva al empezar un test nuevo, de
// modo que repetirlo no repite el mismo orden.

const SEMILLA_KEY = "futurePilotShuffleSeed";

function nuevaSemilla() {
  const semilla = String(Date.now() % 2147483647) + String(Math.floor(Math.random() * 1e9));
  try { localStorage.setItem(SEMILLA_KEY, semilla); } catch { /* sin storage se usa la de por defecto */ }
  return semilla;
}

function semillaActual() {
  try {
    return localStorage.getItem(SEMILLA_KEY) || nuevaSemilla();
  } catch {
    return "0";
  }
}

/** Renueva el orden. Se llama al empezar un test, no en cada pregunta. */
export function rebarajar() {
  nuevaSemilla();
}

function hash(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Generador determinista. Con la misma semilla da siempre lo mismo, que es
 *  justo lo que hace falta para que el orden no baile entre repintados. */
function generador(semilla) {
  let estado = hash(semilla) || 1;
  return () => {
    estado |= 0;
    estado = (estado + 0x6D2B79F5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function barajar(indices, aleatorio) {
  const copia = [...indices];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Indices canonicos (los de questions.json) en el orden en que se pintan.
 *
 * Devuelve SIEMPRE indices canonicos: quien renderiza los usa tal cual en
 * data-answer-index, asi que ni el motor ni la API se enteran de que se
 * barajo nada. El orden es puro maquillaje de presentacion.
 */
export function ordenDeOpciones(question, indicePregunta, formato) {
  const indices = question.answers.map((_, i) => i);

  // El slider NO se baraja: es una escala, y su posicion significa algo.
  // Se ordena por puntos ASCENDENTE para que la izquierda ("Nada") sea la
  // respuesta que menos puntua y la derecha ("Muchisimo") la que mas.
  //
  // Estaba al reves. Como las respuestas venian con la de 4 puntos primero,
  // arrastrar a "Nada" enviaba answer_index 0, o sea "Muy de acuerdo", y
  // daba la puntuacion maxima del rasgo. "Muchisimo" daba cero. Un cuarto de
  // las preguntas de personalidad se puntuaba invertido, en silencio.
  if (formato === "slider") {
    return [...indices].sort(
      (a, b) => (question.answers[a].points || 0) - (question.answers[b].points || 0)
    );
  }

  const aleatorio = generador(`${semillaActual()}:${indicePregunta}`);

  // Versus enseña solo dos opciones (answers.slice(0, 2)). Barajar las
  // cuatro cambiaria CUALES se enseñan, que ya no es presentacion sino otra
  // pregunta. Se conservan las dos de siempre y solo se decide cual va como
  // A y cual como B, que es donde estaba el sesgo.
  if (formato === "versus") {
    const dos = indices.slice(0, 2);
    return aleatorio() < 0.5 ? dos : [dos[1], dos[0]];
  }

  return barajar(indices, aleatorio);
}
