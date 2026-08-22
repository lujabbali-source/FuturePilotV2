import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Una sola pregunta antes de explorar: qué tan dispuesto estás a estudiar fuera.
 *
 * Por qué una y no cinco. La propuesta original traía cinco preguntas
 * (idiomas, presupuesto, tipo de institución, región y disposición). Tres
 * sobran: el pasaporte ya guarda los idiomas que hablas y el país al que
 * querrías ir, y volver a pedirlos es hacerte repetir lo que ya escribiste.
 * Las otras dos no se pueden usar todavía — hay costo de vida en 1 de 223
 * ciudades y tipo de universidad en el 7% — y preguntar algo que luego no se
 * usa es una promesa que no se cumple.
 *
 * Queda esta, que es la única que no se deduce de nada y además cambia todo:
 * a quien no quiere salir del país, llenarle el globo de destinos extranjeros
 * es ruido.
 *
 * No es una puerta. Se puede cerrar, y el globo sigue funcionando: un muro
 * entre el estudiante y lo que vino a ver es una razón para irse.
 */
export default function DestinationIntro() {
  const { t } = useTranslation("globe");
  const [estado, setEstado] = useState("cargando"); // cargando | abierto | oculto
  const [guardando, setGuardando] = useState(false);

  const token = localStorage.getItem("futurePilotAuthToken");

  useEffect(() => {
    // Sin sesión no hay dónde guardar la respuesta, así que no se pregunta.
    if (!token) {
      setEstado("oculto");
      return;
    }
    let vivo = true;
    (async () => {
      try {
        const r = await fetch("/api/v1/me/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) throw new Error("sin preferencias");
        const { preferences } = await r.json();
        if (!vivo) return;
        // Ya respondió, o ya dijo "ahora no": no se vuelve a preguntar.
        const yaOpinó = preferences?.mobility || preferences?.mobility_dismissed_at;
        setEstado(yaOpinó ? "oculto" : "abierto");
      } catch {
        // Si falla la consulta se calla: preguntar dos veces molesta más que
        // no preguntar.
        if (vivo) setEstado("oculto");
      }
    })();
    return () => { vivo = false; };
  }, [token]);

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
    setEstado("oculto");
  }

  if (estado !== "abierto") return null;

  const opciones = ["yes_definitely", "yes_if_viable", "maybe", "prefer_home"];

  return (
    <div className="dest-intro" role="dialog" aria-modal="true"
         aria-labelledby="dest-intro-title">
      <div className="dest-intro__card">
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
      </div>
    </div>
  );
}
