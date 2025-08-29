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

export default function CrystalModel({ url, timerFinished, color, roughnessTarget }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);
    const roughnessRef = useRef(0.001);
    const [reachedTarget, setReachedTarget] = useState(false);

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

        if (timerFinished && !reachedTarget) {
            let newRoughness = THREE.MathUtils.lerp(
                roughnessRef.current,
                roughnessTarget,
                delta * 0.5 // faster convergence than 0.01
            );

            // clamp and stop once reached
            if (Math.abs(newRoughness - roughnessTarget) < 0.0005) {
                newRoughness = roughnessTarget;
                setReachedTarget(true);
            }

            roughnessRef.current = newRoughness;

            function isMesh(object: THREE.Object3D): object is THREE.Mesh {
                return (object as THREE.Mesh).isMesh;
            }

            scene.traverse((child) => {
                if (isMesh(child) && child.material instanceof THREE.MeshPhysicalMaterial) {
                    child.material.roughness = roughnessRef.current;
                }
            });
        }
    });

    return <primitive ref={ref} object={scene} />;
}
