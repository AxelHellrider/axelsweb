"use client"; 
import React from "react";
import { motion } from "framer-motion";

import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const SOCIALS = [
  { label: "Email", href: "mailto:alex.nomikos@outlook.com", icon: MdEmail },
  { label: "GitHub", href: "https://github.com/AxelHellrider", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexandros-nomikos/", icon: FaLinkedin },
] as const;

export default function ContactView() {
  return (
    <div className="h-full w-full flex flex-col items-stretch justify-end md:items-center md:justify-center px-4">
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:max-w-2xl rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.25)]"
        role="region"
        aria-label="Contact information"
      >
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
          <button
            onClick={() => history.back()}
            className="px-4 py-2 md:py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)] focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
          >
            ← Back
          </button>
        </div>
        <p className="mt-2 text-sm md:text-base text-white/80">
          I’d love to connect. Reach out via any of the links below.
        </p>
        <ul role="list" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SOCIALS.map((s) => (
            <li key={s.label} role="listitem">
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`Open ${s.label}`}
                className="group flex items-center gap-3 rounded-lg px-3 py-3 md:py-2.5 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition focus-visible:ring-2 focus-visible:ring-sky-400/60 outline-none"
              >
                <span className="inline-flex h-7 w-7 md:h-6 md:w-6 items-center justify-center rounded-md bg-sky-400/20 ring-1 ring-sky-400/30 text-sky-200">
                  <s.icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
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
  );
}