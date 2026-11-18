import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { submitWeb3Form } from '../utils/web3forms';

interface PackageApplicationProps {
  initialPackage?: '1 TO FOUR' | 'WAITING LIST';
}

export const PackageApplication: React.FC<PackageApplicationProps> = ({
  initialPackage = '1 TO FOUR',
}) => {
  const { currentMember } = useTheme();
  const [selectedPackage, setSelectedPackage] = useState<'1 TO FOUR' | 'WAITING LIST'>(initialPackage);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    workExperience: '',
    spend2HoursDaily: 'yes',
    investInCareer: 'yes',
    currentLpa: '',
    acceptRefundPolicy: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const packages = [
    {
      id: '1 TO FOUR',
      title: '1 TO FOUR',
      tagline: 'Ultra-Intensive Mentorship Cohort',
      ratio: `1 Senior Architect (${currentMember.memberName}) : 4 Engineers`,
      badge: 'RECOMMENDED FOR ACCELERATION',
      description:
        `High-touch direct sprint reviews with ${currentMember.memberName}, dedicated architectural feedback on every PR, private Slack channel, and personalized capstone guidance.`,
      highlights: [
        `Max 4 engineers per dedicated mentor (${currentMember.memberName})`,
        'Direct PR code auditing & weekly 1:1 calls',
        'Priority SLA on framework and debugging support',
        'Custom corporate capstone system design',
      ],
    },
    {
      id: 'WAITING LIST',
      title: 'WAITING LIST',
      tagline: 'Next Cohort Early Access',
      ratio: `Priority Admission Queue for ${currentMember.memberName}'s Upcoming Cohort`,
      badge: 'PRIORITY ADMISSION QUEUE',
      description:
        'Current cohort seats are strictly capped to maintain 1:1 architectural auditing quality. Join the priority waitlist to secure early access and registration priority for the upcoming batch.',
      highlights: [
        'Priority notification 48 hours before public enrollment opens',
        'Guaranteed seat reservation for upcoming 45-day cohort',
        `Direct profile review by ${currentMember.memberName}'s admissions team`,
        'Immediate access to prep materials & prerequisites repository',
      ],
    },
  ] as const;

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.workExperience.trim()) {
      errs.workExperience = 'Please select or enter your work experience';
    }

    if (!formData.currentLpa.trim()) {
      errs.currentLpa = 'Please provide your current compensation (LPA)';
    }

    if (!formData.acceptRefundPolicy) {
      errs.acceptRefundPolicy = 'You must acknowledge the refund policy to continue';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const result = await submitWeb3Form({
      subject: `[${currentMember.memberName} Track] Cohort Application: ${selectedPackage} - ${formData.name}`,
      from_name: `LevLox - ${currentMember.memberName}`,
      'Trainer / Mentor Assigned': currentMember.memberName,
      'Trainer Portal Track': `${currentMember.memberName} (${window.location.pathname})`,
      'Candidate Name': formData.name,
      'Phone Number (WhatsApp)': formData.phone,
      'Email Address': formData.email,
      'Selected Package / Track': selectedPackage,
      'Work Experience': formData.workExperience,
      'Current LPA': formData.currentLpa,
      'Can Commit 2 Hours Daily': formData.spend2HoursDaily,
      'Ready to Invest in Career': formData.investInCareer,
      'Refund Policy Acknowledged': formData.acceptRefundPolicy ? 'Yes' : 'No',
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmissionError(result.message || 'Application submission failed. Please try again.');
    }
  };

  return (
    <section id="application-form" className="py-24 bg-theme-bg relative border-t border-theme-border transition-colors duration-300">
      {/* Background illumination */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[160px] rounded-full pointer-events-none -z-10"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-surface border border-theme-border shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentMember.colors.dominant }} />
            <span
              className="text-xs font-mono font-medium uppercase tracking-wider"
              style={{ color: currentMember.colors.dominant }}
            >
              Transformational Application Funnel • {currentMember.memberName} Edition
            </span>
          </div>

          {/* Wireframe Main Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight uppercase leading-tight">
            Enroll For Agentic AI Experience And Get{' '}
            <span
              style={{
                color: currentMember.colors.dominant,
              }}
            >
              Industry-Ready Resources For Free
            </span>
          </h2>
          <p className="mt-4 text-theme-textMuted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select your preferred learning structure below, then complete the application form to secure your strategy call with {currentMember.memberName}&apos;s team.
          </p>
        </div>

        {/* PACKAGE SELECTION CARDS: "1 TO FOUR" and "WAITING LIST" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`cursor-pointer relative rounded-2xl p-7 transition-all duration-300 border flex flex-col justify-between shadow-sm ${
                  isSelected ? 'border-2 scale-[1.01] shadow-xl' : 'bg-theme-surface border-theme-border hover:bg-theme-surface-muted/60'
                }`}
                style={{
                  backgroundColor: isSelected ? currentMember.colors.surfaceMuted : undefined,
                  borderColor: isSelected ? currentMember.colors.dominant : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: currentMember.colors.surface,
                        borderColor: currentMember.colors.supporting,
                        color: currentMember.colors.dominant,
                      }}
                    >
                      {pkg.badge}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center border transition-all text-white"
                      style={{
                        backgroundColor: isSelected ? currentMember.colors.dominant : 'transparent',
                        borderColor: isSelected ? currentMember.colors.dominant : currentMember.colors.supporting,
                      }}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  {/* Package Label */}
                  <h3 className="text-2xl font-extrabold text-theme-typo mb-1 font-mono">
                    {pkg.title}
                  </h3>
                  <div className="text-xs font-semibold mb-3" style={{ color: currentMember.colors.dominant }}>
                    {pkg.tagline} • {pkg.ratio}
                  </div>

                  <p className="text-xs text-theme-textMuted leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-theme-border">
                    {pkg.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-theme-typo font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between">
                  <span className="text-xs font-mono text-theme-textMuted font-medium">
                    {isSelected ? '✓ Currently Selected' : 'Click to select this track'}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg ${
                      isSelected ? 'text-white' : 'bg-theme-surface border border-theme-border text-theme-typo'
                    }`}
                    style={{
                      backgroundColor: isSelected ? currentMember.colors.dominant : undefined,
                    }}
                  >
                    {isSelected ? 'Active Selection' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* APPLICATION FORM - Clean, Editorial Light Theme matching entire website */}
        <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(57,48,68,0.08)] relative overflow-hidden transition-colors duration-300">
          {isSubmitted ? (
            <div className="py-12 text-center animate-fade-in space-y-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto shadow-lg"
                style={{ backgroundColor: currentMember.colors.dominant }}
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-typo mb-2">
                  Application Received!
                </h3>
                <p className="text-sm text-theme-textMuted max-w-md mx-auto">
                  Thank you, <strong className="text-theme-typo">{formData.name}</strong>. Your profile for {currentMember.memberName}&apos;s{' '}
                  <span className="font-mono font-bold" style={{ color: currentMember.colors.dominant }}>
                    {selectedPackage}
                  </span>{' '}
                  track has been registered.
                </p>
                <p className="text-xs text-theme-textMuted max-w-sm mx-auto mt-2">
                  Our admissions team is reviewing your background ({formData.workExperience}, Current: {formData.currentLpa}). We will reach out via phone/WhatsApp at{' '}
                  <span className="font-mono font-bold text-theme-typo">{formData.phone}</span> within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-theme-border bg-theme-surface-muted/60 max-w-md mx-auto text-xs text-left font-mono space-y-2 text-theme-typo">
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Selected Track:</span>
                  <span className="font-bold" style={{ color: currentMember.colors.dominant }}>{selectedPackage}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Mentor Assigned:</span>
                  <span className="font-bold">{currentMember.memberName}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">2 Hours/Day Committed:</span>
                  <span className="text-emerald-600 font-bold">Yes (Confirmed)</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-theme-textMuted">Refund Policy:</span>
                  <span className="text-emerald-600 font-bold">Accepted &amp; Protected</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    workExperience: '',
                    spend2HoursDaily: 'yes',
                    investInCareer: 'yes',
                    currentLpa: '',
                    acceptRefundPolicy: true,
                  });
                }}
                className="text-xs underline font-mono text-theme-textMuted hover:text-theme-typo cursor-pointer transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-theme-border pb-4 mb-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-theme-typo uppercase font-mono tracking-wide">
                  Candidate Application &mdash; {currentMember.memberName} Cohort
                </h3>
                <p className="text-xs sm:text-sm text-theme-textMuted mt-1">
                  We maintain strict cohort quality. Please answer honestly so we can evaluate your readiness.
                </p>
              </div>

              {/* Grid 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-2 font-bold">
                    1. Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className={`w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                      errors.name ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-2 font-bold">
                    2. Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* 3. Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-2 font-bold">
                    3. Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className={`w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                      errors.email ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Grid 2: Work Experience & Current LPA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 4. Work Experience */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-2 font-bold">
                    4. Work Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.workExperience}
                    onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                    className={`w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                      errors.workExperience ? 'border-red-500' : 'border-theme-border'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    <option value="1-3 years">1 - 3 Years</option>
                    <option value="3-5 years">3 - 5 Years</option>
                    <option value="5-8 years">5 - 8 Years</option>
                    <option value="8-12 years">8 - 12 Years</option>
                    <option value="12+ years">12+ Years (Tech Lead / Architect)</option>
                    <option value="student_fresh">Final Year Student / Fresh Graduate</option>
                  </select>
                  {errors.workExperience && <p className="mt-1 text-xs text-red-500">{errors.workExperience}</p>}
                </div>

                {/* 5. What is your current LPA */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-2 font-bold">
                    5. What is your current LPA? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.currentLpa}
                    onChange={(e) => setFormData({ ...formData, currentLpa: e.target.value })}
                    placeholder="e.g. 12 LPA, 24 LPA, or bracket"
                    className={`w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                      errors.currentLpa ? 'border-red-500' : 'border-theme-border'
                    }`}
                  />
                  {errors.currentLpa && <p className="mt-1 text-xs text-red-500">{errors.currentLpa}</p>}
                </div>
              </div>

              {/* Grid 3: Commitment Questions (6 & 7) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* 6. Can you spend 2 hours daily? */}
                <div className="p-4 rounded-xl bg-theme-surface-muted/40 border border-theme-border">
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-3 font-bold">
                    6. Can you spend 2 hours daily? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, spend2HoursDaily: 'yes' })}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        formData.spend2HoursDaily === 'yes'
                          ? 'border-2 shadow-sm text-white'
                          : 'bg-theme-surface border-theme-border text-theme-textMuted hover:text-theme-typo'
                      }`}
                      style={{
                        backgroundColor: formData.spend2HoursDaily === 'yes' ? currentMember.colors.dominant : undefined,
                        borderColor: formData.spend2HoursDaily === 'yes' ? currentMember.colors.dominant : undefined,
                      }}
                    >
                      &check; Yes, I Can
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, spend2HoursDaily: 'no' })}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        formData.spend2HoursDaily === 'no'
                          ? 'border-red-500 bg-red-50 text-red-700 border-2'
                          : 'bg-theme-surface border-theme-border text-theme-textMuted hover:text-theme-typo'
                      }`}
                    >
                      &times; Unsure / Limited
                    </button>
                  </div>
                </div>

                {/* 7. Will you be able to invest in yourself to upskill your career? */}
                <div className="p-4 rounded-xl bg-theme-surface-muted/40 border border-theme-border">
                  <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-3 font-bold">
                    7. Will you be able to invest in yourself? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, investInCareer: 'yes' })}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        formData.investInCareer === 'yes'
                          ? 'border-2 shadow-sm text-white'
                          : 'bg-theme-surface border-theme-border text-theme-textMuted hover:text-theme-typo'
                      }`}
                      style={{
                        backgroundColor: formData.investInCareer === 'yes' ? currentMember.colors.dominant : undefined,
                        borderColor: formData.investInCareer === 'yes' ? currentMember.colors.dominant : undefined,
                      }}
                    >
                      &check; Yes, Absolutely
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, investInCareer: 'no' })}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        formData.investInCareer === 'no'
                          ? 'border-amber-500 bg-amber-50 text-amber-800 border-2'
                          : 'bg-theme-surface border-theme-border text-theme-textMuted hover:text-theme-typo'
                      }`}
                    >
                      &times; Looking for free only
                    </button>
                  </div>
                </div>
              </div>

              {/* 8. If we don't fulfill your needs, will you accept our refund policy? */}
              <div className="p-4 rounded-xl border border-theme-border space-y-2 bg-theme-surface-muted/40">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptRefundPolicy}
                    onChange={(e) => setFormData({ ...formData, acceptRefundPolicy: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div className="text-xs text-theme-typo">
                    <span className="font-bold uppercase font-mono block">
                      8. IF WE DIDN&apos;T FULFILL YOUR NEEDS, WILL YOU ACCEPT OUR REFUND POLICY?
                    </span>
                    <span className="text-theme-textMuted block mt-0.5 font-normal leading-relaxed">
                      I understand and agree to the 45-day money-back guarantee policy terms. If {currentMember.memberName}&apos;s cohort fails to deliver the promised industrial curriculum and milestones, my investment is 100% refundable.
                    </span>
                  </div>
                </label>
                {errors.acceptRefundPolicy && (
                  <p className="text-xs text-red-500 pl-7">{errors.acceptRefundPolicy}</p>
                )}
              </div>

              {submissionError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-mono text-center">
                  {submissionError}
                </div>
              )}

              {/* CTA: "BOOK MY CALL" */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 sm:py-5 rounded-xl text-white font-extrabold text-sm sm:text-base tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: currentMember.colors.dominant }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Application...
                  </span>
                ) : (
                  <>
                    <span>Book My Call with {currentMember.memberName}&apos;s Team</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-theme-textMuted font-mono text-center font-medium pt-2">
                <span>&bull; Confidential Admissions</span>
                <span>&bull;</span>
                <span>1-on-1 Profile Strategy</span>
                <span>&bull;</span>
                <span>Selected Track: <strong className="text-theme-typo">{selectedPackage}</strong></span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
