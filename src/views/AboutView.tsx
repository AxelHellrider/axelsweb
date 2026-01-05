"use client";

import Image from "next/image";

export default function AboutView() {
    return (
        <section className="h-full overflow-auto px-4 pt-4 md:px-8 max-w-4xl mx-auto text-white">
            {/* Header */}
            <header className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-10">
                <Image
                    src="/about/linkedin-profpic.jpg"
                    alt="Portrait of Alexandros Nomikos"
                    width={120}
                    height={120}
                    className="rounded-2xl ring-2 ring-[#009dff]/60 shadow-[0_0_25px_rgba(0,150,255,0.35)]"
                />
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                        Alexandros Nomikos
                    </h1>
                    <p className="mt-1 text-sm uppercase tracking-wide text-gray-300">
                        Frontend Developer · Creative Coding
                    </p>
                </div>
            </header>

            {/* About */}
            <section className="rounded-2xl bg-black/60 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.2)] px-5 py-3 mb-10">
                <p className="text-sm leading-relaxed text-gray-200/90">
                    I’m a frontend developer based in Greece, focused on building clean,
                    performant web interfaces and exploring interactive and 3D experiences
                    on the web. My work sits at the intersection of frontend engineering,
                    usability, and creative coding.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-gray-200/90">
                    I enjoy working on projects where clarity, structure, and thoughtful
                    interaction matter — from production applications to experimental
                    visual work. Outside of development, I explore music, game design,
                    AI-driven tools, and narrative systems.
                </p>
            </section>

            {/* Focus / Skills */}
            <section className="rounded-2xl bg-black/60 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.2)] px-5 py-3 mb-10">
                <h2 className="text-lg font-medium mb-3">Focus & Skills</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-200/90">
                    <li>Custom frontend development (React, Next.js, AngularJS)</li>
                    <li>Interactive & 3D web experiences (Three.js)</li>
                    <li>UI architecture, design systems, component libraries</li>
                    <li>Performance, accessibility, and UX improvements</li>
                    <li>Working with existing codebases and legacy systems</li>
                </ul>
            </section>

            {/* Experience */}
            <section className="rounded-2xl bg-black/60 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.2)] px-5 py-3 mb-12">
                <h2 className="text-lg font-medium mb-4">Experience</h2>

                <div className="flex flex-col gap-5">
                    <article>
                        <div className="flex justify-between items-baseline gap-3">
                            <div>
                                <h3 className="text-sm font-medium">
                                    Frontend Engineer — ESOFTHALL LTD.
                                </h3>
                                <p className="text-xs text-gray-400">
                                    July 2024 – Present
                                </p>
                            </div>
                        </div>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-200/90">
                            <li>Building interactive 3D web experiences using Three.js</li>
                            <li>Leading frontend architecture with AngularJS and Tailwind CSS</li>
                        </ul>
                    </article>

                    <article>
                        <div className="flex justify-between items-baseline gap-3">
                            <div>
                                <h3 className="text-sm font-medium">
                                    Web Developer — ICOP Internet Solutions
                                </h3>
                                <p className="text-xs text-gray-400">
                                    January 2023 – June 2024
                                </p>
                            </div>
                        </div>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-200/90">
                            <li>Developed and maintained client websites using OpenCart and WordPress.</li>
                            <li>Worked on performance, accessibility, and on-page structure improvements across multiple projects.</li>
                        </ul>
                    </article>
                </div>
            </section>
        </section>
    );
}
