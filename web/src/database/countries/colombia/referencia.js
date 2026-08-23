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
        amount: 1623500,
        currency: "COP",
        year: 2026,
        // Sin número de decreto porque no lo tengo confirmado y no me lo voy a
        // inventar: una fuente falsa es peor que una genérica, porque invita a
        // creer que alguien la verificó. Si lo añades, aquí es donde va.
        source: "SMMLV",
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

/**
 * Tasa de cambio, tal como la da el documento de ciudades.
 *
 * Va aquí y no en cada ficha por lo mismo que el salario mínimo: es nacional y
 * una sola. El documento la menciona dos veces, en Bogotá y Medellín, y dice
 * lo mismo las dos - con una salvedad que conviene conservar: la de Bogotá
 * dice "tradicionalmente se sitúa entre", no "hoy está en". Es un rango
 * histórico, no una cotización.
 *
 * Por eso la conversión se hace AL PINTAR y no se escribe en los datos de
 * ciudad: lo guardado sigue siendo exactamente lo que dijo la fuente (dólares),
 * y el peso derivado no puede confundirse nunca con un dato original.
 */
export const TASA_USD_COP = {
    from: "USD",
    to: "COP",
    min: 3800,
    max: 4300,
    source: "America cities.docx",
    asOf: "2026",
};

/**
 * Un rango en dólares, en pesos.
 *
 * El mínimo con la tasa baja y el máximo con la alta: da el intervalo más
 * ancho, que es el honesto cuando se multiplica un rango por otro rango.
 * Estrecharlo usando la tasa media fingiría una precisión que no existe ni en
 * el presupuesto ni en la tasa.
 *
 * `converted: true` viaja con el resultado para que la pantalla pueda decir
 * que es una conversión y no una cifra que alguien midió en pesos.
 */
export function aPesos(rango, tasa = TASA_USD_COP) {
    if (!rango || rango.currency !== tasa.from) return null;
    if (typeof rango.min !== "number" || typeof rango.max !== "number") return null;
    return {
        min: Math.round(rango.min * tasa.min),
        max: Math.round(rango.max * tasa.max),
        currency: tasa.to,
        converted: true,
        from: rango,
        rate: tasa,
    };
}
