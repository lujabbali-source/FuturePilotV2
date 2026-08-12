(() => {
  // Aplica el tema guardado desde el Theme Lab (panel admin), si existe.
  // GET /api/theme es publico a proposito: el override debe verse igual
  // para cualquier visitante, no solo para el admin que lo guardo. Sin
  // tema guardado (colors={}), esto no toca nada y style.css sigue
  // mandando con sus valores por defecto.
  if (location.protocol === "file:") return;

  // login.css y passport.css usan un esquema de variables mas viejo
  // (--fp-black/--fp-green/--fp-cyan/--fp-white/--fp-muted) en vez del
  // que introdujo el Theme Lab (--fp-bg/--fp-primary/--fp-secondary/...).
  // Sin este mapeo, un tema guardado solo se veia en la landing page. El
  // panel admin (admin-dashboard.css, etc.) queda deliberadamente fuera:
  // no debe cambiar de color solo porque se edito el tema del sitio de
  // estudiantes.
  const LEGACY_ALIASES = {
    bg: "black",
    primary: "green",
    secondary: "cyan",
    text: "white",
    "text-muted": "muted",
  };

  fetch("/api/theme", { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : { colors: {} }))
    .then((data) => {
      const colors = data.colors || {};
      const keys = Object.keys(colors);
      if (keys.length === 0) return;

      // Las variables se fijan con setProperty, no inyectando un <style>.
      // Un <style> creado desde JS lo bloquea la CSP igual que uno escrito
      // en el HTML; setProperty es CSSOM y no. El efecto es el mismo:
      // sobreescribir las custom properties de :root.
      const root = document.documentElement;
      keys.forEach((key) => {
        root.style.setProperty(`--fp-${key}`, colors[key]);
        const legacyName = LEGACY_ALIASES[key];
        if (legacyName) root.style.setProperty(`--fp-${legacyName}`, colors[key]);
      });
    })
    .catch(() => {
      // Sin tema guardado o sin conexion: se queda con los valores por
      // defecto de style.css, que es un resultado perfectamente valido.
    });
})();
