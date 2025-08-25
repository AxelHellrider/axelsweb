"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SceneComposition from "./SceneComposition";
import MobileUtil from "../hooks/MobileUtil";

export default function HeroSection() {
    const [timerFinished, setTimerFinished] = useState(false);
    const isMobile = MobileUtil(); // hook instead of inline check

    useEffect(() => {
        const timer = setTimeout(() => setTimerFinished(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-screen">
            <div className="absolute top-0 p-5 z-1 flex flex-col">
                <span className="ffxiv-font ffxiv-font-shadow uppercase text-center text-[22px]">Axel&apos;s Web</span>
                <span className="ffxiv-font text-center text-[15px]">Where the digital realm is shaped</span>
            </div>
            <Canvas camera={{position: [0, 0, 6], fov: 50}} shadows>
                <color attach="background" args={["#000"]}/>
                <SceneComposition timerFinished={timerFinished} enablePostProcessing={!isMobile}/>
            </Canvas>
        </div>
    );
}
