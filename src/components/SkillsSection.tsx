import React from "react";
import { motion } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    category: "Backend & Cloud",
    items: ["Node.js", "Python", "Supabase", "REST APIs", "SQL"],
  },
  {
    category: "Tools & Specialismen",
    items: ["3CX / VoIP", "AFAS", "AI / LLMs", "Git", "Claude AI"],
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
                className="flex flex-wrap gap-2"
              >
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-200 transition-colors hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
                  >
                    {skill}
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
