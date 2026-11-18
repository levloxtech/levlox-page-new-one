export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  feedback: string;
  initial: string;
  imageUrl: string;
  videoDuration: string;
  hasVideo: boolean;
  linkedinUrl: string;
}

export const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sanjay Kumar',
    role: 'Junior Software Engineer @ Enterprise Tech',
    rating: 5.0,
    feedback: 'Learning complex Agentic workflows and capstone systems gave me the confidence to transition into enterprise AI architecture and clear senior interviews.',
    initial: 'S',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
    videoDuration: '1:12',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'test-2',
    name: 'Abdul Kalam',
    role: 'Software Engineer → Agentic AI Lead',
    rating: 5.0,
    feedback: 'Practical capstone projects and PR code auditing were the game changers. In 45 days, I went from watching tutorials to deploying multi-agent swarms.',
    initial: 'A',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
    videoDuration: '1:45',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'test-3',
    name: 'Sneha Reddy',
    role: 'AI Engineer @ Fintech Corp',
    rating: 5.0,
    feedback: 'Even with zero autonomous systems background, the structured 26-phase curriculum and live doubt clearing helped me land a top-tier Agentic AI role.',
    initial: 'S',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
    videoDuration: '0:58',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'test-4',
    name: 'Vikram Malhotra',
    role: 'Senior Backend Engineer → AI Architect',
    rating: 4.9,
    feedback: 'Excellent experience! The content was battle-tested and production-focused. No toy projects—every project was enterprise grade.',
    initial: 'V',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85',
    videoDuration: '1:24',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'test-5',
    name: 'Karthik Raman',
    role: 'Cloud Engineer → LLMOps Specialist',
    rating: 5.0,
    feedback: 'The 10 corporate systems were unlike anything online. Building deterministic tool calling and LangGraph loops gave me instant credibility at work.',
    initial: 'K',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
    videoDuration: '1:10',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'test-6',
    name: 'Pooja Krishnan',
    role: 'QA Automation Lead → Enterprise AI Architect',
    rating: 5.0,
    feedback: 'The 45-day protocol gave me the peace of mind to commit. The 2-hour daily routine after work was realistic and transformed my entire career trajectory.',
    initial: 'P',
    imageUrl: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&w=700&q=85',
    videoDuration: '1:32',
    hasVideo: true,
    linkedinUrl: 'https://linkedin.com',
  },
];
