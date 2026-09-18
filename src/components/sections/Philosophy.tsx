'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const tenets = [
  { num: '01', title: 'THE EDIT IS THE STORY', body: 'Raw footage is potential. The edit is the work. Every cut, every hold, every transition must earn its frame.' },
  { num: '02', title: 'SOUND MAKES THE FEELING', body: 'Visuals attract attention. Sound creates emotion. Multi-layer audio engineering is the invisible spine of all great editing.' },
  { num: '03', title: 'RETENTION IS RESPECT', body: "A viewer's time is finite. Every second of dead air is a failure of craft. Pacing exists to honor the audience." },
  { num: '04', title: 'INVISIBLE OR UNFORGETTABLE', body: 'Great editing is either completely invisible — or utterly unforgettable. There is no middle ground worth accepting.' },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-16 md:py-40 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col space-y-10 sm:space-y-16 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col space-y-4">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>05 // EDITORIAL PHILOSOPHY</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.92]">
            {siteConfig.philosophy.headline}
          </h2>
          <p className="font-sans text-sm sm:text-lg text-white/70 leading-relaxed max-w-2xl pt-1 sm:pt-2">
            {siteConfig.philosophy.body}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {tenets.map((t, idx) => (
            <motion.div
              key={t.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-8 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-2.5 sm:space-y-3 group hover:border-studio-cyan/30 transition-colors duration-300"
            >
              <span className="font-mono text-[11px] sm:text-xs text-studio-cyan tracking-widest">{t.num}</span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-studio-cyan transition-colors duration-300">
                {t.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                {t.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-white/[0.08]">
          <p className="font-mono text-[11px] sm:text-xs text-white/50 max-w-md leading-relaxed">
            This studio operates on a commission model. Projects are accepted based on creative alignment, timeline feasibility, and production value.
          </p>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/20 font-mono text-xs tracking-widest uppercase transition-all duration-200"
          >
            <span>COMMISSION INQUIRY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
