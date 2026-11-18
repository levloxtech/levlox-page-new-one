import React from 'react';
import { X, Shield, FileText, Mail, MapPin, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const { currentMember } = useTheme();
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-theme-typo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme-border bg-theme-surface-muted">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <Shield className="w-5 h-5" style={{ color: currentMember.colors.dominant }} />}
            {type === 'terms' && <FileText className="w-5 h-5" style={{ color: currentMember.colors.dominant }} />}
            {type === 'contact' && <Mail className="w-5 h-5" style={{ color: currentMember.colors.dominant }} />}
            <h3 className="font-bold text-theme-typo text-base uppercase font-mono tracking-wider">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service & Refund Policy'}
              {type === 'contact' && `Contact LEVLOX (${currentMember.memberName} Edition)`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-theme-textMuted hover:text-theme-typo hover:bg-theme-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-theme-typo leading-relaxed font-normal">
          {type === 'privacy' && (
            <>
              <p>
                At <strong>LEVLOX (https://levlox.tech{currentMember.route})</strong>, we take the confidentiality of your career and contact data with utmost seriousness.
              </p>
              <h4 className="font-bold uppercase font-mono text-xs mt-3" style={{ color: currentMember.colors.dominant }}>
                1. Information We Collect
              </h4>
              <p className="text-theme-textMuted">
                When applying for {currentMember.memberName}&apos;s Agentic AI engineering cohorts or registering for free workshops, we collect your name, corporate/personal email, telephone number, experience bracket, and current LPA.
              </p>
              <h4 className="font-bold uppercase font-mono text-xs mt-3" style={{ color: currentMember.colors.dominant }}>
                2. How We Use Your Data
              </h4>
              <p className="text-theme-textMuted">
                Your details are used strictly for admission evaluation, scheduling 1-on-1 strategy sessions with {currentMember.memberName}&apos;s team, delivering portal access, and curriculum updates. We never sell, rent, or trade your data.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold uppercase font-mono text-xs" style={{ color: currentMember.colors.dominant }}>
                1. 45-Day Money-Back Guarantee
              </h4>
              <p className="text-theme-textMuted">
                Our flagship promise is deterministic: If you attend scheduled coaching calls with {currentMember.memberName}, complete assigned corporate project milestones, and spend the agreed 2 hours daily after work, yet fail to master the industrial agentic curriculum, you are entitled to a full 100% refund of your cohort tuition.
              </p>
              <h4 className="font-bold uppercase font-mono text-xs mt-3" style={{ color: currentMember.colors.dominant }}>
                2. Student Responsibilities
              </h4>
              <p className="text-theme-textMuted">
                Working professionals agree to commit 2 hours per day to code implementations, attend cohort check-ins, submit pull requests for code reviews, and participate in peer accountability sessions.
              </p>
            </>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p className="text-theme-textMuted">
                Have questions regarding {currentMember.memberName}&apos;s upcoming workshop, admissions criteria, or cohort schedule? Connect with our team:
              </p>

              <div className="p-4 rounded-xl bg-theme-surface-muted border border-theme-border space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" style={{ color: currentMember.colors.dominant }} />
                  <span>Website: <a href={`https://levlox.tech${currentMember.route}`} target="_blank" rel="noreferrer" className="underline font-bold" style={{ color: currentMember.colors.dominant }}>https://levlox.tech{currentMember.route}</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: currentMember.colors.dominant }} />
                  <span>Admissions: <a href="mailto:sales@levlox.in" className="font-bold text-theme-typo hover:underline">sales@levlox.in</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>Headquarters: <span className="font-bold text-theme-typo">L-2-1754-A, 120 feet road, Anna Nagar, Trichy, Tamil Nadu 620026</span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-theme-surface-muted border-t border-theme-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-lg transition-colors shadow-sm"
            style={{ backgroundColor: currentMember.colors.dominant }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
