import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  Clock,
  Video,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';
import { DEFAULT_WORKSHOP } from '../data/workshopData';
import { submitWeb3Form } from '../utils/web3forms';

export const NextWorkshopRegistration: React.FC = () => {
  const { currentMember } = useTheme();
  const { getContent } = useAdminContent();
  const currentContent = getContent(currentMember.id);
  const workshop = currentContent.nextWorkshop || DEFAULT_WORKSHOP;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    roleType: 'working_professional' as 'working_professional' | 'student',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Instructor name: Abdul Kalam Azad for default/mine route, or dynamic for other members
  const instructorName =
    currentMember.id === 'mine' ? 'Abdul Kalam Azad' : currentMember.memberName || 'Abdul Kalam Azad';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid corporate or personal email';
    }

    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.mobile)) {
      errs.mobile = 'Enter a valid phone number (8-15 digits)';
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
      subject: `[${currentMember.memberName} Track] Workshop Registration: ${formData.name}`,
      from_name: `LevLox - ${currentMember.memberName}`,
      'Trainer / Lead Engineer': currentMember.memberName,
      'Trainer Portal Track': `${currentMember.memberName} (${window.location.pathname})`,
      'Registrant Name': formData.name,
      'Email Address': formData.email,
      'Mobile Number (WhatsApp)': formData.mobile,
      'Profile Status': formData.roleType === 'working_professional' ? 'Working Professional' : 'Student / Aspirant',
      'Workshop Title': workshop.title,
      'Workshop Date & Time': `${workshop.date} (${workshop.time})`,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmissionError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <section
      id="next-workshop"
      className="py-16 sm:py-20 md:py-24 bg-theme-bg relative border-t border-theme-border transition-colors duration-300 overflow-hidden"
    >
      {/* Ambient background soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] rounded-full pointer-events-none -z-10 opacity-40"
        style={{ background: currentMember.colors.glow }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: "Next Workshop Live" with green indicator and quote */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-theme-typo tracking-tight">
              Next Workshop{' '}
              <span className="text-emerald-500 inline-flex items-center gap-2">
                Live
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-pulse inline-block align-middle" />
              </span>
            </h2>
          </div>

          <p className="text-theme-textMuted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            &ldquo;In this workshop, you will learn how Agentic AI is implemented in companies and build a practical project.&rdquo;
          </p>
        </div>

        {/* Master Registration Card — Agency-Grade Editorial Theme */}
        <div className="bg-theme-surface border border-theme-border rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(57,48,68,0.08)] overflow-hidden">
          {isSubmitted ? (
            /* Pass Confirmed State */
            <div className="py-14 sm:py-16 px-5 sm:px-12 text-center animate-fade-in space-y-6 max-w-lg mx-auto">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto shadow-lg"
                style={{ backgroundColor: currentMember.colors.dominant }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                  Pass Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-typo mb-2">
                  You Are Registered!
                </h3>
                <p className="text-sm text-theme-textMuted leading-relaxed">
                  We have reserved your seat for <strong className="text-theme-typo">{workshop.title}</strong>. A calendar invite (.ics) and access link have been sent to{' '}
                  <span className="font-mono font-bold text-theme-typo">{formData.email}</span>.
                </p>
              </div>

              {/* Pass Details Summary */}
              <div className="p-5 rounded-2xl bg-theme-surface-muted/60 border border-theme-border text-xs text-left font-mono space-y-2">
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Candidate:</span>
                  <span className="text-theme-typo font-sans font-bold">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Instructor:</span>
                  <span className="text-theme-typo font-sans font-bold">{instructorName}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Date:</span>
                  <span className="font-bold text-theme-typo">{workshop.date}</span>
                </div>
                <div className="flex justify-between border-b border-theme-border/60 pb-1.5">
                  <span className="text-theme-textMuted">Time:</span>
                  <span className="font-bold text-theme-typo">{workshop.time}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-theme-textMuted">Admission:</span>
                  <span className="text-emerald-700 font-bold">100% FREE PASS</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', mobile: '', roleType: 'working_professional' });
                }}
                className="text-xs underline font-mono cursor-pointer text-theme-textMuted hover:text-theme-typo transition-colors"
              >
                Register another colleague or change details
              </button>
            </div>
          ) : (
            /* Unified 2-Column Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* LEFT COLUMN: Workshop Overview, Balanced Stacked Cards, Instructor (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-theme-border">
                <div className="space-y-6">
                  {/* Workshop Title */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Masterclass &bull; Free Admission
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-theme-typo tracking-tight leading-tight">
                      {workshop.title}
                    </h3>
                  </div>

                  {/* 3 FULL-WIDTH STACKED SPEC CARDS (Exact match to reference design) */}
                  <div className="space-y-3">
                    {/* Item 1: Date */}
                    <div className="p-4 rounded-2xl bg-theme-surface-muted/40 border border-theme-border/80 flex items-center gap-4 hover:border-theme-border transition-colors shadow-2xs">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-theme-surface border border-theme-border shadow-xs flex-shrink-0"
                        style={{ color: currentMember.colors.dominant }}
                      >
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-theme-textMuted font-bold block mb-0.5">
                          DATE
                        </span>
                        <span className="text-sm sm:text-base font-bold text-theme-typo block truncate">
                          {workshop.date}
                        </span>
                      </div>
                    </div>

                    {/* Item 2: Time & Duration */}
                    <div className="p-4 rounded-2xl bg-theme-surface-muted/40 border border-theme-border/80 flex items-center gap-4 hover:border-theme-border transition-colors shadow-2xs">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-theme-surface border border-theme-border shadow-xs flex-shrink-0"
                        style={{ color: currentMember.colors.dominant }}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-theme-textMuted font-bold block mb-0.5">
                          TIME &amp; DURATION
                        </span>
                        <span className="text-sm sm:text-base font-bold text-theme-typo block truncate">
                          {workshop.time}
                        </span>
                      </div>
                    </div>

                    {/* Item 3: Platform & Code Access */}
                    <div className="p-4 rounded-2xl bg-theme-surface-muted/40 border border-theme-border/80 flex items-center gap-4 hover:border-theme-border transition-colors shadow-2xs">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-theme-surface border border-theme-border shadow-xs flex-shrink-0"
                        style={{ color: currentMember.colors.dominant }}
                      >
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-theme-textMuted font-bold block mb-0.5">
                          PLATFORM &amp; CODE ACCESS
                        </span>
                        <span className="text-sm sm:text-base font-bold text-theme-typo block truncate">
                          {workshop.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INSTRUCTOR PROFILE WITH LEVLOX LOGO */}
                <div className="mt-8 pt-5 border-t border-theme-border/70 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme-border p-2 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <img
                      src="/levlox-logo.png"
                      alt="Levlox"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-theme-typo">
                        {instructorName}
                      </span>
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-theme-surface-muted text-theme-textMuted border border-theme-border">
                        Instructor
                      </span>
                    </div>
                    <p className="text-xs text-theme-textMuted">
                      Lead AI Architect &bull; Levlox Agentic Engineering
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Streamlined Registration Form (5 Cols) */}
              <div className="lg:col-span-5 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-theme-surface-muted/20">
                <div className="mb-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-theme-typo tracking-tight">
                    Reserve Your Free Seat
                  </h4>
                  <p className="text-xs sm:text-sm text-theme-textMuted mt-1">
                    Enter your details to receive the direct Zoom link and pass confirmation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-1.5 font-bold">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-textMuted">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full pl-10 pr-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted/60 focus:outline-none transition-colors shadow-2xs ${
                          errors.name
                            ? 'border-red-500'
                            : 'border-theme-border focus:border-theme-dominant'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-1.5 font-bold">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-textMuted">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className={`w-full pl-10 pr-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted/60 focus:outline-none transition-colors shadow-2xs ${
                          errors.email
                            ? 'border-red-500'
                            : 'border-theme-border focus:border-theme-dominant'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Mobile Number */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-1.5 font-bold">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-textMuted">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-10 pr-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-typo placeholder-theme-textMuted/60 focus:outline-none transition-colors shadow-2xs ${
                          errors.mobile
                            ? 'border-red-500'
                            : 'border-theme-border focus:border-theme-dominant'
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Field 4: Role Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-theme-typo mb-1.5 font-bold">
                      Profile Status <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, roleType: 'working_professional' })}
                        className={`py-3 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          formData.roleType === 'working_professional'
                            ? 'border-2 font-bold shadow-xs'
                            : 'border-theme-border text-theme-textMuted bg-theme-surface hover:bg-theme-surface-muted/60'
                        }`}
                        style={{
                          borderColor:
                            formData.roleType === 'working_professional'
                              ? currentMember.colors.dominant
                              : undefined,
                          backgroundColor:
                            formData.roleType === 'working_professional'
                              ? currentMember.colors.surfaceMuted
                              : undefined,
                          color:
                            formData.roleType === 'working_professional'
                              ? currentMember.colors.dominant
                              : undefined,
                        }}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Working Professional</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, roleType: 'student' })}
                        className={`py-3 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          formData.roleType === 'student'
                            ? 'border-2 font-bold shadow-xs'
                            : 'border-theme-border text-theme-textMuted bg-theme-surface hover:bg-theme-surface-muted/60'
                        }`}
                        style={{
                          borderColor:
                            formData.roleType === 'student'
                              ? currentMember.colors.dominant
                              : undefined,
                          backgroundColor:
                            formData.roleType === 'student'
                              ? currentMember.colors.surfaceMuted
                              : undefined,
                          color:
                            formData.roleType === 'student'
                              ? currentMember.colors.dominant
                              : undefined,
                        }}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Student / Aspirant</span>
                      </button>
                    </div>
                  </div>

                  {submissionError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-xl text-xs font-mono text-center">
                      {submissionError}
                    </div>
                  )}

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-95 active:scale-[0.99] cursor-pointer mt-2"
                    style={{ backgroundColor: currentMember.colors.dominant }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Reserving Seat...
                      </span>
                    ) : (
                      <>
                        <span>Register Now For Free Workshop</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Trust Footer */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-theme-textMuted font-mono text-center pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Zero Spam Guarantee
                    </span>
                    <span>&bull;</span>
                    <span>Direct Calendar Invite</span>
                    <span>&bull;</span>
                    <span>No Fee Required</span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
