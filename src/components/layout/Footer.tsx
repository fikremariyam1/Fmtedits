'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import BrandLogo from '@/components/ui/BrandLogo';
import { ArrowUpRight, Clock, Mail } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-void border-t border-white/[0.08] relative z-20 pt-16 md:pt-20 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12 sm:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="flex flex-col space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-studio-cyan uppercase">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>COMMISSIONS OPEN</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white leading-tight sm:leading-none">
              LET&apos;S MAKE IT IMPOSSIBLE TO SCROLL PAST.
            </h2>
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-4 w-full md:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between space-x-4 px-7 sm:px-8 py-4 sm:py-5 rounded-full bg-studio-cyan text-black hover:bg-[#1ae4ee] transition-all duration-300 font-mono text-xs tracking-widest uppercase font-bold group shadow-[0_0_35px_rgba(0,194,203,0.3)] w-full md:w-auto"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <a
              href={siteConfig.links.email}
              className="inline-flex items-center space-x-2 text-xs font-mono text-white/60 hover:text-studio-cyan transition-colors duration-200 justify-center py-1 sm:py-2 break-all"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs font-mono">
          <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
            <BrandLogo size="lg" />
            <span className="text-white/60 pt-2">{siteConfig.creator}</span>
            <span className="text-white/40 text-[11px]">Video Editor &amp; Motion Designer</span>
          </div>
          <div className="flex flex-col space-y-2.5">
            <span className="text-white/40 uppercase tracking-widest text-[10px] sm:text-[11px]">// INDEX</span>
            <Link href="/#work" className="text-white/70 hover:text-white transition-colors">Selected Work</Link>
            <Link href="/#showreel" className="text-white/70 hover:text-white transition-colors">Showreel 2026</Link>
            <Link href="/#services" className="text-white/70 hover:text-white transition-colors">Capabilities</Link>
            <Link href="/#philosophy" className="text-white/70 hover:text-white transition-colors">Philosophy</Link>
            <Link href="/#about" className="text-white/70 hover:text-white transition-colors">About</Link>
          </div>
          <div className="flex flex-col space-y-2.5">
            <span className="text-white/40 uppercase tracking-widest text-[10px] sm:text-[11px]">// PLATFORMS</span>
            {[
              { label: 'Instagram: @fmtedits', href: siteConfig.links.instagram },
              { label: 'Telegram: @Fmteditz', href: siteConfig.links.telegram },
              { label: 'WhatsApp / Call', href: siteConfig.links.whatsapp },
              { label: 'YouTube: @Fmteditz1', href: siteConfig.links.youtube },
              { label: 'Direct Email', href: siteConfig.links.email },
              { label: 'Upwork Pro', href: siteConfig.links.upwork },
              { label: 'Fiverr Choice', href: siteConfig.links.fiverr },
            ].map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center justify-between">
                <span>{l.label}</span><ArrowUpRight className="w-3 h-3 text-white/40" />
              </a>
            ))}
          </div>
          <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
            <span className="text-white/40 uppercase tracking-widest text-[10px] sm:text-[11px]">// TIME</span>
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-3.5 h-3.5 text-studio-cyan" />
              <span>{time ? time + ' UTC' : '--:--:--'}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan" />
              <span>Worldwide Remote Availability</span>
            </div>
            <span className="text-[10px] text-white/30 tracking-wide pt-1 sm:pt-2">4K DCI • PRORES • 24.00 FPS</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/[0.06] text-[10px] sm:text-[11px] font-mono text-white/40">
          <div>© {new Date().getFullYear()} FMTEDITZ // FIKREMARIYAM TADESSE.</div>
          <div className="flex items-center space-x-3 sm:space-x-6 text-[10px]">
            <span>NO TEMPLATES</span><span>•</span><span>CUSTOM CRAFT</span><span>•</span><span>ATTENTION DRIVEN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
