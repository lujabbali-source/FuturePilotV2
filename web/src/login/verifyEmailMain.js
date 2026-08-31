// Punto de entrada de /verify-email. Misma familia visual que /login y
// /reset-password (comparten login.css), pero su propia entrada en el build:
// no arrastra la logica del formulario de login, que aqui no hace falta.
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./verifyEmail.js";
