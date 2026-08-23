import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCostOfLiving } from "../../services/costService";
import { recordPassportEvent } from "../../services/passportService";
import { getScholarships } from "../../services/scholarshipService";
import { getUniversities } from "../../services/universityService";
import useCity from "../../hooks/useCity";
import { COLOMBIA_REFERENCE, enSalariosMinimos, referenciaCompleta } from "../../database/countries/colombia/referencia";
import "./CityPanel.css";

const sections = [
    { id: "cost", labelKey: "panel.sections.cost", icon: "💰" },
    { id: "universities", labelKey: "panel.sections.universities", icon: "🎓" },
    { id: "scholarships", labelKey: "panel.sections.scholarships", icon: "🏅" },
    { id: "jobs", labelKey: "panel.sections.jobs", icon: "💼" },
    { id: "statistics", labelKey: "panel.sections.statistics", icon: "📊" },
    { id: "breakdown", labelKey: "panel.sections.breakdown", icon: "🧾" },
    { id: "outlook", labelKey: "panel.sections.outlook", icon: "⚖️" },
    { id: "living", labelKey: "panel.sections.living", icon: "🌎" },
];

/** Resuelve un texto que puede venir en los dos idiomas.
 *
 *  Los datos de ciudad salieron de un documento en inglés y se tradujeron; se
 *  guardan como `{ es, en }` en vez de elegir uno, porque el estudiante cambia
 *  de idioma cuando quiere y una ficha congelada en el idioma de importación
 *  se leería así para siempre. Si falta el idioma pedido se usa el otro: medio
 *  dato en el idioma equivocado sigue siendo mejor que "no conectado". */
function enIdioma(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value)
        && ("es" in value || "en" in value)) {
        return value[lang] || value.es || value.en || "";
    }
    return value;
}

function displayValue(value, fallback, lang = "es") {
    const resuelto = enIdioma(value, lang);
    if (resuelto === null || resuelto === undefined || resuelto === "") return fallback;
    if (Array.isArray(resuelto)) {
        const partes = resuelto.map((x) => enIdioma(x, lang)).filter(Boolean);
        return partes.length ? partes.join(", ") : fallback;
    }
    if (typeof resuelto === "object") return fallback;
    return String(resuelto);
}

function money(value, currency, locale, fallback) {
    const formato = new Intl.NumberFormat(locale, {
        style: "currency", currency, maximumFractionDigits: 0,
    });
    if (typeof value === "number") return formato.format(value);

    // Un rango, no un punto. La fuente dice "1.8M – 2.6M COP" y eso es lo que
    // se muestra: quedarse con el punto medio inventaria una precision que el
    // dato no tiene, y alguien va a presupuestar una mudanza con esta cifra.
    if (value && typeof value === "object"
        && typeof value.min === "number" && typeof value.max === "number") {
        // La moneda del propio rango manda sobre la de la ciudad. El documento
        // convirtió a pesos solo las ciudades grandes; las demás vienen en
        // dólares, y pintarlas como pesos multiplicaría la cifra por cuatro
        // mil. Que se lea "USD" es la señal de que no son comparables.
        const suyo = value.currency && value.currency !== currency
            ? new Intl.NumberFormat(locale, {
                style: "currency", currency: value.currency, maximumFractionDigits: 0,
              })
            : formato;
        return value.min === value.max
            ? suyo.format(value.min)
            : `${suyo.format(value.min)} – ${suyo.format(value.max)}`;
    }
    return fallback;
}

function Field({ label, value, formatter }) {
    const { t, i18n } = useTranslation(["cities", "common"]);
    const fallback = t("status.notConnected", { ns: "common" });
    const lang = (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2);
    return (
        <div className="city-field">
            <span>{label}</span>
            <strong>{formatter ? formatter(value) : displayValue(value, fallback, lang)}</strong>
        </div>
    );
}

function EmptyState({ children }) {
    const { t } = useTranslation(["cities", "common"]);
    return <p className="empty-state">{children || t("status.noRecords", { ns: "common" })}</p>;
}

