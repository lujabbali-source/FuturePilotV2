import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function PlanetPicker() {
  const { scene } = useThree();

  useEffect(() => {
    console.log("PlanetPicker listo");
  }, []);

  return null;
}