import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
}

export default function CrystalModel({ url }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);
    
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const isMobile = state.viewport.width < 8; // heuristic: smaller world units => mobile screens
        const rotSpeed = isMobile ? 0.07 : 0.1;
        const wobbleSpeed = isMobile ? 0.035 : 0.05;
        const floatSpeed = isMobile ? 0.35 : 0.5;
        const floatAmp = isMobile ? 0.14 : 0.2;
        const scaleAmp = isMobile ? 0.007 : 0.01;
        if (ref.current) {
            ref.current.rotation.y = t * rotSpeed;
            ref.current.rotation.z = Math.sin(t * wobbleSpeed) * 0.02;
            ref.current.position.y = Math.sin(t * floatSpeed) * floatAmp;
            const scale = 1 + Math.sin(t) * scaleAmp;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return <primitive ref={ref} object={scene} name={"crystal"}/>;
}
