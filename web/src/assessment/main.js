// Punto de entrada del test vocacional.
//
// Reemplaza al bootstrap con document.write que tenia
// Frontend/assessment.html, donde trece <script> se cargaban por orden y
// se comunicaban entre si dejando objetos en window. Ese patron es la
// razon de que la CSP del sitio necesite 'unsafe-inline' (ver el comentario
// de _CSP en futurepilot-IA/app.py): esta pagina ya no lo usa, y cuando
// las demas migren la directiva podra caer.
//
// Los imports de abajo son de dos clases distintas y conviene no
// confundirlas:
//
//   - ./app.js importa sus dependencias de verdad (engine, questionTypes,
//     y desde src/shared/ el claim del resultado, que antes era un global
//     compartido con /login y dejo de serlo al migrar esa pagina).
//   - Los de Frontend/ son modulos heredados que todavia comparten con
//     paginas sin migrar (journey, flightplan, passport, careers). Se
//     importan por su EFECTO SECUNDARIO: cada uno es un IIFE que se
//     registra solo en window. Asi el bundle los incluye sin duplicar el
//     codigo ni romper a quien los sigue cargando con <script>. A medida
//     que esas paginas migren, dejaran de ser efectos secundarios y
//     pasaran a src/shared/ como modulos normales.

import "../../../Frontend/theme-loader.js";
import "../../../Frontend/i18n.js";
import "../../../Frontend/language-toggle.js";
import "../../../Frontend/passport-stamp-toast.js";
import "../../../Frontend/mentor-chat.js";
import "../../../Frontend/futurepilot-connector.js";
import "../../../Frontend/dev-config.js";
import "../../../Frontend/dev-tools.js";

import "./app.js";
