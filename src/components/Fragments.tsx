import * as THREE from 'three';
import React, {useEffect, useRef, useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

function Fragment ({ url, position }: { url: string; position: {top: string, left: string, bottom: string, right: string} }) {
    const ref = useRef<THREE.Group>(null!);
    const { scene } = useGLTF(url);
    const { scene: threeScene } = useThree();

    const [envMap, setEnvMap] = useState<THREE.Texture | null>(null);
    const intensity = useRef(0);

    useEffect(() => {
        new RGBELoader()
            .setDataType(THREE.HalfFloatType)
            .load("/models/gradient_output.hdr", (hdrTexture) => {
                hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
                setEnvMap(hdrTexture);
            });
    }, []);

    // Apply envMap immediately once loaded (but with intensity 0)
    useEffect(() => {
        if (!envMap) return;

        threeScene.environment = envMap;

        threeScene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                child.material.envMap = envMap;
                child.material.envMapIntensity = 0; // start invisible
                child.material.needsUpdate = true;
            }
        });
    }, [envMap, threeScene]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        if (ref.current) {
            ref.current.rotation.y = t * 0.1;
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        }


        intensity.current = THREE.MathUtils.lerp(intensity.current, 1, delta * 0.01); // speed tweak here

        threeScene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                child.material.envMapIntensity = intensity.current;
            }
        });
    });

    return <primitive ref={ref} object={scene} />;
}

export default function Fragments () {
    return <primitive ref={ref} object={scene}/>;
}