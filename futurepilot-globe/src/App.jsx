import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useCallback, useMemo, useRef, useState } from "react";
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
import globePalette from "./globePalette";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./App.css";

export default function App() {
  const { t } = useTranslation("globe");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const controlsRef = useRef(null);
  const selectedCountryId = getCountryIdFromName(selectedCountry?.properties?.name);
  const selectedCountryCities = useMemo(
    () => getCities(selectedCountryId || "colombia"),
    [selectedCountryId]
  );

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setSelectedCity(null);

    if (country?.properties?.name === "Colombia") {
      setCameraTarget(getCountryCenter(country));
    } else {
      setCameraTarget(null);
    }
  }, []);

  return (
    <>
      <div className="app-overlay" aria-label={t("explore")}>
        <div className="app-brand-lockup">
          <span className="app-brand-mark">✦</span>
          <div>
            <strong>{t("brand.name", { ns: "common" })}</strong>
            <span>{t("globalView")}</span>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
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
        <GlobeBorders selectedCountry={selectedCountry} />
        <CountryMeshes
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
        />
        <CityMarkers
          cities={selectedCountryId ? selectedCountryCities : []}
          selectedCity={selectedCity}
          onSelect={setSelectedCity}
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
