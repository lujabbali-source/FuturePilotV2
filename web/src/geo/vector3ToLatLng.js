export default function vector3ToLatLng(vector) {

    const radius = vector.length();

    const lat =
        90 -
        (Math.acos(vector.y / radius) * 180) /
            Math.PI;

    const lng =
        (Math.atan2(vector.z, vector.x) *
            180) /
        Math.PI;

    return {
        lat,
        lng
    };

}