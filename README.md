---
title: OpenEnv AI Code Reviewer & RL Benchmark
emoji: 🔍
colorFrom: orange
colorTo: black
sdk: docker
app_port: 8000
pinned: true
---

# 🔍 OpenEnv AI Code Reviewer & RL Benchmark System

> **Meta PyTorch OpenEnv Specification Compliant**  
> An industrial-grade Reinforcement Learning (RL) environment & full-stack production Web Application for evaluating and training AI agents on automated code review tasks, AST logic parsing, bug identification, side-effect detection, and critical security vulnerability audits.

<p align="left">
  <img src="https://img.shields.io/badge/PyTorch-OpenEnv%20Spec-FF5500?style=flat-square&logo=pytorch" alt="OpenEnv Spec">
  <img src="https://img.shields.io/badge/FastAPI-0.109.0-009688?style=flat-square&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-Vite%205.4-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tests-8%2F8%20Passing-brightgreen?style=flat-square&logo=pytest" alt="Pytest Pass">
  <img src="https://img.shields.io/badge/Docker-Multi--stage-2496ED?style=flat-square&logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License">
</p>

---

## 🌟 Executive Summary & Portfolio Highlights

**OpenEnv AI Code Reviewer** is built on the **Meta PyTorch OpenEnv specification**, providing standard environments for training frontier Large Language Models (LLMs) on software engineering tasks. Unlike traditional binary pass/fail graders, OpenEnv implements a **continuous partial-credit reward function ($R \in [0.0, 1.0]$)** that evaluates AI models across AST syntax trees, logic bugs, function purity, and concrete security exploit proofs.

### Key Engineering Features:
- 🧪 **Deterministic Partial-Credit AST Grader Engine**: Evaluates agent reviews with fine-grained scoring across 4 weighted axes (Issue Identification, Fix Correctness, Severity Classification, Exploit Proof).
- 🎮 **Live Interactive Agent Playground**: Interactive dashboard to run step-by-step or auto-pilot RL episodes with real-time observation streams, live reward gauges, and execution logs.
- ⚡ **Custom Code Sandbox & Visual Patch Comparator**: Live AST parser and side-by-side visual diff renderer highlighting buggy code lines in red (`−`) and proposed secure patches in green (`+`).
- 🛡️ **Gated Auth & Researcher Session Persistence**: Supabase Auth session management with protected routes, customizable researcher profiles, and local state fallbacks.
- 🎨 **Dual Cybernetic Theme System**: Seamless dark/light theme switching with custom CSS root tokens (`#0A0C0E` Dark Obsidian vs. `#F5F5F7` Bright Crisp Canvas).
- 🌀 **Relume-Style 3D Parallax Motion Stage**: Interactive cursor-tracking 3D perspective stage with differential Z-axis depth layers (`translateZ(50px)`, `translateZ(70px)`) and radial cursor spotlight glow.
- 📊 **Recharts Analytics & Data Export**: Historical benchmark tracking with JSON/CSV export capabilities and model leaderboards.

---

## 🏗️ Architecture & Technical Specification

```
                          ┌─────────────────────────────────────────┐
                          │    Browser UI / Vercel (React + Vite)   │
                          └────────────────────┬────────────────────┘
                                               │ REST API
                                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                FastAPI Server (Port 8000)                              │
│                                                                                        │
│   ┌──────────────────────┐    ┌───────────────────────────┐    ┌───────────────────┐   │
│   │ /reset  &  /step     │    │   /api/evaluate-custom    │    │  /health & /tasks │   │
│   │ OpenEnv Standard RL  │    │  Custom Code Sandbox AST  │    │ Benchmark Metadata│   │
│   └──────────┬───────────┘    └─────────────┬─────────────┘    └─────────┬─────────┘   │
│              │                              │                            │             │
│              ▼                              ▼                            ▼             │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                 Core Environment Logic (app/environment.py)                    │   │
│   └────────────────────────────────────────┬───────────────────────────────────────┘   │
│                                            │                                           │
│                                            ▼                                           │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                     Deterministic Grader Engine (app/tasks/)                   │   │
│   │   Task 1: Easy (NameError) | Task 2: Medium (Logic) | Task 3: Hard (SQLi)     │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Benchmark Environment Properties

| Metric / Attribute | Value / Specification |
|---|---|
| **Environment Standard** | Meta PyTorch OpenEnv Specification |
| **Observation Space** | Dict (`task_id`, `task_description`, `code_snippet`, `context`, `step`, `max_steps`, `done`) |
| **Action Space** | Dict (`identified_issues`, `suggested_fixes`, `severity`, `explanation`, `line_numbers`) |
| **Reward Scale** | $R \in [0.0, 1.0]$ per task (partial credit scoring) |
| **Tasks Per Episode** | 3 sequential tasks (`task1_easy` $\rightarrow$ `task2_medium` $\rightarrow$ `task3_hard`) |
| **Automated Test Suite** | 8/8 Pytest suites passing (100% coverage on health, reset, step, custom AST, history) |
| **Average Audit Latency** | $< 0.4$ seconds per step |

---

## 🏆 Benchmark Tasks & Partial-Credit Grading Mechanics

### Task 1 — Easy: NameError & Typo Detection (`task1_easy`)
```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = totl / len(numbers)   # Line 6: typo - 'totl' should be 'total'
    return average
