'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowDown, ArrowRight, Play, VolumeX, Volume2 } from 'lucide-react';
import { useVideoModal } from '@/components/ui/VideoModalContext';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const { openVideo } = useVideoModal();

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const totalSeconds = Math.floor(frame / 24);
      const frames = (frame % 24).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      setTimecode(`00:${minutes}:${seconds}:${frames}`);
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[94vh] md:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 overflow-hidden border-b border-white/[0.08]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-computer-board-in-blue-light-41584-large.mp4"
          poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 opacity-20 filter contrast-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void" />
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-studio-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-surface/80 border border-studio-cyan/30 px-2.5 sm:px-3 py-1 rounded-full text-white/90 text-[9px] sm:text-[10px] tracking-widest uppercase shadow-[0_0_12px_rgba(0,194,203,0.15)]">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>REC [●] {timecode}</span>
          </span>
          <span className="hidden sm:inline-block text-white/40 text-[11px]">4K DCI // 24.00 FPS</span>
        </div>
        <button
          onClick={toggleAudio}
          className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-surface/80 hover:bg-surface border border-white/10 text-white/70 hover:text-white transition-all text-[10px] sm:text-[11px]"
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-studio-cyan" />}
          <span>{isMuted ? 'UNMUTE' : 'AUDIO ON'}</span>
        </button>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 md:py-20 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 max-w-5xl w-full"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs md:text-sm text-white/70 tracking-widest uppercase">
            <div className="flex items-center space-x-2 bg-white/[0.04] sm:bg-transparent px-2.5 sm:px-0 py-1 sm:py-0 rounded-full border sm:border-0 border-white/10">
              <img
                src="/images/editor.png"
                alt="Fikremariyam Tadesse"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover object-top border border-studio-cyan/40 bg-surface/80 shadow-[0_0_10px_rgba(0,194,203,0.3)]"
              />
              <span className="text-studio-cyan font-bold text-[10px] sm:text-xs">FIKREMARIYAM TADESSE</span>
            </div>
            <span className="hidden sm:inline text-white/30">—</span>
            <span className="hidden sm:inline">VIDEO EDITOR &amp; MOTION DESIGNER</span>
          </div>

          <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white uppercase leading-[0.92] text-left select-none">
            I EDIT <br className="inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-studio-cyan">
              ATTENTION.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed pt-1 sm:pt-2 font-normal">
            {siteConfig.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 w-full sm:w-auto">
            <MagneticButton
              href="#work"
              variant="primary"
              cursorText="EXPLORE"
              className="!bg-studio-cyan !text-black !border-studio-cyan hover:!bg-[#1be2ec] shadow-[0_0_30px_rgba(0,194,203,0.3)] font-bold justify-center"
            >
              <span>VIEW WORK</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href="/contact"
              variant="outline"
              cursorText="CONNECT"
              className="border-white/20 hover:border-studio-cyan hover:text-studio-cyan justify-center"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <button
              onClick={() =>
                openVideo({
                  videoUrl: siteConfig.showreel.videoUrl,
                  title: 'SHOWREEL 2026 // FMTEDITZ',
                  poster: siteConfig.showreel.poster,
                  aspectRatio: '9:16 VERTICAL',
                })
              }
              data-cursor="PLAY"
              className="inline-flex items-center justify-center space-x-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-surface/80 hover:bg-surface border border-studio-cyan/30 text-white text-xs font-mono tracking-widest uppercase transition-all duration-200 group"
            >
              <Play className="w-3.5 h-3.5 fill-studio-cyan text-studio-cyan group-hover:scale-110 transition-transform" />
              <span>WATCH REEL ({siteConfig.showreel.duration})</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono text-white/40">
        <a
          href="#showreel"
          className="inline-flex items-center space-x-2 text-white/50 hover:text-studio-cyan transition-colors duration-200 tracking-widest uppercase text-[11px]"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-studio-cyan" />
          <span>SCROLL TO EXPLORE</span>
        </a>
        <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-wider">
          <span className="text-white/70">LONG-FORM</span>
          <span>•</span>
          <span className="text-white/70">SHORT-FORM 9:16</span>
          <span>•</span>
          <span className="text-white/70">DOCUMENTARY</span>
          <span>•</span>
          <span className="text-studio-cyan">3D MOTION GRAPHICS</span>
        </div>
      </div>
    </section>
  );
}
