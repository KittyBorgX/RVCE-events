# Deploy — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Purpose

This directory contains Docker Compose configuration and environment templates for deploying the RVCE Events platform.

---

## Directory Structure

```text
deploy/
├── docker-compose.yml       ← Service definitions, networks, volumes
└── server.env.example       ← Template for server.env (never commit actual server.env)
```

---

## Rules

### 1. Environment Files
- **`server.env` is gitignored.** Never commit it. It contains secrets (database passwords, registry credentials).
- **`server.env.example`** is the committed template with placeholder values. Keep it in sync with any new environment variables added to `docker-compose.yml`.
- When adding a new environment variable, update BOTH `docker-compose.yml` AND `server.env.example`.

### 2. Docker Compose Conventions
- **Project name** is dynamic via `name: ${COMPOSE_PROJECT_NAME:-rvce-events}`. This enables isolated staging (`rvce-events-staging`) and production (`rvce-events`) deployments on the same host.
- **Network**: All services share a single bridge network named `application`. This is project-scoped, so staging and production get separate networks automatically.
- **Volumes**: Named volumes are project-scoped (e.g., `rvce-events_postgres-data` vs `rvce-events-staging_postgres-data`).
- **Port binding**: Frontend binds to **`127.0.0.1`** only (loopback). Nginx on the host terminates TLS and reverse-proxies to the loopback port. Backend services do NOT expose ports to the host — they communicate over the internal Docker network.

### 3. Image Tagging
- Container images are tagged with the Git SHA: `ghcr.io/overclocked-2124/rvce-events-<service>:<sha>`.
- The `latest` tag is also pushed but should not be used for deployments — always use explicit SHA tags.
- Images are stored in GitHub Container Registry (GHCR).

### 4. Service Definitions
When adding a new backend service to `docker-compose.yml`:
1. Follow the existing service template (image naming, network, env vars).
2. Add health check if the service supports it.
3. Set `depends_on: postgres: condition: service_healthy` for services needing database access.
4. Share the standard Spring environment variables (`SPRING_PROFILES_ACTIVE`, `SPRING_DATASOURCE_*`).
5. Update `scripts/deploy/` with a corresponding deploy wrapper script.

### 5. Safety
- **Never run `docker system prune`** or `docker compose --remove-orphans` on the deployment server. Other applications share the host.
- **Never use `docker compose down -v`** in production — this destroys database volumes.
- Deploy scripts use `docker compose pull` + `docker compose up --detach` for zero-downtime container replacement.

### 6. Port Assignments

| Environment | Frontend Port | Path | Compose Project |
| --- | --- | --- | --- |
| **Production** | `3200` | `/opt/rvce-events` | `rvce-events` |
| **Staging** | `3300` | `/opt/rvce-events-staging` | `rvce-events-staging` |

Backend services communicate internally over Docker network port `8080` (Spring Boot default) — they are never exposed to the host.
