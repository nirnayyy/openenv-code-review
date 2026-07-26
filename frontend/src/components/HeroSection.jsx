import React, { useState, useRef } from 'react';
import { ArrowUpRight, Cpu, ShieldCheck, Zap, Flame, Terminal, Code, Sparkles } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (-15deg to +15deg max)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    // Relative percentage for radial spotlight
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, isHovered: true });
    setSpotlightPos({ x: posX, y: posY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <section 
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-12 md:py-24 bg-transparent hero-3d-stage overflow-hidden selection:bg-[#FF5500] selection:text-white"
    >
      {/* Interactive Spotlight Radial Glow Following Cursor */}
      <div 
        className="absolute inset-0 spotlight-glow transition-opacity duration-500 pointer-events-none"
        style={{
          '--mouse-x': `${spotlightPos.x}%`,
          '--mouse-y': `${spotlightPos.y}%`,
          opacity: tilt.isHovered ? 1 : 0.4
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up text-left">
            <span className="px-4 py-1.5 bg-white dark:bg-[#181C22] border border-[#E5E5EA] dark:border-[#262C36] rounded-full text-xs font-bold text-[#FF5500] uppercase tracking-wider inline-flex items-center space-x-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI CODE REVIEW BENCHMARK SYSTEM</span>
            </span>

            {/* Serif & Sans Typography matching premium design */}
            <h1 className="text-5xl sm:text-7xl font-extrabold text-[#111111] dark:text-[#F3F4F6] leading-[1.05] tracking-tight">
              The AI Code Review <span className="font-serif italic font-normal text-slate-800 dark:text-slate-200">Journey</span> Starts Here
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-mono max-w-lg">
              Empowering AI agents with real-time reinforcement learning code audits, safety grading, security shields, and AST bug checkmarks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="btn-orange-chaingpt px-8 py-4 text-xs flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/30"
              >
                <span>RUN BENCHMARK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <a
                href="#features"
                className="px-8 py-4 bg-white dark:bg-[#181C22] border border-[#E5E5EA] dark:border-[#262C36] hover:border-[#FF5500] dark:hover:border-[#FF5500] rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center transition shadow-sm"
              >
                EXPLORE SPEC
              </a>
            </div>

            {/* Left mini floating stats row */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="floating-card p-4 flex items-center space-x-3 bg-white dark:bg-[#181C22]">
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center text-[#FF5500]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">REWARD TARGET</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">1.00 MAX</span>
                </div>
              </div>

              <div className="floating-card p-4 flex items-center space-x-3 bg-white dark:bg-[#181C22]">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-500">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">AUDIT LATENCY</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">0.4 SEC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (RELUME-STYLE 3D PARALLAX SHOWCASE) */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[620px] animate-fade-in-up">
            
            {/* Ambient visual glowing aura */}
            <div className="absolute w-96 h-96 rounded-full bg-[#FF5500]/10 blur-3xl -z-10 animate-pulse"></div>

            {/* 3D TILT CONTAINER CONTAINER */}
            <div 
              className={`hero-3d-card relative ${!tilt.isHovered ? 'reset-tilt' : ''}`}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
              }}
            >

              {/* Left Floating Card: Llama Agent Badge (PARALLAX LAYER 2) */}
              <div 
                className="absolute -top-6 -left-4 sm:left-0 z-30 floating-card p-4 border border-[#E5E5EA] dark:border-[#262C36] flex items-center space-x-3 bg-white dark:bg-[#181C22] w-60 shadow-xl layer-depth-2"
                style={{
                  transform: `translateZ(50px) translateY(${tilt.rotateX * -1.5}px) translateX(${tilt.rotateY * 1.2}px)`
                }}
              >
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=davis"
                  alt="Llama Agent"
                  className="w-10 h-10 rounded-full bg-[#F5F5F7] dark:bg-[#121519] border border-[#E5E5EA] dark:border-[#262C36]"
                />
                <div className="text-left">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 uppercase font-mono">Llama-3.3-70B</h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <p className="text-[9px] text-slate-500 font-mono">AI Auditor of the Year</p>
                </div>
              </div>

              {/* Right Floating Card: AST Code Shield (PARALLAX LAYER 3) */}
              <div 
                className="absolute -bottom-6 -right-4 sm:right-0 z-30 floating-card p-4 border border-[#E5E5EA] dark:border-[#262C36] flex items-center space-x-3 bg-white dark:bg-[#181C22] w-56 shadow-xl layer-depth-3"
                style={{
                  transform: `translateZ(70px) translateY(${tilt.rotateX * 1.5}px) translateX(${tilt.rotateY * -1.2}px)`
                }}
              >
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-full text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left font-mono">
                  <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-100">AST CODE SHIELD</h4>
                  <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Security shield active</p>
                </div>
              </div>

              {/* Center PC Screen Container (BASE LAYER 1) */}
              <div className="pc-screen-mockup layer-depth-1 border-8 border-[#111111] dark:border-[#1F242C] shadow-2xl">
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
                <div className="pc-screen-content grid grid-cols-12 h-full bg-[#F5F5F7] dark:bg-[#121519]">
                  
                  {/* Editor Sidebar (3 cols) */}
                  <div className="col-span-3 border-r border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] p-3 space-y-3 font-mono text-[9px] text-left">
                    <span className="font-bold text-slate-400 block uppercase">FILES</span>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <li className="text-[#FF5500] font-bold">✓ main.py</li>
                      <li>✗ test_ast.py</li>
                      <li>✓ grader.py</li>
                      <li>✓ models.py</li>
                    </ul>
                  </div>

                  {/* Editor Content Area (9 cols) */}
                  <div className="col-span-9 p-4 flex flex-col justify-between space-y-4">
                    {/* Greeting header */}
                    <div className="flex justify-between items-center border-b border-[#E5E5EA] dark:border-[#262C36] pb-2">
                      <div className="text-left">
                        <span className="text-[9px] text-slate-400 uppercase font-mono">SYS_VER: 1.0.0 //</span>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">Hey, Agent!</h3>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Program Card */}
                    <div className="bg-[#111111] text-white p-4 rounded-xl space-y-2.5 text-left font-mono shadow-inner border border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] px-2 py-0.5 bg-white/10 rounded-full uppercase tracking-wider text-slate-300">RL Agent Mode</span>
                        <span className="text-[10px] text-[#FF5500] font-bold">1.00 Max Reward</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">3-Step Reward Optimization Boost</h4>
                      <div className="flex space-x-2 text-[9px]">
                        <span className="px-2.5 py-1 bg-white/10 text-slate-200 rounded-full border border-white/10">Security Shield</span>
                        <span className="px-2.5 py-1 bg-white/10 text-slate-200 rounded-full border border-white/10">AST Grader</span>
                      </div>
                    </div>

                    {/* Execution Progress Bar */}
                    <div className="bg-white dark:bg-[#181C22] p-3 rounded-xl border border-[#E5E5EA] dark:border-[#262C36] space-y-2 shadow-sm">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-slate-500 dark:text-slate-400">Benchmark Progress</span>
                        <span className="text-[#FF5500] font-bold">3 of 3 tasks running</span>
                      </div>
                      <div className="w-full bg-[#F5F5F7] dark:bg-[#121519] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#FF5500] h-full rounded-full w-[100%] animate-pulse"></div>
                      </div>
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

