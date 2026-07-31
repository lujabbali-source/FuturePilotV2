import { useEffect } from "react";
import { world } from "../geo/world";
import GeoJsonGeometry from "three-geojson-geometry";

const ENABLE_DOCTOR = false;
export default function Doctor() {

    useEffect(() => {

        // console.clear();

        console.log("=====================================");
        console.log("🩺 FUTUREPILOT GLOBE DOCTOR");
        console.log("=====================================");

        const start = performance.now();

        if (!world) {
            console.error("❌ World no existe");
            return;
        }

        if (!world.features) {
            console.error("❌ world.features no existe");
            return;
        }

        console.log("🌍 Países:", world.features.length);

        let polygon = 0;
        let multipolygon = 0;

        let geometryErrors = 0;
        let propertyErrors = 0;
        let nameErrors = 0;
        let meshErrors = 0;

        let biggest = {
            name: "",
            vertices: 0
        };

        let smallest = {
            name: "",
            vertices: Infinity
        };

        const damaged = [];

        world.features.forEach((country, index) => {

            if (!country.geometry) {
                geometryErrors++;
                damaged.push(country);
                return;
            }

            if (!country.properties) {
                propertyErrors++;
                damaged.push(country);
                return;
            }

            const name =
                country.properties.name ||
                country.properties.NAME ||
                "Sin nombre";

            if (name === "Sin nombre") {
                nameErrors++;
            }

            if (country.geometry.type === "Polygon")
                polygon++;

            if (country.geometry.type === "MultiPolygon")
                multipolygon++;

            try {

                const geometry =
                    new GeoJsonGeometry(
                        country.geometry,
                        1
                    );

                const vertices =
                    geometry.attributes.position.count;

                if (vertices > biggest.vertices) {
                    biggest = {
                        name,
                        vertices
                    };
                }

                if (vertices < smallest.vertices) {
                    smallest = {
                        name,
                        vertices
                    };
                }

            }

            catch (e) {

                meshErrors++;

                damaged.push({
                    index,
                    name,
                    error: e.message
                });

            }

        });

        const end = performance.now();

        console.log("");

        console.log("========= RESUMEN =========");

        console.log("Polygon:", polygon);
        console.log("MultiPolygon:", multipolygon);

        console.log("");

        console.log("Errores geometry:", geometryErrors);
        console.log("Errores properties:", propertyErrors);
        console.log("Errores nombre:", nameErrors);
        console.log("Errores mesh:", meshErrors);

        console.log("");

        console.log("País más grande:");
        console.log(biggest);

        console.log("");

        console.log("País más pequeño:");
        console.log(smallest);

        console.log("");

        console.log(
            "Tiempo:",
            (end - start).toFixed(2),
            "ms"
        );

        console.log("");

        if (damaged.length === 0) {

            console.log("✅ TODOS LOS PAÍSES ESTÁN BIEN");

        } else {

            console.warn(
                "⚠ Países con problemas:",
                damaged.length
            );

            console.table(damaged);

        }

        console.log("=====================================");

    }, []);

    return null;
}