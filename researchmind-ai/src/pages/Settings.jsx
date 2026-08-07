import React, { useState } from 'react';
import { Settings as SettingsIcon, Sparkles, Bell, Cpu, Key, Check, Save } from 'lucide-react';
import { useResearch } from '../context/ResearchContext';
import { aiModels } from '../utils/dummyData';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';

const Settings = () => {
  const { selectedModel, setSelectedModel } = useResearch();

  const [temperature, setTemperature] = useState(0.2);
  const [reasoningBudget, setReasoningBudget] = useState('High');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.company.com/research-events');
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" glow icon={SettingsIcon}>
            Platform Configuration
          </Badge>
        </div>
        <h1 className="text-2xl font-extrabold text-white">ResearchMind Agent Settings</h1>
        <p className="text-xs text-zinc-400">
          Configure model parameters, notification webhooks, and FastAPI backend endpoints.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Cognitive AI Model Settings */}
        <div className="p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Cpu className="w-4 h-4 text-white" />
            1. Cognitive Model & Reasoning Budget
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1.5">
                Default LLM Model
              </label>
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const m = aiModels.find((model) => model.id === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="w-full bg-[#09090B] border border-zinc-800 rounded-[14px] px-4 py-2.5 text-sm text-zinc-200"
              >
                {aiModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1.5">
                Reasoning Effort
              </label>
              <select
                value={reasoningBudget}
                onChange={(e) => setReasoningBudget(e.target.value)}
                className="w-full bg-[#09090B] border border-zinc-800 rounded-[14px] px-4 py-2.5 text-sm text-zinc-200"
              >
                <option value="Low">Low (Fast Response)</option>
                <option value="Medium">Medium (Balanced)</option>
                <option value="High">High (Deep Reflection & Graph RAG)</option>
                <option value="Maximum">Maximum (30-min Swarm)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-1.5">
              <span>Reasoning Temperature</span>
              <span className="font-mono text-white">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
            <span className="text-[11px] text-zinc-400">Lower temperature ensures zero hallucinations on literature review.</span>
          </div>
        </div>

        {/* 2. Theme & Visual Preferences */}
        <div className="p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Sparkles className="w-4 h-4 text-white" />
            2. UI Theme System
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-200">Monochrome Black & White Theme</p>
              <p className="text-xs text-zinc-400">High-contrast minimal dark mode palette.</p>
            </div>
            <Badge variant="cyan" glow>
              Active
            </Badge>
          </div>
        </div>

        {/* 3. Notifications & Webhooks */}
        <div className="p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Bell className="w-4 h-4 text-white" />
            3. Notifications & Automation
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-white"
              />
              <div>
                <span className="text-sm font-semibold text-zinc-200">Email Summaries on Task Completion</span>
                <p className="text-xs text-zinc-400">Receive PDF executive reports in your inbox as soon as agent finishes.</p>
              </div>
            </label>

            <Input
              label="Webhook URL for Event Dispatch"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hooks.yourdomain.com/events"
            />
          </div>
        </div>

        {/* 4. FastAPI Backend Connection */}
        <div className="p-6 rounded-[20px] bg-[#18181B] border border-zinc-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Key className="w-4 h-4 text-white" />
            4. FastAPI Backend Axios Endpoint
          </h3>

          <Input
            label="FastAPI Server Base URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            helperText="The frontend Axios client is configured to connect to this API endpoint."
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg" icon={saved ? Check : Save}>
            {saved ? 'Settings Saved Successfully!' : 'Save Configuration'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
