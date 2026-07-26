import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, LogOut, ShieldCheck, Lock, User, Sun, Moon } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar({ activeTab, onNavigate, user, onLogout, onOpenAuthModal, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Benchmark Setup' },
    { id: 'playground', label: 'Playground' },
    { id: 'sandbox', label: 'Code Sandbox' },
    { id: 'tasks', label: 'Agent Suite' },
    { id: 'analytics', label: 'Leaderboard' },
  ];

  if (user) {
    navLinks.push({ id: 'profile', label: 'Profile' });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F5F7]/95 dark:bg-[#0A0C0E]/95 backdrop-blur-md border-b border-[#E5E5EA] dark:border-[#262C36] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 focus:outline-none group"
            >
              <img
                src="/openenv_brand_logo.png"
                alt="OpenEnv AI Logo"
                className="w-8 h-8 object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-base text-[#111111] dark:text-[#F3F4F6] tracking-widest uppercase font-display">
                OpenEnv <span className="text-[#FF5500]">LABS</span>
              </span>
            </button>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`transition-colors py-1 flex items-center space-x-1 ${
                    activeTab === link.id
                      ? 'text-[#FF5500] border-b-2 border-[#FF5500]'
                      : 'hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {!user && link.id !== 'home' && (
                    <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-[#FF5500]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3 font-mono">
              {/* Dark / Light Mode Toggle Button */}
              <button
                onClick={onToggleTheme}
                title={theme === 'dark' ? "Click to switch to Bright Light Mode" : "Click to switch to Dark Cyber Mode"}
                className="p-2 border border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] text-slate-700 dark:text-slate-200 hover:border-[#FF5500] dark:hover:border-[#FF5500] transition rounded-full flex items-center justify-center space-x-1.5 px-3"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase">DARK MODE</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">LIGHT MODE</span>
                  </>
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigate('profile')}
                    className={`flex items-center space-x-2 px-3 py-1.5 border rounded-full shadow-sm transition ${
                      activeTab === 'profile'
                        ? 'bg-orange-50 dark:bg-orange-950/40 border-[#FF5500] text-[#FF5500]'
                        : 'bg-white dark:bg-[#181C22] border-[#E5E5EA] dark:border-[#262C36] hover:border-[#FF5500] text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <img src={user.avatar} alt="User Avatar" className="w-4 h-4 rounded-full" />
                    <span className="text-xs font-bold truncate max-w-[110px]">{user.name}</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#FF5500] dark:hover:text-[#FF5500] transition border border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] rounded-none"
                >
                  SIGN IN
                </button>
              )}
              <button
                onClick={() => onNavigate('playground')}
                className="btn-orange-chaingpt px-6 py-2.5 text-xs shadow"
              >
                Run Benchmark
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onToggleTheme}
                className="p-2 text-slate-800 dark:text-slate-200"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 dark:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-[#E5E5EA] dark:border-[#262C36] space-y-2 bg-[#F5F5F7] dark:bg-[#121519]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-mono font-bold flex items-center justify-between ${
                    activeTab === link.id ? 'text-[#FF5500]' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {!user && link.id !== 'home' && (
                    <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </button>
              ))}
              <div className="px-4 pt-2 space-y-2">
                {user ? (
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#181C22] border border-[#E5E5EA] dark:border-[#262C36]">
                    <button 
                      onClick={() => {
                        onNavigate('profile');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-left"
                    >
                      <img src={user.avatar} alt="User Avatar" className="w-5 h-5 rounded-full" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.name} (View Profile)</span>
                    </button>
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
                    className="w-full py-2.5 text-xs font-mono font-bold bg-white dark:bg-[#181C22] border border-[#E5E5EA] dark:border-[#262C36] text-slate-800 dark:text-slate-200"
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



