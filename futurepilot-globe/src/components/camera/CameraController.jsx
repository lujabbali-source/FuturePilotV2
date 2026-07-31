import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraController({ target, controlsRef, onFocusComplete }) {

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

        destination.current.copy(dir).multiplyScalar(2.15);

        lookAt.current.copy(dir).multiplyScalar(0.35);
        isAnimating.current = true;
        hasCompleted.current = false;

    }, [target]);

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
