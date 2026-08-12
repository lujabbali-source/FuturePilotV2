// Punto de entrada de /login.
//
// resultClaim ya no viaja por window: era compartido entre esta pagina y
// el test, y ahora que las dos estan migradas se importa donde se usa.
// Lo hace app.js directamente.
//
// Los de src/shared/ se importan por su efecto secundario: son IIFE que se
// registran en window. Convertirlos a exports es el ultimo paso pendiente
// de la consolidacion.
import "../shared/theme-loader.js";
import "../shared/i18next.js";
import "../shared/language-toggle.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./app.js";
