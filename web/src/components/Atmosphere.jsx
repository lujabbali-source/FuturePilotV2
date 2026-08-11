import * as THREE from "three";
import globePalette from "../globePalette";

export default function Atmosphere() {
    return (
        <mesh raycast={() => null}>
            <sphereGeometry args={[1.06, 128, 128]} />
            <meshBasicMaterial
                color={globePalette.glow}
                transparent
                opacity={0.035}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
