export interface DailyTopic {
  day: string;
  title: string;
  items: string[];
  assignment?: string;
}

export interface CapstoneAgent {
  name: string;
  role: string;
}

export interface CapstoneGuardrail {
  name: string;
  detail: string;
}

export interface CurriculumPhase {
  id: number;
  phaseNumber: string;
  dayRange: string;
  title: string;
  category: 'Foundations & DL' | 'Transformers & LLMs' | 'RAG & Voice' | 'Agentic AI' | 'Deployment & Capstone' | 'Career & Assignments';
  summary: string;
  days: DailyTopic[];
  keyDeliverables: string[];
  toolsAndTech: string[];
  specialProject?: {
    name: string;
    details: string;
    agents?: CapstoneAgent[];
    guardrails?: CapstoneGuardrail[];
  };
}

export const CURRICULUM_PHASES: CurriculumPhase[] = [
  {
    id: 1,
    phaseNumber: 'PHASE 01',
    dayRange: 'Day 1 – 5',
    title: 'Deep Learning Foundations',
    category: 'Foundations & DL',
    summary:
      'Master the mathematical and architectural bedrock of deep learning. Transition from Artificial Neural Networks (ANN) to Convolutional Networks (CNN), Recurrent Networks (RNN/LSTM), and core Natural Language Processing foundations.',
    days: [
      {
        day: 'Day 1',
        title: 'Deep Learning Introduction & ANN',
        items: ['Deep Learning architectural introduction & intuition', 'Artificial Neural Networks (ANN) forward & backward pass math', 'Loss functions and gradient descent optimization'],
      },
      {
        day: 'Day 2',
        title: 'ANN Practical & MNIST Classification',
        items: ['Hands-on ANN implementation in PyTorch', 'MNIST digit recognition baseline model training', 'Loss landscape & validation tracking'],
        assignment: 'Customer Churn Prediction Model & CIFAR-10 Classifier (2 assignments)',
      },
      {
        day: 'Day 3',
        title: 'CNN: Theory & Production Practical',
        items: ['Convolutional Neural Networks (CNN) feature maps & kernels', 'Pooling layers, padding, and stride mechanics', 'CIFAR deep CNN implementation'],
        assignment: 'Cat Image Classifier & Gender Classification Pipeline (2 assignments)',
      },
      {
        day: 'Day 4',
        title: 'RNN & LSTM Sequence Modeling',
        items: ['Recurrent Neural Networks (RNN) and vanishing gradient challenges', 'Long Short-Term Memory (LSTM) gating architecture', 'Next-word prediction sequence training'],
        assignment: 'Time Series Forecasting & Sequential Data Processing Pipeline (2 assignments)',
      },
      {
        day: 'Day 5',
        title: 'Natural Language Processing Foundations',
        items: ['Tokenization, Lemmatization, Stemming & Stop-word filtering', 'N-grams language modeling & Word Embeddings (Word2Vec)', 'Text vectorization practicals'],
        assignment: 'Voice-to-Text Transcription & Voice Command Controller (2 assignments)',
      },
    ],
    keyDeliverables: [
      'Customer Churn production classifier',
      'CIFAR CNN image recognition pipeline',
      'LSTM sequential text & time-series predictor',
      'Audio-to-text NLP processing pipeline',
    ],
    toolsAndTech: ['Python', 'PyTorch', 'NumPy', 'Scikit-Learn', 'NLTK', 'SpaCy'],
  },
  {
    id: 2,
    phaseNumber: 'PHASE 02',
    dayRange: 'Day 6 – 8',
    title: 'Transformer Architecture',
    category: 'Transformers & LLMs',
    summary:
      'Unpack the revolutionary "Attention Is All You Need" transformer architecture that powers modern GenAI. Deep-dive into Positional Encodings, Scaled Dot-Product Self-Attention, Multi-Head Attention, and complete Encoder-Decoder mechanics.',
    days: [
      {
        day: 'Day 6',
        title: 'Transformer Architecture (Part 1)',
        items: [
          'Detailed architectural limitations of RNN, LSTM, and GRU',
          'Bidirectional RNN and bottleneck analysis',
          'Mathematical derivation of Positional Encoding (Sinusoidal embeddings)',
        ],
      },
      {
        day: 'Day 7',
        title: 'Transformer (Part 2): Attention Mechanics',
        items: [
          'Self-Attention deep dive & mathematical foundations',
          'Query (Q), Key (K), and Value (V) matrix projections',
          'Multi-Head Attention parallel computation',
          'Encoder and Decoder architectural interaction',
        ],
      },
      {
        day: 'Day 8',
        title: 'Transformer (Part 3): Normalization & Decoding',
        items: [
          'Causal Masked Self-Attention in decoders',
          'Layer Normalization & Residual skip connections',
          'Linear projection and Softmax probability distributions',
        ],
        assignment: 'Build a miniature Transformer Encoder-Decoder from scratch in PyTorch',
      },
    ],
    keyDeliverables: [
      'Self-Attention matrix projection pipeline',
      'Multi-Head Attention layer implemented from scratch',
      'Encoder-Decoder causal masking model',
    ],
    toolsAndTech: ['PyTorch', 'Einsum', 'Positional Embeddings', 'LayerNorm', 'Softmax'],
  },
  {
    id: 3,
    phaseNumber: 'PHASE 03',
    dayRange: 'Day 9 – 11',
    title: 'Large Language Models (LLMs)',
    category: 'Transformers & LLMs',
    summary:
      'Bridge from raw transformers to commercial Foundation Models. Master Hugging Face ecosystems, ultra-fast inference with Groq and local execution via Ollama, parameter-efficient fine-tuning (LoRA), and guaranteed structured JSON outputs.',
    days: [
      {
        day: 'Day 9',
        title: 'LLM Foundations & Ecosystem',
        items: [
          'What is an LLM? Autoregressive token generation fundamentals',
          'Difference between raw Transformers and modern Foundation LLMs',
          'Context windows, token limits, and KV caching',
          'Navigating Hugging Face Model Hub and model cards',
        ],
      },
      {
        day: 'Day 10',
        title: 'Open-Source Models & Local Inference',
        items: [
          'Loading & running pretrained models via Hugging Face Transformers',
          'Creating custom chatbots using Groq LPU API and local Ollama',
          'Streaming token responses and latency benchmarks',
        ],
        assignment: 'Deploy local Llama 3 chatbot with custom system prompts on Groq / Ollama',
      },
      {
        day: 'Day 11',
        title: 'Fine-Tuning & Structured Outputs',
        items: [
          'How to fine-tune an LLM model (LoRA & PEFT concepts)',
          'Enforcing guaranteed structured JSON outputs with Pydantic',
          'Prompt engineering: System, User, Message, and Assistant roles',
        ],
        assignment: 'Build a Structured Information Extraction engine returning schema-validated JSON',
      },
    ],
    keyDeliverables: [
      'Local & Cloud LLM inference pipeline with Groq and Ollama',
      'Fine-tuning dataset preparation and parameter-efficient tuning script',
      'Deterministic structured JSON extraction pipeline with Pydantic',
    ],
    toolsAndTech: ['Hugging Face', 'Groq LPU', 'Ollama', 'Llama 3', 'Pydantic v2', 'PEFT/LoRA'],
  },
  {
    id: 4,
    phaseNumber: 'PHASE 04',
    dayRange: 'Day 12 – 20',
    title: 'RAG & Voice Assistant',
    category: 'RAG & Voice',
    summary:
      'Construct production Retrieval-Augmented Generation (RAG) pipelines that eliminate hallucinations with grounded enterprise context, paired with custom speech-driven Voice Assistants and intensive hands-on lab sprints.',
    days: [
      {
        day: 'Day 12',
        title: 'Streamlit & RAG Fundamentals',
        items: [
          'Understanding the Streamlit reactive UI framework',
          'What is RAG? Vector embeddings, chunking, and similarity search',
          'Architectural trade-offs: RAG vs Fine-Tuning in enterprise systems',
        ],
      },
      {
        day: 'Day 13',
        title: 'RAG Production Practical with Vector DBs',
        items: [
          'Hands-on RAG pipeline with ChromaDB and FAISS',
          'Document chunking strategies, overlap windows, and embedding models',
          'Context injection into LLM prompts with source attribution',
        ],
        assignment: 'Build a full PDF Document QA RAG system with citation sources',
      },
      {
        day: 'Day 14 – 15',
        title: 'Project: Custom Voice Assistant',
        items: [
          'Build a voice assistant using custom LLM (Groq) with real-time speech processing',
          'Audio capture, Whisper transcription, and text-to-speech synthesis',
          'Receive and deliver responses in custom languages (e.g. Tamil, English)',
        ],
        assignment: 'Deploy working Voice Assistant with custom wake-word & language support',
      },
      {
        day: 'Day 16 – 20',
        title: 'Intensive Lab: Assignments & Project Sprint',
        items: [
          '5 full days of hands-on assignments and enterprise project building',
          'End-to-end milestone review: 20 days of the engineering curriculum completed',
          'Code audits and performance optimization on vector retrieval latency',
        ],
      },
    ],
    keyDeliverables: [
      'Streamlit document RAG application with vector search',
      'Real-time Multilingual Voice Assistant powered by Groq',
      'Evaluation benchmarks on vector retrieval recall and faithfulness',
    ],
    toolsAndTech: ['Streamlit', 'ChromaDB', 'FAISS', 'Groq Whisper', 'LangChain', 'Text-to-Speech'],
  },
  {
    id: 5,
    phaseNumber: 'PHASE 05',
    dayRange: 'Day 21 – 30',
    title: 'Agentic AI & Multi-Agent Systems',
    category: 'Agentic AI',
    summary:
      'The core engineering track of the masterclass. Move from passive text generators to autonomous cognitive agents: action loops, dynamic tool calling, state persistence, LangGraph graph workflows, hierarchical supervisor swarms, security, and prompt injection defense.',
    days: [
      {
        day: 'Day 21',
        title: 'Introduction to AI Agents',
        items: [
          'What is an AI Agent? Transition from LLM to Autonomous Actor',
          'LLM vs Cognitive Agent: reasoning, acting, and reflection',
          'The Agent Loop: Action, Read, Planning, and Feedback',
        ],
      },
      {
        day: 'Day 22',
        title: 'Tool Selection & Function Calling',
        items: [
          'Tool declaration schemas & system descriptions',
          'Dynamic tool selection, parameter extraction, and execution',
          'Error handling and self-correction during failed tool calls',
        ],
      },
      {
        day: 'Day 23',
        title: 'Agent State & Memory Persistence',
        items: [
          'Managing agent state graphs and checkpointing',
          'Short-term scratchpad memory vs long-term external memory',
          'Deterministic agent termination conditions and loop cycle breakers',
        ],
      },
      {
        day: 'Day 24',
        title: 'LangGraph Core Engineering',
        items: [
          'LangGraph architecture: Nodes, Edges, and Conditional Edges',
          'StateGraph schema definitions and message reducers',
          'Building cyclic self-correcting graphs in LangGraph',
        ],
      },
      {
        day: 'Day 25',
        title: 'Multi-Agent Systems & Communication',
        items: [
          'Single Agent vs Multi-Agent architectures: when to split roles',
          'Agent-to-agent communication protocols and message bus',
          'Specialist worker agents with dedicated toolsets',
        ],
      },
      {
        day: 'Day 26',
        title: 'Parallel & Sequential Agent Execution',
        items: [
          'Parallel agent execution branches with fan-out / fan-in joins',
          'Sequential pipeline handoffs and structured data passing',
          'Benchmarking multi-agent throughput vs single-agent latency',
        ],
      },
      {
        day: 'Day 27',
        title: 'Hierarchical Agents & Failure Handling',
        items: [
          'Hierarchical supervisor-worker swarm pattern',
          'Global multi-agent state coordination and sub-graph isolation',
          'Graceful failure handling and dynamic retry strategies',
        ],
      },
      {
        day: 'Day 28',
        title: 'Autonomous RAG Agent',
        items: [
          'Corrective RAG (CRAG) with self-evaluating retrieval',
          'Query rewrite nodes and fallback web search tools',
          'Hallucination grading and answer faithfulness verification',
        ],
      },
      {
        day: 'Day 29',
        title: 'Evaluation & Prompt Injection Defense',
        items: [
          'Quantitative agent evaluation metrics (tool accuracy, path efficiency)',
          'LLM output evaluation with automated judges',
          'Defending against prompt injection, jailbreaks, and adversarial attacks',
        ],
      },
      {
        day: 'Day 30',
        title: 'Security, Permissions & Cost Optimization',
        items: [
          'Tool execution sandboxing and role-based permissions',
          'Splitting small vs large models to minimize token costs',
          'Latency optimization and token budget enforcement',
        ],
      },
    ],
    keyDeliverables: [
      'Self-correcting LangGraph agent loop with external tools',
      'Hierarchical Multi-Agent Swarm with Supervisor routing',
      'Corrective RAG agent with query rewrites and hallucination checks',
      'Prompt injection defense shield and cost evaluation suite',
    ],
    toolsAndTech: ['LangGraph', 'LangChain', 'Python', 'SQLite', 'Redis', 'Ragas', 'Guardrails'],
  },
  {
    id: 6,
    phaseNumber: 'PHASE 06',
    dayRange: 'Day 31 – 32',
    title: 'Production Deployment',
    category: 'Deployment & Capstone',
    summary:
      'Transform experimental agent scripts into hardened, containerized microservices ready for cloud production. Build asynchronous FastAPI endpoints, configure Docker multi-stage builds, and architect resilient cloud production pipelines.',
    days: [
      {
        day: 'Day 31',
        title: 'API Deployment & Containerization',
        items: [
          'Wrapping LangGraph agent workflows into asynchronous FastAPI endpoints',
          'Streaming response endpoints (SSE / WebSockets)',
          'Docker containerization, environment variables, and Docker Compose orchestration',
        ],
        assignment: 'Containerize multi-agent service with FastAPI and test via Postman/curl',
      },
      {
        day: 'Day 32',
        title: 'Production Cloud Architecture',
        items: [
          'Production architecture blueprints: load balancers, rate limiting, and queues',
          'Observability and tracing with OpenTelemetry / LangSmith',
          'Security hardening, secret management, and cloud deployment',
        ],
        assignment: 'Deploy containerized multi-agent API to cloud environment with live URL',
      },
    ],
    keyDeliverables: [
      'Production FastAPI agent microservice with streaming endpoints',
      'Multi-stage Dockerfile and docker-compose.yml configuration',
      'Live cloud deployment with healthcheck probes and monitoring',
    ],
    toolsAndTech: ['FastAPI', 'Docker', 'Docker Compose', 'Uvicorn', 'Pydantic', 'Cloud Deployment'],
  },
  {
    id: 7,
    phaseNumber: 'PHASE 07',
    dayRange: 'Day 33 – 37',
    title: 'Industrial Capstone: ShopDesk AI',
    category: 'Deployment & Capstone',
    summary:
      'The crown-jewel industrial capstone: ShopDesk AI — a commercial-grade Multi-Agent E-commerce Customer Support Desk. Customer messages in Tamil, Tanglish, and English are processed by a coordinated fleet of 6 specialist agents with production guardrails and admin dashboard.',
    days: [
      {
        day: 'Day 33',
        title: 'Architecture & LangGraph Skeleton',
        items: [
          'Architecture diagram, modular folder structure, and design review',
          'Setting up SQLite database (50 sample orders, 20 customers), policy docs, and product catalog',
          'Shared state schema definition and LangGraph workflow skeleton',
          'Groq API setup and integration connectivity test call',
        ],
      },
      {
        day: 'Day 34',
        title: 'Triage & Order Specialist Agents',
        items: [
          'Triage Agent: Intent classification (order status, refund, query, complaint) & multilingual language detection (Tamil, Tanglish, English)',
          'Order Agent: Secure read-only database tool calling: get_order() and tracking status lookup',
        ],
      },
      {
        day: 'Day 35',
        title: 'FAQ RAG & Refund Specialist Agents',
        items: [
          'FAQ / RAG Agent: Grounded answers from store return policy and shipping catalog using ChromaDB/FAISS',
          'Refund Agent: Controlled financial logic: check_refund_eligibility() and create_refund_request()',
        ],
      },
      {
        day: 'Day 36',
        title: 'Supervisor, Safety & Comprehensive Evaluation',
        items: [
          'Supervisor routing, failure recovery loops, and human-in-the-loop escalation',
          'Guard Agent implementation: Input prompt injection defense & output PII leak protection',
          'Rigorous evaluation benchmark: 40 real customer test messages, 10 injection attacks, refund rules validation & latency tracking',
        ],
      },
      {
        day: 'Day 37',
        title: 'Full UI, Docker Container & Demo Delivery',
        items: [
          'Streamlit Customer Chat UI + Executive Admin Dashboard (ticket list, approval queue, audit logs)',
          'FastAPI backend service + Docker containerization',
          'Production README documentation and live video demonstration recording',
        ],
        assignment: 'Finalize and submit ShopDesk AI with live demo URL, GitHub repo, and architectural documentation',
      },
    ],
    specialProject: {
      name: 'ShopDesk AI: Multi-Agent Support Desk',
      details: 'A multi-agent customer support desk handling Tamil, Tanglish, and English customer inquiries with 6 specialist agents and deterministic security guardrails.',
      agents: [
        { name: 'Guard Agent', role: 'Prompt injection check on input; sensitive PII data leak check on output' },
        { name: 'Triage Agent', role: 'Classify intent (order status, refund, product query, complaint) and detect language' },
        { name: 'Order Agent', role: 'Look up order status and shipping tracking from SQLite (tool calling, read-only)' },
        { name: 'FAQ / RAG Agent', role: 'Grounded answers from store return policy, shipping policy and product catalog' },
        { name: 'Refund Agent', role: 'Check eligibility against rules and recommend approve / reject' },
        { name: 'Supervisor', role: 'Routing, retry, fallback, human escalation, and conversation termination' },
      ],
      guardrails: [
        { name: 'Refund Limit', detail: 'Orders below Rs. 2,000 auto-approved; amounts above require human approval' },
        { name: 'Customer Verification', detail: 'Order ID + phone number verification; customer views only their own data' },
        { name: 'Tool Permissions', detail: 'Order DB is strictly read-only; refunds execute through controlled write tool only' },
        { name: 'Low Confidence Rule', detail: 'Unclear messages or ambiguous requests auto-escalate to human staff' },
        { name: 'Audit Trail', detail: 'Every automated agent decision logged with structured rationale and timestamp' },
      ],
    },
    keyDeliverables: [
      'Complete ShopDesk AI multi-agent architecture deployed with Docker',
      'Dual-interface Streamlit app: Customer Chat + Executive Admin Dashboard',
      'Automated guardrail test suite passing 40 real tests & 10 adversarial attacks',
    ],
    toolsAndTech: ['LangGraph', 'Groq LPU', 'SQLite', 'ChromaDB', 'FastAPI', 'Streamlit', 'Docker'],
  },
  {
    id: 8,
    phaseNumber: 'PHASE 08',
    dayRange: 'Day 38 – 40',
    title: 'Mock Technical Interviews',
    category: 'Career & Assignments',
    summary:
      'Rigorous technical preparation simulating real-world Lead AI Architect and Senior Agentic Engineer interview rounds. Practice live system design, LangGraph architectural defense, and technical objection handling.',
    days: [
      {
        day: 'Day 38 – 40',
        title: 'Mock Technical Interview Rounds',
        items: [
          '1-on-1 and cohort live system design interviews on multi-agent architectures',
          'Live coding evaluations: building LangGraph graphs and tool-calling loops under timed pressure',
          'Portfolio presentation auditing: defending capstone design decisions, trade-offs, and token economics',
          'Targeted resume positioning and salary negotiation coaching for Agentic AI roles',
        ],
        assignment: 'Complete mock technical evaluation and receive personalized audit score sheet',
      },
    ],
    keyDeliverables: [
      'System design interview mastery blueprint',
      'Live code audit performance scorecard',
      'Targeted AI Architect resume and LinkedIn portfolio audit',
    ],
    toolsAndTech: ['System Design', 'LangGraph', 'Architecture Defense', 'Portfolio Auditing'],
  },
  {
    id: 9,
    phaseNumber: 'PHASE 09',
    dayRange: 'Day 41 – 45',
    title: 'Final Capstone Assignments',
    category: 'Career & Assignments',
    summary:
      'Two comprehensive standalone production assignments demonstrating complete mastery of single-agent tools and multi-agent safety swarms with full README documentation and evaluation tables.',
    days: [
      {
        day: 'Day 41 – 42',
        title: 'Assignment 1: Smart Expense Tracker Agent',
        items: [
          'Single Agent + Tools with conversational memory and structured outputs',
          'Natural language Tanglish parsing (e.g. "Innaiku tea ku 20, auto ku 80, lunch 150")',
          'Tools: add_expense(), get_expenses(date_range, category), get_summary(), plot_chart()',
          'Structured JSON schema: {item, amount, category, date} saved to SQLite',
          'Conversational memory: remembers context ("Adhe maadhiri innoru tea add pannu")',
          'Interactive Streamlit chat UI with confirmation before delete operations',
        ],
        assignment: 'Submit Python script / notebook, Streamlit UI, and 10 test case evaluations',
      },
      {
        day: 'Day 43 – 45',
        title: 'Assignment 2: Multi-Agent Research Team with Safety',
        items: [
          'Multi-agent collaborative swarm: Planner, Parallel Researchers (small models), Fact-Checker, Writer (large model), Supervisor',
          'Parallel execution with LangGraph branches for researcher agents',
          'Graceful failure handling: if one researcher fails, delivers partial report with missing section notes',
          'Prompt injection defense test: malicious web page with "ignore instructions" text successfully thwarted',
          'Cost and latency tracking: logging tokens and runtime per agent with total cost table',
          'Evaluation on 3 diverse topics (e.g. "Indian EV market 2026") scoring sources, time, and fact-check pass rate',
        ],
        assignment: 'Submit LangGraph diagram, working source code, 3 sample reports, cost analysis, and demo video',
      },
    ],
    keyDeliverables: [
      'Tanglish-native Smart Expense Tracker Agent with SQLite & Streamlit',
      'Multi-Agent Research Swarm with parallel LangGraph branches & safety guards',
      'Complete submission package: README.md, architecture diagrams, demo video, evaluation table',
    ],
    toolsAndTech: ['LangGraph', 'Streamlit', 'SQLite', 'Matplotlib', 'Prompt Security', 'Token Cost Profiler'],
  },
];
