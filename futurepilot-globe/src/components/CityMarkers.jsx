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

function createStarTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext("2d");
    context.translate(128, 128);
    context.globalCompositeOperation = "lighter";

    const glow = context.createRadialGradient(0, 0, 2, 0, 0, 112);
    glow.addColorStop(0, globePalette.hud);
    glow.addColorStop(0.08, globePalette.hud);
    glow.addColorStop(0.28, "rgba(223,175,255,.42)");
    glow.addColorStop(0.62, "rgba(0,240,181,.14)");
    glow.addColorStop(1, "rgba(0,240,181,0)");
    context.fillStyle = glow;
    context.beginPath();
    context.arc(0, 0, 112, 0, Math.PI * 2);
    context.fill();

    const rays = [
        [0, 112, 2.2],
        [Math.PI / 2, 112, 2.2],
        [Math.PI, 112, 2.2],
        [Math.PI * 1.5, 112, 2.2],
        [Math.PI / 4, 68, 1.2],
        [Math.PI * 0.75, 68, 1.2],
        [Math.PI * 1.25, 68, 1.2],
        [Math.PI * 1.75, 68, 1.2]
    ];

    rays.forEach(([angle, length, width]) => {
        context.save();
        context.rotate(angle);
        const ray = context.createLinearGradient(0, 0, length, 0);
        ray.addColorStop(0, globePalette.hud);
        ray.addColorStop(0.12, globePalette.hud);
        ray.addColorStop(0.62, "rgba(223,175,255,.3)");
        ray.addColorStop(1, "rgba(0,240,181,0)");
        context.strokeStyle = ray;
        context.lineWidth = width;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(length, 0);
        context.stroke();
        context.restore();
    });

    context.fillStyle = globePalette.hud;
    context.beginPath();
    context.arc(0, 0, 4, 0, Math.PI * 2);
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
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4 + city.id.length) * 0.05;
        const emphasis = selected ? 1.18 : hovered ? 1.12 : 1;
        const baseScale = city.isCapital ? 0.032 : 0.022;
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
    const texture = useMemo(() => createStarTexture(), []);
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
