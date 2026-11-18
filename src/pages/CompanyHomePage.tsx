import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Play,
  Briefcase,
  Clock,
  Award,
  Menu,
  X,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PolicyModal } from '../components/PolicyModal';
import { submitWeb3Form } from '../utils/web3forms';

// Social Icons (Crisp, clean SVGs)
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Full-Stack, Frontend, Backend, Docker, SQL, & AI Tech Stack (Official SVG Logos)
const TECH_STACK_ITEMS = [
  {
    name: 'Python',
    role: 'Backend & Core AI',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'}>
        <path d="M11.91 0c-5.06 0-4.73 2.19-4.73 2.19l.01 2.27h4.81v.68H5.21S2 4.77 2 9.87c0 5.1 2.8 4.93 2.8 4.93h1.67v-2.33s-.09-2.8 2.76-2.8h4.74s2.66.04 2.66-2.61V4.8S16.98 0 11.91 0zm-2.6 1.4c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87z" fill="#3776AB" />
        <path d="M12.09 24c5.06 0 4.73-2.19 4.73-2.19l-.01-2.27h-4.81v-.68h6.78s3.21.37 3.21-4.73c0-5.1-2.8-4.93-2.8-4.93h-1.67v2.33s.09 2.8-2.76 2.8h-4.74s-2.66-.04-2.66 2.61v2.26s-.35 4.8 4.72 4.8zm2.6-1.4c-.48 0-.87-.39-.87-.87s.39-.87.87-.87.87.39.87.87-.39.87-.87.87z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'React',
    role: 'Frontend UI',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="none" stroke="#61DAFB" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Streamlit',
    role: 'Frontend Apps',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#FF4B4B">
        <path d="M15.42 2.37a1.69 1.69 0 0 0-1.47.88L6.89 15.02a1.69 1.69 0 0 0 .1 1.76l4.08 6.03c.53.79 1.66.86 2.29.15l9.26-10.42a1.69 1.69 0 0 0 .38-1.5L20.8 3.86a1.69 1.69 0 0 0-1.67-1.49h-3.71z" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    role: 'Backend APIs',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#05998B">
        <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm-1.07 18.667l1.07-5.334H8.4L13.07 5.333l-1.07 5.334h3.6l-4.67 8z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    role: 'DevOps & Containers',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758.913a5.412 5.412 0 00-3.376-1.558c-.114-.01-.225-.015-.333-.015-.17 0-.339.012-.505.034a.273.273 0 00-.236.257c-.15 1.547-1.077 2.308-2.483 2.308H1.674c-.534 0-.814.364-.814.778 0 3.23 1.83 5.927 4.545 7.07 1.62.68 3.518.89 5.568.618 3.82-.509 7.016-3.14 8.795-7.397.74.07 1.488-.04 2.193-.32a.19.19 0 00.007-.375z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL & SQL',
    role: 'Vector & Relational DB',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#336791">
        <path d="M12.016 0C5.38 0 .016 5.364.016 11.984c0 3.535 1.528 6.708 3.96 8.904l1.378-1.572a9.92 9.92 0 0 1-3.254-7.332c0-5.467 4.449-9.916 9.916-9.916 5.467 0 9.916 4.449 9.916 9.916a9.92 9.92 0 0 1-3.254 7.332l1.378 1.572c2.432-2.196 3.96-5.369 3.96-8.904C24.016 5.364 18.652 0 12.016 0zm-.016 4.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4zm0 2.4a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6z" />
      </svg>
    ),
  },
  {
    name: 'Agentic AI',
    role: 'Autonomous Swarms',
    icon: (props: { className?: string }) => (
      <div className={`relative flex items-center justify-center ${props.className || 'w-4 h-4'}`}>
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-violet-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600" />
      </div>
    ),
  },
  {
    name: 'Gen AI & LLMs',
    role: 'Transformers',
    icon: (props: { className?: string }) => (
      <Sparkles className={`${props.className || 'w-4 h-4'} text-amber-500`} />
    ),
  },
  {
    name: 'Machine Learning',
    role: 'Feature Engineering',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="none" stroke="#9333EA" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'Deep Learning',
    role: 'PyTorch Neural Nets',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#EE4C2C">
        <path d="M13.62 0L9.8 3.82c3.55 3.55 3.55 9.3 0 12.85l1.42 1.42c4.33-4.33 4.33-11.35 0-15.68l2.4-2.41zm-2.07 8.08a3.987 3.987 0 0 0-2.84-1.18c-1.07 0-2.07.42-2.83 1.18l3.66 3.66 2.01-3.66zm6.39-4.32l-1.42 1.42c5.12 5.12 5.12 13.41 0 18.53l1.42 1.42c5.9-5.9 5.9-15.47 0-21.37zM4.98 9.5a3.987 3.987 0 0 0-1.18 2.84c0 1.07.42 2.07 1.18 2.83l3.66-3.66-3.66-2.01z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    role: 'Fullstack & SSR',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="#000000">
        <path d="M18.665 21.978C16.808 23.255 14.502 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.314-1.343 6.314-3.515 8.485l-9.928-12.78H8.4v8.59h2.15v-5.69l8.115 10.373zM15.7 8.71h2.15v6.58H15.7V8.71z" />
      </svg>
    ),
  },
  {
    name: 'LangGraph',
    role: 'Cyclic Agent Graphs',
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className || 'w-4 h-4'} fill="none" stroke="#2563EB" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 7.5l7 7M15.5 7.5l-7 7" />
      </svg>
    ),
  },
];

