import { motion } from 'motion/react';
import { Phone, Mail, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const contactLinks = [
    {
      icon: <MessageCircle size={24} className="text-red-500" />,
      label: 'WhatsApp Direct',
      value: '+62 821-7280-3830',
      desc: 'Respon cepat via pesan WhatsApp',
      href: 'https://wa.me/6282172803830?text=Halo%20V.I.D%20Studio,%20saya%20ingin%20konsultasi%20project',
      primary: true,
    },
    {
      icon: <Mail size={24} className="text-red-500" />,
      label: 'Email Official',
      value: 'viuriz785@gmail.com',
      desc: 'Kirimkan proposal atau brief project',
      href: 'mailto:viuriz785@gmail.com',
      primary: false,
    },
    {
      icon: <Instagram size={24} className="text-red-500" />,
      label: 'Instagram DM',
      value: '@vidstudio.id',
      desc: 'Lihat updates & portofolio harian',
      href: 'https://instagram.com/vidstudio.id',
      primary: false,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-16 bg-[#faf9f6] dark:bg-[#0d0d0d] relative overflow-hidden transition-colors duration-300">
      {/* Visual background lights */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/[0.03] dark:bg-red-500/[0.02] rounded-full filter blur-[120px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.4em] uppercase text-red-600 dark:text-red-500 font-bold block">
            Hubungi Kami
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
            Mulai <span className="text-red-600">Project</span> Bersama
          </h2>
          <p className="font-rajdhani text-lg md:text-xl font-medium text-neutral-600 dark:text-neutral-400 italic">
            "Siap mewujudkan visi kreatif Anda secara sinematik. Hubungi kami secara langsung melalui kanal pilihan Anda."
          </p>
        </div>

        {/* Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-8 rounded-lg border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                link.primary
                  ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-500 text-white shadow-xl shadow-red-600/20'
                  : 'bg-white dark:bg-[#121212] border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 text-neutral-900 dark:text-white shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-full ${link.primary ? 'bg-white/20 text-white' : 'bg-red-500/10 text-red-500'}`}>
                    {link.primary ? <Phone size={24} className="text-white" /> : link.icon}
                  </div>
                  <ArrowUpRight size={20} className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${link.primary ? 'text-white/80' : 'text-neutral-400 group-hover:text-red-500'}`} />
                </div>

                <small className={`text-[10px] tracking-widest uppercase font-bold block mb-1 ${link.primary ? 'text-white/80' : 'text-red-600 dark:text-red-500'}`}>
                  {link.label}
                </small>
                <h3 className={`text-base sm:text-lg font-extrabold mb-2 ${link.primary ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                  {link.value}
                </h3>
                <p className={`text-xs font-light leading-relaxed ${link.primary ? 'text-white/90' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {link.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-current/10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span>Hubungi Langsung</span>
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
