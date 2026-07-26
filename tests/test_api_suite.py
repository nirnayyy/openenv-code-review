"""
Comprehensive test suite for OpenEnv Code Review Benchmark
Tests environment lifecycle, heuristics, custom grading, models, and endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.environment import CodeReviewEnvironment
from app.models import Action

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_metadata_endpoint():
    response = client.get("/metadata")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert "mode" in data


def test_schema_endpoint():
    response = client.get("/schema")
    assert response.status_code == 200
    data = response.json()
    assert "action" in data
    assert "observation" in data


def test_tasks_list_endpoint():
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert "tasks" in data
    assert len(data["tasks"]) == 3


def test_environment_reset_and_step_flow():
    env = CodeReviewEnvironment()
    obs = env.reset()
    assert obs.task_id == "task1_easy"
    assert obs.step == 1
    assert obs.done is False

    # Step 1: Easy task action
    act1 = Action(
        identified_issues=["NameError on line 6"],
        suggested_fixes=["Fix typo totl -> total"],
        severity="high",
        explanation="Typo causes runtime NameError crash."
    )
    res1 = env.step(act1)
    assert res1.reward.score > 0.5
    assert res1.done is False
    assert res1.observation.task_id == "task2_medium"

    # Step 2: Medium task action
    act2 = Action(
        identified_issues=["List mutation side effect"],
        suggested_fixes=["Use sorted() instead of .sort()"],
        severity="medium",
        explanation="In-place sort mutates input list."
    )
    res2 = env.step(act2)
    assert res2.reward.score > 0.5
    assert res2.done is False
    assert res2.observation.task_id == "task3_hard"

    # Step 3: Hard task action
    act3 = Action(
        identified_issues=["SQL Injection vulnerability"],
        suggested_fixes=["Use parameterized query with ? placeholder"],
        severity="critical",
        explanation="Exploit payload: ' OR '1'='1"
    )
    res3 = env.step(act3)
    assert res3.reward.score > 0.5
    assert res3.done is True


def test_evaluate_custom_sqli():
    payload = {
        "code_snippet": "query = 'SELECT * FROM users WHERE username = ' + name\ncursor.execute(query)"
    }
    response = client.post("/api/evaluate-custom", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["action"]["severity"] == "critical"
    assert data["reward"]["score"] > 0.5


def test_evaluate_custom_clean_code():
    payload = {
        "code_snippet": "def add(a, b):\n    return a + b"
    }
    response = client.post("/api/evaluate-custom", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["action"]["severity"] == "low"
    assert data["reward"]["score"] == 0.95


def test_history_endpoint():
    response = client.get("/api/history")
    assert response.status_code == 200
    data = response.json()
    assert "history" in data
    assert len(data["history"]) >= 1
