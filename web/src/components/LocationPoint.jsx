import { Sphere } from "@react-three/drei";
import  latLngToVector3 from "../geo/latLngToVector3";

export default function LocationPoint({ lat, lng }) {

  const position = latLngToVector3(lat, lng, 1.02);

  return (
    <Sphere args={[0.02, 16, 16]} position={position}>
      <meshBasicMaterial color="#00FFC8" />
    </Sphere>
  );
}
