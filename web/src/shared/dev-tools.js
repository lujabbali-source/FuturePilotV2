// Los estilos viven en dev-tools.css: un <style> inyectado desde JS lo
// bloquea la CSP igual que uno escrito en el HTML, y asi ademas los
// empaqueta y minifica Vite.
import "./dev-tools.css";
(() => {
  const ALLOWED_HOSTS = ["localhost", "127.0.0.1"];

  // Doble candado: hace falta la bandera en dev-config.js Y estar en un
  // host local. Si falta cualquiera de los dos, este script no toca el DOM
  // para nada - ni siquiera un elemento oculto que alguien pueda encontrar
  // inspeccionando la pagina.
  if (!window.__FP_DEV_MODE__ || !ALLOWED_HOSTS.includes(location.hostname)) {
    return;
  }

  const panel = document.createElement("div");
  panel.id = "fpDevTools";
  panel.innerHTML = `
    <a class="fp-dev-btn" href="/login" title="Salta el test y va directo al login real de estudiante. No aparece fuera de localhost.">
      <span class="fp-dev-dot"></span>Acceso rápido · DEV
    </a>
    <a class="fp-dev-btn" href="/admin/login" title="Login del panel de administracion. Sigue exigiendo credenciales de admin reales. No aparece fuera de localhost.">
      <span class="fp-dev-dot"></span>Panel admin · DEV
    </a>
  `;
  document.body.appendChild(panel);
})();
