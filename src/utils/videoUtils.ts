/**
 * Utility functions for parsing and embedding video links (Google Drive, YouTube, Direct MP4)
 * and extracting direct image thumbnail URLs from Google Drive links.
 */

export interface ParsedVideo {
  type: 'gdrive' | 'youtube' | 'direct' | 'none';
  embedUrl: string;
  originalUrl: string;
}

export function parseVideoUrl(url?: string): ParsedVideo {
  if (!url || !url.trim() || url.includes('1demo-')) {
    return { type: 'none', embedUrl: '', originalUrl: '' };
  }

  const trimmed = url.trim();

  // 1. Google Drive Links:
  // Examples:
  // https://drive.google.com/file/d/1a2b3c4d5e/view?usp=sharing
  // https://drive.google.com/file/d/1a2b3c4d5e/preview
  // https://drive.google.com/open?id=1a2b3c4d5e
  // https://docs.google.com/file/d/1a2b3c4d5e/edit
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return {
        type: 'gdrive',
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        originalUrl: trimmed,
      };
    }
  }

  // 2. YouTube Links:
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      originalUrl: trimmed,
    };
  }

  // 3. Direct Video URLs (MP4, WebM, OGG)
  if (/\.(mp4|webm|ogg)($|\?)/i.test(trimmed)) {
    return {
      type: 'direct',
      embedUrl: trimmed,
      originalUrl: trimmed,
    };
  }

  // Fallback direct
  return {
    type: 'direct',
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}

/**
 * Converts a Google Drive link or direct image link into a valid browser image source URL.
 */
export function parseImageUrl(url?: string): string {
  if (!url || !url.trim() || url.includes('1demo-')) {
    return '';
  }

  const trimmed = url.trim();

  // Google Drive image link conversion:
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Google's official fast thumbnail CDN for public files
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`;
    }
  }

  return trimmed;
}
