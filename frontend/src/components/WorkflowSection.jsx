import React from 'react';
import { ArrowUpRight, ShieldCheck, FileCode, Zap, Activity, Cpu, CheckCircle } from 'lucide-react';
import { PinContainer } from './ui/3d-pin';

export default function WorkflowSection({ onTryDemo }) {
  const coaches = [
    { name: 'Llama 3.3 70B', title: 'High accuracy, PyTorch spec expert.', exp: '70B params', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=llama' },
    { name: 'GPT-4o', title: 'State-of-the-art logic & reasoning.', exp: 'Frontier model', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=gpt' },
    { name: 'DeepSeek R1', title: 'Reasoning model and validator.', exp: 'Mixture of Experts', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=deepseek' }
  ];

  return (
    <div className="space-y-20 bg-[#F5F5F7] dark:bg-[#0A0C0E] transition-colors duration-300">
      
      {/* 1. Pick a Challenge (Tailored Exercises) */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#0A0C0E] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6 text-left order-first lg:order-last">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono block uppercase">:: ROBUST AGENT TRAJECTORIES</span>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] dark:text-[#F3F4F6] leading-tight">
                Tailored Challenges for <span className="font-serif italic font-normal text-slate-700 dark:text-slate-300">Every Agent</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                Personalized benchmark challenges crafted to suit your codebase, audit speed, and security ambitions. Every session is designed to maximize reinforcement learning results.
              </p>
              <div>
                <button
                  onClick={onTryDemo}
                  className="px-8 py-3.5 bg-[#111111] dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full text-xs font-bold font-mono inline-flex items-center space-x-1.5 transition shadow"
                >
                  <span>PICK A TASK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Floating card */}
              <div className="floating-card p-4 border border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] rounded-2xl flex items-center space-x-3 w-80">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl border border-amber-100 dark:border-amber-900/50">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                  Fuel agent alignment with automated AST grading rules.
                </p>
              </div>
            </div>

            {/* Right PC Screen Mockup (Pick a Challenge screen) */}
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
                  <span className="text-[10px] text-slate-400 font-mono">code_challenges.sh</span>
                  <span className="w-8"></span>
                </div>

                {/* PC Screen Content */}
                <div className="pc-screen-content p-5 space-y-4 bg-white dark:bg-[#121519]">
                  <div className="flex items-center space-x-2 border-b border-[#E5E5EA] dark:border-[#262C36] pb-2 text-left">
                    <span className="text-slate-500 dark:text-slate-400 font-bold font-mono">&larr;</span>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">Pick a Benchmark Challenge</h3>
                  </div>

                  <div className="bg-[#111111] dark:bg-[#07080A] rounded-2xl overflow-hidden relative h-52 flex flex-col justify-end p-4 text-white text-left border border-transparent dark:border-[#262C36]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400"
                      alt="Challenge code"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="z-20 space-y-1 text-left font-mono">
                      <span className="text-[9px] bg-[#FF5500] px-2 py-0.5 rounded-full uppercase">Task 3 (Hard)</span>
                      <h4 className="text-xs font-bold">SQL Injection Vulnerability</h4>
                      <p className="text-[8px] text-slate-300">Identify SQL injection, demonstrate exploit proof, and apply query parameterization.</p>
                    </div>
                  </div>

                  <button className="w-full bg-[#FF5500] text-white text-[10px] font-bold py-3 rounded-full font-mono shadow">
                    Continue
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Top AI Agents (Model Selection) */}
      <section className="py-12 md:py-20 bg-[#F5F5F7] dark:bg-[#121519] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono block uppercase">:: FRONTIER AGENTS</span>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] dark:text-[#F3F4F6] leading-tight">
                Top AI Agents <span className="font-serif italic font-normal text-slate-700 dark:text-slate-300">Proven Results</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                Our suite features a diverse team of frontier LLM models with billions of tokens of pre-training. Select your evaluator to begin auditing.
              </p>
              <div>
                <button
                  onClick={onTryDemo}
                  className="px-8 py-3.5 bg-[#111111] dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full text-xs font-bold font-mono inline-flex items-center space-x-1.5 transition shadow"
                >
                  <span>SELECT AUDITOR</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Passion badge */}
              <div className="floating-card p-4 border border-[#E5E5EA] dark:border-[#262C36] bg-white dark:bg-[#181C22] rounded-2xl flex items-center space-x-3 w-72">
                <div className="p-2 bg-orange-50 dark:bg-orange-950/40 text-[#FF5500] rounded-xl border border-orange-100 dark:border-orange-900/50">
                  <Cpu className="w-5 h-5" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono leading-relaxed font-sans">
                  Deep Reinforcement learning drives audit success.
                </p>
              </div>
            </div>

            {/* Right PC Screen Mockup (Choose a Trainer screen) */}
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
                  <span className="text-[10px] text-slate-400 font-mono">model_suite.py</span>
                  <span className="w-8"></span>
                </div>

                {/* PC Screen Content */}
                <div className="pc-screen-content p-5 space-y-3 bg-[#F5F5F7] dark:bg-[#121519]">
                  <div className="border-b border-[#E5E5EA] dark:border-[#262C36] pb-2 text-left">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">Choose an AI Evaluator Agent</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-1 text-left">
                    {coaches.map((c, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#181C22] p-3.5 rounded-xl border border-[#E5E5EA] dark:border-[#262C36] flex flex-col justify-between min-h-[140px]">
                        <div className="flex items-center space-x-2">
                          <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full bg-[#F5F5F7] dark:bg-[#0A0C0E]" />
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-[10px] font-mono leading-none block">{c.name}</span>
                        </div>
                        <div className="font-mono text-[9px] mt-2 flex-grow">
                          <span className="text-slate-400 block">{c.title}</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-bold block mt-2 text-[9px] border-t border-[#F5F5F7] dark:border-[#262C36] pt-1.5">{c.exp}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-[#FF5500] text-white text-[10px] font-bold py-3 rounded-full font-mono mt-1 shadow">
                    Continue
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Endless Code Review Options (Bright & High-Tech Grid) */}
      <section className="py-16 md:py-24 bg-[#F5F5F7] dark:bg-[#0A0C0E] border-t border-b border-[#E5E5EA] dark:border-[#262C36] relative overflow-hidden transition-colors duration-300">
        {/* Subtle ambient light accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5500]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5EA] dark:border-[#262C36] pb-8">
            <div className="max-w-xl text-left space-y-3">
              <span className="text-xs font-bold text-[#FF5500] tracking-widest block uppercase font-mono flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>:: COMPREHENSIVE AUDIT MATRIX</span>
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-mono text-[#111111] dark:text-[#F3F4F6]">
                Endless Code Review <span className="text-[#FF5500]">Options</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                Industrial-grade audit engines covering AST syntax trees, security vulnerabilities, memory leak tracing, and side-effect mutations.
              </p>
            </div>
            
            <button
              onClick={onTryDemo}
              className="btn-orange-chaingpt px-8 py-3.5 text-xs self-start md:self-auto flex items-center space-x-2 shrink-0 shadow-sm"
            >
              <span>EXPLORE ALL AUDITS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 High-Tech 3D Pin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 pt-6 pb-16">
            
            {/* Card 1: Security Vulnerability Audit */}
            <PinContainer title="RUN SECURITY AUDIT" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold rounded-full uppercase">
                      150+ Checks
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">Security Vulnerability Audit</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Scans for SQL injection, unsanitized inputs, and auth bypass routines with automated exploit proofing.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">COVERAGE</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">CRITICAL / HIGH</span>
                </div>
              </div>
            </PinContainer>

            {/* Card 2: AST Logic Tree Analysis */}
            <PinContainer title="AST LOGIC TREE" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold rounded-full uppercase">
                      2,600+ Nodes
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">AST Logic Tree Analysis</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Parses Python abstract syntax trees to detect control flow anomalies, dead branches, and unreachable logic.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">DEPTH</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">FULL SYNTAX PARSE</span>
                </div>
              </div>
            </PinContainer>

            {/* Card 3: Memory & Resource Leak Scan */}
            <PinContainer title="RESOURCE TRACER" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold rounded-full uppercase">
                      Zero Leak
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">Resource Leak Tracer</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Audits file handles, unclosed network sockets, and database connections to enforce context manager usage.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">RELIABILITY</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">100% RESOURCE CLEAN</span>
                </div>
              </div>
            </PinContainer>

            {/* Card 4: In-place Side Effect Mutation */}
            <PinContainer title="STATE PURITY" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold rounded-full uppercase">
                      Side-effect Check
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">Mutation & Purity Guard</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Identifies parameter mutations (e.g. `.sort()`, `.reverse()`) inside functions and recommends pure replacements.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">PARADIGM</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">FUNCTIONAL PURITY</span>
                </div>
              </div>
            </PinContainer>

            {/* Card 5: Command Injection Shield */}
            <PinContainer title="SHELL FIREWALL" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold rounded-full uppercase">
                      Shell Firewall
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">Command Injection Shield</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Detects dangerous `eval()`, `exec()`, and `subprocess(shell=True)` calls to eliminate remote code execution vulnerabilities.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">PROTECTION</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">ZERO TRUST</span>
                </div>
              </div>
            </PinContainer>

            {/* Card 6: Exception Handler Inspector */}
            <PinContainer title="EXCEPTION INSPECTION" containerClassName="w-full h-[320px]" onClick={onTryDemo}>
              <div className="flex flex-col justify-between space-y-4 p-2 w-[280px] sm:w-[310px] h-[250px] text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center text-[#FF5500]">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 text-[#FF5500] text-[10px] font-mono font-bold rounded-full uppercase">
                      Traceability
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] dark:text-[#F3F4F6] font-mono leading-tight">Exception Handler Inspector</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1.5 leading-relaxed">
                      Flags bare `except:` blocks that swallow runtime exceptions and enforces typed exception handling with log logging.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#262C36] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">QUALITY</span>
                  <span className="text-[#FF5500] font-bold">EXPLICIT HANDLERS</span>
                </div>
              </div>
            </PinContainer>

          </div>
        </div>
      </section>

      {/* 4. Elevate Code Quality — Redesigned with purpose-built visuals */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0A0C0E] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-[#FF5500] uppercase tracking-wider font-mono">:: DEVELOPER TOOLS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] dark:text-[#F3F4F6] leading-tight">
              Elevate Code Quality <span className="font-serif italic font-normal text-slate-700 dark:text-slate-300">and Security</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono leading-relaxed">
              Purpose-built infrastructure for AI-driven code reviews. From protocol integration to real-time analytics — every tool you need in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Model Context Protocol */}
            <div className="bg-[#F5F5F7] dark:bg-[#181C22] rounded-3xl overflow-hidden flex flex-col justify-between min-h-[420px] border border-[#E5E5EA] dark:border-[#262C36] group hover:shadow-xl transition-shadow">
              <div className="p-6 text-left font-mono space-y-2">
                <span className="text-[9px] uppercase text-[#FF5500] font-bold tracking-widest">PROTOCOL //</span>
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">Model Context Protocol</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Connect any LLM evaluator through our standardized MCP JSON-RPC interface. Supports Llama, GPT-4o, DeepSeek, and Gemini out of the box.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center px-6 pb-4">
                <img
                  src="/openenv_mcp_protocol.png"
                  alt="MCP Protocol Hub — API connection architecture"
                  className="w-full max-w-[280px] h-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="px-6 pb-5">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>4 models connected</span>
                  <span className="mx-1">·</span>
                  <span>JSON-RPC 2.0</span>
                </div>
              </div>
            </div>

            {/* Card 2: Side-by-Side Diff Viewer */}
            <div className="rounded-3xl overflow-hidden min-h-[420px] relative group border border-transparent dark:border-[#262C36]">
              <img
                src="/openenv_code_diff_screen.png"
                alt="Side-by-side code diff showing buggy code in red and corrected fix in green"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left">
                <span className="text-[9px] uppercase text-[#FF5500] font-bold tracking-widest font-mono">DIFF VIEWER //</span>
                <h4 className="text-lg font-bold text-white font-mono mt-1">Visual Patch Comparator</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-1 font-mono">
                  Side-by-side diff highlighting buggy lines in red and secure patches in green. Export as Markdown with one click.
                </p>
                <div className="flex items-center space-x-3 mt-3 text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 border border-rose-400/50 text-rose-300 rounded-full">− Buggy</span>
                  <span className="px-2 py-0.5 border border-emerald-400/50 text-emerald-300 rounded-full">+ Fixed</span>
                  <span className="px-2 py-0.5 border border-slate-400/50 text-slate-300 rounded-full">↓ Export</span>
                </div>
              </div>
            </div>

            {/* Card 3: Real-time Analytics Dashboard */}
            <div className="bg-[#F5F5F7] dark:bg-[#181C22] rounded-3xl overflow-hidden flex flex-col justify-between min-h-[420px] border border-[#E5E5EA] dark:border-[#262C36] group hover:shadow-xl transition-shadow">
              <div className="p-6 text-left font-mono space-y-2">
                <span className="text-[9px] uppercase text-[#FF5500] font-bold tracking-widest">ANALYTICS //</span>
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">Real-time Stats Monitor</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Track reward scores, audit latency, and model comparisons across every benchmark run. Export CSV anytime.
                </p>
              </div>

              {/* Mini dashboard widget */}
              <div className="px-6 space-y-3">
                {/* Score gauge */}
                <div className="bg-white dark:bg-[#121519] p-4 rounded-2xl border border-[#E5E5EA] dark:border-[#262C36]">
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                    <span className="text-slate-500 dark:text-slate-400 font-bold">OVERALL REWARD</span>
                    <span className="text-2xl font-extrabold text-[#FF5500]">0.98</span>
                  </div>
                  <div className="w-full h-2 bg-[#E5E5EA] dark:bg-[#262C36] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF5500] to-[#FF8800] rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>

                {/* Stat rows */}
                <div className="bg-white dark:bg-[#121519] p-3.5 rounded-2xl border border-[#E5E5EA] dark:border-[#262C36] space-y-2.5 font-mono text-[10px] text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Audit Latency</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">0.4s avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Issues Detected</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">147 / 150</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Fix Accuracy</span>
                    <span className="font-bold text-[#FF5500]">98.0%</span>
                  </div>
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="px-6 pb-5 pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live tracking</span>
                  </div>
                  <span className="text-[#FF5500] font-bold">CSV EXPORT →</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

