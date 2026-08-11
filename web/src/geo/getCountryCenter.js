import * as THREE from "three";

import latLngToVector3 from "./latLngToVector3";

export default function getCountryCenter(country) {

    if (!country) return new THREE.Vector3();

    const geometry = country.geometry;

    let latSum = 0;
    let lngSum = 0;
    let count = 0;

    function processRing(ring) {

        ring.forEach(([lng, lat]) => {

            latSum += lat;
            lngSum += lng;
            count++;

        });

    }

    if (geometry.type === "Polygon") {

        geometry.coordinates.forEach(processRing);

    }

    else if (geometry.type === "MultiPolygon") {

        geometry.coordinates.forEach(

            polygon => {

                polygon.forEach(processRing);

            }

        );

    }

    if (count === 0) {

        return new THREE.Vector3();

    }

    const lat = latSum / count;
    const lng = lngSum / count;

    return latLngToVector3(

        lat,

        lng,

        1

    );

}