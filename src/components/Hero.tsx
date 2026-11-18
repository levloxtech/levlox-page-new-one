import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, X as CloseIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';
import { parseVideoUrl, parseImageUrl } from '../utils/videoUtils';

interface HeroProps {
  onWatchWorkshopClick?: () => void;
  onBookSlotClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { currentMember } = useTheme();
  const { getContent } = useAdminContent();
  const currentContent = getContent(currentMember.id);
  const parsedVideo = parseVideoUrl(currentContent.heroVideoUrl);
  const thumbnailUrl = parseImageUrl(currentContent.heroThumbnailUrl);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Is external iframe (Google Drive or YouTube)?
  const isExternalEmbed = parsedVideo.type === 'gdrive' || parsedVideo.type === 'youtube';

  // Compute duration in seconds from currentContent.heroDuration (e.g. "14:28")
  const duration = React.useMemo(() => {
    if (currentContent.heroDuration) {
      const parts = currentContent.heroDuration.split(':').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts[0] * 60 + parts[1];
      }
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
    }
    return 14 * 60 + 28; // Default 14:28
  }, [currentContent.heroDuration]);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<any>(null);

  // Live in-place playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Auto-hide controls during in-place playback
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(Math.floor(percentage * duration));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-14 md:pb-24 overflow-hidden bg-theme-bg bg-grid-pattern transition-colors duration-300">
      {/* Ambient background light radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[850px] h-[300px] sm:h-[400px] blur-[120px] sm:blur-[160px] rounded-full pointer-events-none -z-10 opacity-60"
        style={{
          background: `radial-gradient(circle, ${currentMember.colors.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline - Preserved, Balanced, Agency-Grade */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-typo leading-[1.15] max-w-4xl mx-auto mb-4 sm:mb-6 text-balance">
          Become an{' '}
          <span style={{ color: currentMember.colors.dominant }}>
            Agentic AI Engineer
          </span>{' '}
          in 45 Days
          <br className="hidden sm:inline" />{' '}
          with Industrial Automation Experience
          <span
            className="block mt-2 sm:mt-3 font-extrabold text-[0.88em] tracking-tight"
            style={{ color: currentMember.colors.dominant }}
          >
            Or Get Your Money Back.
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="text-base sm:text-xl font-medium text-theme-textMuted max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed text-balance">
          Just by spending{' '}
          <span className="font-semibold text-theme-typo">
            2 hours a day
          </span>{' '}
          after work.
        </p>

        {/* Official VSL Video Container - Plays Right Here In Place */}
        <div className="relative max-w-4xl mx-auto group">
          {/* Subtle Dynamic Ambient Backlight Glow */}
          <div
            className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 -z-10"
            style={{
              background: `linear-gradient(135deg, ${currentMember.colors.dominant}, ${currentMember.colors.supporting})`,
            }}
          />

          {/* Video Player Card */}
          <div
            ref={containerRef}
            onClick={() => {
              if (!isPlaying) togglePlay();
            }}
            onMouseMove={handleMouseMove}
            className={`relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-theme-border/80 bg-[#07080f] shadow-2xl transition-all duration-300 w-full flex flex-col justify-between select-none ${
              !isPlaying ? 'cursor-pointer' : ''
            } aspect-[16/10.5] sm:aspect-video min-h-[240px] sm:min-h-0`}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video in place'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlay();
              }
            }}
          >
            {/* Real In-Place Video Body / Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141525] via-[#0b0c15] to-[#05060b] overflow-hidden">
              {isPlaying && parsedVideo.embedUrl ? (
                parsedVideo.type === 'gdrive' || parsedVideo.type === 'youtube' ? (
                  <iframe
                    src={parsedVideo.embedUrl}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    title="Levlox Hero Masterclass"
                  />
                ) : (
                  <video
                    src={parsedVideo.embedUrl}
                    autoPlay
                    controls
                    className="w-full h-full object-cover absolute inset-0 z-10"
                  />
                )
              ) : (
                <>
                  {/* Custom Thumbnail Image if configured — 100% Full Brightness & Crystal Clear */}
                  {thumbnailUrl ? (
                    <>
                      <img
                        src={thumbnailUrl}
                        alt="Levlox Masterclass Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle soft top vignette ONLY for header readability, keeping thumbnail bright and vibrant */}
                      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />
                    </>
                  )}

                  {/* Dynamic Animated Motion during In-Place Playback (if no video URL) */}
                  {isPlaying && !parsedVideo.embedUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Subtle video ambient wave */}
                      <div
                        className="w-[450px] h-[220px] rounded-full blur-[90px] opacity-25 animate-pulse"
                        style={{ backgroundColor: currentMember.colors.dominant }}
                      />
                      {/* Audio wave indicator */}
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-10 opacity-40">
                        {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full transition-all duration-300 animate-pulse"
                            style={{
                              height: isMuted ? '6px' : `${h}%`,
                              backgroundColor: currentMember.colors.dominant,
                              animationDelay: `${i * 120}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Permanent Top Protection Bar — Shields Google Drive popout icon from being clicked */}
            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3.5 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-auto select-none">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: currentMember.colors.dominant,
                    boxShadow: `0 0 10px ${currentMember.colors.dominant}`,
                  }}
                />
                <span className="text-[11px] sm:text-sm font-bold tracking-wider text-white uppercase font-sans truncate max-w-[180px] sm:max-w-none">
                  Levlox Engineering Masterclass
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] sm:text-[11px] font-mono font-bold text-white/80 tracking-wider">
                  1080P HD
                </span>

                {/* Close/Exit video playback button */}
                {isPlaying && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-white text-[11px] sm:text-xs font-semibold border border-white/20 flex items-center gap-1 transition-colors cursor-pointer z-50 shadow-md"
                    title="Return to preview cover"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                    <span>Close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Permanent Popout Shield specifically over Google Drive's top-right pop-out icon */}
            {isPlaying && isExternalEmbed && (
              <div
                className="absolute top-0 right-0 w-24 sm:w-32 h-14 sm:h-16 z-50 bg-transparent cursor-default pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                title=""
              />
            )}

            {/* Center Big Play Button (Rendered ONLY before playback starts) */}
            {!isPlaying && (
              <div className="relative z-20 my-auto flex flex-col items-center justify-center p-4 text-center">
                <div className="relative pointer-events-auto">
                  {/* Pulsing ring */}
                  <div
                    className="absolute -inset-4 sm:-inset-6 rounded-full animate-ping opacity-25"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                  />
                  {/* Glowing play button */}
                  <button
                    onClick={(e) => togglePlay(e)}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl text-white transition-all duration-300 hover:scale-110 border border-white/30 backdrop-blur-md cursor-pointer"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                    aria-label="Play Video"
                  >
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 fill-white translate-x-0.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Custom Bottom Controls Bar — ONLY rendered for direct video/canvas, NEVER overlaid on Google Drive to prevent duplicate timeline! */}
            {!isExternalEmbed && (
              <div
                className={`relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Interactive Scrubber Bar */}
                <div
                  onClick={handleScrubberClick}
                  className="w-full h-2 sm:h-2.5 bg-white/20 hover:bg-white/30 rounded-full overflow-hidden cursor-pointer relative transition-all"
                >
                  <div
                    className="h-full rounded-full transition-all duration-150"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: currentMember.colors.dominant,
                    }}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-white font-mono pt-1">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={(e) => togglePlay(e)}
                      className="p-1 rounded hover:bg-white/10 text-white transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTime(0);
                      }}
                      className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors hidden sm:block"
                      title="Restart"
                    >
                      <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm">
                      <span className="font-semibold">{formatTime(currentTime)}</span>
                      <span className="text-white/40">/</span>
                      <span className="text-white/60">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                      aria-label="Toggle Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
