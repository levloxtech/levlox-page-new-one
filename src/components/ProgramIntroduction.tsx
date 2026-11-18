import React, { useRef } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Layers,
  Laptop,
  Video,
  LifeBuoy,
  Rocket,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface ProgramIntroductionProps {
  onCurriculumClick: () => void;
  onProjectsClick: () => void;
}

export const ProgramIntroduction: React.FC<ProgramIntroductionProps> = ({
  onCurriculumClick,
  onProjectsClick,
}) => {
  const { currentMember } = useTheme();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 265;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programPillars = [
    {
      id: 'curriculum',
      badge: '★ 45-Day Track',
      title: 'Curriculum',
      subtitle: '9 Industrial Phases • 45 Days',
      image: '/transformer-architecture.png',
      spec1: '9 Phases',
      spec1Icon: BookOpen,
      spec2: '45 Days',
      spec2Icon: Layers,
      author: 'Abdul Kalam Azad',
      role: 'Lead AI Architect',
      onClick: () => {
        onCurriculumClick();
        scrollToElement('curriculum');
      },
    },
    {
      id: 'projects',
      badge: '★ 10 Systems',
      title: 'Projects',
      subtitle: '10 Corporate Systems',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      spec1: '10 Systems',
      spec1Icon: Layers,
      spec2: 'Docker Ready',
      spec2Icon: CheckCircle2,
      author: 'Abdul Kalam Azad',
      role: 'Production Systems',
      onClick: () => {
        onProjectsClick();
        scrollToElement('projects');
      },
    },
    {
      id: 'coaching',
      badge: '★ Live 1:1',
      title: 'Coaching',
      subtitle: '1-on-1 & Cohort Mentorship',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      spec1: 'Live Zoom',
      spec1Icon: Video,
      spec2: 'PR Audits',
      spec2Icon: CheckCircle2,
      author: 'Abdul Kalam Azad',
      role: 'Weekly Mentorship',
      onClick: () => scrollToElement('coaching'),
    },
    {
      id: 'portal',
      badge: '★ 24/7 Access',
      title: 'Portal',
      subtitle: '24/7 Engineering Dashboard',
      image: '/portal1.png',
      spec1: 'GPU Compute',
      spec1Icon: Laptop,
      spec2: 'Live Synced',
      spec2Icon: CheckCircle2,
      author: 'Levlox Hub',
      role: 'Student Workspace',
      onClick: () => scrollToElement('portal'),
    },
    {
      id: 'support',
      badge: '★ < 2h SLA',
      title: 'Support',
      subtitle: 'Async PRs & Instant Debugging',
      image: '/support-system.png',
      spec1: '< 2h SLA',
      spec1Icon: LifeBuoy,
      spec2: '7 Days/Wk',
      spec2Icon: CheckCircle2,
      author: 'Engineering Ops',
      role: 'Direct Mentors',
      onClick: () => scrollToElement('support'),
    },
    {
      id: 'students-projects',
      badge: '★ Live Apps',
      title: 'Student Projects',
      subtitle: 'Production Cloud Deployment',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      spec1: '6 Live Apps',
      spec1Icon: Rocket,
      spec2: 'Source Code',
      spec2Icon: CheckCircle2,
      author: 'Graduate Fleet',
      role: 'Cohort Alumni',
      isExternalPage: true,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate('/student-projects');
      },
    },
  ];

  return (
    <section id="program" className="py-16 sm:py-20 bg-theme-bg relative border-t border-theme-border transition-colors duration-300">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight uppercase leading-tight">
            Become An Agentic AI Engineer In{' '}
            <span style={{ color: currentMember.colors.dominant }}>
              45 Days
            </span>
          </h2>
          <p className="mt-3 text-theme-textMuted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A complete industrial transformation protocol — from core neural foundations to building and deploying autonomous multi-agent workflows with {currentMember.memberName}.
          </p>
        </div>

        {/* Mobile Swipe Hint & Controls (< md screens) */}
        <div className="flex md:hidden items-center justify-between text-xs font-mono text-theme-textMuted mb-3 px-1">
          <span className="flex items-center gap-1.5 font-medium text-[11px]">
            <span>Swipe sideways to explore all 6</span>
            <span className="text-xs">&rarr;</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center text-theme-typo shadow-2xs active:scale-95"
              aria-label="Scroll pillars left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center text-theme-typo shadow-2xs active:scale-95"
              aria-label="Scroll pillars right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Visual Cards — Compact, Well-Proportioned, Perfectly Scaled for Mobile & Desktop */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible scroll-smooth pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 select-none snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {programPillars.map((pillar) => {
            const Icon1 = pillar.spec1Icon;
            const Icon2 = pillar.spec2Icon;

            return (
              <div
                key={pillar.id}
                onClick={pillar.onClick}
                className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md border border-black/10 bg-slate-900 w-[225px] sm:w-[250px] md:w-auto h-[305px] sm:h-[325px] md:h-[335px] flex-shrink-0 md:flex-shrink snap-center flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl select-none"
              >
                {/* Full-Card Background Image */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark vignette on top */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Top Floating Pill Badge & Circular Arrow Button */}
                <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold shadow-xs">
                    <span className="text-amber-500">★</span>
                    <span>{pillar.badge.replace('★ ', '')}</span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-white transition-all">
                    {pillar.isExternalPage ? (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-900" />
                    )}
                  </div>
                </div>

                {/* Bottom Frosted Glass Overlay (Sleek, Proportional & Editorial) */}
                <div className="relative z-10 p-3 sm:p-3.5 bg-gradient-to-t from-black/95 via-black/80 via-55% to-transparent backdrop-blur-[3px] text-white flex flex-col justify-end">
                  {/* Name / Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                    {pillar.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-[10px] sm:text-[11px] font-mono font-bold mt-0.5 line-clamp-1 drop-shadow-sm"
                    style={{ color: currentMember.colors.dominant }}
                  >
                    {pillar.subtitle}
                  </p>

                  {/* Middle Specs with Divider */}
                  <div className="flex items-center gap-2 text-[10px] text-white/90 font-mono mt-1.5 pt-1.5 border-t border-white/20">
                    <div className="flex items-center gap-1">
                      <Icon1 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="font-semibold">{pillar.spec1}</span>
                    </div>
                    <span className="text-white/30 font-sans">|</span>
                    <div className="flex items-center gap-1">
                      <Icon2 className="w-3 h-3 text-purple-300 flex-shrink-0" />
                      <span className="font-semibold">{pillar.spec2}</span>
                    </div>
                  </div>

                  {/* Bottom Attribution Line */}
                  <div className="mt-1.5 pt-1 text-[9px] text-white/70 font-mono flex items-center justify-between border-t border-white/10">
                    <span>
                      By &bull; <strong className="text-white font-sans underline underline-offset-2">{pillar.author}</strong>
                    </span>
                    <span className="text-white/60">
                      {pillar.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
