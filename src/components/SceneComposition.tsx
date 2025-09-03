"use client";

import React, { useRef, useEffect, useState } from "react";
import CrystalModel from "./CrystalModel";
import ParticleBackground from "./ParticleBackground";
import { EffectComposer, Bloom, SSAO, ChromaticAberration, Glitch, GodRays } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import * as THREE from "three";
import { RootState, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

interface SceneContentProps {
    timerFinished: boolean;
    enablePostProcessing?: boolean;
}

export default function SceneComposition({timerFinished, enablePostProcessing = true,}: SceneContentProps) {
    const sceneRef = useRef<THREE.Scene>(null!);
    const spot1 = useRef<THREE.SpotLight>(null!);
    const spot2 = useRef<THREE.SpotLight>(null!);
    const spot3 = useRef<THREE.SpotLight>(null!);
    const pointLight = useRef<THREE.PointLight>(null!);
    const [crystalTarget, setCrystalTarget] = useState<THREE.Object3D | null>(null);
    const sunRef = useRef<THREE.Mesh>(null!);

    useEffect(() => {
        if (!sceneRef.current) return;
        const obj = sceneRef.current.getObjectByName("crystal");
        if (obj) setCrystalTarget(obj);
    }, [timerFinished]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        // Dynamic light intensity for sparkle effect
        if (pointLight.current) {
            pointLight.current.intensity = 5 + Math.sin(t * 2) * 2;
        }
        
        // Update sun position to match crystal
        if (sunRef.current && crystalTarget) {
            sunRef.current.position.copy(crystalTarget.position);
        }
        
        if (crystalTarget) {
            // Animate spotlights for dynamic lighting
            [spot1, spot2, spot3].forEach((spot, i) => {
                if (spot.current) {
                    // Make lights orbit around the crystal
                    const angle = t * 0.2 + (i * Math.PI * 2 / 3);
                    const radius = 3 + Math.sin(t * 0.5 + i) * 0.5;
                    const height = 2 + Math.sin(t * 0.3 + i) * 1;
                    
                    spot.current.position.x = Math.sin(angle) * radius;
                    spot.current.position.z = Math.cos(angle) * radius;
                    spot.current.position.y = height;
                    
                    spot.current.target.position.copy(crystalTarget.position);
                    spot.current.target.updateMatrixWorld();
                }
            });
        }
    });

    return (
        <scene ref={sceneRef}>
            {/* Environment map for realistic reflections */}
            <Environment files="/models/gradient_output2.hdr" background={false} />
            
            {/* Point light inside crystal for internal glow */}
            <pointLight
                ref={pointLight}
                position={[0, 0, 0]}
                intensity={2}
                color="#f5f5f5"
                distance={1}
                decay={2}
            />
            
            {/* Invisible mesh for GodRays light source */}
            <mesh ref={sunRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.0125, 16, 16]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0} />
            </mesh>
            
            {/* Spotlights with enhanced colors */}
            <spotLight
                ref={spot1}
                position={[2, 2.5, 3]}
                angle={0.5}
                penumbra={0.2}
                intensity={15}
                color={"#a1e4fd"}
                distance={50}
                castShadow
                shadow-bias={-0.0001}
            />

            <spotLight
                ref={spot2}
                position={[-2, 0, 3]}
                angle={0.7}
                penumbra={0.3}
                intensity={12}
                color={"#0b387a"}
                distance={50}
                castShadow
                shadow-bias={-0.0001}
            />

            <spotLight
                ref={spot3}
                position={[3, -2.5, 3]}
                angle={0.6}
                penumbra={0.2}
                intensity={14}
                color={"#14c6c6"}
                distance={50}
                castShadow
                shadow-bias={-0.0001}
            />

            {/* Crystal */}
            <CrystalModel url="/models/crystal6.glb" timerFinished={timerFinished} />

            {/* Particle background */}
            <ParticleBackground enabled={timerFinished} />

            {/* Enhanced Postprocessing */}
            {enablePostProcessing && (
                <EffectComposer multisampling={8} enableNormalPass>
                    <SSAO 
                        samples={timerFinished ? 20 : 10} 
                        radius={0.25} 
                        intensity={timerFinished ? 15 : 8}
                        luminanceInfluence={0.2}
                        color={new THREE.Color("#0000ff")}
                    />
                    <Bloom 
                        mipmapBlur 
                        intensity={timerFinished ? 0.6 : 0.2 } 
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.333}
                    />
                    <ChromaticAberration 
                        offset={[0.0005, 0.0005]} 
                        radialModulation={true}
                        modulationOffset={0.25}
                    />
                    {timerFinished ?? (
                        <GodRays
                            sun={sunRef}
                            blendFunction={BlendFunction.SCREEN}
                            samples={10}
                            density={0.6}
                            decay={0.2}
                            weight={0.46}
                            exposure={0.46}
                            clampMax={0.5}
                            blur={true}
                        />
                    )}
                </EffectComposer>
            )}
        </scene>
    );
}
