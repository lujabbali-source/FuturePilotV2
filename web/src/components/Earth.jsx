import * as THREE from "three";
import globePalette from "../globePalette";

function OceanMesh() {
    return (
        <mesh raycast={() => null} renderOrder={0}>
            <sphereGeometry args={[1, 128, 128]} />
            <meshStandardMaterial
                color={globePalette.ocean}
                roughness={0.88}
                metalness={0.04}
                side={THREE.FrontSide}
            />
        </mesh>
    );
}

export default function Earth() {
    return <OceanMesh />;
}
