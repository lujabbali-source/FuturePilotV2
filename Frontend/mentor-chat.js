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

  const style = document.createElement("style");
  style.textContent = `
    #fpMentorBubble {
      position: fixed;
      bottom: 18px;
      right: 18px;
      z-index: 9997;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1px solid rgba(0,255,179,.4);
      background: linear-gradient(135deg, #00ffb3, #00d4ff);
      color: #04150f;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0,0,0,.4), 0 0 24px rgba(0,255,179,.3);
      animation: fp-mentor-pulse 3s ease-in-out infinite;
    }
    #fpMentorBubble:hover { transform: scale(1.06); }
    @keyframes fp-mentor-pulse {
      0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,.4), 0 0 24px rgba(0,255,179,.3); }
      50% { box-shadow: 0 10px 30px rgba(0,0,0,.4), 0 0 34px rgba(0,255,179,.5); }
    }
    #fpMentorPanel {
      position: fixed;
      bottom: 86px;
      right: 18px;
      z-index: 9997;
      width: min(360px, calc(100vw - 36px));
      height: min(500px, calc(100vh - 120px));
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      border: 1px solid rgba(0,255,179,.22);
      background: linear-gradient(165deg, rgba(10,26,21,.92), rgba(4,10,8,.96));
      backdrop-filter: blur(20px) saturate(140%);
      box-shadow: 0 30px 70px rgba(0,0,0,.55), 0 0 40px rgba(0,255,179,.08);
      overflow: hidden;
      opacity: 0;
      transform: translateY(14px) scale(.97);
      pointer-events: none;
      transition: opacity .22s ease, transform .22s ease;
      font-family: 'Manrope', Arial, sans-serif;
    }
    #fpMentorPanel.is-open { opacity: 1; transform: none; pointer-events: auto; }
    #fpMentorHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    #fpMentorHeader strong { color: #f5fbff; font-size: .92rem; }
    #fpMentorHeader span { display: block; color: #9fb3ac; font-size: .68rem; margin-top: 2px; }
    #fpMentorClose {
      border: 0;
      background: transparent;
      color: #9fb3ac;
      font-size: 1.1rem;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
    }
    #fpMentorClose:hover { color: #f5fbff; }
    #fpMentorMessages {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fp-mentor-msg {
      max-width: 82%;
      padding: 9px 13px;
      border-radius: 14px;
      font-size: .84rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    .fp-mentor-msg--user {
      align-self: flex-end;
      background: linear-gradient(110deg, rgba(0,255,179,.9), rgba(0,212,255,.9));
      color: #04150f;
      font-weight: 600;
      border-bottom-right-radius: 4px;
    }
    .fp-mentor-msg--bot {
      align-self: flex-start;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(0,212,255,.18);
      color: #f5fbff;
      border-bottom-left-radius: 4px;
    }
    .fp-mentor-msg--typing { color: #9fb3ac; font-style: italic; }
    #fpMentorForm {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,.08);
    }
    #fpMentorInput {
      flex: 1;
      padding: 10px 13px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.03);
      color: #f5fbff;
      font: inherit;
      font-size: .84rem;
    }
    #fpMentorInput:focus { outline: none; border-color: rgba(0,255,179,.5); }
    #fpMentorSend {
      border: 0;
      border-radius: 10px;
      padding: 0 16px;
      background: linear-gradient(110deg, #00ffb3, #00d4ff);
      color: #04150f;
      font-weight: 800;
      font-size: .84rem;
    }
    #fpMentorSend:disabled { opacity: .5; }
  `;
  document.head.appendChild(style);

  const bubble = document.createElement("button");
  bubble.id = "fpMentorBubble";
  bubble.type = "button";
  bubble.setAttribute("aria-label", "Abrir chat con el AI Mentor");
  bubble.textContent = "✦";

  const panel = document.createElement("div");
  panel.id = "fpMentorPanel";
  panel.innerHTML = `
    <div id="fpMentorHeader">
      <div><strong>AI Mentor</strong><span>Tu guía vocacional en FuturePilot</span></div>
      <button type="button" id="fpMentorClose" aria-label="Cerrar chat">×</button>
    </div>
    <div id="fpMentorMessages"></div>
    <form id="fpMentorForm">
      <input type="text" id="fpMentorInput" placeholder="Escribe tu pregunta..." autocomplete="off">
      <button type="submit" id="fpMentorSend">Enviar</button>
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
      text: "¡Hola! Soy tu AI Mentor. Puedo ayudarte con tu roadmap, tu carrera recomendada, universidades o tus habilidades — o si necesitas ánimo. ¿En qué te ayudo?",
    });
    saveHistory(messages);
  }
  renderMessages();

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
      const response = await fetch("/api/v1/mentor/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ message: text, anon_id: getAnonId() }),
      });
      const data = await response.json().catch(() => ({}));
      typingEl.remove();

      const reply = response.ok
        ? data.response
        : "No pude procesar tu mensaje. Intenta de nuevo en un momento.";
      messages.push({ role: "bot", text: reply });
      renderMessages();
      saveHistory(messages);

      if (data.new_stamps?.length && window.FuturePilotStampToast) {
        window.FuturePilotStampToast.show(data.new_stamps);
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
