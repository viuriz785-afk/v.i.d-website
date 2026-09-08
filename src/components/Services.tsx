import { motion } from 'motion/react';
import { SERVICES } from '../data';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-16 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-red-600 dark:text-red-500 font-bold block mb-3">
              Layanan Kreatif
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
              Apa yang <span className="text-red-600">Kami</span> Lakukan
            </h2>
          </div>
          <a
            href="#contact"
            className="text-[11px] font-bold tracking-[0.25em] uppercase border-b-2 border-transparent hover:border-red-500 hover:text-red-500 text-neutral-800 dark:text-neutral-200 transition-all duration-300 pb-1"
          >
            Diskusi Project →
          </a>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/60 dark:border-neutral-800/60 p-8 rounded-sm relative overflow-hidden group/card transition-all duration-300 shadow-sm hover:shadow-lg hover:border-red-500/40"
            >
              {/* Highlight Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="font-display text-xs font-bold tracking-[0.2em] text-red-600 dark:text-red-500 mb-6 opacity-60">
                {service.num}
              </div>

              <h3 className="font-display text-lg md:text-xl font-extrabold text-neutral-900 dark:text-white mb-4 group-hover/card:text-red-600 dark:group-hover/card:text-red-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Service Sub-Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40">
                {service.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] tracking-wider uppercase border border-neutral-300/60 dark:border-neutral-800/80 text-neutral-500 dark:text-neutral-400 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Last Promo Dynamic Interactive Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: SERVICES.length * 0.1, duration: 0.5 }}
            className="bg-gradient-to-br from-red-600 to-red-800 text-white p-8 rounded-sm relative overflow-hidden flex flex-col justify-between group shadow-md"
          >
            {/* Visual accent */}
            <div className="absolute right-[-20px] bottom-[-20px] font-display text-[8rem] font-bold text-white/5 tracking-[0.1em] select-none pointer-events-none">
              VID
            </div>

            <div>
              <div className="font-display text-xs font-bold tracking-[0.2em] text-red-200 mb-6">
                — KUSTOM
              </div>
              <h3 className="font-rajdhani text-2xl md:text-3xl font-bold italic leading-tight mb-4">
                "Every Frame Tells a Story."
              </h3>
              <p className="text-xs text-red-100 font-light leading-relaxed mb-6">
                Punya kebutuhan visual khusus atau konsep project di luar kategori? Mari berdiskusi bersama — tim kami siap menghadirkan solusi sinematik terbaik untuk kesuksesan brand Anda.
              </p>
            </div>

            <a
              href="#contact"
              className="self-start text-[10px] font-bold uppercase tracking-widest bg-white text-red-600 hover:bg-neutral-100 px-6 py-3.5 rounded-sm shadow-md transition-all duration-300 hover:scale-[1.05]"
            >
              Konsultasi Gratis
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
