"use client";
import React from "react";

interface DialogProps {
    hovered: { title: string; description: string } | null;
}

export default function Dialog({ hovered }: DialogProps) {
    return (
        <div className="relative flex flex-col p-5 welcome-dialog">
            {hovered ? (
                <>
                    <span className="absolute top-[-33.333%] left-3 capitalize text-[15px] character-title">
                      {hovered.title}
                    </span>
                    <span className="text-[13px]">{hovered.description}</span>
                </>
            ) : (
                <>
                    <span className="absolute top-[-33.333%] left-3 capitalize text-[15px] character-title">
                      Alexandros Nomikos
                    </span>
                    <span className="text-sm italic animate-fadeIn">
                      Hover onto any section to see details.
                    </span>
                </>
            )}
            <span className="absolute top-[33.333%] right-3 capitalize text-[15px] float">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20" height="20"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none"></rect> <g> <path d="M15 8l-4.03 6L7 8h8z"></path> </g> </g></svg>
            </span>
        </div>
    );
}
