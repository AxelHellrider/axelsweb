import React from "react";
import CrystalModel from "./CrystalModel";
import ParticleBackground from "./ParticleBackground";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";

interface SceneContentProps {
    timerFinished: boolean;
    enablePostProcessing?: boolean;
}

export default function SceneComposition({timerFinished, enablePostProcessing = true,}: SceneContentProps) {
    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 3.4, 0]} intensity={5} color="#88aaff" />
            <directionalLight position={[-10, -3.4, 0]} intensity={5} color="#77d8ce" />

            {/* Crystal */}
            <CrystalModel
                url="/models/crystal4.glb"
                timerFinished={timerFinished}
                color="#010101"
            />

            {/* Particle background */}
            <ParticleBackground enabled={timerFinished} />

            {/* Postprocessing */}
            {enablePostProcessing && (
                <EffectComposer enableNormalPass>
                    <SSAO samples={timerFinished ? 25 : 8} radius={1} intensity={timerFinished ? 30 : 10} />
                    <Bloom mipmapBlur intensity={timerFinished ? 0.85 : 0.25} luminanceThreshold={0.3} />
                </EffectComposer>
            )}
        </>
    );
}
