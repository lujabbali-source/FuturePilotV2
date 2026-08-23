import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// `distance` es a que altura se queda la camara sobre el punto. Un pais se
// entiende visto entero (2.15); una ciudad es un punto y hay que bajar hasta
// que se vean sus alrededores, o el vuelo no comunica nada.
export default function CameraController({ target, controlsRef, onFocusComplete, distance = 2.15 }) {

    const camera = useThree((estado) => estado.camera);
    const controls = useThree((estado) => estado.controls);

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

        // El pivote se queda en el centro de la Tierra, SIEMPRE.
        //
        // Antes se movia al pais (dir * 0.35, un punto dentro del globo) y
        // ahi se quedaba. OrbitControls orbita alrededor de su target, asi
        // que a partir de ese momento arrastrar giraba la camara alrededor
        // del pais elegido: se quedaba clavado en el centro de la pantalla y
        // el globo ya no se podia explorar. Tambien torcia el zoom, que tira
        // hacia el target, y la rotacion automatica.
        //
        // No cambia el encuadre. La camara acaba en dir * distance y el pais
        // esta en dir * 1: los dos puntos y el origen estan en la MISMA
        // recta, asi que mirar al origen deja el pais igual de centrado. Lo
        // unico que cambia es alrededor de que se gira despues.
        lookAt.current.set(0, 0, 0);
        isAnimating.current = true;
        hasCompleted.current = false;

    }, [target, distance]);

    // El vuelo se cancela en cuanto el usuario agarra el globo.
    //
    // Sin esto, arrastrar durante el vuelo era una pelea que el usuario no
    // podia ganar: cada frame devolvia la camara al pais. Y como el propio
    // arrastre impedia que llegara al destino, `cameraSettled` no se cumplia
    // NUNCA y la animacion se quedaba encendida para siempre - el pais
    // quedaba clavado en el centro y el globo dejaba de explorarse hasta
    // recargar la pagina.
    //
    // El evento "start" de OrbitControls solo lo dispara la entrada del
    // usuario (raton, rueda, tacto). Las llamadas a update() de aqui abajo
    // no lo disparan, asi que la animacion no se cancela a si misma.
    useEffect(() => {
        if (!controls) return undefined;
        const soltar = () => { isAnimating.current = false; };
        controls.addEventListener("start", soltar);
        return () => controls.removeEventListener("start", soltar);
    }, [controls]);

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