// 10 Polished Gallery Showcase Cards fetched from dist/gallery
const GALLERY_ITEMS = [
  {
    cardSrc: '/gallery/card_g1.png',
    fullSrc: '/gallery/g1.png',
    title: 'Levlox Student Portal Dashboard',
    tag: 'Platform Architecture',
    url: 'levloxstudent.com/dashboard',
    description: 'Central student dashboard showing continuous course progress, active daily sprints, and instant IDE access.',
  },
  {
    cardSrc: '/gallery/card_g2.png',
    fullSrc: '/gallery/g2.png',
    title: 'Portal Access & Authentication',
    tag: 'Security & Access',
    url: 'levloxstudent.com/login',
    description: 'Secure student portal login and account provisioning with starter 3,600 academy credits.',
  },
  {
    cardSrc: '/gallery/card_g3.png',
    fullSrc: '/gallery/g3.png',
    title: 'Career Resources & Fast-Track',
    tag: 'Student Community',
    url: 'levloxstudent.com/resources',
    description: '24 enterprise interview resources, curated company challenge banks, and alumni referral pathways.',
  },
  {
    cardSrc: '/gallery/card_g4.png',
    fullSrc: '/gallery/g4.png',
    title: 'Industrial Project Experience',
    tag: 'Capstone Milestones',
    url: 'levloxstudent.com/projects',
    description: 'Hands-on delivery checkpoints audited directly by senior engineers before production merge.',
  },
  {
    cardSrc: '/gallery/card_g5.png',
    fullSrc: '/gallery/g5.png',
    title: 'Interactive Course Workspace',
    tag: 'Modular Curriculum',
    url: 'levloxstudent.com/courses',
    description: 'Full modular curriculum covering Python 3.11+, Deep Learning, and Production SQL pipelines.',
  },
  {
    cardSrc: '/gallery/card_g6.png',
    fullSrc: '/gallery/g6.png',
    title: 'Stage 01 • Python for AI Sprint',
    tag: 'Core Engineering',
    url: 'levloxstudent.com/curriculum',
    description: 'Foundational systems, AsyncIO concurrent loops, and Pydantic v2 deterministic contracts.',
  },
  {
    cardSrc: '/gallery/card_g7.png',
    fullSrc: '/gallery/g7.png',
    title: 'Live Architect Code Review',
    tag: 'PR Audits & Mentorship',
    url: 'levloxstudent.com/reviews',
    description: 'Every pull request receives line-by-line feedback from practicing enterprise architects.',
  },
  {
    cardSrc: '/gallery/card_g8.png',
    fullSrc: '/gallery/g8.png',
    title: 'Daily Attendance & Sprint Logs',
    tag: 'Engineering Telemetry',
    url: 'levloxstudent.com/telemetry',
    description: 'Comprehensive attendance tracking, sprint completion logs, and verifiable skill credentials.',
  },
  {
    cardSrc: '/gallery/card_g9.png',
    fullSrc: '/gallery/g9.png',
    title: 'ShopDesk Multi-Agent Capstone',
    tag: 'LangGraph Swarm',
    url: 'levloxstudent.com/capstone',
    description: 'Stateful LangGraph cyclic graphs, autonomous tool schemas, and sub-100ms Groq LLMOps.',
  },
  {
    cardSrc: '/gallery/card_g10.png',
    fullSrc: '/gallery/g10.png',
    title: 'Student Registration Portal',
    tag: 'Onboarding & Credits',
    url: 'levloxstudent.com/register',
    description: 'Direct student enrollment portal with starter 3,600 credits for immediate sandbox access.',
  },
];

