'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import { ArrowUpRight, Play, Maximize2, Film, Smartphone, Grid } from 'lucide-react';
import { useVideoModal } from '@/components/ui/VideoModalContext';
import { getYouTubeThumbnail } from '@/lib/videoUtils';

export default function SelectedWork() {
  const { openVideo } = useVideoModal();
  const [filter, setFilter] = useState<'all' | 'vertical' | 'landscape'>('all');

  const filteredProjects = projects.slice(1).filter((p) => {
    if (filter === 'vertical') return p.aspectRatio === '9:16' || !p.aspectRatio;
    if (filter === 'landscape') return p.aspectRatio === '16:9';
    return true;
  });

  return (
    <section id="work" className="py-16 md:py-36 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>02 // ARCHIVE</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white uppercase">
            SELECTED WORK
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-studio-cyan text-black font-bold shadow-[0_0_15px_rgba(0,194,203,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>ALL WORK ({projects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('vertical')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'vertical'
                ? 'bg-studio-cyan text-black font-bold shadow-[0_0_15px_rgba(0,194,203,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>VERTICAL 9:16</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('landscape')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'landscape'
                ? 'bg-studio-cyan text-black font-bold shadow-[0_0_15px_rgba(0,194,203,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>LANDSCAPE 16:9</span>
          </button>
        </div>
      </div>

      {/* Featured Main Project Card (Shown on All & Vertical) */}
      {filter !== 'landscape' && projects[0] && (
        <FeaturedProjectCard project={projects[0]} onOpenVideo={openVideo} />
      )}

      {/* Grid of Remaining Projects */}
      <motion.div
        layout
        className={`grid gap-6 sm:gap-8 md:gap-10 ${
          filter === 'landscape'
            ? 'grid-cols-1 md:grid-cols-2 mt-8'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-16 md:mt-24'
        }`}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            const isLandscape = project.aspectRatio === '16:9';
            if (isLandscape && filter !== 'landscape') {
              return (
                <LandscapeProjectCard
                  key={project.id}
                  project={project}
                  onOpenVideo={openVideo}
                  spanTwoCols={true}
                />
              );
            }
            if (isLandscape) {
              return (
                <LandscapeProjectCard
                  key={project.id}
                  project={project}
                  onOpenVideo={openVideo}
                  spanTwoCols={false}
                />
              );
            }
            return (
              <VerticalProjectCard
                key={project.id}
                project={project}
                onOpenVideo={openVideo}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  onOpenVideo,
}: {
  project: Project;
  onOpenVideo: (d: { videoUrl: string; title: string; poster?: string; aspectRatio?: string }) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const poster = project.posterImage || getYouTubeThumbnail(project.heroVideo) || '';

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-surface/40 border border-white/[0.1] p-5 sm:p-10 md:p-12 shadow-2xl">
      {/* Ambient background glow */}
      {poster && (
        <img
          src={poster}
          alt="Ambience"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-[90px] opacity-25 scale-125 pointer-events-none"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void opacity-80 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6">
          <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">
            <span className="text-studio-cyan font-bold">{project.category}</span>
            <span>//</span>
            <span>{project.client}</span>
            <span>//</span>
            <span>{project.year}</span>
          </div>

          <Link href={`/work/${project.slug}`} className="hover:text-white/80 transition-colors">
            <h3 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.05]">
              {project.title}
            </h3>
          </Link>

          <p className="font-sans text-sm sm:text-lg text-white/70 leading-relaxed max-w-xl">
            {project.subtitle} — {project.oneLiner}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {project.editingType.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/[0.04] border border-white/10 text-white/70 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              onClick={() =>
                onOpenVideo({
                  videoUrl: project.heroVideo,
                  title: project.title,
                  poster,
                  aspectRatio: '9:16 VERTICAL',
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors font-mono text-xs font-bold tracking-widest uppercase shadow-xl group cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black group-hover:scale-110 transition-transform" />
              <span>WATCH VIDEO</span>
            </button>

            <Link
              href={`/work/${project.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white transition-colors font-mono text-xs tracking-widest uppercase"
            >
              <span>CASE STUDY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Native 9:16 Vertical Video Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() =>
              onOpenVideo({
                videoUrl: project.heroVideo,
                title: project.title,
                poster,
                aspectRatio: '9:16 VERTICAL',
              })
            }
            data-cursor="PLAY"
            className="relative aspect-[9/16] w-full max-w-[300px] sm:max-w-[320px] rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] cursor-pointer group"
          >
            {poster && (
              <img
                src={poster}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-white">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase">
                FEATURED WORK
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl"
              >
                <Play className="w-6 h-6 fill-black ml-0.5 text-black" />
              </motion.div>
            </div>

            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[10px] text-white">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase">
                9:16 HIGH RETENTION
              </span>
              <span className="bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/15">
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function VerticalProjectCard({
  project,
  onOpenVideo,
}: {
  project: Project;
  onOpenVideo: (d: { videoUrl: string; title: string; poster?: string; aspectRatio?: string }) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const poster = project.posterImage || getYouTubeThumbnail(project.heroVideo) || '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col space-y-4"
    >
      <div
        className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/15 cursor-pointer shadow-xl transition-all duration-300 group-hover:border-white/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          onOpenVideo({
            videoUrl: project.heroVideo,
            title: project.title,
            poster,
            aspectRatio: '9:16 VERTICAL',
          })
        }
        data-cursor="PLAY"
      >
        {poster && (
          <img
            src={poster}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

        <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/80">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase text-[9px]">
            {project.category.split('/')[0]}
          </span>
          <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-white/60">
            {project.year}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl opacity-90 group-hover:opacity-100"
          >
            <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
          </motion.div>
        </div>

        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[10px] font-mono text-white/70">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase text-[9px]">
            9:16 SHORT
          </span>
          <span className="bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
          <span className="truncate max-w-[180px]">{project.client}</span>
          <span className="text-studio-cyan">{project.category.split('/')[0]}</span>
        </div>
        <Link href={`/work/${project.slug}`} className="hover:text-white/80 transition-colors">
          <h3 className="font-display font-bold text-xl text-white tracking-tight flex items-center justify-between group/title">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/title:text-white transition-colors shrink-0 ml-1" />
          </h3>
        </Link>
        <p className="font-sans text-xs text-white/60 line-clamp-2 leading-relaxed">
          {project.oneLiner}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.editingType.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase px-2 py-0.5 bg-white/[0.04] border border-white/10 text-white/50 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function LandscapeProjectCard({
  project,
  onOpenVideo,
  spanTwoCols = true,
}: {
  project: Project;
  onOpenVideo: (d: { videoUrl: string; title: string; poster?: string; aspectRatio?: string }) => void;
  spanTwoCols?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const poster = project.posterImage || getYouTubeThumbnail(project.heroVideo) || '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group flex flex-col space-y-4 ${
        spanTwoCols ? 'col-span-1 md:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/15 cursor-pointer shadow-xl transition-all duration-300 group-hover:border-white/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          onOpenVideo({
            videoUrl: project.heroVideo,
            title: project.title,
            poster,
            aspectRatio: '16:9 WIDESCREEN',
          })
        }
        data-cursor="PLAY"
      >
        {poster && (
          <img
            src={poster}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

        <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/80">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase text-[9px] text-white">
            {project.category}
          </span>
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-studio-cyan/40 text-[9px] text-studio-cyan font-bold tracking-wider uppercase">
            16:9 WIDESCREEN
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center shadow-2xl opacity-90 group-hover:opacity-100"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-0.5 text-black" />
          </motion.div>
        </div>

        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[10px] font-mono text-white/70">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase text-[9px] flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan animate-pulse" />
            <span>PLAY FULL DOCUMENTARY</span>
          </span>
          <span className="bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
          <span>{project.client}</span>
          <span className="text-studio-cyan">{project.category.split('/')[0]}</span>
        </div>
        <Link href={`/work/${project.slug}`} className="hover:text-white/80 transition-colors">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight flex items-center justify-between group/title">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/title:text-white transition-colors shrink-0 ml-2" />
          </h3>
        </Link>
        <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl">
          {project.oneLiner}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.editingType.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase px-2 py-0.5 bg-white/[0.04] border border-white/10 text-white/50 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


