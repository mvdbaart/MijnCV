import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// #10 — dark-themed cards + image zoom hover + expandable details

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
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose.",
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
      className="group w-full"
    >
      <div className="h-full overflow-hidden rounded-xl border border-white/[0.08] bg-gray-800/50 shadow-lg transition-colors hover:border-amber-400/20">
        {/* image */}
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>

          {/* tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="border border-white/10 bg-white/5 text-xs text-gray-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* expand toggle — only shown when detail text is available */}
          {detail && (
            <>
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
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 border-l-2 border-amber-400/30 pl-3 text-xs leading-relaxed text-gray-400">
                      {detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* footer */}
        <div className="flex justify-end gap-2 border-t border-white/[0.06] px-5 py-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1.5 text-xs text-gray-400",
              "hover:bg-white/10 hover:text-white",
            )}
            asChild
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-amber-500 text-xs text-gray-900 hover:bg-amber-400"
            asChild
          >
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
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
