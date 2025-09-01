import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
    color: string;
    roughnessTarget: number;
}

export default function CrystalModel({ url, timerFinished, color }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color(color),
                    roughness: 0.01,
                    metalness: 0,
                    transmission: 1,
                    thickness: 1.5,
                    clearcoat: 1,
                    clearcoatRoughness: 0.01,
                    ior: 1.55,
                });
            }
        });
    }, [scene, color]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.1;
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return <primitive ref={ref} object={scene} />;
}
