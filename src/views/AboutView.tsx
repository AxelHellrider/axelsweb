import ViewShell from "./ViewsShell";
import React from "react";
import { ViewProps } from "@/views/ViewTypes";

export default function AboutView({ onBack }: ViewProps) {
    return (
        <ViewShell onBack={onBack}>
            <div className="flex flex-col md:flex-row md:gap-[10%] md:items-start md:justify-center text-white px-6 py-6">
                {/* Left column – profile */}
                <div className="flex flex-col gap-6 w-full md:w-[35%] relative">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="rounded-2xl ring-2 ring-[#009dff]/60 shadow-[0_0_25px_rgba(0,150,255,0.35)]"
                            width={150}
                            height={150}
                            src="/about/linkedin-profpic.jpg"
                            alt="profile picture"
                        />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                            Alexandros Nomikos
                        </h2>
                        <p className="text-sm text-gray-300/90 tracking-wide uppercase">
                            Web Developer / Creative Coder
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <h3 className="text-lg font-semibold mb-1 text-blue-200/90">Skills</h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-300/90">
                            <span>Next.js</span>
                            <span>React</span>
                            <span>Vue 3</span>
                            <span>AngularJS</span>
                            <span>Three.js</span>
                            <span>jQuery</span>
                            <span>Sass</span>
                            <span>TailwindCSS</span>
                            <span>PHP</span>
                            <span>Phalcon</span>
                            <span>Node.js</span>
                            <span>Express</span>
                            <span>Python</span>
                            <span>Django</span>
                            <span>Flask</span>
                            <span>Git</span>
                            <span>Docker</span>
                            <span>Jira</span>
                            <span>Bitbucket</span>
                            <span>WordPress</span>
                        </div>
                    </div>
                </div>

                {/* Right column – holographic panel */}
                <div className="flex flex-col gap-5 w-full md:w-[45%] relative">
                    <div className="rounded-2xl p-8 bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.25)]">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                            About Me
                        </h2>
                        <p className="text-base leading-relaxed text-gray-200/90">
                            I’m a web developer based in Greece, passionate about blending
                            <span className="text-blue-200"> modern web technologies</span> with
                            <span className="text-blue-200"> creative coding</span>.
                            My work bridges frontend engineering, interactive 3D experiences,
                            and experimental storytelling.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-200/90">
                            Beyond code, I explore music, AI, and myth-inspired narratives —
                            weaving technical precision with creative vision to build
                            immersive digital worlds.
                        </p>
                    </div>

                    <button
                        onClick={onBack}
                        className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition
                                   text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </ViewShell>
    );
}
