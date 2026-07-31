import earcut from "earcut";

export default function triangulatePolygon(points) {

    const vertices2D = [];

    for (const point of points) {

        vertices2D.push(point.lng);
        vertices2D.push(point.lat);

    }

    const indices = earcut(vertices2D);

    return indices;

}