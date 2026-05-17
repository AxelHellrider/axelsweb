import {Project} from "@/types/Project";

export const PROJECTS: Project[] = [
    {
        title: "CRealizr",
        description: "Rules-aware toolkit for D&D 5e that helps DMs design fair, tense encounters without manual CR math.",
        href: "https://crealizr.net",
        image: "/project_thumbs/project_crealizr.png",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        title: "Fractal Tales",
        description: "Experimental micro-fiction platform built around fragmented storytelling and a camcorder-like aesthetic.",
        href: "https://fractaltales.netlify.app",
        image: "/project_thumbs/project_microblog.png",
        stack: ["Next.js", "Typescript", "Tailwind CSS", "Neon DB"],
    },
    {
        title: "Streamlit Fintech Prototype",
        description: "Exploratory fintech prototype focused on backend logic, API orchestration, and LLM integration using Python.",
        href: "https://github.com/AxelHellrider/Streamlit-Fintech-App-Workearly-2024",
        image: "/project_thumbs/project_streamlit.png",
        stack: ["Python", "Streamlit", "OpenAI API"],
    },
    {
        title: "Danae Tsouroufli | Portfolio Website",
        description: "Custom portfolio for a visual artist — visual-first layout focused on showcasing artwork without UI interference.",
        href: "https://danaetsouroufli.art",
        image: "/project_thumbs/project_danae.png",
        stack: ["Vue 3", "Vite", "CSS"],
    },
];