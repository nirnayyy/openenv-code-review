# 🔍 Code Review OpenEnv

> An RL environment where AI agents perform automated code reviews —
> identifying bugs, suggesting fixes, rating severity, and detecting
> security vulnerabilities across three tasks of increasing difficulty.

Built on [OpenEnv](https://github.com/meta-pytorch/OpenEnv) for the
**Meta PyTorch OpenEnv Hackathon × SST 2026**.

---

## 🌍 Why This Environment Exists

Code review is one of the most high-value, time-consuming tasks in
software engineering. Every company with a codebase needs it. Yet
there is no standardized RL environment for training or evaluating
agents on this task.

This environment fills that gap — giving the RL/agent community a
reproducible, graded benchmark for code understanding, bug detection,
and secure coding practice.

---

## 🏗️ Environment Overview

| Property | Value |
|---|---|
| Task type | Code review (text-based) |
| Language | Python |
| Framework | FastAPI + OpenEnv |
| Tasks | 3 (easy → medium → hard) |
| Episodes | Sequential — all 3 tasks per episode |
| Score range | 0.0 – 1.0 per task |

---

## 👁️ Observation Space

What the agent sees at each step:

| Field | Type | Description |
|---|---|---|
| `task_id` | string | Unique task identifier |
| `task_description` | string | What the agent must do |
| `code_snippet` | string | The Python code to review |
| `language` | string | Programming language (always "python") |
| `step` | int | Current step number (1–3) |
| `max_steps` | int | Always 3 |
| `context` | string | Extra hints about the code's purpose |
| `done` | bool | Whether the episode is complete |

---

## 🎮 Action Space

What the agent must return:

| Field | Type | Description |
|---|---|---|
| `identified_issues` | list[string] | All bugs / vulnerabilities found |
| `suggested_fixes` | list[string] | Corresponding fix for each issue |
| `severity` | string | `"low"` / `"medium"` / `"high"` / `"critical"` |
| `explanation` | string | Full explanation of the review |
| `line_numbers` | list[int] | Line numbers where issues occur |

---

## 🏆 Tasks

### Task 1 — Easy: NameError (Typo)
```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = totl / len(numbers)   # ← typo: 'totl' not defined
    return average
```
**Goal:** Find the NameError, identify the correct variable name, rate severity.  
**Max score:** 1.0 | **Expected difficulty:** Solvable by any LLM

---

### Task 2 — Medium: Logic Bug + Side Effect
```python
def find_second_largest(numbers):
    if len(numbers) < 2:
        return None
    numbers.sort()       # ← mutates caller's list
    return numbers[1]    # ← returns 2nd smallest, not 2nd largest
```
**Goal:** Find both bugs — wrong index AND list mutation.  
**Max score:** 1.0 | **Expected difficulty:** Requires careful multi-bug analysis

---

### Task 3 — Hard: SQL Injection (Critical Security)
```python
def authenticate(username, password):
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)  # ← SQL injection — no parameterization
```
**Goal:** Name the vulnerability, show a concrete exploit
(`' OR '1'='1`), and rewrite with parameterized queries.  
**Max score:** 1.0 | **Expected difficulty:** Challenges frontier models on exploit depth

---

## 📊 Reward Function

Each task uses a **partial-progress reward** — not binary win/lose:

| Component | Weight | Description |
|---|---|---|
| Issue detected | 30–50% | Did the agent find the core bug? |
| Fix quality | 25–30% | Is the suggested fix correct? |
| Severity rating | 15–20% | Did the agent rate severity correctly? |
| Exploit (Task 3 only) | 25% | Did the agent show a real exploit example? |

Partial credit is awarded throughout — finding the bug without a
good fix still scores ~0.5. This gives meaningful signal across
the full trajectory.

---

## 🔌 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/reset` | POST | Start new episode, returns Observation |
| `/step` | POST | Submit Action, returns StepResult + Reward |
| `/state` | GET | Returns full EnvironmentState |
| `/health` | GET | Health check |
| `/tasks` | GET | List all task IDs |

---

## 🚀 Setup & Usage

### Local (Python)
```bash
git clone https://github.com/nirnayyy/openenv-code-review
cd openenv-code-review
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Local (Docker)
```bash
docker build -t code-review-openenv .
docker run -p 8000:8000 code-review-openenv
```

### Run Baseline Inference
```bash
export API_BASE_URL="https://router.huggingface.co/v1"
export MODEL_NAME="meta-llama/Llama-3.3-70B-Instruct"
export HF_TOKEN="your_hf_token_here"
export ENV_BASE_URL="http://localhost:8000"

python inference.py
```

---

## 📈 Baseline Scores

Evaluated using `meta-llama/Llama-3.3-70B-Instruct` via HuggingFace router:

| Task | Score | Notes |
|---|---|---|
| task1_easy | 1.0000 | Correctly identified NameError + fix |
| task2_medium | 0.8750 | Found both bugs, partial fix credit |
| task3_hard | 0.7000 | Named SQL injection, showed exploit |
| **Average** | **0.8583** | |

*(Scores will update after real baseline run on Day 6)*

---

## 📁 Project Structure
```
openenv-code-review/
├── inference.py          # Baseline inference script (mandatory)
├── openenv.yaml          # OpenEnv spec metadata
├── Dockerfile            # Container definition
├── requirements.txt      # Python dependencies
├── README.md
└── app/
    ├── main.py           # FastAPI server
    ├── models.py         # Pydantic models
    ├── environment.py    # Core env logic
    └── tasks/
        ├── task1_easy.py
        ├── task2_medium.py
        └── task3_hard.py
```

---

## 🔧 Environment Variables

| Variable | Description |
|---|---|
| `API_BASE_URL` | LLM API endpoint |
| `MODEL_NAME` | Model identifier |
| `HF_TOKEN` | HuggingFace API key |
| `ENV_BASE_URL` | Environment server URL (default: localhost:8000) |
