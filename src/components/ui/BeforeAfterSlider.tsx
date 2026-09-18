'use client';
import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { Sparkles, Layers, Play, Pause, RotateCcw, Volume2, VolumeX, Radio } from 'lucide-react';
import { useVideoModal } from '@/components/ui/VideoModalContext';
import { extractYouTubeId } from '@/lib/videoUtils';

interface BeforeAfterSliderProps {
  rawImage: string;
  rawLabel?: string;
  rawVideoUrl?: string;
  finalImage: string;
  finalLabel?: string;
  finalVideoUrl?: string;
  description?: string;
  aspectRatio?: string;
  badgeText?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BeforeAfterSlider({
  rawImage,
  rawLabel = 'RAW S-LOG3 FOOTAGE',
  rawVideoUrl,
  finalImage,
  finalLabel = 'FINAL COLOR & MOTION COMPOSITE',
  finalVideoUrl,
  description,
  aspectRatio = 'aspect-[16/9]',
  badgeText = 'RAW ➔ MASTER',
}: BeforeAfterSliderProps) {
  const { openVideo } = useVideoModal();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlayingLive, setIsPlayingLive] = useState(false);
  const [audioSource, setAudioSource] = useState<'final' | 'raw' | 'muted'>('final');
  const [isPlayersReady, setIsPlayersReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawYtId = rawVideoUrl ? extractYouTubeId(rawVideoUrl) : null;
  const finalYtId = finalVideoUrl ? extractYouTubeId(finalVideoUrl) : null;
  const hasVideoComparison = Boolean(rawYtId && finalYtId);

  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const rawContainerId = `raw-yt-${reactId}`;
  const finalContainerId = `final-yt-${reactId}`;

  const rawPlayerRef = useRef<any>(null);
  const finalPlayerRef = useRef<any>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Drag handling
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, handleMove]);

  // Initialize YouTube API and Players when Live Play is triggered
  const startLiveComparison = () => {
    setIsPlayingLive(true);
    if (!hasVideoComparison) return;

    const initPlayers = () => {
      if (!window.YT || !window.YT.Player) return;

      if (!finalPlayerRef.current) {
        finalPlayerRef.current = new window.YT.Player(finalContainerId, {
          videoId: finalYtId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: finalYtId,
            playsinline: 1,
            mute: 0,
          },
          events: {
            onReady: (e: any) => {
              e.target.playVideo();
              setIsPlayersReady(true);
            },
          },
        });
      } else {
        finalPlayerRef.current.playVideo();
      }

      if (!rawPlayerRef.current) {
        rawPlayerRef.current = new window.YT.Player(rawContainerId, {
          videoId: rawYtId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: rawYtId,
            playsinline: 1,
            mute: 1,
          },
          events: {
            onReady: (e: any) => {
              e.target.playVideo();
            },
          },
        });
      } else {
        rawPlayerRef.current.playVideo();
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayers();
    } else {
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayers();
      };
    }
  };

  const pauseLiveComparison = () => {
    setIsPlayingLive(false);
    try {
      rawPlayerRef.current?.pauseVideo();
      finalPlayerRef.current?.pauseVideo();
    } catch {}
  };

  const restartAndSync = () => {
    try {
      rawPlayerRef.current?.seekTo(0, true);
      finalPlayerRef.current?.seekTo(0, true);
      rawPlayerRef.current?.playVideo();
      finalPlayerRef.current?.playVideo();
      setIsPlayingLive(true);
    } catch {}
  };

  // Audio switcher
  const handleAudioChange = (source: 'final' | 'raw' | 'muted') => {
    setAudioSource(source);
    try {
      if (source === 'final') {
        finalPlayerRef.current?.unMute();
        finalPlayerRef.current?.setVolume(100);
        rawPlayerRef.current?.mute();
      } else if (source === 'raw') {
        rawPlayerRef.current?.unMute();
        rawPlayerRef.current?.setVolume(100);
        finalPlayerRef.current?.mute();
      } else {
        rawPlayerRef.current?.mute();
        finalPlayerRef.current?.mute();
      }
    } catch {}
  };

  // Keep videos synchronized
  useEffect(() => {
    if (isPlayingLive && hasVideoComparison) {
      syncIntervalRef.current = setInterval(() => {
        try {
          if (rawPlayerRef.current?.getCurrentTime && finalPlayerRef.current?.getCurrentTime) {
            const rawTime = rawPlayerRef.current.getCurrentTime();
            const finalTime = finalPlayerRef.current.getCurrentTime();
            if (typeof rawTime === 'number' && typeof finalTime === 'number') {
              if (Math.abs(rawTime - finalTime) > 0.3) {
                rawPlayerRef.current.seekTo(finalTime, true);
              }
            }
          }
        } catch {}
      }, 750);
    } else {
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    }
    return () => {
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    };
  }, [isPlayingLive, hasVideoComparison]);

  return (
    <div className="w-full flex flex-col space-y-3 sm:space-y-4">
      {/* Live Playback Transport Bar (when video comparison is available) */}
      {hasVideoComparison && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 sm:px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl">
          <div className="flex items-center space-x-2">
            {!isPlayingLive ? (
              <button
                type="button"
                onClick={startLiveComparison}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-studio-cyan text-black font-mono font-bold text-xs hover:bg-studio-cyan/90 transition-all shadow-[0_0_15px_rgba(0,194,203,0.3)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>PLAY LIVE COMPARISON</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={pauseLiveComparison}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/20 text-white font-mono font-bold text-xs hover:bg-white/30 transition-all cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>PAUSE LIVE</span>
              </button>
            )}

            {isPlayingLive && (
              <button
                type="button"
                onClick={restartAndSync}
                title="Restart and synchronize both videos"
                className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isPlayingLive && (
            <div className="flex items-center space-x-1.5 font-mono text-[11px]">
              <span className="text-white/40 uppercase hidden sm:inline mr-1">AUDIO:</span>
              <button
                type="button"
                onClick={() => handleAudioChange('final')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  audioSource === 'final'
                    ? 'bg-studio-cyan/20 border border-studio-cyan text-studio-cyan font-bold'
                    : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/5'
                }`}
              >
                MASTER
              </button>
              <button
                type="button"
                onClick={() => handleAudioChange('raw')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  audioSource === 'raw'
                    ? 'bg-studio-cyan/20 border border-studio-cyan text-studio-cyan font-bold'
                    : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/5'
                }`}
              >
                RAW AUDIO
              </button>
              <button
                type="button"
                onClick={() => handleAudioChange('muted')}
                className={`p-1 rounded transition-all cursor-pointer ${
                  audioSource === 'muted'
                    ? 'bg-studio-cyan/20 border border-studio-cyan text-studio-cyan'
                    : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/5'
                }`}
                title="Mute both"
              >
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="hidden sm:flex items-center space-x-2 font-mono text-[10px] text-white/40 tracking-wider uppercase">
            <Radio className="w-3 h-3 text-studio-cyan animate-pulse" />
            <span>DRAG SLIDER WHILE PLAYING</span>
          </div>
        </div>
      )}

      {/* Main Slider Canvas */}
      <div
        ref={containerRef}
        data-cursor="DRAG"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden border border-white/15 bg-black select-none cursor-ew-resize group shadow-2xl touch-none`}
      >
        {/* Layer 1: Final / Master (Full Width Behind) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center">
          {hasVideoComparison && isPlayingLive ? (
            <div className="w-full h-full relative pointer-events-none">
              <div id={finalContainerId} className="w-full h-full scale-[1.35] pointer-events-none" />
            </div>
          ) : (
            <img src={finalImage} alt={finalLabel} className="w-full h-full object-cover" />
          )}

          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] sm:text-[11px] tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded uppercase flex items-center space-x-1.5 pointer-events-none z-10">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-studio-cyan" />
            <span>{finalLabel}</span>
          </div>
        </div>

        {/* Layer 2: Raw / Unedited (Clipped Layer on Top) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {hasVideoComparison && isPlayingLive ? (
            <div className="w-full h-full relative pointer-events-none">
              <div id={rawContainerId} className="w-full h-full scale-[1.35] pointer-events-none" />
            </div>
          ) : (
            <img src={rawImage} alt={rawLabel} className="w-full h-full object-cover" />
          )}

          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/80 backdrop-blur-md border border-white/20 text-white/70 font-mono text-[9px] sm:text-[11px] tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded uppercase flex items-center space-x-1.5 pointer-events-none z-10">
            <Layers className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{rawLabel}</span>
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(0,194,203,0.8)] pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black font-mono font-bold flex items-center justify-center shadow-2xl border-2 border-black/40 text-[10px] sm:text-[11px] transition-transform duration-150 group-hover:scale-110">
            ↔
          </div>
        </div>

        {/* Top Hint Badge */}
        <div className="absolute top-3 sm:top-4 inset-x-0 flex justify-center pointer-events-none z-10">
          <span className="bg-black/75 backdrop-blur-md text-white/90 border border-white/15 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
            {isPlayingLive ? 'LIVE COMPARISON // DRAG SPLIT' : 'DRAG TO COMPARE'}
          </span>
        </div>

        {/* Idle Big Play Overlay */}
        {hasVideoComparison && !isPlayingLive && (
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:bg-black/25">
            <div className="flex flex-col items-center space-y-2 pointer-events-auto">
              <button
                type="button"
                onClick={startLiveComparison}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-studio-cyan text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,194,203,0.6)] hover:scale-110 transition-transform cursor-pointer"
                title="Play live video comparison"
              >
                <Play className="w-6 h-6 fill-black ml-1" />
              </button>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase bg-black/80 px-3 py-1 rounded-full border border-white/10">
                PLAY LIVE COMPARISON
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Caption Description & Tags */}
      {description && (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between text-xs font-mono text-white/50 px-1 pt-1 gap-2 sm:gap-4">
          <p className="max-w-xl leading-relaxed text-white/70">{description}</p>
          <span className="hidden sm:inline-block uppercase tracking-widest text-[10px] text-white/40 shrink-0">{badgeText}</span>
        </div>
      )}

      {/* External Player Modal Links */}
      {(rawVideoUrl || finalVideoUrl) && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
          {rawVideoUrl && (
            <button
              type="button"
              onClick={() => openVideo({ videoUrl: rawVideoUrl, title: rawLabel, aspectRatio: '9:16' })}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-white/60" />
              <span>WATCH RAW SHORT</span>
            </button>
          )}
          {finalVideoUrl && (
            <button
              type="button"
              onClick={() => openVideo({ videoUrl: finalVideoUrl, title: finalLabel, aspectRatio: '9:16' })}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-studio-cyan/15 hover:bg-studio-cyan/25 border border-studio-cyan/40 text-studio-cyan text-xs font-mono font-medium transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>WATCH EDITED SHORT</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
