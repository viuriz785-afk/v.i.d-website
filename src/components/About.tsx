import { motion } from 'motion/react';

export default function About() {
  const values = [
    {
      icon: '🎬',
      title: 'Storytelling First',
      desc: 'Setiap karya dimulai dari riset mendalam dan rancangan cerita yang kuat agar berkesan di benak audiens.',
    },
    {
      icon: '✦',
      title: 'Cinematic Quality',
      desc: 'Standar kualitas sinematografi terbaik, mulai dari pemilihan lensa, pencahayaan, hingga color grading profesional.',
    },
    {
      icon: '⚙',
      title: 'Pro Workflow',
      desc: 'Proses produksi kerja yang terstruktur, rapi, transparan, dan selalu mengutamakan ketepatan waktu.',
    },
    {
      icon: '◈',
      title: 'Innovation',
      desc: 'Selalu beradaptasi dengan tren media terbaru dan menghadirkan ide-ide segar yang orisinal.',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Decorative Brand Watermark */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-display text-[15vw] font-black text-neutral-100 dark:text-neutral-900/10 tracking-[0.1em] pointer-events-none select-none uppercase z-0">
        VID
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Text and Mini Stats */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-red-600 dark:text-red-500 uppercase">
              Tentang Kami
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Kami Adalah <br />
            <span className="text-red-600">Visual</span> Storytellers
          </h2>

          <div className="w-20 h-[1px] bg-red-500" />

          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
            V.I.D Studio hadir sebagai creative visual agency yang berfokus pada kualitas sinematik dan pendekatan storytelling yang kuat. Kami percaya bahwa setiap frame memiliki kekuatan untuk menyampaikan pesan yang mendalam dan bermakna bagi brand Anda.
          </p>

          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
            Dari UMKM lokal hingga korporasi besar, kami berkomitmen penuh untuk membantu bisnis Anda tampil lebih kuat, lebih berkesan, dan tumbuh signifikan di era digital melalui representasi visual berkualitas premium.
          </p>

          {/* Mini Stats Inside About */}
          <div className="grid grid-cols-3 border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden divide-x divide-neutral-200 dark:divide-neutral-800 bg-neutral-50/50 dark:bg-[#0c0c0c]/50 max-w-xl transition-colors duration-300">
            <div className="p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 block">200+</span>
              <span className="text-[9px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mt-1 block">Project</span>
            </div>
            <div className="p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 block">5+</span>
              <span className="text-[9px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mt-1 block">Tahun</span>
            </div>
            <div className="p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 block">50+</span>
              <span className="text-[9px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mt-1 block">Klien</span>
            </div>
          </div>
        </div>

        {/* Right Side: Bento Values Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 rounded-sm relative overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md hover:border-red-500/40"
            >
              {/* Top gradient highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <span className="text-3xl mb-4 block filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                {val.icon}
              </span>
              <h3 className="text-xs tracking-[0.2em] font-semibold text-red-600 dark:text-red-500 uppercase mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
