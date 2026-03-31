from fastapi import FastAPI, Request
from app.models import Action, Observation, StepResult, EnvironmentState
from app.environment import CodeReviewEnvironment

APP_NAME = "code-review-openenv"
APP_DESCRIPTION = (
    "An RL environment where agents review code for bugs and security vulnerabilities."
)

app = FastAPI(
    title="OpenEnv — Code Review Environment",
    description=APP_DESCRIPTION,
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
    return {"status": "healthy", "environment": APP_NAME}


# ─────────────────────────────────────────────
# GET /  — root info endpoint
# ─────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "name": "OpenEnv — Code Review Environment",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "reset": "POST /reset",
            "step": "POST /step",
            "state": "GET /state",
            "tasks": "GET /tasks",
            "health": "GET /health"
        },
    }


# ─────────────────────────────────────────────
# GET /metadata  — OpenEnv metadata
# ─────────────────────────────────────────────
@app.get("/metadata")
def metadata():
    return {
        "name": APP_NAME,
        "description": APP_DESCRIPTION,
        "version": app.version,
        "mode": "simulation",
    }


# ─────────────────────────────────────────────
# GET /schema  — JSON schema for core payloads
# ─────────────────────────────────────────────
@app.get("/schema")
def schema():
    return {
        "action": Action.model_json_schema(),
        "observation": Observation.model_json_schema(),
        "state": EnvironmentState.model_json_schema(),
        "step_result": StepResult.model_json_schema(),
    }


# ─────────────────────────────────────────────
# POST /mcp  — lightweight JSON-RPC compatible endpoint
# ─────────────────────────────────────────────
@app.post("/mcp")
async def mcp(request: Request):
    try:
        payload = await request.json()
    except Exception:
        payload = {}

    return {
        "jsonrpc": "2.0",
        "id": payload.get("id"),
        "result": {
            "name": APP_NAME,
            "status": "healthy",
            "mode": "simulation",
        },
    }


# ─────────────────────────────────────────────
# GET /tasks  — list all tasks
# ─────────────────────────────────────────────
@app.get("/tasks")
def list_tasks():
    from app.tasks import TASK_ORDER

    return {"tasks": TASK_ORDER, "count": len(TASK_ORDER)}
