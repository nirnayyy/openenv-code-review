import React from 'react';
import { ArrowUpRight, Cpu, ShieldCheck, Zap, Flame } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative py-12 md:py-20 bg-[#F5F5F7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up">
            <span className="px-4 py-1.5 bg-white border border-[#E5E5EA] rounded-full text-xs font-bold text-[#FF5500] uppercase tracking-wider inline-flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI CODE REVIEW BENCHMARK SYSTEM</span>
            </span>

            {/* Serif Typography matching video */}
            <h1 className="text-5xl sm:text-7xl font-extrabold text-[#111111] leading-none tracking-tight">
              The AI Code Review <span className="font-serif italic font-normal text-slate-800">Journey</span> Starts Here
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-mono max-w-lg">
              Empowering AI agents with real-time reinforcement learning code audits, safety grading, security shields, and AST bug checkmarks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="btn-orange-chaingpt px-8 py-4 text-xs flex items-center justify-center space-x-2"
              >
                <span>RUN BENCHMARK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <a
                href="#features"
                className="px-8 py-4 bg-white border border-[#E5E5EA] hover:border-[#FF5500] rounded-full text-xs font-bold text-slate-800 flex items-center justify-center transition"
              >
                EXPLORE SPEC
              </a>
            </div>

            {/* Left mini floating stats row matching video */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="floating-card p-4 border border-[#E5E5EA] flex items-center space-x-3 bg-white">
                <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5500]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">REWARD TARGET</span>
                  <span className="text-sm font-bold text-slate-800">1.00 MAX</span>
                </div>
              </div>

              <div className="floating-card p-4 border border-[#E5E5EA] flex items-center space-x-3 bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">AUDIT LATENCY</span>
                  <span className="text-sm font-bold text-slate-800">0.4 SEC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Center PC Screen Mockup & Floating Badges matching video) */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[600px] animate-fade-in-up">
            
            {/* Ambient visual aura */}
            <div className="absolute w-96 h-96 rounded-full bg-[#FF5500]/5 blur-3xl -z-10"></div>

            {/* Left Floating Card: Davis Korsgaard Coach Card matching video */}
            <div className="absolute -top-6 left-0 sm:left-4 z-10 floating-card p-4 border border-[#E5E5EA] flex items-center space-x-3 bg-white w-56">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=davis"
                alt="Llama Agent"
                className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E5EA]"
              />
              <div className="text-left">
                <h4 className="text-[11px] font-bold text-slate-800 uppercase font-mono">Llama-3.3-70B</h4>
                <p className="text-[9px] text-slate-500 font-mono">AI Auditor of the Year</p>
              </div>
            </div>

            {/* Right Floating Card: Stats matching video */}
            <div className="absolute -bottom-6 right-0 sm:right-4 z-10 floating-card p-4 border border-[#E5E5EA] flex items-center space-x-3 bg-white w-52">
              <div className="p-2 bg-emerald-50 rounded-full text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <h4 className="text-[11px] font-bold text-slate-800">AST CODE SHIELD</h4>
                <p className="text-[9px] text-slate-500">Security shield active</p>
              </div>
            </div>

            {/* Center PC Screen Container */}
            <div className="pc-screen-mockup">
              {/* PC Header Bar */}
              <div className="pc-screen-header justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">openenv_dashboard.py</span>
                <span className="w-8"></span>
              </div>

              {/* PC Screen Content (Split View: Editor + Console) */}
              <div className="pc-screen-content grid grid-cols-12 h-full">
                
                {/* Editor Sidebar (3 cols) */}
                <div className="col-span-3 border-r border-[#E5E5EA] bg-white p-3 space-y-3 font-mono text-[9px] text-left">
                  <span className="font-bold text-slate-400 block uppercase">FILES</span>
                  <ul className="space-y-1.5 text-slate-600 font-medium">
                    <li className="text-[#FF5500] font-bold">✓ main.py</li>
                    <li>✗ test_ast.py</li>
                    <li>✓ grader.py</li>
                    <li>✓ models.py</li>
                  </ul>
                </div>

                {/* Editor Content Area (9 cols) */}
                <div className="col-span-9 p-4 flex flex-col justify-between space-y-4">
                  {/* Greeting header */}
                  <div className="flex justify-between items-center border-b border-[#E5E5EA] pb-2">
                    <div className="text-left">
                      <span className="text-[9px] text-slate-400 uppercase font-mono">SYS_VER: 1.0.0 //</span>
                      <h3 className="text-sm font-bold text-slate-800 font-mono">Hey, Agent!</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Program Card */}
                  <div className="bg-[#111111] text-white p-4 rounded-xl space-y-2.5 text-left font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] px-2 py-0.5 bg-white/10 rounded-full uppercase tracking-wider">Beginner RL</span>
                      <span className="text-[10px] text-[#FF5500] font-bold">85% Reward</span>
                    </div>
                    <h4 className="text-xs font-bold">5-Day Reward Optimization Boost</h4>
                    <div className="flex space-x-2 text-[9px]">
                      <span className="px-2.5 py-1 bg-white border border-[#E5E5EA] text-slate-800 rounded-full">Security</span>
                      <span className="px-2.5 py-1 bg-white border border-[#E5E5EA] text-slate-800 rounded-full">Logic Checks</span>
                    </div>
                  </div>

                  {/* Execution Progress Bar */}
                  <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-slate-500">Benchmark Progress</span>
                      <span className="text-[#FF5500] font-bold">3 of 3 tasks running</span>
                    </div>
                    <div className="w-full bg-[#F5F5F7] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF5500] h-full rounded-full w-[85%]"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
