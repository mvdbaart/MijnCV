import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const Navbar = ({
  sections = [
    { id: "hero", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "resume", label: "CV" },
    { id: "projects", label: "Projecten" },
    { id: "contact", label: "Contact" },
  ],
}: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // #5 — scroll progress bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // #6 — IntersectionObserver for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 h-16 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-gray-900/95 backdrop-blur-md"
          : "border-transparent bg-gray-900/80 backdrop-blur-sm",
      )}
    >
      {/* #5 — scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-amber-400"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="font-mono text-lg font-bold tracking-tight text-white"
        >
          MvdB<span className="text-amber-400">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              className={cn(
                "relative text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white",
              )}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
              {/* active indicator dot */}
              {activeSection === section.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400"
                />
              )}
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[240px] border-white/10 bg-gray-900 sm:w-[300px]"
            >
              <div className="mt-8 flex flex-col gap-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white",
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
