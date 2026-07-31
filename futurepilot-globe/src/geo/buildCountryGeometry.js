import * as THREE from "three";
import earcut from "earcut";
import latLngToVector3 from "./latLngToVector3";

const COUNTRY_RADIUS = 1.0015;

function withoutClosingCoordinate(ring) {
    if (ring.length < 2) return ring;

    const first = ring[0];
    const last = ring[ring.length - 1];

    if (first[0] === last[0] && first[1] === last[1]) {
        return ring.slice(0, -1);
    }

    return ring;
}

function addPolygon(polygon, positions, indices) {
    const rings = polygon
        .map(withoutClosingCoordinate)
        .filter((ring) => ring.length >= 3);

    if (rings.length === 0) return;

    const vertices2D = [];
    const holeIndices = [];

    rings.forEach((ring, ringIndex) => {
        if (ringIndex > 0) {
            holeIndices.push(vertices2D.length / 2);
        }

        ring.forEach(([lng, lat]) => {
            vertices2D.push(lng, lat);
        });
    });

    const vertexOffset = positions.length / 3;
    const triangles = earcut(vertices2D, holeIndices, 2);

    for (let index = 0; index < vertices2D.length; index += 2) {
        const vertex = latLngToVector3(
            vertices2D[index + 1],
            vertices2D[index],
            COUNTRY_RADIUS
        );

        positions.push(vertex.x, vertex.y, vertex.z);
    }

    triangles.forEach((index) => {
        indices.push(vertexOffset + index);
    });
}

export default function buildCountryGeometry(country) {
    const geometry = country?.geometry;

    if (!geometry) {
        return null;
    }

    const polygons = geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.type === "MultiPolygon"
            ? geometry.coordinates
            : [];

    const positions = [];
    const indices = [];

    polygons.forEach((polygon) => {
        addPolygon(polygon, positions, indices);
    });

    if (positions.length === 0 || indices.length === 0) {
        return null;
    }

    const countryGeometry = new THREE.BufferGeometry();

    countryGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );
    countryGeometry.setIndex(indices);
    countryGeometry.computeVertexNormals();
    countryGeometry.computeBoundingSphere();

    return countryGeometry;
}
