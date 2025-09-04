import React from "react";

export default function ViewsShell({ onBack, children }: { onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-start md:items-center justify-center pointer-events-auto contain-parent">
      <div className="w-full h-full overflow-y-auto p-4 pb-[max(env(safe-area-inset-bottom),1rem)] md:relative md:h-[90svh] md:w-[90svw] md:overflow-visible md:p-0 transition-all duration-300 contain-layout">
        {children}
      </div>
    </div>
  );
}
