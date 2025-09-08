import React from "react";
import { motion } from "framer-motion";
import ViewShell from "./ViewsShell";
import type { ViewProps } from "./ViewTypes";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function ContactView({ onBack }: ViewProps) {
  const socials = [
    { label: "Email", href: "mailto:alex.nomikos@outlook.com", icon: MdEmail },
    { label: "GitHub", href: "https://github.com/AxelHellrider", icon: FaGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alexandros-nomikos/", icon: FaLinkedin },
  ];

  return (
    <ViewShell onBack={onBack}>
      <div className="absolute bottom-10 right-10 z-20 md:right-16 md:bottom-16 pointer-events-auto">
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.25)] max-w-[88vw] md:max-w-md"
          role="region"
          aria-label="Contact information"
        >
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
            >
              ← Back
            </button>
          </div>
          <p className="mt-2 text-sm md:text-base text-white/80">
            I’d love to connect. Reach out via any of the links below.
          </p>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-sky-400/20 ring-1 ring-sky-400/30 text-sky-200">
                    <s.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm md:text-base text-white/90 group-hover:text-white">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </ViewShell>
  );
}