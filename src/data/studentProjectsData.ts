export interface StudentProject {
  id: string;
  studentName: string;
  studentRole: string;
  studentAvatar: string;
  linkedinUrl: string;
  projectTitle: string;
  projectCategory: 'Multi-Agent Systems' | 'Autonomous RAG' | 'Enterprise Automation' | 'Developer Tooling';
  projectSummary: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  metrics: string;
  cohort: string;
}

export const STUDENT_PROJECTS_DATA: StudentProject[] = [
  {
    id: 'sp-01',
    studentName: 'Sanjay Kumar',
    studentRole: 'Junior Software Engineer → Enterprise AI Architect',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com/in/sanjay-kumar',
    projectTitle: 'AutoDev: Autonomous GitHub PR Auditor & Code Review Agent',
    projectCategory: 'Developer Tooling',
    projectSummary:
      'Autonomous multi-agent system built with LangGraph that listens to GitHub webhooks, parses multi-file pull requests, runs AST static analysis, evaluates test coverage, and writes inline line-by-line code review comments with suggested diff patches.',
    liveUrl: 'https://autodev-agent.vercel.app',
    githubUrl: 'https://github.com/levlox-alumni/autodev-reviewer-agent',
    techStack: ['LangGraph', 'FastAPI', 'Qdrant Vector DB', 'Docker', 'Claude 3.5 Sonnet'],
    metrics: 'Reduced PR review turnaround from 48h to 90s across 12 repositories',
    cohort: 'Cohort 03 Graduate',
  },
  {
    id: 'sp-02',
    studentName: 'Sneha Reddy',
    studentRole: 'Backend Engineer @ Fintech Corp → AI Platform Lead',
    studentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com/in/sneha-reddy',
    projectTitle: 'MedRAG: Self-Correcting Clinical Decision Support Agent',
    projectCategory: 'Autonomous RAG',
    projectSummary:
      'Enterprise medical query assistant utilizing corrective RAG (CRAG) loops. Evaluates retrieval quality against PubMed vector stores, rewrites ambiguous clinical terms, and cross-verifies drug-drug interactions before generating physician citations.',
    liveUrl: 'https://medrag-agent.vercel.app',
    githubUrl: 'https://github.com/levlox-alumni/medrag-clinical-agent',
    techStack: ['Python', 'Llama-3-70B', 'Qdrant', 'Ragas Eval', 'Streamlit Cloud'],
    metrics: '99.4% factual faithfulness score on PubMed benchmark dataset',
    cohort: 'Cohort 02 Graduate',
  },
  {
    id: 'sp-03',
    studentName: 'Vikram Malhotra',
    studentRole: 'Senior Java Dev → Principal Agentic AI Lead',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com/in/vikram-malhotra',
    projectTitle: 'FinSight: Autonomous Earnings Call & SEC Filing Intelligence',
    projectCategory: 'Multi-Agent Systems',
    projectSummary:
      'A team of 4 coordinated agents (Scraper, Quantitative Analyst, Risk Auditor, Report Compiler) that dissect quarterly 10-K/10-Q filings and audio transcripts, generating executive balance sheet summaries and sentiment trend models in 4 minutes.',
    liveUrl: 'https://finsight-agent.vercel.app',
    githubUrl: 'https://github.com/levlox-alumni/finsight-earnings-agent',
    techStack: ['LangGraph Loops', 'Unstructured.io', 'Milvus DB', 'Next.js 14', 'Tailwind'],
    metrics: 'Analyzes 200+ page SEC 10-K filings in under 240 seconds with zero hallucination',
    cohort: 'Cohort 01 Graduate',
  },
  {
    id: 'sp-04',
    studentName: 'Pooja Krishnan',
    studentRole: 'QA Automation Lead → Enterprise AI Engineer',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com/in/pooja-krishnan',
    projectTitle: 'AgenticSQL: Natural Language to Self-Healing PostgreSQL Pipeline',
    projectCategory: 'Enterprise Automation',
    projectSummary:
      'Translates complex business questions into optimized SQL queries with automated schema introspection, sandbox query execution, syntax error self-correction loops, and interactive Chart.js visualizations.',
    liveUrl: 'https://agenticsql-demo.vercel.app',
    githubUrl: 'https://github.com/levlox-alumni/agentic-sql-pipeline',
    techStack: ['PostgreSQL', 'LangChain', 'OpenAI Functions', 'React Flow', 'Docker'],
    metrics: '98.1% zero-shot query accuracy across 45-table ERP schema',
    cohort: 'Cohort 03 Graduate',
  },
  {
    id: 'sp-05',
    studentName: 'Abdul Kalam Azad',
    studentRole: 'Lead AI Architect & Program Founder',
    studentAvatar: '/levlox-logo.png',
    linkedinUrl: 'https://linkedin.com/in/abdul-kalam-azad',
    projectTitle: 'Levlox Orchestrator: Multi-Tenant Enterprise Agent Fleet',
    projectCategory: 'Multi-Agent Systems',
    projectSummary:
      'Production-grade reference blueprint demonstrating hierarchical supervisor-worker agent workflows with distributed state persistence, Redis message queuing, human-in-the-loop checkpoints, and OpenTelemetry observability.',
    liveUrl: 'https://orchestrator.levlox.tech',
    githubUrl: 'https://github.com/levlox-tech/agentic-enterprise-orchestrator',
    techStack: ['LangGraph', 'Redis', 'OpenTelemetry', 'FastAPI', 'Kubernetes'],
    metrics: 'Production blueprint powering 150+ student capstone architectures',
    cohort: 'Instructor Reference Architecture',
  },
  {
    id: 'sp-06',
    studentName: 'Karthik Iyer',
    studentRole: 'Full Stack Engineer → AI Solutions Specialist',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com/in/karthik-iyer',
    projectTitle: 'DocuVerify: Multi-Modal Legal Contract Audit & Redline Agent',
    projectCategory: 'Autonomous RAG',
    projectSummary:
      'Scans PDF contracts and scanned agreements using layout-aware OCR, vectorizes clause embeddings, checks compliance against GDPR/HIPAA playbooks, and generates standard redlined Word documents.',
    liveUrl: 'https://docuverify.vercel.app',
    githubUrl: 'https://github.com/levlox-alumni/docuverify-contract-agent',
    techStack: ['LlamaParse', 'Qdrant Cloud', 'python-docx', 'FastAPI', 'Tailwind'],
    metrics: 'Audits 50-page Master Service Agreements in 18 seconds with clause-level citations',
    cohort: 'Cohort 02 Graduate',
  },
];
