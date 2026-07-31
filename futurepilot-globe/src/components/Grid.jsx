import { Line } from "@react-three/drei";
import globePalette from "../globePalette";

export default function Grid() {

    const latitudeLines = [];
    const longitudeLines = [];

    const radius = 1.23;

    // Latitudes
    for (let lat = -80; lat <= 80; lat += 20) {

        const points = [];

        for (let lon = 0; lon <= 360; lon += 5) {

            const phi = (90 - lat) * Math.PI / 180;
            const theta = lon * Math.PI / 180;

            points.push([
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            ]);
        }

        latitudeLines.push(points);

    }

    // Longitudes
    for (let lon = 0; lon < 360; lon += 20) {

        const points = [];

        for (let lat = -90; lat <= 90; lat += 5) {

            const phi = (90 - lat) * Math.PI / 180;
            const theta = lon * Math.PI / 180;

            points.push([
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            ]);
        }

        longitudeLines.push(points);

    }

    return (
        <>
            {latitudeLines.map((line, i) => (
                <Line
                    key={"lat" + i}
                    points={line}
                    color={globePalette.orbit}
                    lineWidth={0.5}
                    transparent
                    opacity={0.18}
                />
            ))}

            {longitudeLines.map((line, i) => (
                <Line
                    key={"lon" + i}
                    points={line}
                    color={globePalette.orbit}
                    lineWidth={0.5}
                    transparent
                    opacity={0.18}
                />
            ))}
        </>
    );

}
