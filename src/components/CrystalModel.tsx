import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
  url: string;
  timerFinished: boolean;
  speedMultiplier?: number;
  isMobile?: boolean;
}

export default function CrystalModel({ url, timerFinished, speedMultiplier = 1, isMobile = false }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);

    // Conditionally load GLTF scene based on isMobile prop
    const modelUrl = isMobile ? url.replace(".glb", "_LOD2.glb") : url;
    const { scene } = useGLTF(modelUrl);

    // Apply shadow properties to the loaded scene
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

    // Animate the group (keeps original behavior)
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speedMultiplier;
        const rotSpeed = 0.1;
        const wobbleSpeed =  0.05;
        const floatSpeed = 0.5;
        const floatAmp = 0.2;
        const scaleAmp =  0.01;
        if (ref.current) {
            ref.current.rotation.y = t * rotSpeed;
            ref.current.rotation.z = Math.sin(t * wobbleSpeed) * 0.02;
            ref.current.position.y = Math.sin(t * floatSpeed) * floatAmp;
            const scale = 1 + Math.sin(t) * scaleAmp;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={ref} name="crystal">
            {scene && <primitive object={scene} />}
        </group>
    );
}

useGLTF.preload("/models/crystal6.glb");
useGLTF.preload("/models/crystal6_LOD2.glb");
