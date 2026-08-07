import React from 'react';
import { Award, Compass, Database, CheckCircle2, User, Mail, Shield } from 'lucide-react';
import { userProfile } from '../utils/dummyData';
import Badge from '../components/Badge';

const iconMap = {
  Award,
  Compass,
  Database,
  CheckCircle2,
};

const Profile = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
      {/* User Header Profile Card (Photo removed, replaced with Profile Logo Badge) */}
      <div className="p-6 md:p-8 rounded-[24px] bg-[#18181B] border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        {/* Profile Logo Badge Container (No Photo) */}
        <div className="w-24 h-24 rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white shadow-xl flex-shrink-0">
          <User className="w-12 h-12 text-white" />
        </div>

        {/* User Info */}
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">{userProfile.name}</h1>
              <p className="text-sm text-zinc-300 font-semibold">{userProfile.role}</p>
            </div>
            <Badge variant="cyan" glow>
              Enterprise Plan
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-zinc-400 font-mono pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              {userProfile.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              {userProfile.organization}
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[18px] bg-[#18181B] border border-zinc-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Total Research</span>
          <span className="text-2xl font-extrabold text-white">{userProfile.stats.totalResearch}</span>
          <span className="text-[11px] text-zinc-400 font-mono block">↑ 14% this month</span>
        </div>

        <div className="p-5 rounded-[18px] bg-[#18181B] border border-zinc-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Reports Generated</span>
          <span className="text-2xl font-extrabold text-white">{userProfile.stats.reportsGenerated}</span>
          <span className="text-[11px] text-zinc-400 font-mono block">100% PDF Exported</span>
        </div>

        <div className="p-5 rounded-[18px] bg-[#18181B] border border-zinc-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Knowledge Items</span>
          <span className="text-2xl font-extrabold text-white">{userProfile.stats.knowledgeItems}</span>
          <span className="text-[11px] text-zinc-400 font-mono block">1536-dim Embeddings</span>
        </div>

        <div className="p-5 rounded-[18px] bg-[#18181B] border border-zinc-800 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Compute GPU Hours</span>
          <span className="text-2xl font-extrabold text-white">{userProfile.stats.computeHours}</span>
          <span className="text-[11px] text-zinc-400 font-mono block">NVIDIA H100 Swarm</span>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="p-6 rounded-[24px] bg-[#18181B] border border-zinc-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              Researcher Badges & Achievements
            </h2>
            <p className="text-xs text-zinc-400">Milestones unlocked through autonomous research activities.</p>
          </div>
          <Badge variant="cyan" size="sm">
            4 / 4 Unlocked
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userProfile.achievements.map((ach, idx) => {
            const IconComponent = iconMap[ach.icon] || Award;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#09090B] border border-zinc-800 flex items-start gap-3.5 hover:border-zinc-600 transition-all"
              >
                <div className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-zinc-200">{ach.title}</h4>
                    <span className="text-[10px] text-white font-semibold px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                      {ach.date}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
