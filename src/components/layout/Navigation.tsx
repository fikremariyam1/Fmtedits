'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import BrandLogo from '@/components/ui/BrandLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: 'WORK', href: '/#work' },
    { label: 'SERVICES', href: '/#services' },
    { label: 'PHILOSOPHY', href: '/#philosophy' },
    { label: 'ABOUT', href: '/#about' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 md:py-5 backdrop-blur-md bg-void/85 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2.5 sm:space-x-3 transition-opacity duration-200 hover:opacity-90">
            <BrandLogo size="md" />
            <span className="hidden sm:inline-block font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase pl-2 border-l border-white/10">
              VIDEO &amp; MOTION
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-studio-cyan transition-colors duration-200 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-studio-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-white/60 bg-surface/80 border border-studio-cyan/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,194,203,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan animate-pulse" />
              <span className="tracking-wider uppercase text-[10px] text-white/90">COMMISSIONS OPEN</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-1.5 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-black bg-studio-cyan hover:bg-[#1ae4ee] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition-all duration-200 shadow-[0_0_20px_rgba(0,194,203,0.3)]"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between px-6 py-6 overflow-y-auto md:hidden"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <BrandLogo size="md" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-5 my-auto py-8">
              <span className="font-mono text-[11px] tracking-widest text-studio-cyan uppercase">// MENU</span>
              {navLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white active:text-studio-cyan flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-white/30 group-active:text-studio-cyan">0{idx + 1}</span>
                </Link>
              ))}
            </div>

            {/* CTA & Quick Reach */}
            <div className="flex flex-col space-y-4 pt-6 border-t border-white/10 font-mono">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-studio-cyan text-black font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(0,194,203,0.3)]"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-2 text-studio-cyan text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
                  <span>{siteConfig.status}</span>
                </div>
                <a href={siteConfig.links.phonePrimary} className="text-[11px] text-white/70">
                  +251 970 699 570
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] tracking-wider uppercase pt-1">
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold"
                >
                  WhatsApp
                </a>
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-2 rounded-lg bg-[#229ED9]/15 border border-[#229ED9]/30 text-[#229ED9] font-semibold"
                >
                  Telegram
                </a>
                <a
                  href={siteConfig.links.email}
                  className="py-2.5 px-2 rounded-lg bg-white/5 border border-white/15 text-white/80"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
