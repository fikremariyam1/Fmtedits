'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { Play, Maximize2, Sparkles, Volume2 } from 'lucide-react';
import { useVideoModal } from '@/components/ui/VideoModalContext';
import { parseVideoUrl, getYouTubeThumbnail } from '@/lib/videoUtils';

export default function Showreel() {
  const { openVideo } = useVideoModal();
  const [isHovered, setIsHovered] = useState(false);

  const videoInfo = parseVideoUrl(siteConfig.showreel.videoUrl);
  const poster = siteConfig.showreel.poster || (videoInfo.type === 'youtube' ? getYouTubeThumbnail(siteConfig.showreel.videoUrl) || '' : '');

  const handleOpen = () =>
    openVideo({
      videoUrl: siteConfig.showreel.videoUrl,
      title: siteConfig.showreel.title,
      poster,
      aspectRatio: '9:16 VERTICAL',
    });

  return (
    <section id="showreel" className="py-16 md:py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div className="flex flex-col space-y-2">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>01 // MASTER REEL</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            {siteConfig.showreel.title}
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-white/50 flex items-center space-x-4 sm:space-x-6">
          <span>DURATION: {siteConfig.showreel.duration}</span>
          <span className="text-studio-cyan">FORMAT: {siteConfig.showreel.aspect}</span>
        </div>
      </div>

      {/* Cinematic Showcase Stage */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface/30 border border-white/[0.1] p-5 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
        {/* Ambient background glow from the video */}
        {poster && (
          <img
            src={poster}
            alt="Ambience"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover filter blur-[80px] opacity-20 scale-125 pointer-events-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void opacity-70 pointer-events-none" />

        {/* Left Info Column */}
        <div className="relative z-10 flex flex-col space-y-4 sm:space-y-6 max-w-lg w-full">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] sm:text-[11px] text-studio-cyan w-fit uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECTOR&apos;S CUT // 2026</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
            High-Retention Visual Storytelling &amp; Motion Design
          </h3>

          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
            Engineered for maximum attention capture. Featuring algorithmic cut pacing, 3D motion graphics, kinetic subtitles, and multi-layered sound design foley.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 font-mono text-xs pt-1 sm:pt-2">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase">Pacing Framework</span>
              <span className="text-white font-bold text-xs sm:text-sm">Sub-Second Hook</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-white/40 block text-[9px] sm:text-[10px] uppercase">Finishing</span>
              <span className="text-white font-bold text-xs sm:text-sm">4K 60FPS Cinema</span>
            </div>
          </div>

          <button
            onClick={handleOpen}
            className="w-full sm:w-auto self-start inline-flex items-center justify-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-studio-cyan text-black hover:bg-[#1be2ec] transition-all duration-200 font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,194,203,0.3)] group"
          >
            <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
            <span>PLAY REEL LIGHTBOX</span>
          </button>
        </div>

        {/* Right Stage: Native Vertical 9:16 Video Player Card */}
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpen}
            data-cursor="PLAY"
            className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] cursor-pointer group"
          >
            {poster && (
              <img
                src={poster}
                alt="Showreel 2026"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-white">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 uppercase flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan animate-pulse" />
                <span>9:16 MASTER</span>
              </span>
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase text-white/80">
                {siteConfig.showreel.duration}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-1 text-black" />
              </motion.div>
            </div>

            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[11px] text-white">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 uppercase text-[10px]">
                CLICK TO EXPAND
              </span>
              <span className="bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/15">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


