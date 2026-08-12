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

  // Los mismos valores que Frontend/style.css trae por defecto en su
  // :root - si no hay tema guardado, los selectores arrancan mostrando
  // los colores reales del sitio, no un blanco/negro generico.
  const DEFAULTS = {
    bg: "#07111f",
    primary: "#00ffb3",
    secondary: "#00d4ff",
    accent: "#00ffb3",
    button: "#00ffb3",
    glow: "#00ffb3",
    "card-bg": "rgba(255,255,255,.05)",
    text: "#ffffff",
    "text-muted": "#b8c4d4",
  };

  const fields = {
    bg: document.getElementById("colorBg"),
    primary: document.getElementById("colorPrimary"),
    secondary: document.getElementById("colorSecondary"),
    accent: document.getElementById("colorAccent"),
    button: document.getElementById("colorButton"),
    glow: document.getElementById("colorGlow"),
    text: document.getElementById("colorText"),
    "text-muted": document.getElementById("colorTextMuted"),
    "card-bg": document.getElementById("colorCardBg"),
  };

  const applyBtn = document.getElementById("applyBtn");
  const restoreBtn = document.getElementById("restoreBtn");
  const saveBtn = document.getElementById("saveBtn");
  const clearSavedBtn = document.getElementById("clearSavedBtn");
  const statusEl = document.getElementById("themeStatus");
  const previewFrame = document.getElementById("previewFrame");

  let previewReady = false;
  let hasSavedTheme = false;

  function setFields(colors) {
    Object.keys(fields).forEach((key) => {
      fields[key].value = colors[key] || DEFAULTS[key];
    });
  }

  function hexToRgbTriplet(hex) {
    const clean = String(hex).replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    const value = parseInt(clean, 16);
    return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;
  }

  function currentColors() {
    const colors = {};
    Object.keys(fields).forEach((key) => {
      colors[key] = fields[key].value;
    });
    ["primary", "secondary", "glow"].forEach((key) => {
      const rgb = hexToRgbTriplet(colors[key]);
      if (rgb) colors[`${key}-rgb`] = rgb;
    });
    return colors;
  }

  function applyToPreview() {
    if (!previewReady) return;
    try {
      const doc = previewFrame.contentDocument;
      let style = doc.getElementById("fpThemeLabPreview");
      if (!style) {
        style = doc.createElement("style");
        style.id = "fpThemeLabPreview";
        doc.head.appendChild(style);
      }
      const colors = currentColors();
      const declarations = Object.keys(colors).map((key) => `--fp-${key}:${colors[key]};`).join("");
      style.textContent = `:root{${declarations}}`;
    } catch (error) {
      // Iframe cross-origin o todavia no cargo del todo - no hay nada que
      // hacer, el siguiente cambio de color lo reintenta.
    }
  }

  previewFrame.addEventListener("load", () => {
    previewReady = true;
    applyToPreview();
  });

  Object.values(fields).forEach((input) => {
    input.addEventListener("input", applyToPreview);
  });

  applyBtn.addEventListener("click", applyToPreview);

  restoreBtn.addEventListener("click", () => {
    setFields(DEFAULTS);
    applyToPreview();
    statusEl.textContent = "Vista previa restaurada a los valores originales (todavía no guardado).";
    statusEl.className = "theme-lab__status";
  });

  function showStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.className = `theme-lab__status ${kind ? `is-${kind}` : ""}`.trim();
  }

  saveBtn.addEventListener("click", async () => {
    saveBtn.disabled = true;
    try {
      const response = await fetch("/api/v1/admin/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ colors: currentColors() }),
      });
      if (!response.ok) throw new Error("save failed");
      hasSavedTheme = true;
      clearSavedBtn.hidden = false;
      showStatus("Tema guardado — ya es visible para todos los usuarios.", "success");
    } catch (error) {
      showStatus("No se pudo guardar el tema. Intenta de nuevo.", "error");
    } finally {
      saveBtn.disabled = false;
    }
  });

  clearSavedBtn.addEventListener("click", async () => {
    clearSavedBtn.disabled = true;
    try {
      const response = await fetch("/api/v1/admin/theme", {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!response.ok) throw new Error("reset failed");
      hasSavedTheme = false;
      clearSavedBtn.hidden = true;
      showStatus("Tema guardado eliminado — el sitio volvió a sus colores originales.", "success");
    } catch (error) {
      showStatus("No se pudo quitar el tema guardado. Intenta de nuevo.", "error");
    } finally {
      clearSavedBtn.disabled = false;
    }
  });

  async function verifyAdminAccess() {
    try {
      const response = await fetch("/api/v1/admin/me", { headers: authHeaders });
      if (!response.ok) {
        goToAdminLogin();
        return;
      }
      const data = await response.json();
      document.getElementById("adminUserEmail").textContent = data.user.email;

      const themeResponse = await fetch("/api/theme", { cache: "no-store" });
      const themeData = themeResponse.ok ? await themeResponse.json() : { colors: {} };
      const saved = themeData.colors || {};
      hasSavedTheme = Object.keys(saved).length > 0;
      clearSavedBtn.hidden = !hasSavedTheme;
      setFields({ ...DEFAULTS, ...saved });

      gate.hidden = true;
      app.hidden = false;
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
