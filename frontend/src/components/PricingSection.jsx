import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

export default function PricingSection({ onSelectPlan }) {
  const plans = [
    {
      name: 'BASIC TIER',
      price: '$0',
      period: '/MONTH',
      badge: 'COMMUNITY',
      description: 'Ideal for individual researchers and open-source benchmark testing.',
      features: [
        'OpenEnv Standard Simulation Engine',
        '3 Default Benchmark Tasks (Easy, Med, Hard)',
        'Local Execution via HTTP REST / API',
        'Standard Partial Credit Scoring',
        'Community Support'
      ],
      tabId: 'playground'
    },
    {
      name: 'PRO RESEARCHER',
      price: '$9.99',
      period: '/MONTH',
      badge: 'RECOMMENDED',
      description: 'Perfect for AI developers evaluating frontier LLMs (Llama 3.3, GPT-4o).',
      features: [
        'Unlimited Live RL Agent Runs',
        'HuggingFace & OpenAI API Routers',
        'Interactive Custom Code Sandbox',
        'Exploit Payload Verification',
        'Benchmark Leaderboard & JSON Export',
        'Priority API Execution'
      ],
      tabId: 'playground'
    },
    {
      name: 'ENTERPRISE LAB',
      price: '$99.9',
      period: '/MONTH',
      badge: 'CUSTOM LABS',
      description: 'Dedicated infrastructure for AI labs, teams, and custom task generation.',
      features: [
        'Custom Task Builder & Rule Generators',
        'Dedicated MCP Server Deployment',
        'Multi-Agent Parallel Episode Evaluator',
        '24/7 Dedicated Research Support',
        'SLA & High Concurrency API Access',
        'Private Benchmark Datasets'
      ],
      tabId: 'apidocs'
    }
  ];

  return (
    <section className="py-12 bg-[#E6E8EA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#C8CCD0] bg-[#F0F2F4] p-6 mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#FF5500]">
            <span className="flex items-center">
              <span className="orange-dot mr-2"></span>
              <span>:: PRICING & TIERS</span>
            </span>
            <span className="text-slate-500">TRANSPARENT PLANS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#111111] mt-2 uppercase tracking-wide">
            DISCOVER OUR BENCHMARK PRICING PLANS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`tech-card p-6 flex flex-col justify-between relative ${
                plan.badge === 'RECOMMENDED' ? 'border-[#FF5500] bg-[#FFFFFF]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs font-mono mb-4">
                  <span className="font-bold text-[#111111]">{plan.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FF5500] text-white rounded">
                    {plan.badge}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-extrabold font-mono text-[#111111]">{plan.price}</span>
                  <span className="text-xs font-mono text-slate-500">{plan.period}</span>
                </div>

                <p className="text-xs font-mono text-slate-700 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-2 mb-8">
                  {plan.features.map((f, fidx) => (
                    <div key={fidx} className="flex items-start space-x-2 text-xs font-mono text-slate-800">
                      <span className="text-[#FF5500] font-bold">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(plan.tabId)}
                className="btn-orange-chaingpt w-full py-3 text-xs flex items-center justify-center space-x-1.5"
              >
                <span>SELECT PLAN</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
