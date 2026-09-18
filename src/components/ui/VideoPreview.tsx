'use client';
import React, { useRef, useState, useEffect } from 'react';
import { parseVideoUrl, getYouTubeThumbnail } from '@/lib/videoUtils';

interface VideoPreviewProps {
  videoUrl: string;
  posterUrl: string;
  aspectRatio?: string;
  title?: string;
  autoPlayOnHover?: boolean;
  priorityPlay?: boolean;
  className?: string;
  onExpand?: () => void;
}

export default function VideoPreview({
  videoUrl,
  posterUrl,
  aspectRatio = 'aspect-[16/9]',
  title = 'Video preview',
  autoPlayOnHover = true,
  priorityPlay = false,
  className = '',
  onExpand,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoInfo = parseVideoUrl(videoUrl);
  const isDirect = videoInfo.type === 'direct';
  const effectivePoster = posterUrl || (videoInfo.type === 'youtube' ? getYouTubeThumbnail(videoUrl) || '' : '');

  useEffect(() => {
    if (!isDirect || !videoRef.current) return;
    if (priorityPlay || isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, priorityPlay, isDirect]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-black border border-white/10 group ${aspectRatio} ${className}`}
      onMouseEnter={() => autoPlayOnHover && setIsHovered(true)}
      onMouseLeave={() => autoPlayOnHover && setIsHovered(false)}
      onClick={onExpand}
    >
      {effectivePoster && (
        <img
          src={effectivePoster}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isDirect && isLoaded && (isHovered || priorityPlay) ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      {isDirect && !hasError && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={effectivePoster}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded && (isHovered || priorityPlay) ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
    </div>
  );
}

