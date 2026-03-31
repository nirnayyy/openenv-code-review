from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


# ─────────────────────────────────────────────
# OBSERVATION  — what the agent SEES each step
# ─────────────────────────────────────────────
class Observation(BaseModel):
    task_id: str = Field(..., description="Unique identifier for the task")
    task_description: str = Field(..., description="What the agent must do")
    code_snippet: str = Field(..., description="The code to be reviewed")
    language: str = Field(default="python", description="Programming language")
    step: int = Field(..., description="Current step number")
    max_steps: int = Field(default=3, description="Max steps per episode")
    context: Optional[str] = Field(None, description="Extra context or hints")
    done: bool = Field(default=False, description="Is the episode over")


# ─────────────────────────────────────────────
# ACTION  — what the agent DOES each step
# ─────────────────────────────────────────────
class Action(BaseModel):
    identified_issues: List[str] = Field(
        ..., description="List of issues the agent found in the code"
    )
    suggested_fixes: List[str] = Field(
        ..., description="Corresponding fixes for each issue"
    )
    severity: str = Field(
        ..., description="Overall severity: 'low', 'medium', 'high', or 'critical'"
    )
    explanation: str = Field(
        ..., description="Agent's full explanation of the review"
    )
    line_numbers: Optional[List[int]] = Field(
        None, description="Line numbers where issues were found"
    )


# ─────────────────────────────────────────────
# REWARD  — score the agent gets after each step
# ─────────────────────────────────────────────
class Reward(BaseModel):
    score: float = Field(..., ge=0.0, le=1.0, description="Final score 0.0 to 1.0")
    issue_detected: bool = Field(..., description="Did the agent find the bug?")
    fix_quality: float = Field(..., ge=0.0, le=1.0, description="Quality of the fix suggested")
    severity_correct: bool = Field(..., description="Did agent rate severity correctly?")
    feedback: str = Field(..., description="Human-readable feedback on the review")


# ─────────────────────────────────────────────
# STEP RESULT  — full response from step()
# ─────────────────────────────────────────────
class StepResult(BaseModel):
    observation: Observation
    reward: Reward
    done: bool
    info: Dict[str, Any] = Field(default_factory=dict)


# ─────────────────────────────────────────────
# STATE  — full internal state (for /state endpoint)
# ─────────────────────────────────────────────
class EnvironmentState(BaseModel):
    current_task_id: str
    step: int
    done: bool
    total_reward: float
    reward_history: List[float] = Field(default_factory=list)
    current_observation: Observation
