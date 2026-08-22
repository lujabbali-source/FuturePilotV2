import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Atmosphere from "./components/Atmosphere";
import CityMarkers from "./components/CityMarkers";
import CityPanel from "./components/panels/CityPanel";
import Earth from "./components/Earth";
import GlobeBorders from "./components/GlobeBorders";
import CameraController from "./components/camera/CameraController";
import CountryMeshes from "./geo/CountryMeshes";
import getCountryCenter from "./geo/getCountryCenter";
import Doctor from "./debug/Doctor";
import { getCities } from "./services/cityService";
import { getCountryIdFromName } from "./services/countryService";
import { recordPassportEvent } from "./services/passportService";
import globePalette from "./globePalette";
import TopNav from "./components/TopNav";
import CountryHoverLabel from "./components/CountryHoverLabel";
import DestinationIntro from "./components/DestinationIntro";
import "./App.css";

export default function App() {
  const { t } = useTranslation("globe");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const controlsRef = useRef(null);
  const hoverClearTimeoutRef = useRef(null);
  const selectedCountryId = getCountryIdFromName(selectedCountry?.properties?.name);
  const selectedCountryCities = useMemo(
    () => getCities(selectedCountryId || "colombia"),
    [selectedCountryId]
  );

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    // Antes solo Colombia volaba la camara a su centro al seleccionarla;
    // se generaliza a cualquier pais para que la navegacion se sienta
    // igual en todo el continente.
    setCameraTarget(country ? getCountryCenter(country) : null);

    if (country) {
      const countryId = getCountryIdFromName(country.properties?.name);
      recordPassportEvent("country_explored", countryId, country.properties?.name);
    }
  }, []);

  const handleCitySelect = useCallback((city) => {
    setSelectedCity(city);
    if (city) {
      recordPassportEvent("city_explored", city.id, city.name);
    }
  }, []);

  // El "clear" del hover se demora un poco (no el "enter", que es
  // inmediato) para que mover el mouse rapido entre paises chicos no
  // produzca parpadeo del texto animado.
  const handleCountryHover = useCallback((country) => {
    if (hoverClearTimeoutRef.current) {
      clearTimeout(hoverClearTimeoutRef.current);
      hoverClearTimeoutRef.current = null;
    }
    if (country) {
      setHoveredCountry(country);
    } else {
      hoverClearTimeoutRef.current = setTimeout(() => setHoveredCountry(null), 80);
    }
  }, []);

  useEffect(() => () => {
    if (hoverClearTimeoutRef.current) clearTimeout(hoverClearTimeoutRef.current);
  }, []);

  return (
    <>
      <TopNav />
      <DestinationIntro />

      <section className={`globe-hero ${selectedCountry ? "globe-hero--compact" : ""}`}>
        {/* El eyebrow tiene su propia clave: usaba t("explore"), la misma
            que el titulo, asi que la cabecera repetia la frase dos veces. */}
        <p className="globe-hero__eyebrow">{t("eyebrow")}</p>
        <h1 className="globe-hero__title">{t("explore")}</h1>
        <p className="globe-hero__subtitle">{t("subtitle")}</p>
      </section>

      {!selectedCountry && (
        <aside className="globe-hint">
          <span className="globe-hint__dot" />
          <div>
            <strong>{t("hint.title")}</strong>
            <p>{t("hint.body")}</p>
          </div>
        </aside>
      )}

      <a className="globe-cta" href="/journey">
        {t("cta.createMap")} <span aria-hidden="true">→</span>
      </a>

      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={[globePalette.background]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 2, 4]} intensity={1.2} />
        <pointLight position={[2, 2, 2]} intensity={2} color={globePalette.glow} />

        <Stars
          radius={250}
          depth={80}
          count={6000}
          factor={6}
          saturation={0}
          fade
          speed={0.4}
        />
        <Earth />
        <Atmosphere />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableZoom
          autoRotate={!selectedCountry}
          autoRotateSpeed={0.3}
        />
        <GlobeBorders selectedCountry={selectedCountry} hoveredCountry={hoveredCountry} />
        <CountryMeshes
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
          hoveredCountry={hoveredCountry}
          onHover={handleCountryHover}
        />
        <CountryHoverLabel hoveredCountry={hoveredCountry} />
        <CityMarkers
          cities={selectedCountryId ? selectedCountryCities : []}
          selectedCity={selectedCity}
          onSelect={handleCitySelect}
        />
        <CameraController
          target={cameraTarget}
          controlsRef={controlsRef}
        />
        <Doctor />
      </Canvas>

      <CityPanel
        key={selectedCity || "no-city"}
        selectedCity={selectedCity}
        onClose={() => setSelectedCity(null)}
      />
    </>
  );
}
