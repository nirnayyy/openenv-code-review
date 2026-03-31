from app.tasks.task1_easy import (
    TASK_ID as TASK1_ID,
    grade as grade_task1,
    get_initial_observation as get_obs_task1,
)
from app.tasks.task2_medium import (
    TASK_ID as TASK2_ID,
    grade as grade_task2,
    get_initial_observation as get_obs_task2,
)
from app.tasks.task3_hard import (
    TASK_ID as TASK3_ID,
    grade as grade_task3,
    get_initial_observation as get_obs_task3,
)

TASKS = {
    TASK1_ID: {"grade": grade_task1, "get_obs": get_obs_task1},
    TASK2_ID: {"grade": grade_task2, "get_obs": get_obs_task2},
    TASK3_ID: {"grade": grade_task3, "get_obs": get_obs_task3},
}

TASK_ORDER = [TASK1_ID, TASK2_ID, TASK3_ID]
