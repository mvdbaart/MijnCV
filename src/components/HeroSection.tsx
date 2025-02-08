import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  summary?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

const HeroSection = ({
  name = "Maarten van den Baart",
  title = "ICT Professional",
  summary = "Gepassioneerd probleemoplosser op de servicedesk, creatieve en innovatieve oplossingen voor procesverbetering, AI enthousiasteling. VoIP engineer met 3CX specialisme. AI programmeur.",
  githubUrl = "https://github.com/mvdbaart",
  linkedinUrl = "https://www.linkedin.com/in/mvdbaart/",
  email = "mailto:maarten@vandenbaart.nl",
}: HeroSectionProps) => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white md:text-7xl">
            {name}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </h1>
          <h2 className="mb-6 text-2xl font-medium text-gray-600 dark:text-gray-300 md:text-3xl">
            {title}
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            {summary}
          </p>

          <div className="mb-12 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              asChild
            >
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              asChild
            >
              <a href={email}>
                <Mail className="h-5 w-5" />
                Contact
              </a>
            </Button>
          </div>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
