import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCostOfLiving } from "../../services/costService";
import { recordPassportEvent } from "../../services/passportService";
import { getScholarships } from "../../services/scholarshipService";
import { getUniversities } from "../../services/universityService";
import useCity from "../../hooks/useCity";
import "./CityPanel.css";

const sections = [
    { id: "cost", labelKey: "panel.sections.cost", icon: "💰" },
    { id: "universities", labelKey: "panel.sections.universities", icon: "🎓" },
    { id: "scholarships", labelKey: "panel.sections.scholarships", icon: "🏅" },
    { id: "jobs", labelKey: "panel.sections.jobs", icon: "💼" },
    { id: "statistics", labelKey: "panel.sections.statistics", icon: "📊" },
    { id: "living", labelKey: "panel.sections.living", icon: "🌎" },
];

function displayValue(value, fallback) {
    if (value === null || value === undefined || value === "") return fallback;
    if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
    if (typeof value === "object") return fallback;
    return String(value);
}

function money(value, currency, locale, fallback) {
    if (typeof value !== "number") return fallback;
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function Field({ label, value, formatter }) {
    const { t } = useTranslation(["cities", "common"]);
    const fallback = t("status.notConnected", { ns: "common" });
    return (
        <div className="city-field">
            <span>{label}</span>
            <strong>{formatter ? formatter(value) : displayValue(value, fallback)}</strong>
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
    const { t } = useTranslation("cities");
    const jobs = city.jobs || {};
    const fields = [["averageSalary", jobs.averageSalary], ["mainIndustries", jobs.mainIndustries], ["studentJobs", jobs.studentJobs], ["remoteOpportunities", jobs.remoteOpportunities], ["internships", jobs.internships], ["employmentRate", jobs.employmentRate]];
    return <section className="panel-section"><h2>💼 {t("panel.sections.jobs")}</h2><div className="city-field-grid">{fields.map(([key, value]) => <Field key={key} label={t(`panel.fields.${key}`)} value={value} />)}</div></section>;
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
                {city && activeSection === "living" && <LivingSection city={city} />}
                {!city && <p className="loading-state">{t("status.loadingCity", { ns: "common" })}</p>}
            </div>
        </aside>
    );
}
