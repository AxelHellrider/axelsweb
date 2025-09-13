"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full">
        <section className="rounded-2xl p-5 md:p-7 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_40px_rgba(0,150,255,0.25)] text-white">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            Crafting performant web experiences with React, Next.js, and 3D.
          </h1>
          <p className="text-sm md:text-base text-white/85 mt-2 max-w-prose">
            I build fast, accessible interfaces and immersive visuals. Explore case studies, capabilities, and ways we can work together.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link href="/portfolio" className="rounded-xl px-4 py-2.5 bg-sky-500/30 hover:bg-sky-500/50 ring-1 ring-sky-400/40 transition text-white text-sm md:text-base shadow-[0_0_20px_rgba(0,150,255,0.35)]">View portfolio</Link>
            <Link href="/services" className="rounded-xl px-4 py-2.5 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition text-white text-sm md:text-base">Services</Link>
            <Link href="/contact" className="rounded-xl px-4 py-2.5 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition text-white text-sm md:text-base">Contact</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
