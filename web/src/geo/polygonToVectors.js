import latLngToVector3 from "./latLngToVector3";

export default function polygonToVectors(polygon, radius = 1.0015) {

    const vectors = [];

    for (const ring of polygon) {

        const ringVectors = [];

        for (const point of ring) {

            const [lng, lat] = point;

            ringVectors.push(
                latLngToVector3(lat, lng, radius)
            );

        }

        vectors.push(ringVectors);

    }

    return vectors;

}