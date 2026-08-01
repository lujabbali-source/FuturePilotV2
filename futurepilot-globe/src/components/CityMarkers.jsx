import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import latLngToVector3 from "../geo/latLngToVector3";
import globePalette from "../globePalette";
import { isVisiblePoint } from "../utils/isVisiblePoint";

const CITY_COLOR = new THREE.Color(globePalette.interactive);
const CAPITAL_COLOR = new THREE.Color(globePalette.orbit);
const SELECTED_COLOR = new THREE.Color(globePalette.hud);
const CITY_MARKER_RADIUS = 1.025;

function createGlowPointTexture() {
    // Punto de luz minimalista: nucleo solido pequeno + halo radial suave,
    // sin rayos - reemplaza el sprite de "estrella" anterior. El color real
    // se aplica por instancia via spriteMaterial.color (ver CityMarker), asi
    // que aqui se dibuja en blanco puro para que el tint no se apague.
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext("2d");
    context.translate(64, 64);
    context.globalCompositeOperation = "lighter";

    const halo = context.createRadialGradient(0, 0, 0, 0, 0, 56);
    halo.addColorStop(0, "rgba(255,255,255,.9)");
    halo.addColorStop(0.16, "rgba(255,255,255,.55)");
    halo.addColorStop(0.45, "rgba(255,255,255,.16)");
    halo.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = halo;
    context.beginPath();
    context.arc(0, 0, 56, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(0, 0, 9, 0, Math.PI * 2);
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
}

function CityMarker({ city, selected, onSelect, texture, hitGeometry }) {
    const markerRef = useRef();
    const spriteRef = useRef();
    const materialRef = useRef();
    const scaleRef = useRef(new THREE.Vector3());
    const [hovered, setHovered] = useState(false);
    const { camera } = useThree();
    const position = useMemo(
        () => latLngToVector3(city.coordinates.lat, city.coordinates.lng, CITY_MARKER_RADIUS),
        [city.coordinates.lat, city.coordinates.lng]
    );

    useFrame((state, delta) => {
        if (!markerRef.current || !spriteRef.current || !materialRef.current) return;

        const isFrontFacing = isVisiblePoint(position, camera);
        markerRef.current.visible = isFrontFacing;

        if (!isFrontFacing) return;

        const distance = camera.position.distanceTo(position);
        const zoomScale = THREE.MathUtils.clamp(2.8 / distance, 1, 1.25);
        // Pulso mas suave y lento que el de la estrella original - un punto
        // de luz "respira", no parpadea.
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4 + city.id.length) * 0.08;
        const emphasis = selected ? 1.25 : hovered ? 1.15 : 1;
        const baseScale = city.isCapital ? 0.02 : 0.014;
        const targetScale = baseScale * zoomScale * pulse * emphasis;

        scaleRef.current.set(targetScale, targetScale, targetScale);
        spriteRef.current.scale.lerp(scaleRef.current, 1 - Math.exp(-12 * delta));
        materialRef.current.opacity = THREE.MathUtils.damp(
            materialRef.current.opacity,
            selected || hovered ? 1 : 0.9,
            7,
            delta
        );
        materialRef.current.color.lerp(
            selected ? SELECTED_COLOR : city.isCapital ? CAPITAL_COLOR : CITY_COLOR,
            1 - Math.exp(-8 * delta)
        );
    });

    const handlePointerOver = (event) => {
        event.stopPropagation();
        setHovered(true);
    };

    const handlePointerOut = (event) => {
        event.stopPropagation();
        setHovered(false);
    };

    return (
        <group ref={markerRef} position={position}>
            <sprite ref={spriteRef} renderOrder={10}>
                <spriteMaterial
                    ref={materialRef}
                    map={texture}
                    color={globePalette.interactive}
                    transparent
                    opacity={0}
                    depthTest={false}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    toneMapped={false}
                />
            </sprite>
            <mesh
                geometry={hitGeometry}
                renderOrder={11}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={(event) => {
                    event.stopPropagation();
                    onSelect(city.id);
                }}
            >
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
        </group>
    );
}

export default function CityMarkers({ cities, selectedCity, onSelect }) {
    const texture = useMemo(() => createGlowPointTexture(), []);
    const hitGeometry = useMemo(() => new THREE.SphereGeometry(0.04, 12, 8), []);
    const mappableCities = cities.filter((city) => city.coordinates?.lat != null && city.coordinates?.lng != null);

    useEffect(() => () => {
        texture.dispose();
        hitGeometry.dispose();
    }, [texture, hitGeometry]);

    return (
        <group>
            {mappableCities.map((city) => (
                <CityMarker
                    key={city.id}
                    city={city}
                    selected={selectedCity === city.id}
                    onSelect={onSelect}
                    texture={texture}
                    hitGeometry={hitGeometry}
                />
            ))}
        </group>
    );
}
