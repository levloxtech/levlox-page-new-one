export interface MemberTheme {
  id: 'mine' | 'asmi' | 'sudhan' | 'sathik';
  route: string;
  memberName: string;
  memberRole: string;
  memberBio: string;
  badge: string;
  paletteName: string;
  personality: string;
  colors: {
    dominant: string;       // Primary accent / CTA
    background: string;     // Main page background
    typography: string;     // Heading & primary text
    supporting: string;     // Border, pills, secondary cards
    surface: string;        // Card surface background
    surfaceMuted: string;   // Secondary element background
    textMuted: string;      // Body/secondary text
    glow: string;           // Radial ambient glow
    dominantHover: string;  // Button hover state
    contrastBg: string;     // In-between dark section background
    contrastSurface: string;// Card surface inside in-between dark section
    contrastText: string;   // Text inside in-between dark section
    contrastTextMuted: string;
    contrastBorder: string;
  };
}

export const MEMBERS_DATA: Record<string, MemberTheme> = {
  mine: {
    id: 'mine',
    route: '/abdul',
    memberName: 'Abdul Kalam Azad',
    memberRole: 'Lead AI Architect & Founder',
    memberBio: 'Transforming senior software engineers and IT professionals into top 5% autonomous systems builders through hands-on industrial automation.',
    badge: 'FLAGSHIP ACCELERATOR • CHIEF ARCHITECT EDITION',
    paletteName: '01. Lavender × Soft Neutrals',
    personality: 'Elegant, creative, futuristic and premium.',
    colors: {
      dominant: '#A78BFA',       // Lavender
      background: '#F5F2FA',     // Lavender White
      typography: '#393044',     // Deep Plum
      supporting: '#DDD5EB',     // Muted Lilac
      surface: '#FFFFFF',
      surfaceMuted: '#EFEBF6',
      textMuted: '#5E546C',
      glow: 'rgba(167, 139, 250, 0.25)',
      dominantHover: '#8B5CF6',
      contrastBg: '#393044',     // Deep Plum for in-between contrast sections
      contrastSurface: '#2E2638',
      contrastText: '#FFFFFF',
      contrastTextMuted: '#D8CFE5',
      contrastBorder: 'rgba(221, 213, 235, 0.25)',
    },
  },
  asmi: {
    id: 'asmi',
    route: '/asmi',
    memberName: 'Asmi',
    memberRole: 'Lead Autonomous Systems & AI Architecture Engineer',
    memberBio: 'Specializing in enterprise ReAct workflows, multi-agent swarms, and deterministic tool-calling pipelines for mission-critical deployments.',
    badge: 'ASMI EDITION • INDUSTRIAL AI MENTORSHIP',
    paletteName: '02. Berry Wine × Dusty Rose',
    personality: 'Sophisticated, editorial, modern luxury and bold.',
    colors: {
      dominant: '#953F62',       // Rich Berry Wine (Swatch 1)
      background: '#FAF6F7',     // Pale Rose White (Swatch 3)
      typography: '#301A24',     // Deep Velvet Plum Espresso
      supporting: '#E7CFD8',     // Soft Dusty Rose Border (Swatch 2 tint)
      surface: '#FFFFFF',        // Pure White Card Surface
      surfaceMuted: '#F4E7ED',   // Subtle Rose Tinted Surface
      textMuted: '#6A4F5D',      // Muted Warm Plum Slate
      glow: 'rgba(149, 63, 98, 0.22)',
      dominantHover: '#7E3251',  // Deep Velvet Burgundy
      contrastBg: '#301A24',     // Deep Velvet Plum for in-between contrast sections
      contrastSurface: '#422633',
      contrastText: '#FFFFFF',
      contrastTextMuted: '#E5D0DA',
      contrastBorder: 'rgba(217, 159, 181, 0.25)',
    },
  },
  sudhan: {
    id: 'sudhan',
    route: '/sudhan',
    memberName: 'Sudhan',
    memberRole: 'Enterprise LLMOps & Infrastructure Architect',
    memberBio: 'Focusing on high-throughput vector retrieval, low-latency GPU serving, and continuous evaluation for large-scale enterprise models.',
    badge: 'SUDHAN EDITION • ENTERPRISE LLMOPS TRACK',
    paletteName: '03. Klein Blue × Cool Minerals',
    personality: 'Intelligent, precise, modern and technological.',
    colors: {
      dominant: '#273BE2',       // Klein Blue
      background: '#E8EDF5',     // Powder Blue
      typography: '#293B59',     // Deep Navy
      supporting: '#BAC8DB',     // Mineral Blue
      surface: '#FFFFFF',
      surfaceMuted: '#DCE4F0',
      textMuted: '#4F617E',
      glow: 'rgba(39, 59, 226, 0.25)',
      dominantHover: '#1B2CBE',
      contrastBg: '#293B59',     // Deep Navy for in-between contrast sections
      contrastSurface: '#1E2D45',
      contrastText: '#FFFFFF',
      contrastTextMuted: '#CFD9E8',
      contrastBorder: 'rgba(186, 200, 219, 0.25)',
    },
  },
  sathik: {
    id: 'sathik',
    route: '/sathik',
    memberName: 'Sathik',
    memberRole: 'Industrial Multi-Agent Systems Specialist',
    memberBio: 'Directing real-world corporate project execution, code review standards, and autonomous pipeline deployments for working professionals.',
    badge: 'SATHIK EDITION • INDUSTRIAL MULTI-AGENT TRACK',
    paletteName: '04. Cherry Red × Muted Rose',
    personality: 'Luxurious, confident, distinctive and editorial.',
    colors: {
      dominant: '#C51D3A',       // Cherry Red
      background: '#F3E6E5',     // Soft Rose
      typography: '#512F38',     // Deep Wine
      supporting: '#D5B5B8',     // Dusty Rose
      surface: '#FFFFFF',
      surfaceMuted: '#EAD9D9',
      textMuted: '#764F59',
      glow: 'rgba(197, 29, 58, 0.25)',
      dominantHover: '#A8142E',
      contrastBg: '#512F38',     // Deep Wine for in-between contrast sections
      contrastSurface: '#3F222A',
      contrastText: '#FFFFFF',
      contrastTextMuted: '#E6D3D5',
      contrastBorder: 'rgba(213, 181, 184, 0.25)',
    },
  },
};
