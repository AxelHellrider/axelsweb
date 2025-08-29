"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SceneComposition from "./SceneComposition";
import MobileUtil from "../hooks/MobileUtil";
import Dialog from "@/components/Dialog";
import SectionCard from "@/components/SectionCard";

export default function HeroSection() {
    const [timerFinished, setTimerFinished] = useState(false);
    const [hovered, setHovered] = useState<{ title: string; description: string } | null>(null);
    const isMobile = MobileUtil();

    useEffect(() => {
        const timer = setTimeout(() => setTimerFinished(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-full relative">
            <div className="absolute bottom-0 w-[stretch] my-6 mx-10 md:mx-20 lg:mx-40 z-10">
                <Dialog hovered={hovered}/>
            </div>

            <div className="absolute top-10 left-10 flex flex-col gap-4 z-20">
                <SectionCard
                    title="Portfolio"
                    description="Explore my works and projects."
                    view="portfolio"
                    onHover={(data) => setHovered(data)}
                    onLeave={() => setHovered(null)}
                />
                <SectionCard
                    title="Contact"
                    description="Get in touch with me."
                    view="contact"
                    onHover={(data) => setHovered(data)}
                    onLeave={() => setHovered(null)}
                />
                <SectionCard
                    title="About"
                    description="Learn more about my journey."
                    view="about"
                    onHover={(data) => setHovered(data)}
                    onLeave={() => setHovered(null)}
                />
            </div>

            <Canvas camera={{position: [0, 0, 6], fov: 50}} shadows>
                <color attach="background" args={["#000"]}/>
                <SceneComposition timerFinished={timerFinished} enablePostProcessing={!isMobile}/>
            </Canvas>
        </div>

    );
}
