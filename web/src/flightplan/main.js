// Punto de entrada de /flightplan.
//
// Ya no pasa por apiConnector: updateFlightPlanUI existia para rellenar el
// markup fijo que tenia esta pagina (las tarjetas con "Loading..."), y ese
// markup ya no existe. La pagina se construye sola desde su resultado.
import "./page.css";
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./app.js";
