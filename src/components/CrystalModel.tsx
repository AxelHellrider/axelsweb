import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
}

export default function CrystalModel({ url, timerFinished}: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);
    
    // Apply enhanced crystal material properties
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

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            // Enhanced animation for better visual effect
            ref.current.rotation.y = t * 0.1;
            ref.current.rotation.z = Math.sin(t * 0.05) * 0.02;
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
            
            // Subtle scale pulsing for light refraction effect
            const scale = 1 + Math.sin(t) * 0.01;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return <primitive ref={ref} object={scene} name={"crystal"}/>;
}