function CostSection({ city }) {
    const { t, i18n } = useTranslation(["cities", "common"]);
    const fallback = t("status.notConnected", { ns: "common" });
    const costs = getCostOfLiving(city);
    const currency = costs.currency || city.statistics?.currency || "COP";
    const locale = i18n.resolvedLanguage === "es" ? "es-ES" : "en-US";
    const formatMoney = (value) => money(value, currency, locale, fallback);

    // Cuánto es eso en salarios mínimos. Para alguien de 17 años en Colombia,
    // "1,2 mínimos" dice más que "1.600.000 COP": es la unidad en la que ya
    // piensa su familia. Solo aparece en ciudades colombianas y solo si la
    // referencia nacional está puesta con su fuente y su año.
    const enMinimos = city.countryId === "colombia" && referenciaCompleta()
        ? enSalariosMinimos(costs.studentBudget)
        : null;

    return (
        <section className="panel-section">
            <h2>💰 {t("panel.sections.cost")}</h2>
            <div className="city-field-grid">
                <Field label={t("panel.fields.monthlyEstimate")} value={costs.monthlyEstimate} formatter={formatMoney} />
                <Field label={t("panel.fields.rent")} value={costs.rent} formatter={formatMoney} />
                <Field label={t("panel.fields.food")} value={costs.food} formatter={formatMoney} />
                <Field label={t("panel.fields.transportation")} value={costs.transportation} formatter={formatMoney} />
                <Field label={t("panel.fields.utilities")} value={costs.utilities} formatter={formatMoney} />
                <Field label={t("panel.fields.studentBudget")} value={costs.studentBudget} formatter={formatMoney} />
            </div>
            {enMinimos !== null && (
                <p className="panel-note">
                    {t("panel.inMinimumWages", { veces: enMinimos.toLocaleString(locale) })}
                    {" "}
                    <span className="panel-note__source">
                        {t("panel.minimumWageSource", {
                            source: COLOMBIA_REFERENCE.minimumWage.source,
                            year: COLOMBIA_REFERENCE.minimumWage.year,
                        })}
                    </span>
                </p>
            )}
        </section>
    );
}

function UniversitiesSection({ city }) {
    const { t } = useTranslation(["cities", "common"]);
    const [result, setResult] = useState({ cityId: null, universities: null, error: null });
    const fallback = t("status.notConnected", { ns: "common" });

    useEffect(() => {
        let isCurrent = true;
        getUniversities(city)
            .then((items) => {
                if (!isCurrent) return;
                setResult({ cityId: city.id, universities: items, error: null });
                if (items.length > 0) {
                    recordPassportEvent("university_viewed", items[0].id || city.id, items[0].name);
                }
            })
            .catch((requestError) => { if (isCurrent) setResult({ cityId: city.id, universities: [], error: requestError }); });
        return () => { isCurrent = false; };
    }, [city]);

    const isCurrentCity = result.cityId === city.id;
    const universities = isCurrentCity ? result.universities : null;
    const error = isCurrentCity ? result.error : null;

    if (!universities) {
        return <section className="panel-section"><h2>🎓 {t("panel.sections.universities")}</h2><EmptyState>{error ? t("panel.records.catalogUnavailable") : t("panel.records.loadingUniversities")}</EmptyState></section>;
    }

    return (
        <section className="panel-section">
            <h2>🎓 {t("panel.sections.universities")}</h2>
            {universities.length === 0 ? <EmptyState>{error ? t("panel.records.catalogUnavailable") : t("panel.records.noInstitutions")}</EmptyState> : universities.map((university) => (
                <article className="record-card" key={university.id || university.name}>
                    <div className="record-heading">
                        {university.logo ? <img className="university-logo" src={university.logo} alt="" /> : <div className="logo-placeholder">{university.name.slice(0, 1)}</div>}
                        <div>
                            <h3>{university.name}</h3>
                            <p>{displayValue(university.type, fallback)} · {t("panel.records.nationalRanking")} {displayValue(university.rankings?.national, fallback)}</p>
                        </div>
                    </div>
                    <div className="city-field-grid compact">
                        <Field label={t("panel.fields.officialWebsite")} value={university.website} />
                        <Field label={t("panel.fields.city")} value={university.city} />
                        <Field label={t("panel.fields.country")} value={university.country} />
                        <Field label={t("panel.fields.source")} value={university.source} />
                    </div>
                    {university.website ? <a className="record-link" href={university.website} target="_blank" rel="noreferrer">{t("panel.records.officialWebsiteLink")}</a> : <span className="record-link disabled">{t("panel.fields.officialWebsite")} · {fallback}</span>}
                </article>
            ))}
        </section>
    );
}

