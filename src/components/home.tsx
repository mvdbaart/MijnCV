import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsRow from "./StatsRow";
import SkillsSection from "./SkillsSection";
import ProjectsGrid from "./ProjectsGrid";
import ResumeSection from "./ResumeSection";
import ContactSection from "./ContactSection";

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
  return (
    <div className="min-h-screen bg-gray-900">
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
