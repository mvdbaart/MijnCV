import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Navbar from "./Navbar";
import CodeRain from "./CodeRain";
import HeroSection from "./HeroSection";
import StatsRow from "./StatsRow";
import SkillsSection from "./SkillsSection";
import ProjectsGrid from "./ProjectsGrid";
import ResumeSection from "./ResumeSection";
import ContactSection from "./ContactSection";

const FRAME_SRCS = Array.from({ length: 51 }, (_, i) => {
  const n = (i * 2 + 1).toString().padStart(3, "0");
  return `/frames_hero/frame_${n}.webp`;
});

interface HomeProps {
  name?: string;
  title?: string;
  summary?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  projects?: Array<{
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
  }>;
}

const Home = ({
  name = "Maarten van den Baart",
  title = "ICT Professional",
  summary = "Gepassioneerd probleemoplosser op de servicedesk, creatieve en innovatieve oplossingen voor procesverbetering, AI enthousiasteling. VoIP engineer met 3CX specialisme. AI programmeur.",
  githubUrl = "https://github.com/mvdbaart",
  linkedinUrl = "https://www.linkedin.com/in/mvdbaart/",
  email = "mailto:maarten@vandenbaart.nl",
  projects,
}: HomeProps) => {
  const [frameIdx, setFrameIdx] = useState(0);
  const [hasPreloadError, setHasPreloadError] = useState(false);

  // Preload all frames on mount
  useEffect(() => {
    let mounted = true;
    Promise.all(
      FRAME_SRCS.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
          }),
      ),
    ).catch(() => {
      if (mounted) setHasPreloadError(true);
    });
    return () => { mounted = false; };
  }, []);

  // Map scrollY 0 → heroHeight to frameIdx 0 → 50, freeze after
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const heroH = window.innerHeight;
    const progress = Math.min(y / heroH, 1);
    setFrameIdx(Math.round(progress * (FRAME_SRCS.length - 1)));
  });

  const currentFrame = hasPreloadError ? FRAME_SRCS[0] : FRAME_SRCS[frameIdx];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed mobile background — stays in place while content scrolls over it */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -20 }}
      >
        <img
          src={currentFrame}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-900/50" />
      </div>

      {/* Code rain — full screen, behind all content, above frame background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -10 }}
      >
        <CodeRain />
      </div>

      <Navbar />
      <main>
        <div id="hero">
          <HeroSection
            name={name}
            title={title}
            summary={summary}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            email={email}
          />
        </div>

        <StatsRow />

        <SkillsSection />

        <ResumeSection />

        <div id="projects">
          <ProjectsGrid projects={projects} />
        </div>

        <ContactSection />
      </main>

      <footer className="border-t border-white/[0.06] bg-gray-950 px-6 py-5 text-center">
        <p className="font-mono text-xs text-gray-600">
          Last updated:{" "}
          <span className="text-gray-500">
            {new Date(__BUILD_DATE__).toLocaleString("nl-NL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="mx-2 text-gray-700">·</span>
          build{" "}
          <span className="text-amber-400/50">{__GIT_HASH__}</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
