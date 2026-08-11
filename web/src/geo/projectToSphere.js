import latLngToVector3 from "./latLngToVector3";

export default function projectToSphere(coordinates, radius = 1.0015) {

    return coordinates.map(([lng, lat]) =>
        latLngToVector3(lat, lng, radius)
    );

}