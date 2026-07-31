import { useMemo } from "react";
import * as THREE from "three";
import globePalette from "../globePalette";

function latLngToVector(lat, lng, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;

    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

export default function CountrySurface({ polygon }) {

    const geometry = useMemo(() => {

        if (!polygon) return null;

        const shape = new THREE.Shape();

        polygon[0].forEach(([lng, lat], index) => {

            const v = latLngToVector(lat, lng, 1.003);

            if (index === 0)
                shape.moveTo(v.x, v.y);
            else
                shape.lineTo(v.x, v.y);

        });

        return new THREE.ShapeGeometry(shape);

    }, [polygon]);

    if (!geometry) return null;

    return (
        <mesh geometry={geometry} raycast={() => null}>
            <meshBasicMaterial
                color={globePalette.country}
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
            />
        </mesh>
    );

}
