/**
 * Referencias nacionales de Colombia.
 *
 * El salario mínimo es UN número, nacional, que cambia por decreto cada
 * diciembre. Vive aquí y en ningún otro sitio: repetido por ciudad, una
 * actualización se olvidaría en la mitad de las fichas y unas dirían una cosa
 * y otras otra.
 *
 * `amount` está en null a propósito. No lo puse de memoria: un salario mínimo
 * equivocado no falla ni avisa — multiplica mal en las 24 ciudades a la vez, y
 * justo en la cifra con la que alguien juzga si le alcanza. Mientras esté
 * vacío, la comparación sencillamente no aparece.
 *
 * Para completarlo hacen falta las cuatro cosas. `source` y `year` no son
 * adorno: sin ellos nadie puede saber si el número está viejo, y en Colombia
 * se desactualiza dentro del mismo año.
 *
 *   minimumWage: {
 *     amount: 1300000,
 *     currency: "COP",
 *     year: 2026,
 *     source: "Decreto de salario mínimo",
 *   }
 */
export const COLOMBIA_REFERENCE = {
    minimumWage: {
        amount: null,
        currency: "COP",
        year: null,
        source: null,
    },
};

/** ¿Se puede usar la referencia? Necesita las cuatro cosas. */
export function referenciaCompleta(ref = COLOMBIA_REFERENCE.minimumWage) {
    return Boolean(ref?.amount && ref?.currency && ref?.year && ref?.source);
}

/**
 * Cuántos salarios mínimos cuesta vivir en una ciudad.
 *
 * Se calcula con el extremo BAJO del presupuesto de estudiante. Es el número
 * que responde a "¿me alcanza?": el mínimo que hay que reunir, no un punto
 * medio que nadie paga exactamente. Si el rango dice 1.6M – 2.3M, lo honesto
 * es "desde 1,2 mínimos", no "1,5".
 *
 * Devuelve null si falta cualquier pieza. Un cero o un guión invitarían a
 * leerlo como un dato.
 */
export function enSalariosMinimos(rango, ref = COLOMBIA_REFERENCE.minimumWage) {
    if (!referenciaCompleta(ref)) return null;
    if (!rango || typeof rango !== "object") return null;
    // Solo pesos: el documento trae algunas ciudades en dólares y compararlas
    // con un salario mínimo colombiano daría un número cuarenta veces menor.
    if ((rango.currency || "COP") !== ref.currency) return null;
    const desde = typeof rango.min === "number" ? rango.min : null;
    if (desde === null) return null;
    return Math.round((desde / ref.amount) * 10) / 10;
}
