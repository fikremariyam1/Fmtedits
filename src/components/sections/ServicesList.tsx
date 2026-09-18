'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08] overflow-hidden"
    >
      {activeService && (
        <motion.div
          className="absolute pointer-events-none z-10 w-56 h-36 rounded-xl overflow-hidden border border-white/20 shadow-2xl hidden md:block"
          animate={{ x: cursorPos.x - 112, y: cursorPos.y - 72, opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.4 }}
        >
          <img src={siteConfig.services.find(s => s.id === activeService)?.poster || ''} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      )}

      <div className="flex flex-col space-y-2 mb-10 sm:mb-16">
        <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
          <span>04 // SERVICES</span>
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase">
          CAPABILITIES
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.08]">
        {siteConfig.services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            className="group py-6 sm:py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 cursor-default"
          >
            <div className="flex items-start sm:items-center space-x-4 sm:space-x-8 md:space-x-10">
              <span className="font-mono text-xs sm:text-sm text-studio-cyan/70 sm:text-white/30 w-6 sm:w-8 shrink-0 pt-1 sm:pt-0">0{idx + 1}</span>
              <div className="flex flex-col space-y-1">
                <h3 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-white tracking-tight group-hover:text-studio-cyan transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-mono text-[11px] sm:text-xs text-white/50 tracking-wide">
                  {service.subtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:pl-16 pl-10 sm:pl-16">
              <p className="font-sans text-sm text-white/60 max-w-xs leading-relaxed hidden lg:block">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.tags.map(t => (
                  <span key={t} className="font-mono text-[9px] sm:text-[10px] uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/[0.04] border border-white/10 text-white/60 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 group-hover:bg-studio-cyan group-hover:border-studio-cyan transition-all duration-300 flex items-center justify-center text-white/40 group-hover:text-black self-end md:self-auto"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
