import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Media", id: "media" },
  { label: "Advertising", id: "advertising" },
  { label: "Funding", id: "funding" },
  { label: "Trading", id: "trading" },
  { label: "Infrastructure", id: "infrastructure" },
  { label: "Principles", id: "principles" },
  { label: "Contact", id: "contact" },
];

interface NavbarProps {
  activeSection: number;
  sectionMap: Record<string, number>;
  onNavigate: (index: number) => void;
}

const Navbar = ({ activeSection, sectionMap, onNavigate }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    const index = sectionMap[id];
    if (index !== undefined) {
      onNavigate(index);
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-center h-14">
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => {
            const index = sectionMap[link.id];
            const isActive = index === activeSection;
            return (
              <li key={link.id} className="relative">
                <button
                  onClick={() => handleClick(link.id)}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden absolute right-6 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => {
              const index = sectionMap[link.id];
              const isActive = index === activeSection;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className={`text-sm tracking-wide transition-colors ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
