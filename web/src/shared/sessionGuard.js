/**
 * Quien puede entrar a cada pagina.
 *
 * Hasta ahora solo /passport pedia cuenta, y lo hacia con su propia copia de
 * la comprobacion. El globo, las carreras, la ruta y el plan de vuelo se
 * servian a cualquiera: se podia recorrer las 226 ciudades, abrir los
 * roadmaps y hablar con el mentor sin registrarse nunca.
 *
 * QUE PROTEGE ESTO Y QUE NO. Esto es un embudo, no una caja fuerte. Vive en
 * el navegador, asi que alguien decidido puede saltarselo apagando JavaScript
 * o leyendo el bundle de /app directamente. Lo que NO se puede sacar asi son
 * los datos de cada estudiante: el roadmap, el pasaporte y el panel los sirve
 * la API, y esa si exige el token en el servidor (get_current_user_required).
 * Aqui se decide quien ve la aplicacion, no quien ve los datos de otro.
 *
 * Cuando el token pase de localStorage a una cookie HttpOnly, el servidor
 * podra decidir esto antes de mandar el HTML y la comprobacion se volvera
 * real. Esta pensado para que ese dia solo cambie `haySesion()`.
 */

const CLAVE = "futurePilotAuthToken";

/**
 * Las rutas que existen. Sirve de lista blanca para `next`: sin ella,
 * /login?next=https://sitio-falso.com convertiria el login en un trampolin
 * de phishing con el dominio de FuturePilot en la barra de direcciones.
 */
export const RUTAS_PUBLICAS = ["/", "/assessment", "/login", "/reset-password", "/terms", "/privacy"];
export const RUTAS_PRIVADAS = ["/globe", "/careers", "/journey", "/flightplan", "/passport"];

export function haySesion() {
    return Boolean(localStorage.getItem(CLAVE));
}

/**
 * El destino guardado en `next`, solo si es una de nuestras paginas.
 *
 * No basta con exigir que empiece por "/": //otro-sitio.com tambien empieza
 * por "/" y el navegador lo lee como una URL absoluta con el protocolo
 * actual. Por eso se compara contra la lista, no contra un patron.
 */
export function destinoSeguro(valor) {
    if (!valor) return null;
    let ruta;
    try {
        ruta = decodeURIComponent(valor);
    } catch {
        return null;  // porcentajes malformados
    }
    const limpia = ruta.split("?")[0].split("#")[0];
    const conocidas = [...RUTAS_PUBLICAS, ...RUTAS_PRIVADAS];
    return conocidas.includes(limpia) ? limpia : null;
}

/**
 * Manda a registrarse, recordando a donde iba.
 *
 * `replace` y no `href`: con href, el boton de atras devuelve a la pagina
 * protegida, que vuelve a rebotar al login, y el usuario queda atrapado.
 *
 * Se abre en modo registro, no en login: quien llega aqui es, casi siempre,
 * alguien que todavia no tiene cuenta. El que ya la tiene tiene el enlace
 * para cambiar de modo a un clic.
 */
export function exigirCuenta() {
    if (haySesion()) return localStorage.getItem(CLAVE);

    // Ocultar antes de redirigir. Sin esto se ve un parpadeo de la pagina
    // completa - el globo llega a montarse - antes de que el navegador
    // cambie de sitio.
    if (document.documentElement) document.documentElement.style.visibility = "hidden";

    const aqui = window.location.pathname;
    const destino = destinoSeguro(aqui);
    const query = destino ? `?mode=register&next=${encodeURIComponent(destino)}` : "?mode=register";
    window.location.replace(`/login${query}`);
    return null;
}
