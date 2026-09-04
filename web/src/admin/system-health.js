// El cuerpo va dentro de una funcion con nombre porque necesita
// cortar pronto (`return`). Valido dentro del IIFE que envolvia
// este archivo; error de sintaxis en un modulo ES.
function main() {
  const gate = document.getElementById("adminGate");
  const app = document.getElementById("adminApp");

  function goToAdminLogin() {
    localStorage.removeItem("futurePilotAdminToken");
    localStorage.removeItem("futurePilotAdminUser");
    window.location.href = "/admin/login";
  }

  const token = localStorage.getItem("futurePilotAdminToken");
  if (!token) {
    goToAdminLogin();
    return;
  }
  const authHeaders = { Authorization: `Bearer ${token}` };

  const LABELS = {
    backend: "Backend",
    frontend: "Frontend",
    database: "Base de datos",
    ai: "Inteligencia Artificial",
    globe: "Globo interactivo",
    login: "Login",
    auth: "Autenticación",
    apis: "APIs",
    static_assets: "Recursos estáticos",
    // Estos dos vigilan trabajo que corre FUERA del servidor (cron), que es
    // justo el que puede morirse sin que nadie se entere. Ojo al añadir un
    // check nuevo en app.py: esta lista decide qué se pinta, así que un check
    // sin etiqueta aquí es un check invisible. Hay un test que lo comprueba.
    backups: "Copias de seguridad",
    consents: "Permisos de acudientes",
  };

  // Solo las acciones que el backend realmente sabe ejecutar (ver
  // /api/v1/admin/repair/{action} en app.py) - reload-data recarga
  // careers.json/questions.json desde disco sin reiniciar el servidor.
  const REPAIR_LABELS = {
    "reload-data": "Recargar datos de carreras/preguntas",
  };

  const STATUS_ICON = { ok: "🟢", warning: "🟡", error: "🔴" };
  const STATUS_LABEL = { ok: "Funcionando correctamente", warning: "Advertencia", error: "Error" };

  const grid = document.getElementById("healthGrid");
  const overallDot = document.getElementById("overallDot");
  const overallLabel = document.getElementById("overallLabel");
  const refreshBtn = document.getElementById("refreshBtn");

  function renderChecks(payload) {
    overallDot.className = `health-dot status-${payload.overall}`;
    overallLabel.textContent = `Estado general: ${STATUS_LABEL[payload.overall]}`;

    grid.innerHTML = "";
    Object.keys(LABELS).forEach((key) => {
      const check = payload.checks[key];
      if (!check) return;

      const card = document.createElement("article");
      card.className = "health-card";

      const repairAction = check.repairAction;
      const repairButton = repairAction
        ? `<button type="button" class="health-card__repair" data-repair="${repairAction}">${STATUS_ICON.warning} Reparar: ${REPAIR_LABELS[repairAction] || repairAction}</button>`
        : "";

      card.innerHTML = `
        <div class="health-card__head">
          <span class="health-dot status-${check.status}"></span>
          <span class="health-card__title">${LABELS[key]}</span>
        </div>
        <p class="health-card__detail">${check.detail}</p>
        ${repairButton}
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll("[data-repair]").forEach((button) => {
      button.addEventListener("click", () => runRepair(button.dataset.repair, button));
    });
  }

  async function loadHealth() {
    refreshBtn.disabled = true;
    refreshBtn.textContent = "Verificando…";
    try {
      const response = await fetch("/api/v1/admin/health", { headers: authHeaders });
      if (!response.ok) return;
      const payload = await response.json();
      renderChecks(payload);
    } catch (error) {
      overallLabel.textContent = "No se pudo consultar el estado del sistema.";
    } finally {
      refreshBtn.disabled = false;
      refreshBtn.textContent = "Actualizar estado";
    }
  }

  async function runRepair(action, button) {
    button.disabled = true;
    button.textContent = "Reparando…";
    try {
      await fetch(`/api/v1/admin/repair/${action}`, { method: "POST", headers: authHeaders });
    } catch (error) {
      // Si falla, la siguiente verificacion de estado lo va a mostrar igual.
    }
    await loadHealth();
  }

  refreshBtn.addEventListener("click", loadHealth);

  async function verifyAdminAccess() {
    try {
      const response = await fetch("/api/v1/admin/me", { headers: authHeaders });
      if (!response.ok) {
        goToAdminLogin();
        return;
      }
      const data = await response.json();
      document.getElementById("adminUserEmail").textContent = data.user.email;

      gate.hidden = true;
      app.hidden = false;
      loadHealth();
    } catch (error) {
      goToAdminLogin();
    }
  }

  document.getElementById("adminLogoutBtn")?.addEventListener("click", async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST", headers: authHeaders });
    } catch (error) {
      // Igual limpiamos la sesion local aunque falle la llamada de red.
    }
    goToAdminLogin();
  });

  verifyAdminAccess();
}

main();
