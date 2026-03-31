# ─────────────────────────────────────────────────────────────────────────────
# MANDATORY per hackathon rules:
#   - Named inference.py and placed in root
#   - Reads API_BASE_URL, MODEL_NAME, HF_TOKEN from env vars
#   - Uses OpenAI client for all LLM calls
#   - Runs all 3 tasks and produces reproducible scores
#   - Must complete in under 20 minutes on 2vCPU / 8GB RAM
# ─────────────────────────────────────────────────────────────────────────────

import os
import json
import time
import requests
from openai import OpenAI

# ── Config from environment variables (mandatory) ─────────────────────────────
API_BASE_URL = os.getenv("API_BASE_URL", "https://router.huggingface.co/v1")
API_KEY = os.getenv("HF_TOKEN") or os.getenv("API_KEY", "")
MODEL_NAME = os.getenv("MODEL_NAME", "meta-llama/Llama-3.3-70B-Instruct")

# ── Where our environment server is running ───────────────────────────────────
ENV_BASE_URL = os.getenv("ENV_BASE_URL", "http://localhost:8000")

# ── OpenAI client pointed at HuggingFace router ───────────────────────────────
client = OpenAI(
    base_url=API_BASE_URL,
    api_key=API_KEY,
    timeout=30.0,
    max_retries=1,
)

# ── System prompt: tells the LLM exactly what JSON to return ──────────────────
SYSTEM_PROMPT = """You are an expert code reviewer and security researcher.

You will be given a code snippet to review. You must respond with ONLY a valid
JSON object — no markdown, no explanation outside the JSON, no code blocks.

Your JSON must have exactly these fields:
{
  "identified_issues": ["issue 1", "issue 2"],
  "suggested_fixes": ["fix for issue 1", "fix for issue 2"],
  "severity": "low" | "medium" | "high" | "critical",
  "explanation": "your full explanation here",
  "line_numbers": [6, 12]
}

Be thorough. For security issues, name the vulnerability explicitly (e.g. SQL injection),
show a concrete exploit example in your explanation, and provide the secure fix with code.
"""


def build_user_prompt(observation: dict) -> str:
    """Build the prompt the LLM sees for each task."""
    return f"""Task: {observation['task_description']}

Context: {observation.get('context', 'No additional context.')}

Code to review:
```python
{observation['code_snippet']}
```

Respond with ONLY the JSON object described in your instructions."""


def call_llm(observation: dict) -> dict:
    """
    Call the LLM and parse its JSON response into an Action dict.
    Returns a fallback action if anything goes wrong.
    """
    prompt = build_user_prompt(observation)

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=800,
        )

        raw = response.choices[0].message.content.strip()

        # Strip markdown code fences if the model added them anyway
        if raw.startswith("```"):
            raw = raw.split("```", 2)[1]
            if raw.startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        action = json.loads(raw)
        return action

    except json.JSONDecodeError as e:
        print(f"  [WARN] LLM returned invalid JSON: {e}")
        print(f"  [WARN] Raw response: {raw[:200]}")
        return _fallback_action()
    except Exception as e:
        print(f"  [ERROR] LLM call failed: {e}")
        return _fallback_action()


def _fallback_action() -> dict:
    """Safe default action if LLM fails — scores 0 but doesn't crash."""
    return {
        "identified_issues": ["Unable to analyze code"],
        "suggested_fixes": ["Manual review required"],
        "severity": "low",
        "explanation": "LLM call failed or returned unparseable response.",
        "line_numbers": [],
    }


def run_episode() -> dict:
    """
    Run one full episode:
      1. POST /reset  → get task1 observation
      2. POST /step   → submit review, get reward, get task2
      3. POST /step   → submit review, get reward, get task3
      4. POST /step   → submit review, get reward, done=True

    Returns a results dict with per-task scores.
    """
    results = {}

    print("\n" + "=" * 60)
    print("  OpenEnv Code Review — Baseline Inference Run")
    print("=" * 60)

    # ── RESET ─────────────────────────────────────────────────────────────────
    print("\n[1/4] Resetting environment...")
    reset_resp = requests.post(f"{ENV_BASE_URL}/reset", json={}, timeout=30)
    reset_resp.raise_for_status()
    observation = reset_resp.json()
    print(f"  → Starting task: {observation['task_id']}")

    # ── STEP LOOP — one step per task ─────────────────────────────────────────
    for task_num in range(1, 4):
        task_id = observation.get("task_id", f"task{task_num}")
        done = observation.get("done", False)

        if done:
            print(f"\n  Episode ended early at task {task_num}.")
            break

        print(f"\n[{task_num + 1}/4] Running {task_id}...")
        print(f"  Calling LLM ({MODEL_NAME})...")

        start = time.time()
        action = call_llm(observation)
        elapsed = time.time() - start

        print(f"  LLM responded in {elapsed:.1f}s")
        print(f"  Issues found: {action['identified_issues']}")
        print(f"  Severity: {action['severity']}")

        # Submit action to environment
        step_resp = requests.post(f"{ENV_BASE_URL}/step", json=action, timeout=30)
        step_resp.raise_for_status()
        step_result = step_resp.json()

        reward = step_result["reward"]
        score = reward["score"]

        print(f"  Score:    {score:.4f}")
        print(f"  Feedback: {reward['feedback']}")

        results[task_id] = {
            "score": score,
            "issue_detected": reward["issue_detected"],
            "fix_quality": reward["fix_quality"],
            "severity_correct": reward["severity_correct"],
            "feedback": reward["feedback"],
        }

        observation = step_result["observation"]

    # ── FINAL SUMMARY ─────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("  BASELINE SCORES")
    print("=" * 60)

    total = 0.0
    for tid, res in results.items():
        print(f"  {tid:<20} → {res['score']:.4f}")
        total += res["score"]

    avg = total / len(results) if results else 0.0
    print(f"\n  Average score: {avg:.4f}")
    print("=" * 60 + "\n")

    return {
        "task_scores": results,
        "average_score": round(avg, 4),
        "model": MODEL_NAME,
    }


if __name__ == "__main__":
    final = run_episode()

    # Write scores to file so they're reproducible / inspectable
    with open("baseline_scores.json", "w", encoding="utf-8") as f:
        json.dump(final, f, indent=2)

    print("Scores saved to baseline_scores.json")
