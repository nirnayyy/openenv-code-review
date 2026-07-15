# 🔍 Code Review OpenEnv

> **Automated Code Review Reinforcement Learning Environment**  
> An OpenAI Gym-style environment built on [OpenEnv](https://github.com/meta-pytorch/OpenEnv) for training, evaluating, and benchmarking AI agents on software engineering code reviews.

<p align="center">
  <img src="https://img.shields.io/badge/Task-Reinforcement%20Learning-10b981?style=flat-square" alt="RL Task">
  <img src="https://img.shields.io/badge/Language-Python-blue?style=flat-square" alt="Python">
  <img src="https://img.shields.io/badge/Framework-FastAPI%20%7C%20OpenEnv-black?style=flat-square" alt="Frameworks">
  <img src="https://img.shields.io/badge/Hackathon-Meta%20PyTorch%20%C3%97%20SST%202026-8b5cf6?style=flat-square" alt="Hackathon">
</p>

---

## 🌍 Why This Environment Exists

Code review is a high-cognitive, time-intensive process. While large language models (LLMs) are frequently deployed for code editing and generation, there has been a lack of standard, reproducible reinforcement learning environments to train agents specifically for **precision debugging, logic-mutation detection, and secure coding practices**.

This project provides a graded benchmark consisting of three tasks of increasing complexity, measuring an agent's capability to detect flaws, suggest correct replacements, rate severity, and generate exploits.

---

## 🏗️ Environment Overview

| Environment Attribute | Description / Details |
| :--- | :--- |
| **Task Type** | Text-based Code Review & Vulnerability Assessment |
| **Action Space** | Structured Pydantic payload (Issues, Fixes, Severity, Exploit) |
| **Observation Space** | Graded Python snippets with contextual metadata |
| **Episode Length** | 3 Steps (sequential tasks: Easy → Medium → Hard) |
| **Feedback Loop** | Cosine-similarity test oracle (Partial-Progress Rewards) |

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

### Task 1 — Easy: NameError (Syntax/Typo)
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
* **Objective:** Identify the SQL injection vulnerability, demonstrate an exploit (e.g. `' OR '1'='1`), and rewrite it using parameterized bindings.

---

## 📊 Reward Mechanics

Rewards are not binary. The environment calculates **partial-progress credit** using the following weights:

| Component | Weight | Criteria Evaluated |
| :--- | :---: | :--- |
| **Issue Detection** | **40%** | Accurate matching of target vulnerability strings. |
| **Fix Accuracy** | **30%** | Code structural checks matching corrected patterns. |
| **Severity Rating** | **15%** | Correct classification (Low/Medium/High/Critical). |
| **Exploit Depth** | **15%** | Successful generation of exploit string (Task 3 only). |

---

## 🚀 Setup & Execution

### 1. Python Environment Setup
Ensure you have `python 3.10+` installed. Clone the repository and run:
```bash
# Install dependencies
pip install -r requirements.txt

# Start the environment API server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 2. Docker Containerized Run
```bash
docker build -t code-review-openenv .
docker run -p 8000:8000 code-review-openenv
```

### 3. Running Baseline Inference
Execute baseline agents using the HuggingFace router:
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
├── app/                  # FastAPI Environment Server
│   ├── tasks/            # Task test cases and reward checks
│   ├── environment.py    # Environment step and reset logic
│   └── main.py           # FastAPI entry endpoints
├── inference.py          # Baseline agent inference runner
├── openenv.yaml          # OpenEnv configuration file
├── Dockerfile            # Container config
└── requirements.txt      # Python package spec
```

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
