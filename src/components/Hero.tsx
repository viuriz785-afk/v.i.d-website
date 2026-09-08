import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface HeroProps {
  onPlayShowreel: () => void;
}

export default function Hero({ onPlayShowreel }: HeroProps) {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-end overflow-hidden px-6 md:px-12 pb-10 md:pb-12">
      {/* Background Video Wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/10 dark:from-[#0a0a0a] dark:via-black/50 dark:to-transparent light:from-white/90 light:via-white/40 light:to-transparent z-10" />
        <div className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/40 light:bg-transparent z-10" />
        <video
          className="w-full h-full object-cover scale-[1.03] animate-[slowZoom_25s_ease-in-out_infinite_alternate]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/ouoedwap/video/upload/v1783417401/okee_sudah_bagus_buat_k_kaujtw.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Interactive Center Play Button (Positioned safely above text content) */}
      <div className="absolute top-[24%] sm:top-[28%] md:top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={onPlayShowreel}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(229,9,20,0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-red-500/40 bg-black/50 backdrop-blur-md flex items-center justify-center cursor-pointer group hover:border-red-500 transition-all duration-300 shadow-xl"
          title="Watch Showreel"
        >
          <Play size={26} className="text-red-500 fill-red-500 translate-x-0.5 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-24 right-6 md:right-12 z-20 flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase vertical-writing">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-red-600 to-transparent relative overflow-hidden">
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-red-400"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl lg:mx-0 lg:max-w-2xl xl:max-w-3xl w-full z-20 relative text-left">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase text-red-500 mb-4"
        >
          Cinematography · Content Creation · Visual Storytelling
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.9]"
        >
          Every <span className="text-red-600">V.I.D.</span> <br />
          Frame <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-rajdhani text-2xl sm:text-4xl md:text-6xl font-semibold capitalize text-red-500 italic block mt-3"
          >
            Tells a Story
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm md:text-base text-neutral-300 max-w-xl mt-6 font-light leading-relaxed dark:text-neutral-300 light:text-neutral-200"
        >
          V.I.D Studio — Creative visual agency berbasis di Batam yang membantu bisnis Anda berkembang melalui konten visual berkualitas sinematik.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center gap-6 mt-8 md:mt-10"
        >
          <a
            href="#portfolio"
            className="text-[11px] font-bold tracking-[0.25em] uppercase bg-red-600 text-white px-8 py-4 hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,9,20,0.4)]"
          >
            Lihat Portofolio
          </a>
          <a
            href="#services"
            className="text-[11px] font-bold tracking-[0.25em] uppercase border-b-2 border-transparent hover:border-red-500 hover:text-red-500 text-neutral-200 transition-all duration-300 pb-1"
          >
            Layanan Kami →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
