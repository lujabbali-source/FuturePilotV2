// Los estilos viven en mentor-chat.css: un <style> inyectado desde JS lo
// bloquea la CSP igual que uno escrito en el HTML, y asi ademas los
// empaqueta y minifica Vite.
import "./mentor-chat.css";
import { currentLanguage, onLanguageChange, t } from "./i18next.js";

const tm = (key) => t(key, { ns: "site" });
import { show as showStamps } from "./passport-stamp-toast.js";
(() => {
  const HISTORY_KEY = "futurePilotMentorChatHistory";
  const MAX_STORED_MESSAGES = 40;
  const ANON_ID_KEY = "futurePilotAnonId";

  // Misma clave que futurepilot-connector.js (no siempre esta cargado en
  // esta pagina) - cada navegador anonimo necesita su propio id para que
  // el chat previo al login no comparta memoria con otro visitante.
  function getAnonId() {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  }

  const bubble = document.createElement("button");
  bubble.id = "fpMentorBubble";
  bubble.type = "button";
  bubble.setAttribute("aria-label", tm("mentor.open"));
  bubble.textContent = "✦";

  const panel = document.createElement("div");
  panel.id = "fpMentorPanel";
  panel.innerHTML = `
    <div id="fpMentorHeader">
      <div><strong>AI Mentor</strong><span>${tm("mentor.subtitle")}</span></div>
      <button type="button" id="fpMentorClose" aria-label="${tm("mentor.close")}">×</button>
    </div>
    <div id="fpMentorMessages"></div>
    <form id="fpMentorForm">
      <input type="text" id="fpMentorInput" placeholder="${tm("mentor.placeholder")}" autocomplete="off">
      <button type="submit" id="fpMentorSend">${tm("mentor.send")}</button>
    </form>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  const messagesEl = panel.querySelector("#fpMentorMessages");
  const formEl = panel.querySelector("#fpMentorForm");
  const inputEl = panel.querySelector("#fpMentorInput");
  const sendBtn = panel.querySelector("#fpMentorSend");
  const closeBtn = panel.querySelector("#fpMentorClose");

  function loadHistory() {
    try {
      return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveHistory(messages) {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  }

  let messages = loadHistory();

  function renderMessages() {
    messagesEl.innerHTML = messages
      .map((m) => `<div class="fp-mentor-msg fp-mentor-msg--${m.role}">${escapeHtml(m.text)}</div>`)
      .join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
    }[ch]));
  }

  if (messages.length === 0) {
    messages.push({
      role: "bot",
      text: tm("mentor.hello"),
    });
    saveHistory(messages);
  }
  renderMessages();

  // El historial persiste entre visitas, y con razon: nadie quiere perder la
  // conversacion al recargar. Pero si lo unico que hay es el saludo y el
  // estudiante cambia de idioma, ese saludo se queda dando la bienvenida en el
  // idioma anterior. Solo se reescribe cuando esta solo: una conversacion de
  // verdad no se toca - se respondio en el idioma en que se hablo, y
  // reescribirla seria falsear lo que se dijo.
  onLanguageChange(() => {
    if (messages.length === 1 && messages[0].role === "bot") {
      messages[0].text = tm("mentor.hello");
      saveHistory(messages);
      renderMessages();
    }
  });

  let isOpen = false;
  function togglePanel(open) {
    isOpen = open;
    panel.classList.toggle("is-open", isOpen);
    if (isOpen) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
      inputEl.focus();
    }
  }

  bubble.addEventListener("click", () => togglePanel(!isOpen));
  closeBtn.addEventListener("click", () => togglePanel(false));

  // El mentor es un widget flotante, no una pagina, asi que hasta ahora solo
  // se podia abrir pulsando su burbuja. Cualquier sitio de la aplicacion que
  // quisiera mandar al estudiante a hablar con el acababa enlazando a otra
  // pagina y no pasaba nada - el boton parecia roto.
  //
  // Se abre por delegacion en vez de con un manejador inline: la CSP del
  // sitio declara script-src 'self' y bloquearia un onclick="".
  document.addEventListener("click", (event) => {
    const disparador = event.target.closest('[data-open-mentor], a[href="#mentor"]');
    if (!disparador) return;
    event.preventDefault();
    togglePanel(true);
  });

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;

    messages.push({ role: "user", text });
    renderMessages();
    saveHistory(messages);
    inputEl.value = "";
    inputEl.disabled = true;
    sendBtn.disabled = true;

    const typingEl = document.createElement("div");
    typingEl.className = "fp-mentor-msg fp-mentor-msg--bot fp-mentor-msg--typing";
    typingEl.textContent = "Escribiendo...";
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    const token = localStorage.getItem("futurePilotAuthToken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(`/api/v1/mentor/chat?lang=${currentLanguage()}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: text, anon_id: getAnonId() }),
      });
      const data = await response.json().catch(() => ({}));
      typingEl.remove();

      const reply = response.ok
        ? data.response
        : tm("mentor.error");
      messages.push({ role: "bot", text: reply });
      renderMessages();
      saveHistory(messages);

      if (data.new_stamps?.length) {
        showStamps(data.new_stamps);
      }
    } catch (error) {
      typingEl.remove();
      messages.push({ role: "bot", text: "No pude conectar con el servidor. Verifica tu conexión e intenta de nuevo." });
      renderMessages();
      saveHistory(messages);
    } finally {
      inputEl.disabled = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  });
})();
