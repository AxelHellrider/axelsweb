"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import CrystalModel from "./CrystalModel";
import ParticleBackground from "./ParticleBackground";
import { EffectComposer, Bloom, SSAO, ChromaticAberration, GodRays } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { randFloat } from "three/src/math/MathUtils.js";

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
  viewport = "desktop"
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

  // Reusable vectors to avoid per-frame allocations
  const vCamPos = useMemo(() => new THREE.Vector3(), []);
  const vDir = useMemo(() => new THREE.Vector3(), []);
  const vRight = useMemo(() => new THREE.Vector3(), []);
  const vUp = useMemo(() => new THREE.Vector3(), []);
  const vCrystalPos = useMemo(() => new THREE.Vector3(), []);
  const vTempA = useMemo(() => new THREE.Vector3(), []);
  const vTempB = useMemo(() => new THREE.Vector3(), []);
  const lateralOffsets = useMemo(() => [-0.35, 0, 0.35] as const, []);
  const forwardOffset = 0.25;
  const yOffsets = useMemo(() => ([-0.25 * crystalHeight, 0, 0.25 * crystalHeight] as const), [crystalHeight]);

  // Throttle subtle spotlight updates via a ref (avoid React state re-renders)
  const tickRef = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (pointLight.current) {
      pointLight.current.intensity = 5 + Math.sin(t * 2) * 2;
    }

    if (sunRef.current && crystalTarget) {
      sunRef.current.position.copy(crystalTarget.position);
    }

    if (crystalTarget) {
      const cam = state.camera as THREE.Camera & { up: THREE.Vector3 };

      // Camera basis vectors
      cam.getWorldPosition(vCamPos);
      cam.getWorldDirection(vDir).normalize();
      vUp.copy(cam.up).normalize();
      vRight.crossVectors(vDir, vUp).normalize();

      // Crystal world position
      crystalTarget.getWorldPosition(vCrystalPos);

      [spot1, spot2, spot3].forEach((spotRef, i) => {
        const spot = spotRef.current;
        if (!spot) return;
        // Only update spotlight positions every other frame on mobile to reduce jank
        if (isMobile && tickRef.current % 2 !== 0) return;

        // pos = camPos + right * lateralOffset + dir * forwardOffset
        vTempA.copy(vRight).multiplyScalar(lateralOffsets[i] ?? 0);
        vTempB.copy(vDir).multiplyScalar(forwardOffset);
        spot.position.copy(vCamPos).add(vTempA).add(vTempB);

        spot.target.position.set(
          vCrystalPos.x,
          vCrystalPos.y + (yOffsets[i] ?? 0),
          vCrystalPos.z
        );
        spot.target.updateMatrixWorld();
      });

      if (isMobile) tickRef.current = (tickRef.current + 1) % 60;
    }
  });

  // Layout and animation adjustments
  const crystalGroupRef = useRef<THREE.Group>(null!);

  // Particle and effect tuning by viewport
  const particleProps = {
    count: 500,
    rotation: 0.02,
    color: 0xaad4ff,
  };
  

  // Spotlight intensity tuning per device
  const spotIntensity = 26;

  // Post-processing quality tiers
  const ssaoSamples = 24;
  const ssaoIntensity = 12;
  const bloomIntensity = 0.25;
  const chromaOffset: [number, number] = [0.0005, 0.0005];
  const godraySamples = 32;
  const godrayWeights = 0.333;
  const ssaoColor = useMemo(() => new THREE.Color("#020630"), []);

  return (
    <scene ref={sceneRef}>
      <group ref={crystalGroupRef}>
        {/* Point light inside crystal for internal glow */}
        <pointLight
          ref={pointLight}
          position={[0, 0, 0]}
          intensity={4}
          color="#a1e4fd"
          distance={2}
          decay={2.5}
        />

        {/* Invisible mesh for GodRays light source */}
        <mesh ref={sunRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.0125, 8, 8]} />
          <meshBasicMaterial color="#0b387a" transparent opacity={0} />
        </mesh>

        {/* Crystal */}
        <CrystalModel url="/models/crystal6.glb" timerFinished={timerFinished} isMobile={isMobile} />
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
      <ParticleBackground enabled={timerFinished} count={particleProps.count} rotationSpeed={particleProps.rotation} color={particleProps.color} />

      {/* Enhanced Postprocessing */}
      {enablePostProcessing && (
        <EffectComposer multisampling={2} enableNormalPass={true}>
          <SSAO
            samples={ssaoSamples}
            radius={0.6}
            intensity={ssaoIntensity}
            luminanceInfluence={0.7}
            color={ssaoColor}
          ></SSAO>
          <Bloom
            mipmapBlur={false}
            intensity={bloomIntensity}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.75}
          />
          <ChromaticAberration
            offset={chromaOffset}
            radialModulation={true}
            modulationOffset={0.5}
          />
          <GodRays
            sun={sunRef}
            blendFunction={BlendFunction.SCREEN}
            samples={isMobile ? 16 : godraySamples}
            density={isMobile ? 0.6 : 0.85}
            decay={isMobile ? 0.8 : 0.9}
            weight={timerFinished ? (isMobile ? 0.2 : godrayWeights) : 0}
            exposure={timerFinished ? (isMobile ? 0.2 : godrayWeights) : 0}
            clampMax={1}
            blur={true}
          />
        </EffectComposer>
      )}
    </scene>
  );
}
