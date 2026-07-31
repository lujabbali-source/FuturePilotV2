export function isVisiblePoint(point, camera, minimumDot = 0.04) {
    if (!point || !camera) return false;

    const normal = point.clone().normalize();
    const cameraDirection = camera.position.clone().sub(point).normalize();

    return normal.dot(cameraDirection) > minimumDot;
}
