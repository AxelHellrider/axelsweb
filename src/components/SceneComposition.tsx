import React from "react";
import CrystalModel from "./CrystalModel";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";

interface SceneContentProps {
    timerFinished: boolean;
    enablePostProcessing?: boolean;
}

export default function SceneContent({ timerFinished, enablePostProcessing = true }: SceneContentProps) {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 3.4, 0]} intensity={1.5} color="#88aaff" />
            <directionalLight position={[-10, -3.4, 0]} intensity={1.5} color="#77d8ce" />

            <CrystalModel url="/models/crystal3.glb" timerFinished={timerFinished} color="#fff" roughnessTarget={0.25} />

            <EffectComposer enableNormalPass>
                <SSAO samples={!enablePostProcessing ? 16 : 4} radius={0.5} intensity={!enablePostProcessing ? 20 : 5} />
                <Bloom mipmapBlur intensity={!enablePostProcessing ? 0.6 : 0.2} luminanceThreshold={0.2} />
            </EffectComposer>
        </>
    );
}
