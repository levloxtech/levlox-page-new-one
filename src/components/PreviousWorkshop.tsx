import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Video, Users, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';
import { parseVideoUrl } from '../utils/videoUtils';

interface PreviousWorkshopProps {
  onWatchVideo?: () => void;
}

export const PreviousWorkshop: React.FC<PreviousWorkshopProps> = () => {
  const { currentMember } = useTheme();
  const { getContent } = useAdminContent();
  const currentContent = getContent(currentMember.id);
  const prevWorkshop = currentContent.previousWorkshop;
  const parsedVideo = parseVideoUrl(prevWorkshop.videoUrl);
  const isExternalEmbed = parsedVideo.type === 'gdrive' || parsedVideo.type === 'youtube';

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const duration = 1 * 3600 + 24 * 60 + 18; // 1h 24m 18s in seconds (5058s)
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

  // Auto-hide controls during playback
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
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <section id="previous-workshop" className="py-20 sm:py-24 bg-theme-bg relative border-t border-theme-border transition-colors duration-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-50"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-surface border border-theme-border shadow-sm mb-4">
            <Video className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
            <span
              className="text-xs font-mono font-medium uppercase tracking-wider"
              style={{ color: currentMember.colors.dominant }}
            >
              Recorded Workshop
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight uppercase">
            Previous Workshop
          </h2>
          <p className="mt-3 text-theme-textMuted text-sm sm:text-base max-w-2xl mx-auto">
            Missed {currentMember.memberName}&apos;s last live engineering masterclass? Watch the full recorded session breaking down industrial agent architecture.
          </p>
        </div>

        {/* Official Interactive In-Place Video Player */}
        <div className="relative max-w-4xl mx-auto group">
          {/* Subtle Ambient Backlight Glow */}
          <div
            className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 -z-10"
            style={{
              background: `linear-gradient(135deg, ${currentMember.colors.dominant}, ${currentMember.colors.supporting})`,
            }}
          />

          {/* Video Player Card */}
          <div
            ref={containerRef}
            onClick={() => togglePlay()}
            onMouseMove={handleMouseMove}
            className="cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden border border-theme-border/80 bg-[#07080f] shadow-2xl transition-all duration-300 min-h-[360px] sm:min-h-[390px] md:min-h-0 md:aspect-video w-full flex flex-col justify-between select-none"
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Pause workshop recording' : 'Play workshop recording in place'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlay();
              }
            }}
          >
            {/* Real In-Place Video Background Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141525] via-[#0b0c15] to-[#05060b] overflow-hidden">
              {isPlaying && parsedVideo.embedUrl ? (
                parsedVideo.type === 'gdrive' || parsedVideo.type === 'youtube' ? (
                  <iframe
                    src={parsedVideo.embedUrl}
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    title="Previous Workshop Recording"
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
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                  {/* Dynamic Animated Motion during In-Place Playback */}
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Ambient pulsing glow */}
                      <div
                        className="w-[450px] h-[220px] rounded-full blur-[90px] opacity-25 animate-pulse"
                        style={{ backgroundColor: currentMember.colors.dominant }}
                      />
                      {/* Dynamic audio visualizer wave */}
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-10 opacity-40">
                        {[35, 65, 85, 45, 95, 55, 75, 40, 90, 60, 80, 50].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full transition-all duration-300 animate-pulse"
                            style={{
                              height: isMuted ? '6px' : `${h}%`,
                              backgroundColor: currentMember.colors.dominant,
                              animationDelay: `${i * 110}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Top Bar inside Player */}
            <div
              className={`relative z-20 flex items-center justify-between p-3 sm:p-4 md:p-5 bg-gradient-to-b from-black/85 to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{
                    backgroundColor: currentMember.colors.dominant,
                    boxShadow: `0 0 10px ${currentMember.colors.dominant}`,
                  }}
                />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-white line-clamp-1">
                  {prevWorkshop.title}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-white/80 font-mono flex-shrink-0 relative">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-white/90">
                  <Users className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
                  {prevWorkshop.attendeesCount}+ Engineers Attended
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold tracking-wider">
                  {prevWorkshop.duration}
                </span>

                {/* Popout Blocker Shield */}
                {isPlaying && isExternalEmbed && (
                  <div
                    className="absolute -top-3 -right-6 w-32 h-14 z-40 cursor-default"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />
                )}
              </div>
            </div>

            {/* Center Area: Play Button (only before playback starts) */}
            {!isPlaying && (
              <div className="relative z-20 my-auto flex flex-col items-center justify-center p-2.5 sm:p-4 text-center">
                {/* Glowing Big Play Button */}
                <div className="relative mb-2 sm:mb-3 md:mb-4 pointer-events-auto">
                  <div
                    className="absolute -inset-2.5 sm:-inset-5 rounded-full animate-ping opacity-25"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                  />
                  <button
                    onClick={(e) => togglePlay(e)}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl text-white transition-all duration-300 hover:scale-110 border border-white/30 backdrop-blur-md"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                    aria-label="Play recorded workshop"
                  >
                    <Play className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 fill-white translate-x-0.5" />
                  </button>
                </div>

                {/* Workshop Meta Titles */}
                <div className="max-w-xl mx-auto px-2 pointer-events-none">
                  <span
                    className="text-[9px] sm:text-xs font-mono uppercase tracking-widest block mb-0.5 sm:mb-1 font-bold"
                    style={{ color: currentMember.colors.dominant }}
                  >
                    FULL RECORDING ARCHIVE
                  </span>
                  <h3 className="text-xs sm:text-base md:text-xl font-bold text-white mb-1.5 sm:mb-2 leading-snug drop-shadow-md line-clamp-2">
                    {prevWorkshop.projectName || 'How We Built an Autonomous RAG Pipeline With Self-Correction in 90 Minutes'}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-[9px] sm:text-xs text-slate-300">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/10">LangGraph Loops</span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Qdrant Vector DB</span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Production Deployment</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Official Video Controls Bar — ONLY rendered for direct video/canvas to eliminate duplicate timeline! */}
            {!isExternalEmbed && (
              <div
                className={`relative z-20 p-2.5 sm:p-4 md:p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-1 sm:gap-2 transition-opacity duration-300 ${
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
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <button
                      onClick={(e) => togglePlay(e)}
                      className="p-1 rounded hover:bg-white/10 text-white transition-colors cursor-pointer"
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
                      className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors hidden sm:block cursor-pointer"
                      title="Restart"
                    >
                      <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <div className="flex items-center gap-1 text-white/90 text-[11px] sm:text-sm">
                      <span className="font-semibold">{formatTime(currentTime)}</span>
                      <span className="text-white/40">/</span>
                      <span className="text-white/60">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-1 sm:p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
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
                      className="p-1 sm:p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
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

        {/* In-Place Play Workshop Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={() => togglePlay()}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-3 cursor-pointer"
            style={{ backgroundColor: currentMember.colors.dominant }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Recording</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Previous Workshop</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
