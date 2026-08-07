import React, { useState } from 'react';
import { Brain, User, Copy, Check, ExternalLink, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import Badge from './Badge';

const ChatBubble = ({ message }) => {
  const isAi = message.sender === 'ai';
  const [copied, setCopied] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 md:gap-4 my-4 max-w-4xl ${isAi ? 'self-start' : 'self-end flex-row-reverse'}`}>
      {/* Avatar Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
          isAi
            ? 'bg-white text-black border border-white font-bold'
            : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
        }`}
      >
        {isAi ? <Brain className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message Card */}
      <div className={`flex flex-col gap-2 max-w-3xl ${isAi ? 'items-start' : 'items-end'}`}>
        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">{isAi ? 'ResearchMind AI Swarm' : 'You'}</span>
          <span>•</span>
          <span>{message.time}</span>
          {isAi && message.confidence && (
            <Badge variant="success" size="sm" icon={ShieldCheck}>
              {(message.confidence * 100).toFixed(1)}% Confidence
            </Badge>
          )}
        </div>

        {/* Text Content Box */}
        <div
          className={`p-4 md:p-5 rounded-[16px] text-sm leading-relaxed shadow-lg ${
            isAi
              ? 'bg-[#18181B] border border-zinc-800 text-zinc-100 rounded-tl-none'
              : 'bg-white text-black rounded-tr-none font-medium'
          }`}
        >
          <div className="whitespace-pre-line font-sans">{message.text}</div>

          {/* Sources Section for AI Messages */}
          {isAi && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-white" /> Grounded Sources:
              </span>
              {message.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:text-white hover:border-zinc-600 transition-all"
                >
                  <span>{src.name}</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">{src.score}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Reflection Accordion & Action Controls */}
        {isAi && (
          <div className="flex flex-col gap-2 w-full">
            {message.reflectionNotes && (
              <div className="w-full rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden text-xs">
                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className="w-full flex items-center justify-between p-2.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium text-white">
                    <Brain className="w-3.5 h-3.5" /> Agent Reflection Trace
                  </span>
                  {showReflection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showReflection && (
                  <div className="p-3 border-t border-zinc-800 text-zinc-300 bg-black font-mono text-[11px] leading-relaxed">
                    {message.reflectionNotes}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 self-start">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded-md hover:bg-zinc-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
