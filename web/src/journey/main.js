// Punto de entrada de /journey.
//
// Ya no pasa por apiConnector: updateJourneyUI existia para reescribir los
// cuatro titulos del markup fijo que tenia esta pagina, y ese markup ya no
// existe. La pagina se construye sola desde el roadmap real.
import "./page.css";
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./app.js";
