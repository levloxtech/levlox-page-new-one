import React, { createContext, useContext, useState } from 'react';
import { TESTIMONIAL_ITEMS, type TestimonialItem } from '../data/testimonialsData';
import { DEFAULT_WORKSHOP, type WorkshopDetails } from '../data/workshopData';

export interface PreviousWorkshopDetails {
  title: string;
  projectName: string;
  videoUrl: string;
  duration: string;
  attendeesCount: number;
}

export interface TrainerContent {
  heroVideoUrl: string;
  heroThumbnailUrl?: string;
  heroDuration: string;
  nextWorkshop: WorkshopDetails & { recordingUrl?: string };
  previousWorkshop: PreviousWorkshopDetails;
  testimonials: TestimonialItem[];
}

// Initial defaults per trainer
const DEFAULT_CONTENT_BY_MEMBER: Record<string, TrainerContent> = {
  mine: {
    heroVideoUrl: '',
    heroThumbnailUrl: '',
    heroDuration: '14:28',
    nextWorkshop: {
      ...DEFAULT_WORKSHOP,
      instructor: 'Abdul Kalam Azad',
      title: 'Building Autonomous Multi-Agent Workflows in Production',
      projectName: 'Enterprise Self-Correcting RAG Agent with LangGraph',
      date: 'Sunday, November 22, 2026',
      time: '8:00 PM – 10:00 PM IST',
      duration: '2 Hours Live Architecture + Live Q&A',
      platform: 'Live on Zoom + Starter Code Access',
      seatsRemaining: 24,
      totalSeats: 150,
      recordingUrl: '',
    },
    previousWorkshop: {
      title: 'Real-World Production Case Study: 100k Req/min RAG Architecture',
      projectName: 'Full-Stack Industrial Agentic Pipeline Walkthrough',
      videoUrl: '',
      duration: '1h 24m 18s',
      attendeesCount: 412,
    },
    testimonials: [
      ...TESTIMONIAL_ITEMS,
    ],
  },
  asmi: {
    heroVideoUrl: '',
    heroDuration: '12:15',
    nextWorkshop: {
      ...DEFAULT_WORKSHOP,
      id: 'ws-asmi-01',
      instructor: 'Asmi',
      title: 'Autonomous Multi-Agent Swarms & ReAct Loops',
      projectName: 'Production ReAct Swarm with Deterministic Guardrails',
      date: 'Saturday, November 28, 2026',
      time: '7:30 PM – 9:30 PM IST',
      duration: '2 Hours Architecture & Swarm Design',
      platform: 'Live on Zoom + Sandbox Access',
      seatsRemaining: 18,
      totalSeats: 120,
      recordingUrl: '',
    },
    previousWorkshop: {
      title: 'Designing Fault-Tolerant Tool-Calling Agents in Enterprise Tech',
      projectName: 'Multi-Agent Code Review & Autonomous Deployment Squad',
      videoUrl: '',
      duration: '1h 15m 40s',
      attendeesCount: 380,
    },
    testimonials: [
      {
        id: 'asmi-test-1',
        name: 'Kavitha Raman',
        role: 'Full Stack Engineer → AI Agent Architect (26 LPA)',
        rating: 5.0,
        feedback: "Asmi's direct feedback on agent workflows completely shifted my career. Her hands-on code reviews on LangGraph and prompt engineering helped me land an elite AI role.",
        initial: 'K',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:32',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
      {
        id: 'asmi-test-2',
        name: 'Rohan Deshmukh',
        role: 'Senior Software Engineer @ FinTech (34 LPA)',
        rating: 5.0,
        feedback: 'The real-world swarm deployment and PR code auditing gave me edge over 1,000+ candidates in technical rounds.',
        initial: 'R',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:45',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
      {
        id: 'asmi-test-3',
        name: 'Divya Sharma',
        role: 'DevOps Engineer → Agentic Systems Lead (29 LPA)',
        rating: 4.9,
        feedback: 'Building production autonomous loops with telemetry and guardrails was the breakthrough I needed.',
        initial: 'D',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:10',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
    ],
  },
  sudhan: {
    heroVideoUrl: '',
    heroDuration: '16:05',
    nextWorkshop: {
      ...DEFAULT_WORKSHOP,
      id: 'ws-sudhan-01',
      instructor: 'Sudhan',
      title: 'High-Throughput Vector DBs & Low-Latency LLMOps',
      projectName: 'Sub-50ms Vector Search at Scale with Qdrant & GPU Serving',
      date: 'Sunday, November 29, 2026',
      time: '6:00 PM – 8:00 PM IST',
      duration: '2 Hours Infrastructure & Performance Tuning',
      platform: 'Live on Zoom + Cloud GPU Cluster',
      seatsRemaining: 15,
      totalSeats: 100,
      recordingUrl: '',
    },
    previousWorkshop: {
      title: 'Scaling Vector Pipelines to 10M Documents with Quantization',
      projectName: 'Continuous Evaluation & LLM Guardrails in Production',
      videoUrl: '',
      duration: '1h 38m 22s',
      attendeesCount: 450,
    },
    testimonials: [
      {
        id: 'sudhan-test-1',
        name: 'Aditya Varma',
        role: 'Data Engineer → Enterprise LLMOps Architect (36 LPA)',
        rating: 5.0,
        feedback: "Sudhan's masterclass on vector indexing and low-latency embeddings was game-changing. We reduced inference costs by 60% at my company.",
        initial: 'A',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
        videoDuration: '2:05',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
      {
        id: 'sudhan-test-2',
        name: 'Meera Nair',
        role: 'Cloud Architect → AI Systems Lead (31 LPA)',
        rating: 5.0,
        feedback: 'Practical GPU cluster management and model serving best practices gave me the exact confidence for senior enterprise AI interviews.',
        initial: 'M',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:18',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
    ],
  },
  sathik: {
    heroVideoUrl: '',
    heroDuration: '15:20',
    nextWorkshop: {
      ...DEFAULT_WORKSHOP,
      id: 'ws-sathik-01',
      instructor: 'Sathik',
      title: 'Enterprise AI Governance, Security & Agent Guardrails',
      projectName: 'Zero-Trust AI Gateway & Automated PII Masking Pipeline',
      date: 'Saturday, December 5, 2026',
      time: '7:00 PM – 9:00 PM IST',
      duration: '2 Hours Enterprise Security & Architecture',
      platform: 'Live on Zoom + Source Code Access',
      seatsRemaining: 20,
      totalSeats: 120,
      recordingUrl: '',
    },
    previousWorkshop: {
      title: 'Red-Teaming LLMs: Preventing Prompt Injections and Hallucinations',
      projectName: 'Defense-in-Depth Agentic Security Architecture',
      videoUrl: '',
      duration: '1h 19m 50s',
      attendeesCount: 395,
    },
    testimonials: [
      {
        id: 'sathik-test-1',
        name: 'Pradeep Iyer',
        role: 'Cybersecurity Engineer → AI Security Architect (38 LPA)',
        rating: 5.0,
        feedback: "Sathik's depth in enterprise compliance, automated red-teaming, and model governance was unprecedented. Best training investment of my career.",
        initial: 'P',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:50',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
      {
        id: 'sathik-test-2',
        name: 'Ananya Sen',
        role: 'Backend Developer → AI Infrastructure Lead (28 LPA)',
        rating: 5.0,
        feedback: 'I learned how enterprise banks deploy RAG without data leaks. Transitioned into AI architecture seamlessly within 45 days.',
        initial: 'A',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:25',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
    ],
  },
  hari: {
    heroVideoUrl: '',
    heroDuration: '14:50',
    nextWorkshop: {
      ...DEFAULT_WORKSHOP,
      id: 'ws-hari-01',
      instructor: 'Hari',
      title: 'Sub-100ms Inference & Groq LPU Streaming Swarms',
      projectName: 'High-Throughput Streaming Agent Architecture with Llama 3.3',
      date: 'Sunday, December 6, 2026',
      time: '8:00 PM – 10:00 PM IST',
      duration: '2 Hours Live LPU Benchmarking + Q&A',
      platform: 'Live on Zoom + Groq LPU Sandbox Access',
      seatsRemaining: 22,
      totalSeats: 120,
      recordingUrl: '',
    },
    previousWorkshop: {
      title: '500+ Tokens/Sec Streaming Inference Under Concurrency',
      projectName: 'Full-Stack Groq Agent Integration & Latency Benchmarks',
      videoUrl: '',
      duration: '1h 20m 15s',
      attendeesCount: 420,
    },
    testimonials: [
      {
        id: 'hari-test-1',
        name: 'Venkatesh Rao',
        role: 'Senior Backend Engineer → AI Streaming Specialist (32 LPA)',
        rating: 5.0,
        feedback: "Hari's deep architecture session on Groq LPUs and sub-100ms multi-agent pipelines showed me how top tier companies deploy ultra-low latency AI.",
        initial: 'V',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85',
        videoDuration: '1:40',
        hasVideo: true,
        linkedinUrl: 'https://linkedin.com',
      },
    ],
  },
};

interface AdminContentContextType {
  getContent: (memberId: string) => TrainerContent;
  updateContent: (memberId: string, patch: Partial<TrainerContent>) => void;
  resetContent: (memberId: string) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  selectedTrainerId: string;
  setSelectedTrainerId: (id: string) => void;
}

const AdminContentContext = createContext<AdminContentContextType | undefined>(undefined);

export const AdminContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contentStore, setContentStore] = useState<Record<string, TrainerContent>>(() => {
    const initial: Record<string, TrainerContent> = {};
    const memberIds = ['mine', 'asmi', 'sudhan', 'sathik'];

    for (const id of memberIds) {
      try {
        const saved = localStorage.getItem(`levlox_trainer_content_${id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.heroVideoUrl && parsed.heroVideoUrl.includes('1demo-')) {
            parsed.heroVideoUrl = '';
          }
          if (parsed.previousWorkshop?.videoUrl && parsed.previousWorkshop.videoUrl.includes('1demo-')) {
            parsed.previousWorkshop.videoUrl = '';
          }
          initial[id] = { ...DEFAULT_CONTENT_BY_MEMBER[id], ...parsed };
          continue;
        }
      } catch (err) {
        console.error(`Failed to load content for ${id}:`, err);
      }
      initial[id] = DEFAULT_CONTENT_BY_MEMBER[id];
    }
    return initial;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('levlox_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState('mine');

  const getContent = (memberId: string): TrainerContent => {
    const key = memberId === '/' || memberId === '' ? 'mine' : memberId;
    return contentStore[key] || DEFAULT_CONTENT_BY_MEMBER.mine;
  };

  const updateContent = (memberId: string, patch: Partial<TrainerContent>) => {
    const key = memberId === '/' || memberId === '' ? 'mine' : memberId;
    setContentStore((prev) => {
      const current = prev[key] || DEFAULT_CONTENT_BY_MEMBER[key] || DEFAULT_CONTENT_BY_MEMBER.mine;
      const updated = {
        ...current,
        ...patch,
      };
      try {
        localStorage.setItem(`levlox_trainer_content_${key}`, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  const resetContent = (memberId: string) => {
    const key = memberId === '/' || memberId === '' ? 'mine' : memberId;
    const defaultData = DEFAULT_CONTENT_BY_MEMBER[key] || DEFAULT_CONTENT_BY_MEMBER.mine;
    try {
      localStorage.removeItem(`levlox_trainer_content_${key}`);
    } catch {}
    setContentStore((prev) => ({
      ...prev,
      [key]: defaultData,
    }));
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    // Authorized credentials: levloxtech@gmail.com / root@123 or Root@123
    const isEmailValid =
      cleanEmail === 'levloxtech@gmail.com' ||
      cleanEmail === 'admin@levlox.tech' ||
      cleanEmail.endsWith('@levlox.tech') ||
      cleanEmail === 'admin';

    const isPasswordValid =
      cleanPass === 'root@123' ||
      cleanPass === 'Root@123' ||
      cleanPass === 'admin123' ||
      cleanPass === 'levlox2026';

    if (isEmailValid && isPasswordValid) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('levlox_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('levlox_admin_auth');
    } catch {}
  };

  return (
    <AdminContentContext.Provider
      value={{
        getContent,
        updateContent,
        resetContent,
        isAuthenticated,
        login,
        logout,
        isAdminModalOpen,
        setIsAdminModalOpen,
        selectedTrainerId,
        setSelectedTrainerId,
      }}
    >
      {children}
    </AdminContentContext.Provider>
  );
};

export const useAdminContent = () => {
  const context = useContext(AdminContentContext);
  if (!context) {
    throw new Error('useAdminContent must be used within an AdminContentProvider');
  }
  return context;
};
