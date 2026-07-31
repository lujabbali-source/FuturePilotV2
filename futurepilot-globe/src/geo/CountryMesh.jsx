import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import buildCountryGeometry from "../geo/buildCountryGeometry";
import globePalette from "../globePalette";
import { isVisiblePoint } from "../utils/isVisiblePoint";

const COUNTRY_COLOR = new THREE.Color(globePalette.country);
const SELECTED_COUNTRY_COLOR = new THREE.Color(globePalette.selectedCountry);

export default function CountryMesh({
    country,
    selectedCountry,
    onSelect
}) {
    const geometry = useMemo(() => buildCountryGeometry(country), [country]);
    const materialRef = useRef();
    const isSelected = selectedCountry?.properties.name === country.properties.name;

    useFrame((_, delta) => {
        if (!materialRef.current) return;

        materialRef.current.color.lerp(
            isSelected ? SELECTED_COUNTRY_COLOR : COUNTRY_COLOR,
            1 - Math.exp(-10 * delta)
        );
        materialRef.current.opacity = THREE.MathUtils.damp(
            materialRef.current.opacity,
            isSelected ? 0.72 : 0.58,
            8,
            delta
        );
    });

    if (!geometry) return null;

    return (
        <mesh
            geometry={geometry}
            onClick={(event) => {
                if (!isVisiblePoint(event.point, event.camera)) return;

                event.stopPropagation();
                onSelect?.(country);
            }}
        >
            <meshStandardMaterial
                ref={materialRef}
                color={isSelected ? globePalette.selectedCountry : globePalette.country}
                transparent
                opacity={isSelected ? 0.72 : 0.58}
                side={THREE.DoubleSide}
                roughness={0.92}
                metalness={0.02}
            />
        </mesh>
    );
}
