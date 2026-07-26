import React, { useState } from 'react';
import { ArrowUpRight, Upload, Download, Tag, FileText, CheckCircle } from 'lucide-react';

export default function CustomSandbox() {
  const bugTemplates = [
    {
      title: 'SQL Injection Vulnerability',
      severity: 'CRITICAL',
      category: 'security',
      code: `import sqlite3\n\ndef authenticate_user(username, password):\n    conn = sqlite3.connect("users.db")\n    cursor = conn.cursor()\n    # BUG: String concatenation in SQL query\n    query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"\n    cursor.execute(query)\n    return cursor.fetchone()`,
      fix: `import sqlite3\n\ndef authenticate_user(username, password):\n    conn = sqlite3.connect("users.db")\n    cursor = conn.cursor()\n    # FIX: Parameterized SQL query placeholder\n    query = "SELECT * FROM users WHERE username = ? AND password = ?"\n    cursor.execute(query, (username, password))\n    return cursor.fetchone()`
    },
    {
      title: 'List Mutation Side Effect',
      severity: 'MEDIUM',
      category: 'logic-bug',
      code: `def get_top_three_scores(scores):\n    # BUG: .sort() mutates caller's list in-place\n    scores.sort(reverse=True)\n    return scores[:3]`,
      fix: `def get_top_three_scores(scores):\n    # FIX: Use sorted() to avoid mutating original list\n    return sorted(scores, reverse=True)[:3]`
    },
    {
      title: 'Command Injection Vulnerability',
      severity: 'CRITICAL',
      category: 'security',
      code: `import os\nimport subprocess\n\ndef ping_host(user_ip):\n    # BUG: Passing unsanitized input with shell=True\n    cmd = "ping -c 1 " + user_ip\n    subprocess.call(cmd, shell=True)`,
      fix: `import subprocess\nimport shlex\n\ndef ping_host(user_ip):\n    # FIX: Pass arguments as list without shell execution\n    subprocess.run(["ping", "-c", "1", user_ip], check=True)`
    },
    {
      title: 'Hardcoded API Token / Secret',
      severity: 'HIGH',
      category: 'security',
      code: `import requests\n\ndef fetch_user_data():\n    # BUG: Hardcoded secret token in source code\n    api_key = "sk_live_99a88b77c66d55e44"\n    headers = {"Authorization": f"Bearer {api_key}"}\n    return requests.get("https://api.service.com/user", headers=headers).json()`,
      fix: `import os\nimport requests\n\ndef fetch_user_data():\n    # FIX: Load API key from environment variables\n    api_key = os.getenv("SERVICE_API_KEY")\n    headers = {"Authorization": f"Bearer {api_key}"}\n    return requests.get("https://api.service.com/user", headers=headers).json()`
    },
    {
      title: 'Insecure Pickle Deserialization',
      severity: 'HIGH',
      category: 'security',
      code: `import pickle\n\ndef load_session_state(raw_data):\n    # BUG: pickle.loads() executes arbitrary code payloads\n    state = pickle.loads(raw_data)\n    return state`,
      fix: `import json\n\ndef load_session_state(raw_data):\n    # FIX: Use safe JSON format for state deserialization\n    state = json.loads(raw_data.decode('utf-8'))\n    return state`
    },
    {
      title: 'Swallowing Exception Handler',
      severity: 'MEDIUM',
      category: 'logic-bug',
      code: `def process_payment(account_id, amount):\n    try:\n        database.charge(account_id, amount)\n    except:\n        # BUG: Swallowing all exceptions silently hides failures\n        pass`,
      fix: `import logging\n\ndef process_payment(account_id, amount):\n    try:\n        database.charge(account_id, amount)\n    except PaymentGatewayError as err:\n        # FIX: Catch specific exception and log context\n        logging.error("Payment failed for %s: %s", account_id, err)\n        raise`
    }
  ];

  const [codeSnippet, setCodeSnippet] = useState(bugTemplates[0].code);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const apiKey = localStorage.getItem('openenv_api_key') || '';
      const res = await fetch('/api/evaluate-custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_snippet: codeSnippet,
          api_key: apiKey
        })
      });
      const data = await res.json();
      
      // Auto-generate patch for diff viewer based on template or heuristic
      const matchedTemplate = bugTemplates.find(t => t.code.trim() === codeSnippet.trim());
      const fixCode = matchedTemplate ? matchedTemplate.fix : codeSnippet.replace(/query = ".*" \+ username.*/, 'query = "SELECT * FROM users WHERE username = ?", (username,)');
      
      setEvalResult({
        ...data,
        fix_code: fixCode
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCodeSnippet(evt.target.result);
        setEvalResult(null);
      };
      reader.readAsText(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCodeSnippet(evt.target.result);
        setEvalResult(null);
      };
      reader.readAsText(file);
    }
  };

  const exportReport = () => {
    if (!evalResult) return;
    const report = `# OpenEnv AI Audit Report\n\n## Summary\n- **Overall Score**: ${evalResult.reward.score.toFixed(4)}\n- **Severity**: ${evalResult.action.severity}\n\n## Identified Issues\n${evalResult.action.identified_issues.map(i => `- ${i}`).join('\n')}\n\n## Suggested Fixes\n${evalResult.action.suggested_fixes.map(f => `- ${f}`).join('\n')}\n\n## Review Explanation\n${evalResult.action.explanation}`;
    
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(report);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "openenv_audit_report.md");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredTemplates = bugTemplates.filter(t => selectedCategory === 'all' || t.category === selectedCategory);

  return (
    <div className="space-y-6 font-mono text-[#111111]">
      {/* Preset Category Tag Filters */}
      <div className="tech-card p-5 space-y-4 bg-[#FFFFFF]">
        <div className="flex items-center justify-between border-b border-[#C8CCD0] pb-2">
          <span className="text-xs font-bold text-[#FF5500] uppercase block">
            :: PRESET BUG TEMPLATE DIRECTORY
          </span>
          <div className="flex space-x-2 text-[10px]">
            {['all', 'security', 'logic-bug', 'resource-leak'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 border ${
                  selectedCategory === cat ? 'bg-[#FF5500] border-[#FF5500] text-white' : 'border-[#C8CCD0] text-slate-600'
                } uppercase`}
              >
                #{cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {filteredTemplates.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCodeSnippet(tmpl.code);
                setEvalResult(null);
              }}
              className="text-left bg-[#F0F2F4]/50 p-3 border border-[#C8CCD0] hover:border-[#FF5500] transition"
            >
              <span className="text-xs font-bold block text-slate-800 truncate">{tmpl.title}</span>
              <span className="text-[10px] text-[#FF5500] font-bold block mt-1">SEVERITY: {tmpl.severity}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor & File Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div 
            className={`tech-card p-5 space-y-3 bg-[#FFFFFF] relative ${dragActive ? 'border-[#FF5500] bg-orange-50/20' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex justify-between items-center border-b border-[#C8CCD0] pb-2 text-xs font-bold">
              <span>PYTHON CODE AUDIT EDITOR</span>
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer text-slate-500 hover:text-[#FF5500] flex items-center space-x-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>UPLOAD FILE</span>
                  <input type="file" accept=".py" onChange={handleFileUpload} className="hidden" />
                </label>
                <button onClick={() => setCodeSnippet('')} className="text-slate-500 hover:text-rose-500">
                  CLEAR
                </button>
              </div>
            </div>

            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              rows={13}
              placeholder="# Drag and drop .py files or paste your Python code here..."
              className="w-full bg-[#111111] text-[#E6E8EA] font-mono text-xs p-4 border border-[#C8CCD0] focus:outline-none focus:border-[#FF5500] leading-6"
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">{codeSnippet.split('\n').length} LINES</span>
              <button
                onClick={handleEvaluate}
                disabled={loading || !codeSnippet.trim()}
                className="btn-orange-chaingpt px-6 py-2.5 text-xs flex items-center space-x-1.5"
              >
                <span>{loading ? 'RUNNING AI AUDIT...' : 'RUN AI AUDIT'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="tech-card p-5 space-y-4 bg-[#FFFFFF]">
            <div className="flex justify-between items-center border-b border-[#C8CCD0] pb-2 text-xs font-bold">
              <span className="text-[#FF5500]">:: AUDIT REPORT & METRICS</span>
              {evalResult && (
                <button
                  onClick={exportReport}
                  className="text-slate-500 hover:text-[#FF5500] flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT</span>
                </button>
              )}
            </div>

            {!evalResult ? (
              <div className="text-center py-16 text-slate-500 text-xs space-y-3">
                <FileText className="w-8 h-8 mx-auto text-slate-400" />
                <p>Run the AI Audit tool to analyze code syntax, quality, and vulnerabilities.</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-[#F0F2F4] p-3.5 border border-[#C8CCD0] flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">OPENENV REWARD</span>
                    <span className="text-xl font-bold text-[#FF5500]">{evalResult.reward.score.toFixed(4)}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 bg-[#111111] text-white">
                    {evalResult.action.severity}
                  </span>
                </div>

                <div>
                  <span className="font-bold block mb-1">IDENTIFIED BUGS:</span>
                  {evalResult.action.identified_issues.map((iss, idx) => (
                    <div key={idx} className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded mb-1">
                      ✗ {iss}
                    </div>
                  ))}
                </div>

                <div>
                  <span className="font-bold block mb-1">RECOMMENDED ACTIONS:</span>
                  {evalResult.action.suggested_fixes.map((fix, idx) => (
                    <div key={idx} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded mb-1 font-bold">
                      ✓ {fix}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Diff Viewer */}
      {evalResult && evalResult.fix_code && (
        <div className="tech-card p-5 bg-[#FFFFFF] space-y-3">
          <div className="flex items-center space-x-2 border-b border-[#C8CCD0] pb-2 text-xs font-bold text-[#FF5500]">
            <CheckCircle className="w-4 h-4" />
            <span>:: SIDE-BY-SIDE SECURE FIX PATCH VISUALIZER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Original Code */}
            <div>
              <span className="text-[10px] font-bold text-rose-500 block mb-1">ORIGINAL BUGGY CODE:</span>
              <div className="bg-[#111111] text-[#E6E8EA] p-3 text-[11px] overflow-x-auto border border-[#C8CCD0] font-mono leading-5 max-h-80">
                <pre>
                  {codeSnippet.split('\n').map((line, idx) => {
                    const isBuggyLine = (evalResult?.action?.line_numbers && evalResult.action.line_numbers.includes(idx + 1)) ||
                      line.includes('# BUG:') ||
                      line.includes('query = ') ||
                      line.includes('.sort(') ||
                      (line.includes('open(') && !line.includes('with open')) ||
                      line.includes('eval(') ||
                      line.includes('exec(') ||
                      line.includes('pickle.') ||
                      line.includes('subprocess.call(') ||
                      (line.includes('api_key =') && !line.includes('getenv')) ||
                      line.trim() === 'except:';
                    return (
                      <div key={idx} className={isBuggyLine ? 'bg-rose-950/60 text-rose-300 font-bold px-1 rounded border-l-2 border-rose-500' : 'px-1'}>
                        <span className="text-slate-600 select-none text-right pr-3 inline-block w-6">{idx + 1}</span>
                        {line || ' '}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* Right: Secure Fix */}
            <div>
              <span className="text-[10px] font-bold text-emerald-500 block mb-1">SECURE FIX PATCH:</span>
              <div className="bg-[#111111] text-[#E6E8EA] p-3 text-[11px] overflow-x-auto border border-[#C8CCD0] font-mono leading-5 max-h-80">
                <pre>
                  {evalResult.fix_code.split('\n').map((line, idx) => {
                    const isFixedLine = line.includes('# FIX:') ||
                      line.includes('?') ||
                      line.includes('sorted(') ||
                      line.includes('with open') ||
                      line.includes('subprocess.run') ||
                      line.includes('getenv') ||
                      line.includes('json.loads') ||
                      line.includes('logging.');
                    return (
                      <div key={idx} className={isFixedLine ? 'bg-emerald-950/60 text-emerald-300 font-bold px-1 rounded border-l-2 border-emerald-500' : 'px-1'}>
                        <span className="text-slate-600 select-none text-right pr-3 inline-block w-6">{idx + 1}</span>
                        {line || ' '}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
