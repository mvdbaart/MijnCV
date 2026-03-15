import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsGridProps {
  projects?: Project[];
  selectedTag?: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "3CX Callflow met AFAS integratie",
    description:
      "Callflow met een API-integratie met AFAS om specifieke klanten toegang te geven tot ondersteuning buiten kantooruren.",
    imageUrl:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60",
    tags: ["3CX", "VoIP", "AFAS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "AI Chat Applicatie",
    description:
      "Real-time chatapplicatie aangedreven door kunstmatige intelligentie voor slimme reacties en automatisering.",
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
    tags: ["Python", "AI", "Supabase"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Een responsieve portfoliowebsite die projecten en professionele ervaring presenteert.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "TypeScript", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

const allTags = Array.from(
  new Set(defaultProjects.flatMap((project) => project.tags)),
);

const ProjectsGrid = ({
  projects = defaultProjects,
  selectedTag = "",
}: ProjectsGridProps) => {
  const [activeTag, setActiveTag] = useState(selectedTag);

  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  return (
    <section id="projects" className="w-full bg-gray-900 px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Projecten
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-amber-400/40" />
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Button
            variant={activeTag === "" ? "default" : "outline"}
            className={cn(
              activeTag === ""
                ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
                : "border-white/20 bg-transparent text-gray-300 hover:border-white/40 hover:bg-white/10 hover:text-white",
            )}
            onClick={() => setActiveTag("")}
          >
            Alle
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className={cn(
                activeTag === tag
                  ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
                  : "border-white/20 bg-transparent text-gray-300 hover:border-white/40 hover:bg-white/10 hover:text-white",
              )}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
