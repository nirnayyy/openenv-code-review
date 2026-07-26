import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  Code, 
  BarChart3, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Flame,
  ShieldAlert
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [health, setHealth] = useState({ status: 'checking', environment: 'code-review-openenv' });

  useEffect(() => {
    fetch('/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setHealth({ status: 'offline', environment: 'code-review-openenv' }));
  }, []);

  const tabs = [
    { id: 'playground', label: 'Agent Playground', icon: Play },
    { id: 'sandbox', label: 'Custom Code Sandbox', icon: Code },
    { id: 'tasks', label: 'Task Explorer', icon: ShieldAlert },
    { id: 'analytics', label: 'Benchmark Leaderboard', icon: BarChart3 },
    { id: 'apidocs', label: 'OpenEnv API & Spec', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-600 via-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  OpenEnv Code Reviewer
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full">
                  Meta OpenEnv Hackathon
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                RL Environment for AI Code Understanding & Vulnerability Audit
              </p>
            </div>
          </div>

          {/* Environment Health Indicator */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
              <span className="relative flex h-2 w-2">
                {health.status === 'healthy' ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                )}
              </span>
              <span className="text-slate-300 font-mono">
                {health.status === 'healthy' ? 'Env Online :8000' : 'Env Connecting...'}
              </span>
            </div>

            <a
              href="https://github.com/meta-pytorch/OpenEnv"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>PyTorch OpenEnv Spec</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
