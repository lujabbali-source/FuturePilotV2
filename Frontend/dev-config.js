// Interruptor de desarrollo para FuturePilot.
//
// window.__FP_DEV_MODE__ = true habilita herramientas visibles solo para
// quien esta desarrollando localmente (ver dev-tools.js): por ahora, un
// boton "Acceso rapido" que salta el test vocacional y va directo al login
// real, sin tocar ni debilitar la autenticacion (sigue exigiendo email y
// contrasena reales en /login).
//
// Para desactivar antes de produccion, cualquiera de estas dos formas
// alcanza (no hace falta borrar dev-tools.js):
//   1. Cambia esta linea a false.
//   2. Quita el <script src="dev-config.js"> de las paginas donde este
//      incluido (index.html, assessment.html).
// Sin la bandera en true, dev-tools.js no crea ningun elemento en la
// pagina. Ademas, aunque quede en true por descuido, solo se activa en
// localhost/127.0.0.1 - nunca en un dominio real.
window.__FP_DEV_MODE__ = true;
