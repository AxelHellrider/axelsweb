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
            <directionalLight position={[10, 3.4, 0]} intensity={1.5} color="#88aaff" />
            <directionalLight position={[-10, -3.4, 0]} intensity={1.5} color="#77d8ce" />

            {/* Crystal */}
            <CrystalModel
                url="/models/crystal3.glb"
                timerFinished={timerFinished}
                color="#fff"
                roughnessTarget={0.25}
            />

            {/* Particle background */}
            <ParticleBackground enabled={timerFinished} />

            {/* Postprocessing */}
            {enablePostProcessing && (
                <EffectComposer enableNormalPass>
                    <SSAO samples={timerFinished ? 16 : 4} radius={0.5} intensity={timerFinished ? 20 : 5} />
                    <Bloom mipmapBlur intensity={timerFinished ? 0.6 : 0.2} luminanceThreshold={0.2} />
                </EffectComposer>
            )}
        </>
    );
}
