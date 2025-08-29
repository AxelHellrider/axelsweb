import React, { useRef, useMemo } from "react";
import { Points } from "three";
import { useFrame } from "@react-three/fiber";

interface ParticleBackgroundProps {
    enabled: boolean;
}

export default function ParticleBackground({ enabled }: ParticleBackgroundProps) {
    const pointsRef = useRef<Points>(null!);

    // Generate random particle positions
    const positions = useMemo(() => {
        const arr = [];
        const count = 1000;
        for (let i = 0; i < count; i++) {
            arr.push(
                (Math.random() - 0.5) * 40, // x
                (Math.random() - 0.5) * 40, // y
                (Math.random() - 0.5) * 40  // z
            );
        }
        return new Float32Array(arr);
    }, []);

    useFrame((_, delta) => {
        if (pointsRef.current && enabled) {
            pointsRef.current.rotation.y += delta * 0.02; // slow rotation
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial color={0x88aaff} size={0.025} sizeAttenuation />
        </points>
    );
}
