import { Line } from "@react-three/drei";
import latLngToVector3 from "../geo/latLngToVector3";
import { world } from "../geo/world";
import globePalette from "../globePalette";

export default function GlobeBorders({ selectedCountry }) {
    return (
        <>
            {world.features.map((country, index) => {
                const polygons = country.geometry.type === "Polygon"
                    ? [country.geometry.coordinates]
                    : country.geometry.coordinates;
                const isSelected = selectedCountry?.properties.name === country.properties.name;

                return polygons.map((polygon, polygonIndex) => (
                    <Line
                        key={`${index}-${polygonIndex}`}
                        points={polygon[0].map(([lng, lat]) => latLngToVector3(lat, lng, 1.003))}
                        color={isSelected ? globePalette.interactive : globePalette.mapLine}
                        lineWidth={isSelected ? 1.5 : 0.7}
                        transparent
                        opacity={isSelected ? 0.9 : 0.42}
                        raycast={() => null}
                    />
                ));
            })}
        </>
    );
}
