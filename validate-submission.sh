#!/usr/bin/env bash
set -euo pipefail

SPACE_URL="${1:?Usage: $0 <space_url> [env_dir]}"
ENV_DIR="${2:-.}"
SPACE_URL="${SPACE_URL%/}"

if command -v openenv >/dev/null 2>&1; then
  OPENENV_CMD=(openenv)
elif command -v python >/dev/null 2>&1; then
  OPENENV_CMD=(python -m openenv)
else
  echo "❌ FAILED -- openenv CLI is not available"
  exit 1
fi

echo "==> Checking HF Space /reset..."
RESET_JSON="$(curl -fsS -X POST "$SPACE_URL/reset" -H "Content-Type: application/json" -d '{}')"
python -c 'import json,sys; data=json.load(sys.stdin); assert data.get("task_id") == "task1_easy", data' <<<"$RESET_JSON"
echo "✅ PASSED -- HF Space is live and responds to /reset"

echo "==> Building Docker image..."
docker build -t code-review-openenv "$ENV_DIR" >/dev/null
echo "✅ PASSED -- Docker build succeeded"

echo "==> Running OpenEnv validation..."
"${OPENENV_CMD[@]}" validate "$ENV_DIR" >/dev/null
"${OPENENV_CMD[@]}" validate --url "$SPACE_URL" >/dev/null
echo "✅ PASSED -- openenv validate passed"

echo "All submission checks passed."
