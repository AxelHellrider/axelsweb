"use client";

import React, {useState} from "react";
import Image from "next/image";
import {BLUR_DATA_URL} from "@/constants/blur";
import {Project} from "@/types/Project";

type ResolvedProject = Project & { fallbackImage?: string };

const PLACEHOLDER = "/project_thumbs/placeholder.png";

function ProjectImage({project, priority}: { project: ResolvedProject; priority: boolean }) {
    const [src, setSrc] = useState(project.image ?? project.fallbackImage ?? PLACEHOLDER);

    return (
        <Image
            src={src}
            alt={`Preview image for ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={priority}
            className="
              object-cover
              transition
              duration-500
              ease-out
              opacity-0
              data-[loaded=true]:opacity-100
              group-hover:scale-[1.02]
            "
            onLoad={(e) => {
                e.currentTarget.dataset.loaded = "true";
            }}
            onError={() => {
                const fallback = project.fallbackImage ?? PLACEHOLDER;
                if (src !== fallback) setSrc(fallback);
            }}
        />
    );
}

function ProjectGrid({projects}: { projects: ResolvedProject[] }) {
    return (
        <ul
            role="list"
            aria-label="Projects"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {projects.map((project, index) => (
                <li key={project.title}>
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full rounded-2xl bg-black/60 ring-1 ring-white/10
                     hover:ring-white/20 hover:bg-black/50 transition-colors"
                    >
                        <div className="relative aspect-video rounded-t-2xl overflow-hidden bg-white/5">
                            <ProjectImage project={project} priority={index < 3} />
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
    );
}

export default function PortfolioView({projects}: { projects: ResolvedProject[] }) {
    const clientProjects = projects.filter((project) => project.category === "client");
    const personalProjects = projects.filter((project) => project.category === "personal");

    return (
        <section className="themed-scrollbar flex flex-col gap-y-4 w-full max-w-full h-full px-6 py-10 lg:py-6 overflow-x-hidden overflow-y-auto lg:max-w-7xl lg:mx-auto ">
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

            {/* Client Work */}
            <div className="flex flex-col gap-y-4 mb-10">
                <h3 className="text-xl font-semibold text-white">Client Work</h3>
                <ProjectGrid projects={clientProjects} />
            </div>

            {/* Personal Projects */}
            <div className="flex flex-col gap-y-4">
                <h3 className="text-xl font-semibold text-white">Personal Projects</h3>
                <ProjectGrid projects={personalProjects} />
            </div>
        </section>
    );
}
