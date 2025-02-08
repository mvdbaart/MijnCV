import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";

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
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management and secure payment processing.",
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
      "Real-time chat application powered by artificial intelligence for smart responses and language translation.",
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
    tags: ["Python", "TensorFlow", "WebSocket"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects and professional experience.",
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
    <div className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap gap-2 justify-center">
          <Button
            variant={activeTag === "" ? "default" : "outline"}
            onClick={() => setActiveTag("")}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
