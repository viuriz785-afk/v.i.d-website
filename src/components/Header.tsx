import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4 md:px-16 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-md py-3'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with glitch or premium font */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="font-display text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-neutral-900 dark:text-white transition-colors duration-300"
          >
            V.I.D<span className="text-red-600">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="relative text-xs tracking-[0.2em] font-medium uppercase text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300 py-2 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Controls */}
            <div className="flex items-center gap-4 border-l border-neutral-200 dark:border-neutral-800 pl-6">
              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors duration-300 cursor-pointer"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDarkMode ? 'dark' : 'light'}
                    initial={{ y: -10, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Get in Touch CTA */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="text-xs font-semibold uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 px-5 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:scale-105"
              >
                Mulai Project
              </a>
            </div>
          </div>

          {/* Mobile navigation toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme Toggle in Mobile */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors duration-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Menu icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-neutral-950/95 flex flex-col justify-center items-center backdrop-blur-lg"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-display text-2xl font-semibold tracking-widest text-neutral-400 hover:text-white hover:scale-105 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="text-sm font-bold uppercase tracking-widest bg-red-600 text-white px-8 py-3 rounded-sm transition-all duration-300 hover:bg-red-700"
                >
                  Mulai Project
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
