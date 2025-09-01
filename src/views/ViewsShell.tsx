import React from "react";

export default function ViewsShell({onBack, children}: { onBack: () => void, children: React.ReactNode; }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative h-[90vh] w-[90vw]">
                {children}
            </div>
        </div>
    );
}
