import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";

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
  projects = [
    {
      id: 1,
      title: "3CX callflow met Afas integratie",
      description:
        "Callflow met een api integratie met Afas om specifieke klanten toegang te geven tot ondersteuning buiten kantooruren",
      imageUrl:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60",
      tags: ["React", "Node.js", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 2,
      title: "AI Chat Application",
      description:
        "Real-time chat application powered by artificial intelligence.",
      imageUrl:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
      tags: ["Python", "TensorFlow", "WebSocket"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ],
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="relative">
        <div id="hero" className="relative">
          <HeroSection
            name={name}
            title={title}
            summary={summary}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            email={email}
          />
        </div>

        <div id="projects">
          <ProjectsGrid projects={projects} />
        </div>

        <div
          id="resume"
          className="min-h-screen bg-gray-50 dark:bg-gray-800 p-8"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Resume Section Coming Soon
            </h2>
          </div>
        </div>

        <div
          id="contact"
          className="min-h-screen bg-white dark:bg-gray-900 p-8"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Contact Section Coming Soon
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
