import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CtaSection({ onLaunch }) {
  return (
    <section className="py-12 bg-[#E6E8EA] font-mono text-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#C8CCD0] bg-[#F0F2F4] p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFFFFF] border border-[#C8CCD0] text-xs text-[#FF5500] font-bold">
            <span className="orange-dot"></span>
            <span>:: READY TO BENCHMARK YOUR AGENT?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#111111] uppercase tracking-wide">
            START TRAINING & EVALUATING YOUR AI AGENTS TODAY
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
            Experience reproducible, graded signals for code understanding, bug detection, and security compliance on the Meta PyTorch OpenEnv standard.
          </p>

          <div className="pt-2">
            <button
              onClick={onLaunch}
              className="btn-orange-chaingpt px-8 py-3.5 text-xs inline-flex items-center space-x-2"
            >
              <span>LAUNCH LIVE DASHBOARD</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
