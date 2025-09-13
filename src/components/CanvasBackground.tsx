"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SceneComposition from "@/components/SceneComposition";
import { AdaptiveDpr } from "@react-three/drei";

const useIsMobile = (bp: number = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= bp);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return isMobile;
};

export default function CanvasBackground() {
  const isMobile = useIsMobile();
  const [timerFinished, setTimerFinished] = useState(false);
  const [showPerf, setShowPerf] = useState(false);

  // Determine viewport breakpoint
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Camera settings per viewport (preserve visuals)
  const cameraSettings = useMemo(() => {
    switch (viewport) {
      case "mobile":
        return { position: [0, 0, 8.5] as [number, number, number], fov: 60 };
      case "tablet":
        return { position: [0, 0, 7.5] as [number, number, number], fov: 55 };
      default:
        return { position: [0, 0, 6] as [number, number, number], fov: 50 };
    }
  }, [viewport]);

  useEffect(() => {
    const t = setTimeout(() => setTimerFinished(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        setShowPerf((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const glProps = useMemo(
    () => ({
      antialias: !isMobile,
      powerPreference: "high-performance" as const,
      alpha: true,
      premultipliedAlpha: true,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    }),
    [isMobile]
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        className="absolute inset-0"
        camera={cameraSettings}
        shadows={!isMobile}
        dpr={isMobile ? ([1, 1.25] as [number, number]) : ([1, 2] as [number, number])}
        gl={glProps}
      >
        <color attach="background" args={["#000"]} />
        <SceneComposition
          timerFinished={timerFinished}
          enablePostProcessing={!isMobile}
          isMobile={isMobile}
          viewport={viewport}
          showPerf={showPerf}
        />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}