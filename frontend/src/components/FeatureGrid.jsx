import React from 'react';
import { ArrowUpRight, CheckCircle, Zap, FileCode, Flame, ShieldCheck, Activity } from 'lucide-react';

export default function FeatureGrid({ onExploreFeature }) {
  return (
    <section className="py-12 md:py-20 bg-white" id="features">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customized Reviews Section matching video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-slate-400 font-mono block uppercase">:: TARGET OBJECTIVES</span>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] leading-tight">
              Customized Reviews <span className="font-serif italic font-normal text-slate-700">for You</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-mono">
              Individualized reinforcement learning programs are tailored specifically to your codebase goals. We ensure every line of code meets strict safety, logic, and complexity parameters.
            </p>

            <div>
              <button
                onClick={() => onExploreFeature('playground')}
                className="px-8 py-3.5 bg-[#111111] hover:bg-slate-800 text-white rounded-full text-xs font-bold font-mono inline-flex items-center space-x-1.5 transition"
              >
                <span>GET PROGRAM NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating text badge matching video */}
            <div className="floating-card p-4 border border-[#E5E5EA] bg-[#F5F5F7]/50 rounded-2xl flex items-center space-x-3 w-80">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-xl border border-amber-100">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                Transform code safety with real-time graded reward feedback.
              </p>
            </div>
          </div>

          {/* Right Column (PC Mockup displaying plan details matching video) */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[580px]">
            
            {/* PC Container */}
            <div className="pc-screen-mockup">
              {/* PC Header Bar */}
              <div className="pc-screen-header justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">benchmark_config.json</span>
                <span className="w-8"></span>
              </div>

              {/* PC Screen Content (Split View) */}
              <div className="pc-screen-content grid grid-cols-12 h-full">
                
                {/* Editor Content Area (12 cols) */}
                <div className="col-span-12 p-5 space-y-4">
                  <div className="border-b border-[#E5E5EA] pb-2 text-left">
                    <h3 className="text-sm font-bold text-slate-800 font-mono">Code Review Plan Configuration</h3>
                  </div>

                  {/* Plan parameters list matching video */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs text-left">
                    
                    {/* Parameter 1 */}
                    <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] flex items-center justify-between col-span-2">
                      <div className="flex items-center space-x-2">
                        <FileCode className="w-4 h-4 text-slate-500" />
                        <div>
                          <span className="font-bold block text-slate-800">AST Parsed, No Errors</span>
                          <span className="text-[10px] text-slate-400">Syntax assessment</span>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </div>

                    {/* Parameter 2 */}
                    <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-[#FF5500]" />
                      <div>
                        <span className="font-bold block text-slate-800">0.98 Cumulative</span>
                        <span className="text-[10px] text-slate-400">Reward estimate</span>
                      </div>
                    </div>

                    {/* Parameter 3 */}
                    <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF5500]" />
                      <div>
                        <span className="font-bold block text-slate-800">SQLi & Logic Checks</span>
                        <span className="text-[10px] text-slate-400">Grader focus</span>
                      </div>
                    </div>

                    {/* Parameter 4 */}
                    <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-[#FF5500]" />
                      <div>
                        <span className="font-bold block text-slate-800">Standard Ruleset</span>
                        <span className="text-[10px] text-slate-400">Grader adjustment</span>
                      </div>
                    </div>

                    {/* Circular slider matching video */}
                    <div className="bg-white p-3 rounded-xl border border-[#E5E5EA] flex items-center justify-between col-span-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full border-4 border-[#FF5500] border-t-transparent flex items-center justify-center text-[9px] font-bold text-[#FF5500]">
                          98%
                        </div>
                        <span className="text-[10px] text-slate-500">Agent Alignment Progress</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">✓ SECURED</span>
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
