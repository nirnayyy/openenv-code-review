import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { supabase } from '../utils/supabaseClient';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          name: session.user.user_metadata?.display_name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`
        });
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser({
          name: session.user.user_metadata?.display_name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('openenv_user');
    setUser(null);
  };

  const navLinks = [
    { id: 'home', label: 'Benchmark Setup' },
    { id: 'playground', label: 'Playground' },
    { id: 'sandbox', label: 'Code Sandbox' },
    { id: 'tasks', label: 'Agent Suite' },
    { id: 'analytics', label: 'Leaderboard' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F5F7]/95 backdrop-blur-md border-b border-[#E5E5EA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2 focus:outline-none group"
            >
              <img
                src="/openenv_brand_logo.png"
                alt="OpenEnv AI Logo"
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-base text-[#111111] tracking-widest uppercase">
                OpenEnv <span className="text-[#FF5500]">LABS</span>
              </span>
            </button>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold font-mono text-slate-700">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`transition-colors py-1 ${
                    activeTab === link.id
                      ? 'text-[#FF5500] border-b-2 border-[#FF5500]'
                      : 'hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Button */}
            <div className="hidden sm:flex items-center space-x-3 font-mono">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E5E5EA] rounded-full">
                    <img src={user.avatar} alt="User Avatar" className="w-4 h-4 rounded-full" />
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[90px]">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-500 hover:text-rose-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#FF5500] transition"
                >
                  SIGN IN
                </button>
              )}
              <button
                onClick={() => setActiveTab('playground')}
                className="btn-orange-chaingpt px-6 py-2.5 text-xs"
              >
                Run Benchmark
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-[#E5E5EA] space-y-2 bg-[#F5F5F7]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-mono font-bold ${
                    activeTab === link.id ? 'text-[#FF5500]' : 'text-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2 space-y-2">
                {user ? (
                  <div className="flex items-center justify-between p-2 bg-white border border-[#E5E5EA] rounded-xl">
                    <div className="flex items-center space-x-2">
                      <img src={user.avatar} alt="User Avatar" className="w-5 h-5 rounded-full" />
                      <span className="text-xs font-bold text-slate-800">{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-xs text-rose-600 font-bold">
                      SIGN OUT
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-xs font-mono font-bold bg-white border border-[#E5E5EA] text-slate-800"
                  >
                    SIGN IN
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveTab('playground');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-orange-chaingpt py-2.5 text-xs"
                >
                  Run Benchmark
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}
