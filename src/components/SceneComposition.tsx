"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import CrystalModel from "./CrystalModel";
import ParticleBackground from "./ParticleBackground";
import { EffectComposer, Bloom, SSAO, ChromaticAberration, GodRays } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface SceneContentProps {
  timerFinished: boolean;
  enablePostProcessing?: boolean;
  isMobile?: boolean;
  viewport?: "mobile" | "tablet" | "desktop";
  isHome?: boolean;
}

export default function SceneComposition({
  timerFinished,
  enablePostProcessing = true,
  isMobile = false,
  viewport = "desktop",
}: SceneContentProps) {
  const sceneRef = useRef<THREE.Scene>(null!);
  const spot1 = useRef<THREE.SpotLight>(null!);
  const spot2 = useRef<THREE.SpotLight>(null!);
  const spot3 = useRef<THREE.SpotLight>(null!);
  const pointLight = useRef<THREE.PointLight>(null!);
  const [crystalTarget, setCrystalTarget] = useState<THREE.Object3D | null>(null);
  const sunRef = useRef<THREE.Mesh>(null!);
  const [crystalHeight, setCrystalHeight] = useState<number>(1.5);

  useEffect(() => {
    if (!sceneRef.current) return;
    const obj = sceneRef.current.getObjectByName("crystal");
    if (obj) {
      setCrystalTarget(obj);
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.y && isFinite(size.y)) setCrystalHeight(size.y);
    }
  }, [timerFinished]);

  useEffect(() => {
    if (!sceneRef.current) return;
    [spot1, spot2, spot3].forEach((s) => {
      if (s.current && s.current.target && s.current.target.parent !== sceneRef.current) {
        sceneRef.current.add(s.current.target);
      }
    });
  }, []);

  // Throttle subtle updates to reduce CPU on low-end devices
  const [tick, setTick] = useState(0);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (pointLight.current) {
      pointLight.current.intensity = 5 + Math.sin(t * 2) * 2;
    }

    if (sunRef.current && crystalTarget) {
      sunRef.current.position.copy(crystalTarget.position);
    }

    if (crystalTarget) {
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
      const forwardOffset = 0.25;

      const crystalPos = new THREE.Vector3();
      crystalTarget.getWorldPosition(crystalPos);
      const yOffsets = [-0.25 * crystalHeight, 0, 0.25 * crystalHeight];

      [spot1, spot2, spot3].forEach((spotRef, i) => {
        const spot = spotRef.current;
        if (!spot) return;
        // Only update spotlight positions every other frame on mobile to reduce jank
        if (isMobile && tick % 2 !== 0) return;
        const pos = camPos
          .clone()
          .add(right.clone().multiplyScalar(lateralOffsets[i] ?? 0))
          .add(dir.clone().multiplyScalar(forwardOffset));
        spot.position.copy(pos);
        spot.target.position.set(
          crystalPos.x,
          crystalPos.y + (yOffsets[i] ?? 0),
          crystalPos.z
        );
        spot.target.updateMatrixWorld();
      });
      if (isMobile) setTick((v) => (v + 1) % 60);
    }
  });

  // Layout and animation adjustments
  const crystalGroupRef = useRef<THREE.Group>(null!);

  // Particle and effect tuning by viewport
  const particleCount = useMemo(() => (viewport === "mobile" ? 200 : viewport === "tablet" ? 500 : 1000), [viewport]);
  const particleRotation = isMobile ? 0.015 : 0.02;
  const particleColor = isMobile ? 0xaad4ff : 0x88aaff; // brighter blue on mobile
  const particleSize = isMobile ? 0.03 : 0.025; // slightly bigger on mobile

  // Spotlight intensity tuning per device
  const spotIntensity = isMobile ? 14 : 26;

  // Post-processing quality tiers
  const ssaoSamples = viewport === "mobile" ? 8 : viewport === "tablet" ? 16 : 30;
  const ssaoIntensity = viewport === "mobile" ? 10 : viewport === "tablet" ? 18 : 24;
  const bloomIntensity = viewport === "mobile" ? 0.35 : viewport === "tablet" ? 0.5 : 0.6;
  const chromaOffset: [number, number] = viewport === "mobile" ? [0.00025, 0.00025] : [0.0005, 0.0005];
  const godraySamples = viewport === "mobile" ? 24 : viewport === "tablet" ? 48 : 64;
  const godrayWeights = viewport === "mobile" ? 0.35 : viewport === "tablet" ? 0.5 : 0.6;

  return (
    <scene ref={sceneRef}>
      <group ref={crystalGroupRef}>
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

        {/* Crystal */}
        <CrystalModel url="/models/crystal6.glb" timerFinished={timerFinished} />
      </group>

      {/* Spotlights with enhanced colors */}
      <spotLight
        ref={spot1}
        position={[2, 5, -2]}
        angle={0.6}
        penumbra={0}
        intensity={spotIntensity}
        color={"#a1e4fd"}
        distance={50}
        castShadow={!isMobile}
      />

      <spotLight
        ref={spot2}
        position={[-2, 0, -2]}
        angle={0.6}
        penumbra={0}
        intensity={spotIntensity}
        color={"#0b387a"}
        distance={50}
        castShadow={!isMobile}
      />

      <spotLight
        ref={spot3}
        position={[2, -5, -2]}
        angle={0.6}
        penumbra={0}
        intensity={spotIntensity}
        color={"#14c6c6"}
        distance={50}
        castShadow={!isMobile}
      />

      {/* Particle background */}
      <ParticleBackground enabled={timerFinished} count={particleCount} rotationSpeed={particleRotation} color={particleColor} size={particleSize} />

      {/* Enhanced Postprocessing */}
      {enablePostProcessing && (
        <EffectComposer multisampling={isMobile ? 0 : 2} enableNormalPass={!isMobile}>
          {!isMobile ? (
            <SSAO
              samples={ssaoSamples}
              radius={0.6}
              intensity={ssaoIntensity}
              luminanceInfluence={0.7}
              color={new THREE.Color("#0000ff")}
            ></SSAO>
          ) : <></>}
          <Bloom
            mipmapBlur={!isMobile}
            intensity={bloomIntensity}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
          />
          {!isMobile ? (
            <ChromaticAberration
              offset={chromaOffset}
              radialModulation={true}
              modulationOffset={0.5}
            />
          ) : (
            <GodRays
              sun={sunRef}
              blendFunction={BlendFunction.SCREEN}
              samples={godraySamples}
              density={0.85}
              decay={0.9}
              weight={timerFinished ? godrayWeights : 0}
              exposure={timerFinished ? godrayWeights : 0}
              clampMax={1}
              blur={true}
            />
          )}
        </EffectComposer>
      )}
    </scene>
  );
}
