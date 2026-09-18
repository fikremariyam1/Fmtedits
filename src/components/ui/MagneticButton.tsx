'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  cursorText?: string;
}

export default function MagneticButton({ children, href, onClick, className = '', variant = 'primary', cursorText }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.25, y: (clientY - (top + height / 2)) * 0.25 });
  };

  const styles = {
    primary: 'bg-white text-black hover:bg-neutral-200 border border-white font-mono text-xs tracking-widest uppercase',
    secondary: 'bg-surface-raised hover:bg-surface-active text-white border border-white/15 font-mono text-xs tracking-widest uppercase',
    outline: 'bg-transparent hover:bg-white/10 text-white border border-white/30 font-mono text-xs tracking-widest uppercase',
    ghost: 'bg-transparent text-white/70 hover:text-white font-mono text-xs tracking-widest uppercase',
  };

  const inner = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      data-cursor={cursorText}
      className={`inline-flex items-center justify-center px-7 py-4 rounded-full transition-colors duration-200 select-none cursor-pointer ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center space-x-2.5">{children}</span>
    </motion.div>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:'))
      return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-block">{inner}</a>;
    return <Link href={href} className="inline-block">{inner}</Link>;
  }
  return inner;
}
