import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Brain,
  PlusCircle,
  LayoutDashboard,
  History as HistoryIcon,
  Database,
  FileText,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useResearch } from '../context/ResearchContext';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useResearch();
  const location = useLocation();

  const navItems = [
    { name: 'New Research', path: '/new-research', icon: PlusCircle, isCta: true },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Agent', path: '/live-research', icon: Zap },
    { name: 'History', path: '/history', icon: HistoryIcon },
    { name: 'Knowledge Base', path: '/knowledge-base', icon: Database },
    { name: 'Reports', path: '/report', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#09090B] border-r border-zinc-800 transition-all duration-300 ease-in-out flex flex-col justify-between ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
          <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  ResearchMind <span className="text-white text-xs px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">AI</span>
                </span>
                <span className="text-[10px] font-medium text-zinc-400">Autonomous Agent</span>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors hidden md:block"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.isCta) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-[14px] font-bold text-sm transition-all duration-200 shadow-md ${
                    isActive
                      ? 'bg-white text-black ring-2 ring-zinc-400'
                      : 'bg-white hover:bg-zinc-200 text-black'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-inner'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Box */}
      {isSidebarOpen && (
        <div className="p-3 m-3 rounded-[14px] bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-white" /> Agent Swarm
            </span>
            <span className="text-[10px] text-white font-semibold px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
              Active
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">8 Autonomous workers ready for deep web search & AST code analysis.</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
