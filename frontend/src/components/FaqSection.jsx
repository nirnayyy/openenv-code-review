import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      q: 'WHAT IS OPENENV CODE REVIEWER?',
      a: 'OpenEnv Code Reviewer is a standardized Reinforcement Learning (RL) environment built on the Meta PyTorch OpenEnv specification. It allows AI researchers and developers to train and evaluate AI agents on automated code review tasks, bug detection, and security vulnerability audits.'
    },
    {
      q: 'HOW DOES THE PARTIAL-CREDIT REWARD FUNCTION WORK?',
      a: 'Unlike binary pass/fail evaluators, our reward function assigns partial credit (from 0.0 to 1.0) based on four weighted components: Issue Detection (30-50%), Fix Quality (25-30%), Severity Rating Match (15-20%), and Exploit Proof Demonstration (25% for security tasks).'
    },
    {
      q: 'CAN I TEST MY OWN PYTHON CODE SNIPPETS?',
      a: 'Yes! Navigate to the Custom Audit tab in the navigation bar to paste any Python snippet or select preset bug templates (SQL Injection, List Mutation, Resource Leaks, Bare Except blocks) for instant AI code audits.'
    },
    {
      q: 'DO I NEED AN API KEY TO RUN THIS LOCALLY?',
      a: 'No API key is required! The web application includes an out-of-the-box RL simulation mode for instant local evaluation. If you wish to test frontier remote models (like Llama 3.3 70B, GPT-4o, or Gemini), you can optionally provide your key securely in the UI.'
    },
    {
      q: 'HOW DO I DEPLOY THIS ON HUGGINGFACE SPACES OR DOCKER?',
      a: 'The application features a single-container multi-stage Docker build that compiles the React frontend and serves both the Web UI and OpenEnv REST API on port 8000. Simply deploy the Dockerfile to HuggingFace Spaces or any Docker host.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-12 bg-[#E6E8EA] dark:bg-[#0A0C0E] font-mono text-[#111111] dark:text-[#F3F4F6] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#C8CCD0] dark:border-[#262C36] bg-[#F0F2F4] dark:bg-[#181C22] p-6 mb-6 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#FF5500]">
            <span className="flex items-center">
              <span className="orange-dot mr-2"></span>
              <span>:: FREQUENTLY ASKED QUESTIONS</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400">DOCUMENTATION FAQ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#111111] dark:text-[#F3F4F6] mt-2 uppercase tracking-wide">
            EVERYTHING YOU NEED TO KNOW ABOUT OPENENV
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="tech-card border border-[#C8CCD0] dark:border-[#262C36] overflow-hidden rounded-xl"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between space-x-4 bg-[#FFFFFF] dark:bg-[#181C22] hover:bg-[#F0F2F4] dark:hover:bg-[#20252D] transition"
                >
                  <span className="font-bold text-xs sm:text-sm text-[#111111] dark:text-[#F3F4F6]">
                    [{idx + 1}] {faq.q}
                  </span>
                  <div className={`p-1 border border-[#C8CCD0] dark:border-[#262C36] text-[#FF5500] transition-transform ${
                    isOpen ? 'rotate-180 bg-[#FF5500] text-white border-[#FF5500]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-[#C8CCD0] dark:border-[#262C36] bg-[#F0F2F4] dark:bg-[#121519]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

