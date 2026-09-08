import { useState, useEffect } from 'react';
import { Project } from './types';
import { INITIAL_PROJECTS } from './data';

import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isDarkMode, setIsDarkMode] = useState(true); // default to elegant dark mode
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  // Initialize theme settings
  useEffect(() => {
    // Load theme setting
    const storedTheme = localStorage.getItem('vid_studio_theme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  // Sync theme status to HTML class list
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('vid_studio_theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const handleOpenLightbox = (idx: number) => {
    setSelectedProjectIndex(idx);
  };

  const handleCloseLightbox = () => {
    setSelectedProjectIndex(null);
  };

  const handlePrevProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + projects.length) % projects.length;
    });
  };

  const handleNextProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % projects.length;
    });
  };

  const bromoIndex = projects.findIndex((p) => p.id === 'p_land_2' || p.name.toLowerCase().includes('bromo'));
  const showreelIndex = bromoIndex !== -1 ? bromoIndex : 8;

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-[#0a0a0a] bg-neutral-50 selection:bg-red-600 selection:text-white">
      {/* Premium Cursor follower */}
      <CustomCursor />

      {/* Main floating navigation header */}
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Full screen cinematic main showcase */}
      <Hero onPlayShowreel={() => handleOpenLightbox(showreelIndex)} />

      {/* Dynamic Counter Block */}
      <StatsBar />

      {/* Studio details & values bento grids */}
      <About />

      {/* The main grid/slider showcase */}
      <Portfolio
        projects={projects}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Interactive creative services layout */}
      <Services />

      {/* Client Intake Form & Call Channels */}
      <Contact />

      {/* Final footer */}
      <Footer />

      {/* Floating social support */}
      <WhatsAppFloat />

      {/* Full screen video modal */}
      <Lightbox
        project={selectedProjectIndex !== null ? projects[selectedProjectIndex] : null}
        onClose={handleCloseLightbox}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        currentIndex={selectedProjectIndex ?? 0}
        totalProjects={projects.length}
      />
    </div>
  );
}
