import GeoJsonGeometry from "three-geojson-geometry";
import globePalette from "../globePalette";

export default function CountryFill({ country }) {
    console.log(country);

    if (!country) return null;

    const polygons =
        country.geometry.type === "Polygon"
            ? [country.geometry.coordinates]
            : country.geometry.coordinates;

      console.log(country.geometry.type);
      console.log(country.geometry.coordinates);
    return (
        <>
            {polygons.map((polygon, index) => (
                <mesh key={index} raycast={() => null}>
                    <primitive
                        object={
                            new GeoJsonGeometry(
                                {
                                    type: "Polygon",
                                    coordinates: polygon,
                                },
                                1.002
                            )
                        }
                        attach="geometry"
                    />

                    <meshBasicMaterial
                        color={globePalette.interactive}
                        transparent
                        opacity={0.35}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </>
    );
}
