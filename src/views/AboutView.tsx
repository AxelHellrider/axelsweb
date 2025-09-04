import ViewShell from "./ViewsShell";
import React from "react";
import { ViewProps } from "@/views/ViewTypes";
import MobileUtil from "@/hooks/MobileUtil";

export default function AboutView({ onBack }: ViewProps) {
  const isMobile = MobileUtil(768);
  const sectionCard = "rounded-2xl p-5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,150,255,0.2)]";

  // Skills limited to the requested set
  const skills = [
    { name: "React", level: 5 },
    { name: "Next.js", level: 5 },
    { name: "TailwindCSS", level: 5 },
    { name: "PHP", level: 4 },
    { name: "Phalcon PHP", level: 3 },
    { name: "Node.js", level: 4 },
    { name: "HTML", level: 5 },
    { name: "CSS", level: 5 },
    { name: "JavaScript", level: 5 },
  ];

  const experience = [
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
  ];

  // Tabs state (defaults to About on mobile, Skills on desktop)
  const [activeTab, setActiveTab] = React.useState<'about' | 'skills' | 'experience'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'about' : 'skills'
  );
  React.useEffect(() => {
    // Keep tab selection sensible when resizing across breakpoint
    if (isMobile && activeTab === 'skills') return; // let users keep selection
    if (!isMobile && activeTab === 'about') return;
  }, [isMobile, activeTab]);

  // Tab bar
  const TabBar = ({ className = "" }: { className?: string }) => {
    const tabs = [
      { id: 'about', label: 'About' as const },
      { id: 'skills', label: 'Skills' as const },
      { id: 'experience', label: 'Experience' as const },
    ];
    return (
      <div className={`inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 ring-1 ring-white/10 ${className}`} role="tablist" aria-label="About sections">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            onClick={() => setActiveTab(t.id as typeof activeTab)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition ${activeTab === t.id ? 'bg-sky-500/30 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  };

  // Panels
  const SkillsPanel = () => (
    <div className="mt-3 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-2">
        {skills.map(s => (
          <div key={s.name} className="">
            <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/5 ring-1 ring-white/10">
              <span className="text-[13px] md:text-sm text-gray-200/95">{s.name}</span>
              <div className="flex gap-1 ml-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`h-1.5 w-3 rounded-sm ${i < s.level ? 'bg-sky-400/90' : 'bg-white/20'}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ExperiencePanel = () => (
    <div className="mt-3 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-1">
      <div className="flex flex-col gap-3">
        {experience.map(x => (
          <div key={`${x.role}-${x.company}`} className="rounded-xl p-4 md:p-5 bg-white/5 ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium md:font-semibold text-sm md:text-base">{x.role}</div>
                <div className="text-xs md:text-sm text-gray-300/90">{x.company}</div>
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">{x.period}</div>
            </div>
            <ul className="mt-2 list-disc list-inside text-xs md:text-sm text-gray-200/90">
              {x.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileCard = ({ size = 150 }: { size?: number }) => (
    <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
            className="rounded-2xl ring-2 ring-[#009dff]/60 shadow-[0_0_25px_rgba(0,150,255,0.35)]"
            width={size}
            height={size}
            src="/about/linkedin-profpic.jpg"
            alt="profile picture"
        />
      <div className="flex flex-col items-stretch gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Alexandros Nomikos
            </h2>
            <p className="text-sm text-gray-300/90 tracking-wide uppercase">Web Developer / Creative Coder</p>
      </div>
    </div>
  );

  const AboutText = () => (
    <div>
      <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
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
    </div>
  );

  // Unified layout: same tab structure on both desktop and mobile
  return (
    <ViewShell onBack={onBack}>
      {isMobile ? (
        <div className="flex flex-col justify-between gap-4 p-4 text-white h-full">
          <div className={sectionCard}>
            <ProfileCard size={96} />
          </div>
          <div className={sectionCard}>
            <TabBar />
            <div className="mt-2">
              {activeTab === 'about' && <AboutText />}
              {activeTab === 'skills' && <SkillsPanel />}
              {activeTab === 'experience' && <ExperiencePanel />}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-row items-start gap-6 text-white px-6 py-6">
          <div className="w-[36%] min-w-[320px] flex flex-col gap-5">
            <div className={sectionCard}>
              <ProfileCard />
            </div>
            <div className={sectionCard}>
              <TabBar />
              <div className="mt-2">
                {activeTab === 'about' && <AboutText />}
                {activeTab === 'skills' && <SkillsPanel />}
                {activeTab === 'experience' && <ExperiencePanel />}
              </div>
            </div>
            <button
              onClick={onBack}
              className="self-start px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 transition text-sm tracking-wide shadow-[0_0_15px_rgba(0,150,255,0.25)]"
            >
              ← Back
            </button>
          </div>
          <div className="flex-1 h-full" />
        </div>
      )}
    </ViewShell>
  );
}
