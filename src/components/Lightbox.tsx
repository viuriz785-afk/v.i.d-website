import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalProjects: number;
}

export default function Lightbox({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalProjects,
}: LightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setIsPlaying(false);
        setVideoError(false);
        onPrev();
      }
      if (e.key === 'ArrowRight') {
        setIsPlaying(false);
        setVideoError(false);
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  // Reset play state when project changes
  useEffect(() => {
    setIsPlaying(false);
    setVideoError(false);
  }, [project]);

  if (!project) return null;

  // Extract Drive File ID if present
  const getDriveFileId = (url: string) => {
    if (!url) return null;
    if (url.includes('drive.google.com/file/d/')) {
      return url.split('/d/')[1]?.split('/')[0] || null;
    }
    return null;
  };

  const driveFileId = getDriveFileId(project.video);
  const driveDirectStreamUrl = driveFileId ? `https://lh3.googleusercontent.com/d/${driveFileId}` : null;

  // Process video link to ensure embed format if YouTube or Drive
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Check if it is a standard youtube link and convert to embed
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('shorts/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    // Google Drive share link -> preview link
    if (driveFileId) {
      return `https://drive.google.com/file/d/${driveFileId}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(project.video);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className={`relative bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-lg w-full ${
            project.isPortrait ? 'max-w-md sm:max-w-lg md:max-w-2xl max-h-[95vh]' : 'max-w-5xl max-h-[92vh]'
          } overflow-hidden z-10 shadow-2xl flex flex-col transition-colors duration-300`}
        >
          {/* Top Sticky Header with Title & Close Button */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/90 dark:bg-[#121212]/95 backdrop-blur-md z-30 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 rounded-sm shrink-0">
                {project.category}
              </span>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[140px] sm:max-w-xs">
                {project.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.video && (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded transition-colors flex items-center gap-1 shrink-0"
                  title="Buka Video di Tab Baru / App Google Drive"
                >
                  <span>Buka Video</span> ↗
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-500 hover:scale-110 transition-all duration-200 cursor-pointer shrink-0 ml-1"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Container for Media & Content */}
          <div className="overflow-y-auto flex-1 flex flex-col">
            {/* Media Player Frame */}
            <div className="relative w-full bg-black shrink-0 flex items-center justify-center p-2 sm:p-4 min-h-[320px]">
              <div className={`relative ${
                project.isPortrait
                  ? 'h-[58vh] sm:h-[65vh] max-h-[580px] aspect-[9/16] mx-auto rounded-md border border-neutral-800'
                  : 'w-full aspect-video rounded-md border border-neutral-800'
              } bg-black flex items-center justify-center group overflow-hidden shadow-2xl`}>
                {isPlaying && (driveDirectStreamUrl || embedUrl) ? (
                  driveDirectStreamUrl && !videoError ? (
                    <video
                      src={driveDirectStreamUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain bg-black"
                      onError={() => setVideoError(true)}
                    />
                  ) : (
                    <iframe
                      src={embedUrl}
                      title={project.name}
                      className="w-full h-full border-none bg-black"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.75] scale-100 group-hover:scale-105 transition-transform duration-700 bg-neutral-950"
                    />
                    {/* Visual Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {embedUrl ? (
                      <motion.button
                        onClick={() => setIsPlaying(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] cursor-pointer transition-all z-10"
                      >
                        <Play size={24} className="fill-white translate-x-0.5" />
                      </motion.button>
                    ) : (
                      <span className="text-xs text-neutral-400 tracking-[0.2em] font-medium uppercase bg-black/60 px-6 py-3 rounded-full border border-neutral-800 backdrop-blur-sm z-10">
                        Video belum tersedia
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Helper Banner when playing video */}
            {isPlaying && project.video && (
              <div className="bg-neutral-900 border-y border-neutral-800 px-4 py-2 flex items-center justify-between text-xs text-neutral-300 shrink-0">
                <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 truncate pr-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span>Putar Konten Sinematik</span>
                </span>
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-950/40 hover:bg-red-950/80 px-2.5 py-1 rounded border border-red-500/30 transition-colors shrink-0"
                >
                  <span>Tonton Fullscreen (Rekomendasi HP)</span> ↗
                </a>
              </div>
            )}

            {/* Lightbox Information Details */}
            <div className={`p-5 md:p-6 ${
              project.isPortrait ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-12 gap-6 items-start'
            }`}>
              {/* Meta */}
              <div className={project.isPortrait ? 'space-y-3' : 'md:col-span-8 space-y-4'}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-red-600 dark:text-red-500 block">
                    {project.category}
                  </span>
                  {project.isPortrait && (
                    <span className="px-2 py-0.5 text-[8px] bg-red-600/10 text-red-600 dark:text-red-400 font-bold rounded-sm uppercase tracking-wider">
                      📱 Portrait 9:16
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg md:text-2xl font-extrabold text-neutral-950 dark:text-white leading-tight">
                  {project.name}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] tracking-wider uppercase border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation and Indicators */}
              <div className={
                project.isPortrait
                  ? 'flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-2'
                  : 'md:col-span-4 flex flex-col md:items-end justify-between h-full md:text-right border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-4 md:pt-0 md:pl-6 gap-4'
              }>
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase block">
                    Project Index
                  </span>
                  <span className="font-display text-base font-bold text-neutral-900 dark:text-white block">
                    {currentIndex + 1} <span className="text-neutral-400 dark:text-neutral-600 font-light">/</span> {totalProjects}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      onPrev();
                    }}
                    className="p-2.5 rounded-sm border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                    title="Previous Project (Arrow Left)"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      onNext();
                    }}
                    className="p-2.5 rounded-sm border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                    title="Next Project (Arrow Right)"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
