// Pide cuenta antes que nada. Primer import a proposito: ver exigirCuenta.js.
import "../shared/exigirCuenta.js";
// Punto de entrada de /informe.
//
// El radar se reusa tal cual del test (radar.js + radar.css): es el mismo
// grafico con los mismos ejes y la misma procedencia de cada numero. Un
// segundo radar dibujado solo para el informe acabaria divergiendo del de
// pantalla, y entonces el papel y la app dirian cosas distintas del mismo
// resultado.
//
// Va con cabecera del sitio y con el mentor porque en PANTALLA esto sigue
// siendo una pagina mas: se llega desde la cuenta y se sale a otro sitio. Al
// imprimir los dos desaparecen (ver el bloque @media print de page.css).
import "./page.css";
import "../assessment/radar.css";
import "../shared/site-header.js";
import "../shared/i18next.js";
import "../shared/passport-stamp-toast.js";
import "../shared/mentor-chat.js";

import "./app.js";
