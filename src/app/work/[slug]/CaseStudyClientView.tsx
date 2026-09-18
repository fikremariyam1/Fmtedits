'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { useVideoModal } from '@/components/ui/VideoModalContext';
import { parseVideoUrl, getYouTubeThumbnail } from '@/lib/videoUtils';
import { ArrowLeft, ArrowRight, Play, Maximize2 } from 'lucide-react';

interface Props { project: Project; nextProject: Project; }

export default function CaseStudyClientView({ project, nextProject }: Props) {
  const { openVideo } = useVideoModal();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);
  const cs = project.caseStudy;

  const heroVideoInfo = parseVideoUrl(cs.heroVideo);
  const isHeroDirect = heroVideoInfo.type === 'direct';
  const heroPoster = cs.heroPoster || (heroVideoInfo.type === 'youtube' ? getYouTubeThumbnail(cs.heroVideo) || '' : '');

  const finalVideoInfo = parseVideoUrl(cs.finalResult.videoUrl);
  const isFinalDirect = finalVideoInfo.type === 'direct';
  const finalPoster = cs.finalResult.posterUrl || (finalVideoInfo.type === 'youtube' ? getYouTubeThumbnail(cs.finalResult.videoUrl) || '' : '');

  const handleOpenHero = () => openVideo({ videoUrl: cs.heroVideo, title: project.title + ' // HERO EDIT', poster: heroPoster, aspectRatio: project.aspectRatio });
  const handleOpenFinal = () => openVideo({ videoUrl: cs.finalResult.videoUrl, title: project.title + ' // FINAL CUT', poster: finalPoster, aspectRatio: project.aspectRatio });

  return (
    <div className="min-h-screen bg-void text-white pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-6 sm:mb-8 flex items-center justify-between font-mono text-xs text-white/50">
        <Link href="/#work" className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-[11px] sm:text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO WORK</span>
        </Link>
        <span className="hidden sm:inline-block tracking-wider text-white/30 uppercase">CASE STUDY // {project.category}</span>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-8 sm:mb-12 flex flex-col space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-[10px] sm:text-xs text-white/60 tracking-widest uppercase">
          <span className="text-studio-cyan font-semibold">{project.category}</span>
          <span>//</span>
          <span>{project.client}</span>
          <span>//</span>
          <span>{project.year}</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.95]">
          {project.title}
        </h1>
        <p className="font-sans text-sm sm:text-xl text-white/70 max-w-3xl leading-relaxed pt-1 sm:pt-2">
          {project.subtitle} — {project.oneLiner}
        </p>
      </div>

      {/* 01 HERO VIDEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28">
        <div className="flex items-center justify-between mb-4 font-mono text-[11px] sm:text-xs text-white/40">
          <span className="uppercase tracking-widest flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>01 — HERO VIDEO</span>
          </span>
          <span className="hidden sm:inline-block uppercase tracking-wider text-studio-cyan">
            FORMAT: {project.aspectRatio} // CLICK TO EXPAND
          </span>
        </div>

        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface/30 border border-white/[0.1] p-4 sm:p-10 md:p-14 flex items-center justify-center">
          {heroPoster && (
            <img
              src={heroPoster}
              alt="Ambience"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover filter blur-[90px] opacity-25 scale-125 pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void opacity-70 pointer-events-none" />

          <div
            onClick={handleOpenHero}
            data-cursor="PLAY"
            className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 cursor-pointer group shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          >
            <img
              src={heroPoster}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {isHeroDirect && (
              <video
                ref={heroVideoRef}
                src={cs.heroVideo}
                poster={heroPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1 text-black" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase text-[10px]">
                {cs.projectOverview.duration} RUNTIME
              </span>
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase flex items-center space-x-1.5 text-[10px]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXPAND</span>
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* 02 THE PROJECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>02 — THE PROJECT</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">OVERVIEW &amp; SCOPE</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-6 sm:space-y-8">
            <p className="font-sans text-sm sm:text-lg text-white/80 leading-relaxed">{cs.projectOverview.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-white/[0.08] font-mono text-xs">
              <div className="flex flex-col space-y-1"><span className="text-white/40 uppercase tracking-wider text-[10px]">ROLE</span><span className="text-white font-medium">{cs.projectOverview.role}</span></div>
              <div className="flex flex-col space-y-1"><span className="text-white/40 uppercase tracking-wider text-[10px]">TIMELINE</span><span className="text-white font-medium">{cs.projectOverview.timeline}</span></div>
              <div className="flex flex-col space-y-1"><span className="text-white/40 uppercase tracking-wider text-[10px]">DURATION</span><span className="text-white font-medium">{cs.projectOverview.duration}</span></div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider text-[10px]">TOOLS &amp; SOFTWARE:</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cs.projectOverview.toolsUsed.map((tool) => (
                  <span key={tool} className="font-mono text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-white/80">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE CHALLENGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>03 — THE CHALLENGE</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">THE BOTTLENECK</h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-2 sm:space-y-3">
              <span className="font-mono text-[10px] sm:text-xs text-studio-cyan tracking-wider uppercase">// CORE PROBLEM</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">Retention Dropoff</h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">{cs.challenge.problem}</p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-surface/40 border border-white/[0.08] flex flex-col space-y-2 sm:space-y-3">
              <span className="font-mono text-[10px] sm:text-xs text-amber-400 tracking-wider uppercase">// RETENTION OBSTACLE</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">Audience Friction</h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">{cs.challenge.retentionObstacle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 THE EDIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>04 — THE EDIT</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">STRATEGY &amp; PACING</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">CUT PACING</span>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">{cs.theEdit.cutPacing}</p>
              </div>
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">AUDIO ENGINEERING</span>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">{cs.theEdit.audioEngineering}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/[0.08]">
              <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">// KEY TIMELINE MOMENTS</span>
              <div className="flex flex-col divide-y divide-white/[0.08]">
                {cs.theEdit.keyMoments.map((km) => (
                  <div key={km.timestamp} className="py-3.5 sm:py-4 flex items-start space-x-4 sm:space-x-6">
                    <span className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/[0.06] border border-white/10 rounded text-studio-cyan font-semibold shrink-0">{km.timestamp}</span>
                    <div className="flex flex-col space-y-0.5 sm:space-y-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">{km.title}</h4>
                      <p className="font-sans text-xs text-white/60 leading-relaxed">{km.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 BEFORE/AFTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="flex flex-col space-y-2 mb-6 sm:mb-8">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>05 — BEFORE / AFTER</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase">THE TRANSFORMATION</h2>
          <p className="font-mono text-[11px] sm:text-xs text-white/50">Drag the handle horizontally to compare raw source vs. finished composite.</p>
        </div>
        <BeforeAfterSlider rawImage={cs.beforeAfter.rawImage} rawLabel={cs.beforeAfter.rawLabel} finalImage={cs.beforeAfter.finalImage} finalLabel={cs.beforeAfter.finalLabel} description={cs.beforeAfter.description} aspectRatio="aspect-[16/9] sm:aspect-[21/9]" />
      </section>

      {/* 06 MOTION & DESIGN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-16 sm:mb-28 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-8 sm:mb-12">
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
              <span>06 — MOTION &amp; DESIGN</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">VFX &amp; GRAPHICS</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed">{cs.motionAndDesign.breakdown}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              {cs.motionAndDesign.techniques.map((tech) => (
                <span key={tech} className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-white/70">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cs.motionAndDesign.graphicFrames.map((frame) => (
            <div key={frame.title} className="group rounded-xl overflow-hidden bg-surface/40 border border-white/[0.08] flex flex-col shadow-xl">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                <img src={frame.image} alt={frame.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {frame.tag && <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[9px] tracking-widest text-white uppercase border border-white/10">{frame.tag}</span>}
              </div>
              <div className="p-4 sm:p-5 flex flex-col space-y-1">
                <h4 className="font-display font-bold text-sm sm:text-base text-white">{frame.title}</h4>
                <p className="font-sans text-xs text-white/60 leading-relaxed">{frame.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 07 FINAL RESULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-20 sm:mb-32 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="flex flex-col space-y-2 mb-6 sm:mb-8">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>07 — FINAL RESULT</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-5xl text-white uppercase">MASTER DELIVERABLE</h2>
        </div>
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface/30 border border-white/[0.1] p-4 sm:p-10 md:p-14 flex items-center justify-center mb-8 sm:mb-10">
          {finalPoster && (
            <img
              src={finalPoster}
              alt="Ambience"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover filter blur-[90px] opacity-25 scale-125 pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void opacity-70 pointer-events-none" />

          <div
            onClick={handleOpenFinal}
            data-cursor="PLAY"
            className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 cursor-pointer group shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          >
            <img
              src={finalPoster}
              alt="Final Result"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {isFinalDirect && (
              <video
                ref={finalVideoRef}
                src={cs.finalResult.videoUrl}
                poster={finalPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-black ml-1 text-black" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase text-[10px]">
                FINISHED MASTER CUT
              </span>
              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase flex items-center space-x-1.5 text-[10px]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXPAND</span>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-surface/50 border border-white/[0.08]">
          {cs.finalResult.metrics.map((m) => (
            <div key={m.label} className="flex flex-col space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">{m.label}</span>
              <span className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">{m.value}</span>
              <span className="font-mono text-[10px] sm:text-[11px] text-emerald-400">{m.context}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 08 NEXT PROJECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-studio-cyan animate-pulse" />
            <span>08 — NEXT PROJECT</span>
          </span>
          <Link href={'/work/' + nextProject.slug} className="group p-6 sm:p-8 md:p-12 rounded-2xl bg-surface/60 border border-white/[0.08] hover:border-studio-cyan/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col space-y-2 sm:space-y-3 max-w-xl">
              <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{nextProject.category} // {nextProject.year}</span>
              <h3 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white group-hover:text-studio-cyan transition-colors uppercase">{nextProject.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed">{nextProject.oneLiner}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-studio-cyan text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2 shadow-xl self-start md:self-center shrink-0">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
