import React from 'react';

export default function Footer({ setActiveTab }) {
  const marqueeItems = Array(10).fill("Meta PyTorch OpenEnv • Reinforcement Learning • AI Code Review • AST Parsing • ");

  return (
    <footer className="bg-[#111111] text-[#F5F5F7] py-16 text-xs font-mono relative overflow-hidden">
      
      {/* Huge scrolling text marquee at the top of footer matching video */}
      <div className="marquee-container border-b border-white/10 pb-12 mb-12">
        <div className="marquee-content whitespace-nowrap text-white/5 select-none">
          {marqueeItems.join("").toUpperCase()}
          {marqueeItems.join("").toUpperCase()}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer details row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <img src="/openenv_brand_logo.png" alt="OpenEnv Logo" className="w-6 h-6 object-contain" />
              <span className="font-bold text-base text-white tracking-widest uppercase">OpenEnv LABS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-xs">
              Standardized RL environment & benchmark platform where AI agents perform automated code reviews.
            </p>
            <button 
              onClick={() => setActiveTab('playground')}
              className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold text-[10px] uppercase font-mono hover:bg-[#FF5500] hover:text-white transition"
            >
              Run Benchmark
            </button>
          </div>

          <div className="text-left">
            <h4 className="font-bold text-white uppercase mb-3">Sitemap</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#FF5500]">Home & Overview</button></li>
              <li><button onClick={() => setActiveTab('playground')} className="hover:text-[#FF5500]">Playground</button></li>
              <li><button onClick={() => setActiveTab('sandbox')} className="hover:text-[#FF5500]">Code Sandbox</button></li>
              <li><button onClick={() => setActiveTab('tasks')} className="hover:text-[#FF5500]">Agent Suite</button></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-bold text-white uppercase mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://pytorch.org" target="_blank" rel="noreferrer" className="hover:text-[#FF5500]">Meta PyTorch</a></li>
              <li><a href="https://huggingface.co/models" target="_blank" rel="noreferrer" className="hover:text-[#FF5500]">HuggingFace Hub</a></li>
              <li><a href="https://fastapi.tiangolo.com" target="_blank" rel="noreferrer" className="hover:text-[#FF5500]">FastAPI Spec</a></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-bold text-white uppercase mb-3">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('apidocs')} className="hover:text-[#FF5500]">API Docs</button></li>
              <li><a href="#faq" onClick={() => setActiveTab('home')} className="hover:text-[#FF5500]">FAQs</a></li>
              <li><span className="text-[#FF5500] font-bold">STATUS: OPERATIONAL</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] border-t border-white/10 pt-8">
          <span>&copy; 2026 OpenEnv LABS. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-bold text-slate-400">Terms • Privacy • Cookies</span>
        </div>

      </div>
    </footer>
  );
}
