(() => {
  const ALLOWED_HOSTS = ["localhost", "127.0.0.1"];

  // Doble candado: hace falta la bandera en dev-config.js Y estar en un
  // host local. Si falta cualquiera de los dos, este script no toca el DOM
  // para nada - ni siquiera un elemento oculto que alguien pueda encontrar
  // inspeccionando la pagina.
  if (!window.__FP_DEV_MODE__ || !ALLOWED_HOSTS.includes(location.hostname)) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    #fpDevTools {
      position: fixed;
      bottom: 18px;
      left: 18px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .fp-dev-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      background: #1a1206;
      border: 1px solid rgba(255,176,32,.45);
      color: #ffb020;
      font: 600 .78rem/1 'Manrope', Arial, sans-serif;
      letter-spacing: .02em;
      text-decoration: none;
      box-shadow: 0 10px 26px rgba(0,0,0,.4), 0 0 20px rgba(255,176,32,.12);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .fp-dev-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 32px rgba(0,0,0,.45), 0 0 26px rgba(255,176,32,.2);
    }
    .fp-dev-btn .fp-dev-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ffb020;
      box-shadow: 0 0 8px #ffb020;
      flex: 0 0 auto;
    }
  `;

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

  document.head.appendChild(style);
  document.body.appendChild(panel);
})();
