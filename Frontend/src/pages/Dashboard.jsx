import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Building2,
  TrendingUp,
  Database,
  FileText,
  Sparkles,
  Paperclip,
  Globe,
  Zap,
} from 'lucide-react';
import { useResearch } from '../context/ResearchContext';
import ChatBubble from '../components/ChatBubble';
import AgentStatusCard from '../components/AgentStatusCard';
import Button from '../components/Button';
import { promptSuggestions } from '../utils/dummyData';

const iconComponents = {
  Building2,
  TrendingUp,
  Database,
  FileText,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { chatMessages, addChatMessage, triggerResearch } = useResearch();
  const [inputText, setInputText] = useState('');
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addChatMessage(inputText);
    setInputText('');
  };

  const handleSuggestionClick = (card) => {
    triggerResearch({
      topic: card.title + ': ' + card.description,
      goal: card.category,
      depth: card.depth,
      sources: ['Websites', 'GitHub', 'Research Papers', 'News'],
      outputFormat: 'Report',
    });
    navigate('/live-research');
  };

  return (
    <div className="w-full h-screen flex justify-between gap-2 grid-cols-1 lg:grid-cols-12 items-start">
      <div className="w-[70%] h-screen">
      {/* CENTER COLUMN: ChatGPT/Perplexity Style Interface */}
      <div className="lg:col-span-8  p-10 h-[80%] flex flex-col   rounded-[20px] shadow-2xl overflow-hidden">
        {/* Chat Scrollable Container */}
        <div className="flex-1 bg-[#000000] h-screen overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Hero Welcome Message */}
         
          <div className="text-center py-6 space-y-3 max-w-xl mx-auto">
            <div className="flex justify-center items-center">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
              
           
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              How can ResearchMind AI help your research today?
            </h2>
            <p className="text-xs md:text-sm text-[#8e8d8d]">
              Enter any technical topic, market audit, or repository link to deploy our autonomous agent swarm.
            </p>
          </div>
         
          
          {/* Chat Messages List */}
           
        </div>
          
        

        {/* Bottom Research Input Container */}
        
          <form onSubmit={handleSend} className="relative">
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Ask any research question or paste GitHub/ArXiv URL... (Press Enter to submit)"
              className="w-full bg-[#18181B] border border-zinc-800 rounded-2xl pl-4 pr-12 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 resize-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-3 bottom-4.5 p-2 rounded-xl bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-md font-bold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
            </div>
          {/* Quick Input Toolbar */}
          
        
        </div>
        <div className="w-[30%] h-full overflow-y-auto">
          <div className="lg:col-span-4 space-y-4 w-full">
            <AgentStatusCard />
          </div>
        </div>
        
        
        {/* RIGHT PANEL: Agent Status Card */}
        
      </div>

    
  
  );
};

export default Dashboard;
