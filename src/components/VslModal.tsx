import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, FileText, Video } from 'lucide-react';
import { VSL_DATA } from '../data/vslContent';
import { useTheme } from '../context/ThemeContext';

interface VslModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSlot: () => void;
}

export const VslModal: React.FC<VslModalProps> = ({ isOpen, onClose, onBookSlot }) => {
  const { currentMember } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [activeTab, setActiveTab] = useState<'video' | 'transcript'>('video');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-theme-surface border border-theme-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-theme-typo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-theme-border bg-theme-surface-muted">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: currentMember.colors.dominant }}
            />
            <h3 className="font-bold text-sm sm:text-base text-theme-typo tracking-wide">
              LEVLOX VSL Masterclass — {currentMember.memberName} Edition
            </h3>
            <span className="hidden sm:inline text-xs font-mono font-medium" style={{ color: currentMember.colors.dominant }}>
              [ 45-Day Agentic Transformation ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex rounded-lg bg-theme-surface p-0.5 border border-theme-border text-xs">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors font-medium ${
                  activeTab === 'video' ? 'text-white' : 'text-theme-textMuted hover:text-theme-typo'
                }`}
                style={{
                  backgroundColor: activeTab === 'video' ? currentMember.colors.dominant : undefined,
                }}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video</span>
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors font-medium ${
                  activeTab === 'transcript' ? 'text-white' : 'text-theme-textMuted hover:text-theme-typo'
                }`}
                style={{
                  backgroundColor: activeTab === 'transcript' ? currentMember.colors.dominant : undefined,
                }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VSL Script</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-theme-textMuted hover:text-theme-typo hover:bg-theme-surface transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'video' ? (
            <div className="flex flex-col">
              {/* Simulated Video Player */}
              <div className="relative aspect-video w-full bg-black text-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none" />

                <div className="relative z-20 max-w-2xl px-6 text-center">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 font-bold border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: currentMember.colors.dominant,
                      color: currentMember.colors.dominant,
                    }}
                  >
                    CHAPTER {currentChapterIndex + 1} OF {VSL_DATA.sections.length}:{' '}
                    {VSL_DATA.sections[currentChapterIndex].title}
                  </span>
                  <blockquote className="text-base sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                    &ldquo;{VSL_DATA.sections[currentChapterIndex].quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    {VSL_DATA.sections[currentChapterIndex].details}
                  </p>
                </div>

                {/* Big Center Toggle Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute z-20 w-16 h-16 rounded-full text-white flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 shadow-lg"
                  style={{ backgroundColor: currentMember.colors.dominant }}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white translate-x-0.5" />}
                </button>

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                  <div
                    className="w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer relative overflow-hidden transition-all"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickPos = (e.clientX - rect.left) / rect.width;
                      setProgress(clickPos * 100);
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: currentMember.colors.dominant,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span>
                        {Math.floor((progress * 14.28) / 100)}:{Math.floor(((progress * 14.28) % 1) * 60).toString().padStart(2, '0')} / 14:28
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">
                      MONEY-BACK GUARANTEE APPLIES
                    </span>
                  </div>
                </div>
              </div>

              {/* Chapters timeline row */}
              <div className="p-4 sm:p-6 bg-theme-surface border-t border-theme-border">
                <h4 className="text-xs uppercase font-mono tracking-wider text-theme-textMuted mb-3 font-bold">
                  Jump to Core VSL Argument:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {VSL_DATA.sections.map((sec, idx) => {
                    const isCurrent = currentChapterIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentChapterIndex(idx);
                          setProgress((idx / VSL_DATA.sections.length) * 100 + 5);
                        }}
                        className={`p-2.5 rounded-lg text-left transition-all border ${
                          isCurrent ? 'border-2 shadow-sm font-bold' : 'bg-theme-surface-muted/50 border-theme-border text-theme-textMuted hover:text-theme-typo'
                        }`}
                        style={{
                          borderColor: isCurrent ? currentMember.colors.dominant : undefined,
                          backgroundColor: isCurrent ? currentMember.colors.surfaceMuted : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span style={{ color: currentMember.colors.dominant }}>{sec.time}</span>
                          <span className="text-theme-textMuted">Part {idx + 1}</span>
                        </div>
                        <div className="text-xs font-semibold text-theme-typo line-clamp-1">{sec.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Full Transcript */
            <div className="p-6 sm:p-8 bg-theme-surface space-y-6">
              <div className="flex items-center justify-between border-b border-theme-border pb-4">
                <div>
                  <h4 className="text-lg font-bold text-theme-typo">Full VSL Masterclass Narrative</h4>
                  <p className="text-xs text-theme-textMuted">Presented for {currentMember.memberName}&apos;s cohort track.</p>
                </div>
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-bold"
                  style={{
                    backgroundColor: currentMember.colors.surfaceMuted,
                    color: currentMember.colors.dominant,
                  }}
                >
                  14 MIN READ
                </span>
              </div>

              <div className="prose max-w-none text-theme-typo text-sm leading-relaxed space-y-4 font-normal">
                {VSL_DATA.fullTranscript.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="p-3.5 rounded-xl bg-theme-surface-muted/60 border border-theme-border">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA inside Modal */}
        <div className="p-4 sm:p-5 bg-theme-surface-muted border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-theme-textMuted">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>45-day complete money-back guarantee policy applies</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookSlot();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-[1.01]"
              style={{ backgroundColor: currentMember.colors.dominant }}
            >
              Book Your Slot Now with {currentMember.memberName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
