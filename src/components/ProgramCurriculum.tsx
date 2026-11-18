import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Search,
  CheckCircle2,
  BookOpen,
  Layers,
  Cpu,
  Bot,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { CURRICULUM_PHASES, type CurriculumPhase } from '../data/curriculumData';
import { useTheme } from '../context/ThemeContext';

export const ProgramCurriculum: React.FC = () => {
  const { currentMember } = useTheme();
  // All phases start closed by default; users expand on demand
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Foundations & DL',
    'Transformers & LLMs',
    'RAG & Voice',
    'Agentic AI',
    'Deployment & Capstone',
    'Career & Assignments',
  ];

  const togglePhase = (id: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    CURRICULUM_PHASES.forEach((p) => {
      allExpanded[p.id] = true;
    });
    setExpandedPhases(allExpanded);
  };

  const collapseAll = () => {
    setExpandedPhases({});
  };

  const filteredPhases = CURRICULUM_PHASES.filter((phase) => {
    const matchesCategory = selectedCategory === 'All' || phase.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = phase.title.toLowerCase().includes(query);
    const matchesPhaseNum = phase.phaseNumber.toLowerCase().includes(query);
    const matchesSummary = phase.summary.toLowerCase().includes(query);
    const matchesDays = phase.days.some(
      (d) =>
        d.title.toLowerCase().includes(query) ||
        d.day.toLowerCase().includes(query) ||
        d.items.some((item) => item.toLowerCase().includes(query)) ||
        (d.assignment && d.assignment.toLowerCase().includes(query))
    );
    const matchesDeliverables = phase.keyDeliverables.some((d) => d.toLowerCase().includes(query));
    const matchesTools = phase.toolsAndTech.some((t) => t.toLowerCase().includes(query));

    return (
      matchesCategory &&
      (matchesTitle || matchesPhaseNum || matchesSummary || matchesDays || matchesDeliverables || matchesTools)
    );
  });

  return (
    <section id="curriculum" className="py-20 sm:py-24 bg-theme-bg relative border-t border-theme-border transition-colors duration-300">
      {/* Background glow */}
      <div
        className="absolute top-1/4 right-10 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-surface border border-theme-border shadow-xs mb-3">
            <BookOpen className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: currentMember.colors.dominant }}
            >
              Comprehensive Syllabus • 9 Core Phases
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight uppercase">
            Program Curriculum
          </h2>
          <p className="mt-3 text-theme-textMuted text-sm sm:text-base leading-relaxed">
            From deep learning foundations and transformers to production multi-agent systems and enterprise capstones under{' '}
            <strong className="text-theme-typo font-semibold">{currentMember.memberName}</strong>&apos;s guidance.
          </p>
        </div>

        {/* Controls: Search Bar, Category Filters & Expand/Collapse */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-textMuted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 9 curriculum phases, topics, deliverables..."
                className="w-full pl-10 pr-4 py-2 bg-theme-surface border border-theme-border rounded-xl text-xs text-theme-typo placeholder-theme-textMuted focus:outline-none transition-colors font-mono shadow-xs"
              />
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg bg-theme-surface text-xs font-mono text-theme-typo border border-theme-border hover:bg-theme-surface-muted transition-colors shadow-xs font-semibold cursor-pointer active:scale-95"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg bg-theme-surface text-xs font-mono text-theme-typo border border-theme-border hover:bg-theme-surface-muted transition-colors shadow-xs font-semibold cursor-pointer active:scale-95"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border shadow-xs cursor-pointer ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'bg-theme-surface border-theme-border text-theme-textMuted hover:text-theme-typo'
                  }`}
                  style={{
                    backgroundColor: isSelected ? currentMember.colors.dominant : undefined,
                    borderColor: isSelected ? currentMember.colors.dominant : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 9 Phases Accordion List */}
        <div className="space-y-4">
          {filteredPhases.map((phase: CurriculumPhase) => {
            const isExpanded = !!expandedPhases[phase.id];

            return (
              <div
                key={phase.id}
                className="rounded-2xl border transition-all duration-300 overflow-hidden bg-theme-surface shadow-xs"
                style={{
                  borderColor: isExpanded ? currentMember.colors.dominant : undefined,
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none gap-3 sm:gap-4 group cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Phase Number Badge */}
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border whitespace-nowrap flex-shrink-0"
                      style={{
                        backgroundColor: currentMember.colors.surfaceMuted,
                        borderColor: currentMember.colors.supporting,
                        color: currentMember.colors.dominant,
                      }}
                    >
                      {phase.phaseNumber}
                    </span>

                    {/* Phase Title */}
                    <span className="text-sm sm:text-base font-extrabold text-theme-typo tracking-wide truncate">
                      {phase.title}
                    </span>

                    {/* Category Tag */}
                    <span className="hidden md:inline-block text-[11px] font-mono text-theme-textMuted px-2 py-0.5 rounded bg-theme-surface-muted border border-theme-border">
                      {phase.category}
                    </span>
                  </div>

                  {/* Plus/Minus Indicator */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono text-theme-textMuted group-hover:text-theme-typo hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'View Syllabus'}
                    </span>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors"
                      style={{
                        backgroundColor: isExpanded ? currentMember.colors.dominant : currentMember.colors.surfaceMuted,
                        color: isExpanded ? '#FFFFFF' : currentMember.colors.typography,
                      }}
                    >
                      {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </button>

                {/* Accordion Expanded Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-theme-border space-y-5 animate-fade-in bg-theme-surface-muted/20">
                    {/* Phase Summary */}
                    <p className="leading-relaxed text-theme-typo text-xs sm:text-sm font-normal pt-1">
                      {phase.summary}
                    </p>

                    {/* SPECIAL CALLOUT: ShopDesk AI Capstone Showcase (Phase 7) */}
                    {phase.specialProject && (
                      <div className="p-4 sm:p-5 rounded-2xl border bg-gradient-to-br from-theme-surface via-theme-surface-muted to-theme-surface shadow-xs space-y-4"
                        style={{ borderColor: currentMember.colors.dominant }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border pb-3">
                          <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-emerald-500" />
                            <h4 className="font-extrabold text-sm sm:text-base text-theme-typo">
                              {phase.specialProject.name}
                            </h4>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                            Tamil • Tanglish • English Support
                          </span>
                        </div>

                        <p className="text-xs text-theme-textMuted leading-relaxed">
                          {phase.specialProject.details}
                        </p>

                        {/* Coordinated 6 Agents Fleet */}
                        {phase.specialProject.agents && (
                          <div>
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-theme-typo mb-2 flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
                              6 Coordinated Specialist Agents Fleet:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                              {phase.specialProject.agents.map((agent, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="p-3 rounded-xl bg-theme-surface border border-theme-border shadow-2xs"
                                >
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-theme-typo mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                    {agent.name}
                                  </div>
                                  <p className="text-[11px] text-theme-textMuted leading-tight">
                                    {agent.role}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 5 Deterministic Guardrails */}
                        {phase.specialProject.guardrails && (
                          <div className="pt-2 border-t border-theme-border">
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-theme-typo mb-2 flex items-center gap-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                              5 Production Industrial Guardrails:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {phase.specialProject.guardrails.map((gr, gIdx) => (
                                <div
                                  key={gIdx}
                                  className="p-2.5 rounded-xl bg-theme-surface border border-theme-border flex items-start gap-2 shadow-2xs"
                                >
                                  <span className="text-amber-500 text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                                    0{gIdx + 1}.
                                  </span>
                                  <div>
                                    <span className="text-xs font-bold text-theme-typo block">
                                      {gr.name}
                                    </span>
                                    <span className="text-[11px] text-theme-textMuted leading-tight block">
                                      {gr.detail}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Topic Modules Breakdown */}
                    <div>
                      <h5
                        className="font-mono text-xs uppercase tracking-wider mb-3 font-bold flex items-center gap-1.5"
                        style={{ color: currentMember.colors.dominant }}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Topic Modules &amp; Practical Breakdown:
                      </h5>

                      <div className="space-y-2.5">
                        {phase.days.map((dayItem, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3 sm:p-3.5 rounded-xl bg-theme-surface border border-theme-border shadow-2xs space-y-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-theme-border/60 pb-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-theme-surface-muted text-theme-typo border border-theme-border"
                                >
                                  Module {String(dIdx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-theme-typo">
                                  {dayItem.title}
                                </span>
                              </div>
                            </div>

                            {/* Bullet Topics */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] sm:text-xs text-theme-textMuted">
                              {dayItem.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-1.5">
                                  <ChevronRight
                                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                    style={{ color: currentMember.colors.dominant }}
                                  />
                                  <span className="leading-tight">{item}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Daily Assignment Callout */}
                            {dayItem.assignment && (
                              <div className="mt-2 pt-2 border-t border-theme-border/60 flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
                                <ClipboardList className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                                <div>
                                  <span className="font-bold font-mono uppercase tracking-wider text-[10px] block text-amber-800">
                                    Hands-On Assignment:
                                  </span>
                                  <span className="font-medium text-amber-900 leading-snug">
                                    {dayItem.assignment}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Industrial Deliverables */}
                    <div>
                      <h5
                        className="font-mono text-xs uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5"
                        style={{ color: currentMember.colors.dominant }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Verified Milestone Deliverables:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.keyDeliverables.map((item, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-theme-surface border border-theme-border flex items-start gap-2 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs leading-tight text-theme-typo font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools and Tech Stack Tags */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-theme-border">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-theme-textMuted mr-1 flex items-center gap-1">
                          <Layers className="w-3 h-3" /> Stack:
                        </span>
                        {phase.toolsAndTech.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-theme-surface text-[11px] font-mono border border-theme-border font-semibold"
                            style={{ color: currentMember.colors.dominant }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <span className="text-[11px] font-mono text-theme-textMuted">
                        Phase {phase.id} of 9 &bull; {phase.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Phase count summary badge */}
        <div className="mt-8 text-center text-xs font-mono text-theme-textMuted font-medium">
          Showing {filteredPhases.length} of {CURRICULUM_PHASES.length} Comprehensive Phases &bull; Customized for {currentMember.memberName}&apos;s Cohort
        </div>
      </div>
    </section>
  );
};