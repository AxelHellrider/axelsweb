"use client";
import React, { useMemo, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Project = {
    title: string;
    description: string;
    href: string;
    previewImage?: string;
    stack: string[];
};

const projects: Project[] = [
    {
        title: "Axel's Web",
        description: "Personal portfolio — custom frontend architecture, interactive visuals, performance-focused UI.",
        href: "https://axelsweb.dev",
        stack: ["Next.js", "React", "Three.js", "Tailwind CSS"],
    },
    {
        title: "Danae Tsouroufli Portfolio",
        description: "Vue-based portfolio website — clean layout, responsive design, visual-first presentation.",
        href: "https://danaetsouroufli.art",
        stack: ["Vue 3", "Vite", "CSS"],
    },
    {
        title: "CRealizr",
        description: "D&D encounter toolkit — frontend-heavy UI with structured data visualization.",
        href: "https://crealizr.netlify.app",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        title: "Fractal Tales",
        description: "Micro-fiction platform — minimal UI focused on readability and atmosphere.",
        href: "https://fractaltales.netlify.app",
        stack: ["Next.js", "Typescript", "Tailwind CSS", "Neon DB"],
    },
    {
        title: "Streamlit Fintech Template",
        description: "Fintech app template — rapid prototyping with data-oriented UI.",
        href: "https://github.com/AxelHellrider/Streamlit-Fintech-App-Workearly-2024",
        stack: ["Python", "Streamlit", "OpenAI API"],
    },
];

const getPreviewSrc = (href: string, explicit?: string) => {
    if (explicit) return explicit;
    try {
        const url = new URL(href);
        if (url.hostname.includes("github.com")) {
            const [, owner, repo] = url.pathname.split("/");
            if (owner && repo) {
                const ghOg = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
                return `/api/og-image?url=${encodeURIComponent(ghOg)}`;
            }
        }
        return `/api/og-image?url=${encodeURIComponent(href)}`;
    } catch {
        return "/window.svg";
    }
};

const isSvgSrc = (src: string) =>
    /\.svg($|\?)/i.test(src) || src.startsWith("/window.svg") || src.startsWith("/api/og-image");

const PreviewImage = ({href, previewImage, alt, className, sizes, objectFit = "cover",}: {
    href: string;
    previewImage?: string;
    alt: string;
    className?: string;
    sizes: string;
    objectFit?: "cover" | "contain";
}) => {
    const [failed, setFailed] = useState(false);
    const src = failed ? "/window.svg" : getPreviewSrc(href, previewImage);
    const svg = isSvgSrc(src);
    return (
        <Image src={src} alt={alt} fill sizes={sizes}
                   className={`${className ?? ""} ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
                   priority={false} placeholder="empty" onError={() => setFailed(true)} unoptimized={svg}
                   loading={svg ? "eager" : "lazy"}/>
    );
};

export default function PortfolioView() {
    return (
        <section className="h-full overflow-auto px-4 py-8 md:px-8 max-w-7xl mx-auto text-white">
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
                            className="group block h-full rounded-2xl bg-black/40 ring-1 ring-white/10
                         hover:ring-white/20 hover:bg-black/50 transition-colors"
                        >
                            <div className="relative aspect-video rounded-t-2xl overflow-hidden">
                                <PreviewImage
                                    href={project.href}
                                    previewImage={project.previewImage}
                                    alt={`Preview image for ${project.title}`}
                                    className="transition duration-300 group-hover:scale-[1.02]"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    objectFit="contain"
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
