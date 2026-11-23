import Link from 'next/link';
import { ArrowLeft, Home, Film, MapPin, Mail } from 'lucide-react';

export const metadata = {
  title: '404 // Sequence Not Found — FMTEDITZ',
  description: 'The timeline sequence or page you requested could not be located.',
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-void text-white flex items-center justify-center px-4 sm:px-8 py-24">
      <div className="max-w-xl w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-3xl bg-surface/30 border border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 font-mono text-xs text-studio-cyan bg-studio-cyan/10 border border-studio-cyan/30 px-3 py-1 rounded-full uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-studio-cyan animate-ping" />
          <span>ERROR 404 // MISSING SEQUENCE</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tighter">
          FRAME NOT FOUND
        </h1>

        <p className="font-sans text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
          The edit timeline or page you are trying to view has been moved, re-rendered, or does not exist.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-4 font-mono text-xs">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 p-3.5 rounded-full bg-studio-cyan text-black hover:bg-[#1ae4ee] font-bold uppercase tracking-wider transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN HOME</span>
          </Link>
          <Link
            href="/#work"
            className="flex items-center justify-center space-x-2 p-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase tracking-wider transition-all"
          >
            <Film className="w-3.5 h-3.5" />
            <span>SELECTED WORK</span>
          </Link>
          <Link
            href="/video-editor-ethiopia"
            className="flex items-center justify-center space-x-2 p-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase tracking-wider transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-studio-cyan" />
            <span>SERVICES IN ETHIOPIA</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center space-x-2 p-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase tracking-wider transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
