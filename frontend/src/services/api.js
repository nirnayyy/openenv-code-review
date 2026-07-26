/**
 * Centralized API Service for OpenEnv Code Review Benchmark Backend
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function fetchJSON(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Reset RL environment
  resetEnv: () => fetchJSON('/reset', { method: 'POST' }),

  // Submit action step
  stepEnv: (action) =>
    fetchJSON('/step', {
      method: 'POST',
      body: JSON.stringify(action),
    }),

  // Inspect internal environment state
  getState: () => fetchJSON('/state'),

  // Server health check
  getHealth: () => fetchJSON('/health'),

  // OpenEnv metadata spec
  getMetadata: () => fetchJSON('/metadata'),

  // JSON Schemas for payloads
  getSchema: () => fetchJSON('/schema'),

  // List all environment tasks
  getTasks: () => fetchJSON('/tasks'),

  // Run automated episode evaluation
  runAgent: (payload) =>
    fetchJSON('/api/run-agent', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Evaluate user custom code snippet
  evaluateCustom: (payload) =>
    fetchJSON('/api/evaluate-custom', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Get benchmark evaluation history
  getHistory: () => fetchJSON('/api/history'),
};

export default api;
