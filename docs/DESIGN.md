# RVCE Events — Technology Stack

## Purpose

RVCE Events will be a self-hosted event management platform for RVCE. The application is designed to run on infrastructure owned and managed by the project team, without depending on a particular cloud provider or hosting platform.

## Application stack

| Area | Technology | Role |
| --- | --- | --- |
| Backend | Kotlin on the Java/JVM platform | Application and domain logic |
| Backend framework | Spring Boot / Spring | Web, dependency injection, configuration, jobs, and application infrastructure |
| API contract | Protocol Buffers | Strongly typed service and message definitions |
| API transport | gRPC | Communication between backend services and application layers |
| Frontend | TypeScript, React, Next.js | Web application and user interface |
| Build system | Gradle with Kotlin DSL | Builds, dependency management, code generation, and test orchestration |
| Database | PostgreSQL | Persistent relational data storage |
| Database migrations | Liquibase Community edition | Versioned and repeatable database schema changes |
| Persistence | JPA / Spring Data | Standard database access and entity persistence |
| Complex queries | Native SQL | Queries where JPA or Spring Data is not appropriate or performant |
| Background processing | Pub/Sub, workers, and scheduled jobs | Asynchronous work, event processing, and periodic tasks |

## Testing

- Kotlin/JVM tests for backend and domain logic.
- TypeScript/React tests for frontend components and client-side behavior.
- Playwright for browser-level end-to-end tests.
- Python smoke tests for lightweight environment and API verification.

## CI/CD

GitHub Actions will automate builds, tests, validation, and release workflows. The workflows should remain independent of any particular production hosting provider.

## Hosting and infrastructure scope

The project will be hosted on our own server. The initial design therefore does not prescribe:

- Terraform
- Helm
- Kubernetes
- Cloudflare Workers
- Any cloud-provider-specific service

Docker may be used optionally for local development, isolated testing, and reproducible tooling. It is not a production hosting requirement.

## API and frontend boundary

Standard browser clients do not natively call regular gRPC services. The frontend will therefore use one of these application-owned boundaries:

1. Next.js server-side code acts as a gRPC client and exposes the required frontend-facing operations; or
2. gRPC-Web is introduced if direct browser-to-backend communication is required.

The preferred approach is to keep gRPC as the backend service contract and use a thin Next.js server-side boundary for browser-facing requests, unless the implementation needs direct gRPC-Web access.

## Initial architectural principles

- Keep the backend and frontend independently buildable.
- Treat Protocol Buffer definitions as versioned API contracts.
- Keep database schema changes in Liquibase migrations.
- Prefer JPA/Spring Data for ordinary persistence and native SQL for measured, justified cases.
- Make background work retryable and observable.
- Avoid coupling application code to a specific deployment environment.
