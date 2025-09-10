import React from "react";

export default function ViewsShell(props: { onBack: () => void; children: React.ReactNode }) {
  const { children } = props; // onBack is intentionally unused here
  return (
    <div className="absolute inset-0 z-20 w-full h-full flex items-start md:items-center justify-center pointer-events-auto contain-parent px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]">
      <div className="w-full min-h-full overflow-y-auto md:relative md:overflow-visible transition-all duration-300 contain-layout">
        {children}
      </div>
    </div>
  );
}
