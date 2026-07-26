import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureGrid from './components/FeatureGrid';
import InstructionsSection from './components/InstructionsSection';
import WorkflowSection from './components/WorkflowSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

// Application Pages & Playground Workspaces
import AgentPlayground from './components/AgentPlayground';
import CustomSandbox from './components/CustomSandbox';
import TaskExplorer from './components/TaskExplorer';
import Analytics from './components/Analytics';
import ApiDocs from './components/ApiDocs';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [alerts, setAlerts] = useState([]);

  // Title map per tab
  const titleMap = {
    home: 'OpenEnv LABS — AI Code Review RL Benchmark',
    playground: 'Live Agent Playground — OpenEnv Benchmark',
    sandbox: 'Code Sandbox — Custom AI Code Audits',
    tasks: 'Agent Suite — OpenEnv Task Benchmark Explorer',
    analytics: 'Leaderboard & Analytics — OpenEnv Benchmark',
    apidocs: 'API Documentation & OpenAPI Spec — OpenEnv'
  };

  // Scroll to top and set document title on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = titleMap[activeTab] || titleMap.home;
    triggerAlert(`NAVIGATING TO VIEW: ${activeTab.toUpperCase()}`, 'SYS_OK');
  }, [activeTab]);

  const triggerAlert = (message, type = 'SYS_OK') => {
    const id = Date.now() + Math.random();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#E6E8EA] text-[#111111] font-mono flex flex-col transition-colors duration-300 selection:bg-[#FF5500] selection:text-white">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Router Content */}
      <main className="flex-1">
        <ErrorBoundary>
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="animate-fade-in-up">
                <HeroSection onGetStarted={() => setActiveTab('playground')} />
              </div>
              <div className="animate-fade-in-up">
                <FeatureGrid onExploreFeature={(tabId) => setActiveTab(tabId)} />
              </div>
              {/* Added Instructions Section */}
              <div className="animate-fade-in-up">
                <InstructionsSection onNavigate={(tabId) => setActiveTab(tabId)} />
              </div>
              <div className="animate-fade-in-up">
                <WorkflowSection onTryDemo={() => setActiveTab('playground')} />
              </div>
              <div className="animate-fade-in-up">
                <FaqSection />
              </div>
              <div className="animate-fade-in-up">
                <CtaSection onLaunch={() => setActiveTab('playground')} />
              </div>
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span>:: LIVE AGENT PLAYGROUND</span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO BENCHMARK
                </button>
              </div>
              <div className="animate-fade-in-up">
                <AgentPlayground onRunCompleted={() => triggerAlert("AGENT EPISODE BENCHMARKED", "SYS_ALERT")} />
              </div>
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span>:: CUSTOM CODE AUDIT SANDBOX</span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO BENCHMARK
                </button>
              </div>
              <div className="animate-fade-in-up">
                <CustomSandbox />
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span>:: OPENENV BENCHMARK TASKS</span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO BENCHMARK
                </button>
              </div>
              <div className="animate-fade-in-up">
                <TaskExplorer />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span>:: BENCHMARK LEADERBOARD & METRICS</span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO BENCHMARK
                </button>
              </div>
              <div className="animate-fade-in-up">
                <Analytics />
              </div>
            </div>
          )}

          {activeTab === 'apidocs' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span>:: OPENENV REST API & SPEC EXPLORER</span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO BENCHMARK
                </button>
              </div>
              <div className="animate-fade-in-up">
                <ApiDocs />
              </div>
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Monospace Alert Toast Overlay */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {alerts.map((alert) => {
          const isAlert = alert.type === 'SYS_ALERT';
          const isErr = alert.type === 'SYS_ERR';
          const borderClass = isErr ? 'border-rose-500 bg-[#111111] text-rose-400' : isAlert ? 'border-amber-500 bg-[#111111] text-amber-400' : 'border-[#FF5500] bg-[#111111] text-[#00FF00]';
          
          return (
            <div
              key={alert.id}
              className={`p-3 border text-xs font-mono shadow-2xl flex items-center justify-between pointer-events-auto animate-fade-in-up ${borderClass}`}
            >
              <span>[{alert.type}] {alert.message}</span>
              <button
                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                className="hover:text-white font-bold ml-4"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
