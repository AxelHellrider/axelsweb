"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-4">
        <div className="rounded-2xl p-5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.2)] text-white">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-sm text-white/80 mt-2">Choose a section to explore without losing the crystal background.</p>
        </div>
        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/portfolio" className="rounded-xl p-4 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-white text-center">Portfolio</Link>
          <Link href="/services" className="rounded-xl p-4 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-white text-center">Services</Link>
          <Link href="/contact" className="rounded-xl p-4 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-white text-center">Contact</Link>
          <Link href="/about" className="rounded-xl p-4 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-white text-center">About</Link>
        </nav>
      </div>
    </div>
  );
}
