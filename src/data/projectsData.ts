export interface CorporateProject {
  id: string;
  projectNumber: string;
  title: string;
  industry: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  image: string;
  architectureBadge: string;
}

export const CORPORATE_PROJECTS: CorporateProject[] = [
  {
    id: 'proj-01',
    projectNumber: 'PROJECT 01',
    title: 'Customer Churn Prediction',
    industry: 'FinTech / SaaS',
    description: 'Industrial ML pipeline predicting enterprise customer churn with feature engineering, automated drift detection, and automated retention agent triggers.',
    deliverables: ['Scikit-Learn/XGBoost prediction engine', 'FastAPI prediction microservice', 'SHAP feature importance report'],
    techStack: ['Python', 'XGBoost', 'FastAPI', 'Pandas', 'Docker'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Real-Time Inference Pipeline',
  },
  {
    id: 'proj-02',
    projectNumber: 'PROJECT 02',
    title: 'Image Classification',
    industry: 'Industrial Quality Assurance',
    description: 'High-throughput computer vision pipeline for automated defect detection on manufacturing assembly lines with real-time alerting.',
    deliverables: ['PyTorch vision classifier with transfer learning', 'Inference latency optimization under 15ms', 'Real-time telemetry and defect logging'],
    techStack: ['PyTorch', 'TorchVision', 'OpenCV', 'CUDA', 'ONNX'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'TensorRT / CUDA Edge Pipeline',
  },
  {
    id: 'proj-03',
    projectNumber: 'PROJECT 03',
    title: 'Resume Screening System',
    industry: 'Enterprise HR Tech',
    description: 'Autonomous parsing and semantic skill matching system comparing candidate CVs against enterprise role descriptions without bias.',
    deliverables: ['Semantic similarity scoring engine', 'Structured Pydantic skill extraction', 'Automated interview shortlisting pipeline'],
    techStack: ['Instructor', 'Sentence-Transformers', 'FastAPI', 'Qdrant'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Vector Embedding Matcher',
  },
  {
    id: 'proj-04',
    projectNumber: 'PROJECT 04',
    title: 'AI Business Assistant',
    industry: 'Executive Operations',
    description: 'Autonomous corporate agent integrated with calendar, email, and task management systems to summarize, draft, and schedule executive actions.',
    deliverables: ['Tool-calling agent with external API authorization', 'Deterministic calendar slot negotiation', 'Audit trail for executive actions'],
    techStack: ['LangGraph', 'GPT-4o', 'OAuth2', 'Pydantic', 'Redis'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'LangGraph Cyclic Actor Loop',
  },
  {
    id: 'proj-05',
    projectNumber: 'PROJECT 05',
    title: 'Enterprise Semantic Search',
    industry: 'Knowledge Management',
    description: 'Hybrid search platform indexing millions of internal corporate documents, confluence wikis, and tickets with millisecond latency.',
    deliverables: ['Dense + BM25 hybrid search pipeline', 'Dynamic metadata filtering & multi-tenant isolation', 'Cohere cross-encoder reranking layer'],
    techStack: ['Qdrant', 'Cohere Rerank', 'FastAPI', 'FastEmbed'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Hybrid Dense + BM25 Qdrant',
  },
  {
    id: 'proj-06',
    projectNumber: 'PROJECT 06',
    title: 'Corporate RAG Chatbot',
    industry: 'Internal Enterprise Helpdesk',
    description: 'Production-grade conversational RAG system with hallucination guardrails, source attribution citations, and query decomposition.',
    deliverables: ['Contextual compression & semantic chunking', 'Faithfulness and latency verification suite', 'Enterprise SSO & role-based document access'],
    techStack: ['LangChain', 'Qdrant', 'Ragas', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Self-Correcting CRAG Swarm',
  },
  {
    id: 'proj-07',
    projectNumber: 'PROJECT 07',
    title: 'Document Extraction System',
    industry: 'Banking & Legal',
    description: 'Multi-modal invoice, contract, and balance sheet extraction pipeline converting unstructured PDFs into normalized JSON databases.',
    deliverables: ['Vision-LLM table & key-value extraction', '100% schema enforcement with zero hallucination', 'Automated human-in-the-loop validation flag'],
    techStack: ['Marker', 'Claude 3.5 Sonnet', 'Pydantic', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Multimodal Schema Parser',
  },
  {
    id: 'proj-08',
    projectNumber: 'PROJECT 08',
    title: 'Research & Automation Agent',
    industry: 'Strategic Intelligence',
    description: 'Multi-step autonomous agent team that searches the web, verifies sources, aggregates market trends, and synthesizes executive whitepapers.',
    deliverables: ['Cyclic ReAct loop with web scraping tools', 'Cross-verification agent with fact-checking prompt', 'Automated Markdown and PDF report generator'],
    techStack: ['LangGraph', 'Tavily API', 'Llama 3', 'WeasyPrint'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Multi-Agent Research Swarm',
  },
  {
    id: 'proj-09',
    projectNumber: 'PROJECT 09',
    title: 'Intelligent Document AI',
    industry: 'Healthcare & Insurance',
    description: 'End-to-end medical claim and legal discovery platform with PII redaction, entity relationship mapping, and compliance verification.',
    deliverables: ['Automated PII masking with Presidio', 'Graph-based entity relationship extractor', 'HIPAA/SOC2 compliant audit logging pipeline'],
    techStack: ['Presidio', 'LlamaIndex Property Graphs', 'FastAPI', 'Docker'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Presidio PII Redaction Layer',
  },
  {
    id: 'proj-10',
    projectNumber: 'PROJECT 10',
    title: 'Enterprise AI Assistant',
    industry: 'Cross-Department Automation',
    description: 'Flagship enterprise multi-agent system coordinating HR, IT support, engineering queries, and business intelligence with zero human friction.',
    deliverables: ['Hierarchical supervisor agent routing to sub-agents', 'Long-term session memory across multi-turn chats', 'Production Kubernetes deployment with observability'],
    techStack: ['LangGraph', 'Langfuse', 'Redis', 'Docker', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    architectureBadge: 'Production Kubernetes Cluster',
  },
];
