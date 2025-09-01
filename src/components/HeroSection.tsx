"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import SceneComposition from "./SceneComposition";
import MobileUtil from "@/hooks/MobileUtil";
import Dialog from "@/components/Dialog";
import SectionCard from "@/components/SectionCard";

import AboutView from "@/views/AboutView";
import PortfolioView from "@/views/PortfolioView";
import ViewsHost from "@/views/ViewsHost";
import { ViewType } from "@/views/ViewTypes";

/** Container and card animations */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { delayChildren: 1, staggerChildren: 0.3 },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.3, staggerDirection: -1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
};


export default function HeroSection() {
    type ViewKey = "menu" | "about" | "portfolio" | "contact";
    type ViewRegistry = Record<string, React.ComponentType<object>>;

    const registry: ViewRegistry = {
        // @ts-expect-error
        about: AboutView,
        // @ts-expect-error
        portfolio: PortfolioView,
    };

    const [timerFinished, setTimerFinished] = useState(false);
    const [hovered, setHovered] = useState<{ title: string; description: string } | null>(null);
    const [currentView, setCurrentView] = useState<"menu" | "about" | "portfolio" | "contact">(
        "menu"
    );

    const isMobile = MobileUtil();

    useEffect(() => {
        const timer = setTimeout(() => setTimerFinished(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const cards = [
        { title: "Portfolio", description: "Explore my works.", view: "portfolio" as ViewKey },
        { title: "Contact", description: "Get in touch.", view: "contact" as ViewKey },
        { title: "About", description: "Learn more.", view: "about" as ViewKey },
    ];

    const div = <>
        <div className="w-full h-full relative">
            {/* Dialog */}
            {currentView === "menu" && (
                <div className="absolute bottom-0 w-[stretch] my-6 mx-10 md:mx-20 lg:mx-40 z-10">
                    <Dialog hovered={hovered}/>
                </div>
            )}

            {/* Cards container */}
            <AnimatePresence mode="wait">
                {currentView === "menu" && (
                    <motion.div
                        key="cards-container"
                        className="absolute top-10 left-10 flex flex-col gap-4 z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        {cards.map((c) => (
                            <motion.div key={c.view} variants={cardVariants}>
                                <SectionCard
                                    title={c.title}
                                    description={c.description}
                                    view={c.view}
                                    onHover={(data) => setHovered(data)}
                                    onLeave={() => setHovered(null)}
                                    fn={() => setCurrentView(c.view as "about" | "portfolio" | "contact")}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Views layer */}
            {currentView !== "menu" && (
                <ViewsHost
                    current={currentView as ViewType}
                    onBack={() => setCurrentView("menu")}
                    registry={registry}
                    keepAlive={false}
                />
            )}

            {/* 3D Canvas */}
            <Canvas camera={{position: [0, 0, 6], fov: 50}} shadows>
                <color attach="background" args={["#000"]}/>
                <SceneComposition timerFinished={timerFinished} enablePostProcessing={!isMobile}/>
            </Canvas>
        </div>
    </>;
    return div;
}
