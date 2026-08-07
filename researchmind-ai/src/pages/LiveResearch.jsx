import React, { useState } from 'react';
import { useNavigate } from 'react_router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  Globe,
  BookOpen,
  Terminal,
  FileText,
  Pause,
  Play,
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { useResearch } from '../context/ResearchContext';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';

const LiveResearch = () => {
  const navigate = useNavigate();
  const { activeResearch } = useResearch();
  const [isPaused, setIsPaused] = useState(false);

  // Simulated live console log entries
  const [consoleLogs] = useState([
    '[12:44:00] INFO: Initialized 8-node cognitive agent swarm.',
    '[12:44:05] PLANNER: Decomposed topic into 6 targeted research sub-vectors.',
    '[12:44:12] SEARCH: Querying Google & Bing API... 42 URLs retrieved.',
    '[12:44:20] SCRAPER: Extracting markdown from openai.com/research.',
    '[12:44:35] GITHUB: AST parsing github.com/langchain-ai/langchain (Stars: 92k).',
    '[12:44:48] ARXIV: Ingesting preprint 2401.09823.pdf [cs.AI].',
    '[12:45:05] REFLECTION: Contradiction check across 14 sources... PASS.',
    '[12:45:20] DATA: Computing side-by-side performance matrix...',
  ]);

  const websitesScanned = [
    { title: 'OpenAI Research', url: 'https://openai.com/research', status: 'Parsed', score: '99%' },
    { title: 'GitHub Blog', url: 'https://github.blog', status: 'Parsed', score: '97%' },
    { title: 'ArXiv Org AI', url: 'https://arxiv.org/abs/2401.09823', status: 'Ingested', score: '98%' },
    { title: 'TechCrunch Enterprise', url: 'https://techcrunch.com', status: 'Parsed', score: '94%' },
  ];

  const repositoriesParsed = [
    { name: 'langchain-ai/langchain', language: 'Python', stars: '94.2k', status: 'AST Audited' },
    { name: 'Significant-Gravitas/AutoGPT', language: 'Python', stars: '168k', status: 'Benchmark Parsed' },
    { name: 'vllm-project/vllm', language: 'C++', stars: '28.5k', status: 'Latency Verified' },
  ];

  const papersProcessed = [
    { title: 'Attention Is All You Need', authors: 'Vaswani et al.', year: '2017', citations: '120k' },
    { title: 'SWE-bench: Evaluating Language Models on Real-World GitHub Issues', authors: 'Jimenez et al.', year: '2024', citations: '1.4k' },
    { title: 'Self-Consistency Improves Chain of Thought Reasoning', authors: 'Wang et al.', year: '2023', citations: '3.8k' },
  ];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-2xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" glow icon={Activity}>
              Autonomous Agent Live Console
            </Badge>
            <span className="text-xs text-zinc-400 font-mono">Run ID: #res_99847</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white">{activeResearch.topic}</h1>
          <p className="text-xs text-zinc-400">
            Goal: <span className="text-white font-semibold">{activeResearch.goal}</span> • Depth: <span className="text-zinc-200 font-semibold">{activeResearch.depth}</span>
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={isPaused ? Play : Pause}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? 'Resume Agent' : 'Pause Swarm'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={FileText}
            onClick={() => navigate('/report')}
          >
            View Generated Report
          </Button>
        </div>
      </div>

      {/* Grid Layout: Left Timeline & Live Cards, Right Console Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Timeline & Discovery Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Animated Loader Header */}
          <div className="p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Loader size="sm" text="" />
              <div>
                <h3 className="text-sm font-bold text-white">Swarm Executive Planner Running</h3>
                <p className="text-xs text-zinc-400">Executing Step 6 of 8: Data Analysis & Graph Matrix</p>
              </div>
            </div>
            <Badge variant="success" glow>
              98.4% Precision
            </Badge>
          </div>

          {/* Live Discovery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scanned Websites */}
            <div className="p-4 rounded-xl bg-[#09090B] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-white" /> Scanned Web
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">4 URLs</span>
              </div>
              <div className="space-y-2">
                {websitesScanned.map((web, idx) => (
                  <div key={idx} className="text-[11px] flex items-center justify-between">
                    <span className="text-zinc-300 truncate max-w-[100px]">{web.title}</span>
                    <span className="text-[10px] text-white font-mono">{web.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Repositories */}
            <div className="p-4 rounded-xl bg-[#09090B] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-white" /> GitHub Repos
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">3 Repos</span>
              </div>
              <div className="space-y-2">
                {repositoriesParsed.map((repo, idx) => (
                  <div key={idx} className="text-[11px] flex items-center justify-between">
                    <span className="text-zinc-300 truncate max-w-[100px]">{repo.name.split('/')[1]}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">★ {repo.stars}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Papers */}
            <div className="p-4 rounded-xl bg-[#09090B] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-white" /> ArXiv Papers
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">3 Papers</span>
              </div>
              <div className="space-y-2">
                {papersProcessed.map((paper, idx) => (
                  <div key={idx} className="text-[11px] flex items-center justify-between">
                    <span className="text-zinc-300 truncate max-w-[100px]">{paper.title}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{paper.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Terminal Log Feed */}
        <div className="lg:col-span-5 flex flex-col h-[500px] bg-[#09090B] border border-zinc-800 rounded-[20px] p-4 shadow-2xl overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
            <span className="flex items-center gap-2 text-white font-bold">
              <Terminal className="w-4 h-4" /> Agent Telemetry Console
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 text-zinc-300 pr-2">
            {consoleLogs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="leading-relaxed hover:bg-zinc-900 p-1 rounded transition-colors text-zinc-300"
              >
                <span>{log}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Status: Streaming Logs</span>
            <span className="text-white animate-pulse">● Live Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveResearch;
