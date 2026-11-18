import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Search, Sparkles, CheckCircle2, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STUDENT_PROJECTS_DATA, type StudentProject } from '../data/studentProjectsData';
import { useTheme } from '../context/ThemeContext';

export const StudentProjectsPage: React.FC = () => {
  const { currentMember } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Multi-Agent Systems',
    'Autonomous RAG',
    'Enterprise Automation',
    'Developer Tooling',
  ];

  const filteredProjects = STUDENT_PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.projectCategory === selectedCategory;
    const matchesSearch =
      project.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-theme-bg text-theme-typo font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-theme-bg/90 backdrop-blur-xl border-b border-theme-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-theme-typo hover:text-theme-dominant transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Masterclass</span>
          </Link>

          <Link to="/" className="flex items-center gap-2.5">
            <img src="/levlox-logo.png" alt="Levlox" className="w-8 h-8 object-contain" />
            <span className="font-extrabold text-xl tracking-tight text-theme-typo">
              LEVLOX
            </span>
          </Link>

          <a
            href="/#application-form"
            className="px-4 py-2 rounded-xl text-white font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-sm hover:opacity-95"
            style={{ backgroundColor: currentMember.colors.dominant }}
          >
            Apply for Cohort &rarr;
          </a>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-16 sm:py-20 relative overflow-hidden border-b border-theme-border">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-40"
          style={{ background: currentMember.colors.glow }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-surface border border-theme-border shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider text-theme-typo"
            >
              Live Student Projects &bull; Production Deployments
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight">
            Student Projects Directory
          </h1>

          <p className="mt-4 text-theme-textMuted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Explore commercial-grade Agentic AI applications architected and deployed live to production by graduates of the 45-day Levlox engineering protocol.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-theme-textMuted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, system name, or tech (e.g. LangGraph)..."
              className="w-full pl-11 pr-4 py-3.5 bg-theme-surface border border-theme-border rounded-2xl text-sm text-theme-typo placeholder-theme-textMuted/60 focus:outline-none focus:border-theme-dominant shadow-sm transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-white shadow-sm'
                    : 'bg-theme-surface border border-theme-border text-theme-textMuted hover:text-theme-typo'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? currentMember.colors.dominant : undefined,
                  borderColor: selectedCategory === cat ? currentMember.colors.dominant : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: StudentProject) => (
            <div
              key={project.id}
              className="bg-theme-surface border border-theme-border rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Student Info Header */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-theme-border/70">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.studentAvatar}
                      alt={project.studentName}
                      className="w-11 h-11 rounded-full object-cover border border-theme-border shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-theme-typo leading-snug">
                          {project.studentName}
                        </h4>
                        <a
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] hover:opacity-80 transition-opacity"
                          title="View LinkedIn Profile"
                        >
                          <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.86 6.3Z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-[11px] text-theme-textMuted line-clamp-1">
                        {project.studentRole}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                    LIVE
                  </span>
                </div>

                {/* Category Pill */}
                <div className="mb-2">
                  <span
                    className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-theme-surface-muted border border-theme-border inline-block"
                    style={{ color: currentMember.colors.dominant }}
                  >
                    {project.projectCategory}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-base font-bold text-theme-typo mb-2 group-hover:text-theme-dominant transition-colors leading-snug">
                  {project.projectTitle}
                </h3>

                {/* Project Summary */}
                <p className="text-xs text-theme-textMuted leading-relaxed mb-4">
                  {project.projectSummary}
                </p>

                {/* Key Performance Metric */}
                <div className="p-3 rounded-xl bg-theme-surface-muted/50 border border-theme-border/80 text-[11px] text-theme-typo mb-4 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{project.metrics}</span>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-theme-surface-muted text-[10px] font-mono text-theme-textMuted border border-theme-border font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live URL & GitHub Code */}
              <div className="pt-4 border-t border-theme-border/70 flex items-center gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs hover:opacity-95"
                  style={{ backgroundColor: currentMember.colors.dominant }}
                >
                  <span>View Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-muted text-theme-typo transition-colors flex items-center justify-center"
                  title="View GitHub Repository"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentProjectsPage;
