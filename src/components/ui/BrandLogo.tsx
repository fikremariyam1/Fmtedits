'use client';
import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function BrandLogo({ className = '', showText = true, size = 'md' }: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {/* Exact Official FMTEDITZ Brand Logo */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <img
          src="/images/logo.png"
          alt="FMTEDITZ Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,194,203,0.6)]"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none tracking-tight">
          <span className={`font-display font-black text-white ${textSizes[size]} tracking-tight uppercase`}>
            FMT
          </span>
          <span className={`font-display font-black text-white ${textSizes[size]} tracking-tight uppercase`}>
            EDITZ
          </span>
        </div>
      )}
    </div>
  );
}