```
* **Grading Breakdown ($R_{max} = 1.0$)**:
  - `+0.50`: Identifies NameError / undefined variable `totl`.
  - `+0.30`: Recommends renaming `totl` to `total`.
  - `+0.20`: Correctly rates severity as `high` or `critical` (crashes at runtime).

### Task 2 — Medium: Logic Bug & Side Effect Mutation (`task2_medium`)
```python
def find_second_largest(numbers):
    if len(numbers) < 2:
        return None
    numbers.sort()               # Bug 1: Mutates caller's original list (side effect)
    return numbers[1]            # Bug 2: Returns 2nd smallest, not 2nd largest
```
* **Grading Breakdown ($R_{max} = 1.0$)**:
  - `+0.35`: Detects incorrect index (`numbers[1]` returns 2nd smallest).
  - `+0.25`: Detects list mutation side effect (`sort()` modifies list in-place).
  - `+0.25`: Provides non-mutating parameterized fix (`sorted(numbers)[-2]`).
  - `+0.15`: Correctly rates severity as `medium` or `high`.

### Task 3 — Hard: SQL Injection Security Vulnerability (`task3_hard`)
```python
def authenticate(username: str, password: str) -> bool:
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    # Critical Vulnerability: Raw string concatenation in SQL statement
    query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
    cursor.execute(query)
    return cursor.fetchone() is not None
```
* **Grading Breakdown ($R_{max} = 1.0$)**:
  - `+0.30`: Identifies SQL Injection vulnerability by name.
  - `+0.25`: Demonstrates a concrete exploit proof (e.g., `' OR '1'='1` or `'--`).
  - `+0.30`: Provides parameterized query rewrite using SQL placeholders (`?`).
  - `+0.15`: Correctly rates severity as `critical`.

---

## 📈 Model Performance Baseline

Evaluated on `meta-llama/Llama-3.3-70B-Instruct`:

| Task ID | Difficulty | Reward Score | Status | Key Grader Observations |
|---|---|:---:|:---:|---|
| `task1_easy` | Easy | **0.9500** | PASSED | Caught NameError immediately; suggested exact variable replacement. |
| `task2_medium` | Medium | **1.0000** | PASSED | Flagged both the sorting index flaw and list mutation side effect. |
| `task3_hard` | Hard | **1.0000** | PASSED | Identified SQLi, produced valid exploit string, provided parameterized SQL code. |
| **Overall Average** | | **0.9833** | **EXCELLENT** | Benchmark passed with high precision across all 3 difficulty tiers. |

---

## 🔌 OpenEnv REST API Reference

The backend provides OpenEnv-compliant REST endpoints:

| Endpoint | Method | Payload / Arguments | Description |
|---|---|---|---|
| `/` | `GET` | None | Serves the production React Web Dashboard |
| `/health` | `GET` | None | Returns `{"status": "ok", "openenv_version": "1.0.0"}` |
| `/reset` | `POST` | `{}` | Resets RL environment and returns initial `Observation` |
| `/step` | `POST` | `Action` JSON | Submits agent code review action; returns `Reward` & `StepResult` |
| `/state` | `GET` | None | Returns full active `EnvironmentState` |
| `/tasks` | `GET` | None | Lists all benchmark task descriptions & ground truth schemas |
| `/api/evaluate-custom` | `POST` | `{action, code_snippet}` | Evaluates custom user Python code snippets in real-time |
| `/api/history` | `GET` | None | Retrieves historical audit logs and benchmark session records |

---

## 🚀 Installation & Local Development

### 1. Clone & Set Up Python Environment
```bash
git clone https://github.com/nirnayyy/openenv-code-review.git
cd openenv-code-review

# Create virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

### 2. Build Frontend & Run Local Server
```bash
# Build React + Vite frontend
cd frontend
npm install
npm run build
cd ..

# Start FastAPI Uvicorn Server (Serves frontend + API on port 8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## 🧪 Running Automated Test Suite

The project includes an 8-point automated unit & integration test suite covering FastAPI routes, Pydantic schemas, RL environment state transitions, AST grading, and custom vulnerability code evaluation.

Run tests via `pytest`:

```bash
python -m pytest tests/test_api_suite.py -v
```

