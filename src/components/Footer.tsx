import React from 'react';
import {
  ArrowUp,
  ShieldCheck,
  MapPin,
  Mail,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';

// Clean branded SVG icons for Instagram, LinkedIn, Facebook
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const { currentMember } = useTheme();
  const { setIsAdminModalOpen } = useAdminContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="text-white pt-14 pb-10 relative overflow-hidden transition-colors duration-500 border-t select-none"
      style={{
        backgroundColor: currentMember.colors.contrastBg, // Deep Plum (#393044) for Mine
        borderColor: currentMember.colors.contrastBorder,
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[200px] blur-[140px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: currentMember.colors.dominant }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Levlox Tech Corporate Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo & Company Name with Admin Login Click Trigger */}
            <div
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-3 cursor-pointer group"
              title="Click Levlox logo for Admin Portal Access"
            >
              <img
                src="/levlox-purple-swoosh-logo.png"
                alt="Levlox Logo"
                className="h-10 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Accelerating senior software engineers and IT professionals into top 5% autonomous
              systems builders through battle-tested industrial pipelines and agentic architecture.
            </p>

            {/* Official Headquarters Address */}
            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-violet-300 flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-snug">
                  Levlox Technologies Private Limited, Tech Corridor, OMR, Chennai, Tamil Nadu 600096, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-violet-300 flex-shrink-0" />
                <a
                  href="mailto:support@levlox.tech"
                  className="font-mono text-slate-200 hover:text-white transition-colors"
                >
                  support@levlox.tech &bull; admissions@levlox.tech
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-violet-300 flex-shrink-0" />
                <a
                  href="https://levlox.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-slate-200 hover:text-white transition-colors"
                >
                  https://levlox.tech
                </a>
              </div>
            </div>

            {/* Levlox Tech Official Instagram */}
            <div className="pt-2">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2 font-bold">
                Levlox Tech Official:
              </span>
              <a
                href="https://instagram.com/levlox_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all hover:scale-105"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>@levlox_tech (Instagram)</span>
              </a>
            </div>
          </div>

          {/* Column 2: Abdul Kalam Azad Personal Socials & Connect (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-violet-200 text-[11px] font-mono font-bold tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-violet-300" />
                <span>CHIEF ARCHITECT CONNECT</span>
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                Abdul Kalam Azad
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Lead AI Architect &amp; Founder • Levlox Systems
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Connect directly with Abdul Kalam Azad on official channels for industrial AI
              consulting, enterprise masterclasses, and cohort admissions.
            </p>

            {/* Personal Socials: Instagram, LinkedIn, Facebook */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://instagram.com/abdul_kalam_azad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors group"
              >
                <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <span>Instagram: @abdul_kalam_azad</span>
              </a>

              <a
                href="https://linkedin.com/in/abdul-kalam-azad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors group"
              >
                <div className="w-6 h-6 rounded-lg bg-[#0A66C2]/20 text-[#388bfd] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn: /in/abdul-kalam-azad</span>
              </a>

              <a
                href="https://facebook.com/abdul.kalam.azad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors group"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FacebookIcon className="w-3.5 h-3.5" />
                </div>
                <span>Facebook: /abdul.kalam.azad</span>
              </a>
            </div>
          </div>

          {/* Column 3: Policy, Administration & Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-white/60 font-bold">
              Institutional Governance
            </span>

            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  &rsaquo; Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  &rsaquo; Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('contact')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  &rsaquo; Contact Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200 transition-colors font-bold pt-2"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Panel Login</span>
                </button>
              </li>
            </ul>

            {/* Back to top */}
            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-white px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all font-semibold"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & guarantee acknowledgement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 font-mono">
          <p>
            &copy; 2026 Levlox Technologies Private Limited ({currentMember.memberName} Track). All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-white">45-Day Industrial Experience Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
