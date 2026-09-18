export interface VideoInfo {
  type: 'youtube' | 'vimeo' | 'direct';
  id?: string;
  embedUrl?: string;
  originalUrl: string;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats.
 * Handles: standard watch URLs, youtu.be shortlinks, embed URLs, and shorts URLs.
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

/**
 * Extracts Vimeo video ID from Vimeo URLs.
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Parses any video URL and returns its type, ID, and iframe embed URL if applicable.
 */
export function parseVideoUrl(url: string): VideoInfo {
  if (!url) return { type: 'direct', originalUrl: '' };

  const ytId = extractYouTubeId(url);
  if (ytId) {
    return {
      type: 'youtube',
      id: ytId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`,
      originalUrl: url,
    };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return {
      type: 'vimeo',
      id: vimeoId,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`,
      originalUrl: url,
    };
  }

  return {
    type: 'direct',
    originalUrl: url,
  };
}

/**
 * Generates high quality YouTube thumbnail URL from a video URL or ID.
 */
export function getYouTubeThumbnail(urlOrId: string, quality: 'maxres' | 'hq' = 'maxres'): string | null {
  const id = urlOrId.length === 11 ? urlOrId : extractYouTubeId(urlOrId);
  if (!id) return null;
  const filename = quality === 'maxres' ? 'maxresdefault.jpg' : 'hqdefault.jpg';
  return `https://i.ytimg.com/vi/${id}/${filename}`;
}
