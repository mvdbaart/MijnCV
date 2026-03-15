import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// #8 — proficiency dot indicators (1–5)
interface SkillItem {
  name: string;
  level: number; // 1–5
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "Vite", level: 4 },
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      { name: "Node.js", level: 3 },
      { name: "Python", level: 4 },
      { name: "Supabase", level: 3 },
      { name: "REST APIs", level: 4 },
      { name: "SQL", level: 3 },
    ],
  },
  {
    category: "Tools & Specialismen",
    items: [
      { name: "3CX / VoIP", level: 5 },
      { name: "AFAS", level: 4 },
      { name: "AI / LLMs", level: 5 },
      { name: "Git", level: 4 },
      { name: "Claude AI", level: 5 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const columnVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ProficiencyDots({ level }: { level: number }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            i < level ? "bg-amber-400" : "bg-white/15",
          )}
        />
      ))}
    </span>
  );
}

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-gray-900 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
            Expertise
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Vaardigheden
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-amber-400/40" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {skills.map((group) => (
            <motion.div key={group.category} variants={columnVariants}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
                {group.category}
              </p>
              <div className="space-y-3">
                {group.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 hover:border-amber-400/20 hover:bg-amber-400/5"
                  >
                    <span className="text-sm text-gray-200">{skill.name}</span>
                    <ProficiencyDots level={skill.level} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
