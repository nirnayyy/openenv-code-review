import React from 'react';
import { ArrowUpRight, Terminal, Settings, Play, FileCheck } from 'lucide-react';

export default function InstructionsSection({ onNavigate }) {
  const steps = [
    {
      icon: <Terminal className="w-5 h-5 text-[#FF5500]" />,
      iconBg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/50",
      accentGradient: "from-[#FF5500]/15 via-transparent to-transparent",
      badgeColor: "text-[#FF5500] bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/50",
      title: "1. Load Your Code",
      desc: "Go to the 'Code Sandbox' tab. Paste your Python script, upload a file, or select a preset vulnerability template (SQL Injection, Command Injection, Secrets) to test."
    },
    {
      icon: <Settings className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
      accentGradient: "from-blue-500/15 via-transparent to-transparent",
      badgeColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
      title: "2. Choose Evaluator",
      desc: "Select the AI agent model to audit your code (e.g. Llama 3.3 70B, DeepSeek R1, GPT-4o). Provide your API key or run in simulated benchmark mode."
    },
    {
      icon: <Play className="w-5 h-5 text-emerald-500" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
      accentGradient: "from-emerald-500/15 via-transparent to-transparent",
      badgeColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
      title: "3. Run Grader Engine",
      desc: "Click 'Run AI Audit' or 'Run Episode'. The RL environment evaluates the code in real-time, assigning reward scores from 0.00 to 1.00 based on AST analysis."
    },
    {
      icon: <FileCheck className="w-5 h-5 text-purple-500" />,
      iconBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
      accentGradient: "from-purple-500/15 via-transparent to-transparent",
      badgeColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
      title: "4. Check Diff & Export",
      desc: "Inspect the side-by-side code diff highlighting bug lines in red and corrected fixes in green. Export comprehensive markdown and CSV reports."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0E1116] border-t border-b border-[#E5E5EA] dark:border-[#262C36] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider font-mono px-3 py-1 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-full inline-block">
            :: DEVELOPER WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] dark:text-[#F3F4F6] leading-tight">
            How OpenEnv Works <span className="font-serif italic font-normal text-slate-700 dark:text-slate-300">In 4 Steps</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
            Follow this simple guide to start training, testing, and grading your code reviewer AI agents.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl p-6 border border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 text-left group`}
            >
              {/* Subtle Ambient Color Top Gradient Overlay */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${step.accentGradient} pointer-events-none`} />

              <div className="relative z-10 space-y-5">
                {/* Header Icon + Step Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl border ${step.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                    STEP 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono group-hover:text-[#FF5500] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Footer Tag */}
              <div className="relative z-10 pt-4 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>STAGE 0{idx + 1} // READY</span>
                <span className="text-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity font-bold">EXPLORE &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('playground')}
            className="btn-orange-chaingpt px-8 py-3.5 text-xs inline-flex items-center space-x-2 shadow-md hover:shadow-orange-500/30"
          >
            <span>GO TO LIVE PLAYGROUND</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

