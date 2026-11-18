export interface WorkshopDetails {
  id: string;
  title: string;
  projectName: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  seatsRemaining: number;
  totalSeats: number;
  tags?: string[];
}

export const DEFAULT_WORKSHOP: WorkshopDetails = {
  id: 'ws-upcoming-01',
  title: 'Building Autonomous Multi-Agent Workflows in Production',
  projectName: 'Enterprise Self-Correcting RAG Agent with LangGraph',
  instructor: 'Abdul Kalam Azad',
  date: 'Sunday, November 22, 2026',
  time: '8:00 PM – 10:00 PM IST',
  duration: '2 Hours Live Architecture + Live Q&A',
  platform: 'Live on Zoom + Code Access',
  seatsRemaining: 24,
  totalSeats: 150,
  tags: ['LangGraph Loops', 'Qdrant Vector DB', 'PR Code Auditing', 'Production Boilerplate'],
};
