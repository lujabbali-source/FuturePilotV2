// Punto de entrada de /consent/{token}.
//
// NO importa exigirCuenta: esta pagina es publica a proposito. El acudiente
// no tiene cuenta y no vamos a pedirle que se cree una para responder una
// pregunta sobre su propio hijo.
//
// Tampoco lleva el chat del mentor ni la cabecera del sitio: quien llega
// aqui viene a responder una cosa concreta, no a explorar la plataforma.
import "../shared/legal.css";
import "./page.css";
import "../shared/i18next.js";

import "./app.js";
