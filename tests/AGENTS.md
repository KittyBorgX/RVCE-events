# Tests — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Purpose

This directory contains **all test suites** for the RVCE Events platform, organized by testing layer and runtime.

---

## Directory Structure

```text
tests/
├── jvm/                 ← Backend Kotlin/JVM tests
│   ├── unit/            ← Fast, isolated unit tests (no external dependencies)
│   ├── integration/     ← Tests with real dependencies (DB via Testcontainers, gRPC)
│   └── contract/        ← Proto contract compatibility tests
│
├── playwright/          ← Browser end-to-end tests
│   ├── pages/           ← Page object models
│   ├── fixtures/        ← Test data and setup helpers
│   └── specs/           ← Test spec files organized by feature
│
└── smoke-python/        ← Lightweight Python smoke verification scripts
    └── ...              ← Scripts that hit live endpoints and verify basic health
```

---

## Rules

### 1. Test Placement
- **Backend tests** (Kotlin/JVM): `tests/jvm/`.
- **Browser E2E tests** (Playwright): `tests/playwright/`.
- **Smoke tests** (Python): `tests/smoke-python/`.
- Co-located unit tests within `frontend/` or `backend/services/` source directories are acceptable when following framework conventions (e.g., `__tests__/` in Next.js, `src/test/` in Spring Boot).

### 2. Backend Testing (JVM)
- **Framework**: JUnit 5, MockK for mocking, Testcontainers for integration tests with PostgreSQL.
- **Unit tests**: No external dependencies. Mock all collaborators. Fast execution.
- **Integration tests**: Use Testcontainers to spin up real PostgreSQL. Test repository layer, service layer with real DB, and gRPC service implementations.
- **Contract tests**: Verify proto contract compatibility between service versions.

### 3. E2E Testing (Playwright)
- Use Page Object Model pattern for maintainable selectors.
- Tests should run against the staging deployment (`events.test.codingclubrvce.com`) or local Docker Compose.
- Cover critical user flows: event discovery, registration, check-in.

### 4. Smoke Tests (Python)
- Lightweight scripts that verify deployed services are healthy.
- Check HTTP endpoints, database connectivity, and basic response validation.
- Used in post-deployment verification.

### 5. Test Data
- Never use production data in tests.
- Use factories/builders to create test data programmatically.
- Clean up test data after each test run (use transactions or Testcontainers).
