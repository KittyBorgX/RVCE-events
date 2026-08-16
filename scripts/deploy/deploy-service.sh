#!/usr/bin/env bash

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly DEPLOY_ROOT="${RVCE_EVENTS_DEPLOY_ROOT:-$(cd "${SCRIPT_DIR}/../.." && pwd)}"
readonly COMPOSE_FILE="${DEPLOY_ROOT}/deploy/docker-compose.yml"
readonly ENV_FILE="${DEPLOY_ROOT}/deploy/server.env"
readonly REGISTRY_CREDENTIALS_FILE="${RVCE_EVENTS_REGISTRY_CREDENTIALS_FILE:-/etc/rvce-events/registry.env}"

usage() {
  echo "Usage: $0 <service|all> <image-tag>" >&2
  exit 64
}

[[ $# -eq 2 ]] || usage

service="$1"
image_tag="$2"

case "$service" in
  all|frontend|identity-service|event-service|registration-service|attendance-service|notification-service) ;;
  *)
    echo "Unsupported service: $service" >&2
    exit 64
    ;;
esac

if [[ ! "$image_tag" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$ ]]; then
  echo "Image tag contains unsupported characters." >&2
  exit 64
fi

if [[ ! -f "$COMPOSE_FILE" || ! -f "$ENV_FILE" ]]; then
  echo "Deployment configuration is incomplete. Run scripts/server/bootstrap.sh first." >&2
  exit 78
fi

cd "$DEPLOY_ROOT"

set -a
# The deployment user owns this server-local configuration file.
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

if [[ -f "$REGISTRY_CREDENTIALS_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$REGISTRY_CREDENTIALS_FILE"
  set +a
fi

if [[ -n "${REGISTRY_PULL_TOKEN:-}" ]]; then
  : "${REGISTRY_USERNAME:?REGISTRY_USERNAME is required in $REGISTRY_CREDENTIALS_FILE when REGISTRY_PULL_TOKEN is set}"
  printf '%s' "$REGISTRY_PULL_TOKEN" | docker login "$REGISTRY" --username "$REGISTRY_USERNAME" --password-stdin
fi

export IMAGE_TAG="$image_tag"

if [[ "$service" == "all" ]]; then
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up --detach
else
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull "$service"
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up --detach --no-deps "$service"
fi
