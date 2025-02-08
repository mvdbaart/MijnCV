import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

interface NavbarProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const Navbar = ({
  sections = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "CV" },
    { id: "contact", label: "Contact" },
  ],
}: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a
            href="#"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Portfolio
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className={`${
                activeSection === section.id
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="mt-6 flex flex-col space-y-3">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeSection === section.id
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    }`}
                    onClick={() => {
                      scrollToSection(section.id);
                    }}
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
