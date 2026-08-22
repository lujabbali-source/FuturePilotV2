import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadDestinationInputs, rankDestinations, TIERS } from "../services/destinationService";

/**
 * Los destinos que encajan con este estudiante, con el motivo a la vista.
 *
 * Dos niveles y ningún porcentaje. "Madrid 94%" suena a que alguien lo midió;
 * nadie lo midió. Lo que sí se puede decir es por qué aparece cada ciudad, y
 * eso va escrito debajo de cada una.
 *
 * El panel se calla si no hay nada que personalizar: sin sesión, sin idiomas
 * declarados y sin país objetivo, todas las ciudades caerían en el mismo
 * montón y una lista sin criterio disfrazada de recomendación es peor que
 * ninguna.
 */
export default function DestinationPanel({ onSelectCity }) {
  const { t } = useTranslation("globe");
  const [entrada, setEntrada] = useState(null);
  const [abierto, setAbierto] = useState(true);

  useEffect(() => {
    let vivo = true;
    loadDestinationInputs().then((d) => { if (vivo) setEntrada(d); });
    return () => { vivo = false; };
  }, []);

  const destinos = useMemo(
    () => (entrada ? rankDestinations(entrada) : []),
    [entrada],
  );

  // ¿Hay algo en lo que apoyarse? Si no, no se finge una recomendación.
  const haySeñal = Boolean(
    entrada && (
      entrada.known?.languages?.length
      || entrada.known?.target_country
      || entrada.preferences?.mobility
    ),
  );
  if (!haySeñal || !destinos.length) return null;

  const fuertes = destinos.filter((d) => d.tier === TIERS.STRONG);
  const explorar = destinos.filter((d) => d.tier === TIERS.EXPLORE);

  const grupo = (titulo, ayuda, lista) => lista.length > 0 && (
    <div className="dest-panel__group">
      <p className="dest-panel__groupTitle">{titulo}</p>
      <p className="dest-panel__groupHelp">{ayuda}</p>
      <ul className="dest-panel__list">
        {lista.slice(0, 6).map((d) => (
          <li key={d.cityId}>
            <button type="button" className="dest-panel__city"
                    onClick={() => onSelectCity?.(d)}>
              <span className="dest-panel__cityName">{d.city.name}</span>
              <span className="dest-panel__cityCountry">{d.country.name}</span>
              <span className="dest-panel__why">
                {d.reasons.map((r) => t(`destinations.reasons.${r.key}`, r.params)).join(" · ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside className={`dest-panel ${abierto ? "" : "dest-panel--closed"}`}>
      <button type="button" className="dest-panel__toggle"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}>
        {t("destinations.title")}
        <span aria-hidden="true">{abierto ? "−" : "+"}</span>
      </button>

      {abierto && (
        <div className="dest-panel__body">
          {grupo(t("destinations.strong"), t("destinations.strongHelp"), fuertes)}
          {grupo(t("destinations.explore"), t("destinations.exploreHelp"), explorar)}
          {/* Lo que esta pantalla NO es. Va al pie y no en letra pequeña:
              un estudiante no debe salir de aquí creyendo que le prometimos
              una admisión. */}
          <p className="dest-panel__caveat">{t("destinations.caveat")}</p>
        </div>
      )}
    </aside>
  );
}
