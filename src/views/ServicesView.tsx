"use client";
import React from "react";
import {SERVICES} from "@/constants/SERVICES";
import {FOCUS_STYLES} from "@/constants/SERVICE_FOCUS";

export default function ServicesView() {
    return (
        <div className="h-full overflow-auto flex flex-col items-stretch gap-y-3 text-white p-6">
            <div className="flex flex-col items-start justify-between gap-3">
                <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Services</h1>
                <p className="text-sm md:text-base text-white/80 mt-1">What I can help you build.</p>
            </div>
            <div
                className="w-full">
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    <ul role="list" aria-label="Services offered" className="contents">
                        {SERVICES
                            .slice()
                            .sort((a, b) => {
                                if (a.focus === b.focus) {
                                    return a.priority - b.priority;
                                }
                                return a.focus.localeCompare(b.focus);
                            })
                            .map((s) => (
                                <li key={s.title} className="contents">
                                    <div
                                        tabIndex={0}
                                        className={`
                                          select-none group rounded-xl p-4 md:p-5
                                          ring-1 bg-black/60 transition
                                          hover:bg-black/45
                                          focus-visible:ring-2 focus-visible:ring-sky-400/60
                                          ${FOCUS_STYLES[s.focus]}
                                        `}
                                    >
                                        <div
                                            className="text-base md:text-lg font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                            {s.title}
                                        </div>
                                        <div className="text-xs md:text-sm text-white/80 mt-1">{s.description}</div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}