/**
 * Formatear dinero sin tumbar la pagina.
 *
 * `new Intl.NumberFormat(locale, { style: "currency", currency })` LANZA un
 * RangeError si `currency` no es un codigo ISO 4217 de tres letras. No
 * devuelve algo raro: lanza. Y lo hace al CONSTRUIRSE, antes de mirar
 * siquiera si hay una cifra que formatear.
 *
 * El panel de ciudad sacaba la moneda de `statistics.currency`, que en los
 * datos del mundo es prosa para leer: "Dolar canadiense (CAD)", "Dolar
 * estadounidense (USD) / Bitcoin". Con eso, abrir CUALQUIER ciudad que no
 * fuera colombiana lanzaba dentro del render y React desmontaba el arbol
 * entero: pantalla negra, sin panel y sin globo, hasta recargar.
 *
 * Aqui se hacen dos cosas: sacar el codigo de la prosa cuando esta, y no
 * lanzar nunca. Un dato mal escrito puede dejar una cifra sin simbolo; no
 * puede dejar al estudiante mirando una pantalla en blanco.
 */

/**
 * El codigo ISO escondido en un texto para leer.
 *
 *   "COP"                              -> "COP"
 *   "Dolar canadiense (CAD)"           -> "CAD"
 *   "Dolar estadounidense (USD) / Bitcoin" -> "USD"
 *   "Bitcoin"                          -> null
 */
export function codigoMoneda(valor) {
    if (typeof valor !== "string") return null;
    const limpio = valor.trim();
    if (/^[A-Za-z]{3}$/.test(limpio)) return limpio.toUpperCase();
    const entreParentesis = limpio.match(/\(([A-Za-z]{3})\)/);
    return entreParentesis ? entreParentesis[1].toUpperCase() : null;
}

/**
 * Un formateador que no lanza.
 *
 * Si el codigo no sirve se devuelve uno de numeros a secas. Se pierde el
 * simbolo, que es un fallo de presentacion; lo que no se pierde es la pagina.
 */
export function formateadorMoneda(locale, currency) {
    const codigo = codigoMoneda(currency);
    if (codigo) {
        try {
            return new Intl.NumberFormat(locale, {
                style: "currency", currency: codigo, maximumFractionDigits: 0,
            });
        } catch {
            // Tres letras validas que no son una moneda real (ej. "ABC").
            // Intl es el unico que lo sabe, y solo al intentarlo.
        }
    }
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
}
