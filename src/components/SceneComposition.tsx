"use client";

import React, { useRef, useEffect, useState } from "react";
import CrystalModel from "./CrystalModel";
import ParticleBackground from "./ParticleBackground";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";
import * as THREE from "three";
import {RootState, useFrame} from "@react-three/fiber";

interface SceneContentProps {
    timerFinished: boolean;
    enablePostProcessing?: boolean;
}

export default function SceneComposition({timerFinished, enablePostProcessing = true,}: SceneContentProps) {
    const sceneRef = useRef<THREE.Scene>(null!);
    const spot1 = useRef<THREE.SpotLight>(null!);
    const spot2 = useRef<THREE.SpotLight>(null!);
    const spot3 = useRef<THREE.SpotLight>(null!);
    const [crystalTarget, setCrystalTarget] = useState<THREE.Object3D | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;
        const obj = sceneRef.current.getObjectByName("crystal");
        if (obj) setCrystalTarget(obj);
    }, [timerFinished]);

    useFrame(() => {
        if (crystalTarget) {
            [spot1, spot2, spot3].forEach((spot) => {
                if (spot.current) {
                    spot.current.target.position.copy(crystalTarget.position);
                    spot.current.target.updateMatrixWorld();
                }
            });
        }
    });

    return (
        <scene ref={sceneRef}>
            {/* Spotlights */}
            <spotLight
                ref={spot1}
                position={[2, 2.5, 3]}
                angle={0.75}
                penumbra={0}
                intensity={10}
                color={"#a1e4fd"}
                distance={50}
                castShadow
            />

            <spotLight
                ref={spot2}
                position={[-2, 0, 3]}
                angle={1}
                penumbra={0}
                intensity={10}
                color={"#0b387a"}
                distance={50}
                castShadow
            />

            <spotLight
                ref={spot3}
                position={[3, -2.5, 3]}
                angle={1.52}
                penumbra={0}
                intensity={10}
                color={"#14c6c6"}
                distance={50}
                castShadow
            />

            {/* Crystal */}
            <CrystalModel url="/models/crystal6.glb" timerFinished={timerFinished} />

            {/* Particle background */}
            <ParticleBackground enabled={timerFinished} />

            {/* Postprocessing */}
            {enablePostProcessing && (
                <EffectComposer enableNormalPass>
                    <SSAO samples={timerFinished ? 16 : 8} radius={0.5} intensity={timerFinished ? 20 : 10}/>
                    <Bloom mipmapBlur intensity={timerFinished ? 0.5 : 0.25} luminanceThreshold={0.2}/>
                </EffectComposer>
            )}
        </scene>
    );
}
