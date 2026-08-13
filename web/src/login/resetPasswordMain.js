// Punto de entrada de /reset-password. Comparte hoja de estilos y modulos
// heredados con /login, pero es una pagina distinta: su propia entrada en
// el build, sin arrastrar la logica del formulario de login.
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./resetPassword.js";
