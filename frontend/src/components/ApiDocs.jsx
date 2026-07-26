import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export default function ApiDocs() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/health');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('{}');
  const [responseOutput, setResponseOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    { path: '/reset', method: 'POST', desc: 'Resets environment to Task 1, returns initial Observation payload', defaultBody: '{}' },
    { 
      path: '/step', 
      method: 'POST', 
      desc: 'Submits Action JSON payload, returns StepResult (Reward + next Observation)',
      defaultBody: JSON.stringify({
        identified_issues: ["NameError variable totl not defined"],
        suggested_fixes: ["Change totl to total on line 6"],
        severity: "high",
        explanation: "Variable totl misspelled on line 6.",
        line_numbers: [6]
      }, null, 2)
    },
    { path: '/state', method: 'GET', desc: 'Returns current internal state snapshot', defaultBody: '' },
    { path: '/tasks', method: 'GET', desc: 'Returns all available task IDs and descriptions', defaultBody: '' },
    { path: '/health', method: 'GET', desc: 'Health check endpoint', defaultBody: '' },
    { path: '/schema', method: 'GET', desc: 'Returns Pydantic JSON Schema for core payloads', defaultBody: '' },
    { path: '/mcp', method: 'POST', desc: 'Model Context Protocol JSON-RPC endpoint', defaultBody: JSON.stringify({ jsonrpc: "2.0", method: "status", id: 1 }, null, 2) }
  ];

  const handleTestApi = async () => {
    setLoading(true);
    setResponseOutput(null);

    try {
      const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
      };
      if (method === 'POST' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(selectedEndpoint, options);
      const data = await res.json();
      setResponseOutput(data);
    } catch (err) {
      setResponseOutput({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-[#111111]">
      <div className="tech-card p-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-[#FF5500] uppercase block">:: REST & MCP API EXPLORER</span>
          <h2 className="text-xl font-bold font-display uppercase mt-1">OPENENV API SPECIFICATION</h2>
        </div>
        <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#C8CCD0] text-xs font-bold text-slate-800">
          META PYTORCH OPENENV v1.0.0
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block px-1">ENDPOINTS</span>
          {endpoints.map((ep) => (
            <button
              key={ep.path}
              onClick={() => {
                setSelectedEndpoint(ep.path);
                setMethod(ep.method);
                setRequestBody(ep.defaultBody);
                setResponseOutput(null);
              }}
              className={`w-full text-left p-3 border transition flex justify-between items-center ${
                selectedEndpoint === ep.path
                  ? 'bg-[#FFFFFF] border-[#FF5500] text-[#FF5500] font-bold'
                  : 'bg-[#F0F2F4] border-[#C8CCD0] text-slate-800 hover:bg-[#FFFFFF]'
              }`}
            >
              <div>
                <span className="text-xs block font-bold">{ep.path}</span>
                <span className="text-[10px] text-slate-500 block truncate max-w-[180px]">{ep.desc}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#111111] text-white">
                {ep.method}
              </span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="tech-card p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#C8CCD0] pb-3 text-xs">
              <span className="font-bold text-[#FF5500]">{method} {selectedEndpoint}</span>
              <button
                onClick={handleTestApi}
                disabled={loading}
                className="btn-orange-chaingpt px-4 py-2 text-xs flex items-center space-x-1"
              >
                <span>SEND REQUEST</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {method === 'POST' && (
              <div className="space-y-1">
                <span className="text-xs font-bold block">REQUEST BODY (JSON):</span>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={5}
                  className="w-full bg-[#111111] text-[#E6E8EA] font-mono text-xs p-3 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs font-bold block">RESPONSE OUTPUT:</span>
              <div className="bg-[#111111] text-[#E6E8EA] p-4 border border-[#C8CCD0] text-xs max-h-80 overflow-y-auto font-mono">
                {loading ? (
                  <span className="text-[#FF5500]">Executing HTTP request...</span>
                ) : responseOutput ? (
                  <pre>{JSON.stringify(responseOutput, null, 2)}</pre>
                ) : (
                  <span className="text-slate-500">Click "SEND REQUEST" to test live.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
