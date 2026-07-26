import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, LogOut, ShieldCheck, Lock } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar({ activeTab, onNavigate, user, onLogout, onOpenAuthModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              onClick={() => onNavigate('home')}
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
                  onClick={() => onNavigate(link.id)}
                  className={`transition-colors py-1 flex items-center space-x-1 ${
                    activeTab === link.id
                      ? 'text-[#FF5500] border-b-2 border-[#FF5500]'
                      : 'hover:text-[#111111]'
                  }`}
                >
                  <span>{link.label}</span>
                  {!user && link.id !== 'home' && (
                    <Lock className="w-3 h-3 text-slate-400 group-hover:text-[#FF5500]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3 font-mono">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E5E5EA] rounded-full shadow-sm">
                    <img src={user.avatar} alt="User Avatar" className="w-4 h-4 rounded-full" />
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-2 text-slate-500 hover:text-rose-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#FF5500] transition border border-[#E5E5EA] bg-white rounded-none"
                >
                  SIGN IN
                </button>
              )}
              <button
                onClick={() => onNavigate('playground')}
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
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-mono font-bold flex items-center justify-between ${
                    activeTab === link.id ? 'text-[#FF5500]' : 'text-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {!user && link.id !== 'home' && (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              ))}
              <div className="px-4 pt-2 space-y-2">
                {user ? (
                  <div className="flex items-center justify-between p-2.5 bg-white border border-[#E5E5EA]">
                    <div className="flex items-center space-x-2">
                      <img src={user.avatar} alt="User Avatar" className="w-5 h-5 rounded-full" />
                      <span className="text-xs font-bold text-slate-800">{user.name}</span>
                    </div>
                    <button onClick={onLogout} className="text-xs text-rose-600 font-bold flex items-center space-x-1">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>LOGOUT</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuthModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-xs font-mono font-bold bg-white border border-[#E5E5EA] text-slate-800"
                  >
                    SIGN IN / REGISTER
                  </button>
                )}
                <button
                  onClick={() => {
                    onNavigate('playground');
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
    </>
  );
}

