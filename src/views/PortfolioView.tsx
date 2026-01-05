"use client";
import React from "react";
import Image from "next/image";

type Project = {
    title: string;
    description: string;
    href: string;
    image: string;
    stack: string[];
};

const projects: Project[] = [
    {
        title: "Danae Tsouroufli Portfolio",
        description: "Vue-based portfolio website — clean layout, responsive design, visual-first presentation.",
        href: "https://danaetsouroufli.art",
        image: "/project_thumbs/project_danae.png",
        stack: ["Vue 3", "Vite", "CSS"],
    },
    {
        title: "CRealizr",
        description: "D&D encounter toolkit — frontend-heavy UI with structured data visualization.",
        href: "https://crealizr.netlify.app",
        image: "/project_thumbs/project_crealizr.png",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        title: "Fractal Tales",
        description: "Micro-fiction platform — minimal UI focused on readability and atmosphere.",
        href: "https://fractaltales.netlify.app",
        image: "/project_thumbs/project_microblog.png",
        stack: ["Next.js", "Typescript", "Tailwind CSS", "Neon DB"],
    },
    {
        title: "Streamlit Fintech Template",
        description: "Fintech app template — rapid prototyping with data-oriented UI.",
        href: "https://github.com/AxelHellrider/Streamlit-Fintech-App-Workearly-2024",
        image: "/project_thumbs/project_streamlit.png",
        stack: ["Python", "Streamlit", "OpenAI API"],
    },
];

export default function PortfolioView() {
    return (
        <section className="h-full overflow-auto px-4 pt-4 pb-10 md:px-8 max-w-7xl mx-auto text-white">
            {/* Header */}
            <header className="mb-8">
                <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    Portfolio
                </h2>
                <p className="mt-2 text-sm text-gray-300 max-w-xl">
                    Selected frontend and interactive projects, focused on clarity, performance, and
                    thoughtful user experience.
                </p>
            </header>

            {/* Grid */}
            <ul
                role="list"
                aria-label="Portfolio projects"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {projects.map((project) => (
                    <li key={project.title}>
                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block h-full rounded-2xl bg-black/60 ring-1 ring-white/10
                         hover:ring-white/20 hover:bg-black/50 transition-colors"
                        >
                            <div className="relative aspect-video rounded-t-2xl overflow-hidden">
                                <Image
                                    src={project.image ?? "/project_thumbs/placeholder.png"}
                                    alt={`Preview image for ${project.title}`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-sm font-medium text-white">
                                    {project.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-300 leading-relaxed">
                                    {project.description}
                                </p>
                                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
                                    {project.stack.map((tech) => (
                                        <li
                                            key={tech}
                                            className="text-[10px] px-2 py-0.5 rounded-full
                       bg-white/5 ring-1 ring-white/10
                       text-gray-300"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
