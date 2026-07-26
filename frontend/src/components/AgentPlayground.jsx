import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Key, Cpu, FileCode, Award, Terminal, ArrowUpRight, CheckCircle2, AlertTriangle, XCircle, Sliders, Info, Copy, Check } from 'lucide-react';

export default function AgentPlayground({ onRunCompleted }) {
  const [obs, setObs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelName, setModelName] = useState('meta-llama/Llama-3.3-70B-Instruct');
  const [apiBaseUrl, setApiBaseUrl] = useState('https://router.huggingface.co/v1');
  const [apiKey, setApiKey] = useState(localStorage.getItem('openenv_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert code reviewer. Return ONLY a valid JSON object with identified_issues, suggested_fixes, severity, explanation, and line_numbers."
  );
  const [temperature, setTemperature] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(700);

  // Episode tracking
  const [episodeLog, setEpisodeLog] = useState([]);
  const [cumulativeReward, setCumulativeReward] = useState(0.0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0: reset, 1: task1, 2: task2, 3: task3, 4: done

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch('/reset', { method: 'POST' });
      const data = await res.json();
      setObs(data);
      setEpisodeLog([]);
      setCumulativeReward(0.0);
      setCurrentStepIndex(1); // Task 1 active
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteStep = async () => {
    if (!obs || obs.done) return;
    setLoading(true);

    try {
      // Step implementation: call the API to run agent on the current task
      const reqPayload = {
        api_base_url: apiBaseUrl,
        api_key: apiKey,
        model_name: modelName,
        system_prompt: systemPrompt,
        temperature: temperature,
        max_tokens: maxTokens
      };

      // Since we want to step task-by-task, we will call /step endpoint with action.
      // To get the action, the frontend will call our custom API run-agent which returns details for the current task.
      // Let's use our existing run-agent endpoint but filter or support individual steps.
      // To keep it simple, /api/run-agent runs the episode and returns all logs. Let's run it and step through the logged results visually!
      const res = await fetch('/api/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqPayload)
      });
      const runData = await res.json();

      if (runData && runData.details) {
        setEpisodeLog(runData.details);
        setCumulativeReward(runData.average_score);
        setObs({
          task_id: 'EPISODE_COMPLETE',
          task_description: 'All 3 OpenEnv benchmark tasks evaluated.',
          code_snippet: '# Episode Finished.\n# Check score breakdown on right panel.',
          language: 'python',
          step: 4,
          max_steps: 3,
          done: true
        });
        setCurrentStepIndex(4);
        if (onRunCompleted) onRunCompleted();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyPayload = () => {
    const payload = {
      model: modelName,
      temperature: temperature,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Task: ${obs?.task_description}\nCode: ${obs?.code_snippet}` }
      ]
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-[#111111]">
      {/* Control Bar Header */}
      <div className="tech-card p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-[#FF5500]">:: MODEL SELECTOR</span>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="bg-[#FFFFFF] text-slate-900 font-mono text-xs px-3 py-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
          >
            <option value="meta-llama/Llama-3.3-70B-Instruct">Llama 3.3 70B (HF)</option>
            <option value="gpt-4o">GPT-4o (OpenAI)</option>
            <option value="deepseek-ai/DeepSeek-R1">DeepSeek R1 (HF)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            <option value="openenv-simulation-baseline">Baseline Simulation</option>
          </select>

          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3 py-2 border border-[#C8CCD0] bg-[#FFFFFF] hover:border-[#FF5500] text-xs font-bold text-slate-800 flex items-center space-x-1.5"
          >
            <Key className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{apiKey ? 'API KEY SET' : 'SET API KEY'}</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-3 py-2 border border-[#C8CCD0] bg-[#FFFFFF] hover:border-[#FF5500] text-xs font-bold text-slate-800 flex items-center space-x-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>SETTINGS</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 border border-[#C8CCD0] bg-[#FFFFFF] hover:bg-[#F0F2F4] text-xs font-bold text-slate-800 flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET EPISODE</span>
          </button>
          <button
            onClick={handleExecuteStep}
            disabled={loading || (obs && obs.done)}
            className="btn-orange-chaingpt px-6 py-2 text-xs flex items-center space-x-1.5"
          >
            <span>{obs && obs.done ? 'EPISODE DONE' : 'RUN EPISODE'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trajectory Stepper Bar */}
      <div className="tech-card p-4 bg-[#FFFFFF] border border-[#C8CCD0] flex items-center justify-between text-xs font-bold">
        <div className="flex items-center space-x-2">
          <span className="orange-dot"></span>
          <span>EPISODE TRAJECTORY STEPPER:</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 border ${currentStepIndex === 1 ? 'border-[#FF5500] bg-[#FF5500] text-white' : 'border-[#C8CCD0] text-slate-400'}`}>
            01_EASY
          </span>
          <span className="text-slate-400">&rarr;</span>
          <span className={`px-2 py-1 border ${currentStepIndex === 2 ? 'border-[#FF5500] bg-[#FF5500] text-white' : 'border-[#C8CCD0] text-slate-400'}`}>
            02_MED
          </span>
          <span className="text-slate-400">&rarr;</span>
          <span className={`px-2 py-1 border ${currentStepIndex === 3 ? 'border-[#FF5500] bg-[#FF5500] text-white' : 'border-[#C8CCD0] text-slate-400'}`}>
            03_HARD
          </span>
          <span className="text-slate-400">&rarr;</span>
          <span className={`px-2 py-1 border ${currentStepIndex === 4 ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-[#C8CCD0] text-slate-400'}`}>
            COMPLETE
          </span>
        </div>
      </div>

      {/* Settings Drawer */}
      {showSettings && (
        <div className="tech-card p-5 bg-[#F0F2F4] space-y-4 border border-[#FF5500]/50 animate-fadeIn">
          <span className="text-xs font-bold text-[#FF5500] block">:: AGENT RUNTIME PARAMETERS</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold block text-slate-700">TEMPERATURE</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1.0"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full bg-[#FFFFFF] p-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold block text-slate-700">MAX TOKENS</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full bg-[#FFFFFF] p-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold block text-slate-700">SYSTEM PROMPT</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={2}
                className="w-full bg-[#FFFFFF] p-2 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500] text-[11px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Grid Layout (Observation + Score) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Observation Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="tech-card p-5 space-y-4 bg-[#FFFFFF]">
            <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3 text-xs">
              <span className="font-bold text-[#FF5500]">
                ACTIVE OBSERVATION: {obs ? obs.task_id : 'TASK1_EASY'}
              </span>
              <span className="text-slate-500">
                STEP {obs ? obs.step : 1} / {obs ? obs.max_steps : 3}
              </span>
            </div>

            {obs && obs.context && (
              <div className="bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 leading-relaxed flex items-start space-x-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">ENVIRONMENT HINT:</span>
                  {obs.context}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs font-bold block mb-1">TASK OBJECTIVE:</span>
              <p className="text-xs text-slate-700 bg-[#F0F2F4] p-3 border border-[#C8CCD0] leading-relaxed">
                {obs ? obs.task_description : 'Loading observation...'}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span>TARGET CODE SNIPPET:</span>
                <button
                  onClick={copyPayload}
                  className="text-slate-500 hover:text-[#FF5500] flex items-center space-x-1"
                  title="Copy Prompt Payload"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'INSPECT PROMPT'}</span>
                </button>
              </div>
              <div className="bg-[#111111] text-[#E6E8EA] p-4 border border-[#C8CCD0] text-xs overflow-x-auto font-mono leading-6">
                <pre>
                  {obs ? obs.code_snippet.split('\n').map((line, idx) => (
                    <div key={idx} className="flex hover:bg-white/5 px-2 py-0.5 rounded transition">
                      <span className="w-8 text-slate-600 select-none text-right pr-4 font-mono">
                        {idx + 1}
                      </span>
                      <span>{line}</span>
                    </div>
                  )) : 'Loading code...'}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Score & Feedback Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="tech-card p-5 space-y-4 bg-[#FFFFFF]">
            <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-3">
              <span className="font-bold text-xs">OPENENV REWARD SCORE</span>
              <span className="text-2xl font-extrabold text-[#FF5500]">
                {cumulativeReward.toFixed(4)}
              </span>
            </div>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {episodeLog.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#C8CCD0] flex items-center justify-center mx-auto text-[#FF5500] font-bold">
                    RL
                  </div>
                  <p>Click <span className="text-[#FF5500] font-bold">"RUN EPISODE"</span> to trigger LLM benchmark evaluation.</p>
                </div>
              ) : (
                episodeLog.map((log, idx) => (
                  <div key={idx} className="bg-[#F0F2F4] p-4 border border-[#C8CCD0] space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-[#FF5500] border-b border-[#C8CCD0] pb-1.5">
                      <span className="uppercase">{log.task_id}</span>
                      <span>SCORE: {log.score.toFixed(4)}</span>
                    </div>
                    
                    <div className="space-y-1">
                      {log.feedback.split(' | ').map((fb, fidx) => (
                        <div key={fidx} className="text-[11px] text-slate-700 flex items-start space-x-1.5">
                          <span className={fb.startsWith('✓') ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                            {fb.startsWith('✓') ? '✓' : '✗'}
                          </span>
                          <span>{fb.replace(/^[✓~✗]\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#E6E8EA] border border-[#C8CCD0] max-w-md w-full p-6 text-xs font-mono space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm text-[#111111] uppercase">:: CONFIGURE API KEY</h3>
            <p className="text-slate-600 leading-relaxed">
              Enter your HuggingFace or OpenAI key to test remote LLMs. Leave empty to use local simulation.
            </p>
            <input
              type="password"
              placeholder="hf_... or sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#FFFFFF] p-2.5 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowKeyModal(false)} className="px-4 py-2 border border-[#C8CCD0]">CANCEL</button>
              <button
                onClick={() => {
                  localStorage.setItem('openenv_api_key', apiKey);
                  setApiKey(apiKey);
                  setShowKeyModal(false);
                }}
                className="btn-orange-chaingpt px-4 py-2"
              >
                SAVE KEY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
