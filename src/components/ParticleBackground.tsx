"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { randFloat } from "three/src/math/MathUtils.js";

interface ParticleBackgroundProps {
  enabled: boolean;
  count?: number;
  rotationSpeed?: number;
  color?: THREE.ColorRepresentation;
}

export default function ParticleBackground({
  enabled,
  count = 1000,
  rotationSpeed = 0.02,
  color = 0x88aaff,
}: ParticleBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Precompute positions once per count to avoid allocations and preserve original cube distribution
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!enabled || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <points ref={pointsRef} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={randFloat(0.025, 0.0300)}
        sizeAttenuation
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
