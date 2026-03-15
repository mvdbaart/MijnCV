import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_FRAMES = 51;
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i * 2 + 1).padStart(3, "0");
  return `/frames_hero/frame_${n}.webp`;
});

const VH = typeof window !== "undefined" ? window.innerHeight : 800;

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
  const contentOpacity = useTransform(scrollY, [0, VH * 0.6], [1, 0]);
  const contentY = useTransform(scrollY, [0, VH * 0.6], [0, -60]);
  const [frameIndex, setFrameIndex] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const progress = Math.min(1, Math.max(0, y / VH));
    setFrameIndex(Math.round(progress * (TOTAL_FRAMES - 1)));
  });

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    // Outer wrapper: 200vh gives scroll range while section stays pinned
    <div className="relative h-[200vh]">
      <section className="sticky top-0 h-screen w-full overflow-hidden pt-16">

        {/* ── Full-screen frame background ─────────────────────── */}
        <img
          src={FRAMES[frameIndex]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Subtle grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* ── Content overlay ───────────────────────────────────── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <Avatar className="mb-5 h-28 w-28 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent md:h-36 md:w-36">
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
              className="mb-2 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              {name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-5 text-sm font-medium tracking-widest text-amber-400/90 uppercase md:text-lg"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-8 max-w-lg text-sm leading-relaxed text-gray-300 md:text-base"
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
        </motion.div>

        {/* Bouncing scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-white/40" />
        </motion.div>

      </section>
    </div>
  );
};

export default HeroSection;
