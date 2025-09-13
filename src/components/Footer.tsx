export default function Footer() {
  return (
    <footer role="contentinfo" className="pointer-events-auto">
      <div className="mx-auto my-3 md:my-4 w-full px-4">
        <div className="rounded-2xl bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.2)] px-3 py-2 text-[11px] text-white/70 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Alexandros Nomikos</span>
          <a href="/contact" className="underline decoration-sky-400/60 underline-offset-2 hover:text-white transition">Get in touch</a>
        </div>
      </div>
    </footer>
  );
}