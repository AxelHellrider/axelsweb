"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// --- Crystal core shader ---
const CrystalShaderMaterial = shaderMaterial(
    { time: 0, intensity: 1, coreRadius: 0.05, fadeRadius: 0.1 },
    `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
    `
  precision mediump float;
  varying vec3 vPosition;
  uniform float time;
  uniform float intensity;
  uniform float coreRadius;
  uniform float fadeRadius;

  void main() {
    float dist = length(vPosition);

    vec3 coreColor = vec3(1.0,1.0,1.0);
    vec3 auraColor = vec3(0.2,0.6,1.0);

    float core = smoothstep(coreRadius, 0.0, dist);
    float aura = smoothstep(coreRadius, fadeRadius, dist);
    vec3 color = mix(coreColor, auraColor, aura);
    color = mix(color, coreColor, core*0.8);

    float pulse = 0.01 * sin(time*2.0) * (1.0 - dist);
    color += pulse;

    gl_FragColor = vec4(color*intensity, 1.0);
  }
  `
);

// --- Fresnel rim shader ---
const FresnelShaderMaterial = shaderMaterial(
    { time: 0, rimPower: 2.5, rimIntensity: 1.5 },
    `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position,1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
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
    float fresnel = pow(1.0 - max(dot(viewDir,vNormal),0.0), rimPower);
    vec3 rimColor = vec3(0.2,0.8,1.0) * rimIntensity;
    float pulse = 0.6 + 0.4 * sin(time*1.5);
    gl_FragColor = vec4(rimColor * fresnel * pulse, fresnel*0.8);
  }
  `
);

extend({ CrystalShaderMaterial, FresnelShaderMaterial });

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
    const coreRefs = useRef<THREE.ShaderMaterial[]>([]);
    const rimRefs = useRef<THREE.ShaderMaterial[]>([]);

    useEffect(() => {
        coreRefs.current = [];
        rimRefs.current = [];

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const coreMat = new CrystalShaderMaterial();
                const rimMat = new FresnelShaderMaterial();

                coreRefs.current.push(coreMat);
                rimRefs.current.push(rimMat);

                // assign array safely
                mesh.material = [coreMat, rimMat] as unknown as THREE.Material;
            }
        });
    }, [scene]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        coreRefs.current.forEach((m) => (m.uniforms.time.value = t));
        rimRefs.current.forEach((m) => (m.uniforms.time.value = t));
        if (scene) scene.rotation.y += 0.002;
    });

    return <primitive object={scene} />;
}
