import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  Calendar,
  Clock,
  Users,
  Check,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  LogOut,
  Play,
  CheckCircle,
  Film,
  Link as LinkIcon,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useAdminContent, type TrainerContent } from '../../context/AdminContentContext';
import { MEMBERS_DATA } from '../../data/membersData';
import { parseVideoUrl, parseImageUrl } from '../../utils/videoUtils';
import type { TestimonialItem } from '../../data/testimonialsData';

export const AdminModal: React.FC = () => {
  const {
    isAuthenticated,
    login,
    logout,
    isAdminModalOpen,
    setIsAdminModalOpen,
    getContent,
    updateContent,
    resetContent,
    selectedTrainerId,
    setSelectedTrainerId,
  } = useAdminContent();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'workshop' | 'previous' | 'testimonials'>('hero');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Edit states for current trainer
  const currentData = getContent(selectedTrainerId);
  const [formData, setFormData] = useState<TrainerContent>(currentData);

  // When switching selected trainer, sync local form data
  const handleTrainerChange = (id: string) => {
    setSelectedTrainerId(id);
    setFormData(getContent(id));
    setEditingTestimonial(null);
  };

  // Testimonial modal / editor state
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingNewTestimonial, setIsAddingNewTestimonial] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = login(email, password);
    if (!success) {
      setLoginError('Invalid credentials. Please use levloxtech@gmail.com and password root@123 or Root@123');
    } else {
      setFormData(getContent(selectedTrainerId));
    }
  };

  const handleQuickFill = () => {
    setEmail('levloxtech@gmail.com');
    setPassword('root@123');
  };

  const handleSave = () => {
    updateContent(selectedTrainerId, formData);
    const trainerName = MEMBERS_DATA[selectedTrainerId]?.memberName || 'Trainer';
    setSaveToast(`Settings saved successfully for ${trainerName}! Landing page updated.`);
    setTimeout(() => {
      setSaveToast(null);
    }, 3500);
  };

  const handleReset = () => {
    if (window.confirm('Reset this trainer back to default factory content?')) {
      resetContent(selectedTrainerId);
      setFormData(getContent(selectedTrainerId));
      setSaveToast('Reset to default content.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Testimonial actions
  const handleDeleteTestimonial = (id: string) => {
    const updated = formData.testimonials.filter((t) => t.id !== id);
    setFormData({ ...formData, testimonials: updated });
    updateContent(selectedTrainerId, { testimonials: updated });
  };

  const handleSaveTestimonial = (testimonial: TestimonialItem) => {
    let updated: TestimonialItem[];
    if (formData.testimonials.some((t) => t.id === testimonial.id)) {
      updated = formData.testimonials.map((t) => (t.id === testimonial.id ? testimonial : t));
    } else {
      updated = [testimonial, ...formData.testimonials];
    }
    setFormData({ ...formData, testimonials: updated });
    updateContent(selectedTrainerId, { testimonials: updated });
    setEditingTestimonial(null);
    setIsAddingNewTestimonial(false);
  };

  const currentMember = MEMBERS_DATA[selectedTrainerId] || MEMBERS_DATA.mine;

  // Helper to detect video provider type
  const getVideoProviderBadge = (url: string) => {
    if (!url || !url.trim()) {
      return {
        label: 'Animated Canvas Active',
        color: 'bg-purple-50 text-purple-700 border-purple-200',
      };
    }
    const parsed = parseVideoUrl(url);
    if (parsed.type === 'gdrive') {
      return {
        label: 'Google Drive Stream Ready',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    }
    if (parsed.type === 'youtube') {
      return {
        label: 'YouTube Embed Ready',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    }
    if (parsed.type === 'direct') {
      return {
        label: 'Direct MP4 Ready',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
      };
    }
    return {
      label: 'Standard Media URL',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl font-sans text-sm font-semibold animate-bounce border border-emerald-500/50">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{saveToast}</span>
        </div>
      )}

      {!isAuthenticated ? (
        /* ================= CLEAN EDITORIAL LOGIN MODAL ================= */
        <div className="relative w-full max-w-md bg-white border border-[#E6E0F0] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(57,48,68,0.2)] text-[#393044] overflow-hidden">
          {/* Subtle lavender gradient circle */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-100/60 blur-3xl rounded-full pointer-events-none -z-10" />

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-2xl mb-3 shadow-sm">
              <img src="/levlox-logo.png" alt="Levlox" className="w-10 h-10 object-contain drop-shadow-sm" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight font-sans text-[#2D223B]">
              Levlox Admin Access
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              Sign in to manage trainer videos, workshops &amp; student testimonials.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-sans">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="levloxtech@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-bold text-sm text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Enter Admin Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Fill Pill */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <span>Auto-fill admin credentials (`levloxtech@gmail.com`)</span>
            </button>
          </div>
        </div>
      ) : (
        /* ================= CLEAN EXECUTIVE CONTROL CENTER ================= */
        <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-[#DDD5EB] shadow-[0_30px_90px_-20px_rgba(57,48,68,0.25)] bg-[#FAF9FC] text-[#393044] flex flex-col my-auto max-h-[92vh]">
          {/* Top Panel Header */}
          <div className="px-6 py-4.5 bg-white border-b border-[#E6E0F0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-100 shadow-sm">
                <img src="/levlox-logo.png" alt="Levlox" className="w-7 h-7 object-contain drop-shadow-sm" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-extrabold text-xl tracking-tight text-[#2D223B] font-sans">
                    LEVLOX Admin Hub
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Dynamic Content &amp; Media Management for Multi-Trainer Cohorts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={currentMember.route}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors border border-slate-200/80"
              >
                <span>Live Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <button
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 hover:text-slate-900 border border-slate-200/80 transition-colors flex items-center gap-1.5 font-medium"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trainer Selection Ribbon */}
          <div className="px-6 py-3 bg-[#F4F1FA] border-b border-[#E6E0F0] flex items-center gap-3 overflow-x-auto select-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Select Trainer:
            </span>
            <div className="flex items-center gap-2 p-1 bg-white border border-[#E0D7EE] rounded-2xl shadow-sm">
              {Object.values(MEMBERS_DATA).map((member) => {
                const isSelected = selectedTrainerId === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => handleTrainerChange(member.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: member.colors.dominant }}
                    />
                    <span>{member.memberName}</span>
                    {member.id === 'mine' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                      }`}>
                        Flagship
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Navigation Ribbon */}
          <div className="px-6 pt-2 bg-white border-b border-[#E6E0F0] flex gap-3 overflow-x-auto text-xs font-semibold font-sans">
            <button
              onClick={() => setActiveTab('hero')}
              className={`pb-3 pt-2 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'border-purple-600 text-purple-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Film className="w-4 h-4 text-purple-600" />
              <span>Top Hero Video</span>
            </button>

            <button
              onClick={() => setActiveTab('workshop')}
              className={`pb-3 pt-2 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'workshop'
                  ? 'border-purple-600 text-purple-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Next Workshop Live</span>
            </button>

            <button
              onClick={() => setActiveTab('previous')}
              className={`pb-3 pt-2 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'previous'
                  ? 'border-purple-600 text-purple-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Previous Workshop Recording</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`pb-3 pt-2 px-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'testimonials'
                  ? 'border-purple-600 text-purple-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Testimonials ({formData.testimonials.length})</span>
            </button>
          </div>

          {/* Main Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* ================= TAB 1: HERO VIDEO ================= */}
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-fade-in">
                {/* Information Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E3DCF0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#2D223B] flex items-center gap-2 font-sans">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Hero Masterclass Video for {currentMember.memberName}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-2xl">
                      Paste a Google Drive share link, YouTube URL, or direct MP4 link. Google Drive links
                      are converted automatically into responsive in-place streaming players without extra configuration.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                        getVideoProviderBadge(formData.heroVideoUrl).color
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{getVideoProviderBadge(formData.heroVideoUrl).label}</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[#E3DCF0] rounded-2xl p-5 shadow-sm space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[#2D223B] flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
                        <span>Google Drive Link / Video URL</span>
                      </label>
                      <span className="text-[11px] text-slate-500 font-sans">
                        Tip: In Google Drive, choose &ldquo;Anyone with link can view&rdquo;
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="url"
                        value={formData.heroVideoUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, heroVideoUrl: e.target.value })
                        }
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        className="w-full pl-4 pr-24 py-3 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-mono transition-all"
                      />
                      {formData.heroVideoUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, heroVideoUrl: '' })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-200/70 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Google Drive Video Thumbnail Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[#2D223B] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Video Thumbnail (Google Drive Link or Image URL)</span>
                      </label>
                      <span className="text-[11px] text-slate-500 font-sans">
                        Auto-converts Google Drive image links to HD cover
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="url"
                        value={formData.heroThumbnailUrl || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, heroThumbnailUrl: e.target.value })
                        }
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing or image link"
                        className="w-full pl-4 pr-24 py-3 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-mono transition-all"
                      />
                      {formData.heroThumbnailUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, heroThumbnailUrl: '' })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-200/70 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Instant Thumbnail Preview Chip if provided */}
                    {formData.heroThumbnailUrl && (
                      <div className="mt-2.5 flex items-center gap-3 p-2 bg-purple-50/70 border border-purple-100 rounded-xl">
                        <img
                          src={parseImageUrl(formData.heroThumbnailUrl)}
                          alt="Thumbnail preview"
                          className="w-16 h-10 rounded-lg object-cover border border-purple-200 shadow-xs"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-xs text-purple-800 font-medium font-sans">
                          Thumbnail detected &bull; Will display before video plays
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                        Video Duration Display (e.g. 14:28)
                      </label>
                      <input
                        type="text"
                        value={formData.heroDuration}
                        onChange={(e) =>
                          setFormData({ ...formData, heroDuration: e.target.value })
                        }
                        placeholder="14:28"
                        className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                      />
                    </div>
                  </div>

                  {/* Video Live Preview Box */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#2D223B] mb-2 flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Video Preview</span>
                    </label>

                    <div className="aspect-video w-full rounded-2xl bg-[#141525] border border-[#DDD5EB] overflow-hidden flex items-center justify-center relative shadow-lg">
                      {(() => {
                        const parsed = parseVideoUrl(formData.heroVideoUrl);
                        if (parsed.type === 'gdrive' || parsed.type === 'youtube') {
                          return (
                            <div className="relative w-full h-full">
                              <iframe
                                src={parsed.embedUrl}
                                className="w-full h-full border-0"
                                allow="autoplay; encrypted-media; fullscreen"
                                allowFullScreen
                                title="Hero Video Preview"
                              />
                              {/* Transparent Shield over Google Drive popout button */}
                              <div
                                className="absolute top-0 right-0 w-28 h-12 z-30 cursor-default"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }}
                                title=""
                              />
                            </div>
                          );
                        } else if (parsed.type === 'direct' && parsed.embedUrl) {
                          return (
                            <video
                              src={parsed.embedUrl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          );
                        }
                        return (
                          /* Refined Canvas with 100% Bright Thumbnail Preview */
                          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#18192d] via-[#121324] to-[#0c0d18] text-white">
                            {formData.heroThumbnailUrl ? (
                              <>
                                <img
                                  src={parseImageUrl(formData.heroThumbnailUrl)}
                                  alt="Cover preview"
                                  className="absolute inset-0 w-full h-full object-cover brightness-105 pointer-events-none"
                                />
                                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                              </>
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />
                            )}

                            <div
                              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-white mb-3 border border-white/30 backdrop-blur-md relative z-10"
                              style={{ backgroundColor: currentMember.colors.dominant }}
                            >
                              <Play className="w-7 h-7 fill-white translate-x-0.5" />
                            </div>

                            <h5 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight relative z-10 drop-shadow-md">
                              Levlox Masterclass Player
                            </h5>
                            <p className="text-xs text-white/90 font-sans max-w-md mt-1 leading-relaxed relative z-10 drop-shadow">
                              {formData.heroThumbnailUrl
                                ? 'Custom thumbnail active (Full Brightness). Paste your video link above to activate in-place playback.'
                                : 'Currently displaying the interactive animated visualizer. Paste your Google Drive video link above to activate full 1080P streaming playback.'}
                            </p>

                            <div className="mt-3.5 flex items-center gap-2 text-[11px] font-sans text-purple-200 bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-500/30 relative z-10">
                              <Info className="w-3.5 h-3.5 text-purple-300" />
                              <span>Google Drive link automatically embeds in 1080P HD</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: NEXT WORKSHOP ================= */}
            {activeTab === 'workshop' && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E3DCF0] shadow-sm">
                  <h4 className="text-sm font-bold text-[#2D223B] mb-1 flex items-center gap-2 font-sans">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Next Live Workshop Schedule ({currentMember.memberName})</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-sans">
                    Update the live workshop headline, project name, schedule, and registration details on Section 06.
                  </p>
                </div>

                <div className="bg-white border border-[#E3DCF0] rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Workshop Topic / Headline
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Industrial Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.projectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, projectName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, date: e.target.value },
                        })
                      }
                      placeholder="Sunday, November 22, 2026"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Time &amp; Timezone
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, time: e.target.value },
                        })
                      }
                      placeholder="8:00 PM – 10:00 PM IST"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, duration: e.target.value },
                        })
                      }
                      placeholder="2 Hours Live Architecture + Live Q&A"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Platform / Venue
                    </label>
                    <input
                      type="text"
                      value={formData.nextWorkshop.platform}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, platform: e.target.value },
                        })
                      }
                      placeholder="Live on Zoom + Code Access"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Seats Remaining
                    </label>
                    <input
                      type="number"
                      value={formData.nextWorkshop.seatsRemaining}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: {
                            ...formData.nextWorkshop,
                            seatsRemaining: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Total Capacity Seats
                    </label>
                    <input
                      type="number"
                      value={formData.nextWorkshop.totalSeats}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: {
                            ...formData.nextWorkshop,
                            totalSeats: parseInt(e.target.value, 10) || 150,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Workshop Google Drive Recording / Zoom Link
                    </label>
                    <input
                      type="url"
                      value={formData.nextWorkshop.recordingUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextWorkshop: { ...formData.nextWorkshop, recordingUrl: e.target.value },
                        })
                      }
                      placeholder="https://drive.google.com/file/d/... or Zoom Link"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 3: PREVIOUS WORKSHOP ================= */}
            {activeTab === 'previous' && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E3DCF0] shadow-sm">
                  <h4 className="text-sm font-bold text-[#2D223B] mb-1 flex items-center gap-2 font-sans">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Previous Masterclass Archive ({currentMember.memberName})</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-sans">
                    Provide a Google Drive link or video URL for the recorded archive in Section 05.
                  </p>
                </div>

                <div className="bg-white border border-[#E3DCF0] rounded-2xl p-5 shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Previous Workshop Recording Drive Link / URL
                    </label>
                    <input
                      type="url"
                      value={formData.previousWorkshop.videoUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousWorkshop: {
                            ...formData.previousWorkshop,
                            videoUrl: e.target.value,
                          },
                        })
                      }
                      placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-mono transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Session Title
                    </label>
                    <input
                      type="text"
                      value={formData.previousWorkshop.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousWorkshop: {
                            ...formData.previousWorkshop,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                      Project Topic / Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.previousWorkshop.projectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousWorkshop: {
                            ...formData.previousWorkshop,
                            projectName: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                        Duration (e.g. 1h 24m 18s)
                      </label>
                      <input
                        type="text"
                        value={formData.previousWorkshop.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            previousWorkshop: {
                              ...formData.previousWorkshop,
                              duration: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2D223B] mb-1.5">
                        Attendees Count
                      </label>
                      <input
                        type="number"
                        value={formData.previousWorkshop.attendeesCount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            previousWorkshop: {
                              ...formData.previousWorkshop,
                              attendeesCount: parseInt(e.target.value, 10) || 400,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-sans transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: TESTIMONIALS ================= */}
            {activeTab === 'testimonials' && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E3DCF0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#2D223B] mb-0.5 flex items-center gap-2 font-sans">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>Verified Testimonials for {currentMember.memberName}</span>
                    </h4>
                    <p className="text-xs text-slate-600 font-sans">
                      Add and manage student reviews, salary transitions, thumbnail portraits, and Drive video links.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingTestimonial({
                        id: `test-${Date.now()}`,
                        name: '',
                        role: 'Software Engineer → Agentic AI Architect (32 LPA)',
                        rating: 5.0,
                        feedback: '',
                        initial: 'S',
                        imageUrl:
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
                        videoDuration: '1:30',
                        hasVideo: true,
                        linkedinUrl: '',
                      });
                      setIsAddingNewTestimonial(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Testimonial</span>
                  </button>
                </div>

                {/* Testimonial List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.testimonials.map((item) => (
                    <div
                      key={item.id}
                      className="p-4.5 rounded-2xl bg-white border border-[#E3DCF0] shadow-sm flex gap-3.5 items-start relative group hover:border-purple-300 transition-all hover:shadow-md"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-200 shadow-sm"
                      />
                      <div className="flex-1 min-w-0 pr-14">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-[#2D223B] truncate font-sans">{item.name}</h5>
                          <span className="text-[11px] text-amber-500 font-semibold">★ {item.rating}</span>
                        </div>
                        <p className="text-xs text-purple-600 font-semibold truncate mt-0.5">{item.role}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 italic font-sans leading-relaxed">
                          &ldquo;{item.feedback}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-sans text-slate-500">
                          <span>⏱ {item.videoDuration}</span>
                          {item.linkedinUrl?.includes('drive.google.com') && (
                            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Drive Video Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Edit / Delete Buttons */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingTestimonial(item);
                            setIsAddingNewTestimonial(false);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                          title="Edit Testimonial"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(item.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 transition-colors"
                          title="Delete Testimonial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.testimonials.length === 0 && (
                  <div className="text-center py-10 text-slate-500 font-sans text-xs border border-dashed border-slate-300 rounded-2xl bg-white">
                    No testimonials configured yet for {currentMember.memberName}. Click &ldquo;Add New Testimonial&rdquo; above.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Fixed Action Footer */}
          <div className="px-6 py-4 bg-white border-t border-[#E6E0F0] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 font-medium flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={currentMember.route}
                onClick={() => setIsAdminModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 hover:text-slate-900 font-semibold transition-colors inline-flex items-center gap-1.5 border border-slate-200"
              >
                <span>View Live Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-bold text-xs text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / ADD TESTIMONIAL ================= */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-[#DDD5EB] rounded-3xl p-6 shadow-2xl text-[#393044] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingTestimonial(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="text-base font-bold font-sans text-[#2D223B] mb-4">
              {isAddingNewTestimonial ? 'Add New Testimonial' : 'Edit Testimonial'} —{' '}
              {currentMember.memberName}
            </h4>

            <div className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={editingTestimonial.name}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      name: e.target.value,
                      initial: e.target.value.charAt(0).toUpperCase() || 'S',
                    })
                  }
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Transition / Package Hike
                </label>
                <input
                  type="text"
                  value={editingTestimonial.role}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                  }
                  placeholder="e.g. Senior Backend Engineer → AI Architect (32 LPA)"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Review / Feedback Quote
                </label>
                <textarea
                  rows={3}
                  value={editingTestimonial.feedback}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, feedback: e.target.value })
                  }
                  placeholder="What was their outcome, hike, or breakthrough during the cohort?"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thumbnail Photo URL
                </label>
                <input
                  type="url"
                  value={editingTestimonial.imageUrl}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Testimonial Video Google Drive Link / Video URL
                </label>
                <input
                  type="url"
                  value={editingTestimonial.linkedinUrl || ''}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      linkedinUrl: e.target.value,
                    })
                  }
                  placeholder="https://drive.google.com/file/d/.../view"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.videoDuration}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        videoDuration: e.target.value,
                      })
                    }
                    placeholder="1:45"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rating (1 to 5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingTestimonial.rating}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        rating: parseFloat(e.target.value) || 5.0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF9FC] border border-[#DDD5EB] rounded-xl text-sm text-[#2D223B] focus:outline-none focus:border-purple-600 focus:bg-white font-sans text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTestimonial(editingTestimonial)}
                  className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-bold text-white shadow-md shadow-purple-500/25"
                >
                  Save Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
