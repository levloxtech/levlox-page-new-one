import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const InteractiveChallenge: React.FC = () => {
  const { currentMember } = useTheme();

  return (
    <section
      id="challenge"
      className="py-20 sm:py-24 relative border-t border-theme-border transition-colors duration-500 overflow-hidden bg-theme-bg"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] rounded-full pointer-events-none -z-10 opacity-35"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Centered Wireframe Card matching user specification */}
        <div className="bg-theme-surface rounded-3xl sm:rounded-4xl border border-theme-border p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_-15px_rgba(57,48,68,0.12)] text-center relative overflow-hidden group hover:border-theme-border transition-all">
          {/* Subtle top ambient glow inside the card */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: currentMember.colors.dominant }}
          />

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight leading-tight max-w-3xl mx-auto">
            Create a Chatbot in 10 Steps in 10 Mins{' '}
            <span className="text-emerald-500 font-extrabold uppercase inline-block ml-1">
              FREE
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-700 font-sans tracking-tight">
            Make Your Own Personal Assistant.
          </p>

          {/* Designer Tech Spec Chips (Professional & Balanced) */}
          <div className="mt-7 mb-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-slate-600">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="font-semibold text-slate-700">Groq LPU</span>
              <span className="text-slate-400 font-mono text-[11px]">Llama 3.3 70B</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-slate-700">Python</span>
              <span className="text-slate-400 font-mono text-[11px]">Virtual Env</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-semibold text-slate-700">Streamlit</span>
              <span className="text-slate-400 font-mono text-[11px]">Chat UI</span>
            </div>
          </div>

          {/* Big Prominent Action Button — Navigates to /chatbot-challenge */}
          <div className="pt-2">
            <Link
              to="/chatbot-challenge"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-white font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: currentMember.colors.dominant }}
            >
              <span>START THE CHALLENGE</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>

          <p className="mt-4 text-xs font-mono text-slate-400">
            Hands-On Blueprint by {currentMember.memberName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveChallenge;
