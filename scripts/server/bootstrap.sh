#!/usr/bin/env bash

set -euo pipefail

readonly DEPLOY_ROOT="${RVCE_EVENTS_DEPLOY_ROOT:-/opt/rvce-events}"
readonly REPOSITORY_URL="${RVCE_EVENTS_REPOSITORY_URL:-https://github.com/overclocked-2124/RVCE-events.git}"

command -v docker >/dev/null || {
  echo "Docker must be installed before bootstrapping." >&2
  exit 69
}

docker compose version >/dev/null || {
  echo "Docker Compose v2 is required." >&2
  exit 69
}

if [[ ! -d "$DEPLOY_ROOT/.git" ]]; then
  git clone "$REPOSITORY_URL" "$DEPLOY_ROOT"
fi

cd "$DEPLOY_ROOT"
git fetch origin main
git switch --detach origin/main

if [[ ! -f deploy/server.env ]]; then
  cp deploy/server.env.example deploy/server.env
  chmod 600 deploy/server.env
  echo "Created deploy/server.env. Fill in every placeholder before deploying." >&2
  exit 78
fi

echo "Server bootstrap complete. Run scripts/deploy/deploy-service.sh all <image-tag> after container images are available." 
