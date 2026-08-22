import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// `distance` es a que altura se queda la camara sobre el punto. Un pais se
// entiende visto entero (2.15); una ciudad es un punto y hay que bajar hasta
// que se vean sus alrededores, o el vuelo no comunica nada.
export default function CameraController({ target, controlsRef, onFocusComplete, distance = 2.15 }) {

    const { camera } = useThree();

    const destination = useRef(new THREE.Vector3());
    const lookAt = useRef(new THREE.Vector3());
    const isAnimating = useRef(false);
    const hasCompleted = useRef(false);

    useEffect(() => {

        if (!target) {
            isAnimating.current = false;
            return;
        }

        const dir = target.clone().normalize();

        destination.current.copy(dir).multiplyScalar(distance);

        lookAt.current.copy(dir).multiplyScalar(0.35);
        isAnimating.current = true;
        hasCompleted.current = false;

    }, [target, distance]);

    useFrame((_, delta) => {

        if (!isAnimating.current) return;

        const damping = 1 - Math.exp(-4.5 * delta);
        camera.position.lerp(destination.current, damping);

        if (controlsRef?.current) {
            controlsRef.current.target.lerp(lookAt.current, damping);
            controlsRef.current.update();
        } else {
            camera.lookAt(lookAt.current);
        }

        const cameraSettled = camera.position.distanceToSquared(destination.current) < 0.00001;
        const controlsSettled = !controlsRef?.current ||
            controlsRef.current.target.distanceToSquared(lookAt.current) < 0.00001;

        if (cameraSettled && controlsSettled) {
            isAnimating.current = false;
            if (!hasCompleted.current) {
                hasCompleted.current = true;
                onFocusComplete?.();
            }
        }

    });

    return null;

}
