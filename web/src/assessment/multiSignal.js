// Que respuesta cuenta cuando el estudiante marca dos señales.
//
// Las dos preguntas de formato "multi" (indices 14 y 17 del banco) no
// ofrecen grados de acuerdo sino NIVELES DE EVIDENCIA:
//
//   4 · He cobrado por algo que hice o vendi
//   3 · Tengo apuntada alguna idea de negocio
//   1 · Me interesa como ganan dinero las empresas
//   0 · Prefiero un sueldo fijo y tranquilidad
//
// Marcar dos es realista: quien ha cobrado por algo tambien suele tener
// ideas apuntadas. Por eso de las marcadas cuenta la MAS FUERTE - es el
// nivel al que de verdad ha llegado. Promediarla con una mas floja
// penalizaria haber hecho mas cosas, y quedarse con la mas floja
// convertiria la honestidad en una penalizacion: quien marcara solo la
// fuerte puntuaria mas que quien marcara la fuerte y la floja.
//
// LO IMPORTANTE: se elige por PUNTOS, no por posicion en el array. Aqui
// habia un `[...selected].sort((a, b) => a - b)[0]`, o sea el indice
// canonico mas bajo. Daba el mismo resultado, pero solo porque las 50
// preguntas venian ordenadas de mas a menos puntos. En cuanto una pregunta
// se reordene - o se escriba invertida, que es hacia donde va el banco -
// ese indice mandaria una opcion cualquiera al motor sin que falle nada
// visible: el estudiante veria su respuesta marcada y el perfil sumaria
// otra cosa.
export function senalQueCuenta(question, seleccionadas) {
  const indices = [...(seleccionadas || [])];
  if (!indices.length) return null;
  const puntos = (indice) => question?.answers?.[indice]?.points || 0;
  return indices.reduce((mejor, indice) => (puntos(indice) > puntos(mejor) ? indice : mejor));
}
