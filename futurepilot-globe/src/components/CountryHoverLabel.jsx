import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import getCountryCenter from "../geo/getCountryCenter";
import { isVisiblePoint } from "../utils/isVisiblePoint";

/**
 * Nombre del pais bajo el cursor, anclado a su posicion 3D real (el
 * centroide que ya usa handleCountrySelect en App.jsx para la camara) en
 * vez de una posicion fija en pantalla - drei's <Html> reproyecta esa
 * posicion a coordenadas de pantalla en cada frame, asi que el texto sigue
 * al pais mientras el globo gira. Se oculta (opacity, via ref - sin
 * re-renders de React) cuando el punto queda del lado de atras del globo,
 * usando el mismo helper isVisiblePoint que ya oculta ciudades/paises
 * traseros en el resto de la app.
 */
export default function CountryHoverLabel({ hoveredCountry }) {
    const wrapperRef = useRef(null);
    const lastPositionRef = useRef(new THREE.Vector3());
    const lastNameRef = useRef("");

    const positionVector = useMemo(() => {
        if (hoveredCountry) {
            lastPositionRef.current = getCountryCenter(hoveredCountry);
            lastNameRef.current = hoveredCountry.properties.name;
        }
        return lastPositionRef.current;
    }, [hoveredCountry]);
    const position = [positionVector.x, positionVector.y, positionVector.z];

    useFrame(({ camera }) => {
        if (!wrapperRef.current) return;
        const shouldShow = Boolean(hoveredCountry) && isVisiblePoint(positionVector, camera);
        wrapperRef.current.style.opacity = shouldShow ? "1" : "0";
    });

    return (
        <Html position={position} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <div ref={wrapperRef} className="country-hover-label">
                <span key={lastNameRef.current} className="country-hover-label__text">
                    {lastNameRef.current}
                </span>
            </div>
        </Html>
    );
}
