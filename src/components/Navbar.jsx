import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Moon, Sun, Menu, X } from "lucide-react";
import { personal } from "../data/portfolio";

const navLinks = [
  { label: "Home", to: "hero" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Education", to: "education" },
  { label: "Contact", to: "contact" },
];

export default function Navbar({ darkMode, toggleDark }) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-100/90 dark:bg-navy-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <span className="font-display text-lg font-semibold text-gray-900 dark:text-cream-100 tracking-tight">
          {personal.displayName}
        </span>

        
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onSetActive={() => setActive(link.to)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                active === link.to
                  ? "bg-gray-900 text-white dark:bg-cream-100 dark:text-navy-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cream-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleDark}
            className="ml-3 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleDark} className="p-2 rounded-full text-gray-600 dark:text-gray-400">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full text-gray-600 dark:text-gray-400">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-cream-100 dark:bg-navy-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                active === link.to
                  ? "bg-gray-900 text-white dark:bg-cream-100 dark:text-navy-900"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
