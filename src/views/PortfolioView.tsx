import ViewShell from "./ViewsShell";
import type { ViewProps } from "./ViewTypes";
import MobileUtil from "@/hooks/MobileUtil";
import React, { useMemo, useEffect, useRef } from "react";

export default function PortfolioView({ onBack }: ViewProps) {
   const isMobile = MobileUtil(768);
   const sectionCard = "rounded-2xl p-5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0,0,30px_rgba(0,150,255,0.2)]";

  type Project = {
    title: string;
    description: string;
    href: string; // github repo or website url
    previewImage?: string; // optional explicit image override
  };

  const projects: Project[] = [
    {
      title: "Personal Portfolio",
      description: "Next.js  R3F experiments and UI showcases.",
      href: "https://axelsweb.netlify.app",
    },
    {
      title: "Danae Tsouroufli | Portfolio Website",
      description: "Vue3 & static portfolio items serve.",
      href: "https://danaetsouroufli.art",
    },
    {
      title: "Fractal Tales",
      description: "Micro-fiction blog, similar to Tumblr's SCP Foundation fiction.",
      href: "https://fractaltales.netlify.app",
    },
    {
      title: "Streamlit Fintech App Template",
      description: "Fintech App Template made on Workearly AI Summer School 2024.",
      href: "https://github.com/AxelHellrider/Streamlit-Fintech-App-Workearly-2024",
    },
  ];

  const getPreviewSrc = (href: string, explicit?: string) => {
    if (explicit) return explicit;
    try {
      const url = new URL(href);
      if (url.hostname.includes("github.com")) {
        const [, owner, repo] = url.pathname.split("/");
        if (owner && repo) {
          return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
        }
      }
      return `/api/og-image?url=${encodeURIComponent(href)}`;
    } catch {
      return "/window.svg";
    }
  };

  const Header = () => (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
        Portfolio
      </h2>
      <p className="text-sm text-gray-300/90">
        Selected works and experiments. Click a card to open the repo or live site.
      </p>
    </div>
  );

  const Items = () => (
    <div className="mt-2 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-1">
      <ul role="list" aria-label="Projects grid" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {projects.map((p) => (
          <li key={p.title} role="listitem">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              aria-label={`Open ${p.title}`}
            >
              <div className="p-3">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg ring-1 ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getPreviewSrc(p.href, p.previewImage)}
                    alt={`Preview image for ${p.title}`}
                    className="h-full w-full object-contain object-top transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.src = "/window.svg";
                    }}
                  />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-medium text-white/95">{p.title}</div>
                  <div className="text-xs text-gray-300/90 mt-0.5">{p.description}</div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // Simple coverflow-like carousel for mobile
  const MobileCoverflow = () => {
    const items = useMemo(() => projects, []);
    // Coverflow tuning parameters
    const CF_TILT_DEG = 22; // tilt intensity (±deg)
    const CF_DEPTH_MAX = 72; // translateZ at center (px)
    const CF_SCALE_CENTER = 1; // scale at center
    const CF_SCALE_EDGE = 0.92; // scale at edges
    const CF_SHADOW_BASE = 0.2; // base shadow opacity
    const CF_SHADOW_GAIN = 0.28; // added shadow opacity toward center
    const CF_EDGE_FADE_PX = 28; // edge gradient width (px)
    const CF_ENABLE_AUTOSNAP = true; // auto-snap to nearest slide after scroll end
    const CF_AUTOSNAP_DELAY = 90; // ms after scroll end to snap
    const CF_ENABLE_AUTOPLAY = false; // optional autoplay
    const CF_AUTOPLAY_MODE: 'drift' | 'step' = 'drift';
    const CF_AUTOPLAY_SPEED_PX_PER_S = 14; // drift speed
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = scrollerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let snapTimer: number | null = null;
      let raf = 0;
      let userInteracting = false;
      const slides = Array.from(el.querySelectorAll<HTMLAnchorElement>('a.cf-item'));

      const update = () => {
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        for (const slide of slides) {
          const inner = slide.querySelector<HTMLDivElement>(".cf-inner");
          if (!inner) continue;
          const srect = slide.getBoundingClientRect();
          const slideCenter = srect.left + srect.width / 2;
          const dx = (slideCenter - center) / (rect.width / 2); // ~ -1..1
          const x = Math.max(-1, Math.min(1, dx));
          const rotateY = x * -CF_TILT_DEG; // tilt away from center
          const scale = CF_SCALE_EDGE + (1 - Math.abs(x)) * (CF_SCALE_CENTER - CF_SCALE_EDGE);
          const translateZ = (1 - Math.abs(x)) * CF_DEPTH_MAX; // subtle pop
          const translateX = x * -10; // counter small shift
          inner.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          inner.style.opacity = `${0.75 + (1 - Math.abs(x)) * 0.25}`;
          const shadowOpacity = CF_SHADOW_BASE + (1 - Math.abs(x)) * CF_SHADOW_GAIN;
          slide.style.filter = `drop-shadow(0 10px 25px rgba(0,0,0,${shadowOpacity}))`;
        }
      };

      const snapToNearest = () => {
        if (!CF_ENABLE_AUTOSNAP) return;
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let best: { el: HTMLAnchorElement; dist: number } | null = null;
        for (const slide of slides) {
          const srect = slide.getBoundingClientRect();
          const slideCenter = srect.left + srect.width / 2;
          const dist = Math.abs(slideCenter - center);
          if (!best || dist < best.dist) best = { el: slide, dist };
        }
        best?.el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      };

      const debouncedSnap = () => {
        if (!CF_ENABLE_AUTOSNAP) return;
        if (snapTimer) window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(snapToNearest, CF_AUTOSNAP_DELAY);
      };

      const onScroll = () => {
        requestAnimationFrame(update);
        if (!userInteracting) debouncedSnap();
      };
      update();
      el.addEventListener("scroll", onScroll, { passive: true });
      const onPointerDown: (ev: PointerEvent) => void = () => { userInteracting = true; if (snapTimer) { window.clearTimeout(snapTimer); snapTimer = null; } };
      const onPointerUp: (ev: PointerEvent) => void = () => { userInteracting = false; debouncedSnap(); };
      el.addEventListener('pointerdown', onPointerDown, { passive: true });
      el.addEventListener('pointerup', onPointerUp);
      window.addEventListener("resize", update);

      const startDrift = () => {
        if (!CF_ENABLE_AUTOPLAY || prefersReducedMotion || CF_AUTOPLAY_MODE !== 'drift') return;
        const speedPerFrame = CF_AUTOPLAY_SPEED_PX_PER_S / 60;
        const step = () => {
          if (document.visibilityState !== 'visible' || userInteracting) {
            raf = requestAnimationFrame(step);
            return;
          }
          el.scrollLeft += speedPerFrame;
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      };
      startDrift();

      return () => {
        el.removeEventListener("scroll", onScroll);
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener("resize", update);
        if (snapTimer) window.clearTimeout(snapTimer);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [CF_ENABLE_AUTOSNAP, CF_AUTOSNAP_DELAY, CF_ENABLE_AUTOPLAY, CF_AUTOPLAY_MODE, CF_AUTOPLAY_SPEED_PX_PER_S]);
    return (
      <div className="flex flex-col gap-3">
        <Header />
        <div
          ref={scrollerRef}
          className="relative -mx-4 px-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Edge fade gradients for a floating, minimalist feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-black/30 to-transparent" style={{ width: CF_EDGE_FADE_PX }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l from-black/30 to-transparent" style={{ width: CF_EDGE_FADE_PX }} />
          <div className="flex gap-4 py-2 snap-x snap-mandatory">
            {items.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cf-item snap-center shrink-0 w-[78vw] aspect-[16/10] rounded-2xl overflow-hidden perspective-[1000px]"
              >
                <div className="cf-inner relative w-full h-full [transform-style:preserve-3d] transition-[transform,opacity,filter] duration-300 ease-out will-change-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getPreviewSrc(p.href, p.previewImage)}
                    alt={`Preview image for ${p.title}`}
                    className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.src = "/window.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-sm font-semibold text-white drop-shadow">{p.title}</div>
                    <div className="text-[11px] text-white/80 line-clamp-2">{p.description}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={onBack}
          className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
        >
          ← Back
        </button>
      </div>
    );
  };

  return (
    <ViewShell onBack={onBack}>
      {isMobile ? (
        <div className="flex flex-col gap-4 px-4 py-4 text-white">
          {/* Floating minimalist carousel without section card container */}
          <MobileCoverflow />
        </div>
      ) : (
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 text-white px-6 py-6 transition-all duration-300 contain-parent">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <div className={sectionCard}>
              <Header />
            </div>
          </div>
          {/* Center column left empty to keep crystal visually centered on lg */}
          <div className="hidden lg:block" />
          {/* Right column */}
          <div className="flex flex-col gap-5">
            <div className={sectionCard}>
              <Items />
            </div>
             <button
               onClick={onBack}
               className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
             >
               ← Back
             </button>
          </div>
        </div>
      )}
    </ViewShell>
  );
}
