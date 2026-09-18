'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import Link from 'next/link';
import { ArrowRight, MapPin, Star, Zap, Film, CheckCircle2 } from 'lucide-react';

const stats = [
  { label: 'PROJECTS COMPLETED', value: '120+', icon: Film },
  { label: 'VIEWS GENERATED', value: '50M+', icon: Star },
  { label: 'YEARS EDITING', value: '6+', icon: Zap },
  { label: 'COUNTRIES SERVED', value: '3+', icon: MapPin },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Bio Column */}
        <div className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-3 sm:space-y-4"
          >
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>07 // STUDIO IDENTITY</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-white uppercase leading-[0.92]">
              THE EDITOR BEHIND THE ATTENTION
            </h2>
          </motion.div>

          <div className="flex flex-col space-y-4 sm:space-y-5 text-white/80 font-sans text-sm sm:text-lg leading-relaxed">
            <p>
              Hi, I&apos;m <strong className="text-white font-bold">{siteConfig.creator}</strong> (
              <span className="text-studio-cyan font-semibold">{siteConfig.name}</span>). {siteConfig.bio}
            </p>
            <p className="text-white/60 text-xs sm:text-base leading-relaxed">
              {siteConfig.extendedBio}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 rounded-2xl bg-surface/40 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center space-x-3 text-white/70">
              <MapPin className="w-4 h-4 text-studio-cyan shrink-0" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="tracking-wider uppercase">{siteConfig.status}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-studio-cyan text-black hover:bg-[#1ae4ee] font-mono text-xs tracking-widest uppercase transition-all duration-200 font-bold shadow-[0_0_20px_rgba(0,194,203,0.3)]"
            >
              <span>COMMISSION AN EDIT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={siteConfig.links.email}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white font-mono text-xs tracking-widest uppercase transition-all duration-200"
            >
              <span>DIRECT EMAIL</span>
            </a>
          </div>
        </div>

        {/* Editor Portrait Showcase & Stats */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-surface/60 via-void to-surface/90 border border-white/[0.12] shadow-2xl group flex items-end justify-center">
            {/* Ambient backlight glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-studio-cyan/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Official Cutout Portrait */}
            <img
              src="/images/editor.png"
              alt={siteConfig.creator}
              className="relative z-10 w-full h-[92%] object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            />

            {/* Bottom Gradient and Info */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-8 flex flex-col space-y-1 sm:space-y-2">
              <p className="font-display font-extrabold text-lg sm:text-2xl text-white leading-tight">
                &ldquo;Every cut is calculated. Every frame is built to hold attention.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[11px] sm:text-xs text-studio-cyan font-bold tracking-wider">
                  — {siteConfig.creator} // {siteConfig.name}
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline-block">
                  LEAD VIDEO EDITOR
                </span>
              </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] text-white tracking-widest uppercase flex items-center space-x-1.5 sm:space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan animate-pulse" />
              <span>{siteConfig.name} // OFFICIAL</span>
            </div>
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] text-white/70 tracking-widest uppercase">
              2026
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-1.5 sm:space-y-2 hover:border-studio-cyan/30 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-studio-cyan group-hover:scale-110 transition-transform" />
                  <span className="font-display font-black text-2xl sm:text-3xl text-white">{s.value}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

