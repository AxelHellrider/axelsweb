"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// --- Shader Material ---
const CrystalShaderMaterial = shaderMaterial(
    { time: 0, intensity: 1 },
    `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    `
    precision mediump float;
    varying vec3 vPosition;
    uniform float time;
    uniform float intensity;

    void main() {
      float dist = length(vPosition);

      // core + aura radii
      float coreRadius = 0.05;   // inner heart
      float fadeRadius = 0.1;   // outer aura fade

      vec3 coreColor = vec3(1.0, 1.0, 1.0);   // white heart
      vec3 outerColor = vec3(0.2, 0.6, 1.0);  // blue aura

      // white core intensity
      float core = smoothstep(coreRadius, 0.0, dist);

      // aura fade
      float aura = smoothstep(coreRadius, fadeRadius, dist);

      // blend aura over core
      vec3 color = mix(coreColor, outerColor, aura);

      // reinforce white at center
      color = mix(color, coreColor, core * 0.8);

      // subtle shimmer pulse
      float pulse = 0.01 * sin(time * 2.0) * (1.0 - dist);
      color += pulse;

      gl_FragColor = vec4(color * intensity, 1.0);
    }
  `
);

extend({ CrystalShaderMaterial });

// --- Fresnel Rim Shader ---
const FresnelShaderMaterial = shaderMaterial(
    { time: 0, rimPower: 2.0, rimIntensity: 1.2 },
    `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    `
    precision mediump float;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    uniform float time;
    uniform float rimPower;
    uniform float rimIntensity;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), rimPower);
      vec3 rimColor = vec3(0.2, 0.8, 1.0) * rimIntensity;
      float pulse = 0.6 + 0.4 * sin(time * 1.5);
      gl_FragColor = vec4(rimColor * fresnel * pulse, fresnel * 0.8);
    }
  `
);

extend({ FresnelShaderMaterial });


// --- CrystalModel Component ---
interface CrystalModelProps {
    url: string;
    timerFinished: boolean;
    intensity?: number;
}

export default function CrystalModel({
                                         url,
                                         intensity = 1,
                                     }: CrystalModelProps) {
    const { scene } = useGLTF(url);
    const matRef = useRef<any>();

    useEffect(() => {
        // assign shader material to all meshes
        scene.traverse((child: any) => {
            if (child.isMesh) child.material = matRef.current;
        });
    }, [scene]);

    useFrame(({ clock }) => {
        if (matRef.current) matRef.current.time = clock.getElapsedTime();
        if (scene) scene.rotation.y += 0.002;
    });

    return (
        <>
            <primitive object={scene} />
            <crystalShaderMaterial ref={matRef} intensity={intensity} />
        </>
    );
}
