import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
}

export default function CrystalModel({ url, timerFinished}: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.1;
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return <primitive ref={ref} object={scene} name={"crystal"}/>;
}
