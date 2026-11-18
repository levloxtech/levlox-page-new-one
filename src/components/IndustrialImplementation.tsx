import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import { CORPORATE_PROJECTS, type CorporateProject } from '../data/projectsData';
import { useTheme } from '../context/ThemeContext';

interface IndustrialImplementationProps {
  onWatchCoachingVideo?: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export const IndustrialImplementation: React.FC<IndustrialImplementationProps> = () => {
  const { currentMember } = useTheme();
  const [selectedProject, setSelectedProject] = useState<CorporateProject>(CORPORATE_PROJECTS[0]);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // 3 Official Images for Portal
  const portalImages: GalleryItem[] = [
    {
      id: 'portal-1',
      title: 'Student Registration Page',
      image: '/p1.png',
    },
    {
      id: 'portal-2',
      title: 'LMS Member Login Page',
      image: '/p2.png',
    },
    {
      id: 'portal-3',
      title: 'Student Course Dashboard',
      image: '/portal.png',
    },
  ];

  // 3 Official Images for Coaching
  const coachingImages: GalleryItem[] = [
    {
      id: 'coach-1',
      title: 'Live 1-on-1 Zoom Architecture Debugging',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'coach-2',
      title: 'Weekly Cohort System Design Reviews',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'coach-3',
      title: 'Inline GitHub PR Code Audits',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // 3 Official Images for Support
  const supportImages: GalleryItem[] = [
    {
      id: 'support-1',
      title: 'Dedicated Senior Architect Channel',
      image: '/support-system.png',
    },
    {
      id: 'support-2',
      title: 'Runtime Environment & CUDA Debugging',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'support-3',
      title: '< 2-Hour Guaranteed SLA Resolution Desk',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-24 bg-theme-bg relative border-t border-theme-border transition-colors duration-300">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 sm:space-y-24">
        {/* ====================================================
            SECTION 09A — 10 CORPORATE PROJECTS
           ==================================================== */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-surface border border-theme-border shadow-xs mb-4">
              <Briefcase className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: currentMember.colors.dominant }}
              >
                10 Enterprise Systems
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight uppercase">
              Build Industrial AI Systems
            </h2>
            <p className="mt-4 text-theme-textMuted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Move beyond simple tutorial scripts. Architect, audit, and deploy 10 corporate-grade AI systems with dedicated coaching from {currentMember.memberName}.
            </p>
          </div>

          {/* Two-Column Corporate Projects Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: 10 Projects Selector List */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-theme-border">
                <span className="text-xs font-mono uppercase tracking-wider text-theme-textMuted font-bold">
                  Select Project to Inspect Scope:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  10 Production Systems
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CORPORATE_PROJECTS.map((proj) => {
                  const isSelected = selectedProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between shadow-2xs cursor-pointer ${
                        isSelected
                          ? 'border-2 scale-[1.01] shadow-sm'
                          : 'bg-theme-surface border-theme-border hover:bg-theme-surface-muted/60'
                      }`}
                      style={{
                        backgroundColor: isSelected ? currentMember.colors.surfaceMuted : undefined,
                        borderColor: isSelected ? currentMember.colors.dominant : undefined,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span
                            className="font-bold"
                            style={{
                              color: isSelected ? currentMember.colors.dominant : currentMember.colors.textMuted,
                            }}
                          >
                            {proj.projectNumber}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-theme-surface border border-theme-border text-theme-textMuted">
                            {proj.industry}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold leading-snug text-theme-typo">
                          {proj.title}
                        </h4>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-mono text-theme-textMuted">{proj.techStack[0]}</span>
                        </div>
                        <ChevronRight
                          className="w-3.5 h-3.5 transition-transform"
                          style={{ color: isSelected ? currentMember.colors.dominant : undefined }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Project Detailed Inspector Box with Architectural Scope Image */}
            <div className="lg:col-span-6">
              <div
                className="p-5 sm:p-6 rounded-2xl bg-theme-surface border-2 shadow-xl space-y-4"
                style={{ borderColor: currentMember.colors.dominant }}
              >
                {/* Header: Project Scope & Industry Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: currentMember.colors.dominant }}>
                    {selectedProject.projectNumber} // ARCHITECTURAL SCOPE
                  </span>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border"
                    style={{
                      backgroundColor: currentMember.colors.surfaceMuted,
                      borderColor: currentMember.colors.supporting,
                      color: currentMember.colors.dominant,
                    }}
                  >
                    {selectedProject.industry}
                  </span>
                </div>

                {/* ARCHITECTURAL SCOPE IMAGE BANNER */}
                <div className="relative rounded-xl overflow-hidden border border-theme-border/80 h-44 sm:h-52 w-full group shadow-2xs bg-slate-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Top-Right Architecture Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedProject.architectureBadge}
                    </span>
                  </div>

                  {/* Bottom-Left Overlay Spec */}
                  <div className="absolute bottom-3 left-3 z-10 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 block">
                      Production Architecture Blueprint
                    </span>
                    <span className="text-sm font-bold text-white drop-shadow-sm">
                      {selectedProject.title}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-theme-typo tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-theme-textMuted leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Production Deliverables */}
                <div className="pt-2 border-t border-theme-border">
                  <span className="text-[11px] font-mono uppercase text-theme-typo tracking-wider block mb-2 font-bold">
                    Production Deliverables:
                  </span>
                  <div className="space-y-1.5">
                    {selectedProject.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-theme-typo">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-3 border-t border-theme-border flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-theme-textMuted mr-1">Stack:</span>
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-theme-surface-muted text-[10px] font-mono border border-theme-border font-bold"
                      style={{ color: currentMember.colors.dominant }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            ROW 1 — STUDENT PORTAL (#portal) — OFFICIAL GALLERY
           ==================================================== */}
        <div id="portal" className="scroll-mt-24 space-y-6 sm:space-y-8">
          {/* One Official Clean Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-theme-typo tracking-tight uppercase">
              Student Engineering Portal
            </h3>
            <p className="mt-2 text-theme-textMuted text-xs sm:text-sm font-mono">
              24/7 LMS Dashboard &bull; Live Progress Tracking &bull; Cloud GPU Sandbox
            </p>
          </div>

          {/* 3 Clean, Official Images (No heavy container, no dark overlays covering content) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {portalImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveLightbox(img)}
                className="group relative rounded-2xl overflow-hidden border border-theme-border/90 bg-theme-surface shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
                  />
                  {/* Top-Right subtle expand pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-theme-surface border-t border-theme-border flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-theme-typo">
                    {img.title}
                  </span>
                  <span className="text-[10px] font-mono text-theme-textMuted">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================
            ROW 2 — COACHING & MENTORSHIP (#coaching) — OFFICIAL GALLERY
           ==================================================== */}
        <div id="coaching" className="scroll-mt-24 space-y-6 sm:space-y-8">
          {/* One Official Clean Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-theme-typo tracking-tight uppercase">
              1-on-1 Coaching &amp; Live Architectural Auditing
            </h3>
            <p className="mt-2 text-theme-textMuted text-xs sm:text-sm font-mono">
              Direct Face-to-Face Calls with {currentMember.memberName} &bull; Detailed PR Feedback &bull; Career Roadmapping
            </p>
          </div>

          {/* 3 Clean Official Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {coachingImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveLightbox(img)}
                className="group relative rounded-2xl overflow-hidden border border-theme-border/90 bg-theme-surface shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-theme-surface border-t border-theme-border flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-theme-typo">
                    {img.title}
                  </span>
                  <span className="text-[10px] font-mono text-theme-textMuted">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================
            ROW 3 — SUPPORT & SLA (#support) — OFFICIAL GALLERY
           ==================================================== */}
        <div id="support" className="scroll-mt-24 space-y-6 sm:space-y-8">
          {/* One Official Clean Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-theme-typo tracking-tight uppercase">
              24/7 Async Engineering Support &amp; SLA
            </h3>
            <p className="mt-2 text-theme-textMuted text-xs sm:text-sm font-mono">
              Private Discord/Slack Hub &bull; Guaranteed &lt; 2-Hour SLA &bull; Never Get Blocked
            </p>
          </div>

          {/* 3 Clean Official Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {supportImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveLightbox(img)}
                className="group relative rounded-2xl overflow-hidden border border-theme-border/90 bg-theme-surface shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-theme-surface border-t border-theme-border flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-theme-typo">
                    {img.title}
                  </span>
                  <span className="text-[10px] font-mono text-theme-textMuted">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          FULL-SCREEN LIGHTBOX MODAL (Click image to inspect)
         ==================================================== */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-black/60 border-b border-white/10 text-white">
              <span className="text-sm sm:text-base font-bold text-white">
                {activeLightbox.title}
              </span>
              <button
                onClick={() => setActiveLightbox(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/40">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
