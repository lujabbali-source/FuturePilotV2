// El cuerpo va dentro de una funcion con nombre porque necesita cortar
// pronto (`return`) en algun camino. Un `return` suelto era valido dentro
// del IIFE que envolvia este archivo; en un modulo ES es un error de
// sintaxis.
function main() {
  const gate = document.getElementById("passportGate");
  const shell = document.getElementById("passportShell");

  function goToLogin() {
    window.location.href = "/login";
  }

  const token = localStorage.getItem("futurePilotAuthToken");
  if (!token) {
    goToLogin();
    return;
  }
  const authHeaders = { Authorization: `Bearer ${token}` };

  // Catalogo completo de sellos posibles - mismo mapeo pais->bandera que
  // PASSPORT_COUNTRY_FLAGS en futurepilot-IA/app.py. Los que el usuario no
  // tiene todavia se muestran "bloqueados" para invitar a completarlos.
  const COUNTRY_NAMES = {
    colombia: "Colombia", brasil: "Brasil", ecuador: "Ecuador", argentina: "Argentina",
    peru: "Perú", chile: "Chile", uruguay: "Uruguay", paraguay: "Paraguay",
    bolivia: "Bolivia", mexico: "México", "estados-unidos": "Estados Unidos", canada: "Canadá",
    "costa-rica": "Costa Rica", "republica-dominicana": "República Dominicana", panama: "Panamá",
    cuba: "Cuba", haiti: "Haití", guatemala: "Guatemala", honduras: "Honduras",
    nicaragua: "Nicaragua", "puerto-rico": "Puerto Rico", "el-salvador": "El Salvador",
  };
  const COUNTRY_FLAGS = {
    colombia: "🇨🇴", brasil: "🇧🇷", ecuador: "🇪🇨", argentina: "🇦🇷",
    peru: "🇵🇪", chile: "🇨🇱", uruguay: "🇺🇾", paraguay: "🇵🇾",
    bolivia: "🇧🇴", mexico: "🇲🇽", "estados-unidos": "🇺🇸", canada: "🇨🇦",
    "costa-rica": "🇨🇷", "republica-dominicana": "🇩🇴", panama: "🇵🇦",
    cuba: "🇨🇺", haiti: "🇭🇹", guatemala: "🇬🇹", honduras: "🇭🇳",
    nicaragua: "🇳🇮", "puerto-rico": "🇵🇷", "el-salvador": "🇸🇻",
  };

  const STAMP_CATALOG = [
    { key: "test_completed", icon: "📚", label: "Terminó el test" },
    { key: "roadmap_created", icon: "🗺️", label: "Creó su roadmap" },
    { key: "university_visited", icon: "🎓", label: "Visitó una universidad" },
    { key: "ai_chat", icon: "🤖", label: "Habló con la IA" },
    ...Object.keys(COUNTRY_NAMES).map((id) => ({
      key: `country_${id}`,
      icon: COUNTRY_FLAGS[id],
      label: `Exploró ${COUNTRY_NAMES[id]}`,
    })),
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
    }[ch]));
  }

  function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
  }

  function renderCover(data) {
    const name = data.user.name || data.user.email.split("@")[0];
    document.getElementById("passportName").textContent = name;
    document.getElementById("passportMeta").textContent = `Miembro desde ${formatDate(data.user.member_since)}`;
    document.getElementById("passportStampCount").textContent =
      `${data.stamps.length} de ${STAMP_CATALOG.length} sellos coleccionados`;

    const initialEl = document.getElementById("passportPhotoInitial");
    const imgEl = document.getElementById("passportPhotoImg");
    if (data.profile.photo_data_url) {
      imgEl.src = data.profile.photo_data_url;
      imgEl.hidden = false;
      initialEl.hidden = true;
    } else {
      initialEl.textContent = name.charAt(0).toUpperCase();
      initialEl.hidden = false;
      imgEl.hidden = true;
    }
  }

  function renderProfileView(profile) {
    document.getElementById("viewCountry").textContent = profile.country || "Sin definir";
    document.getElementById("viewCity").textContent = profile.city || "Sin definir";
    document.getElementById("viewLanguages").textContent =
      profile.languages && profile.languages.length ? profile.languages.join(", ") : "Sin definir";
  }

  function renderGoalsView(goals) {
    document.getElementById("viewDreamUniversity").textContent = goals.dream_university || "Sin definir";
    document.getElementById("viewDesiredCareer").textContent = goals.desired_career || "Sin definir";
    document.getElementById("viewTargetCountry").textContent = goals.target_country || "Sin definir";
    document.getElementById("viewLanguagesToLearn").textContent = goals.languages_to_learn || "Sin definir";
    document.getElementById("viewPersonalGoals").textContent = goals.personal_goals || "Sin definir";
  }

  function renderVocational(vocational) {
    const container = document.getElementById("vocationalContent");
    if (!vocational) {
      container.innerHTML = `
        <p class="passport-empty">Todavía no completaste el test. Hazlo para que tu pasaporte guarde tu perfil.</p>
        <a href="/assessment" class="passport-save-btn passport-cta-btn">Hacer el test ahora <span>→</span></a>
      `;
      return;
    }

    const strengths = (vocational.strengths || [])
      .map((s) => `<span class="vocational-chip vocational-chip--strength">${escapeHtml(s)}</span>`)
      .join("");
    const gaps = (vocational.weaknesses || [])
      .map((s) => `<span class="vocational-chip vocational-chip--gap">${escapeHtml(s)}</span>`)
      .join("");
    const careers = (vocational.recommended_careers || [])
      .map((c) => `<div class="vocational-career"><span>${escapeHtml(c.title)}</span><strong>${c.match_percentage}%</strong></div>`)
      .join("");

    container.innerHTML = `
      <p class="vocational-summary">Arquetipo: <strong>${escapeHtml(vocational.personality || "—")}</strong> · Estilo de aprendizaje: <strong>${escapeHtml(vocational.learning_style || "—")}</strong></p>
      ${strengths ? `<p class="vocational-chips-label">Fortalezas</p><div class="vocational-chips">${strengths}</div>` : ""}
      ${gaps ? `<p class="vocational-chips-label">Áreas de oportunidad</p><div class="vocational-chips">${gaps}</div>` : ""}
      ${careers ? `<p class="vocational-chips-label">Carreras recomendadas</p><div class="vocational-careers">${careers}</div>` : ""}
    `;
  }

  function renderProgress(progress) {
    document.getElementById("statTests").textContent = progress.tests_completed;
    document.getElementById("statRoadmaps").textContent = progress.roadmaps_completed;
    document.getElementById("statUniversities").textContent = progress.universities_explored;
    document.getElementById("statCountries").textContent = progress.countries_explored;
    document.getElementById("statCities").textContent = progress.cities_explored;
    document.getElementById("statConversations").textContent = progress.ai_conversations;
  }

  function renderStamps(stamps) {
    const earnedByKey = new Map(stamps.map((s) => [s.key, s]));
    const grid = document.getElementById("stampsGrid");
    grid.innerHTML = STAMP_CATALOG.map((item) => {
      const earned = earnedByKey.get(item.key);
      const cls = earned ? "passport-stamp passport-stamp--earned" : "passport-stamp";
      const date = earned ? `<span class="passport-stamp__date">${formatDate(earned.earned_at)}</span>` : "";
      return `
        <div class="${cls}">
          <span class="passport-stamp__icon">${item.icon}</span>
          <span class="passport-stamp__label">${escapeHtml(item.label)}</span>
          ${date}
        </div>`;
    }).join("");
  }

  function renderPassport(data) {
    renderCover(data);
    renderProfileView(data.profile);
    renderGoalsView(data.profile.goals || {});
    renderVocational(data.vocational);
    renderProgress(data.progress);
    renderStamps(data.stamps);
  }

  async function loadPassport() {
    const response = await fetch("/api/v1/passport", { headers: authHeaders });
    if (!response.ok) throw new Error("passport fetch failed");
    return response.json();
  }

  // --- Edicion inline (perfil) ---
  function wireEditCard(cardId, viewId, formId) {
    const card = document.getElementById(cardId);
    const view = document.getElementById(viewId);
    const form = document.getElementById(formId);
    const editBtn = card.querySelector("[data-edit]");
    const cancelBtn = form.querySelector("[data-cancel]");

    editBtn.addEventListener("click", () => {
      view.hidden = true;
      form.hidden = false;
    });
    cancelBtn.addEventListener("click", () => {
      form.hidden = true;
      view.hidden = false;
    });

    return { form, view };
  }

  async function init() {
    let data;
    try {
      data = await loadPassport();
    } catch (error) {
      goToLogin();
      return;
    }

    gate.hidden = true;
    shell.hidden = false;
    renderPassport(data);

    const profileEls = wireEditCard("cardProfile", "profileView", "profileForm");
    profileEls.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(profileEls.form);
      const languages = String(formData.get("languages") || "")
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      const response = await fetch("/api/v1/passport/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          country: String(formData.get("country") || "").trim(),
          city: String(formData.get("city") || "").trim(),
          languages,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        renderProfileView(result.profile);
        profileEls.form.hidden = true;
        profileEls.view.hidden = false;
      }
    });

    const goalsEls = wireEditCard("cardGoals", "goalsView", "goalsForm");
    goalsEls.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(goalsEls.form);
      const goals = {
        dream_university: String(formData.get("dream_university") || "").trim(),
        desired_career: String(formData.get("desired_career") || "").trim(),
        target_country: String(formData.get("target_country") || "").trim(),
        languages_to_learn: String(formData.get("languages_to_learn") || "").trim(),
        personal_goals: String(formData.get("personal_goals") || "").trim(),
      };

      const response = await fetch("/api/v1/passport/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ goals }),
      });
      if (response.ok) {
        const result = await response.json();
        renderGoalsView(result.profile.goals || {});
        goalsEls.form.hidden = true;
        goalsEls.view.hidden = false;
      }
    });

    // Foto: se guarda como data URL directamente (sin infraestructura de
    // subida de archivos todavia) - limitado a imagenes razonablemente
    // livianas por el limite del backend (ver photo_data_url en app.py).
    document.getElementById("photoInput").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 200_000) {
        alert("La imagen es muy pesada. Usa una foto más liviana (menos de 200KB).");
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const response = await fetch("/api/v1/passport/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify({ photo_data_url: reader.result }),
        });
        if (response.ok) {
          const result = await response.json();
          renderCover({ ...data, profile: result.profile });
        }
      };
      reader.readAsDataURL(file);
    });
  }

  init();
}

main();
