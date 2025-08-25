import { useEffect, useState } from "react";

export default function MobileUtil(breakpoint = 1024) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);

        handleResize(); // initialize
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}
