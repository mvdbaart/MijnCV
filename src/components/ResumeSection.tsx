import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description: string;
  type: "work" | "education";
}

const timeline: TimelineEntry[] = [
  {
    period: "2021 – heden",
    role: "ICT Professional / Servicedesk",
    company: "Vul bedrijfsnaam in",
    description:
      "Eerstelijns en tweedelijns support, procesverbetering via AI-automatisering, VoIP-beheer met 3CX en AFAS-integraties.",
    type: "work",
  },
  {
    period: "2019 – 2021",
    role: "VoIP Engineer",
    company: "Vul bedrijfsnaam in",
    description:
      "Implementatie en beheer van 3CX telefonieoplossingen. Callflow-ontwikkeling met API-koppelingen naar externe systemen.",
    type: "work",
  },
  {
    period: "2017 – 2019",
    role: "Medewerker IT Support",
    company: "Vul bedrijfsnaam in",
    description:
      "Gebruikersondersteuning, hardware/software installaties en netwerkbeheer.",
    type: "work",
  },
  {
    period: "2015 – 2017",
    role: "MBO ICT — Beheer",
    company: "Vul school in",
    description: "Opleiding ICT-beheer met focus op netwerken en systemen.",
    type: "education",
  },
];

const ResumeSection = () => {
  // #9 — timeline line draw-in
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="resume" className="bg-gray-950/80 px-6 py-24 md:px-12 lg:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
            Carrière
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ervaring &amp; Opleiding
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-amber-400/40" />
        </motion.div>

        <div ref={sectionRef} className="relative">
          {/* #9 — static bg line */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/5 md:left-6" />
          {/* #9 — animated foreground line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 top-0 w-px origin-top bg-amber-400/40 md:left-6"
          />

          <div className="space-y-10">
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="relative flex gap-6 pl-14 md:pl-16"
              >
                {/* dot */}
                <div className="absolute left-3 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-gray-950 md:left-[14px]">
                  {entry.type === "work" ? (
                    <Briefcase className="h-2.5 w-2.5 text-amber-400" />
                  ) : (
                    <GraduationCap className="h-2.5 w-2.5 text-blue-400" />
                  )}
                </div>

                {/* card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 hover:border-white/[0.14] hover:bg-white/[0.06]"
                >
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-white">{entry.role}</h3>
                    <span className="text-xs text-gray-500">{entry.period}</span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-amber-400/70">
                    {entry.company}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {entry.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
