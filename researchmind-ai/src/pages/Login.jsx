import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Lock, Mail, Sparkles, Cpu, Network, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah.connor@researchmind.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await authAPI.login({ email, password });
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#18181B] border border-zinc-800 rounded-[24px] p-6 lg:p-12 shadow-2xl">
      {/* Left Form Section */}
      <div className="space-y-8 max-w-md mx-auto w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              ResearchMind <span className="text-white text-xs px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">v2.6</span>
            </h1>
            <p className="text-xs text-zinc-400">Autonomous Agent Platform</p>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Research Intelligence
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            AI agents that search, analyze and generate deep research reports automatically.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Email Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-white" />
              Remember me for 30 days
            </label>
            <a href="#forgot" className="text-white hover:underline font-medium">Forgot password?</a>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading} icon={ArrowRight}>
            Log In to Workspace
          </Button>

          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
            <span className="relative bg-[#18181B] px-3 text-xs text-zinc-500 font-mono">OR CONTINUE WITH</span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-[14px] bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-200 text-sm font-semibold transition-all cursor-pointer"
          >
            <span className="font-mono text-xs border border-zinc-700 rounded px-1.5 py-0.5">G</span>
            Google Single Sign-On
          </button>
        </form>

        <p className="text-xs text-center text-zinc-400">
          Enterprise Security Standard • AES-256 Vector Encryption
        </p>
      </div>

      {/* Right Side: Animated AI Neural Network Illustration (Monochrome Black & White) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#09090B] border border-zinc-800 rounded-[20px] min-h-[500px] overflow-hidden">
        {/* Central Brain Container */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Rotating Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-zinc-700"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-zinc-800 border-t-white"
          />

          {/* Central AI Brain Node */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-2xl bg-white p-0.5 shadow-xl flex items-center justify-center z-10"
          >
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Brain className="w-12 h-12 text-white animate-pulse" />
            </div>
          </motion.div>

          {/* Floating Research Nodes */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -left-4 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs shadow-xl flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-white" />
            <div>
              <p className="font-semibold text-zinc-200">ArXiv Papers</p>
              <span className="text-[10px] text-zinc-400">42 Ingested</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs shadow-xl flex items-center gap-2"
          >
            <Network className="w-4 h-4 text-white" />
            <div>
              <p className="font-semibold text-zinc-200">GitHub Repos</p>
              <span className="text-[10px] text-zinc-400">AST Parsed</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [-6, 6, -6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -right-12 p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-[11px] shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span className="text-zinc-300">Self-Reflection 99.8%</span>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-10 text-center space-y-2 z-10 max-w-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Self-Evolving Reasoner
          </span>
          <p className="text-xs text-zinc-400 leading-snug">
            Equipped with reflection loops, vector graph memory, and live automated code execution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
