'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function ToolsCapabilities() {
  return (
    <section id="tools" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col space-y-2 mb-10 sm:mb-16">
        <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
          <span>08 // TECHNICAL STACK</span>
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase">
          TOOLS &amp; CAPABILITIES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <p className="font-mono text-[11px] sm:text-xs text-white/40 uppercase tracking-widest mb-2 sm:mb-4">// SOFTWARE ARSENAL</p>
          {siteConfig.tools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-3.5 sm:py-5 border-b border-white/[0.08] hover:border-studio-cyan/30 transition-colors duration-300 gap-1 sm:gap-0"
            >
              <div className="flex items-center space-x-4 sm:space-x-5">
                <span className="font-mono text-[11px] text-studio-cyan/70 sm:text-white/30 w-6">{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-display font-bold text-lg sm:text-2xl text-white tracking-tight group-hover:text-studio-cyan transition-colors duration-300">{tool.name}</span>
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-white/50 pl-10 sm:pl-0 sm:text-right max-w-[240px] leading-relaxed">{tool.role}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col space-y-6">
          <p className="font-mono text-[11px] sm:text-xs text-white/40 uppercase tracking-widest mb-2 sm:mb-4">// CAPABILITIES GRID</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {siteConfig.capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-5 sm:p-6 rounded-2xl bg-surface/40 border border-white/[0.08] hover:border-studio-cyan/30 flex flex-col space-y-2 transition-all duration-300"
              >
                <h3 className="font-display font-bold text-base text-white group-hover:text-studio-cyan transition-colors duration-300">{cap.title}</h3>
                <p className="font-sans text-xs text-white/60 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-studio-cyan/5 border-studio-cyan/20 flex flex-col space-y-3 mt-4">
            <span className="font-mono text-xs text-studio-cyan tracking-widest uppercase">// DELIVERY SPECS</span>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
              {[['MAX RESOLUTION', '8K / 4K DCI'], ['CODEC', 'ProRes / H.265 / DNxHR'], ['FRAME RATES', '23.98 / 24 / 25 / 29.97 / 60'], ['COLOR SPACE', 'HDR10 / Rec.709 / P3']].map(([l, v]) => (
                <div key={l} className="flex flex-col space-y-1">
                  <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest">{l}</span>
                  <span className="text-white font-medium text-[11px] sm:text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
