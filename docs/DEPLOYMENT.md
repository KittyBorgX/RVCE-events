# Self-hosted Docker deployment

## Status

This is deployment infrastructure only. No service implementation or container image exists yet, so a production deployment will work only after those images are built and published.

## Design

- Docker Compose runs the frontend/BFF, future Spring services, and PostgreSQL on one private Docker network.
- The Compose project is explicitly named `rvce-events`; its containers, private network, and PostgreSQL volume are namespaced separately from other Docker Compose applications on the same server.
- Only the frontend binds to the server loopback interface on port `3000` by default.
- A separate reverse proxy (for example, Caddy or Nginx) must terminate TLS and proxy public traffic to `127.0.0.1:3000`.
- Backend gRPC ports and PostgreSQL are not exposed to the public network.
- PostgreSQL data is persisted in the named `postgres-data` volume.
- Compose-only configuration lives in `deploy/server.env` on the server. It is ignored by Git and values are passed only to explicitly declared container fields.
- Private registry credentials, if needed, live in `/etc/rvce-events/registry.env`, outside the repository and outside Compose configuration.
- Deployment never runs `docker system prune`, never uses global container cleanup, and does not use Docker Compose's `--remove-orphans` option.

## Existing applications on the same server

The deployment is designed to coexist with other Docker applications:

- It does not reuse their containers, networks, volumes, or Compose project name.
- Backend services and PostgreSQL have no host port mapping, so they are inaccessible outside the private `rvce-events` Docker network.
- The frontend reserves one loopback-only port. Set `FRONTEND_PORT` in `deploy/server.env` to an unused value, such as `3100`, if another application already uses `3000`.
- Before the first deployment, run `ss -ltn` on the server and choose a free loopback port. A port conflict causes Docker to fail the new container start; it does not stop the application already using that port.
- Configure the server's existing reverse proxy with a separate hostname for RVCE Events and proxy it to `127.0.0.1:<FRONTEND_PORT>`.

## One-time server setup

1. Create a dedicated non-root deployment user with permission to run Docker.
2. Install Docker Engine and Docker Compose v2.
3. Configure the server firewall to allow only the reverse proxy's required public ports, normally `80` and `443`.
4. Provision a dedicated SSH key for GitHub Actions. Restrict the key to the deployment user and store its private half as the production environment secret `DEPLOY_SSH_PRIVATE_KEY`.
5. Add the server's SSH host key to the GitHub environment secret `DEPLOY_SSH_KNOWN_HOSTS`. Do not use `ssh-keyscan` in CI as a substitute for verifying the host fingerprint.
6. On the server, run:

   ```bash
   RVCE_EVENTS_DEPLOY_ROOT=/opt/rvce-events ./scripts/server/bootstrap.sh
   ```

7. Edit `/opt/rvce-events/deploy/server.env`, replace every placeholder, then keep it readable only by the deployment user.

## Required GitHub production environment settings

Create a GitHub Environment named `production`, require approval if appropriate, and add these secrets:

| Secret | Purpose |
| --- | --- |
| `DEPLOY_HOST` | Server hostname or IP address |
| `DEPLOY_USER` | Dedicated deployment username |
| `DEPLOY_SSH_PRIVATE_KEY` | Private key for the dedicated deployment user |
| `DEPLOY_SSH_KNOWN_HOSTS` | Verified `known_hosts` entry for the server |

Set the non-secret repository/environment variable `DEPLOY_PATH` to `/opt/rvce-events` if a different server path is required.

## Image registry

The Compose configuration uses image references in this form:

```text
${REGISTRY}/${IMAGE_NAMESPACE}/rvce-events-<service>:${IMAGE_TAG}
```

For public GHCR images, set `REGISTRY=ghcr.io` and `IMAGE_NAMESPACE` in `deploy/server.env`; no registry login is needed. For private images, create `/etc/rvce-events/registry.env` with `REGISTRY_USERNAME` and `REGISTRY_PULL_TOKEN`. The token must have read-only package access and the file should be readable only by the deployment user.

## Deployment workflow

The `Deploy` GitHub Actions workflow is deliberately manual at this stage. It requires a service name and immutable image tag, connects to the server using strict host-key verification, updates only the checked-out deployment scripts, pulls the requested image, and starts that service with Docker Compose.

Example server-side deployment:

```bash
cd /opt/rvce-events
./scripts/deploy/deploy-event-service.sh 2026.08.09-abc1234
```

The `all` option starts the full stack only after every declared image exists.

## Future CI/CD stages

1. Keep CI on every pull request: frontend lint/build and, once service modules exist, Kotlin tests and Liquibase validation.
2. Add a per-service Dockerfile with its corresponding service implementation.
3. Add a build-and-publish job that tags images with the immutable commit SHA.
4. Deploy the chosen immutable image tag through the protected `production` environment.
5. Add service health checks and a rollback command after services expose health endpoints.

Never place production passwords, private keys, registry tokens, or SSH host trust material in this repository.
