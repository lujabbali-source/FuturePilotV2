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

  function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  function renderTopCareers(topCareers) {
    const list = document.getElementById("topCareersList");
    if (!topCareers || topCareers.length === 0) {
      list.innerHTML = '<li class="admin-list__empty">Sin datos todavía.</li>';
      return;
    }
    list.innerHTML = topCareers
      .map(
        (item) => `
        <li>
          <span class="admin-list__name">${item.name}</span>
          <span class="admin-list__count">${item.total}</span>
        </li>`
      )
      .join("");
  }

  function renderTopCountries(topCountries) {
    const list = document.getElementById("topCountriesList");
    if (!topCountries || topCountries.length === 0) {
      list.innerHTML = '<li class="admin-list__empty">Todavía no se registra esta métrica — se llena cuando los usuarios exploran países en el globo.</li>';
      return;
    }
    list.innerHTML = topCountries
      .map(
        (item) => `
        <li>
          <span class="admin-list__name">${item.name}</span>
          <span class="admin-list__count">${item.total}</span>
        </li>`
      )
      .join("");
  }

  function renderRecentActivity(recentActivity) {
    const list = document.getElementById("recentActivityList");
    if (!recentActivity || recentActivity.length === 0) {
      list.innerHTML = '<li class="admin-list__empty">Sin datos todavía.</li>';
      return;
    }
    list.innerHTML = recentActivity
      .map(
        (item) => `
        <li>
          <span class="admin-list__name">${item.email} → ${item.top_career_name || "—"}</span>
          <span class="admin-list__meta">${formatDate(item.created_at)}</span>
        </li>`
      )
      .join("");
  }

  function renderDashboard(payload) {
    const metrics = payload.metrics || {};
    document.getElementById("metricTotalUsers").textContent = metrics.total_users ?? "—";
    document.getElementById("metricActiveUsers").textContent = metrics.active_sessions ?? "—";
    document.getElementById("metricTests").textContent = metrics.tests_completed ?? "—";
    document.getElementById("metricNewUsers").textContent = metrics.new_users_7d ?? "—";
    document.getElementById("metricTests7d").textContent = metrics.tests_completed_7d ?? "—";
    renderTopCareers(payload.top_careers);
    renderTopCountries(payload.top_countries);
    renderRecentActivity(payload.recent_activity);
  }

  async function loadDashboard() {
    try {
      const response = await fetch("/api/v1/admin/dashboard", { headers: authHeaders });
      if (!response.ok) return;
      const payload = await response.json();
      renderDashboard(payload);
    } catch (error) {
      // Las tarjetas se quedan en "—" si falla; el gate de acceso ya paso,
      // esto no es un problema de autorizacion.
    }
  }

  async function verifyAdminAccess() {
    try {
      const response = await fetch("/api/v1/admin/me", { headers: authHeaders });
      if (!response.ok) {
        goToAdminLogin();
        return;
      }
      const data = await response.json();
      document.getElementById("adminUserEmail").textContent = data.user.email;
      localStorage.setItem("futurePilotAdminUser", JSON.stringify(data.user));

      gate.hidden = true;
      app.hidden = false;
      loadDashboard();
    } catch (error) {
      goToAdminLogin();
    }
  }

  document.getElementById("adminLogoutBtn")?.addEventListener("click", async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST", headers: authHeaders });
    } catch (error) {
      // Si falla la llamada de red igual limpiamos la sesion local.
    }
    goToAdminLogin();
  });

  verifyAdminAccess();
}

main();
