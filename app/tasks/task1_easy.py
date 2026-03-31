"""
TASK 1 — EASY
The code has a simple NameError (typo in variable name).
A competent agent should catch this immediately.
Max score: 1.0
"""

from app.models import Observation, Action, Reward

TASK_ID = "task1_easy"

# ── The buggy code the agent will review ──────────────────────────────────────
BUGGY_CODE = '''\
def calculate_average(numbers):
    """Returns the average of a list of numbers."""
    total = 0
    for num in numbers:
        total += num
    average = totl / len(numbers)   # Line 6: typo — 'totl' should be 'total'
    return average
'''

TASK_DESCRIPTION = (
    "Review the following Python function and identify any bugs. "
    "The function is supposed to calculate the average of a list of numbers. "
    "Find the issue, state which line it is on, and suggest the correct fix."
)

# ── Grader ────────────────────────────────────────────────────────────────────
def grade(action: Action) -> Reward:
    """
    Deterministic grader for Task 1.

    Scoring breakdown (total 1.0):
      0.5  — correctly identifies the NameError / typo ('totl' vs 'total')
      0.3  — suggests the correct fix ('total' instead of 'totl')
      0.2  — correctly identifies severity as 'high' (crashes at runtime)
    """
    score = 0.0
    issue_detected = False
    fix_quality = 0.0
    severity_correct = False
    feedback_parts = []

    # ── Check 1: Did agent mention the typo? (0.5 points) ────────────────────
    all_text = " ".join(action.identified_issues + [action.explanation]).lower()
    typo_keywords = ["totl", "nameerror", "typo", "undefined", "not defined", "misspelled"]

    if any(keyword in all_text for keyword in typo_keywords):
        issue_detected = True
        score += 0.5
        feedback_parts.append("✓ Correctly identified the NameError / typo.")
    else:
        feedback_parts.append("✗ Missed the NameError: variable 'totl' is not defined.")

    # ── Check 2: Did agent suggest the right fix? (0.3 points) ────────────────
    all_fix_text = " ".join(action.suggested_fixes + [action.explanation]).lower()
    fix_keywords = ["total", "change totl to total", "rename", "fix the typo"]

    if any(keyword in all_fix_text for keyword in fix_keywords):
        fix_quality = 1.0
        score += 0.3
        feedback_parts.append("✓ Suggested the correct fix.")
    elif issue_detected:
        # Partial credit — found the bug but fix was vague
        fix_quality = 0.4
        score += 0.12
        feedback_parts.append("~ Found the bug but fix suggestion was vague.")
    else:
        feedback_parts.append("✗ No valid fix suggested.")

    # ── Check 3: Severity should be 'high' (runtime crash) (0.2 points) ──────
    if action.severity.lower() in ["high", "critical"]:
        severity_correct = True
        score += 0.2
        feedback_parts.append("✓ Correctly rated severity as high/critical.")
    else:
        feedback_parts.append(
            f"✗ Severity should be 'high' (crashes at runtime), got '{action.severity}'."
        )

    return Reward(
        score=round(min(score, 1.0), 4),
        issue_detected=issue_detected,
        fix_quality=fix_quality,
        severity_correct=severity_correct,
        feedback=" | ".join(feedback_parts),
    )


# ── Initial observation factory ───────────────────────────────────────────────
def get_initial_observation(step: int = 1) -> Observation:
    return Observation(
        task_id=TASK_ID,
        task_description=TASK_DESCRIPTION,
        code_snippet=BUGGY_CODE,
        language="python",
        step=step,
        max_steps=3,
        context=(
            "The function is called with a list like [1, 2, 3, 4, 5]. "
            "It should return 3.0 but it crashes before returning."
        ),
        done=False,
    )
