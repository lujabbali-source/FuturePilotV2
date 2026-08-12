// Punto de entrada de /journey.
import "../shared/theme-loader.js";
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import { hydrate, updateJourneyUI } from "../shared/apiConnector.js";
import "./app.js";

// Explicito: antes el conector se auto-arrancaba mirando la URL para
// deducir en que pagina estaba. Cada pagina pide lo suyo.
hydrate(updateJourneyUI);
