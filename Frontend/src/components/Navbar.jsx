import React, { useState } from 'react';
import { Search, Bell, Sparkles, ChevronDown, User, LogOut, Settings as SettingsIcon, Menu } from 'lucide-react';
import { useResearch } from '../context/ResearchContext';
import { aiModels, userProfile } from '../utils/dummyData';
import Badge from './Badge';

const Navbar = () => {
  const { selectedModel, setSelectedModel, isSidebarOpen, setIsSidebarOpen } = useResearch();
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'Deep Research Task "Self-Evolving Agents" completed successfully.', time: '2m ago' },
    { id: 2, text: 'Vector index updated with 12 new ArXiv paper embeddings.', time: '1h ago' },
    { id: 3, text: 'Agent Reflection Loop achieved 99.8% citation accuracy.', time: '3h ago' },
  ];

  return (
    <header className="h-16 border-b bg-[#050505] border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Search Bar & Mobile Menu Toggle */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Model Indicator Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs text-zinc-200 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline font-medium">{selectedModel.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showModelDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#18181B] border border-zinc-800 rounded-[14px] shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold text-zinc-400 px-3 py-1.5 uppercase tracking-wider">
                Select Cognitive Model
              </div>
              {aiModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model);
                    setShowModelDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    selectedModel.id === model.id ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-[10px] text-zinc-400">{model.provider}</span>
                  </div>
                  <Badge variant="cyan" size="sm">
                    {model.badge}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#18181B] border border-zinc-800 rounded-[14px] shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
                <span className="text-xs font-semibold text-zinc-200">Notifications</span>
                <span className="text-[10px] text-white font-medium">Mark all read</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs space-y-1">
                    <p className="text-zinc-200 leading-snug">{n.text}</p>
                    <span className="text-[10px] text-zinc-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu with Profile Account Icon (No Photo) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-2 cursor-pointer focus:outline-none"
          >
            {/* Profile Account Icon Badge Container */}
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-sm hover:border-white transition-all">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:inline text-xs font-semibold text-zinc-200">{userProfile.name}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#18181B] border border-zinc-800 rounded-[14px] shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                <p className="text-xs font-semibold text-white">{userProfile.name}</p>
                <p className="text-[11px] text-zinc-400 truncate">{userProfile.email}</p>
              </div>
              <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800">
                <User className="w-3.5 h-3.5" /> Profile & Compute
              </a>
              <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800">
                <SettingsIcon className="w-3.5 h-3.5" /> Agent Settings
              </a>
              <a href="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800">
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
