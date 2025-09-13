"use client";
import React, { useEffect, useState } from "react";

/**
 * UIChromeController shows a small floating toggle button that hides/shows
 * all UI chrome (header, footer, nav, overlays) by toggling a CSS class
 * on the <body>. It is positioned to avoid covering content and remains
 * accessible even when chrome is hidden.
 */
export default function UIChromeController() {
  const [hidden, setHidden] = useState(false);

  // Initialize from persisted preference
  useEffect(() => {
    try {
      const v = localStorage.getItem("uiHidden");
      if (v === "1") {
        document.body.classList.add("ui-hidden");
        setHidden(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Toggle with Shift+H for power users
      if (e.key.toLowerCase() === "h" && e.shiftKey) {
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => {
    const next = !hidden;
    setHidden(next);
    document.body.classList.toggle("ui-hidden", next);
    try {
      localStorage.setItem("uiHidden", next ? "1" : "0");
    } catch {}
  };

  return (
    <div className="fixed right-3 bottom-20 z-30">
      <button
        type="button"
        aria-pressed={hidden}
        aria-label={hidden ? "Show interface" : "Hide interface"}
        onClick={toggle}
        className="pointer-events-auto select-none inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_16px_rgba(0,150,255,0.25)] px-3 py-2 text-xs text-white/90 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
      >
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: hidden ? "#38bdf8" : "#94a3b8" }} />
        {hidden ? "UI Hidden (Shift+H)" : "Hide UI (Shift+H)"}
      </button>
    </div>
  );
}