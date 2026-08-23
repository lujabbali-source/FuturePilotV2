// Los estilos viven en passport-stamp-toast.css: un <style> inyectado desde JS lo
// bloquea la CSP igual que uno escrito en el HTML, y asi ademas los
// empaqueta y minifica Vite.
import "./passport-stamp-toast.css";
// Animacion del "sello estampandose". Era un global de window mientras
// lo compartian paginas compiladas y sin compilar; ahora se importa.
// Animacion reutilizable del "sello estampandose" (< 1s, con un sonido muy
// sutil) que pide el Pasaporte FuturePilot. Cualquier pagina puede
// llamarla cuando una respuesta del backend trae new_stamps no vacio (ver
// /api/v1/passport/events, /api/v1/me/claim-result, /api/v1/mentor/chat).
const StampToast = (() => {
  let styleInjected = false;

  function injectStyle() {
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
        // Sin este desplazamiento, dos sellos que coinciden en pantalla
        // (el siguiente entra a los 900ms, el anterior no se quita hasta
        // los 1400ms) caen exactamente en el mismo sitio y se pisan.
        toast.style.top = `${24 + index * 76}px`;
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

export const { show } = StampToast;
export default StampToast;