function ScholarshipsSection({ city }) {
    const { t } = useTranslation(["cities", "common"]);
    const fallback = t("status.notConnected", { ns: "common" });
    const scholarships = getScholarships(city);
    return (
        <section className="panel-section">
            <h2>🏅 {t("panel.sections.scholarships")}</h2>
            {scholarships.length === 0 ? <EmptyState /> : scholarships.map((scholarship) => (
                <article className="record-card" key={scholarship.id || scholarship.name}>
                    <div className="record-heading simple"><div><h3>{scholarship.name}</h3><p>{displayValue(scholarship.type, fallback)}</p></div></div>
                    <div className="city-field-grid compact">
                        <Field label={t("panel.fields.requirements")} value={scholarship.requirements} />
                        <Field label={t("panel.fields.coverage")} value={scholarship.coverage} />
                        <Field label={t("panel.fields.deadline")} value={scholarship.deadline} />
                    </div>
                    {scholarship.website ? <a className="record-link" href={scholarship.website} target="_blank" rel="noreferrer">{t("panel.records.officialWebsiteLink")}</a> : <span className="record-link disabled">{t("panel.fields.officialWebsite")} · {fallback}</span>}
                </article>
            ))}
        </section>
    );
}

function JobsSection({ city }) {
    const { t, i18n } = useTranslation(["cities", "common"]);
    const jobs = city.jobs || {};
    const fallback = t("status.notConnected", { ns: "common" });
    const locale = i18n.resolvedLanguage === "es" ? "es-ES" : "en-US";
    // El salario puede venir como numero suelto (lo que ya habia) o como
    // `{ amount, currency, source, asOf }`. La segunda forma existe porque una
    // cifra de salario sin fuente ni fecha no se puede comprobar ni actualizar,
    // y es justo la que un estudiante usa para decidir si le alcanza.
    const salario = jobs.averageSalary;
    const monto = salario && typeof salario === "object" ? salario.amount : salario;
    const moneda = (salario && typeof salario === "object" && salario.currency)
        || city.costOfLiving?.currency || "COP";

    const fields = [["averageSalary", monto], ["mainIndustries", jobs.mainIndustries], ["studentJobs", jobs.studentJobs], ["remoteOpportunities", jobs.remoteOpportunities], ["internships", jobs.internships], ["employmentRate", jobs.employmentRate]];
    return (
        <section className="panel-section">
            <h2>💼 {t("panel.sections.jobs")}</h2>
            <div className="city-field-grid">
                {fields.map(([key, value]) => (
                    <Field
                        key={key}
                        label={t(`panel.fields.${key}`)}
                        value={value}
                        formatter={key === "averageSalary"
                            ? (v) => money(v, moneda, locale, fallback)
                            : undefined}
                    />
                ))}
            </div>
            {salario?.source && (
                <p className="panel-note">
                    {t("panel.salarySource", {
                        source: salario.source,
                        date: salario.asOf || t("panel.undated"),
                    })}
                </p>
            )}
        </section>
    );
}

function StatisticsSection({ city }) {
    const { t } = useTranslation("cities");
    const statistics = city.statistics || {};
    const fields = [["population", statistics.population], ["safety", statistics.safety], ["weather", statistics.weather], ["language", statistics.language], ["currency", statistics.currency], ["internetSpeed", statistics.internetSpeed], ["qualityOfLife", statistics.qualityOfLife], ["studentSatisfaction", statistics.studentSatisfaction]];
    return (
        <section className="panel-section">
            <h2>📊 {t("panel.sections.statistics")}</h2>
            {city.region && <p className="statistics-region-note">{t("panel.regionalNote", { region: city.region })}</p>}
            <div className="city-field-grid">{fields.map(([key, value]) => <Field key={key} label={t(`panel.fields.${key}`)} value={value} />)}</div>
        </section>
    );
}

/** Lo bueno y lo difícil de la ciudad.
 *
 *  Va en su propia sección y no dentro de las estadísticas porque es de otra
 *  naturaleza: una población es un dato, "conviene precaución en El Centro de
 *  noche" es un juicio sobre un barrio donde vive gente. Mezclarlos haría que
 *  el juicio se leyera con la autoridad del dato.
 */
/** La letra chica de cada cifra.
 *
 *  El panel de costos da un rango por concepto. Detrás de "arriendo
 *  680.000 – 1.100.000 COP" está la diferencia entre una habitación
 *  compartida y un apartaestudio en El Poblado, y es justo esa diferencia la
 *  que decide si a alguien le alcanza. Aquí se ve desglosado.
 */
