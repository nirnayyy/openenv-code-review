from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from app.models import Action, Observation, StepResult, EnvironmentState
from app.environment import CodeReviewEnvironment

app = FastAPI(
    title="OpenEnv — Code Review Environment",
    description="An RL environment where agents review code for bugs and security vulnerabilities.",
    version="1.0.0",
)

# Single global environment instance
# (fine for hackathon — one agent at a time)
env = CodeReviewEnvironment()


# ─────────────────────────────────────────────
# POST /reset  — start a new episode
# ─────────────────────────────────────────────
@app.post("/reset", response_model=Observation)
def reset():
    """Reset the environment and return the first observation."""
    obs = env.reset()
    return obs


# ─────────────────────────────────────────────
# POST /step  — agent submits an action
# ─────────────────────────────────────────────
@app.post("/step", response_model=StepResult)
def step(action: Action):
    """Submit a code review action and get back reward + next observation."""
    result = env.step(action)
    return result


# ─────────────────────────────────────────────
# GET /state  — inspect current state
# ─────────────────────────────────────────────
@app.get("/state", response_model=EnvironmentState)
def state():
    """Return the current internal state of the environment."""
    return env.state()


# ─────────────────────────────────────────────
# GET /health  — sanity check
# ─────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "environment": "code-review-openenv"}


# ─────────────────────────────────────────────
# GET /tasks  — list all tasks
# ─────────────────────────────────────────────
@app.get("/tasks")
def list_tasks():
    from app.tasks import TASK_ORDER
    return {"tasks": TASK_ORDER, "count": len(TASK_ORDER)}
