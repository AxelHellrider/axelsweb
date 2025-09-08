import React, {useRef, useMemo} from "react";
import {AdditiveBlending, Points, type ColorRepresentation} from "three";
import { useFrame } from "@react-three/fiber";

interface ParticleBackgroundProps {
    enabled: boolean;
    count?: number;
    rotationSpeed?: number;
    color?: ColorRepresentation;
    size?: number;
}

export default function ParticleBackground({ enabled, count = 1000, rotationSpeed = 0.02, color = 0x88aaff, size = 0.025 }: ParticleBackgroundProps) {
    const pointsRef = useRef<Points>(null!);
    const positions = useMemo(() => {
        const arr:number[] = [];
        for (let i = 0; i < count; i++) {
            arr.push(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40 
            );
        }
        return new Float32Array(arr);
    }, [count]);

    useFrame((_, delta) => {
        if (pointsRef.current && enabled) pointsRef.current.rotation.y += delta * rotationSpeed;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial color={color} size={size} sizeAttenuation={true} transparent={true} blending={AdditiveBlending} />
        </points>
    );
}
