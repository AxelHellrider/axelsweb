import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ViewType, ViewProps } from "./ViewTypes";

type Registry = Record<ViewType, React.ComponentType<ViewProps>>;

interface ViewsHostProps {
    current: ViewType;
    onBack: () => void;
    registry: Registry;
    keepAlive?: boolean;
}

const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
};

export default function ViewsHost({current, onBack, registry, keepAlive = false,}: ViewsHostProps)
{
    if (keepAlive) {
        // Mount all once; hide the inactive ones
        return (
            <>
                {Object.entries(registry).map(([id, Cmp]) => (
                    <motion.div
                        key={id}
                        className="pointer-events-auto"
                        animate={{ opacity: current === id ? 1 : 0 }}
                        style={{
                            display: current === id ? "block" : "none",
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        <Cmp onBack={onBack} />
                    </motion.div>
                ))}
            </>
        );
    }

    // Default: mount only the active view (lighter, cleaner)
    const Active = registry[current];
    return (
        <AnimatePresence mode="wait">
            {Active && (
                <motion.div
                    key={current}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                >
                    <Active onBack={onBack} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
