import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/mvdbaart",
    icon: Github,
    description: "github.com/mvdbaart",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mvdbaart/",
    icon: Linkedin,
    description: "linkedin.com/in/mvdbaart",
  },
  {
    label: "Email",
    href: "mailto:maarten@vandenbaart.nl",
    icon: Mail,
    description: "maarten@vandenbaart.nl",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="bg-gray-900 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400/70">
            Bereikbaar
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Contact</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-amber-400/40" />
          <p className="mt-6 text-gray-400">
            Neem gerust contact op via een van de onderstaande kanalen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-4 p-5 transition-colors hover:bg-white/5 ${
                  i < links.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Icon className="h-4 w-4 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{link.label}</p>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-600" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
