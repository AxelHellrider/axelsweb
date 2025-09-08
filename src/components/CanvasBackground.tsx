"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SceneComposition from "@/components/SceneComposition";
import MobileUtil from "@/hooks/MobileUtil";
import { usePathname } from "next/navigation";

export default function CanvasBackground() {
  const isMobile = MobileUtil();
  const [timerFinished, setTimerFinished] = useState(false);
  const pathname = usePathname();
  const layout: "default" | "contact" = pathname?.startsWith("/contact") ? "contact" : "default";
  
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

  // Camera settings per viewport
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

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas className="absolute inset-0" camera={cameraSettings} shadows>
        <color attach="background" args={["#000"]} />
        <SceneComposition
          compositionLayout={layout}
          timerFinished={timerFinished}
          enablePostProcessing={!isMobile}
          isMobile={isMobile}
          viewport={viewport}
        />
      </Canvas>
    </div>
  );
}