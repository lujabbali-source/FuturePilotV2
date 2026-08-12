// Punto de entrada de /login.
//
// resultClaim ya no viaja por window: era compartido entre esta pagina y
// el test, y ahora que las dos estan migradas se importa donde se usa.
// Lo hace app.js directamente.
//
// Lo de Frontend/ son modulos heredados que todavia comparten paginas sin
// migrar; se importan por su efecto secundario (cada uno es un IIFE que se
// registra en window). Iran cayendo con cada pagina que migre.
import "../../../Frontend/theme-loader.js";
import "../../../Frontend/i18n.js";
import "../../../Frontend/language-toggle.js";
import "../../../Frontend/passport-stamp-toast.js";
import "../../../Frontend/mentor-chat.js";

import "./app.js";
