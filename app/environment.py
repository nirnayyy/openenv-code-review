"""
Core environment logic.
Manages state across reset() / step() / state() calls.
Runs all 3 tasks in sequence within one episode.
"""

from app.models import Observation, Action, Reward, StepResult, EnvironmentState
from app.tasks import TASKS, TASK_ORDER


class CodeReviewEnvironment:
    def __init__(self):
        self._task_index: int = 0
        self._step: int = 1
        self._done: bool = False
        self._total_reward: float = 0.0
        self._reward_history: list[float] = []
        self._current_obs: Observation = self._build_obs()

    # ── Internal helpers ──────────────────────────────────────────────────────

    def _current_task_id(self) -> str:
        return TASK_ORDER[self._task_index]

    def _build_obs(self) -> Observation:
        task_id = self._current_task_id()
        return TASKS[task_id]["get_obs"](step=self._step)

    # ── Public API ────────────────────────────────────────────────────────────

    def reset(self) -> Observation:
        """Start a fresh episode from Task 1."""
        self._task_index = 0
        self._step = 1
        self._done = False
        self._total_reward = 0.0
        self._reward_history = []
        self._current_obs = self._build_obs()
        return self._current_obs

    def step(self, action: Action) -> StepResult:
        """
        Process the agent's action.
        One step = one task review.
        After all 3 tasks are reviewed, done=True.
        """
        if self._done:
            # Episode already over — return terminal state
            return StepResult(
                observation=self._current_obs,
                reward=Reward(
                    score=0.0,
                    issue_detected=False,
                    fix_quality=0.0,
                    severity_correct=False,
                    feedback="Episode already finished. Call reset() to start again.",
                ),
                done=True,
                info={"warning": "Episode already done"},
            )

        # Grade the current task
        task_id = self._current_task_id()
        reward: Reward = TASKS[task_id]["grade"](action)

        self._total_reward += reward.score
        self._reward_history.append(reward.score)
        self._step += 1

        # Advance to next task
        self._task_index += 1

        if self._task_index >= len(TASK_ORDER):
            # All tasks done
            self._done = True
            final_obs = Observation(
                task_id="episode_complete",
                task_description="All tasks completed.",
                code_snippet="",
                language="python",
                step=self._step,
                max_steps=3,
                done=True,
            )
            self._current_obs = final_obs
        else:
            self._current_obs = self._build_obs()

        return StepResult(
            observation=self._current_obs,
            reward=reward,
            done=self._done,
            info={
                "task_completed": task_id,
                "tasks_remaining": len(TASK_ORDER) - self._task_index,
                "cumulative_reward": round(self._total_reward, 4),
            },
        )

    def state(self) -> EnvironmentState:
        """Return full internal state snapshot."""
        return EnvironmentState(
            current_task_id=self._current_task_id() if not self._done else "done",
            step=self._step,
            done=self._done,
            total_reward=round(self._total_reward, 4),
            reward_history=self._reward_history,
            current_observation=self._current_obs,
        )
