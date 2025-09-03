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
    // Track crystal height for vertical targeting
    const [crystalHeight, setCrystalHeight] = useState<number>(1.5);

    useEffect(() => {
        if (!sceneRef.current) return;
        const obj = sceneRef.current.getObjectByName("crystal");
        if (obj) {
            setCrystalTarget(obj);
            // Compute crystal bounding height for target offsets
            const box = new THREE.Box3().setFromObject(obj);
            const size = new THREE.Vector3();
            box.getSize(size);
            if (size.y && isFinite(size.y)) {
                setCrystalHeight(size.y);
            }
        }
    }, [timerFinished]);

    // Ensure spotlight targets are part of the scene graph
    useEffect(() => {
        if (!sceneRef.current) return;
        [spot1, spot2, spot3].forEach((s) => {
            if (s.current && s.current.target && s.current.target.parent !== sceneRef.current) {
                sceneRef.current.add(s.current.target);
            }
        });
    }, []);

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
            // Anchor spotlights to camera and aim at different crystal heights
            const cam = state.camera;
            const camPos = new THREE.Vector3();
            const dir = new THREE.Vector3();
            const right = new THREE.Vector3();
            const up = new THREE.Vector3();
            cam.getWorldPosition(camPos);
            cam.getWorldDirection(dir).normalize();
            up.copy(cam.up).normalize();
            right.copy(new THREE.Vector3().crossVectors(dir, up)).normalize();

            const lateralOffsets = [-0.35, 0, 0.35];
            const forwardOffset = 0.25; // push slightly forward from camera to avoid near clipping

            const crystalPos = new THREE.Vector3();
            crystalTarget.getWorldPosition(crystalPos);
            const yOffsets = [-0.25 * crystalHeight, 0, 0.25 * crystalHeight];

            [spot1, spot2, spot3].forEach((spotRef, i) => {
                const spot = spotRef.current;
                if (!spot) return;
                // Place near camera with small lateral spread and forward push
                const pos = camPos.clone()
                    .add(right.clone().multiplyScalar(lateralOffsets[i] ?? 0))
                    .add(dir.clone().multiplyScalar(forwardOffset));
                spot.position.copy(pos);
                // Aim at different vertical slices of the crystal
                spot.target.position.set(
                    crystalPos.x,
                    crystalPos.y + (yOffsets[i] ?? 0),
                    crystalPos.z
                );
                spot.target.updateMatrixWorld();
            });
        }
    });

    return (
        <scene ref={sceneRef}>
            
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
                <sphereGeometry args={[0.0125, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0} />
            </mesh>
            
            {/* Spotlights with enhanced colors */}
            <spotLight
                ref={spot1}
                position={[2, 5, -2]}
                angle={0.6}
                penumbra={0}
                intensity={30}
                color={"#a1e4fd"}
                distance={50}
                castShadow
            />

            <spotLight
                ref={spot2}
                position={[-2, 0, -2]}
                angle={0.6}
                penumbra={0}
                intensity={30}
                color={"#0b387a"}
                distance={50}
                castShadow
            />

            <spotLight
                ref={spot3}
                position={[2, -5, -2]}
                angle={0.6}
                penumbra={0}
                intensity={30}
                color={"#14c6c6"}
                distance={50}
                castShadow
            />

            {/* Crystal */}
            <CrystalModel url="/models/crystal6.glb" timerFinished={timerFinished} />

            {/* Particle background */}
            <ParticleBackground enabled={timerFinished} />

            {/* Enhanced Postprocessing */}
            {enablePostProcessing && (
                <EffectComposer multisampling={4} enableNormalPass>
                    <SSAO 
                        samples={timerFinished ? 30 : 15} 
                        radius={0.6} 
                        intensity={timerFinished ? 24 : 12}
                        luminanceInfluence={0.7}
                        color={new THREE.Color("#0000ff")}
                    />
                    <Bloom 
                        mipmapBlur 
                        intensity={timerFinished ? 0.6 : 0.2 } 
                        luminanceThreshold={0.3}
                        luminanceSmoothing={0.9}
                    />
                    <ChromaticAberration 
                        offset={[0.0005, 0.0005]} 
                        radialModulation={true}
                        modulationOffset={0.5}
                    />
                    <GodRays
                        sun={sunRef}
                        blendFunction={BlendFunction.SCREEN}
                        samples={64}
                        density={0.9}
                        decay={0.92}
                        weight={timerFinished ? 0.6 : 0}
                        exposure={timerFinished ? 0.6 : 0}
                        clampMax={1}
                        blur={true}
                    />
                </EffectComposer>
            )}
        </scene>
    );
}
