"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLink = "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm ring-1 ring-white/10 text-white/85 hover:bg-white/10 hover:text-white transition focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus first link
      const id = setTimeout(() => firstLinkRef.current?.focus(), 50);
      return () => { clearTimeout(id); document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header role="banner" className="pointer-events-auto">
      <nav aria-label="Primary" className="mx-auto mt-3 md:mt-4 w-full px-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.2)] px-3 py-2">
          <Link href="/" className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-white/95 focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none">
            <span className="text-sm font-semibold tracking-wide">Alexandros Nomikos</span>
            <span className="hidden sm:inline text-[11px] text-white/70">Creative Coder</span>
          </Link>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/portfolio" aria-current={isActive("/portfolio") ? "page" : undefined} className={navLink}>Portfolio</Link>
            <Link href="/services" aria-current={isActive("/services") ? "page" : undefined} className={navLink}>Services</Link>
            <Link href="/about" aria-current={isActive("/about") ? "page" : undefined} className={navLink}>About</Link>
            <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined} className={navLink}>Contact</Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:bg-white/10 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
            >
              {/* Hamburger / Close icon */}
              <span className="sr-only">Menu</span>
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile modal menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed z-50 left-1/2 top-20 w-[92vw] max-w-sm -translate-x-1/2 rounded-2xl bg-gradient-to-b from-black/70 to-black/60 ring-1 ring-white/10 shadow-[0_0_28px_rgba(56,189,248,0.28)] backdrop-blur-xl p-2"
          >
            <div className="flex flex-col divide-y divide-white/10">
              <Link ref={firstLinkRef} href="/portfolio" onClick={() => setOpen(false)} className="px-4 py-3 text-base text-white/90 hover:bg-white/10 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none">Portfolio</Link>
              <Link href="/services" onClick={() => setOpen(false)} className="px-4 py-3 text-base text-white/90 hover:bg-white/10 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none">Services</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="px-4 py-3 text-base text-white/90 hover:bg-white/10 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="px-4 py-3 text-base text-white/90 hover:bg-white/10 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}