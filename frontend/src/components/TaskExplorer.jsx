import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function TaskExplorer() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data.details || []))
      .catch((err) => console.error(err));
  }, []);

  const fallbackTasks = [
    {
      task_id: 'TASK1_EASY',
      difficulty: 'EASY',
      description: 'Identify NameError caused by a typo in a variable name totl vs total.',
      code_snippet: `def calculate_average(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    average = totl / len(numbers)   # typo 'totl'\n    return average`
    },
    {
      task_id: 'TASK2_MEDIUM',
      difficulty: 'MEDIUM',
      description: 'Identify wrong list index returning 2nd smallest AND in-place list mutation side effect.',
      code_snippet: `def find_second_largest(numbers):\n    if len(numbers) < 2:\n        return None\n    numbers.sort()       # mutates caller list\n    return numbers[1]    # wrong index`
    },
    {
      task_id: 'TASK3_HARD',
      difficulty: 'HARD',
      description: 'Detect SQL injection vulnerability, demonstrate exploit payload, and provide parameterized query fix.',
      code_snippet: `def authenticate(username, password):\n    query = "SELECT * FROM users WHERE username = '" + username + "'"\n    cursor.execute(query)`
    }
  ];

  const displayTasks = tasks.length > 0 ? tasks : fallbackTasks;

  return (
    <div className="space-y-6 font-mono text-[#111111]">
      <div className="tech-card p-6 border border-[#C8CCD0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#FF5500] uppercase block">:: BENCHMARK SUITE DIRECTORY</span>
          <h2 className="text-xl font-bold font-display uppercase mt-1">OPENENV BENCHMARK TASKS</h2>
        </div>
        <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#C8CCD0] text-xs font-bold text-[#FF5500]">
          TOTAL TASKS: 3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayTasks.map((t, idx) => (
          <div key={t.task_id} className="tech-card p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#C8CCD0] pb-3 text-xs font-bold">
                <span className="text-[#FF5500] font-mono">{t.task_id}</span>
                {(() => {
                  const diff = (t.difficulty || fallbackTasks[idx]?.difficulty || 'MEDIUM').toUpperCase();
                  const bgClass = diff === 'EASY' ? 'bg-emerald-600 text-white' : diff === 'HARD' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white';
                  return <span className={`px-2 py-0.5 uppercase text-[10px] font-bold rounded ${bgClass}`}>{diff}</span>;
                })()}
              </div>

              <p className="text-xs text-slate-700 my-3 leading-relaxed">
                {t.description || t.task_description}
              </p>

              <div className="bg-[#111111] text-[#E6E8EA] p-3 text-[11px] overflow-x-auto">
                <pre>{t.code_snippet}</pre>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C8CCD0] text-[11px] text-slate-500 font-bold">
              MAX SCORE: 1.00
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