export const CompanyHomePage: React.FC = () => {
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gallery Lightbox Modal state
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number | null>(null);

  // Keyboard navigation for gallery lightbox
  useEffect(() => {
    if (selectedGalleryIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGalleryIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedGalleryIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedGalleryIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIdx]);

  // Career Application Form state
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [careerError, setCareerError] = useState<string | null>(null);
  const [careerData, setCareerData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'AI Engineer',
    portfolio: '',
    message: '',
  });

  // Contact Form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Proof Video Modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitting(true);
    setCareerError(null);

    const result = await submitWeb3Form({
      subject: `New Career Application: ${careerData.role} - ${careerData.name}`,
      from_name: 'LevLox Careers Portal',
      'Candidate Name': careerData.name,
      'Email Address': careerData.email,
      'Phone Number': careerData.phone,
      'Applied Role': careerData.role,
      'Portfolio / Work Samples': careerData.portfolio || 'Not provided',
      'Cover Note / Background': careerData.message || 'No additional note provided.',
    });

    setCareerSubmitting(false);

    if (result.success) {
      setCareerSubmitted(true);
      setCareerData({
        name: '',
        email: '',
        phone: '',
        role: 'AI Engineer',
        portfolio: '',
        message: '',
      });
    } else {
      setCareerError(result.message || 'Submission failed. Please try again.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError(null);

    const result = await submitWeb3Form({
      subject: `New Inquiry from ${formData.name}`,
      from_name: 'LevLox Website Contact',
      'Sender Name': formData.name,
      'Email Address': formData.email,
      'Phone Number': formData.phone,
      'Message': formData.message,
    });

    setContactSubmitting(false);

    if (result.success) {
      setContactSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setContactSubmitted(false);
      }, 5000);
    } else {
      setContactError(result.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. TOP NAVIGATION BAR (Transparent Floating Overlay) */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent border-none">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          {/* Left Brand: LevLox Purple Swoosh Logo (Static Display — No Click Operation) */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 select-none cursor-default">
              <img
                src="/levlox-purple-swoosh-logo.png"
                alt="LevLox"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>

            {/* Navigation Links: Services, Career, Engineers, Gallery, Contact */}
            <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-800">
              <a href="#services" className="hover:text-black transition-colors">Services</a>
              <a href="#career" className="hover:text-black transition-colors">Career</a>
              <a href="#engineers" className="hover:text-black transition-colors">Engineers</a>
              <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact Us</a>
            </nav>
          </div>

          {/* Right Action CTAs: Try Now with 3,600 Starting Credits (Login removed) */}
          <div className="flex items-center gap-3">
            <a
              href="https://levloxstudent.com/register"
              target="_blank"
              rel="noopener noreferrer"
              title="Sign up to get the portal with 3,600 starting credits"
              className="inline-flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-black hover:bg-slate-800 text-white text-xs sm:text-sm font-bold tracking-tight transition-all hover:scale-105 active:scale-95 shadow-md group cursor-pointer"
            >
              <span>Try Now</span>
              <span className="px-2 py-0.5 rounded-full bg-[#B7F52B] text-black text-[10px] font-mono font-black tracking-tight">
                3,600 Credits
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-900 hover:text-black transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FBFBF9]/95 backdrop-blur-xl border-b border-black/10 px-5 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-900">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-black border-b border-black/5">Services</a>
              <a href="#career" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-black border-b border-black/5">Career</a>
              <a href="#engineers" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-black border-b border-black/5">Engineers</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-black border-b border-black/5">Gallery</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-1.5 hover:text-black border-b border-black/5">Contact Us</a>
            </nav>
            <div className="pt-2">
              <a
                href="https://levloxstudent.com/register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-black text-white text-xs font-bold shadow-md"
              >
                <span>Try Now</span>
                <span className="px-2 py-0.5 rounded-full bg-[#B7F52B] text-black text-[10px] font-mono font-black">
                  3,600 Credits
                </span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION — EXACT RECREATION OF UPLOADED DESIGN WITH BACKGROUND.PNG */}
      <section
        className="relative overflow-hidden bg-[#F4F4F2] bg-cover bg-center bg-no-repeat pt-28 pb-12 sm:pt-36 sm:pb-16 flex flex-col justify-between min-h-screen select-none"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        {/* Subtle top vignette for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F4F2]/50 via-transparent to-transparent pointer-events-none" />

        {/* Center Content: Headline + Subtitle + CTA */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 sm:pt-6">
          {/* Main Headline (Enhanced for Phone & Desktop Impact) */}
          <h1 className="text-[38px] min-[390px]:text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] font-black text-slate-950 tracking-[-0.03em] leading-[1.08] sm:leading-[1.05] max-w-4xl mx-auto drop-shadow-2xs">
            Bold Ideas That <br />
            Start With Vision.
          </h1>

          {/* Electric Contact Spark between the Robot Hand & Human Hand */}
          <div className="relative w-full h-12 mt-4 sm:mt-6 pointer-events-none flex items-center justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
            </span>
          </div>
        </div>

        {/* Bottom Strip: Infinite Auto-Scrolling Tech Stack Marquee */}
        <div className="relative z-10 w-full mt-10 sm:mt-20 pt-2 pb-2 overflow-hidden select-none">
          {/* Infinite Marquee Track with gradient edge masks */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee-track flex items-center gap-3.5 sm:gap-6 py-2">
              {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 sm:px-4.5 py-2.5 sm:py-2 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200/90 hover:border-violet-300 shadow-xs hover:shadow-md transition-all duration-300 shrink-0 group cursor-default"
                  >
                    <IconComponent className="w-5 h-5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="font-bold text-sm sm:text-sm text-slate-900 tracking-tight whitespace-nowrap">
                      {tech.name}
                    </span>
                    <span className="text-[10px] sm:text-[9px] font-mono font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 group-hover:bg-violet-50 group-hover:text-violet-700 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-block transition-colors">
                      {tech.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO CORE FLAGSHIP SERVICES (45-Day Agentic AI Training & Student Portal Python/ML/SQL) */}
      <section id="services" className="py-24 sm:py-28 bg-[#ECECEC] border-y border-slate-300/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 bg-white px-3.5 py-1.5 rounded-full border border-slate-300 shadow-xs">
              CORE SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-3 tracking-tight">
              Two Flagship Services. One Complete Path.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
              Choose between live hands-on cohort acceleration or full portal access to our core engineering repositories.
            </p>
          </div>

          {/* 2-Column Aesthetic Cards (Exact Porsche 911 GT3 RS Reference Proportions) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* SERVICE 1: 45-DAY AGENTIC AI TRAINING */}
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Media Showcase: High-Contrast Inset Frame */}
                <div className="rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-900 mb-4 relative group">
                  <img
                    src="/p1.png"
                    alt="Agentic AI Engineering 45-Day Training"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      FLAGSHIP COHORT
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      45 DAYS LIVE
                    </span>
                  </div>
                </div>

                {/* Micro Specification Badges (Porsche-Card Style) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>45-Day Cohort</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-700" />
                    <span>Daily Live Sprints</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-slate-700" />
                    <span>Multi-Agent Swarms</span>
                  </span>
                </div>

                {/* Title & Subtitle Hierarchy */}
                <h3 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight leading-none">
                  Training on Agentic AI
                </h3>
                <h4 className="text-lg sm:text-xl font-bold text-[#94A3B8] tracking-tight mt-1 leading-tight">
                  45-Day Industrial Accelerator
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed pt-3 font-normal">
                  45-day live accelerator to build autonomous ReAct swarms, LangGraph state machines, and Groq LLMOps with architect-audited PRs.
                </p>

                {/* Clean Porsche-Style Spec Telemetry Strip */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">45 Days</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Live Sprints</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">LangGraph</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ReAct Swarms</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">Audited PRs</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Architect Reviews</div>
                  </div>
                </div>
              </div>

              {/* Action Button: Short & Perfect */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://levloxstudent.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-[1.01] active:scale-95 group/btn cursor-pointer"
                >
                  <span>Get Portal Access</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* SERVICE 2: PORTAL ACCESS (PYTHON, ML, SQL) */}
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Media Showcase: High-Contrast Inset Frame */}
                <div className="rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-900 mb-4 relative group">
                  <img
                    src="/portal.png"
                    alt="Student Learning Portal: Python, ML, SQL"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      STUDENT REPOSITORY
                    </span>
                    <span className="text-blue-400 font-bold flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      LIFETIME ACCESS
                    </span>
                  </div>
                </div>

                {/* Micro Specification Badges (Porsche-Card Style) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Portal Access</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800">
                    Python 3.11+
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ECEEED] text-[11px] font-semibold text-slate-800">
                    Production SQL
                  </span>
                </div>

                {/* Title & Subtitle Hierarchy */}
                <h3 className="text-2xl sm:text-[28px] font-black text-slate-950 tracking-tight leading-none">
                  Portal Access &bull; Python, ML, SQL
                </h3>
                <h4 className="text-lg sm:text-xl font-bold text-[#94A3B8] tracking-tight mt-1 leading-tight">
                  Interactive Course Workspace
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed pt-3 font-normal">
                  Full portal access to modular courses in Python 3.11, Machine Learning, and Production SQL for enterprise vector pipelines.
                </p>

                {/* Clean Porsche-Style Spec Telemetry Strip */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">Python 3.11</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">AsyncIO &amp; Schemas</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">Machine Learning</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Pipelines &amp; vLLM</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-black text-slate-900">Production SQL</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">pgvector &amp; Queries</div>
                  </div>
                </div>
              </div>

              {/* Action Button: Short & Perfect */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://levloxstudent.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-[1.01] active:scale-95 group/btn cursor-pointer"
                >
                  <span>Get Portal Access</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREER SECTION — APPLICATION FORM FOR 3 ROLES */}
      <section id="career" className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-300">
              WE ARE HIRING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-3 tracking-tight">
              Join the Levlox Engineering &amp; Creative Team.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Open Roles (Clean & Minimal with No Descriptions) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                SELECT A ROLE TO APPLY
              </span>

              {/* Role 1: Digital marketing & copywriting specialist */}
              <div
                onClick={() => setCareerData({ ...careerData, role: 'Digital marketing & copywriting specialist' })}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  careerData.role === 'Digital marketing & copywriting specialist'
                    ? 'bg-black text-white border-black shadow-lg scale-[1.01]'
                    : 'bg-[#FBFBF9] border-slate-200/90 text-slate-900 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    careerData.role === 'Digital marketing & copywriting specialist' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    GROWTH &amp; CONTENT
                  </span>
                  <span className="text-xs font-semibold">Full-Time / Hybrid</span>
                </div>
                <h4 className="font-extrabold text-base mt-2.5">
                  Digital marketing &amp; copywriting specialist
                </h4>
              </div>

              {/* Role 2: AI Engineer */}
              <div
                onClick={() => setCareerData({ ...careerData, role: 'AI Engineer' })}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  careerData.role === 'AI Engineer'
                    ? 'bg-black text-white border-black shadow-lg scale-[1.01]'
                    : 'bg-[#FBFBF9] border-slate-200/90 text-slate-900 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    careerData.role === 'AI Engineer' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    CORE SYSTEMS
                  </span>
                  <span className="text-xs font-semibold">Full-Time / Remote</span>
                </div>
                <h4 className="font-extrabold text-base mt-2.5">
                  AI Engineer
                </h4>
              </div>

              {/* Role 3: Video editor */}
              <div
                onClick={() => setCareerData({ ...careerData, role: 'Video editor' })}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  careerData.role === 'Video editor'
                    ? 'bg-black text-white border-black shadow-lg scale-[1.01]'
                    : 'bg-[#FBFBF9] border-slate-200/90 text-slate-900 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    careerData.role === 'Video editor' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    CREATIVE STUDIO
                  </span>
                  <span className="text-xs font-semibold">Full-Time / Project</span>
                </div>
                <h4 className="font-extrabold text-base mt-2.5">
                  Video editor
                </h4>
              </div>
            </div>

            {/* Right Column: Direct Application Form */}
            <div className="lg:col-span-7 bg-[#FBFBF9] rounded-[32px] border border-slate-200/90 p-7 sm:p-9 shadow-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-black text-xl text-slate-950">
                    Submit Candidate Application
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submissions are routed directly to <span className="font-mono text-slate-800">levloxtech@gmail.com</span>
                  </p>
                </div>
                <Briefcase className="w-5 h-5 text-slate-800" />
              </div>

              {careerSubmitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-black text-lg text-emerald-950">Application Dispatched Successfully</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Your details have been pre-filled into your email client directed to <strong>levloxtech@gmail.com</strong>. Our engineering and talent acquisition team will review your portfolio and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setCareerSubmitted(false)}
                    className="mt-3 px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={careerData.name}
                        onChange={(e) => setCareerData({ ...careerData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Email ID *</label>
                      <input
                        type="email"
                        value={careerData.email}
                        onChange={(e) => setCareerData({ ...careerData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        value={careerData.phone}
                        onChange={(e) => setCareerData({ ...careerData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Role *</label>
                      <select
                        value={careerData.role}
                        onChange={(e) => setCareerData({ ...careerData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                      >
                        <option value="Digital marketing & copywriting specialist">
                          Digital marketing &amp; copywriting specialist
                        </option>
                        <option value="AI Engineer">
                          AI Engineer
                        </option>
                        <option value="Video editor">
                          Video editor
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio or GitHub Link */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Portfolio / GitHub / Work Samples URL</label>
                    <input
                      type="url"
                      value={careerData.portfolio}
                      onChange={(e) => setCareerData({ ...careerData, portfolio: e.target.value })}
                      placeholder="https://github.com/yourhandle or https://behance.net/..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                    />
                  </div>

                  {/* Message / Background Note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Brief Introduction or Past Experience</label>
                    <textarea
                      rows={3}
                      value={careerData.message}
                      onChange={(e) => setCareerData({ ...careerData, message: e.target.value })}
                      placeholder="Tell us about your background, tools you master, and why you want to build with Levlox..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-black font-medium"
                    />
                  </div>

                  {/* Error Notification */}
                  {careerError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                      {careerError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={careerSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.01] active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{careerSubmitting ? 'Sending Application...' : 'Submit Application Directly'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENGINEERS SECTION — 4 PORSCHE GT3 RS AESTHETIC CARDS */}
      <section id="engineers" className="py-24 sm:py-28 bg-[#ECECEC] border-b border-slate-300/80">
        {/* Anchor alias for existing #trainer links */}
        <span id="trainer" className="sr-only"></span>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 bg-white px-3.5 py-1.5 rounded-full border border-slate-300 shadow-sm">
              LEAD AI ENGINEERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mt-3 tracking-tight">
              Meet Our Engineering Architects.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every cohort sprint is personally architected and code-reviewed by practicing enterprise AI builders.
            </p>
          </div>

          {/* 4-Card Grid (Unified Height & Perfectly Proportioned) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {/* 1. ASMI */}
            <div className="bg-white rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-slate-200/90 transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                {/* Media Preview: Natural Square Crop */}
                <div className="rounded-[22px] overflow-hidden aspect-square bg-slate-900 border border-slate-100 mb-4 group/img relative">
                  <img
                    src="/asmi.jpeg"
                    alt="Asmi - Lead Agentic AI Engineer"
                    className="w-full h-full object-cover object-[center_20%] group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[22px] pointer-events-none"></div>
                </div>

                {/* Micro Specification Badges (1 Row, No Wrap) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                    <span>3+ Yrs Exp</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800">
                    Autonomous Systems
                  </span>
                </div>

                {/* Typography Hierarchy */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                  Asmi
                </h3>
                <h4 className="text-xs sm:text-sm font-bold text-[#94A3B8] tracking-tight mt-1 leading-snug">
                  Lead Agentic AI Engineer
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed pt-2.5 font-normal">
                  3+ years engineering autonomous ReAct swarms, stateful LangGraph topologies, and deterministic tool-calling schemas.
                </p>
              </div>

              {/* Instagram & Cohort Action (No LinkedIn) */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href="https://www.instagram.com/levlox.asmi?jplx=MTEzMGZiODJ5Mng3aQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-200 transition-colors text-[11px] font-semibold group/ig"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span>@levlox.asmi</span>
                </a>

                <Link
                  to="/asmi"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-tight transition-all shadow-xs group/btn shrink-0"
                >
                  <span>Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 2. HARI */}
            <div className="bg-white rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-slate-200/90 transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                {/* Media Preview: Natural Square Crop */}
                <div className="rounded-[22px] overflow-hidden aspect-square bg-slate-900 border border-slate-100 mb-4 group/img relative">
                  <img
                    src="/hari.png"
                    alt="Hari - Senior Agentic AI Engineer"
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[22px] pointer-events-none"></div>
                </div>

                {/* Micro Specification Badges (1 Row, No Wrap) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                    <span>3+ Yrs Exp</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800">
                    Groq LLMOps &amp; Swarms
                  </span>
                </div>

                {/* Typography Hierarchy */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                  Hari
                </h3>
                <h4 className="text-xs sm:text-sm font-bold text-[#94A3B8] tracking-tight mt-1 leading-snug">
                  Senior Agentic AI Engineer
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed pt-2.5 font-normal">
                  3+ years building high-throughput Groq LPU streaming inference, multi-agent protocols, and sub-100ms enterprise LLMOps.
                </p>
              </div>

              {/* Instagram & Cohort Action (No LinkedIn) */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href="https://www.instagram.com/levlox.hari?dmpr=MTdud2g1YTZxa2xmZw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-200 transition-colors text-[11px] font-semibold group/ig"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span>@levlox.hari</span>
                </a>

                <Link
                  to="/hari"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-tight transition-all shadow-xs group/btn shrink-0"
                >
                  <span>Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 3. ABDUL KALAM */}
            <div className="bg-white rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-slate-200/90 transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                {/* Media Preview: Balanced Face Crop */}
                <div className="rounded-[22px] overflow-hidden aspect-square bg-slate-900 border border-slate-100 mb-4 group/img relative">
                  <img
                    src="/kalam.JPG"
                    alt="Abdul Kalam - Intel Unnati Certified Trainer & Principal Architect"
                    className="w-full h-full object-cover object-[center_15%] group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[22px] pointer-events-none"></div>
                </div>

                {/* Micro Specification Badges (1 Row, No Wrap) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>5+ Yrs Exp</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-700" />
                    <span>Intel Unnati Certified</span>
                  </span>
                </div>

                {/* Typography Hierarchy */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                  Abdul Kalam
                </h3>
                <h4 className="text-xs sm:text-sm font-bold text-[#94A3B8] tracking-tight mt-1 leading-snug">
                  Intel Unnati Lead Architect
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed pt-2.5 font-normal">
                  Certified Intel Unnati AI Trainer with 5+ years of experience in deep neural architectures and enterprise AI deployments.
                </p>
              </div>

              {/* Instagram & Cohort Action (No LinkedIn) */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href="https://www.instagram.com/levloxacademy?avpt=bGV4emdrdHJ1MDd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-200 transition-colors text-[11px] font-semibold group/ig"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span>@levloxacademy</span>
                </a>

                <Link
                  to="/abdul"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-tight transition-all shadow-xs group/btn shrink-0"
                >
                  <span>Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 4. SATHIK */}
            <div className="bg-white rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-slate-200/90 transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                {/* Media Preview: Natural Square Crop */}
                <div className="rounded-[22px] overflow-hidden aspect-square bg-slate-900 border border-slate-100 mb-4 group/img relative">
                  <img
                    src="/sathik.png"
                    alt="Sathik - Senior Agentic AI Engineer & Cloud Architect"
                    className="w-full h-full object-cover object-[center_20%] group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[22px] pointer-events-none"></div>
                </div>

                {/* Micro Specification Badges (1 Row, No Wrap) */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                    <span>3+ Yrs Exp</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECEEED] text-[10px] font-semibold text-slate-800">
                    Vector DBs &amp; Cloud
                  </span>
                </div>

                {/* Typography Hierarchy */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                  Sathik
                </h3>
                <h4 className="text-xs sm:text-sm font-bold text-[#94A3B8] tracking-tight mt-1 leading-snug">
                  Senior Agentic AI Engineer
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed pt-2.5 font-normal">
                  3+ years deploying cloud agent backends, pgvector similarity indexing, distributed pipelines, and production guardrails.
                </p>
              </div>

              {/* Instagram & Cohort Action (No LinkedIn) */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href="https://www.instagram.com/levlox.sathik?cnvx=MXh5bXF0MTd2YzJ6bg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black border border-slate-200 transition-colors text-[11px] font-semibold group/ig"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span>@levlox.sathik</span>
                </a>

                <Link
                  to="/sathik"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-tight transition-all shadow-xs group/btn shrink-0"
                >
                  <span>Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALLERY / TESTIMONIALS SECTION — 1:1 RECREATION OF REFERENCE CANOPY DESIGN */}
      <section id="gallery" className="py-20 sm:py-28 bg-[#ECECEC] border-b border-slate-300/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main White Canvas Card */}
          <div className="bg-white rounded-[28px] sm:rounded-[44px] border border-slate-200/90 p-4 sm:p-10 lg:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
            {/* Architectural Vertical Guide Grid (Matches Reference Dotted/Dashed Tracks) */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-7 lg:grid-cols-8 pointer-events-none divide-x divide-dashed divide-slate-100/90 z-0">
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="h-full"></div>
              <div className="hidden md:block h-full"></div>
              <div className="hidden md:block h-full"></div>
              <div className="hidden md:block h-full"></div>
              <div className="hidden lg:block h-full"></div>
            </div>

            {/* Floating Proof Canopy (Desktop & Tablet Layout) */}
            <div className="relative z-10 hidden md:grid grid-cols-7 lg:grid-cols-8 gap-3 sm:gap-4 items-end mb-12 sm:mb-16">
              {/* Column 1 (Far Left) */}
              <div className="space-y-3 sm:space-y-4">
                <div
                  onClick={() => setSelectedGalleryIdx(0)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[0].title}
                >
                  <img
                    src={GALLERY_ITEMS[0].cardSrc}
                    alt={GALLERY_ITEMS[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  onClick={() => setSelectedGalleryIdx(1)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[1].title}
                >
                  <img
                    src={GALLERY_ITEMS[1].cardSrc}
                    alt={GALLERY_ITEMS[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-3 sm:space-y-4 pb-4">
                <div
                  onClick={() => setSelectedGalleryIdx(2)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[2].title}
                >
                  <img
                    src={GALLERY_ITEMS[2].cardSrc}
                    alt={GALLERY_ITEMS[2].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  onClick={() => setSelectedGalleryIdx(3)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[3].title}
                >
                  <img
                    src={GALLERY_ITEMS[3].cardSrc}
                    alt={GALLERY_ITEMS[3].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-3 sm:space-y-4 pb-8">
                <div
                  onClick={() => setSelectedGalleryIdx(4)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[4].title}
                >
                  <img
                    src={GALLERY_ITEMS[4].cardSrc}
                    alt={GALLERY_ITEMS[4].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 4 (Center Left, elevated top card creating arch) */}
              <div className="space-y-3 sm:space-y-4 pb-16">
                <div
                  onClick={() => setSelectedGalleryIdx(5)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[5].title}
                >
                  <img
                    src={GALLERY_ITEMS[5].cardSrc}
                    alt={GALLERY_ITEMS[5].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 5 (Center Right, elevated top card creating arch) */}
              <div className="space-y-3 sm:space-y-4 pb-16">
                <div
                  onClick={() => setSelectedGalleryIdx(6)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[6].title}
                >
                  <img
                    src={GALLERY_ITEMS[6].cardSrc}
                    alt={GALLERY_ITEMS[6].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 6 */}
              <div className="space-y-3 sm:space-y-4 pb-8">
                <div
                  onClick={() => setSelectedGalleryIdx(7)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[7].title}
                >
                  <img
                    src={GALLERY_ITEMS[7].cardSrc}
                    alt={GALLERY_ITEMS[7].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 7 (With 3D Perspective Tilted Card Matching Reference) */}
              <div className="space-y-3 sm:space-y-4 pb-2">
                <div
                  onClick={() => setSelectedGalleryIdx(8)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[8].title}
                >
                  <img
                    src={GALLERY_ITEMS[8].cardSrc}
                    alt={GALLERY_ITEMS[8].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* 3D Tilted Perspective Card Matching Reference */}
                <div
                  onClick={() => setSelectedGalleryIdx(9)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-[0_26px_55px_rgba(0,0,0,0.35)] border-[3px] border-white transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 group relative z-20 cursor-pointer bg-[#0D111C] ring-2 ring-slate-900/10"
                  title={GALLERY_ITEMS[9].title}
                >
                  <img
                    src={GALLERY_ITEMS[9].cardSrc}
                    alt={GALLERY_ITEMS[9].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Column 8 (Far Right on Large Screens) */}
              <div className="hidden lg:block space-y-3 sm:space-y-4">
                <div
                  onClick={() => setSelectedGalleryIdx(0)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[0].title}
                >
                  <img
                    src={GALLERY_ITEMS[0].cardSrc}
                    alt={GALLERY_ITEMS[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  onClick={() => setSelectedGalleryIdx(4)}
                  className="rounded-2xl aspect-[4/5] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 border border-slate-700/60 bg-[#0D111C] cursor-pointer group relative"
                  title={GALLERY_ITEMS[4].title}
                >
                  <img
                    src={GALLERY_ITEMS[4].cardSrc}
                    alt={GALLERY_ITEMS[4].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Continuous Photo Scroller (Clean, Touch-Friendly & Hidden Scrollbar) */}
            <div className="md:hidden mb-8">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-3 -mx-2 sm:-mx-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {GALLERY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedGalleryIdx(i)}
                    className="w-[230px] shrink-0 aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-slate-700/60 snap-center cursor-pointer group relative bg-[#0D111C] active:scale-95 transition-all duration-200 ring-1 ring-slate-900/10"
                  >
                    <img
                      src={item.cardSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Swipe Hint */}
              <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono text-slate-400 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse"></span>
                <span>Swipe to explore all 10 verified modules &bull; Tap to expand</span>
              </div>
            </div>

            {/* Central Typography & Action (Exact Match to Reference Text & Style) */}
            <div className="relative z-10 text-center max-w-2xl mx-auto pt-2 sm:pt-4">
              {/* Testimonials Micro Pill */}
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 mb-4 sm:mb-5">
                <span>Testimonials</span>
              </div>

              {/* Bold Title Hierarchy */}
              <h3 className="text-2xl sm:text-4xl lg:text-[54px] font-black text-slate-950 tracking-tight leading-tight">
                Trusted by leaders
              </h3>
              <h4 className="text-2xl sm:text-4xl lg:text-[54px] font-bold text-[#94A3B8] tracking-tight leading-tight mt-1">
                from various industries
              </h4>

              {/* Supporting Subtitle */}
              <p className="text-xs sm:text-base text-slate-600 mt-3 sm:mt-4 max-w-lg mx-auto leading-relaxed font-normal px-2">
                Learn why professionals trust our solutions to complete their customer journeys.
              </p>

              {/* CTA Action Button */}
              <div className="mt-6 sm:mt-10">
                <button
                  onClick={() => setSelectedGalleryIdx(0)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Read Success Stories</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US SECTION */}
      <section id="contact" className="py-20 bg-[#FBFBF9] border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 bg-white px-3.5 py-1.5 rounded-full border border-slate-300">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                Connect with Levlox Tech.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you want to apply for a role, ask about our 45-day Agentic AI accelerator, or discuss enterprise partnerships, our leadership team is ready to talk.
              </p>

              <div className="space-y-4 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">EMAIL US</span>
                    <a href="mailto:sales@levlox.in" className="font-bold text-sm text-slate-950 hover:underline block">
                      sales@levlox.in
                    </a>
                    <a href="mailto:levloxtech@gmail.com" className="text-xs text-slate-600 hover:underline">
                      levloxtech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">SUPPORT</span>
                    <span className="font-bold text-xs text-slate-950">Live chat &bull; Mon–Sat, 9AM–8PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-2xs mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">HEADQUARTERS</span>
                    <span className="font-bold text-sm text-slate-950 block leading-snug">
                      L-2-1754-A, 120 feet road,<br />Anna Nagar, Trichy, Tamil Nadu 620026
                    </span>
                    <a
                      href="https://maps.google.com/?q=L-2-1754-A,+120+feet+road,+Anna+Nagar,+Trichy,+Tamil+Nadu+620026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 mt-1 hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Company Social Channels */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-mono text-slate-500 block mb-2">OFFICIAL COMPANY CHANNELS</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://instagram.com/levloxtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/company/levloxtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/levloxtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100 transition-colors shadow-2xs"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-lg text-slate-950 mb-1">
                Send a Message or Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Our founders review every candidate inquiry within 24 hours.
              </p>

              {contactSubmitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base text-emerald-950">Inquiry Received Successfully</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you! A member from Levlox Tech will review your submission and reach out via email/phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        required
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        required
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals or questions..."
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  {contactError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                      {contactError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold text-xs shadow-md transition-all hover:scale-[1.01] cursor-pointer disabled:cursor-not-allowed"
                  >
                    {contactSubmitting ? 'Sending Message...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLEAN MINIMALIST FOOTER */}
      <footer className="bg-white text-slate-600 pt-14 pb-10 border-t border-slate-200 select-none text-xs">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-200">
            {/* Col 1: Levlox Tech Brand */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/levlox-purple-swoosh-logo.png"
                  alt="LevLox"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Empowering senior software engineers and enterprises to engineer, evaluate, and scale autonomous multi-agent AI systems.
              </p>

              <div className="text-xs text-slate-600 font-mono space-y-1">
                <div><strong>Headquarters:</strong> L-2-1754-A, 120 feet road, Anna Nagar, Trichy, Tamil Nadu 620026</div>
                <div><strong>Email:</strong> <a href="mailto:sales@levlox.in" className="text-black hover:underline font-bold">sales@levlox.in</a> &bull; <a href="mailto:levloxtech@gmail.com" className="text-black hover:underline">levloxtech@gmail.com</a></div>
                <div><strong>Support:</strong> Live chat &bull; Mon–Sat, 9AM–8PM IST</div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-2">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider block mb-2">EXPLORE LEVLOX</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li><a href="#services" className="hover:text-black transition-colors">Core Services</a></li>
                <li><a href="#career" className="hover:text-black transition-colors">Careers (3 Openings)</a></li>
                <li><a href="#engineers" className="hover:text-black transition-colors">Engineers & Leads</a></li>
                <li><a href="#gallery" className="hover:text-black transition-colors">Industrial Gallery</a></li>
                <li><a href="#contact" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="https://levloxstudent.com/register" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors text-black font-bold">Student Portal Register &rarr;</a></li>
              </ul>
            </div>

            {/* Col 3: Lead Architect Portals */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider block mb-2">ARCHITECT PORTALS</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li><Link to="/asmi" className="hover:text-black transition-colors flex items-center justify-between"><span>Asmi Cohort (Luxury Edition)</span><span className="font-mono text-[10px] text-slate-500">/asmi &rarr;</span></Link></li>
                <li><Link to="/abdul" className="hover:text-black transition-colors flex items-center justify-between"><span>Abdul Kalam Azad Cohort</span><span className="font-mono text-[10px] text-slate-500">/abdul &rarr;</span></Link></li>
                <li><Link to="/hari" className="hover:text-black transition-colors flex items-center justify-between"><span>Hari Cohort (Groq & LLMOps)</span><span className="font-mono text-[10px] text-slate-500">/hari &rarr;</span></Link></li>
                <li><Link to="/sudhan" className="hover:text-black transition-colors flex items-center justify-between"><span>Sudhan Cohort (Infrastructure)</span><span className="font-mono text-[10px] text-slate-500">/sudhan &rarr;</span></Link></li>
                <li><Link to="/sathik" className="hover:text-black transition-colors flex items-center justify-between"><span>Sathik Cohort (Enterprise)</span><span className="font-mono text-[10px] text-slate-500">/sathik &rarr;</span></Link></li>
              </ul>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; 2026 Levlox Technologies Pvt Ltd. All rights reserved.
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button onClick={() => setPolicyModalType('privacy')} className="hover:text-black transition-colors">Privacy Policy</button>
              <span>&bull;</span>
              <button onClick={() => setPolicyModalType('terms')} className="hover:text-black transition-colors">Terms of Service</button>
              <span>&bull;</span>
              <button onClick={() => setPolicyModalType('contact')} className="hover:text-black transition-colors">Refund Policy</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Gallery Lightbox Modal */}
      {selectedGalleryIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fade-in select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedGalleryIdx(null);
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto text-white pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200">
                {selectedGalleryIdx + 1} / {GALLERY_ITEMS.length}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
                  {GALLERY_ITEMS[selectedGalleryIdx].title}
                </h4>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {GALLERY_ITEMS[selectedGalleryIdx].tag}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://levloxstudent.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold inline-flex items-center gap-1 transition-all"
              >
                <span>Get Portal Access</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedGalleryIdx(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Display + Prev / Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-4 max-w-6xl w-full mx-auto overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={() => setSelectedGalleryIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))}
              className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* High-Resolution Screenshot */}
            <div className="relative max-h-[70vh] max-w-full flex flex-col items-center justify-center">
              <img
                src={GALLERY_ITEMS[selectedGalleryIdx].fullSrc}
                alt={GALLERY_ITEMS[selectedGalleryIdx].title}
                className="max-h-[66vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/15 bg-slate-950"
              />
              <p className="text-xs text-slate-300 mt-2.5 text-center max-w-2xl px-4 line-clamp-2">
                {GALLERY_ITEMS[selectedGalleryIdx].description}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setSelectedGalleryIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null))}
              className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="w-full max-w-5xl mx-auto pt-2 shrink-0">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
              {GALLERY_ITEMS.map((item, idx) => {
                const isActive = idx === selectedGalleryIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`relative w-12 sm:w-16 aspect-[4/3] rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 opacity-100'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                    title={item.title}
                  >
                    <img src={item.cardSrc} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Proof Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0D18] rounded-3xl border border-white/20 p-6 max-w-3xl w-full text-white space-y-4 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-bold text-sm text-white">
                Masterclass Recording &bull; 100k Req/min RAG Architecture
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/10"
              >
                Close &times;
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl flex items-center justify-center border border-white/10 text-center p-6">
              <div>
                <Play className="w-12 h-12 text-white mx-auto mb-3 animate-pulse" />
                <h4 className="font-bold text-base text-white">Full Video Stream Preview</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  To view the complete uncompressed 1-hour 24-minute masterclass video recording, enter Asmi&rsquo;s portal.
                </p>
                <div className="pt-4">
                  <Link
                    to="/asmi"
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs inline-flex items-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    <span>Watch In-Place Video in Cohort &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <PolicyModal type={policyModalType} onClose={() => setPolicyModalType(null)} />
    </div>
  );
};

export default CompanyHomePage;
