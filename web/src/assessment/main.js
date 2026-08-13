// Punto de entrada del test vocacional.
//
// Reemplaza al bootstrap con document.write que tenia
// Frontend/assessment.html, donde trece <script> se cargaban por orden y
// se comunicaban entre si dejando objetos en window.
//
// Los modulos de src/shared/ se importan por su efecto secundario: siguen
// siendo IIFE que se registran en window (i18n, el toast de sellos, el
// widget del mentor, el tema). Son los ultimos que quedan asi; el claim
// del resultado y el conector de la API ya son imports normales, y app.js
// los pide directamente.
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";
import "../shared/dev-config.js";
import "../shared/dev-tools.js";

import "./app.js";
