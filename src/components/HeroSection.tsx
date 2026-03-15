import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  name?: string;
  title?: string;
  summary?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

// #1 — typewriter roles
const ROLES = [
  "ICT Professional",
  "VoIP Engineer",
  "AI Developer",
  "Probleemoplosser",
];

const HERO_FRAME_SOURCES = Array.from(
  { length: 51 },
  (_, index) =>
    `/frames_hero/frame_${String(index * 2 + 1).padStart(3, "0")}.webp`,
);

function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const current = words[idx];
    if (phase === "typing") {
      if (chars === current) {
        const t = setTimeout(() => setPhase("deleting"), 2200);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setChars(current.slice(0, chars.length + 1)),
        80,
      );
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (chars === "") {
        setIdx((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setChars(chars.slice(0, -1)), 42);
      return () => clearTimeout(t);
    }
  }, [chars, phase, idx, words]);

  return chars;
}

const DECO_FRAMES = [
  { w: 280, h: 280, top: "10%",  left: "-8%",  rotate: 12,  duration: 22, color: "rgba(251,191,36,0.07)" },
  { w: 180, h: 180, top: "60%",  left: "5%",   rotate: -8,  duration: 18, color: "rgba(255,255,255,0.04)" },
  { w: 340, h: 340, top: "20%",  left: "55%",  rotate: 25,  duration: 28, color: "rgba(251,191,36,0.05)" },
  { w: 120, h: 120, top: "75%",  left: "70%",  rotate: -15, duration: 15, color: "rgba(255,255,255,0.06)" },
  { w: 220, h: 220, top: "-5%",  left: "35%",  rotate: 5,   duration: 32, color: "rgba(251,191,36,0.04)" },
];

const HeroSection = ({
  name = "Maarten van den Baart",
  summary = "Gepassioneerd probleemoplosser op de servicedesk, creatieve en innovatieve oplossingen voor procesverbetering, AI enthousiasteling. VoIP engineer met 3CX specialisme. AI programmeur.",
  githubUrl = "https://github.com/mvdbaart",
  linkedinUrl = "https://www.linkedin.com/in/mvdbaart/",
  email = "mailto:maarten@vandenbaart.nl",
}: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollY, [0, 800], [0, -120]);
  const bgScale = useTransform(scrollY, [0, 800], [1.1, 1.0]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hasFramePreloadError, setHasFramePreloadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all(
      HERO_FRAME_SOURCES.map(
        (frameSrc) =>
          new Promise<void>((resolve, reject) => {
            const frameImage = new Image();
            frameImage.src = frameSrc;
            frameImage.onload = () => resolve();
            frameImage.onerror = () =>
              reject(new Error(`Could not preload frame: ${frameSrc}`));
          }),
      ),
    ).catch(() => {
      if (isMounted) {
        setHasFramePreloadError(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      const clampedProgress = Math.min(1, Math.max(0, value));
      const maxFrameIndex = HERO_FRAME_SOURCES.length - 1;
      const nextFrameIndex = Math.round(clampedProgress * maxFrameIndex);
      setCurrentFrameIndex(nextFrameIndex);
    });
  }, [scrollYProgress]);

  const currentFrameSrc = hasFramePreloadError
    ? HERO_FRAME_SOURCES[0]
    : HERO_FRAME_SOURCES[currentFrameIndex];

  // #1 — typewriter
  const role = useTypewriter(ROLES);

  // #4 — cursor spotlight
  const panelRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseLeave = () => setMouse({ x: -9999, y: -9999 });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden pt-16"
    >
      {/* ── LEFT PANEL ───────────────────────────────────── */}
      <motion.div
        ref={panelRef}
        style={{ opacity: contentOpacity, y: contentY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex w-full items-center justify-center overflow-hidden bg-transparent px-8 lg:w-1/2 lg:bg-gray-900"
      >
        {/* decorative rotating border frames */}
        {DECO_FRAMES.map((f, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-sm border"
            style={{ width: f.w, height: f.h, top: f.top, left: f.left, borderColor: f.color }}
            animate={{ rotate: [f.rotate, f.rotate + 360], y: [0, -18, 0] }}
            transition={{
              rotate: { duration: f.duration, repeat: Infinity, ease: "linear" },
              y: { duration: f.duration / 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}

        {/* subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* #4 — cursor spotlight layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(251,191,36,0.07) 0%, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-lg text-center"
        >
          <Avatar className="mx-auto mb-6 h-36 w-36 ring-2 ring-white/10 ring-offset-2 ring-offset-gray-900">
            <AvatarImage
              src="/output_optimized.gif"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-700 text-2xl text-white">
              MB
            </AvatarFallback>
          </Avatar>

          {/* #2 — availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Beschikbaar voor nieuwe kansen
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            {name}
          </motion.h1>

          {/* #1 — typewriter title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-5 h-7 text-lg font-medium tracking-widest text-amber-400/80 uppercase"
          >
            {role}
            <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-amber-400/70 align-middle text-amber-400">
              |
            </span>
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
            {/* #3 — download CV */}
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2 border-white/20 bg-transparent text-white",
                "hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300",
              )}
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4" />
              Download CV
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

      {/* ── RIGHT PANEL — scroll-driven frame sequence ─────── */}
      <div className="hidden overflow-hidden lg:block lg:w-1/2">
        <motion.img
          src={currentFrameSrc}
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

    </section>
  );
};

export default HeroSection;
