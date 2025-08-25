import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
    color: string;
    roughnessTarget: number;
}

export default function CrystalModel({ url, timerFinished, color, roughnessTarget }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);
    const roughnessRef = useRef(0.001);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color(color),
                    roughness: roughnessRef.current,
                    metalness: 0.9,
                    transmission: 1,
                    thickness: 1.5,
                    clearcoat: 1,
                    clearcoatRoughness: 0.01,
                    ior: 1.7,
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

        if (timerFinished) {
            if (Math.abs(roughnessRef.current - roughnessTarget) > 0.001) {
                roughnessRef.current = parseFloat(
                    THREE.MathUtils.lerp(roughnessRef.current, roughnessTarget, delta * 0.01).toFixed(4)
                );
            }
            scene.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    child.material.roughness = roughnessRef.current;
                    child.material.needsUpdate = true;
                }
            });
        }
    });

    return <primitive ref={ref} object={scene} />;
}
