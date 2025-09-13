"use client";

import React from "react";

const useIsMobile = (bp: number = 1024) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= bp);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return isMobile;
};

// Hoisted constants to avoid re-creating on each render
const SECTION_CARD = "rounded-2xl p-5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.35)]";
const TABS = [
  { id: 'about', label: 'About' as const },
  { id: 'skills', label: 'Skills' as const },
  { id: 'experience', label: 'Experience' as const },
] as const;

const SKILLS = [
  { name: "HTML", level: 5 },
  { name: "CSS", level: 5 },
  { name: "JavaScript", level: 5 },
  { name: "React", level: 4 },
  { name: "Next.js", level: 3 },
  { name: "Three.js", level: 3 },
  { name: "TailwindCSS", level: 3 },
  { name: "Sass", level: 4 },
  { name: "PHP", level: 3 },
  { name: "Phalcon PHP", level: 3 },
  { name: "Node.js", level: 4 },
] as const;

const EXPERIENCE = [
  {
    role: "Frontend Engineer",
    company: "ESOFTHALL LTD.",
    period: "July 2024 – Present",
    bullets: [
      "Building interactive 3D experiences (Three.js / R3F)",
      "Leading UI architecture with Next.js and TailwindCSS",
    ],
  },
  {
    role: "Web Developer",
    company: "ICOP Internet Solutions",
    period: "January 2023 – June 2024",
    bullets: [
      "Shipped design systems and component libraries",
      "Drove performance, accessibility, and DX improvements",
    ],
  },
] as const;

export default function AboutView() {
  const isMobile = useIsMobile(768);
  // Tabs state (defaults to About on mobile, Skills on desktop)
  const [activeTab, setActiveTab] = React.useState<'about' | 'skills' | 'experience'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'about' : 'skills'
  );
  React.useEffect(() => {
    if (isMobile && activeTab === 'skills') return; // let users keep selection
    if (!isMobile && activeTab === 'about') return;
  }, [isMobile, activeTab]);

  const TabBar = ({ className = "" }: { className?: string }) => (
    <div className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/5 ring-1 ring-white/10 ${className}`} role="tablist" aria-label="About sections">
      {TABS.map(t => (
        <button
          key={t.id}
          id={`tab-${t.id}-label`}
          type="button"
          role="tab"
          aria-controls={`tab-${t.id}`}
          aria-selected={activeTab === t.id}
          tabIndex={activeTab === t.id ? 0 : -1}
          onClick={() => setActiveTab(t.id as typeof activeTab)}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${activeTab === t.id ? 'bg-sky-500/30 text-white' : 'text-gray-300 hover:bg-white/10'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );

  const SkillsPanel = () => (
    <div className="mt-3 max-h-[48vh] md:max-h-[55vh] overflow-y-auto pr-1">
      <ul role="list" className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
        {SKILLS.map((s) => (
          <li role="listitem" key={s.name}>
            <div className="rounded-xl p-3 md:p-4 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-[12px] md:text-sm font-medium text-gray-100">{s.name}</span>
                <span className="text-[10px] text-white/60 md:hidden">{s.level}/5</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/15 ring-1 ring-white/10 overflow-hidden" aria-hidden="true">
                <div className="h-full rounded-full bg-sky-400" style={{ width: `${(s.level / 5) * 100}%` }} />
              </div>
              <span className="sr-only">{`${s.name} skill level ${s.level} out of 5`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const ProfileCard = ({ size = 150 }: { size?: number }) => (
    <div className="flex flex-row md:flex-col items-start md:items-start lg:items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-2xl ring-2 ring-[#009dff]/60 shadow-[0_0_25px_rgba(0,150,255,0.35)]"
        width={size}
        height={size}
        src="/about/linkedin-profpic.jpg"
        alt="Portrait of Alexandros Nomikos"
        loading="lazy"
        decoding="async"
      />
      <div className="flex flex-col items-stretch gap-2 md:gap-4">
        <h2 className="text-base font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent md:text-xl lg:text-2xl">
          Alexandros Nomikos
        </h2>
        <p className="text-xs md:text-sm text-gray-300/90 tracking-wide uppercase">Web Developer / Creative Coder</p>
      </div>
    </div>
  );

  const AboutText = () => (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading" className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
        About Me
      </h2>
      <p className="text-sm leading-relaxed text-gray-200/90">
        I’m a web developer based in Greece, passionate about blending
        <span className="text-blue-200"> modern web technologies</span> with
        <span className="text-blue-200"> creative coding</span>. My work bridges frontend engineering,
        interactive 3D experiences, and experimental storytelling.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-200/90">
        Beyond code, I explore music, AI, and myth‑inspired narratives — weaving technical precision with
        creative vision to build immersive digital worlds.
      </p>
    </section>
  );

  const ExperiencePanel = () => (
    <section className="mt-3 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-1" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="sr-only">Experience</h2>
      <div className="flex flex-col gap-3">
        {EXPERIENCE.map(x => (
          <article key={`${x.role}-${x.company}`} className="rounded-xl p-4 md:p-5 bg-white/5 ring-1 ring-white/10" aria-label={`${x.role} at ${x.company}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium md:font-semibold text-sm md:text-base">{x.role}</div>
                <div className="text-xs md:text-sm text-gray-300/90">{x.company}</div>
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">{x.period}</div>
            </div>
            <ul className="mt-2 list-disc list-inside text-xs md:text-sm text-gray-200/90">
              {x.bullets.map((b) => (
                <li key={`${x.role}-${b}`}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div className="w-full h-full flex items-start md:items-center justify-center pointer-events-auto contain-parent px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]">
      <div className="w-full min-h-full overflow-y-auto md:relative md:overflow-visible transition-all duration-300 contain-layout">
        {isMobile ? (
          <div className="flex flex-col overflow-auto justify-between gap-4 p-4 text-white h-full">
            <div className="flex flex-col gap-2 items-stretch">
              <button
                onClick={() => history.back()}
                className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
              >
                ← Back
              </button>
              <div className="flex items-start gap-4">
                <ProfileCard size={80} />
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <TabBar />
            <div className="mt-2" role="tabpanel" id={`tab-${activeTab}`} aria-labelledby={`tab-${activeTab}-label`}>
              {activeTab === 'about' && <AboutText />}
              {activeTab === 'skills' && <SkillsPanel />}
              {activeTab === 'experience' && <ExperiencePanel />}
            </div>
          </div>
        ) : (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 text-white px-4 md:px-6 py-4 md:py-6 transition-all duration-300 contain-parent max-w-6xl mx-auto">
            <div className="flex flex-col gap-5">
              <div className={SECTION_CARD}>
                <ProfileCard />
              </div>
            </div>
            <div className="hidden lg:block" />
            <div className="flex flex-col gap-5">
              <div className={SECTION_CARD}>
                <TabBar />
                <div className="mt-2" role="tabpanel" id={`tab-${activeTab}`} aria-labelledby={`tab-${activeTab}-label`}>
                  {activeTab === 'about' && <AboutText />}
                  {activeTab === 'skills' && <SkillsPanel />}
                  {activeTab === 'experience' && <ExperiencePanel />}
                </div>
              </div>
              <button
                onClick={() => history.back()}
                className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
              >
                ← Back
              </button>
            </div>
            <div className="flex-1 h-full" />
          </div>
        )}
      </div>
    </div>
  );
}
