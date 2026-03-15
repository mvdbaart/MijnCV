import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsRow from "./StatsRow";
import SkillsSection from "./SkillsSection";
import ProjectsGrid from "./ProjectsGrid";
import ResumeSection from "./ResumeSection";
import ContactSection from "./ContactSection";
import CursorSpotlight from "./CursorSpotlight";

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
      <CursorSpotlight />
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

        <div id="skills">
          <SkillsSection />
        </div>

        <div id="resume">
          <ResumeSection />
        </div>

        <div id="projects">
          <ProjectsGrid projects={projects} />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
