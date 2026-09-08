import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Upload, Play, Film, Camera } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { CATEGORY_LABELS } from '../data';
import PhotoGallery from './PhotoGallery';


interface PortfolioProps {
  projects: Project[];
  onOpenLightbox: (index: number) => void;
}

interface SliderSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  items: Project[];
  isPortrait: boolean;
  onOpenLightbox: (globalIndex: number) => void;
  projects: Project[];
  idPrefix: string;
}

function SliderSection({
  title,
  subtitle,
  badgeText,
  items,
  isPortrait,
  onOpenLightbox,
  projects,
  idPrefix,
}: SliderSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check screen size for dynamic layout calculations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset index when items filter changes
  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [items]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let minDiff = Infinity;
    let activeIdx = 0;
    const children = container.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    }

    if (activeIdx !== activeIndex && activeIdx < items.length) {
      setActiveIndex(activeIdx);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const children = container.children;
    const child = children[idx] as HTMLElement;
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
        behavior: 'smooth',
      });
      setActiveIndex(idx);
    }
  };

  const handleCardClick = (idx: number, globalIndex: number) => {
    if (idx === activeIndex) {
      onOpenLightbox(globalIndex);
    } else {
      scrollToIndex(idx);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-sm">
        <p className="text-sm text-neutral-400 dark:text-neutral-500 font-light">
          Tidak ada video di kategori ini.
        </p>
      </div>
    );
  }

  // Width of items:
  // Portrait: mobile is 220px, desktop is 280px
  // Landscape: mobile is 300px, desktop is 480px
  const itemWidthClass = isPortrait ? 'w-[220px] md:w-[280px]' : 'w-[300px] md:w-[480px]';

  // Calculate left/right paddings so that first and last items snap perfectly to the exact center
  const paddingStyle = isPortrait
    ? {
        paddingLeft: isMobile ? 'calc(50vw - 110px)' : 'calc(50vw - 140px)',
        paddingRight: isMobile ? 'calc(50vw - 110px)' : 'calc(50vw - 140px)',
      }
    : {
        paddingLeft: isMobile ? 'calc(50vw - 150px)' : 'calc(50vw - 240px)',
        paddingRight: isMobile ? 'calc(50vw - 150px)' : 'calc(50vw - 240px)',
      };

  const getOrdinal = (i: number) => {
    const num = i + 1;
    if (num === 1) return '1st';
    if (num === 2) return '2nd';
    if (num === 3) return '3rd';
    return `${num}th`;
  };

  return (
    <div id={`${idPrefix}-section`} className="space-y-6 pt-4">
      {/* Section Title */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[9px] bg-red-600/10 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold uppercase tracking-wider rounded-sm">
              {badgeText}
            </span>
          </div>
          <h3 className="font-display text-lg md:text-2xl font-extrabold text-neutral-950 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Slider Display */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={paddingStyle}
          className="flex gap-4 md:gap-8 overflow-x-auto scroll-snap-x scroll-smooth pb-10 pt-6 scrollbar-none snap-x snap-mandatory relative z-10"
        >
          {items.map((project, index) => {
            const globalIndex = projects.findIndex((p) => p.id === project.id);
            const isActive = index === activeIndex;

            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(index, globalIndex)}
                className={`flex-none ${itemWidthClass} scroll-snap-align-center snap-center relative transition-all duration-500 ease-out cursor-pointer select-none`}
                style={{
                  transform: isActive ? 'scale(1.04)' : 'scale(0.88) translateY(10px)',
                  opacity: isActive ? 1 : 0.45,
                  zIndex: isActive ? 10 : 1,
                }}
              >
                {/* Visual Card Body */}
                <div
                  className={`bg-white dark:bg-[#121212] border ${
                    isActive
                      ? 'border-red-500/50 dark:border-red-500/40 shadow-2xl'
                      : 'border-neutral-200/50 dark:border-neutral-800/50 shadow-sm'
                  } rounded-lg overflow-hidden transition-all duration-300 flex flex-col h-full`}
                >
                  {/* Media Frame */}
                  <div
                    className={`relative ${
                      isPortrait ? 'aspect-[9/16]' : 'aspect-video'
                    } w-full overflow-hidden bg-neutral-900`}
                  >
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 pointer-events-none">
                      <div className="bg-red-600 text-white font-display text-xs font-bold uppercase px-2.5 py-1.5 rounded-sm shadow-md">
                        {getOrdinal(index)}
                      </div>
                    </div>

                    {/* Image asset */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover brightness-[0.95]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70" />

                    {/* Hover Overlay Play Icon (Only active for current center card) */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-14 h-14 rounded-full border border-red-500 bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                        >
                          <Play size={20} className="fill-white translate-x-0.5" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Information block */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-red-600 dark:text-red-500 block">
                        {project.category}
                      </span>
                      <h4 className="font-display text-sm md:text-base font-extrabold text-neutral-900 dark:text-white line-clamp-1">
                        {project.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tags list */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] tracking-wider uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 font-medium rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Controls (Left, Count, Right) as requested */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          id={`${idPrefix}-prev-btn`}
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="p-3.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shadow-sm"
          aria-label="Previous Project"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
          {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>

        <button
          id={`${idPrefix}-next-btn`}
          onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
          disabled={activeIndex === items.length - 1}
          className="p-3.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shadow-sm"
          aria-label="Next Project"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Portfolio({ projects, onOpenLightbox }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'all' | 'video' | 'photo'>('all');

  // Filter projects by category first
  const baseFilteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.filterKey === activeFilter);

  // Divide into portrait and landscape arrays
  const portraitProjects = baseFilteredProjects.filter((p) => p.isPortrait);
  const landscapeProjects = baseFilteredProjects.filter((p) => !p.isPortrait);

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-16 bg-[#faf9f6] dark:bg-[#0d0d0d] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block with Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-red-600 dark:text-red-500 font-bold block mb-3">
              Koleksi Portofolio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
              Karya <span className="text-red-600">Terbaik</span> Kami
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* View Mode Switcher (All / Video / Photo) */}
            <div className="flex items-center bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-1 rounded-sm shadow-sm">
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  viewMode === 'all'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setViewMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  viewMode === 'video'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Film size={12} />
                <span>Video</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  viewMode === 'photo'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Camera size={12} />
                <span>Foto</span>
              </button>
            </div>

            {/* Contact scroll */}
            <a
              id="diskusi-project-btn"
              href="#contact"
              className="w-full sm:w-auto text-center text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 px-6 py-3.5 rounded-sm transition-all duration-300 shadow-sm hover:shadow-red-500/20 hover:scale-[1.03]"
            >
              Diskusi Project
            </a>
          </div>
        </div>

        {/* Video Section */}
        {(viewMode === 'all' || viewMode === 'video') && (
          <div className="space-y-12">
            {/* Filter Categories Pill Tags */}
            <div className="flex flex-wrap gap-2 pt-2 overflow-x-auto pb-2 scrollbar-none">
              {(Object.keys(CATEGORY_LABELS) as Array<ProjectCategory | 'all'>).map((key) => (
                <button
                  id={`filter-pill-${key}`}
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`text-[10px] tracking-[0.25em] font-semibold uppercase px-5 py-2.5 rounded-sm border transition-all duration-300 cursor-pointer ${
                    activeFilter === key
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white dark:bg-[#121212] text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[key]}
                </button>
              ))}
            </div>

            {/* Dual Slider Rows: Upper is Portrait, Lower is Landscape */}
            <div className="space-y-16">
              {/* Row 1: Portrait Video (Vertical Format) */}
              <SliderSection
                idPrefix="portrait-videos"
                title="Video Potret"
                subtitle="Rasio vertikal 9:16 untuk kebutuhan Reels, TikTok, dan Shorts"
                badgeText="📱 Portrait 9:16"
                items={portraitProjects}
                isPortrait={true}
                onOpenLightbox={onOpenLightbox}
                projects={projects}
              />

              {/* Row 2: Landscape Video (Horizontal Format) */}
              <SliderSection
                idPrefix="landscape-videos"
                title="Video Landscape"
                subtitle="Sinematik rasio 16:9 untuk kebutuhan Commercial, Youtube, & Corporate Film"
                badgeText="📺 Landscape 16:9"
                items={landscapeProjects}
                isPortrait={false}
                onOpenLightbox={onOpenLightbox}
                projects={projects}
              />
            </div>
          </div>
        )}

        {/* Photo Gallery Section */}
        {(viewMode === 'all' || viewMode === 'photo') && (
          <PhotoGallery />
        )}

      </div>
    </section>
  );
}

