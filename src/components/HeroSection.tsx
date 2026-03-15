import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  const bgY = useTransform(scrollY, [0, 800], [0, -120]);
  const bgScale = useTransform(scrollY, [0, 800], [1.1, 1.0]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <section className="relative flex h-screen w-full overflow-hidden pt-16">
      {/* ── LEFT PANEL — profile content ───────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex w-full items-center justify-center bg-gray-900 px-8 lg:w-1/2"
      >
        {/* subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:14px_24px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-lg text-center"
        >
          <Avatar className="mx-auto mb-6 h-36 w-36 ring-2 ring-white/10 ring-offset-2 ring-offset-gray-900">
            <AvatarImage
              src="https://media.licdn.com/dms/image/v2/D4E03AQFrHSYbIJFGuQ/profile-displayphoto-shrink_800_800/B4EZSY05rGGwAg-/0/1737730793009?e=1744243200&v=beta&t=rCwpHLiTK0iElRgP02Plfx4ix6_OnCbdaROIBiJv7hA"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-700 text-2xl text-white">
              MB
            </AvatarFallback>
          </Avatar>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            {name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-5 text-lg font-medium tracking-widest text-amber-400/80 uppercase"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg"
          >
            {summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2 border-white/20 bg-transparent text-white",
                "hover:border-white/40 hover:bg-white/10 hover:text-white",
              )}
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2 border-white/20 bg-transparent text-white",
                "hover:border-white/40 hover:bg-white/10 hover:text-white",
              )}
              asChild
            >
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-amber-500 text-gray-900 hover:bg-amber-400"
              asChild
            >
              <a href={email}>
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* bouncing scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-gray-600" />
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL — WebP with parallax ──────────────── */}
      <div className="hidden overflow-hidden lg:block lg:w-1/2">
        <motion.img

          src="/output_optimized.gif"
          alt=""
          style={{ y: bgY, scale: bgScale }}
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        {/* left-edge fade into dark panel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent" />
          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
      </div>


      {/* ── MOBILE — GIF strip ─────────────────────────────── */}
      <div className="absolute inset-x-0 top-16 h-48 overflow-hidden lg:hidden">
        <img
          src="/output_optimized.gif"
          alt=""
          className="h-full w-full object-cover object-top opacity-30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
      </div>
    </section>
  );
};

export default HeroSection;
