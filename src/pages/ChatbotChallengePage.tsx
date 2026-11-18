import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  FileCode,
  Folder,
  FileText,
  KeyRound,
  Zap,
  Cpu,
  Layers,
  Monitor,
  ShieldCheck,
  Terminal,
  Plus,
  Minus,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { copyTextToClipboard } from '../utils/clipboard';

export const ChatbotChallengePage: React.FC = () => {
  const { currentMember } = useTheme();
  // All steps start CLOSED by default per user specification
  const [openStepIds, setOpenStepIds] = useState<Set<number>>(new Set());
  const [isFullScriptOpen, setIsFullScriptOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleStep = (stepNumber: number) => {
    setOpenStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenStepIds(new Set(STEPS_DATA.map((s) => s.step)));
    setIsFullScriptOpen(true);
  };

  const handleCollapseAll = () => {
    setOpenStepIds(new Set());
    setIsFullScriptOpen(false);
  };

  const handleCopy = async (text: string, index: number) => {
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      showToast('Code copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async (code: string) => {
    const success = await copyTextToClipboard(code);
    if (success) {
      setCopiedAll(true);
      showToast('Complete app.py copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const COMPLETE_APP_CODE = `import os
import streamlit as st
from dotenv import load_dotenv
from groq import Groq

# 1. Load environment variables from .env
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# 2. Page Configuration
st.set_page_config(
    page_title="Personal AI Assistant | Groq",
    page_icon="⚡",
    layout="centered"
)

st.title("⚡ Groq Personal AI Assistant")
st.caption("Powered by Llama 3.3 70B & Groq LPU Inference")

# 3. Check for API Key
if not GROQ_API_KEY:
    st.error("GROQ_API_KEY not found in .env file. Please add it to continue.")
    st.stop()

# 4. Initialize Groq Client
client = Groq(api_key=GROQ_API_KEY)
MODEL_NAME = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """You are Jarvis, an ultra-fast, intelligent personal assistant.
Always provide structured, actionable, and clear answers with code examples where relevant."""

# 5. Initialize Chat History
if "messages" not in st.session_state:
    st.session_state.messages = []

# 6. Render Chat Messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 7. Accept User Input
user_input = st.chat_input("Ask your personal assistant anything...")

if user_input:
    # Append user message
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # Prepare message payload
    messages_payload = [{"role": "system", "content": SYSTEM_PROMPT}] + st.session_state.messages

    # Stream assistant response
    with st.chat_message("assistant"):
        def generate_stream():
            stream = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages_payload,
                temperature=0.7,
                stream=True
            )
            for chunk in stream:
                token = chunk.choices[0].delta.content or ""
                yield token

        response_text = st.write_stream(generate_stream())

    # Save to history
    st.session_state.messages.append({"role": "assistant", "content": response_text})
`;

  const STEPS_DATA = [
    {
      step: 1,
      title: 'Initialize Directory & Virtual Environment',
      time: '1 Min',
      category: 'Environment Setup',
      summary: 'Create an isolated Python 3.10+ workspace to guarantee zero package collisions.',
      diagramType: 'folder-tree',
      diagramData: {
        root: 'groq-personal-assistant/',
        items: [
          { name: 'venv/', type: 'folder', note: 'Isolated Python 3.10+ Runtime & Libs' },
          { name: '.env', type: 'file', note: 'Secure API Credentials (Ignored in Git)' },
          { name: 'app.py', type: 'file', note: 'Streamlit UI + Groq Streaming Entry' },
        ],
      },
      code: `# 1. Create project folder
mkdir groq-personal-assistant
cd groq-personal-assistant

# 2. Create isolated virtual environment
python -m venv venv

# 3. Activate environment
# On Windows:
venv\\Scripts\\activate
# On macOS / Linux:
source venv/bin/activate`,
      proTip: 'Always activate your virtual environment before installing packages. Your terminal prompt should now show (venv).',
    },
    {
      step: 2,
      title: 'Install Production Dependencies',
      time: '1 Min',
      category: 'Package Installation',
      summary: 'Install Groq Python SDK for LPU acceleration, Streamlit for UI, and python-dotenv.',
      diagramType: 'package-badges',
      diagramData: {
        packages: [
          { name: 'groq', role: 'LPU Client & Token Streaming Engine', speed: '500+ tok/s' },
          { name: 'streamlit', role: 'Full Reactive Chatbot Web Interface', speed: 'Zero Frontend JS' },
          { name: 'python-dotenv', role: 'Secure Environment Variable Vault', speed: 'Zero Leakage' },
        ],
      },
      code: `pip install groq streamlit python-dotenv`,
      proTip: "Groq's LPU provides 500+ tokens/second inference on open-weights models like Llama 3.3 70B, making conversational turn latency nearly instantaneous.",
    },
    {
      step: 3,
      title: 'Get Free Groq API Key & Create .env',
      time: '1 Min',
      category: 'Security & Secrets',
      summary: 'Generate a free API key from the Groq Developer Console and save it securely.',
      diagramType: 'key-vault',
      diagramData: {
        steps: ['1. Visit console.groq.com/keys', '2. Create API Key', '3. Save in local .env file'],
      },
      code: `# Create .env file
# Paste your key below:
GROQ_API_KEY=gsk_your_actual_groq_api_key_here`,
      proTip: 'Never commit .env files to GitHub. Add .env into a .gitignore file so your production credentials stay private.',
    },
    {
      step: 4,
      title: 'Configure Environment Loader (config.py)',
      time: '1 Min',
      category: 'Security & Secrets',
      summary: 'Write a dedicated configuration script to validate that your API credentials exist.',
      diagramType: 'pipeline-check',
      diagramData: {
        flow: ['Load .env', 'Verify GROQ_API_KEY', 'Pass to Groq Client (or Fail Early)'],
      },
      code: `import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("CRITICAL: GROQ_API_KEY is missing. Please add it to your .env file.")`,
      proTip: 'Failing fast on missing environment variables at startup prevents unexpected crashes during live user conversations.',
    },
    {
      step: 5,
      title: 'Initialize Groq Client & Select SOTA Model',
      time: '1 Min',
      category: 'Agent Architecture',
      summary: 'Instantiate the Groq client and choose the flagship Llama 3.3 70B Versatile model.',
      diagramType: 'chip-benchmark',
      diagramData: {
        groqSpeed: '~580 tokens/sec',
        gpuSpeed: '~45 tokens/sec',
        context: '8,192 tokens window',
      },
      code: `from groq import Groq
import os

# Initialize client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Flagship model: Llama 3.3 70B Versatile (8,192 context window, sub-100ms TTFT)
MODEL_NAME = "llama-3.3-70b-versatile"`,
      proTip: 'Llama 3.3 70B on Groq rivals GPT-4o intelligence with 10x faster token output speed and zero cold starts.',
    },
    {
      step: 6,
      title: 'Define Personal Assistant Persona & System Prompt',
      time: '1 Min',
      category: 'Prompt Engineering',
      summary: 'Instruct your assistant on how to think, respond, and format answers for your personal tasks.',
      diagramType: 'persona-card',
      diagramData: {
        personaName: 'Jarvis (Personal Assistant)',
        traits: ['Fast Reasoning', 'Structured Markdown', 'Executable Code', 'Proactive Guidance'],
      },
      code: `SYSTEM_PROMPT = """You are Jarvis, an elite personal AI assistant.
Your Core Instructions:
1. Provide accurate, clear, and structured answers.
2. Format explanations with clean Markdown bullets and code blocks.
3. Be proactive, polite, and prioritize high-value insights for busy professionals."""`,
      proTip: 'A concise system prompt grounds the LLM, reducing hallucinations while preserving its rapid reasoning abilities.',
    },
    {
      step: 7,
      title: 'Setup Streamlit Web UI & Session State',
      time: '1 Min',
      category: 'Frontend UI',
      summary: 'Create the reactive web application window and initialize session message memory.',
      diagramType: 'session-loop',
      diagramData: {
        states: ['st.set_page_config()', 'st.session_state.messages = []', 'Continuous State Retention'],
      },
      code: `import streamlit as st

# Configure web layout
st.set_page_config(
    page_title="Personal AI Assistant | Groq",
    page_icon="⚡",
    layout="centered"
)

st.title("⚡ Groq Personal AI Assistant")
st.caption("Powered by Llama 3.3 70B & Groq LPU Acceleration")

# Initialize session state so conversation persists across re-renders
if "messages" not in st.session_state:
    st.session_state.messages = []`,
      proTip: 'Streamlit re-runs scripts top-to-bottom on every user action; st.session_state ensures chat history is never lost.',
    },
    {
      step: 8,
      title: 'Render Chat History & Interactive Input Bar',
      time: '1 Min',
      category: 'Frontend UI',
      summary: 'Render message bubbles for previous turns and add an intuitive chat input box at the bottom.',
      diagramType: 'ui-preview',
      diagramData: {
        elements: ['User Query Bubble', 'Jarvis Assistant Bubble', 'Sticky Bottom Input Bar'],
      },
      code: `# Render past conversation history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Capture user input
user_input = st.chat_input("Ask your personal assistant anything...")`,
      proTip: 'st.chat_message automatically styles user and assistant avatars with clean native borders.',
    },
    {
      step: 9,
      title: 'Implement Real-Time Token Streaming Engine',
      time: '1 Min',
      category: 'Streaming Engine',
      summary: 'Connect user queries to Groq with streaming enabled for a typewriter response effect.',
      diagramType: 'stream-flow',
      diagramData: {
        flowSteps: ['Groq LPU stream=True', 'delta.content generator', 'st.write_stream() Typewriter Effect'],
      },
      code: `if user_input:
    # 1. Add user query to conversation
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # 2. Build full message payload including system prompt
    messages_payload = [{"role": "system", "content": SYSTEM_PROMPT}] + st.session_state.messages

    # 3. Stream Groq tokens in real-time
    with st.chat_message("assistant"):
        def generate_stream():
            stream = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages_payload,
                temperature=0.7,
                stream=True
            )
            for chunk in stream:
                token = chunk.choices[0].delta.content or ""
                yield token

        response_content = st.write_stream(generate_stream())

    # 4. Save assistant response into memory
    st.session_state.messages.append({"role": "assistant", "content": response_content})`,
      proTip: 'st.write_stream consumes Python generators directly, rendering 500+ tokens/sec smoothly without UI freezing.',
    },
    {
      step: 10,
      title: 'Launch, Test & Deploy Your Assistant',
      time: '1 Min',
      category: 'Deployment',
      summary: 'Run your live Streamlit web server and start chatting with your AI assistant on localhost.',
      diagramType: 'deploy-box',
      diagramData: {
        url: 'http://localhost:8501',
        cloud: 'Streamlit Community Cloud / Docker',
      },
      code: `# Launch your application in terminal:
streamlit run app.py

# Your browser will automatically open at:
# Local URL: http://localhost:8501
# Network URL: http://192.168.x.x:8501`,
      proTip: 'To deploy online for free, push your code to GitHub and connect it to Streamlit Community Cloud (share.streamlit.io).',
    },
  ];

  const renderStepDiagram = (item: any) => {
    switch (item.diagramType) {
      case 'folder-tree':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900 mb-3">
              <span className="flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-purple-600" />
                <span>Target Project Directory Blueprint</span>
              </span>
              <span className="text-[11px] bg-purple-100 px-2 py-0.5 rounded text-purple-700">Root: {item.diagramData.root}</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {item.diagramData.items.map((file: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#DDD5EB] shadow-xs">
                  <span className="flex items-center gap-2 font-semibold text-[#393044]">
                    {file.type === 'folder' ? (
                      <Folder className="w-4 h-4 text-amber-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-purple-500" />
                    )}
                    <span>{file.name}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">{file.note}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'package-badges':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="text-xs font-mono font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Production Python Package Ecosystem</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {item.diagramData.packages.map((pkg: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#DDD5EB] shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-sm text-purple-700">{pkg.name}</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight mb-2">{pkg.role}</p>
                  <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {pkg.speed}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'key-vault':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900 mb-3">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-purple-600" />
                <span>Zero-Leak API Key Security Architecture</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">100% Free Tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#DDD5EB] text-center shadow-xs">
                <span className="text-[10px] font-mono text-purple-600 block font-bold">STAGE 1</span>
                <span className="font-semibold text-[#393044]">console.groq.com</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#DDD5EB] text-center shadow-xs">
                <span className="text-[10px] font-mono text-purple-600 block font-bold">STAGE 2</span>
                <span className="font-semibold text-[#393044]">Generate API Secret</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#DDD5EB] text-center shadow-xs">
                <span className="text-[10px] font-mono text-purple-600 block font-bold">STAGE 3</span>
                <span className="font-semibold text-[#393044]">Store in Local .env</span>
              </div>
            </div>
          </div>
        );

      case 'pipeline-check':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="text-xs font-mono font-bold text-purple-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Fail-Safe Configuration Pipeline</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 bg-white border border-[#DDD5EB] rounded-lg shadow-xs">1. load_dotenv()</span>
              <span className="text-purple-400 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 bg-white border border-[#DDD5EB] rounded-lg shadow-xs">2. os.getenv("GROQ_API_KEY")</span>
              <span className="text-purple-400 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg shadow-xs font-bold">
                3. Groq(api_key=...)
              </span>
            </div>
          </div>
        );

      case 'chip-benchmark':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>Inference Throughput Benchmark</span>
              </span>
              <span className="text-[11px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-mono">Llama 3.3 70B</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-purple-900">⚡ Groq LPU Tensor Engine</span>
                  <span className="font-extrabold text-purple-700">~580 tokens/sec</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full w-[95%] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-500">Traditional GPU Cloud Inference</span>
                  <span className="text-slate-500">~45 tokens/sec</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[15%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'persona-card':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900 mb-3">
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>System Agent Persona Directive</span>
              </span>
              <span className="text-[11px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Identity: Jarvis</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {item.diagramData.traits.map((t: string, i: number) => (
                <div key={i} className="p-2 rounded-xl bg-white border border-[#DDD5EB] shadow-xs text-center font-semibold text-[#393044]">
                  {t}
                </div>
              ))}
            </div>
          </div>
        );

      case 'session-loop':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="text-xs font-mono font-bold text-purple-900 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Streamlit Session State Memory Cycle</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 bg-white border border-[#DDD5EB] rounded-lg shadow-xs">1. User Inputs Prompt</span>
              <span className="text-purple-400 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 bg-white border border-[#DDD5EB] rounded-lg shadow-xs">2. st.session_state.append()</span>
              <span className="text-purple-400 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 bg-purple-100 text-purple-800 border border-purple-200 rounded-lg shadow-xs font-bold">
                3. UI Preserved Across Re-runs
              </span>
            </div>
          </div>
        );

      case 'ui-preview':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="text-xs font-mono font-bold text-purple-900 mb-2 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-purple-600" />
              <span>Streamlit Native Conversational Layout</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-mono">
                <code>st.chat_message("user") &rarr; User Bubble</code>
              </div>
              <div className="p-2 rounded-lg bg-white text-[#393044] border border-[#DDD5EB] font-mono">
                <code>st.chat_message("assistant") &rarr; Jarvis Response Bubble</code>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                <code>st.chat_input("Ask anything...") &rarr; Pinned Bottom Input Bar</code>
              </div>
            </div>
          </div>
        );

      case 'stream-flow':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="text-xs font-mono font-bold text-purple-900 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Typewriter Streaming Engine (Zero Latency)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-white border border-[#DDD5EB] rounded-xl shadow-xs text-center">
                <span className="text-[10px] text-purple-600 block font-bold">1. Groq LPU</span>
                <span className="font-semibold text-[#393044]">stream=True</span>
              </div>
              <div className="p-2.5 bg-white border border-[#DDD5EB] rounded-xl shadow-xs text-center">
                <span className="text-[10px] text-purple-600 block font-bold">2. Generator Yield</span>
                <span className="font-semibold text-[#393044]">delta.content</span>
              </div>
              <div className="p-2.5 bg-purple-100 border border-purple-200 rounded-xl shadow-xs text-center">
                <span className="text-[10px] text-purple-700 block font-bold">3. Streamlit Display</span>
                <span className="font-bold text-purple-900">st.write_stream()</span>
              </div>
            </div>
          </div>
        );

      case 'deploy-box':
        return (
          <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-200/70">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-purple-600" />
                <span>Local &amp; Production Deployment Endpoint</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">Active Port: 8501</span>
            </div>
            <div className="p-3 rounded-xl bg-[#161726] text-slate-200 font-mono text-xs space-y-1">
              <div className="text-emerald-400 font-bold">&gt; streamlit run app.py</div>
              <div className="text-slate-400">Local URL: http://localhost:8501</div>
              <div className="text-slate-400">Network URL: http://192.168.1.x:8501</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2FA] text-[#393044] font-sans transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDD5EB] shadow-2xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Left: Back Link & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/abdul"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Program</span>
            </Link>

            <Link to="/" className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <img src="/levlox-logo.png" alt="Levlox" className="w-6 h-6 object-contain" />
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-800 whitespace-nowrap">
                Levlox Engineering Labs
              </span>
            </Link>
          </div>

          {/* Right: Copy Full Code Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyAll(COMPLETE_APP_CODE)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs text-white shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: currentMember.colors.dominant }}
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-14 pb-8 sm:pt-16 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#393044] leading-tight">
          Create a Chatbot in 10 Steps in 10 Mins{' '}
          <span className="text-emerald-500 font-extrabold uppercase inline-block ml-1">
            FREE
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mt-3 font-sans tracking-tight">
          Make Your Own Personal Assistant.
        </h2>

        {/* Designer Tech Specs Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-slate-600">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD5EB] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="font-semibold text-[#393044]">Groq LPU</span>
            <span className="text-slate-400 font-mono text-[11px]">Llama 3.3 70B</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD5EB] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-semibold text-[#393044]">Python</span>
            <span className="text-slate-400 font-mono text-[11px]">Virtual Env</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD5EB] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="font-semibold text-[#393044]">Streamlit</span>
            <span className="text-slate-400 font-mono text-[11px]">Chat UI</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Image 3 Collapsible Accordion Style */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header Controls: Expand / Collapse All */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>10 INDUSTRIAL IMPLEMENTATION STEPS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              className="text-xs font-medium text-slate-600 hover:text-purple-700 px-2.5 py-1 rounded-lg bg-white border border-[#DDD5EB] shadow-xs transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="text-xs font-medium text-slate-600 hover:text-purple-700 px-2.5 py-1 rounded-lg bg-white border border-[#DDD5EB] shadow-xs transition-colors"
            >
              Close All
            </button>
          </div>
        </div>

        {/* Collapsible Steps List matching Image 3 wireframe */}
        <div className="space-y-3">
          {STEPS_DATA.map((item) => {
            const isOpen = openStepIds.has(item.step);
            return (
              <div
                key={item.step}
                id={`step-${item.step}`}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  isOpen
                    ? 'border-purple-400 ring-1 ring-purple-500/20 shadow-md'
                    : 'border-[#DDD5EB] hover:border-purple-300'
                }`}
              >
                {/* Horizontal Bar matching Image 3 format */}
                <div
                  className="px-5 sm:px-6 py-4 cursor-pointer flex items-center justify-between gap-4 select-none"
                  onClick={() => toggleStep(item.step)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* STEP Pill */}
                    <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#F0EBFA] text-[#6941C6] font-mono font-bold text-xs shrink-0 border border-purple-200/60">
                      STEP {item.step.toString().padStart(2, '0')}
                    </span>

                    {/* Step Title */}
                    <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base tracking-tight truncate">
                      {item.title}
                    </h3>

                    {/* Category Tag (Pill) */}
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 shrink-0">
                      {item.category}
                    </span>
                  </div>

                  {/* Right side Toggle button matching Image 3 'View Syllabus +' */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors flex items-center gap-1">
                      {isOpen ? (
                        <>
                          <span>Close Step</span>
                          <Minus className="w-3.5 h-3.5 text-purple-600" />
                        </>
                      ) : (
                        <>
                          <span>View Step</span>
                          <Plus className="w-3.5 h-3.5 text-slate-400" />
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Expanded Step Details (Closed by default, opens on demand) */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0EBF7] space-y-4 animate-fade-in">
                    {/* Visual Diagram */}
                    {renderStepDiagram(item)}

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-[#5E546C] leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Code Block with Terminal / Python Header & Copy */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#161726] border border-white/10 shadow-inner">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1F2034] text-xs text-slate-300 font-mono border-b border-white/10">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          <span className="ml-2 font-bold text-slate-200">
                            {item.code.startsWith('#!') || item.code.startsWith('pip') || item.code.startsWith('mkdir')
                              ? 'Terminal Execution'
                              : 'Python Source Code'}
                          </span>
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.code, item.step);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                        >
                          {copiedIndex === item.step ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 overflow-x-auto text-xs sm:text-sm text-slate-100 font-mono leading-relaxed">
                        <code>{item.code}</code>
                      </pre>
                    </div>

                    {/* Pro Tip Box */}
                    <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-[#393044] leading-relaxed">
                        <strong className="text-purple-900 block font-bold mb-0.5">
                          Architectural Insight from Abdul Kalam Azad:
                        </strong>
                        {item.proTip}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Master Full Script Accordion Row */}
          <div
            className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
              isFullScriptOpen
                ? 'border-purple-400 ring-1 ring-purple-500/20 shadow-md'
                : 'border-[#DDD5EB] hover:border-purple-300'
            }`}
          >
            <div
              className="px-5 sm:px-6 py-4 cursor-pointer flex items-center justify-between gap-4 select-none"
              onClick={() => setIsFullScriptOpen(!isFullScriptOpen)}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold text-xs shrink-0 border border-emerald-200">
                  FULL SCRIPT
                </span>

                <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base tracking-tight truncate flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Complete Production Script (app.py)</span>
                </h3>

                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 shrink-0">
                  All 10 Steps Combined
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors flex items-center gap-1">
                  {isFullScriptOpen ? (
                    <>
                      <span>Close Script</span>
                      <Minus className="w-3.5 h-3.5 text-purple-600" />
                    </>
                  ) : (
                    <>
                      <span>View Script</span>
                      <Plus className="w-3.5 h-3.5 text-slate-400" />
                    </>
                  )}
                </span>
              </div>
            </div>

            {isFullScriptOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0EBF7] space-y-4 animate-fade-in">
                <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-[#393044] leading-relaxed space-y-1">
                  <div className="flex items-center gap-2 font-bold text-purple-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>How to Run in 30 Seconds:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 pl-1">
                    <li>Create a file named <code className="bg-white px-1.5 py-0.5 rounded font-mono text-purple-700 border">app.py</code> and paste the code below.</li>
                    <li>Create a <code className="bg-white px-1.5 py-0.5 rounded font-mono text-purple-700 border">.env</code> file containing your <code className="font-mono text-purple-700">GROQ_API_KEY</code>.</li>
                    <li>Execute <code className="bg-white px-1.5 py-0.5 rounded font-mono text-purple-700 border">streamlit run app.py</code> in your terminal.</li>
                  </ol>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-[#161726] border border-white/10 shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#1F2034] text-xs text-slate-300 font-mono border-b border-white/10">
                    <span className="font-bold text-slate-200">Complete Unified app.py Script</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyAll(COMPLETE_APP_CODE);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                    >
                      {copiedAll ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied app.py!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs sm:text-sm text-slate-100 font-mono leading-relaxed max-h-[480px]">
                    <code>{COMPLETE_APP_CODE}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Subtext matching Image 3 style */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-xs font-mono text-slate-400">
            Showing 10 of 10 Comprehensive Steps &bull; Customized for Abdul Kalam Azad&rsquo;s Cohort
          </p>

          <div>
            <Link
              to="/abdul#application-form"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] transition-transform"
              style={{ backgroundColor: currentMember.colors.dominant }}
            >
              <span>Build Autonomous Agentic Systems with Abdul Kalam Azad &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Copy Success Toast (Mobile & Desktop) */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B2E] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-white/10 pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ChatbotChallengePage;
