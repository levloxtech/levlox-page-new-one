import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, X } from 'lucide-react';
import { type TestimonialItem } from '../data/testimonialsData';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';
import { parseVideoUrl } from '../utils/videoUtils';

export const Testimonials: React.FC = () => {
  const { currentMember } = useTheme();
  const { getContent } = useAdminContent();
  const currentContent = getContent(currentMember.id);
  const testimonials = currentContent.testimonials;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<TestimonialItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 290;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-theme-bg relative border-t border-theme-border transition-colors duration-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] rounded-full pointer-events-none -z-10 opacity-50"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight">
            Can I Become an{' '}
            <span style={{ color: currentMember.colors.dominant }}>
              Agentic AI Engineer?
            </span>
          </h2>
          <p className="mt-2 text-theme-textMuted text-sm sm:text-base font-normal max-w-xl mx-auto">
            Real student video stories &amp; reviews &bull; Swipe or scroll sideways to view all
          </p>
        </div>

        {/* Carousel Section: Compact Video Testimonials flanked by Left & Right Buttons (Laptop only) */}
        <div className="relative px-0 md:px-12">
          {/* Left Side Button - Hidden on mobile, visible on laptop/desktop */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-theme-border bg-theme-surface/95 hover:bg-theme-surface text-theme-typo shadow-xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md -translate-x-3 lg:-translate-x-5"
            aria-label="Scroll testimonials left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Center Carousel Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 select-none -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-[240px] sm:w-[268px] h-[395px] sm:h-[420px] flex-shrink-0 rounded-[24px] overflow-hidden shadow-xl border border-white/10 relative transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* 1. Full-Card Background Video / Photo Thumbnail */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* 2. Transparent Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a14] via-[#090a14]/85 via-50% to-transparent pointer-events-none" />

                {/* 3. Circular White Play Button on Right Side */}
                <button
                  onClick={() => setSelectedVideo(item)}
                  className="absolute right-3.5 top-[43%] -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black shadow-xl flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all duration-200 z-20 hover:bg-slate-100"
                  aria-label={`Play ${item.name} video review`}
                >
                  <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
                </button>

                {/* 4. Layered Content Block */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 flex flex-col justify-end text-white">
                  {/* Student Name */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                    {item.name}
                  </h3>

                  {/* Student Role */}
                  <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5 font-medium drop-shadow-sm">
                    {item.role}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-amber-400">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-xs text-slate-200 leading-relaxed mt-2 line-clamp-3 font-normal drop-shadow">
                    &ldquo;{item.feedback}&rdquo;
                  </p>

                  {/* LinkedIn Verification Pill Button */}
                  <div className="mt-3">
                    <a
                      href={item.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0A66C2] hover:bg-[#004182] text-white text-[10px] sm:text-[11px] font-bold transition-colors shadow-md"
                    >
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.86 6.3Z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Button - Hidden on mobile, visible on laptop/desktop */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-theme-border bg-theme-surface/95 hover:bg-theme-surface text-theme-typo shadow-xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md translate-x-3 lg:translate-x-5"
            aria-label="Scroll testimonials right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Video Testimonial Playback Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-lg bg-[#0e0f1b] border border-white/15 rounded-2xl p-6 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                  />
                  <h4 className="text-sm font-bold text-white">
                    {selectedVideo.name} &bull; Student Review
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close review modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Area (Live Embed if Google Drive or Video URL, else verified outcome showcase) */}
              {(() => {
                const parsed = parseVideoUrl(selectedVideo.linkedinUrl);
                if (parsed.type === 'gdrive' || parsed.type === 'youtube') {
                  return (
                    <div className="my-5 aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                      <iframe
                        src={parsed.embedUrl}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        title={selectedVideo.name}
                      />
                    </div>
                  );
                } else if (
                  parsed.type === 'direct' &&
                  parsed.embedUrl &&
                  parsed.embedUrl.startsWith('http') &&
                  !parsed.embedUrl.includes('linkedin.com')
                ) {
                  return (
                    <div className="my-5 aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                      <video
                        src={parsed.embedUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                }
                return (
                  <div className="my-5 aspect-video rounded-xl bg-[#15162a] border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 shadow-xl animate-pulse"
                      style={{ backgroundColor: currentMember.colors.dominant }}
                    >
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </div>
                    <h5 className="text-sm font-bold text-white">
                      {selectedVideo.name} ({selectedVideo.role})
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Duration: {selectedVideo.videoDuration} &bull; Verified Outcome
                    </p>
                    <p className="text-xs text-slate-300 mt-3 max-w-xs italic">
                      &ldquo;{selectedVideo.feedback}&rdquo;
                    </p>
                  </div>
                );
              })()}

              <div className="flex items-center justify-between pt-2">
                {selectedVideo.linkedinUrl?.includes('linkedin.com') ? (
                  <a
                    href={selectedVideo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold"
                  >
                    View Verified LinkedIn Profile
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">Verified Alumni Review</span>
                )}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
