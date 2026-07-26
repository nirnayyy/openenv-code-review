import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureGrid from './components/FeatureGrid';
import InstructionsSection from './components/InstructionsSection';
import WorkflowSection from './components/WorkflowSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { supabase } from './utils/supabaseClient';
import { Lock, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';

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
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingTab, setPendingTab] = useState(null);

  // Title map per tab
  const titleMap = {
    home: 'OpenEnv LABS — AI Code Review RL Benchmark',
    playground: 'Live Agent Playground — OpenEnv Benchmark',
    sandbox: 'Code Sandbox — Custom AI Code Audits',
    tasks: 'Agent Suite — OpenEnv Task Benchmark Explorer',
    analytics: 'Leaderboard & Analytics — OpenEnv Benchmark',
    apidocs: 'API Documentation & OpenAPI Spec — OpenEnv'
  };

  // Check active session on mount & subscribe to auth state changes
  useEffect(() => {
    // 1. Check local storage fallback first for instantaneous UI hydration
    const storedUser = localStorage.getItem('openenv_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed parsing stored user:", e);
      }
    }

    // 2. Check Supabase Auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData = {
          name: session.user.user_metadata?.display_name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`
        };
        setUser(userData);
        localStorage.setItem('openenv_user', JSON.stringify(userData));
      }
    });

    // 3. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const userData = {
          name: session.user.user_metadata?.display_name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`
        };
        setUser(userData);
        localStorage.setItem('openenv_user', JSON.stringify(userData));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('openenv_user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Scroll to top and set document title on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = titleMap[activeTab] || titleMap.home;
    triggerAlert(`VIEW: ${activeTab.toUpperCase()}`, 'SYS_OK');
  }, [activeTab]);

  const triggerAlert = (message, type = 'SYS_OK') => {
    const id = Date.now() + Math.random();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 4000);
  };

  // Centralized Navigation with Auth Gating
  const handleNavigate = (tabId, reason = null) => {
    if (tabId === 'home') {
      setActiveTab('home');
      return;
    }

    if (!user) {
      setPendingTab(tabId);
      const tabLabels = {
        playground: 'Live Agent Playground',
        sandbox: 'Custom Code Sandbox',
        tasks: 'Agent Benchmark Suite',
        analytics: 'Leaderboard & Metrics',
        apidocs: 'API Specs & Documentation'
      };
      const customReason = reason || `AUTHENTICATION REQUIRED: Please sign in or register to access the ${tabLabels[tabId] || 'OpenEnv'} service.`;
      setAuthReason(customReason);
      setAuthModalOpen(true);
      triggerAlert("ACCESS RESTRICTED: Login required to use AI services.", "SYS_ALERT");
      return;
    }

    setActiveTab(tabId);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    triggerAlert(`WELCOME BACK, ${userData.name.toUpperCase()}!`, 'SYS_OK');
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase signout warning:", err);
    }
    localStorage.removeItem('openenv_user');
    setUser(null);
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    triggerAlert("SIGNED OUT: Session closed successfully.", "SYS_OK");
  };

  return (
    <div className="min-h-screen bg-[#E6E8EA] text-[#111111] font-mono flex flex-col transition-colors duration-300 selection:bg-[#FF5500] selection:text-white">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        onOpenAuthModal={() => {
          setAuthReason('Sign in to access your saved RL benchmark sessions and custom audit history.');
          setAuthModalOpen(true);
        }}
      />

      {/* Main Router Content */}
      <main className="flex-1">
        <ErrorBoundary>
          {/* LANDING PAGE - OPEN TO ALL VISITORS */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="animate-fade-in-up">
                <HeroSection onGetStarted={() => handleNavigate('playground')} />
              </div>
              <div className="animate-fade-in-up">
                <FeatureGrid onExploreFeature={(tabId) => handleNavigate(tabId)} />
              </div>
              <div className="animate-fade-in-up">
                <InstructionsSection onNavigate={(tabId) => handleNavigate(tabId)} />
              </div>
              <div className="animate-fade-in-up">
                <WorkflowSection onTryDemo={() => handleNavigate('playground')} />
              </div>
              <div className="animate-fade-in-up">
                <FaqSection />
              </div>
              <div className="animate-fade-in-up">
                <CtaSection onLaunch={() => handleNavigate('playground')} />
              </div>
            </div>
          )}

          {/* GATED SERVICE TABS - PROTECTED BY AUTH CHECK */}
          {activeTab !== 'home' && !user && (
            <div className="max-w-2xl mx-auto my-16 px-4">
              <div className="border border-[#C8CCD0] bg-[#F5F5F7] p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in-up">
                <div className="w-16 h-16 bg-amber-100 border border-amber-300 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider block">
                    :: RESTRICTED ACCESS AREA
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase tracking-wide">
                    AUTHENTICATION REQUIRED
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {authReason || "You must be signed in to run AI code review benchmarks, audit custom python snippets, or inspect agent analytics."}
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="btn-orange-chaingpt px-8 py-3.5 text-xs w-full sm:w-auto inline-flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>SIGN IN / INSTANT DEMO LOGIN</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-6 py-3.5 bg-white border border-[#C8CCD0] text-xs font-bold text-slate-800 hover:border-[#FF5500] w-full sm:w-auto transition"
                  >
                    &larr; BACK TO LANDING PAGE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PLAYGROUND (AUTHENTICATED) */}
          {activeTab === 'playground' && user && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                  <span>:: LIVE AGENT PLAYGROUND</span>
                </span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO LANDING PAGE
                </button>
              </div>
              <div className="animate-fade-in-up">
                <AgentPlayground onRunCompleted={() => triggerAlert("AGENT EPISODE BENCHMARKED", "SYS_ALERT")} />
              </div>
            </div>
          )}

          {/* SANDBOX (AUTHENTICATED) */}
          {activeTab === 'sandbox' && user && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                  <span>:: CUSTOM CODE AUDIT SANDBOX</span>
                </span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO LANDING PAGE
                </button>
              </div>
              <div className="animate-fade-in-up">
                <CustomSandbox />
              </div>
            </div>
          )}

          {/* TASKS (AUTHENTICATED) */}
          {activeTab === 'tasks' && user && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                  <span>:: OPENENV BENCHMARK TASKS</span>
                </span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO LANDING PAGE
                </button>
              </div>
              <div className="animate-fade-in-up">
                <TaskExplorer />
              </div>
            </div>
          )}

          {/* ANALYTICS (AUTHENTICATED) */}
          {activeTab === 'analytics' && user && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                  <span>:: BENCHMARK LEADERBOARD & METRICS</span>
                </span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO LANDING PAGE
                </button>
              </div>
              <div className="animate-fade-in-up">
                <Analytics />
              </div>
            </div>
          )}

          {/* API DOCS (AUTHENTICATED) */}
          {activeTab === 'apidocs' && user && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                  <span>:: OPENENV REST API & SPEC EXPLORER</span>
                </span>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-[#FF5500] hover:underline"
                >
                  &larr; BACK TO LANDING PAGE
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        reason={authReason}
      />

      {/* Footer */}
      <Footer setActiveTab={handleNavigate} />
    </div>
  );
}
