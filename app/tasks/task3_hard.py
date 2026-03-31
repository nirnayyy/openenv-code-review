"""
TASK 3 — HARD
Critical security vulnerability: SQL injection.
Agent must identify the vulnerability, explain the exploit,
AND provide a parameterized query fix. Frontier models challenged
by requiring exploit demonstration + secure rewrite.
"""

from app.models import Observation, Action, Reward

TASK_ID = "task3_hard"

BUGGY_CODE = '''\
import sqlite3

def get_user_by_username(username: str):
    """Fetch a user record from the database by username."""
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    query = "SELECT id, username, email FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    result = cursor.fetchone()
    conn.close()
    return result

def authenticate(username: str, password: str) -> bool:
    """Return True if credentials are valid."""
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    query = (
        "SELECT * FROM users WHERE username = '"
        + username
        + "' AND password = '"
        + password
        + "'"
    )
    cursor.execute(query)
    return cursor.fetchone() is not None
'''

TASK_DESCRIPTION = (
    "Perform a security review of this Python database access module. "
    "Identify any security vulnerabilities, explain how an attacker could "
    "exploit them with a concrete example, and provide a fully secure rewrite."
)


def grade(action: Action) -> Reward:
    """
    Scoring breakdown (total 1.0):
      0.30  — identifies SQL injection vulnerability by name
      0.25  — provides a concrete exploit example (e.g., ' OR '1'='1)
      0.30  — provides parameterized query fix
      0.15  — correctly rates severity as 'critical'
    """
    score = 0.0
    issue_detected = False
    fix_quality = 0.0
    severity_correct = False
    feedback_parts = []

    all_text = " ".join(action.identified_issues + [action.explanation]).lower()
    all_fix = " ".join(action.suggested_fixes + [action.explanation]).lower()

    # ── Check 1: Named the vulnerability (0.30) ───────────────────────────────
    vuln_keywords = ["sql injection", "sqli", "injection attack", "string concatenation", "unsanitized"]
    if any(k in all_text for k in vuln_keywords):
        score += 0.30
        issue_detected = True
        feedback_parts.append("✓ Correctly identified SQL injection vulnerability.")
    else:
        feedback_parts.append("✗ Failed to identify SQL injection.")

    # ── Check 2: Exploit example (0.25) ───────────────────────────────────────
    exploit_keywords = [
        "' or '1'='1", "or 1=1", "' --", "admin'--", "bypass", "drop table",
        "' or 1=1", "authentication bypass", "exploit"
    ]
    if any(k in all_text for k in exploit_keywords):
        score += 0.25
        feedback_parts.append("✓ Provided a concrete exploit example.")
    elif issue_detected:
        score += 0.10
        feedback_parts.append("~ Identified vulnerability but no concrete exploit shown.")
    else:
        feedback_parts.append("✗ No exploit example provided.")

    # ── Check 3: Parameterized fix (0.30) ─────────────────────────────────────
    fix_keywords = ["parameterized", "placeholder", "cursor.execute(query, (", "? ,", "(username,)", "prepared statement", "?"]
    if any(k in all_fix for k in fix_keywords):
        fix_quality = 1.0
        score += 0.30
        feedback_parts.append("✓ Provided correct parameterized query fix.")
    elif issue_detected:
        fix_quality = 0.4
        score += 0.12
        feedback_parts.append("~ Mentioned fix but didn't provide parameterized query code.")
    else:
        feedback_parts.append("✗ No secure fix provided.")

    # ── Check 4: Severity = critical (0.15) ───────────────────────────────────
    if action.severity.lower() == "critical":
        severity_correct = True
        score += 0.15
        feedback_parts.append("✓ Correctly rated as critical.")
    else:
        feedback_parts.append(f"✗ SQL injection is 'critical', got '{action.severity}'.")

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
            "This module is used in a production web application with a login endpoint. "
            "The database contains user credentials and personal information."
        ),
        done=False,
    )
