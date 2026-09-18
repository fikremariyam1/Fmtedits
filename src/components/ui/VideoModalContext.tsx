'use client';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { parseVideoUrl } from '@/lib/videoUtils';

interface VideoModalData { videoUrl: string; title: string; aspectRatio?: string; poster?: string; }
interface VideoModalContextType { openVideo: (data: VideoModalData) => void; closeVideo: () => void; isOpen: boolean; }

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [modalData, setModalData] = useState<VideoModalData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoInfo = modalData ? parseVideoUrl(modalData.videoUrl) : null;
  const isEmbed = videoInfo && (videoInfo.type === 'youtube' || videoInfo.type === 'vimeo');
  const isVertical = modalData?.aspectRatio?.includes('9:16') || modalData?.aspectRatio?.toLowerCase().includes('vertical');

  const openVideo = (data: VideoModalData) => { setModalData(data); setIsPlaying(true); };
  const closeVideo = () => setModalData(null);

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`; };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); }
    else { videoRef.current.pause(); setIsPlaying(false); }
  };
  const toggleMute = () => { if (!videoRef.current) return; videoRef.current.muted = !videoRef.current.muted; setIsMuted(videoRef.current.muted); };
  const handleTimeUpdate = () => { if (!videoRef.current) return; const c = videoRef.current.currentTime; const t = videoRef.current.duration || 1; setProgress((c / t) * 100); setCurrentTime(fmt(c)); };
  const handleLoadedMetadata = () => { if (!videoRef.current) return; setDuration(fmt(videoRef.current.duration || 0)); };
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => { if (!videoRef.current) return; const rect = e.currentTarget.getBoundingClientRect(); videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * (videoRef.current.duration || 0); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalData) return;
      if (e.key === 'Escape') closeVideo();
      if (e.key === ' ' && !isEmbed) { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalData, isEmbed]);

  useEffect(() => { document.body.style.overflow = modalData ? 'hidden' : 'unset'; return () => { document.body.style.overflow = 'unset'; }; }, [modalData]);

  return (
    <VideoModalContext.Provider value={{ openVideo, closeVideo, isOpen: !!modalData }}>
      {children}
      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 md:p-8"
            onClick={closeVideo}
          >
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-none gap-2">
              <span className="pointer-events-auto inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest text-studio-cyan uppercase bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full max-w-[calc(100%-52px)] truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-cyan animate-ping shrink-0" />
                <span className="truncate">{modalData.title}</span>
              </span>
              <button
                onClick={closeVideo}
                className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl mt-8 sm:mt-0 ${
                isVertical ? 'max-w-[340px] sm:max-w-md aspect-[9/16] max-h-[78vh] sm:max-h-[85vh]' : 'max-w-6xl aspect-[16/9] max-h-[80vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {isEmbed && videoInfo?.embedUrl ? (
                <iframe
                  src={videoInfo.embedUrl}
                  title={modalData.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={modalData.videoUrl}
                    poster={modalData.poster}
                    autoPlay
                    playsInline
                    loop
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={togglePlay}
                    className="w-full h-full object-contain cursor-pointer bg-black"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6">
                    <div className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4" onClick={handleScrub}>
                      <div className="absolute top-0 left-0 bottom-0 bg-white rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-white/90">
                      <div className="flex items-center space-x-3">
                        <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                        </button>
                        <button onClick={toggleMute} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="text-white/70 text-[11px]">{currentTime} / <span className="text-white/40">{duration}</span></span>
                      </div>
                      <span className="hidden sm:inline-block px-2.5 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-widest text-[10px]">{modalData.aspectRatio || '16:9'}</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error('useVideoModal must be used within VideoModalProvider');
  return ctx;
}

