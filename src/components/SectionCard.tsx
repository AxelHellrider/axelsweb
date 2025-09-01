"use client";
import React from "react";

/**
 * Section Cards properties for reusability
 */
interface SectionCardProps {
    title: string;
    description: string;
    phase?: string;
    view: string;
    onHover: (data: { title: string; description: string; phase?: string; view: string }) => void;
    onLeave: () => void;
    fn: () => void;
}

/**
 * Initialization of the component
 * @param title
 * @param description
 * @param phase
 * @param view
 * @param onHover
 * @param onLeave
 * @param fn
 * @constructor
 */
export default function SectionCard({ title, description, phase = "welcome", view, onHover, onLeave, fn }: SectionCardProps) {
    return (
        <div
            className="p-4 pr-14 rounded-lg shadow-md bg-blue-100/10 hover:bg-blue-500/20 transition-all cursor-pointer"
            onMouseEnter={() => onHover({title, description, phase, view})}
            onMouseLeave={onLeave}
            onClick={fn}
        >
            <h3 className="text-md text-gray-100 font-bold">{title}</h3>
            <p className="text-xs text-gray-300">{description}</p>
        </div>
    );
}
