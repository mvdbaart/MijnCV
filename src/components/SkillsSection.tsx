import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 1–5
}

const skills: { category: string; items: Skill[] }[] = [
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
      { name: "Supabase", level: 4 },
      { name: "REST APIs", level: 5 },
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

const tagVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const SkillDots = ({ level }: { level: number }) => (
  <span className="ml-2 inline-flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          i < level ? "bg-amber-400" : "bg-white/15"
        }`}
      />
    ))}
  </span>
);

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
              <motion.div
                variants={containerVariants}
                className="flex flex-col gap-2"
              >
                {group.items.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={tagVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
                  >
                    <span>{skill.name}</span>
                    <SkillDots level={skill.level} />
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
