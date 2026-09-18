'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function Process() {
  return (
    <section id="process" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
        <div className="flex flex-col space-y-2">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>06 // METHODOLOGY</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase">
            THE PROCESS
          </h2>
        </div>
        <p className="font-mono text-xs text-white/50 max-w-sm leading-relaxed">
          A structured creative pipeline designed for cinematic output, clear communication, and efficient delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {siteConfig.process.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group p-6 sm:p-8 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-studio-cyan/30 flex flex-col space-y-4 sm:space-y-5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 font-display font-black text-5xl sm:text-6xl text-white/[0.04] leading-none pointer-events-none select-none">
              {step.step}
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-mono text-xs text-studio-cyan tracking-widest">{step.step}</span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">{step.title}</h3>
              <p className="font-mono text-[11px] text-white/50 tracking-wide">{step.subtitle}</p>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">{step.description}</p>
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/[0.08]">
              <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">DELIVERABLES:</span>
              {step.deliverables.map((d) => (
                <div key={d} className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono text-white/70">
                  <span className="w-1 h-1 rounded-full bg-studio-cyan shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
