(() => {
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

  const FLAG_LABELS = {
    admin_users: "Usuarios registrados",
    admin_stats: "Estadísticas",
    admin_test_results: "Resultados de los test",
    admin_universities: "Gestión de universidades",
    admin_countries: "Países y ciudades",
    admin_knowledge_base: "Base de conocimiento",
    admin_ai_config: "Configuración de la IA",
    admin_system_config: "Configuración del sistema",
    admin_surveys: "Encuestas y retroalimentación",
    admin_logs: "Logs del sistema",
    admin_settings: "Configuración del administrador",
  };

  function syncSidebarFlags(flags) {
    document.querySelectorAll("[data-flag-item]").forEach((item) => {
      const key = item.dataset.flagItem;
      const enabled = !!flags[key];
      item.classList.toggle("is-flag-enabled", enabled);
      const badge = item.querySelector("em");
      if (badge) badge.textContent = enabled ? "Activo (beta)" : "Próximamente";
    });
  }

  function renderFlags(flags) {
    const list = document.getElementById("featureFlagsList");
    list.innerHTML = Object.keys(FLAG_LABELS)
      .map((key) => {
        const checked = flags[key] ? "checked" : "";
        return `
        <li>
          <span class="admin-flag__name">${FLAG_LABELS[key]}</span>
          <label class="admin-flag__switch">
            <input type="checkbox" data-flag-key="${key}" ${checked}>
            <span></span>
          </label>
        </li>`;
      })
      .join("");

    list.querySelectorAll("[data-flag-key]").forEach((checkbox) => {
      checkbox.addEventListener("change", async () => {
        const key = checkbox.dataset.flagKey;
        checkbox.disabled = true;
        try {
          const response = await fetch(`/api/v1/admin/flags/${key}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeaders },
            body: JSON.stringify({ enabled: checkbox.checked }),
          });
          if (response.ok) {
            const data = await response.json();
            syncSidebarFlags(data.flags);
          } else {
            checkbox.checked = !checkbox.checked;
          }
        } catch (error) {
          checkbox.checked = !checkbox.checked;
        } finally {
          checkbox.disabled = false;
        }
      });
    });
  }

  async function loadFlags() {
    try {
      const response = await fetch("/api/flags", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      renderFlags(data.flags || {});
      syncSidebarFlags(data.flags || {});
    } catch (error) {
      // La lista se queda en "Cargando..." si falla - no es un problema
      // de autorizacion, /api/flags es publico.
    }
  }

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
      loadFlags();
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
})();
