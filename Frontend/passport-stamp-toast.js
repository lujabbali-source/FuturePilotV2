// Animacion reutilizable del "sello estampandose" (< 1s, con un sonido muy
// sutil) que pide el Pasaporte FuturePilot. Cualquier pagina puede
// llamarla cuando una respuesta del backend trae new_stamps no vacio (ver
// /api/v1/passport/events, /api/v1/me/claim-result, /api/v1/mentor/chat).
window.FuturePilotStampToast = (() => {
  let styleInjected = false;

  function injectStyle() {
    if (styleInjected) return;
    styleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      #fpStampToastLayer {
        position: fixed;
        inset: 0;
        z-index: 100000;
        pointer-events: none;
      }
      .fp-stamp-toast {
        position: absolute;
        top: 24px;
        right: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        border-radius: 14px;
        background: rgba(4, 10, 8, .92);
        border: 1px solid rgba(0,255,179,.4);
        box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 30px rgba(0,255,179,.25);
        backdrop-filter: blur(10px);
        transform: scale(.6) rotate(-8deg);
        opacity: 0;
        animation: fp-stamp-in .55s cubic-bezier(.17,.89,.32,1.28) forwards, fp-stamp-out .4s ease .95s forwards;
      }
      .fp-stamp-toast__icon {
        font-size: 1.8rem;
        filter: drop-shadow(0 0 10px rgba(0,255,179,.6));
      }
      .fp-stamp-toast__text { display: flex; flex-direction: column; gap: 2px; }
      .fp-stamp-toast__eyebrow {
        font: 700 .62rem/1 'DM Mono', monospace;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #00d4ff;
      }
      .fp-stamp-toast__label {
        font: 700 .88rem/1.2 'Manrope', Arial, sans-serif;
        color: #f5fbff;
      }
      @keyframes fp-stamp-in {
        0% { transform: scale(.5) rotate(-14deg); opacity: 0; }
        60% { transform: scale(1.08) rotate(3deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes fp-stamp-out {
        to { transform: scale(.94) translateY(-6px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .fp-stamp-toast { animation: none; opacity: 1; transform: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function playStampSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(180, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);
      oscillator.onended = () => ctx.close();
    } catch (error) {
      // Sin Web Audio (o bloqueado hasta la primera interaccion del
      // usuario) - la animacion visual sigue funcionando igual.
    }
  }

  function show(stamps) {
    if (!stamps || stamps.length === 0) return;
    injectStyle();

    let layer = document.getElementById("fpStampToastLayer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "fpStampToastLayer";
      document.body.appendChild(layer);
    }

    stamps.forEach((stamp, index) => {
      setTimeout(() => {
        const toast = document.createElement("div");
        toast.className = "fp-stamp-toast";
        const [icon, ...rest] = stamp.label.split(" ");
        toast.innerHTML = `
          <span class="fp-stamp-toast__icon">${icon}</span>
          <span class="fp-stamp-toast__text">
            <span class="fp-stamp-toast__eyebrow">Nuevo sello</span>
            <span class="fp-stamp-toast__label">${rest.join(" ")}</span>
          </span>
        `;
        layer.appendChild(toast);
        playStampSound();
        setTimeout(() => toast.remove(), 1400);
      }, index * 900);
    });
  }

  return { show };
})();
