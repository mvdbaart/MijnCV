import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title?: string;
  description?: string;
  detail?: string;
  imageUrl?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features.",
  detail,
  imageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  tags = ["React", "TypeScript", "Tailwind"],
  githubUrl = "#",
  liveUrl = "#",
}: ProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]"
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-base font-semibold text-white">{title}</h3>
        <p className="mb-3 text-sm leading-relaxed text-gray-400">{description}</p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="border border-white/10 bg-white/5 text-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Expandable detail */}
        {detail && (
          <div className="mb-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
              {expanded ? "Minder info" : "Meer info"}
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-xs leading-relaxed text-gray-400 border-l-2 border-amber-400/30 pl-3">
                    {detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Buttons — pushed to bottom */}
        <div className="mt-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-1.5 border-white/20 bg-transparent text-gray-300",
              "hover:border-white/40 hover:bg-white/10 hover:text-white",
            )}
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-amber-500 text-gray-900 hover:bg-amber-400"
            asChild
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
