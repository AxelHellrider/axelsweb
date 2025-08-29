"use client";
import React from "react";

interface SectionCardProps {
    title: string;
    description: string;
    phase?: string;
    view: string;
    onHover: (data: { title: string; description: string; phase?: string; view: string }) => void;
    onLeave: () => void;
}

export default function SectionCard({ title, description, phase = "welcome", view, onHover, onLeave }: SectionCardProps) {
    return (
        <div
            className="p-4 rounded-lg shadow-md bg-black/30 hover:bg-black/60 transition-all cursor-pointer"
            onMouseEnter={() => onHover({ title, description, phase, view })}
            onMouseLeave={onLeave}
        >
            <h3 className="text-md text-gray-100 font-bold">{title}</h3>
            <p className="text-xs text-gray-300">{description}</p>
        </div>
    );
}
