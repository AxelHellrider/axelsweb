import React from "react";
import ViewShell from "./ViewsShell";
import type { ViewProps } from "./ViewTypes";

export default function ServicesView({ onBack }: ViewProps) {
  const services = [
    {
      title: "Frontend Web Apps",
      desc: "Fast, accessible, and delightful SPAs/MPAs built with React and Next.js.",
    },
    {
      title: "3D Rendering for Data Visuals",
      desc: "Interactive Three.js/R3F scenes that turn complex data into intuitive visuals.",
    },
    {
      title: "Custom Landing Pages",
      desc: "High-converting, brand-aligned pages with motion and subtle 3D accents.",
    },
    {
      title: "GPT‑discoverable Websites",
      desc: "Content and structure designed to be easily navigated by AI agents.",
    },
  ];

  return (
    <ViewShell onBack={onBack}>
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white p-4 sm:p-5 md:p-6">
        <div className="rounded-2xl p-5 md:p-6 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.2)] max-w-4xl w-full">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Services</h1>
              <p className="text-sm md:text-base text-white/80 mt-1">What I can help you build.</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 md:py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)] focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
            >
              ← Back
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            <ul role="list" aria-label="Service offerings" className="contents">
              {services.map((s) => (
                <li key={s.title} className="contents">
                  <div
                    className="group rounded-xl p-4 md:p-5 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition shadow-[0_0_20px_rgba(0,150,255,0.15)] focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
                    tabIndex={0}
                    role="listitem"
                    aria-label={s.title}
                  >
                    <div className="text-base md:text-lg font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                      {s.title}
                    </div>
                    <div className="text-xs md:text-sm text-white/80 mt-1">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ViewShell>
  );
}