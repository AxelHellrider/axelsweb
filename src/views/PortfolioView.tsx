import ViewShell from "./ViewsShell";
import type { ViewProps } from "./ViewTypes";
import MobileUtil from "@/hooks/MobileUtil";
import React, { useMemo } from "react";

export default function PortfolioView({ onBack }: ViewProps) {
  const isMobile = MobileUtil(768);
  const sectionCard = "rounded-2xl p-5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.2)]";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {projects.map((p) => (
          <a
            key={p.title}
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
        ))}
      </div>
    </div>
  );

  // Simple coverflow-like carousel for mobile
  const MobileCoverflow = () => {
    const items = useMemo(() => projects, [projects]);
    return (
      <div className="flex flex-col gap-3">
        <Header />
        <div
          className="relative -mx-4 px-4 overflow-x-auto scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-4 py-2 snap-x snap-mandatory">
            {items.map((p, idx) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-center shrink-0 w-[76vw] aspect-[16/10] rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden perspective-[1000px]"
              >
                <div className="relative w-full h-full [transform-style:preserve-3d] transition will-change-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getPreviewSrc(p.href, p.previewImage)}
                    alt={`Preview image for ${p.title}`}
                    className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden]"
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
          <div className={sectionCard}>
            <MobileCoverflow />
          </div>
        </div>
      ) : (
        <div className="hidden md:grid grid-cols-3 gap-6 text-white px-6 py-6 transition-all duration-300 contain-parent">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <div className={sectionCard}>
              <Header />
            </div>
          </div>
          {/* Center column left empty to keep crystal visually centered */}
          <div />
          {/* Right column */}
          <div className="flex flex-col gap-5">
            <div className={sectionCard}>
              <Items />
            </div>
          </div>
        </div>
      )}
    </ViewShell>
  );
}
