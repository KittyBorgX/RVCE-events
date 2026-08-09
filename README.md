# RVCE Events

Self-hosted event discovery and management platform for RVCE.

## Repository layout

```text
api/proto/                 Protocol Buffer contracts (to be designed)
backend/
  libraries/               Shared Kotlin/JVM libraries (empty)
  services/                Spring Boot services (empty)
  database/liquibase/      Service-owned Liquibase migrations (empty)
frontend/
  app/                     Next.js application shell; no routes implemented
  src/bff/                 Frontend BFF boundary; no endpoints implemented
tests/
  jvm/                     Backend tests (empty)
  playwright/              End-to-end tests (empty)
  smoke-python/            Python smoke tests (empty)
docs/adr/                  Architecture decision records (empty)
```

The high-level design is documented in [SYSTEM_DESIGN.md](SYSTEM_DESIGN.md). This repository is intentionally initialized without product pages, backend services, RPC contracts, database schemas, or migrations.
