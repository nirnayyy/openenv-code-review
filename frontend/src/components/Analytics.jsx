import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { ArrowUpRight, Download, Filter } from 'lucide-react';

export default function Analytics() {
  const [history, setHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState('ALL');

  useEffect(() => {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch((err) => console.error(err));
  }, []);

  const benchmarkData = [
    { name: 'Llama-3.3-70B', easy: 0.80, medium: 1.00, hard: 1.00, speed: 0.85, accuracy: 0.90, avg: 0.9333 },
    { name: 'GPT-4o', easy: 1.00, medium: 1.00, hard: 1.00, speed: 0.95, accuracy: 0.98, avg: 1.0000 },
    { name: 'DeepSeek-R1', easy: 0.90, medium: 1.00, hard: 0.95, speed: 0.70, accuracy: 0.92, avg: 0.9500 },
    { name: 'Gemini-1.5-Pro', easy: 0.85, medium: 0.95, hard: 1.00, speed: 0.90, accuracy: 0.94, avg: 0.9333 },
  ];

  // Merge recent runs into benchmarkData if present
  if (history.length > 0) {
    history.forEach(run => {
      const modelName = run.model.split('/').pop();
      if (!benchmarkData.some(b => b.name === modelName)) {
        benchmarkData.push({
          name: modelName,
          easy: run.task_scores.task1_easy || 0,
          medium: run.task_scores.task2_medium || 0,
          hard: run.task_scores.task3_hard || 0,
          speed: 0.80,
          accuracy: run.average_score,
          avg: run.average_score
        });
      }
    });
  }

  // Filtered table logs
  const filteredHistory = history.filter(record => 
    selectedModel === 'ALL' || record.model.toLowerCase().includes(selectedModel.toLowerCase())
  );

  // Radar chart data for Llama 3.3 vs GPT-4o
  const radarData = [
    { subject: 'Task 1 (Easy)', 'Llama-3.3': 0.80, 'GPT-4o': 1.00, fullMark: 1.0 },
    { subject: 'Task 2 (Med)', 'Llama-3.3': 1.00, 'GPT-4o': 1.00, fullMark: 1.0 },
    { subject: 'Task 3 (Hard)', 'Llama-3.3': 1.00, 'GPT-4o': 1.00, fullMark: 1.0 },
    { subject: 'Audit Speed', 'Llama-3.3': 0.85, 'GPT-4o': 0.95, fullMark: 1.0 },
    { subject: 'Fix Accuracy', 'Llama-3.3': 0.90, 'GPT-4o': 0.98, fullMark: 1.0 },
  ];

  const exportCSV = () => {
    const headers = ['Run ID', 'Model', 'Task 1', 'Task 2', 'Task 3', 'Average Score'];
    const rows = history.map(r => [
      r.id,
      r.model,
      r.task_scores.task1_easy || 0,
      r.task_scores.task2_medium || 0,
      r.task_scores.task3_hard || 0,
      r.average_score
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", "openenv_benchmark_metrics.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 font-mono text-[#111111]">
      <div className="tech-card p-6 flex justify-between items-center bg-[#FFFFFF]">
        <div>
          <span className="text-xs font-bold text-[#FF5500] uppercase block">:: LEADERBOARD & PERFORMANCE ANALYTICS</span>
          <h2 className="text-xl font-bold font-display uppercase mt-1">AI AGENT BENCHMARK STATISTICS</h2>
        </div>
        <button
          onClick={exportCSV}
          className="px-3.5 py-2 border border-[#C8CCD0] bg-[#FFFFFF] hover:border-[#FF5500] text-xs font-bold text-slate-800 flex items-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* Recharts Performance Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Scores by Task */}
        <div className="tech-card p-6 bg-[#FFFFFF] space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase block">TASK SCORE COMPARISON</span>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C8CCD0" />
                <XAxis dataKey="name" stroke="#111111" fontSize={10} />
                <YAxis stroke="#111111" domain={[0, 1.0]} fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', color: '#FFFFFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                <Bar dataKey="easy" fill="#FF5500" name="Task 1 (Easy)" />
                <Bar dataKey="medium" fill="#111111" name="Task 2 (Medium)" />
                <Bar dataKey="hard" fill="#7C3AED" name="Task 3 (Hard)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart: Multi-Dimensional Performance (Llama vs GPT-4o) */}
        <div className="tech-card p-6 bg-[#FFFFFF] space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase block">MULTI-DIMENSIONAL AUDIT ANALYSIS</span>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#C8CCD0" />
                <PolarAngleAxis dataKey="subject" stroke="#111111" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 1.0]} fontSize={9} />
                <Radar name="Llama 3.3" dataKey="Llama-3.3" stroke="#FF5500" fill="#FF5500" fillOpacity={0.3} />
                <Radar name="GPT-4o" dataKey="GPT-4o" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', color: '#FFFFFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Log Table */}
      <div className="tech-card p-6 bg-[#FFFFFF] space-y-4">
        <div className="flex justify-between items-center border-b border-[#C8CCD0] pb-2">
          <span className="text-xs font-bold text-[#FF5500] uppercase block">:: DETAILED BENCHMARK RUN HISTORY</span>
          <div className="flex items-center space-x-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-[#F0F2F4] p-1 border border-[#C8CCD0] font-mono text-[11px]"
            >
              <option value="ALL">ALL MODELS</option>
              <option value="llama">LLAMA</option>
              <option value="gpt">GPT</option>
              <option value="deepseek">DEEPSEEK</option>
              <option value="gemini">GEMINI</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#C8CCD0] text-slate-500">
                <th className="pb-2 px-2">RUN ID</th>
                <th className="pb-2 px-2">MODEL</th>
                <th className="pb-2 px-2">TASK 1</th>
                <th className="pb-2 px-2">TASK 2</th>
                <th className="pb-2 px-2">TASK 3</th>
                <th className="pb-2 px-2 text-right">AVG SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8CCD0]">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">No evaluation runs recorded.</td>
                </tr>
              ) : (
                filteredHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-[#F0F2F4] transition">
                    <td className="py-3 px-2 font-bold text-[#FF5500]">{record.id}</td>
                    <td className="py-3 px-2">{record.model}</td>
                    <td className="py-3 px-2">{record.task_scores.task1_easy ? record.task_scores.task1_easy.toFixed(2) : '-'}</td>
                    <td className="py-3 px-2">{record.task_scores.task2_medium ? record.task_scores.task2_medium.toFixed(2) : '-'}</td>
                    <td className="py-3 px-2">{record.task_scores.task3_hard ? record.task_scores.task3_hard.toFixed(2) : '-'}</td>
                    <td className="py-3 px-2 text-right font-bold text-[#111111]">{record.average_score.toFixed(4)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
