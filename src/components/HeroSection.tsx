import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const { scrollY } = useScroll();
  const gifY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section className="relative flex h-screen w-full overflow-hidden pt-16">
      {/* ── LEFT PANEL — content ───────────────────────────── */}
      <div className="relative flex w-full items-center justify-center bg-gray-900 px-8 lg:w-1/2">
        {/* subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_24px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg text-center"
        >
          <Avatar className="mx-auto mb-6 h-40 w-40">
            <AvatarImage
              src="https://media.licdn.com/dms/image/v2/D4E03AQFrHSYbIJFGuQ/profile-displayphoto-shrink_800_800/B4EZSY05rGGwAg-/0/1737730793009?e=1744243200&v=beta&t=rCwpHLiTK0iElRgP02Plfx4ix6_OnCbdaROIBiJv7hA"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-700 text-white">MB</AvatarFallback>
          </Avatar>

          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {name}
          </h1>
          <h2 className="mb-5 text-xl font-medium text-gray-300 md:text-2xl">
            {title}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg">
            {summary}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "flex items-center gap-2 border-white/30 text-white",
                "hover:bg-white/10 hover:text-white",
              )}
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
              className={cn(
                "flex items-center gap-2 border-white/30 text-white",
                "hover:bg-white/10 hover:text-white",
              )}
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
              className={cn(
                "flex items-center gap-2 border-white/30 text-white",
                "hover:bg-white/10 hover:text-white",
              )}
              asChild
            >
              <a href={email}>
                <Mail className="h-5 w-5" />
                Contact
              </a>
            </Button>
          </div>
        </motion.div>

        {/* bouncing scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="h-8 w-8 text-gray-500" />
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — GIF with parallax ───────────────── */}
      <div className="hidden overflow-hidden lg:block lg:w-1/2">
        <motion.img
          src="/hero-bg.gif"
          alt=""
          style={{ y: gifY }}
          className="h-[115%] w-full object-cover object-center"
          aria-hidden="true"
        />
        {/* left-edge fade so it blends into the dark left panel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent" />
        </div>
      </div>

      {/* ── MOBILE — GIF shown as top strip (< lg) ─────────── */}
      <div className="absolute inset-x-0 top-16 h-40 overflow-hidden lg:hidden">
        <img
          src="/hero-bg.gif"
          alt=""
          className="h-full w-full object-cover object-top opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
      </div>
    </section>
  );
};

export default HeroSection;
