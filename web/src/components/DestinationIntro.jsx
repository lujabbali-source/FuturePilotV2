import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Lo primero que ve alguien que acaba de entrar al globo.
 *
 * Dos pasos, en este orden y en la MISMA ventana:
 *
 *   1. Que es esto y que se hace aqui.
 *   2. Una sola pregunta: que tan dispuesto estas a estudiar fuera.
 *
 * El paso 1 se añadio despues, probando con una cuenta nueva: entrabas, veias
 * un planeta girando, y no habia nada que dijera que los paises se tocan. La
 * pantalla mas bonita del producto era la mas muda. La pista de "empieza por
 * un pais" existia, pero aparece en una esquina y detras de este mismo modal,
 * asi que la primera vez no la ve nadie.
 *
 * Van juntos y no en dos ventanas seguidas porque encadenar dos modales a
 * quien acaba de registrarse es peor que no explicar nada.
 *
 * Por que la pregunta es una y no cinco. La propuesta original traia cinco
 * (idiomas, presupuesto, tipo de institucion, region y disposicion). Tres
 * sobran: el pasaporte ya guarda los idiomas que hablas y el pais al que
 * querrias ir, y volver a pedirlos es hacerte repetir lo que ya escribiste.
 * Las otras dos no se pueden usar todavia — hay costo de vida en 1 de 223
 * ciudades y tipo de universidad en el 7% — y preguntar algo que luego no se
 * usa es una promesa que no se cumple.
 *
 * No es una puerta. Se puede cerrar, y el globo sigue funcionando: un muro
 * entre el estudiante y lo que vino a ver es una razon para irse.
 */
export default function DestinationIntro() {
  const { t } = useTranslation("globe");
  const token = localStorage.getItem("futurePilotAuthToken");
  // Sin sesión no hay dónde guardar la respuesta, así que ni se pregunta: se
  // arranca ya en "oculto" en vez de entrar y salir de "cargando" con un
  // setState dentro del efecto.
  const [estado, setEstado] = useState(() => (token ? "cargando" : "oculto"));
  const [guardando, setGuardando] = useState(false);

  // Si al usuario le falta responder la pregunta de movilidad. Decide a donde
  // lleva el boton de la guia: al paso 2 si es su primera vez, o a cerrar si
  // abrio la guia a mano desde la barra. Es estado y no un ref porque cambia
  // el texto del boton, y un ref no vuelve a pintar al cambiar.
  const [faltaPreguntar, setFaltaPreguntar] = useState(false);

  useEffect(() => {
    if (!token) return;
    let vivo = true;
    (async () => {
      try {
        const r = await fetch("/api/v1/me/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) throw new Error("sin preferencias");
        const { preferences } = await r.json();
        if (!vivo) return;
        // Ya respondió, o ya dijo "ahora no": no se vuelve a preguntar, y
        // tampoco se le explica otra vez algo que ya sabe. La guía le queda
        // disponible en el botón "?" de la barra.
        const yaOpinó = preferences?.mobility || preferences?.mobility_dismissed_at;
        setFaltaPreguntar(!yaOpinó);
        setEstado(yaOpinó ? "oculto" : "guia");
      } catch {
        // Si falla la consulta se calla: preguntar dos veces molesta más que
        // no preguntar.
        if (vivo) setEstado("oculto");
      }
    })();
    return () => { vivo = false; };
  }, [token]);

  // Reabrir la guía desde el botón "?" de TopNav. Se comunica por evento y no
  // por estado compartido porque la barra y este modal no tienen ningún padre
  // en común al que subir el estado: cuelgan los dos de App.
  useEffect(() => {
    const abrir = () => setEstado("guia");
    document.addEventListener("futurepilot:globe-guide", abrir);
    return () => document.removeEventListener("futurepilot:globe-guide", abrir);
  }, []);

  const cerrarGuia = useCallback(() => {
    setEstado(faltaPreguntar ? "pregunta" : "oculto");
  }, [faltaPreguntar]);

  async function guardar(cuerpo) {
    setGuardando(true);
    try {
      await fetch("/api/v1/me/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(cuerpo),
      });
    } catch {
      // Se cierra igual. Perder la respuesta es mejor que dejarlo atrapado.
    }
    setFaltaPreguntar(false);
    setEstado("oculto");
  }

  if (estado === "cargando" || estado === "oculto") return null;

  const opciones = ["yes_definitely", "yes_if_viable", "maybe", "prefer_home"];
  const pasos = ["rotate", "city", "save"];

  return (
    <div className="dest-intro" role="dialog" aria-modal="true"
         aria-labelledby="dest-intro-title">
      <div className="dest-intro__card">
        {estado === "guia" ? (
          <>
            <p className="dest-intro__eyebrow">{t("guide.eyebrow")}</p>
            <h2 className="dest-intro__title" id="dest-intro-title">{t("guide.title")}</h2>
            <p className="dest-intro__lead">{t("guide.lead")}</p>

            <ol className="dest-intro__steps">
              {pasos.map((clave, i) => (
                <li key={clave} className="dest-intro__step">
                  <span className="dest-intro__step-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <strong>{t(`guide.steps.${clave}.title`)}</strong>
                    <p>{t(`guide.steps.${clave}.body`)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="dest-intro__note">{t("guide.note")}</p>

            <button type="button" className="dest-intro__go" onClick={cerrarGuia}>
              {t(faltaPreguntar ? "guide.next" : "guide.close")}
            </button>
          </>
        ) : (
          <>
            <p className="dest-intro__eyebrow">{t("intro.eyebrow")}</p>
            <h2 className="dest-intro__title" id="dest-intro-title">{t("intro.title")}</h2>
            <p className="dest-intro__lead">{t("intro.lead")}</p>

            <p className="dest-intro__question">{t("intro.question")}</p>
            <div className="dest-intro__options">
              {opciones.map((clave) => (
                <button key={clave} type="button" className="dest-intro__option"
                        disabled={guardando}
                        onClick={() => guardar({ mobility: clave })}>
                  {t(`intro.options.${clave}`)}
                </button>
              ))}
            </div>

            <button type="button" className="dest-intro__skip" disabled={guardando}
                    onClick={() => guardar({ dismissed: true })}>
              {t("intro.skip")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
