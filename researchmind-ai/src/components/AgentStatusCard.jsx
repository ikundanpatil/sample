import React from 'react';
import {
  Kanban,
  Search,
  Globe,
  BookOpen,
  BarChart2,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  Activity,
  Cpu,
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useResearch } from '../context/ResearchContext';
import Badge from './Badge';

const iconMap = {
  Kanban,
  Search,
  Globe,
  Github: GithubIcon,
  BookOpen,
  BarChart2,
  RefreshCw,
  FileCheck,
};

const AgentStatusCard = () => {
  const { liveSteps } = useResearch();

  const completedCount = liveSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / liveSteps.length) * 100);

  return (
    <div className="w-full bg-[#18181B] border border-zinc-800 rounded-[14px] p-5 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Agent Workflow Pipeline</h4>
            <p className="text-[11px] text-zinc-400">8 Autonomous Cognitive Nodes</p>
          </div>
        </div>

        <Badge variant={progressPercent === 100 ? 'success' : 'info'} glow>
          {progressPercent}% Done
        </Badge>
      </div>

      {/* Progress Bar - Monochrome White */}
      <div className="w-full bg-[#09090B] rounded-full h-2 overflow-hidden p-0.5 border border-zinc-800">
        <div
          className="bg-white h-full rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Workflow Step Timeline */}
      <div className="space-y-3 relative before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-zinc-800">
        {liveSteps.map((step) => {
          const StepIcon = iconMap[step.icon] || Cpu;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div key={step.id} className="relative flex items-start gap-3 text-xs group">
              {/* Timeline Step Circle */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                  isCompleted
                    ? 'bg-zinc-800 border border-zinc-600 text-white shadow-md'
                    : isActive
                    ? 'bg-white text-black font-bold ring-4 ring-white/20 animate-pulse'
                    : 'bg-[#09090B] border border-zinc-800 text-zinc-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : isActive ? (
                  <StepIcon className="w-5 h-5 animate-spin-slow text-black" />
                ) : (
                  <StepIcon className="w-4 h-4 text-zinc-500" />
                )}
              </div>

              {/* Step Information */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-semibold text-xs ${
                      isCompleted ? 'text-zinc-200' : isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {step.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">{step.timestamp}</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{step.description}</p>

                {isActive && (
                  <div className="mt-2 p-2 rounded-lg bg-[#09090B] border border-zinc-700 text-[10px] font-mono text-zinc-200 space-y-0.5 animate-pulse">
                    {step.logs.map((log, lIdx) => (
                      <div key={lIdx}>&gt; {log}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-[#09090B] border border-zinc-800">
          <span className="text-[10px] text-zinc-400 block">Active Workers</span>
          <span className="font-bold text-white">8 Swarm Threads</span>
        </div>
        <div className="p-2 rounded-xl bg-[#09090B] border border-zinc-800">
          <span className="text-[10px] text-zinc-400 block">Reflection Checks</span>
          <span className="font-bold text-white">Zero Hallucinations</span>
        </div>
      </div>
    </div>
  );
};

export default AgentStatusCard;
