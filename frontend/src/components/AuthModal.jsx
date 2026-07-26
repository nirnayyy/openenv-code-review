import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowUpRight } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: name || email.split('@')[0],
              avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
            }
          }
        });
        if (error) throw error;
        
        // Notify user about confirmation email if needed
        alert("Registration successful! Check your email for confirmation link.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;

        const userObj = {
          name: data.user.user_metadata?.display_name || data.user.email.split('@')[0],
          email: data.user.email,
          avatar: data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.email}`
        };
        localStorage.setItem('openenv_user', JSON.stringify(userObj));
        if (onLoginSuccess) onLoginSuccess(userObj);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      setErrorMsg(err.message || 'OAuth authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#E6E8EA] max-w-md w-full border border-[#C8CCD0] p-6 relative shadow-2xl font-mono text-[#111111]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-[#C8CCD0] bg-[#F0F2F4] hover:bg-[#FF5500] hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 border-b border-[#C8CCD0] pb-4">
          <img
            src="/openenv_brand_logo.png"
            alt="OpenEnv AI Logo"
            className="w-12 h-12 object-contain mx-auto mb-2"
          />
          <h3 className="text-xl font-bold font-display uppercase tracking-wide text-[#111111]">
            {isSignUp ? 'CREATE LAB ACCOUNT' : 'AGENT LAB SIGN IN'}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {isSignUp
              ? 'Register your researcher profile to benchmark AI code review agents and log RL reward scores.'
              : 'Sign in to access your saved RL benchmark sessions and custom audit history.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 text-xs rounded mb-4 text-left">
            ✗ {errorMsg}
          </div>
        )}

        {/* Social Auth */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="flex items-center justify-center space-x-2 py-2 px-3 border border-[#C8CCD0] bg-[#FFFFFF] hover:border-[#FF5500] text-xs font-bold text-slate-800 transition"
          >
            <span>GOOGLE</span>
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            className="flex items-center justify-center space-x-2 py-2 px-3 border border-[#C8CCD0] bg-[#FFFFFF] hover:border-[#FF5500] text-xs font-bold text-slate-800 transition"
          >
            <span>GITHUB</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-[#C8CCD0]"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase">OR EMAIL</span>
          <div className="flex-grow border-t border-[#C8CCD0]"></div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase text-left">
                RESEARCHER NAME
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFFFFF] text-xs text-slate-900 px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500] font-mono"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase text-left">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              placeholder="researcher@openenv.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFFFF] text-xs text-slate-900 px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500] font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase text-left">
              PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFFFF] text-xs text-slate-900 px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500] font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-orange-chaingpt w-full py-3 text-xs font-bold flex items-center justify-center space-x-1.5 mt-2"
          >
            <span>{loading ? 'PROCESSING...' : isSignUp ? 'CREATE LAB ACCOUNT' : 'SIGN IN'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-600 border-t border-[#C8CCD0] pt-3">
          {isSignUp ? 'ALREADY A MEMBER? ' : "DON'T HAVE AN ACCOUNT? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FF5500] font-bold hover:underline"
          >
            {isSignUp ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </div>
      </div>
    </div>
  );
}
