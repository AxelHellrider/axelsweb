import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

interface CrystalModelProps {
    url: string;
    timerFinished?: boolean;
    speedMultiplier?: number;
    isMobile?: boolean;
}

// Preload the model (faster initial render)
useLoader.preload(GLTFLoader, "/models/crystal6.glb");

export default function CrystalModel({
                                         url,
                                         timerFinished,
                                         speedMultiplier = 1,
                                         isMobile = false,
                                     }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);

    // Setup DRACO loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    // Load GLTF with DRACO support
    const gltf = useLoader(GLTFLoader, url, (loader) => {
        (loader as GLTFLoader).setDRACOLoader(dracoLoader);
    });

    const scene = gltf.scene;

    // Apply shadow properties
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Optional: reduce detail for mobile
                    if (isMobile) {
                        child.material = child.material.clone();
                        child.material.flatShading = true;
                    }
                }
            });
        }
    }, [scene, isMobile]);

    // Animate the group
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speedMultiplier;
        const rotSpeed = 0.1;
        const wobbleSpeed = 0.05;
        const floatSpeed = 0.5;
        const floatAmp = 0.2;
        const scaleAmp = 0.01;

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
