---
title: Code Review OpenEnv
emoji: 🔍
colorFrom: blue
colorTo: green
sdk: docker
app_port: 8000
pinned: false
---

# 🔍 Code Review OpenEnv & Web Dashboard

> **Meta PyTorch OpenEnv Specification Compatible**  
> An RL environment & production Web Application where AI agents perform automated code reviews — identifying bugs, suggesting fixes, rating severity, and detecting security vulnerabilities across tasks of increasing difficulty.

<p align="center">
  <img src="https://img.shields.io/badge/Task-Reinforcement%20Learning-10b981?style=flat-square" alt="RL Task">
  <img src="https://img.shields.io/badge/Language-Python-blue?style=flat-square" alt="Python">
  <img src="https://img.shields.io/badge/Framework-FastAPI%20%7C%20OpenEnv-black?style=flat-square" alt="Frameworks">
  <img src="https://img.shields.io/badge/Hackathon-Meta%20PyTorch%20%C3%97%20SST%202026-8b5cf6?style=flat-square" alt="Hackathon">
</p>

---

## 🌟 Interactive Features & UI/UX

This project features a **full-stack production Web UI** served directly on port `8000`:

1. 🎮 **Live Agent Playground**: Select model (Llama 3.3 70B, GPT-4o, DeepSeek R1, Gemini 1.5, or Custom), configure API keys, and run step-by-step or full auto-pilot episodes with real-time score gauges and feedback.
2. 🧪 **Custom Code Sandbox**: Paste custom Python snippets or pick from bug templates (SQL Injection, Command Injection, Secrets, Resource Leak, Insecure Pickle, Bare Except) to run automated AI code audits with fix previews.
3. 🛡️ **Task Explorer**: Inspect all benchmark tasks, code snippets, ground-truth rules, and partial-credit reward weightings.
4. 📊 **Benchmark Leaderboard & Analytics**: Recharts performance visualization comparing models across tasks, with episode history and JSON/CSV score export.
5. 🔌 **OpenEnv API & MCP Inspector**: Interactive REST API tester and schema viewer compliant with Meta PyTorch OpenEnv specification.

---

## 🏗️ Environment Overview

| Property | Value |
|---|---|
| Task type | Code review (text-based) |
| Language | Python |
| Framework | FastAPI + React (Vite) + OpenEnv |
| Tasks | 3 (easy → medium → hard) + Custom Code Sandbox |
| Episodes | Sequential — all 3 tasks per episode |
| Score range | 0.0 – 1.0 per task |

---

## 👁️ Observation & Action Space

### 1. Observation Space (State)
At each step, the environment returns the following state:
* `task_id` (str): Unique identifier for the active code module.
* `task_description` (str): Focus prompt for the agent.
* `code_snippet` (str): Python code snippet to review.
* `context` (str): Extra details about the module's target functionality.
* `step` / `max_steps` (int): Progress indicator.

### 2. Action Space (Agent Reply)
The agent must reply with a structured response matching:
```json
{
  "identified_issues": ["string"],
  "suggested_fixes": ["string"],
  "severity": "low | medium | high | critical",
  "explanation": "Detailed review notes...",
  "line_numbers": [108]
}
```

---

## 🏆 Benchmark Tasks

### Task 1 — Easy: NameError (Typo)
```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = totl / len(numbers)   # <-- Typo: 'totl' is undefined
    return average
```
* **Objective:** Detect the `NameError`, suggest the correct variable, and rate severity.

### Task 2 — Medium: Logic Bug & Side Effect
```python
def find_second_largest(numbers):
    if len(numbers) < 2:
        return None
    numbers.sort()       # <-- Side Effect: Mutates caller's original list
    return numbers[1]    # <-- Logic Bug: Returns 2nd smallest, not 2nd largest
```
* **Objective:** Detect *both* caller side effects and the incorrect sorting index.

### Task 3 — Hard: SQL Injection (Vulnerability)
```python
def authenticate(username, password):
    # <-- Security Flaw: String concatenation in database execute statement
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query) 
```
* **Goal:** Name the vulnerability, show a concrete exploit (`' OR '1'='1`), and rewrite with parameterized queries.  
* **Max score:** 1.0 | **Expected difficulty:** Challenges frontier models on exploit depth

---

## 🔌 API & UI Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Interactive Web Dashboard UI |
| `/reset` | POST | Start new episode, returns Observation |
| `/step` | POST | Submit Action, returns StepResult + Reward |
| `/state` | GET | Returns full EnvironmentState |
| `/health` | GET | Health check |
| `/tasks` | GET | List all task IDs and descriptions |
| `/api/run-agent` | POST | Trigger live agent benchmark run |
| `/api/evaluate-custom` | POST | Audit custom user Python snippet |
| `/api/history` | GET | Fetch benchmark execution history |

---

## 🚀 Setup & Usage

### Local Development (Python + Vite)
```bash
git clone https://github.com/nirnayyy/openenv-code-review
cd openenv-code-review

# Install backend dependencies
pip install -r requirements.txt

# Build frontend UI
cd frontend && npm install && npm run build && cd ..

# Start FastAPI server (serves both API & UI on port 8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
Open `http://localhost:8000` in your browser!

### Single-Container Production Docker Deployment
```bash
docker build -t code-review-openenv .
docker run -p 8000:8000 code-review-openenv
```

### Run Baseline RL Evaluation Script
```bash
export API_BASE_URL="https://router.huggingface.co/v1"
export MODEL_NAME="meta-llama/Llama-3.3-70B-Instruct"
export HF_TOKEN="your_hf_token_here"
export ENV_BASE_URL="http://localhost:8000"

python inference.py
```

---

## 📈 Baselines & Scores

Evaluated on `meta-llama/Llama-3.3-70B-Instruct`:

| Task ID | Task Difficulty | Score | Notes |
| :--- | :--- | :---: | :--- |
| `task1_easy` | Easy | **0.80** | Found NameError and fix, rated severity slightly off. |
| `task2_medium`| Medium | **1.00** | Successfully detected both mutation and index bug. |
| `task3_hard` | Hard | **1.00** | Flagged SQL injection, provided exploit, and parameterized. |
| **Average** | | **0.93** | |

---

## 📁 Repository Structure
```
openenv-code-review/
├── inference.py          # Baseline inference script (mandatory)
├── openenv.yaml          # OpenEnv spec metadata
├── Dockerfile            # Multi-stage Docker container definition
├── requirements.txt      # Python dependencies
├── README.md
├── app/
│   ├── main.py           # FastAPI server & static UI router
│   ├── models.py         # Pydantic models & API schemas
│   ├── environment.py    # Core RL environment logic
│   └── tasks/            # Benchmark task definitions
└── frontend/             # React + Vite + Tailwind CSS Web App
    ├── src/
    │   ├── components/   # Dashboard UI components
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```
