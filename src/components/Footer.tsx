import { Instagram, Youtube, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0c0c0c] border-t border-neutral-200/50 dark:border-neutral-800/50 py-12 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand / Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <a
            href="#home"
            className="font-display text-xl font-black tracking-[0.2em] text-neutral-950 dark:text-white"
          >
            V.I.D<span className="text-red-600">.</span> Studio
          </a>
          <span className="text-[10px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase font-light">
            Batam, Indonesia
          </span>
        </div>

        {/* Tagline centered style */}
        <div className="font-rajdhani text-base md:text-lg italic font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
          "Every Frame Tells a Story."
        </div>

        {/* Social shortcut row */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/vidstudio.id"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all"
            aria-label="Instagram Profile"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all"
            aria-label="YouTube Channel"
          >
            <Youtube size={16} />
          </a>
          <a
            href="mailto:viuriz785@gmail.com"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all"
            aria-label="Email Address"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-light">
          © {currentYear} V.I.D Studio. All rights reserved.
        </span>
        <div className="flex gap-4 text-[9px] tracking-widest text-neutral-400 uppercase font-medium">
          <a href="#about" className="hover:text-red-600 transition-colors">
            About Us
          </a>
          <span className="text-neutral-300 dark:text-neutral-800">/</span>
          <a href="#services" className="hover:text-red-600 transition-colors">
            Services
          </a>
          <span className="text-neutral-300 dark:text-neutral-800">/</span>
          <a href="#contact" className="hover:text-red-600 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