function BreakdownSection({ city }) {
    const { t, i18n } = useTranslation(["cities", "common"]);
    const desglose = city.breakdown || {};
    const lang = (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2);
    const locale = lang === "es" ? "es-ES" : "en-US";
    const fallback = t("status.notConnected", { ns: "common" });
    const grupos = ["household", "housing", "food", "utilities", "transport", "student"];
    const conDatos = grupos.filter((g) => desglose[g]?.length);

    if (!conDatos.length) {
        return (
            <section className="panel-section">
                <h2>🧾 {t("panel.sections.breakdown")}</h2>
                <EmptyState />
            </section>
        );
    }

    return (
        <section className="panel-section">
            <h2>🧾 {t("panel.sections.breakdown")}</h2>
            {conDatos.map((grupo) => (
                <div className="breakdown-group" key={grupo}>
                    <h3>{t(`panel.breakdown.${grupo}`)}</h3>
                    <div className="city-field-grid">
                        {desglose[grupo].map((linea, i) => (
                            <Field
                                key={`${grupo}-${i}`}
                                label={enIdioma(linea.label, lang)}
                                value={linea.amount ?? linea.note}
                                formatter={linea.amount
                                    ? (v) => money(v, v?.currency || "COP", locale, fallback)
                                    : undefined}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

function OutlookSection({ city }) {
    const { t } = useTranslation("cities");
    const outlook = city.outlook || {};
    const fields = [
        ["strengths", outlook.strengths],
        ["challenges", outlook.challenges],
        ["safetyStrategy", outlook.safetyStrategy],
        ["englishProficiency", outlook.englishProficiency],
    ];
    return (
        <section className="panel-section">
            <h2>⚖️ {t("panel.sections.outlook")}</h2>
            <div className="city-field-grid">
                {fields.map(([key, value]) => (
                    <Field key={key} label={t(`panel.fields.${key}`)} value={value} />
                ))}
            </div>
            {/* Quién lo dice. Sin esto, un juicio sobre un barrio se lee como
                un hecho medido, y no lo es. */}
            <p className="panel-note">{t("panel.outlookNote")}</p>
        </section>
    );
}

function LivingSection({ city }) {
    const { t } = useTranslation("cities");
    const living = city.living || {};
    const fields = [["bestNeighborhoods", living.bestNeighborhoods], ["transportation", living.transportation], ["healthcare", living.healthcare], ["nightlife", living.nightlife], ["culture", living.culture], ["food", living.food], ["tourism", living.tourism]];
    return <section className="panel-section"><h2>🌎 {t("panel.sections.living")}</h2><div className="city-field-grid">{fields.map(([key, value]) => <Field key={key} label={t(`panel.fields.${key}`)} value={value} />)}</div></section>;
}

export default function CityPanel({ selectedCity, onClose }) {
    const { t } = useTranslation(["cities", "common"]);
    const { city, isLoading, error } = useCity(selectedCity);
    const [activeSection, setActiveSection] = useState("cost");
    if (!selectedCity) return null;

    const displayCity = city || { name: t("panel.unknownCity"), country: t("panel.countryFallback"), image: null };
    return (
        <aside className="city-panel" aria-label={t("panel.ariaLabel")}>
            <button className="close-button" onClick={onClose} aria-label={t("panel.close")}>×</button>
            <div className="city-image">{displayCity.image ? <img src={displayCity.image} alt={displayCity.name} /> : <div className="image-placeholder"><span>{t("brand.name", { ns: "common" })}</span><strong>{displayCity.name}</strong></div>}</div>
            <div className="city-content">
                <p className="eyebrow">{isLoading ? t("panel.loadingProfile") : t("panel.profile")}</p>
                <h1>{displayCity.name}</h1><h3>{displayCity.country}</h3>
                {error && <p className="error-state">{t("panel.detailsError")}</p>}
                <div className="section-tabs" role="tablist" aria-label={t("panel.ariaLabel")}>
                    {sections.map((section) => <button key={section.id} className={activeSection === section.id ? "active" : ""} onClick={() => setActiveSection(section.id)} role="tab" aria-selected={activeSection === section.id}><span>{section.icon}</span>{t(section.labelKey)}</button>)}
                </div>
                {city && activeSection === "cost" && <CostSection city={city} />}
                {city && activeSection === "universities" && <UniversitiesSection city={city} />}
                {city && activeSection === "scholarships" && <ScholarshipsSection city={city} />}
                {city && activeSection === "jobs" && <JobsSection city={city} />}
                {city && activeSection === "statistics" && <StatisticsSection city={city} />}
                {city && activeSection === "breakdown" && <BreakdownSection city={city} />}
                {city && activeSection === "outlook" && <OutlookSection city={city} />}
                {city && activeSection === "living" && <LivingSection city={city} />}
                {!city && <p className="loading-state">{t("status.loadingCity", { ns: "common" })}</p>}
            </div>
        </aside>
    );
}
