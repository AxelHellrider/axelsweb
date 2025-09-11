import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
}

export default function CrystalModel({ url }: CrystalModelProps) {
    const ref = useRef<THREE.Group>(null!);
    const lodRef = useRef<THREE.LOD>(null!);

    // Derive LOD urls based on the provided base url
    const urlLOD1 = useMemo(() => url.replace(/\.glb$/i, "_LOD1.glb"), [url]);
    const urlLOD2 = useMemo(() => url.replace(/\.glb$/i, "_LOD2.glb"), [url]);

    // Load GLTF scenes
    const high = useGLTF(url);
    const l1 = useGLTF(urlLOD1);
    const l2 = useGLTF(urlLOD2);

    // Clone once to avoid mutating cached scenes; share geometries/materials
    const highScene = useMemo(() => high.scene.clone(true), [high.scene]);
    const l1Scene = useMemo(() => l1.scene.clone(true), [l1.scene]);
    const l2Scene = useMemo(() => l2.scene.clone(true), [l2.scene]);

    // Ensure proper shadow flags per mesh
    useEffect(() => {
        [highScene, l1Scene, l2Scene].forEach((s) => {
            s.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        });
    }, [highScene, l1Scene, l2Scene]);

    // Create a memoized LOD object to avoid re-instantiation
    const lodObj = useMemo(() => new THREE.LOD(), []);

    // Build LOD levels once
    useEffect(() => {
        const lod = lodRef.current;
        if (!lod) return;
        if (lod.levels && lod.levels.length > 0) return; // already built
        // Distances tuned to preserve highest fidelity at typical viewing distances
        lod.addLevel(highScene, 0);
        lod.addLevel(l1Scene, 12);
        lod.addLevel(l2Scene, 18);
    }, [highScene, l1Scene, l2Scene]);

    // Animate the group (keeps original behavior)
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
        // Ensure LOD selects appropriate level
        if (lodRef.current) lodRef.current.update(state.camera);
    });

    return (
        <group ref={ref} name="crystal">
            <primitive object={highScene} visible={false} />
            <primitive object={l1Scene} visible={false} />
            <primitive object={l2Scene} visible={false} />
            <primitive object={lodObj} ref={(node: THREE.LOD | null) => { if (node) lodRef.current = node; }} />
        </group>
    );
}

useGLTF.preload("/models/crystal6.glb");
useGLTF.preload("/models/crystal6_LOD1.glb");
useGLTF.preload("/models/crystal6_LOD2.glb");
