// Punto de entrada de /flightplan.
// Estilos propios de la pagina, antes en un <style> dentro del HTML.
import "./page.css";
import "../shared/theme-loader.js";
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import { hydrate, updateFlightPlanUI } from "../shared/apiConnector.js";
import "./app.js";

hydrate(updateFlightPlanUI);
