'use client';
import React from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

const examples = [
  {
    rawImage: '/images/raw-footage.jpg',
    rawLabel: 'RAW UNEDITED FOOTAGE',
    rawVideoUrl: 'https://youtube.com/shorts/NJgO5E5gvjY',
    finalImage: '/images/edited-footage.jpg',
    finalLabel: 'FINAL MOTION DESIGN & GRADE',
    finalVideoUrl: 'https://youtube.com/shorts/JsxBjpnYrsw',
    description: 'Transforming flat, unpaced raw footage into a high-retention vertical tech edit with kinetic typography, SFX synchronization, and dynamic grading.',
    badgeText: 'RAW ➔ FINAL RETENTION MASTER',
  },
  {
    rawImage: '/images/raw-timeline.png',
    rawLabel: 'RAW / EMPTY TIMELINE',
    finalImage: '/images/polished-timeline.jpg',
    finalLabel: 'POLISHED TIMELINE ARCHITECTURE',
    description: 'From an empty timeline to a complex multi-track master edit with dynamic pacing, synchronized sound design stems, adjustment layer grading, and motion graphics composites.',
    badgeText: 'RAW SEQUENCE ➔ MASTER TIMELINE',
  },
];

export default function BeforeAfterSection() {
  return (
    <section id="transformation" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div className="flex flex-col space-y-2">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>03 // THE TRANSFORMATION</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase">
            BEFORE &amp; AFTER
          </h2>
        </div>
        <p className="font-mono text-xs text-white/50 max-w-sm leading-relaxed">
          Drag to compare the raw source footage vs. the final color-graded, composite-ready master edit.
        </p>
      </div>
      <div className="flex flex-col space-y-12 sm:space-y-20">
        {examples.map((ex, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: idx * 0.1 }}>
            <BeforeAfterSlider
              rawImage={ex.rawImage}
              rawLabel={ex.rawLabel}
              rawVideoUrl={ex.rawVideoUrl}
              finalImage={ex.finalImage}
              finalLabel={ex.finalLabel}
              finalVideoUrl={ex.finalVideoUrl}
              description={ex.description}
              badgeText={ex.badgeText}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
