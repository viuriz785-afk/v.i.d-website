import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItemProps {
  target: number;
  suffix?: string;
  text?: string;
  label: string;
  key?: any;
}

function StatCount({ target, suffix = '', text, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    if (text) return; // for string representation like '4K'

    let start = 0;
    const duration = 1500; // ms
    const increment = target / (duration / 16); // 60fps approx

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, text]);

  return (
    <div ref={ref} className="text-center p-6 md:p-8 flex flex-col items-center justify-center border-b border-neutral-200/50 dark:border-neutral-800/50 md:border-b-0 md:border-r last:border-0 last:border-r-0 transition-colors duration-300">
      <span className="font-display text-4xl sm:text-5xl font-black text-red-600 dark:text-red-500 drop-shadow-[0_0_15px_rgba(229,9,20,0.15)] leading-none mb-3">
        {text ? text : `${count}${suffix}`}
      </span>
      <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-neutral-500 dark:text-neutral-400 uppercase">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const stats: Array<{ target: number; suffix?: string; text?: string; label: string }> = [
    { target: 200, suffix: '+', label: 'Project Selesai' },
    { target: 5, suffix: '+', label: 'Tahun Pengalaman' },
    { target: 50, suffix: '+', label: 'Klien Puas' },
    { target: 0, text: '4K', label: 'Kualitas Produksi' },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-[#0c0c0c] border-y border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <StatCount
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            text={stat.text}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
}
