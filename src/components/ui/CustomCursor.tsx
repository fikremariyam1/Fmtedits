'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsTouchDevice(!mq.matches);
    const onPtrChange = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mq.addEventListener('change', onPtrChange);

    const onMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setIsVisible(true); };
    const onLeave = () => setIsVisible(false);
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cd = target.closest('[data-cursor]') as HTMLElement | null;
      if (cd) { setCursorText(cd.getAttribute('data-cursor') || ''); setIsHovered(true); }
      else if (target.closest('button, a, input, [role="button"]')) { setCursorText(''); setIsHovered(true); }
      else { setCursorText(''); setIsHovered(false); }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    return () => { mq.removeEventListener('change', onPtrChange); window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave); document.removeEventListener('mouseover', onOver); };
  }, [mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        animate={{
          scale: cursorText ? 1 : isHovered ? 1.6 : 1,
          width: cursorText ? 84 : isHovered ? 40 : 12,
          height: cursorText ? 84 : isHovered ? 40 : 12,
          backgroundColor: cursorText ? 'rgba(255,255,255,0.95)' : isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.85)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="rounded-full flex items-center justify-center text-black border border-white/20 overflow-hidden shadow-xl"
      >
        {cursorText && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] font-mono font-black tracking-widest uppercase text-black text-center px-1 select-none">
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