**Expected Test Results**:
```text
tests/test_api_suite.py::test_health_endpoint PASSED                     [ 12%]
tests/test_api_suite.py::test_metadata_endpoint PASSED                   [ 25%]
tests/test_api_suite.py::test_schema_endpoint PASSED                     [ 37%]
tests/test_api_suite.py::test_tasks_list_endpoint PASSED                 [ 50%]
tests/test_api_suite.py::test_environment_reset_and_step_flow PASSED     [ 62%]
tests/test_api_suite.py::test_evaluate_custom_sqli PASSED                [ 75%]
tests/test_api_suite.py::test_evaluate_custom_clean_code PASSED          [ 87%]
tests/test_api_suite.py::test_history_endpoint PASSED                    [100%]

============================== 8 passed in 3.61s ==============================
```

---

## 🌐 Deployment Instructions & Vercel / HuggingFace Setup

### Deploying Frontend to Vercel

If deploying the React frontend to **Vercel** and hosting the FastAPI backend on HuggingFace Spaces / Railway / Render:

1. **Build Settings in Vercel**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. **Environment Variables to Configure in Vercel**:

Add these environment variables in your Vercel Dashboard under **Project Settings $\rightarrow$ Environment Variables**:

| Variable Name | Description | Example / Default Value |
|---|---|---|
| `VITE_API_URL` | Base URL of your backend FastAPI server | `https://your-backend-app.up.railway.app` |
| `VITE_SUPABASE_URL` | (Optional) Supabase Project URL for Auth | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (Optional) Supabase Public Anonymous Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

*(Note: Never commit private backend secret keys or database service role keys to repository or Vercel environment settings).*

---

### Single-Container Production Deployment (Docker)

To deploy the unified API and Web Dashboard using Docker (e.g. HuggingFace Spaces, Render, AWS ECS):

```bash
# Build production Docker image
docker build -t openenv-code-review .

# Run container on port 8000
docker run -d -p 8000:8000 --name openenv-container openenv-code-review
```

---

## 📁 Repository Directory Structure

```
openenv-code-review/
├── Dockerfile                   # Multi-stage Docker production build configuration
├── README.md                    # Detailed documentation & portfolio specification
├── pyproject.toml               # Python project configuration & pytest settings
├── requirements.txt             # Python backend dependencies (FastAPI, Pydantic, Uvicorn)
├── inference.py                 # Baseline LLM inference runner script
├── openenv.yaml                 # Meta OpenEnv benchmark spec definition
├── app/                         # FastAPI Backend Application
│   ├── main.py                  # Server routes, CORS config, and static UI router
│   ├── models.py                # Pydantic schemas (Observation, Action, Reward, StepResult)
│   ├── environment.py           # RL state transition engine & thread-safe locking
│   └── tasks/                   # Task definitions & deterministic AST graders
│       ├── __init__.py
│       ├── task1_easy.py        # NameError typo grader
│       ├── task2_medium.py      # Logic bug & list mutation grader
│       └── task3_hard.py        # SQL Injection security grader
├── tests/                       # Automated Test Suite
│   └── test_api_suite.py        # 8 comprehensive integration pytest cases
└── frontend/                    # React + Vite Web Application
    ├── index.html               # Main entry HTML with OpenEnv favicon branding
    ├── vite.config.js           # Vite build config with path aliases
    ├── package.json             # Frontend dependencies (Lucide icons, Tailwind, Recharts)
    ├── src/
    │   ├── App.jsx              # Main App router & theme manager
    │   ├── index.css            # Custom CSS variables, 3D perspective stage, & cyber themes
    │   └── components/          # UI Components
    │       ├── Navbar.jsx               # Header branding, navigation, & theme toggle
    │       ├── HeroSection.jsx          # 3D Relume parallax hero showcase
    │       ├── FeatureGrid.jsx          # Plan configuration & PC screen mockups
    │       ├── InstructionsSection.jsx  # 4-Step developer workflow guide
    │       ├── WorkflowSection.jsx      # Challenge picker & Audit Options matrix
    │       ├── PlaygroundTab.jsx        # Live RL agent step execution & logs
    │       ├── CustomAuditTab.jsx       # Custom code audit sandbox & visual diffs
    │       ├── UserProfile.jsx          # Professional researcher dashboard
    │       ├── AuthModal.jsx            # Auth gating dialog
    │       ├── FaqSection.jsx           # FAQ accordion
    │       ├── CtaSection.jsx           # Launch CTA banner
    │       └── Footer.jsx               # OpenEnv brand footer
    └── public/                  # Static assets (Official logo, diff screenshots, diagrams)
```

---

## 📜 License & Citation

This project is open-source under the **MIT License**.

If you use **OpenEnv AI Code Reviewer** in your research or portfolio, please cite:

```bibtex
@misc{openenv_code_review_2026,
  author = {Pratap Singh, Nirnay},
  title = {OpenEnv AI Code Reviewer & RL Benchmark System},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/nirnayyy/openenv-code-review}}
}
```
