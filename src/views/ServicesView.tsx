"use client";
import React from "react";


const SERVICES = [
    {
        title: "Frontend Web Apps",
        desc: "Fast, accessible, and delightful SPAs/MPAs built with React and Next.js.",
    },
    {
        title: "3D Rendering for Data Visuals",
        desc: "Interactive Three.js/R3F scenes that turn complex data into intuitive visuals.",
    },
    {
        title: "Gamified Experiences",
        desc: "Gamified experiences based on real data or just pure fun.",
    },
    {
        title: "Custom Landing Pages",
        desc: "High-converting, brand-aligned pages with motion and subtle 3D accents.",
    },
    {
        title: "GPT‑discoverable Websites",
        desc: "Content and structure designed to be easily navigated by AI agents.",
    },
] as const;

export default function ServicesView() {
    return (
        <div className="h-full overflow-auto flex flex-col items-stretch gap-y-3 text-white p-4 sm:p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Services</h1>
                    <p className="text-sm md:text-base text-white/80 mt-1">What I can help you build.</p>
                </div>
            </div>
            <div
                className="w-full">
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    <ul role="list" aria-label="Services offered" className="contents">
                        {SERVICES.map((s) => (
                            <li key={s.title} className="contents">
                                <div
                                    className="select-none group rounded-xl p-4 md:p-5 ring-1 ring-white/10 bg-black/60 hover:bg-black/45 transition shadow-[0_0_20px_rgba(0,150,255,0.15)] focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
                                    tabIndex={0}
                                    role="listitem"
                                    aria-label={s.title}
                                >
                                    <div
                                        className="text-base md:text-lg font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
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
    );
}