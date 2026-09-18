import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#07090B',
        cinema: '#0B0E12',
        surface: {
          DEFAULT: '#101419',
          raised: '#161B22',
          active: '#1F2630',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          medium: 'rgba(255, 255, 255, 0.14)',
          bold: 'rgba(255, 255, 255, 0.25)',
        },
        studio: {
          cyan: '#00C2CB',
          red: '#00C2CB', // Map studio-red to brand cyan for consistent electric accent
          accent: '#00C2CB',
          muted: '#8A8A93',
          dim: '#52525A',
        },
        brand: {
          cyan: '#00C2CB',
          cyanGlow: 'rgba(0, 194, 203, 0.35)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
    },
  },
  plugins: [],
};

export default config;
