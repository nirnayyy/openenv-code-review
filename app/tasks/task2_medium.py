"""
TASK 2 — MEDIUM
Logic bug: the function finds the second-largest number incorrectly.
Also mutates the original list as a side effect.
Agent must catch both issues for full score.
"""

from app.models import Observation, Action, Reward

TASK_ID = "task2_medium"

BUGGY_CODE = '''\
def find_second_largest(numbers):
    """Returns the second largest number in a list."""
    if len(numbers) < 2:
        return None
    numbers.sort()               # Bug 1: mutates the original list
    return numbers[1]            # Bug 2: returns 2nd smallest, not 2nd largest
'''

TASK_DESCRIPTION = (
    "Review this Python function that is supposed to return the second largest "
    "number in a list. Identify all bugs — there may be more than one. "
    "Provide fixes and rate the overall severity."
)


def grade(action: Action) -> Reward:
    """
    Scoring breakdown (total 1.0):
      0.35  — identifies the wrong index bug (numbers[1] should be numbers[-2])
      0.25  — identifies the mutation bug (sort() modifies original list)
      0.25  — provides correct fixes for both
      0.15  — severity rated 'medium' or 'high'
    """
    score = 0.0
    issue_detected = False
    fix_quality = 0.0
    severity_correct = False
    feedback_parts = []

    all_text = " ".join(action.identified_issues + [action.explanation]).lower()
    all_fix = " ".join(action.suggested_fixes + [action.explanation]).lower()

    # ── Check 1: Wrong index (0.35) ───────────────────────────────────────────
    index_keywords = ["numbers[1]", "second smallest", "wrong index", "[-2]", "last", "largest"]
    if any(k in all_text for k in index_keywords):
        score += 0.35
        issue_detected = True
        feedback_parts.append("✓ Identified the wrong index bug.")
    else:
        feedback_parts.append("✗ Missed: numbers[1] returns the 2nd smallest, not 2nd largest.")

    # ── Check 2: Mutation bug (0.25) ──────────────────────────────────────────
    mutation_keywords = ["mutate", "modif", "in-place", "in place", "original list", "side effect", "sorted("]
    if any(k in all_text for k in mutation_keywords):
        score += 0.25
        feedback_parts.append("✓ Identified the list mutation side effect.")
    else:
        feedback_parts.append("✗ Missed: sort() mutates the original list.")

    # ── Check 3: Fix quality (0.25) ───────────────────────────────────────────
    fix_keywords = ["numbers[-2]", "sorted(numbers)", "[-2]", "use sorted"]
    if any(k in all_fix for k in fix_keywords):
        fix_quality = 1.0
        score += 0.25
        feedback_parts.append("✓ Suggested correct fixes.")
    elif issue_detected:
        fix_quality = 0.5
        score += 0.12
        feedback_parts.append("~ Partial fix — identified the issue but fix was incomplete.")
    else:
        feedback_parts.append("✗ No valid fixes provided.")

    # ── Check 4: Severity (0.15) ──────────────────────────────────────────────
    if action.severity.lower() in ["medium", "high"]:
        severity_correct = True
        score += 0.15
        feedback_parts.append("✓ Severity correctly rated.")
    else:
        feedback_parts.append(f"✗ Expected 'medium' or 'high', got '{action.severity}'.")

    return Reward(
        score=round(min(score, 1.0), 4),
        issue_detected=issue_detected,
        fix_quality=fix_quality,
        severity_correct=severity_correct,
        feedback=" | ".join(feedback_parts),
    )


def get_initial_observation(step: int = 1) -> Observation:
    return Observation(
        task_id=TASK_ID,
        task_description=TASK_DESCRIPTION,
        code_snippet=BUGGY_CODE,
        language="python",
        step=step,
        max_steps=3,
        context=(
            "Example: find_second_largest([3, 1, 4, 1, 5]) should return 4, "
            "but currently returns 1. The caller's list is also being modified."
        ),
        done=False,
    )
