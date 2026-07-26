import React from 'react';
import { ArrowUpRight, Terminal, Settings, Play, FileCheck } from 'lucide-react';

export default function InstructionsSection({ onNavigate }) {
  const steps = [
    {
      icon: <Terminal className="w-6 h-6 text-[#FF5500]" />,
      title: "1. Load Your Code",
      desc: "Go to the 'Code Sandbox' tab. Paste your own Python script, upload a file, or select a preset template (like SQL Injection or Resource Leaks) to test."
    },
    {
      icon: <Settings className="w-6 h-6 text-[#FF5500]" />,
      title: "2. Choose an Evaluator",
      desc: "Select the AI model you want to audit your code with (e.g. Llama 3.3, GPT-4o). You can enter your own API key or use our simulation mode."
    },
    {
      icon: <Play className="w-6 h-6 text-[#FF5500]" />,
      title: "3. Run Grader Engine",
      desc: "Click 'Run AI Audit' or 'Run Episode'. The grader evaluates the code and scores it from 0.0 to 1.0 based on issue detection and fix quality."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#FF5500]" />,
      title: "4. Check Diff & Export",
      desc: "Scroll down to check the side-by-side visual diff showing the buggy lines in red and the corrected fix in green. Download the markdown report."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white border-t border-[#E5E5EA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider font-mono">:: DEVELOPER GUIDE</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] leading-tight">
            How OpenEnv Works <span className="font-serif italic font-normal text-slate-700">In 4 Steps</span>
          </h2>
          <p className="text-sm text-slate-500 font-mono leading-relaxed">
            Follow this simple guide to start training, testing, and grading your code reviewer agents.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="floating-card p-6 border border-[#E5E5EA] bg-[#F5F5F7]/30 flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 font-mono">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
              </div>
              <div className="text-[10px] text-slate-400 font-mono font-bold uppercase pt-2 border-t border-[#E5E5EA]/60">
                Step 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('playground')}
            className="btn-orange-chaingpt px-8 py-3.5 text-xs inline-flex items-center space-x-2"
          >
            <span>GO TO PLAYGROUND</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
