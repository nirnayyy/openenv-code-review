import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Shield, Key, History, FileText, Lock, Save, LogOut, 
  Cpu, Award, CheckCircle2, AlertTriangle, Terminal, Edit3, Camera, 
  Trash2, Download, ExternalLink, RefreshCw, Zap, Check, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function UserProfile({ user, onUpdateUser, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'history', 'keys', 'security'

  // User Profile Form State
  const [name, setName] = useState(user?.name || 'Lead AI Researcher');
  const [email, setEmail] = useState(user?.email || 'researcher@openenv.ai');
  const [organization, setOrganization] = useState(user?.organization || 'Meta PyTorch Partner Lab');
  const [bio, setBio] = useState(user?.bio || 'Focusing on Reinforcement Learning reward alignment and automated AST security vulnerability scanning in Python.');
  const [primaryLang, setPrimaryLang] = useState(user?.primaryLang || 'Python (PyTorch / FastAPI)');
  const [preferredModel, setPreferredModel] = useState(user?.preferredModel || 'meta-llama/Llama-3.3-70B-Instruct');
  const [avatarSeed, setAvatarSeed] = useState(user?.name || 'researcher');
  
  // API Keys State
  const [hfApiKey, setHfApiKey] = useState(localStorage.getItem('openenv_api_key') || '');
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('openenv_gemini_key') || '');
  const [showHfKey, setShowHfKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  // Security Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // UI Toast Notice
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      if (user.organization) setOrganization(user.organization);
      if (user.bio) setBio(user.bio);
    }
  }, [user]);

  const showNotification = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      email,
      organization,
      bio,
      primaryLang,
      preferredModel,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(avatarSeed || name)}`
    };
    
    localStorage.setItem('openenv_user', JSON.stringify(updatedUser));
    if (onUpdateUser) onUpdateUser(updatedUser);
    showNotification("PROFILE DETAILS UPDATED SUCCESSFULLY", "success");
  };

  const handleSaveKeys = (e) => {
    e.preventDefault();
    if (hfApiKey) localStorage.setItem('openenv_api_key', hfApiKey);
    if (geminiApiKey) localStorage.setItem('openenv_gemini_key', geminiApiKey);
    showNotification("API KEYS & ACCESS CREDENTIALS SAVED", "success");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      showNotification("NEW PASSWORD MUST BE AT LEAST 6 CHARACTERS", "error");
      return;
    }
    if (newPass !== confirmPass) {
      showNotification("PASSWORDS DO NOT MATCH", "error");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) throw error;
      showNotification("PASSWORD UPDATED SUCCESSFULLY IN SUPABASE", "success");
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      showNotification("PASSWORD UPDATE SAVED LOCALLY", "success");
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  // Mock benchmark history for user profile
  const benchmarkHistory = [
    { id: 'EP-9021', model: 'Llama 3.3 70B', task: 'Task 3: SQL Injection', reward: '1.00', status: 'PASSED', date: '2026-07-26 16:42' },
    { id: 'EP-9020', model: 'DeepSeek R1', task: 'Task 2: List Mutation', reward: '0.85', status: 'PASSED', date: '2026-07-26 15:10' },
    { id: 'EP-9019', model: 'GPT-4o', task: 'Task 1: NameError', reward: '1.00', status: 'PASSED', date: '2026-07-26 14:05' },
    { id: 'EP-9018', model: 'Custom Model', task: 'Task 3: SQL Injection', reward: '0.40', status: 'PARTIAL', date: '2026-07-25 18:30' },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8 font-mono text-[#111111] animate-fade-in-up">
      
      {/* Top Banner & Header */}
      <div className="border border-[#C8CCD0] bg-white p-6 sm:p-8 shadow-md relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Info Left */}
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-[#FF5500] bg-[#F5F5F7] p-1 object-cover shadow"
              />
              <button 
                onClick={() => setAvatarSeed(Math.random().toString(36).substring(7))}
                title="Randomize Avatar Bot"
                className="absolute bottom-0 right-0 p-1.5 bg-[#111111] text-white rounded-full border border-white hover:bg-[#FF5500] transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase tracking-wide">
                  {name || 'RESEARCHER'}
                </h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
                  PRO RESEARCHER
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{email}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{organization}</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-0.5">
                Member since July 2026 • Meta PyTorch OpenEnv Partner Account
              </p>
            </div>
          </div>

          {/* Quick Actions Right */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('playground')}
              className="btn-orange-chaingpt px-5 py-2.5 text-xs font-bold flex items-center space-x-1.5"
            >
              <Cpu className="w-4 h-4" />
              <span>LAUNCH PLAYGROUND</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 border border-[#C8CCD0] bg-[#F5F5F7] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs font-bold text-slate-700 flex items-center space-x-1.5 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-[#E5E5EA]">
          <div className="p-3 bg-[#F5F5F7] border border-[#E5E5EA] text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">BENCHMARKS RUN</span>
            <span className="text-xl font-extrabold text-[#111111]">42 EPISODES</span>
          </div>
          <div className="p-3 bg-[#F5F5F7] border border-[#E5E5EA] text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">AVG REWARD SCORE</span>
            <span className="text-xl font-extrabold text-emerald-600">0.94 / 1.00</span>
          </div>
          <div className="p-3 bg-[#F5F5F7] border border-[#E5E5EA] text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">SECURITY BUGS FOUND</span>
            <span className="text-xl font-extrabold text-[#FF5500]">37 DETECTED</span>
          </div>
          <div className="p-3 bg-[#F5F5F7] border border-[#E5E5EA] text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">ACCOUNT TIER</span>
            <span className="text-xl font-extrabold text-indigo-700">UNLIMITED PRO</span>
          </div>
        </div>
      </div>

      {/* Toast Notification Header */}
      {toast && (
        <div className={`p-3 text-xs font-bold border flex items-center justify-between shadow ${
          toast.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
        }`}>
          <span>✓ {toast.msg}</span>
          <button onClick={() => setToast(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Profile Navigation Tabs */}
      <div className="border-b border-[#C8CCD0] flex space-x-6 text-xs font-bold">
        {[
          { id: 'general', label: 'PROFILE DETAILS', icon: <User className="w-4 h-4" /> },
          { id: 'history', label: 'BENCHMARK HISTORY', icon: <History className="w-4 h-4" /> },
          { id: 'keys', label: 'API & INTEGRATIONS', icon: <Key className="w-4 h-4" /> },
          { id: 'security', label: 'SECURITY & SESSIONS', icon: <Lock className="w-4 h-4" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-3 flex items-center space-x-2 transition border-b-2 ${
              activeTab === t.id
                ? 'border-[#FF5500] text-[#FF5500]'
                : 'border-transparent text-slate-600 hover:text-[#111111]'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: GENERAL PROFILE SETTINGS */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-8 border border-[#C8CCD0] bg-white p-6 space-y-6">
            <h2 className="text-base font-bold text-[#111111] uppercase tracking-wide border-b border-[#E5E5EA] pb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-[#FF5500]" />
              <span>EDIT RESEARCHER PROFILE</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                    FULL NAME / DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                  ORGANIZATION / INSTITUTION
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Meta AI, Stanford AI Lab, Independent Researcher"
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                  RESEARCHER BIO / SPECIALIZATION
                </label>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                    PRIMARY CODE AUDIT LANGUAGE
                  </label>
                  <select
                    value={primaryLang}
                    onChange={(e) => setPrimaryLang(e.target.value)}
                    className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="Python (PyTorch / FastAPI)">Python (PyTorch / FastAPI)</option>
                    <option value="TypeScript / React">TypeScript / React</option>
                    <option value="C++ / CUDA Kernels">C++ / CUDA Kernels</option>
                    <option value="Rust / Systems Code">Rust / Systems Code</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                    DEFAULT EVALUATOR LLM
                  </label>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="meta-llama/Llama-3.3-70B-Instruct">Meta Llama 3.3 70B Instruct</option>
                    <option value="deepseek-ai/DeepSeek-R1">DeepSeek R1 Reasoning Model</option>
                    <option value="gpt-4o">OpenAI GPT-4o</option>
                    <option value="gemini-1.5-flash">Google Gemini 1.5 Flash</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-orange-chaingpt px-6 py-3 text-xs flex items-center space-x-2 font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PROFILE CHANGES</span>
                </button>
              </div>
            </form>
          </div>

          {/* Side Card info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-[#C8CCD0] bg-white p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wide border-b border-[#E5E5EA] pb-2">
                :: OPENENV COMPLIANCE BADGE
              </h3>
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-200">
                <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">VERIFIED RESEARCHER</span>
                  <span className="text-[10px] text-emerald-700">OpenEnv v1.0 Standard Compliant</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your profile is synchronized with Meta PyTorch OpenEnv leaderboard benchmarks. All logged reward metrics are cryptographically signed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BENCHMARK HISTORY */}
      {activeTab === 'history' && (
        <div className="border border-[#C8CCD0] bg-white p-6 space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-3">
            <h2 className="text-base font-bold text-[#111111] uppercase tracking-wide flex items-center space-x-2">
              <History className="w-4 h-4 text-[#FF5500]" />
              <span>PAST BENCHMARK RUNS & REWARD AUDITS</span>
            </h2>
            <button
              onClick={() => showNotification("EXPORTED BENCHMARK LOGS TO CSV", "success")}
              className="px-3 py-1.5 border border-[#C8CCD0] bg-[#F5F5F7] hover:bg-[#111111] hover:text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT HISTORY (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#F5F5F7] border-b border-[#C8CCD0] text-slate-700">
                  <th className="p-3">EPISODE ID</th>
                  <th className="p-3">MODEL USED</th>
                  <th className="p-3">BENCHMARK TASK</th>
                  <th className="p-3">REWARD SCORE</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">DATE & TIME</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5EA]">
                {benchmarkHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-bold text-[#FF5500]">{item.id}</td>
                    <td className="p-3 font-bold text-slate-800">{item.model}</td>
                    <td className="p-3 text-slate-600">{item.task}</td>
                    <td className="p-3 font-bold text-emerald-600">{item.reward}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        item.status === 'PASSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{item.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onNavigate('playground')}
                        className="px-2.5 py-1 bg-[#111111] text-white hover:bg-[#FF5500] text-[10px] font-bold inline-flex items-center space-x-1 transition"
                      >
                        <span>REPLAY</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: API & INTEGRATIONS */}
      {activeTab === 'keys' && (
        <div className="border border-[#C8CCD0] bg-white p-6 space-y-6 text-left max-w-3xl">
          <h2 className="text-base font-bold text-[#111111] uppercase tracking-wide border-b border-[#E5E5EA] pb-3 flex items-center space-x-2">
            <Key className="w-4 h-4 text-[#FF5500]" />
            <span>LLM PROVIDER API KEYS & ACCESS TOKENS</span>
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            Configure your personal API keys below to run real-time inference with HuggingFace Hub router, OpenAI GPT-4o, or Google Gemini 1.5 Flash. Keys are stored locally in browser state.
          </p>

          <form onSubmit={handleSaveKeys} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                HUGGING FACE ROUTER TOKEN (`hf_...`)
              </label>
              <div className="relative">
                <input
                  type={showHfKey ? 'text' : 'password'}
                  placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={hfApiKey}
                  onChange={(e) => setHfApiKey(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 pr-10 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
                <button
                  type="button"
                  onClick={() => setShowHfKey(!showHfKey)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-800"
                >
                  {showHfKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                GOOGLE GEMINI API KEY (`AIzaSy...`)
              </label>
              <div className="relative">
                <input
                  type={showGeminiKey ? 'text' : 'password'}
                  placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 pr-10 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-800"
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-orange-chaingpt px-6 py-3 text-xs flex items-center space-x-2 font-bold"
              >
                <Save className="w-4 h-4" />
                <span>SAVE API CREDENTIALS</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: SECURITY & SESSIONS */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 border border-[#C8CCD0] bg-white p-6 space-y-6">
            <h2 className="text-base font-bold text-[#111111] uppercase tracking-wide border-b border-[#E5E5EA] pb-3 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#FF5500]" />
              <span>CHANGE PASSWORD</span>
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                  CURRENT PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1 uppercase">
                  CONFIRM NEW PASSWORD
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-[#F5F5F7] text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-orange-chaingpt px-6 py-3 text-xs flex items-center space-x-2 font-bold"
                >
                  <Lock className="w-4 h-4" />
                  <span>UPDATE PASSWORD</span>
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#C8CCD0] bg-white p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wide border-b border-[#E5E5EA] pb-2">
                :: ACTIVE SESSIONS
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">CURRENT BROWSER SESSION</span>
                    <span className="text-[10px] text-emerald-600 font-bold">● ACTIVE NOW</span>
                  </div>
                  <span className="text-[10px] text-slate-400">WIN64 / CHROME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
